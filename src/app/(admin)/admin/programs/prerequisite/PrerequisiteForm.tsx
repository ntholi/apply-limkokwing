import {
  Box,
  Button,
  ComboboxItem,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import { Certificate, GradingScheme } from '../../certificates/Certificate';
import { useEffect, useState, useTransition } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { db } from '@/lib/config/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useQueryState } from 'nuqs';

type Props = {
  certificate: Certificate;
};

export default function PrerequisiteForm({ certificate }: Props) {
  const [program] = useQueryState('id');
  const [course, setCourse] = useState<string | null>(null);
  const [grade, setGrade] = useState<ComboboxItem | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      if (course && grade && program && certificate) {
        const docRef = collection(db, 'programs', program, 'prerequisites');
        await setDoc(doc(docRef), {
          course,
          grade: Number(grade.value),
          certificate: certificate,
        });
      }
    });
  }

  if (!certificate) return null;
  return (
    <>
      <Modal opened={opened} onClose={close} title='New Prerequisite'>
        <Stack>
          <Select
            data={certificate.courses}
            value={course}
            onChange={setCourse}
          />
          <Select
            data={certificate.gradingSchemes?.map((it) => ({
              value: String(it.level),
              label: it.grade,
            }))}
            value={grade ? grade.value : null}
            onChange={(_, option) => setGrade(option)}
          />
          <Button onClick={save}>Save</Button>
        </Stack>
      </Modal>

      <Flex justify={'space-between'}>
        <Title order={4} fw={'lighter'}>
          Prerequisites
        </Title>
        <Button
          color='gray'
          onClick={open}
          leftSection={<IconPlus size={16} />}
        >
          New
        </Button>
      </Flex>
    </>
  );
}
