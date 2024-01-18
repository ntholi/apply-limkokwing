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
        <GradingSchemeForm certificateId={certificate.id} />
      </Group>
      <Divider mt={'xs'} mb={'sm'} />
      <Box pos='relative'>
        <LoadingOverlay visible={isPending} />
        <Table withRowBorders={false} highlightOnHover>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

function GradingSchemeForm({ certificateId }: { certificateId: string }) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<GradingScheme>({
    initialValues: {
      grade: '',
      level: 0,
    },

    validate: {
      grade: hasLength({ min: 1 }, 'Required'),
      level: isInRange({ min: 1, max: 20 }, 'Out of range'),
    },
  });

  function handleSubmit(value: GradingScheme) {
    startTransition(async () => {
      const res = await getDoc(doc(db, 'certificates', certificateId));
      if (res.exists()) {
        const data = res.data() as Certificate;
        if (data) {
          const gradingSchemes: GradingScheme[] = data.gradingSchemes || [];
          if (gradingSchemes.some((it) => it.level === value.level)) {
            notifications.show({
              message: 'Level already exists',
              color: 'red',
            });
            return;
          }
          gradingSchemes.push(value);
          const certificate: Certificate = {
            ...data,
            gradingSchemes,
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
        <NumberInput
          size='xs'
          placeholder='Level'
          {...form.getInputProps('level')}
        />
        <TextInput
          size='xs'
          placeholder='Grade'
          {...form.getInputProps('grade')}
        />
        <Button size='xs' type='submit' loading={isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
}
