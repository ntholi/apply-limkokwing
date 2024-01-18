'use client';
import React, { useEffect } from 'react';
import { Program } from './modal/program';
import { db } from '@/lib/config/firebase';
import {
  QuerySnapshot,
  collection,
  setDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { Box, Divider, Select, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

type Props = {
  program: Program;
};

export default function PrerequisiteView({ program }: Props) {
  const [prerequisites, setPrerequisites] = React.useState<Prerequisite[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'programs', program.id, 'prerequisites'),
      (snapshot: QuerySnapshot) => {
        const prerequisites: Prerequisite[] = [];
        snapshot.forEach((doc) => {
          prerequisites.push(doc.data() as Prerequisite);
        });
        setPrerequisites(prerequisites);
      }
    );
    return unsubscribe;
  }, [program.id]);

  return (
    <section>
      <Title order={3} mt={'lg'} fw={'lighter'}>
        Prerequisites
      </Title>
      <Divider />
      <PrerequisiteForm program={program} />
    </section>
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
    <Box maw={340} mx='auto'>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label='Course Name'
          {...form.getInputProps('name')}
        />
        <Select withAsterisk label='Mi'></Select>
      </form>
    </Box>
  );
}
