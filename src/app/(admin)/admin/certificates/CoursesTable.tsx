import React, { useEffect } from 'react';
import { Certificate } from './Certificate';
import {
  ActionIcon,
  Box,
  BoxProps,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { db } from '@/lib/config/firebase';
import {
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  runTransaction,
} from 'firebase/firestore';
import { IconTrashFilled } from '@tabler/icons-react';
import { hasLength, useForm } from '@mantine/form';

type Props = {
  certificate: Certificate;
} & PaperProps;

export default function CoursesTable({ certificate, ...props }: Props) {
  const [courses, setCourses] = React.useState<string[]>([]);
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    const docRef = doc(db, 'certificates', certificate.id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Certificate;
        if (data) {
          setCourses(data.courses || []);
        }
      }
    });
    return () => unsubscribe();
  }, [certificate.id]);

  function handleDelete(course: string) {
    const docRef = doc(db, 'certificates', certificate.id);
    startTransition(async () => {
      const newCourses = courses.filter((it) => it !== course);
      await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(docRef);
        if (doc.exists()) {
          const data = doc.data() as Certificate;
          if (data) {
            transaction.update(docRef, { courses: newCourses });
          }
        }
      });
    });
  }

  const rows = courses.map((course) => (
    <Table.Tr key={course}>
      <Table.Td>{course}</Table.Td>
      <Table.Td align='right'>
        <ActionIcon
          color='red'
          disabled={isPending}
          variant='light'
          onClick={() => handleDelete(course)}
        >
          <IconTrashFilled size={'0.9rem'} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p='md' {...props}>
      <Group justify='space-between'>
        <Title order={4} fw={'lighter'}>
          Courses
        </Title>
        <CourseForm certificateId={certificate.id} />
      </Group>
      <Divider mt={'xs'} mb={'sm'} />
      <Table withRowBorders={false} highlightOnHover>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}

function CourseForm({ certificateId }: { certificateId: string }) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: hasLength({ min: 1 }, 'Required'),
    },
  });

  function handleSubmit(value: { name: string }) {
    startTransition(async () => {
      const res = await getDoc(doc(db, 'certificates', certificateId));
      if (res.exists()) {
        const data = res.data() as Certificate;
        if (data) {
          const courses: string[] = data.courses || [];
          courses.push(value.name);
          const certificate: Certificate = {
            ...data,
            courses,
          };
          await setDoc(doc(db, 'certificates', certificateId), certificate);
          form.reset();
        }
      }
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group align='center'>
        <TextInput
          size='xs'
          placeholder='New Course'
          {...form.getInputProps('name')}
        />
        <Button size='xs' type='submit' loading={isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
}
