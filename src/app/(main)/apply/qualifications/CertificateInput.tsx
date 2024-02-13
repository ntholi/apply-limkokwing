'use client';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import { Select, Skeleton, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
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
        setCertificates([
          ...data.sort((a, b) => a.name.localeCompare(b.name)),
          other,
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [application?.certificate?.id]);

  async function handleSelectionChange(item: string) {
    const certificate = certificates.find((c) => c.id === item);
    if (application && certificate) {
      if (application.certificate?.id !== certificate.id) {
        await applicationsRepository.clearResults(application?.id);
        applicationsRepository.updateCertificate(application?.id, certificate);
      }
    }
  }

  return (
    <>
      {loading ? (
        <Skeleton className='w-full h-14 rounded-lg' />
      ) : (
        <Select
          label='Highest Qualification'
          className='w-full'
          value={application?.certificate?.name}
          defaultSelectedKeys={[application?.certificate?.id || '']}
          onChange={(e) => handleSelectionChange(e.target.value)}
          variant='bordered'
          description={
            !application?.certificate &&
            'Please select your highest qualification'
          }
          isLoading={loading}
        >
          {certificates.map((item) => (
            <SelectItem key={item.id}>{item.name}</SelectItem>
          ))}
        </Select>
      )}
    </>
  );
}
