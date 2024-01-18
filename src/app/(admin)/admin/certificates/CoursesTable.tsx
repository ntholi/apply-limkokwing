import React, { useEffect } from 'react';
import { Certificate } from './Certificate';
import { Box, Divider, Paper, PaperProps, Table, Title } from '@mantine/core';
import { db } from '@/lib/config/firebase';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';

type Props = {
  certificate: Certificate;
} & PaperProps;
export default function CoursesTable({ certificate, ...props }: Props) {
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
    <Table withRowBorders={false} highlightOnHover>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
