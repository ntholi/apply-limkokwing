import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Skeleton,
  Box,
  BoxProps,
  Title,
  Divider,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { Certificate } from '../modal/Prerequisite';
import { db } from '@/lib/config/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export default function PrerequisiteDetails(props: BoxProps) {
  const [certificateId] = useQueryState('certificate');
  const [programId] = useQueryState('id');
  const [certificate, setCertificate] = React.useState<Certificate>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (certificateId && programId) {
      setLoading(true);
      const q = query(
        collection(db, 'certificates'),
        where('name', '==', certificateId)
      );
      getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          setCertificate({ ...doc.data(), id: doc.id } as Certificate);
        });
        setLoading(false);
      });
    }
  }, [certificateId, programId]);

  return (
    <Box {...props}>
      {loading ? <Loader /> : <PrerequisiteForm prerequisite={certificate} />}
    </Box>
  );
}

function PrerequisiteForm({ prerequisite }: { prerequisite?: Certificate }) {
  const [certificate, setCertificate] = useQueryState('certificate');

  if (!prerequisite) return null;
  if (!certificate) return null;
  return (
    <Paper p={'md'} withBorder>
      <Stack></Stack>
    </Paper>
  );
}

function Loader() {
  return (
    <Stack>
      <Group justify='space-between'>
        <Skeleton w={200} h={30} />
        <Skeleton w={100} h={30} />
      </Group>
      <Stack gap={'xs'}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} w='100%' h={50} />
        ))}
      </Stack>
    </Stack>
  );
}
