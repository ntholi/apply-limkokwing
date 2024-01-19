import React, { useEffect } from 'react';
import { Certificate, GradingScheme } from './Certificate';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  NumberInput,
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
import { hasLength, isInRange, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import GradingSchemeForm from './GradingSchemeForm';

type Props = {
  certificate: Certificate;
} & PaperProps;

export default function GradingSchemesTable({ certificate, ...props }: Props) {
  const [gradingSchemes, setGradingSchemes] = React.useState<GradingScheme[]>(
    []
  );
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    const docRef = doc(db, 'certificates', certificate.id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Certificate;
        if (data) {
          setGradingSchemes(data.gradingSchemes || []);
        }
      }
    });
    return () => unsubscribe();
  }, [certificate.id]);

  function handleDelete(gradingScheme: GradingScheme) {
    const docRef = doc(db, 'certificates', certificate.id);
    startTransition(async () => {
      const newGradingSchemes = gradingSchemes.filter(
        (it) => it.level !== gradingScheme.level
      );
      await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(docRef);
        if (doc.exists()) {
          const data = doc.data() as Certificate;
          if (data) {
            transaction.update(docRef, { gradingSchemes: newGradingSchemes });
          }
        }
      });
    });
  }

  const rows = gradingSchemes.map((it) => (
    <Table.Tr key={it.level}>
      <Table.Td>{it.level}</Table.Td>
      <Table.Td>{it.grade}</Table.Td>
      <Table.Td align='right'>
        <ActionIcon
          color='red'
          disabled={isPending}
          variant='light'
          onClick={() => handleDelete(it)}
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
          Grading Schemes
        </Title>
        <GradingSchemeForm />
      </Group>
      <Divider mt={'xs'} mb={'sm'} />
      <Box pos='relative'>
        <LoadingOverlay visible={isPending} />
        <Table withRowBorders={false} highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Td>Level</Table.Td>
              <Table.Td>Grade</Table.Td>
              <Table.Td />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}
