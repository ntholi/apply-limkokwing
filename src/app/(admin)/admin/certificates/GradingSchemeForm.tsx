import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { hasLength, isInRange, useForm } from '@mantine/form';
import { useQueryState } from 'nuqs';
import React from 'react';
import { GradingScheme } from './Certificate';
import { certificateRepository } from './repository';

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
      if (certificateId) {
        await certificateRepository.addGradingScheme(certificateId, value);
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
