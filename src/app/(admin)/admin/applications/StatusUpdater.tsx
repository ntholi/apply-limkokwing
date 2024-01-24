'use client';
import {
  Button,
  Text,
  Group,
  Stack,
  ButtonGroup,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import React, { useTransition } from 'react';
import { IconBan, IconCheck, IconExclamationCircle } from '@tabler/icons-react';
import { ApplicationStatus, Application } from './modals/Application';
import { applicationsRepository } from './repository';
import { useRouter } from 'next/navigation';

type Props = {
  application: Application;
};
export default function StatusUpdater({ application }: Props) {
  const { status } = application;
  const [isPending, startTransition] = useTransition();

  async function updateStatus(status: ApplicationStatus) {
    await applicationsRepository.updateStatus(application.id, status);
  }

  const color =
    status === 'waitlisted' ? 'red' : status === 'accepted' ? 'green' : 'blue';

  return (
    <Box>
      <LoadingOverlay visible={isPending} />
      <Stack>
        <Group>
          <Text size='sm'>Status:</Text>
          <Text fw={500} size='sm' c={color} tt='capitalize'>
            {status}
          </Text>
        </Group>
        <ButtonGroup>
          <Button
            variant='default'
            leftSection={<IconExclamationCircle color='orange' size={15} />}
            size='xs'
            disabled={isPending}
            onClick={() => {
              updateStatus('waitlisted');
            }}
          >
            Waitlisted
          </Button>
          <Button
            color='orange'
            variant='default'
            size='xs'
            disabled={isPending}
            leftSection={<IconBan color='red' size={16} />}
            onClick={() => {
              updateStatus('rejected');
            }}
          >
            Reject
          </Button>
          <Button
            variant='default'
            leftSection={<IconCheck color='green' size={16} />}
            size='xs'
            disabled={isPending}
            onClick={() => {
              updateStatus('accepted');
            }}
          >
            Accepted
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
