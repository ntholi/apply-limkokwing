import { Button, Group, Paper } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function SubmitButton({ children }: Props) {
  return (
    <Paper
      withBorder
      radius={0}
      bottom={6}
      left={-8}
      right={6}
      pos='absolute'
      p='lg'
    >
      <Group justify='flex-end'>
        <Button type='submit' color='dark' w={{ base: '100%', md: 300 }} h={40}>
          {children}
        </Button>
      </Group>
    </Paper>
  );
}
