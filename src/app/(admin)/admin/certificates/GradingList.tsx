import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Certificate, GradingScheme } from './Certificate';
import { IconGripVertical, IconTrashX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { certificateRepository } from './repository';
import GradingSchemeForm from './GradingSchemeForm';
import PassingGrade from './PassingGrade';

type Props = {
  certificate: Certificate;
} & PaperProps;

export default function GradingList({ certificate, ...props }: Props) {
  const [state, { setState }] = useListState<GradingScheme>();

  useEffect(() => {
    return certificateRepository.listenForDocument(certificate.id, (data) => {
      const gradingSchemes = data.gradingSchemes || [];
      setState(gradingSchemes.sort((a, b) => a.level - b.level));
    });
  }, [setState, certificate.id]);

  async function handleDelete(gradingScheme: GradingScheme) {
    await certificateRepository.deleteGradingScheme(
      certificate.id,
      gradingScheme
    );
  }

  const items = state.map((item, index) => (
    <Draggable key={item.grade} index={index} draggableId={item.grade}>
      {(provided, snapshot) => (
        <Paper
          withBorder
          p={'sm'}
          radius={'md'}
          bg={snapshot.isDragging ? 'dark.8' : 'dark.6'}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Flex align={'center'} gap={'md'} justify={'space-between'}>
            <Group>
              <Group align='center' gap={5}>
                <IconGripVertical
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
                <Text size={rem(10)} c={'dark.1'}>
                  {item.level}
                </Text>
              </Group>

              <Title w={50}>{item.grade}</Title>
            </Group>
            <ActionIcon
              variant='light'
              color='red'
              onClick={() => handleDelete(item)}
            >
              <IconTrashX
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Flex>
        </Paper>
      )}
    </Draggable>
  ));

  return (
    <Paper withBorder p='md' mt={0} {...props}>
      <Flex justify='space-between' align={'end'}>
        <PassingGrade certificate={certificate} />
        <GradingSchemeForm certificate={certificate} />
      </Flex>
      <Divider mt={'xs'} mb={'sm'} />
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          certificateRepository.reorderGradingSchemes(
            certificate.id,
            source.index + 1,
            (destination?.index || 0) + 1
          );
        }}
      >
        <Droppable droppableId='dnd-list' direction='vertical'>
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
}
