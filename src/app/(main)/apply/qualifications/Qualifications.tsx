'use client';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { IconTrash } from '@tabler/icons-react';
import React, { Key, useEffect } from 'react';
import ResultsForm from './ResultsForm';
import { useApplication } from '../ApplicationProvider';

export default function Qualifications() {
  const [certificate, setCertificate] = React.useState<Certificate>();
  const application = useApplication();

  return (
    <div className='w-full'>
      <CertificateInput setValue={setCertificate} value={certificate} />
      {certificate && (
        <>
          <div className='mt-10'>
            <div className='flex justify-between'>
              <div>
                <h2>Add your results</h2>
                <p className='text-xs text-gray-500'>
                  {application?.results.length} results added
                </p>
              </div>
              <ResultsForm certificate={certificate} />
            </div>
          </div>
          <div className='mt-2'>
            <ResultsTable application={application} />
          </div>
        </>
      )}
    </div>
  );
}

function ResultsTable({ application }: { application?: Application }) {
  const results = application?.results ?? [];
  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn>Course</TableColumn>
        <TableColumn>Grade</TableColumn>
        <TableColumn>{''}</TableColumn>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.course}>
            <TableCell>{result.course}</TableCell>
            <TableCell>{result.grade.grade}</TableCell>
            <TableCell className='flex justify-end'>
              <Button
                isIconOnly
                color='danger'
                aria-label='Delete'
                size='sm'
                onClick={() => {
                  applicationsRepository.removeResult(application!.id, result);
                }}
              >
                <IconTrash size={'1rem'} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type CertificateProps = {
  setValue: (value: Certificate | undefined) => void;
  value: Certificate | undefined;
};

function CertificateInput({ setValue, value }: CertificateProps) {
  const [loading, setLoading] = React.useState(true);
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const application = useApplication();

  useEffect(() => {
    const other = {
      courses: [],
      gradingSchemes: [],
      id: '-1',
      name: 'Other',
      passingGrade: null,
    } as Certificate;
    async function getData() {
      try {
        const data = await certificateRepository.getAll();
        setCertificates([...data, other]);
        const certificate = data.find(
          (c) => c.id === application?.certificate?.id
        );
        setValue(certificate);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [application?.certificate?.id, setValue]);

  return (
    <>
      {loading ? (
        <Skeleton className='w-full h-14 rounded-lg' />
      ) : (
        <Autocomplete
          label='Highest Qualification'
          className='w-full'
          selectedKey={value?.id}
          variant='bordered'
          onSelectionChange={(item: Key) => {
            setValue(certificates.find((c) => c.id === item));
          }}
          defaultItems={certificates}
          description={!value && 'Please select your highest qualification'}
          isLoading={loading}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      )}
    </>
  );
}
