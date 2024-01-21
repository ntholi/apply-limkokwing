'use client';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Select,
  SelectItem,
  Skeleton,
  Slider,
} from '@nextui-org/react';
import React, { Key, use, useEffect } from 'react';

export default function Qualifications() {
  const [certificate, setCertificate] = React.useState<Certificate>();
  return (
    <div className='w-full'>
      <CertificateInput setValue={setCertificate} value={certificate} />
      {certificate && (
        <div className='mt-10'>
          <ResultsInput certificate={certificate} />
        </div>
      )}
    </div>
  );
}

function ResultsInput({ certificate }: { certificate: Certificate }) {
  return (
    <div className='w-full'>
      <h3>Enter your {certificate.name} results</h3>
      <Divider className='mt-1 mb-5' />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 '>
        {certificate.courses.map((course) => (
          <Select
            key={course}
            label={course}
            items={certificate.gradingSchemes}
          >
            {(it) => <SelectItem key={it.level}>{it.grade}</SelectItem>}
          </Select>
        ))}
      </div>
    </div>
  );
}

type CertificateProps = {
  setValue: (value: Certificate | undefined) => void;
  value: Certificate | undefined;
};
function CertificateInput({ setValue, value }: CertificateProps) {
  const [loading, setLoading] = React.useState(true);
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);

  useEffect(() => {
    certificateRepository
      .getAll()
      .then((data) => {
        setCertificates([
          ...data,
          {
            courses: [],
            gradingSchemes: [],
            id: '0',
            name: 'Other',
            passingGrade: null,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className='w-full sm:w-1/2 h-14 rounded-lg' />
      ) : (
        <Autocomplete
          label='Highest Qualification'
          className='w-full'
          selectedKey={value?.id}
          onSelectionChange={(item: Key) => {
            console.log(item);
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
