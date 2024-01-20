import { Button, Group, TextInput } from '@mantine/core';
import { useQueryState } from 'nuqs';
import React from 'react';
import { certificateRepository } from './repository';

export default function GradingSchemeForm() {
  const [certificateId] = useQueryState('id');
  const [isPending, startTransition] = React.useTransition();
  const [grade, setGrade] = React.useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      if (certificateId && grade.trim().length > 0) {
        await certificateRepository.addGradingScheme(certificateId, grade);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group align='center'>
        <TextInput
          size='xs'
          placeholder='Grade'
          value={grade}
          onChange={(event) => setGrade(event.currentTarget.value)}
        />
        <Button size='xs' type='submit' loading={isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
}
