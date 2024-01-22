'use client';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import { Autocomplete, AutocompleteItem, Skeleton } from '@nextui-org/react';
import React, { Key, useEffect } from 'react';
import { useApplication } from '../ApplicationProvider';

type Props = {
  setValue: (value: Certificate | undefined) => void;
  value: Certificate | undefined;
};

export default function CertificateInput({ setValue, value }: Props) {
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
