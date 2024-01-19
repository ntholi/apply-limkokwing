import cx from 'clsx';
import { rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import classes from './DndListHandle.module.css';
import { GradingScheme } from './Certificate';
import { useEffect } from 'react';

type Props = {
  data: GradingScheme[];
};

let was = { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' };

export default function DndListHandle({ data }: Props) {
  const [state, handlers] = useListState<GradingScheme>();

  useEffect(() => {
    handlers.setState(data);
  }, [data, handlers]);

  const items = state.map((item, index) => (
    <Draggable key={item.grade} index={index} draggableId={item.grade}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </div>
          <Text className={classes.symbol}>{item.level}</Text>
          <div>
            <Text>{item.grade}</Text>
            <Text c='dimmed' size='sm'>
              Position
            </Text>
          </div>
        </div>
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
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
