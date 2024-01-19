import {
  Button,
  ComboboxItem,
  Divider,
  Flex,
  Modal,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import { useState, useTransition } from 'react';
import { Certificate } from '../../certificates/Certificate';
import { Prerequisite } from '../modal/program';
import { programRepository } from '../repository';

type Props = {
  certificate: Certificate;
};

export default function PrerequisiteForm({ certificate }: Props) {
  const [programId] = useQueryState('id');
  const [course, setCourse] = useState<string | null>(null);
  const [grade, setGrade] = useState<ComboboxItem | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      if (course && grade && programId && certificate) {
        const prerequisite = {
          certificateId: certificate.id,
          courseName: course,
          minGrade: Number(grade.value),
        } as Prerequisite;
        await programRepository.addPrerequisite(programId, prerequisite);
        close();
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
          <Button onClick={save} loading={isPending}>
            Save
          </Button>
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
      <Divider mt='xs' mb={'lg'} />
    </>
  );
}
