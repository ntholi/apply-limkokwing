'use client';
import { ActionIcon, ActionIconProps, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

type Props = {
  action: (id: any) => Promise<void>;
  id: number | string;
} & ActionIconProps;

export default function DeleteIconButton({ action, id, ...props }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Confirm Delete',
      children: (
        <Text size='sm'>Are you sure you want to delete this photo?</Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => handleDelete(),
    });

  function handleDelete() {
    startTransition(async () => {
      await action(id);
      router.back();
    });
  }
  return (
    <ActionIcon color='red' loading={isPending} onClick={openModal} {...props}>
      <TrashIcon size={'1rem'} />
    </ActionIcon>
  );
}
