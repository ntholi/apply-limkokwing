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
import { Prerequisite } from '../modal/Prerequisite';
import { useQueryState } from 'nuqs';
import PrerequisiteModal from './PrerequisiteDetails';
import PrerequisiteDetails from './PrerequisiteDetails';

type Props = {
  program: Program;
};

export default function PrerequisiteView({ program }: Props) {
  const [prerequisites, setPrerequisites] = React.useState<Prerequisite[]>([]);
  const [selected, setSelected] = useQueryState('prerequisite');
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'programs', program.id, 'prerequisites'),
      (snapshot: QuerySnapshot) => {
        const prerequisites: Prerequisite[] = [];
        snapshot.forEach((doc) => {
          prerequisites.push({ ...doc.data(), id: doc.id } as Prerequisite);
        });
        setPrerequisites(prerequisites);
      }
    );
    return unsubscribe;
  }, [program.id]);

  function createPrerequisite() {
    startTransition(async () => {
      await addDoc(collection(db, 'programs', program.id, 'prerequisites'), {
        name: 'New Certificate',
      });
    });
  }

  return (
    <Box p='xl'>
      <Group justify='space-between' align='center'>
        <Title order={3} fw={'lighter'}>
          Prerequisites
        </Title>
        <Button onClick={createPrerequisite}>Create New</Button>
      </Group>
      <Divider mt={'xs'} />
      <SimpleGrid mt={'lg'} cols={{ base: 1, sm: 2, lg: 4 }}>
        {prerequisites.map((it) => (
          <Button
            key={it.id}
            variant='default'
            h={100}
            onClick={() => setSelected(it.id)}
          >
            {it.name}
          </Button>
        ))}
      </SimpleGrid>
      <PrerequisiteDetails mt={'xl'} />
    </Box>
  );
}

function PrerequisiteForm({ program }: Props) {
  const form = useForm({
    initialValues: {
      name: '',
      minGrade: [
        {
          level: 1,
          grade: 'A*',
        },
        {
          level: 2,
          grade: 'A',
        },
      ],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label='Course Name'
        {...form.getInputProps('name')}
      />
      <Select withAsterisk label='Mi'></Select>
    </form>
  );
}
