import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Skeleton,
  Box,
  BoxProps,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { Prerequisite } from '../modal/Prerequisite';
import { db } from '@/lib/config/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from 'firebase/firestore';

export default function PrerequisiteDetails(props: BoxProps) {
  const [id, setId] = useQueryState('prerequisite');
  const [prerequisite, setPrerequisite] = React.useState<Prerequisite>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getDocs(collection(db, 'prerequisites'))
        .then((snapshot: QuerySnapshot) => {
          snapshot.forEach((doc) => {
            if (doc.id === id) {
              setPrerequisite({ ...doc.data(), id: doc.id } as Prerequisite);
            }
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Box {...props}>
      {loading ? <Loader /> : <PrerequisiteForm prerequisite={prerequisite} />}
    </Box>
  );
}

function PrerequisiteForm({ prerequisite }: { prerequisite?: Prerequisite }) {
  if (!prerequisite) return null;

  return (
    <Stack>
      <TextInput label='Input label' description='Input description' />
    </Stack>
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
