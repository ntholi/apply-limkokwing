'use client';
import { ActionIcon, FileButton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Upload } from 'lucide-react';
import { useState, useTransition } from 'react';
import * as XLSX from 'xlsx';

type Action = (studentNumbers: string[]) => Promise<void>;

async function writeFileContents(file: File, action: Action): Promise<number> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        const binaryString = event.target?.result;
        if (typeof binaryString !== 'string') {
          reject(new Error('Invalid file content'));
          return;
        }

        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const stdNumbers: string[] = [];

        for (const sheetName of workbook.SheetNames) {
          const sheet = workbook.Sheets[sheetName];
          const rawData: (string | number)[][] = XLSX.utils.sheet_to_json(
            sheet,
            {
              header: 1,
            },
          );
          const sheetStdNumbers = rawData
            .flatMap((row) => row.map((cell) => cell.toString()))
            .filter((cell) => cell.startsWith('9010'));
          stdNumbers.push(...sheetStdNumbers);
        }

        await action(stdNumbers);
        resolve(stdNumbers.length);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsBinaryString(file);
  });
}

type Props = {
  action: Action;
};

export default function SheetReader({ action }: Props) {
  const [pending, startTransition] = useTransition();
  const [key, setKey] = useState(0);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    startTransition(async () => {
      setKey((prevKey) => prevKey + 1);
      try {
        const count = await writeFileContents(file, action);
        notifications.show({
          title: 'Success',
          message: `${count} students added`,
        });
      } catch (error) {
        notifications.show({
          color: 'red',
          title: 'Error adding students',
          message: error instanceof Error ? error.message : 'Unexpected error',
        });
      }
    });
  };

  return (
    <FileButton
      onChange={handleFileChange}
      accept='.xls,.xlsx'
      disabled={pending}
      key={key}
    >
      {(props) => (
        <ActionIcon {...props} loading={pending}>
          <Upload size={'1rem'} />
        </ActionIcon>
      )}
    </FileButton>
  );
}
