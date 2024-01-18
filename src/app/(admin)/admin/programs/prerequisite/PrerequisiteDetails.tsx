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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { Prerequisite } from '../modal/Prerequisite';
import { db } from '@/lib/config/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
} from 'firebase/firestore';

export default function PrerequisiteDetails(props: BoxProps) {
  const [id] = useQueryState('prerequisite');
  const [programId] = useQueryState('id');
  const [prerequisite, setPrerequisite] = React.useState<Prerequisite>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (id && programId) {
      setLoading(true);
      getDocs(collection(db, 'programs', programId, 'prerequisites'))
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
  }, [id, programId]);

  return (
    <Box {...props}>
      {loading ? <Loader /> : <PrerequisiteForm prerequisite={prerequisite} />}
    </Box>
  );
}

function PrerequisiteForm({ prerequisite }: { prerequisite?: Prerequisite }) {
  const [prerequisiteId, setPrerequisiteId] = useQueryState('prerequisite');
  const [programId] = useQueryState('id');
  const [isPending, startTransition] = React.useTransition();
  const [name, setName] = useState(prerequisite?.name || '');

  function onDelete() {
    startTransition(async () => {
      if (programId && prerequisiteId) {
        await deleteDoc(
          doc(db, 'programs', programId, 'prerequisites', prerequisiteId)
        );
        setPrerequisiteId(null);
      }
    });
  }
  if (!prerequisite) return null;
  if (!prerequisiteId) return null;
  return (
    <Stack>
      <Group justify='space-between'>
        <Title order={4} fw={'normal'}>
          {prerequisite.name}
        </Title>
        <Button
          size='xs'
          variant='outline'
          color='red'
          onClick={onDelete}
          loading={isPending}
        >
          Delete
        </Button>
      </Group>
      <Divider />
      <TextInput
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        description='Certificate Name'
      />
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
