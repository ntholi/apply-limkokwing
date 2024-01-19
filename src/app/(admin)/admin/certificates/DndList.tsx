import { Flex, Group, Paper, Stack, Text, Title, rem } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GradingScheme } from './Certificate';
import { IconGripVertical } from '@tabler/icons-react';
import { useEffect } from 'react';

type Props = {
  data: GradingScheme[];
};

export default function DndList({ data }: Props) {
  const [state, { setState, ...handlers }] = useListState<GradingScheme>();

  useEffect(() => {
    setState(data);
  }, [data, setState]);

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
          <Flex align={'center'} gap={'md'}>
            <Group align='center' gap={5}>
              <IconGripVertical
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
              <Text size={rem(10)} c={'dark.1'}>
                {index + 1}
              </Text>
            </Group>

            <Title w={50}>{item.grade}</Title>
          </Flex>
        </Paper>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
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
  );
}
