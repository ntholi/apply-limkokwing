import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useQueryState } from 'next-usequerystate';

type Props = {
  disabled?: boolean;
};

export default function CreateBtn({ disabled }: Props) {
  const [_, setId] = useQueryState('id');
  const [__, setView] = useQueryState('view');

  return (
    <ActionIcon
      disabled={disabled}
      color='dark'
      aria-label='create new'
      onClick={async () => {
        await setId(null);
        await setView('create');
      }}
    >
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
