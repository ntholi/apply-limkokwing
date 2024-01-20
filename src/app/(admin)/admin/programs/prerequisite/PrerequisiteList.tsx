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
} from '@mantine/core';
import { IconCheck, IconTrashX } from '@tabler/icons-react';

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

  return (
    <Stack {...props}>
      {prerequisites.map((it) => (
        <Flex key={`${it.certificateId}${it.courseName}`}>
          <Flex w='100%' justify='space-between'>
            <Group>
              <ThemeIcon color='teal' size='sm' radius='xl'>
                <IconCheck
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Text>{it.courseName}</Text>
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
        </Flex>
      ))}
    </Stack>
  );
}

export default PrerequisiteList;
