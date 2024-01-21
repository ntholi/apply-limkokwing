import {
  Button,
  ComboboxItem,
  Divider,
  Flex,
  FlexProps,
  Group,
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
} & FlexProps;

export default function PrerequisiteForm({ certificate, ...props }: Props) {
  const [programId] = useQueryState('id');
  const [course, setCourse] = useState<string | null>(null);
  const [grade, setGrade] = useState<ComboboxItem | null>(null);
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      if (course && grade && programId && certificate) {
        const prerequisite = {
          certificateId: certificate.id,
          courseName: course,
          minGrade: {
            grade: grade.label,
            level: Number(grade.value),
          },
        } as Prerequisite;
        await programRepository.addPrerequisite(programId, prerequisite);
        setCourse(null);
        setGrade(null);
      }
    });
  }

  if (!certificate) return null;
  return (
    <>
      <Flex justify={'space-between'} {...props}>
        <Title order={4} fw={'lighter'}>
          Prerequisites
        </Title>
        <Group>
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
          <Button color='gray' onClick={save} loading={isPending}>
            Create
          </Button>
        </Group>
      </Flex>
      <Divider mt='xs' mb={'lg'} />
    </>
  );
}
