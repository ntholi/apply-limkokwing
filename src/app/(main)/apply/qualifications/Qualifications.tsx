'use client';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { IconTrash } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useApplication } from '../ApplicationProvider';
import ResultsForm from './ResultsForm';
import CertificateInput from './CertificateInput';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';

export default function Qualifications() {
  const [certificate, setCertificate] = React.useState<Certificate>();
  const application = useApplication();

  useEffect(() => {
    certificateRepository.getAll().then((data) => {
      const certificate = data.find(
        (c) => c.id === application?.certificate?.id
      );
      if (certificate) {
        setCertificate(certificate);
      }
    });
  }, [application]);

  return (
    <div className='w-full'>
      <CertificateInput />
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
