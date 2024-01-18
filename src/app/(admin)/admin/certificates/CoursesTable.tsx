import React, { useEffect } from 'react';
import { Certificate } from './Certificate';
import {
  ActionIcon,
  Box,
  BoxProps,
  Divider,
  Paper,
  PaperProps,
  Table,
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

type Props = {
  certificate: Certificate;
} & BoxProps;
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
    <Box {...props}>
      <Table withRowBorders={false} highlightOnHover>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
}
