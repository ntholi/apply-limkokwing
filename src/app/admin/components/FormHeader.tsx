'use client';
import {
  Button,
  CloseButton,
  Divider,
  Flex,
  Group,
  Title,
} from '@mantine/core';
import React from 'react';
import { SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  title?: string;
  isLoading?: boolean;
};

export default function FormHeader({ title, isLoading }: Props) {
  const router = useRouter();
  return (
    <>
      <Flex justify={title ? 'space-between' : 'end'} align={'center'}>
        {title && (
          <Title order={3} fw={100}>
            {title}
          </Title>
        )}
        <Group>
          <Button
            type='submit'
            loading={isLoading}
            leftSection={<SaveIcon size={'1rem'} />}
          >
            Save
          </Button>
          <CloseButton size={'lg'} onClick={() => router.back()} />
        </Group>
      </Flex>
      <Divider my={15} />
    </>
  );
}
