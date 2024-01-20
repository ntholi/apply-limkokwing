import { Button, Flex, Group, TextInput } from '@mantine/core';
import React from 'react';
import { certificateRepository } from './repository';
import PassingGrade from './PassingGrade';
import { Certificate } from './Certificate';

type Props = {
  certificate: Certificate;
};

export default function GradingSchemeForm({ certificate }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const [grade, setGrade] = React.useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      if (certificate.id && grade.trim().length > 0) {
        await certificateRepository.addGradingScheme(certificate.id, grade);
        setGrade('');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group align='center'>
        <TextInput
          placeholder='Grade'
          value={grade}
          onChange={(event) => setGrade(event.currentTarget.value)}
        />
        <Button type='submit' loading={isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
}
