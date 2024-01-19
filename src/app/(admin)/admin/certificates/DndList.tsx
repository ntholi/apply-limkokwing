import cx from 'clsx';
import { Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GradingScheme } from './Certificate';

const data: GradingScheme[] = [
  { grade: 'A', level: 1 },
  { grade: 'B', level: 3 },
  { grade: 'C', level: 3 },
  { grade: 'D', level: 4 },
];

type Props = {
  data: GradingScheme[];
};

export default function DndList({ data: _data }: Props) {
  const [state, handlers] = useListState<GradingScheme>(data);

  const items = state.map((item, index) => (
    <Draggable key={item.grade} index={index} draggableId={item.grade}>
      {(provided, snapshot) => (
        <Paper
          withBorder
          p={'sm'}
          bg={snapshot.isDragging ? 'dark.8' : 'transparent'}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Flex>
            <Title w={50}>{item.grade}</Title>
            <div>
              <Text>{item.level}</Text>
              <Text c='dimmed' size='sm'>
                Position
              </Text>
            </div>
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
      <Stack>
        <Droppable droppableId='dnd-list' direction='vertical'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Stack>
    </DragDropContext>
  );
}
