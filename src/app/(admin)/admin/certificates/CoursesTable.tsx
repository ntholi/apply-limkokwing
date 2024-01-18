import React, { useEffect } from 'react';
import { Certificate } from './Certificate';
import { Box, Divider, Paper, Table, Title } from '@mantine/core';
import { db } from '@/lib/config/firebase';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';

type Props = {
  certificate: Certificate;
};
export default function CoursesTable({ certificate }: Props) {
  const [courses, setCourses] = React.useState<string[]>([]);

  console.log('certificate', certificate);

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

  const rows = courses.map((course) => (
    <Table.Tr key={course}>
      <Table.Td>{course}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p='md'>
      <Title order={4} fw={'lighter'}>
        Courses
      </Title>
      <Divider mt={'xs'} mb={'sm'} />
      <Table withRowBorders={false}>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
