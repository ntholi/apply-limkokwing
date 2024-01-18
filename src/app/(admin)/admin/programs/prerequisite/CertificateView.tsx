'use client';
import React, { useEffect } from 'react';
import { Program } from '../modal/program';
import { db } from '@/lib/config/firebase';
import {
  QuerySnapshot,
  collection,
  setDoc,
  getDocs,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Certificate } from '../../certificates/Certificate';
import { useQueryState } from 'nuqs';
import NewCertificate from './NewCertificate';
import PrerequisiteDetails from './PrerequisiteDetails';

type Props = {
  program: Program;
};

export default function CertificateView({ program }: Props) {
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [certificateId, setCertificateId] = useQueryState('certificate');

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
    <Box p='xl'>
      <Group justify='space-between' align='center'>
        <Title order={3} fw={'lighter'}>
          Certificates
        </Title>
        <NewCertificate />
      </Group>
      <Divider mt={'xs'} />
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
    </Box>
  );
}
