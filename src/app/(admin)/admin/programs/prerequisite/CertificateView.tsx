'use client';
import { Button, SimpleGrid } from '@mantine/core';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { Certificate } from '../../certificates/Certificate';
import { Program } from '../modal/program';
import { certificateRepository } from '../../certificates/repository';

type Props = {
  program: Program;
};

export default function CertificateView({ program }: Props) {
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [certificateId, setCertificateId] = useQueryState('certificate');

  useEffect(() => {
    return certificateRepository.listen(setCertificates);
  }, [program.id]);

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}>
      {certificates.map((it) => (
        <Button
          key={it.id}
          variant={it.id === certificateId ? 'filled' : 'default'}
          h={80}
          onClick={() => setCertificateId(it.id)}
        >
          {it.name}
        </Button>
      ))}
    </SimpleGrid>
  );
}
