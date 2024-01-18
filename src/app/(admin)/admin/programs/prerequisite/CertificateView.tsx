'use client';
import { db } from '@/lib/config/firebase';
import { Box, Button, Divider, Group, SimpleGrid, Title } from '@mantine/core';
import { QuerySnapshot, collection, onSnapshot } from 'firebase/firestore';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { Certificate } from '../../certificates/Certificate';
import { Program } from '../modal/program';
import NewCertificate from './NewCertificate';

type Props = {
  program: Program;
};

export default function CertificateView({ program }: Props) {
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [_, setCertificateId] = useQueryState('certificate');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'certificates'),
      (snapshot: QuerySnapshot) => {
        const prerequisites: Certificate[] = [];
        snapshot.forEach((doc) => {
          prerequisites.push({ ...doc.data(), id: doc.id } as Certificate);
        });
        setCertificates(prerequisites);
      }
    );
    return unsubscribe;
  }, [program.id]);

  return (
      <SimpleGrid mt={'lg'} cols={{ base: 1, sm: 2, lg: 4 }}>
        {certificates.map((it) => (
          <Button
            key={it.id}
            variant='default'
            h={100}
            onClick={() => setCertificateId(it.name)}
          >
            {it.name}
          </Button>
        ))}
      </SimpleGrid>
  );
}
