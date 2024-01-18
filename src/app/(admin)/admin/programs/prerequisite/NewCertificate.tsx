import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Stack } from '@mantine/core';
import { useState, useTransition } from 'react';
import { useQueryState } from 'nuqs';
import { db } from '@/lib/config/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function NewCertificate() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();
  const [_, setCertificateId] = useQueryState('certificate');
  const [programId] = useQueryState('id');
  const [name, setName] = useState('');

  function handleCreate() {
    startTransition(async () => {
      if (programId && name.trim().length > 0) {
        const doc = await addDoc(collection(db, 'certificates'), {
          name,
        });
        await setCertificateId(doc.id);
        close();
      }
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={name || 'New Certificate'}>
        <Stack>
          <TextInput
            label='Name'
            description='Name of the certificate'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button onClick={handleCreate} loading={isPending}>
            Save
          </Button>
        </Stack>
      </Modal>
      <Button onClick={open}>Create New</Button>
    </>
  );
}
