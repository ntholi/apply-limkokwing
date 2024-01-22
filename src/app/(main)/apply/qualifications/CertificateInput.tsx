'use client';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import { Autocomplete, AutocompleteItem, Skeleton } from '@nextui-org/react';
import React, { Key, useEffect } from 'react';
import { useApplication } from '../ApplicationProvider';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';

export default function CertificateInput() {
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

    certificateRepository
      .getAll()
      .then((data) => {
        setCertificates([...data, other]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [application?.certificate?.id]);

  function handleSelectionChange(item: Key) {
    const certificate = certificates.find((c) => c.id === item);
    if (application && certificate) {
      applicationsRepository.updateCertificate(application?.id, certificate);
    }
  }

  return (
    <>
      {loading ? (
        <Skeleton className='w-full h-14 rounded-lg' />
      ) : (
        <Autocomplete
          label='Highest Qualification'
          className='w-full'
          selectedKey={application?.certificate?.id}
          variant='bordered'
          onSelectionChange={handleSelectionChange}
          defaultItems={certificates}
          description={
            !application?.certificate &&
            'Please select your highest qualification'
          }
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
