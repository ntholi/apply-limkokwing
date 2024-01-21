import React, { useEffect, useState } from 'react';
import { Prerequisite } from '../modal/program';
import { useQueryState } from 'nuqs';
import { programRepository } from '../repository';
import {
  Group,
  List,
  ThemeIcon,
  Text,
  ActionIcon,
  rem,
  Flex,
  Stack,
  StackProps,
  Switch,
} from '@mantine/core';
import { IconCheck, IconQuestionMark, IconTrashX } from '@tabler/icons-react';

function PrerequisiteList(props: StackProps) {
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([]);
  const [programId] = useQueryState('id');
  const [certificateId] = useQueryState('certificate');

  useEffect(() => {
    if (programId) {
      return programRepository.listenForDocument(programId, (data) => {
        const prerequisites = data.prerequisites || [];
        setPrerequisites(
          prerequisites.filter((it) => it.certificateId === certificateId)
        );
      });
    }
  }, [certificateId, programId]);

  async function handleDelete(prerequisite: Prerequisite) {
    if (programId) {
      await programRepository.removePrerequisite(programId, prerequisite);
    }
  }

  async function updatePrerequisite(
    prerequisite: Prerequisite,
    value: boolean
  ) {
    if (programId) {
      await programRepository.updatePrerequisite(programId, prerequisite, {
        ...prerequisite,
        mandatory: value,
      });
    }
  }

  return (
    <Stack {...props}>
      {prerequisites.map((it) => (
        <Flex
          key={`${it.certificateId}${it.courseName}`}
          w='100%'
          justify='space-between'
          align={'center'}
        >
          <Group>
            <ThemeIcon
              color={it.mandatory ? 'teal' : 'gray'}
              size='sm'
              radius='xl'
            >
              <IconCheck size={'1rem'} stroke={2} />
            </ThemeIcon>
            <div>
              <Text>{it.courseName}</Text>
              <Text size='xs' c={'dimmed'}>
                Mandatory Grade: {it.minGrade.grade}
              </Text>
            </div>
            <Stack gap={5} ml={60}>
              <Switch
                onChange={(e) => updatePrerequisite(it, e.target.checked)}
                size='xs'
                checked={it.mandatory}
                label={it.mandatory ? 'Mandatory' : 'Optional'}
                description={`Prerequisite is ${
                  it.mandatory ? 'Mandatory' : 'Optional'
                }`}
              />
            </Stack>
          </Group>

          <ActionIcon
            variant='light'
            color='red'
            onClick={() => handleDelete(it)}
          >
            <IconTrashX
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Flex>
      ))}
    </Stack>
  );
}

export default PrerequisiteList;
