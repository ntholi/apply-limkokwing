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
import { useQueryState } from 'nuqs';

export default function GradingSchemeForm() {
  const [certificateId] = useQueryState('id');
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

  if (!certificateId) return null;
  function handleSubmit(value: GradingScheme) {
    startTransition(async () => {
      const res = await getDoc(doc(db, 'certificates', certificateId!));
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
          await setDoc(doc(db, 'certificates', certificateId!), certificate);
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
