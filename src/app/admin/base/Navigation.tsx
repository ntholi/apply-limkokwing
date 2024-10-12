'use client';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Divider,
  Flex,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { ChevronRight, LogOutIcon, Users } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppShell.Navbar p='xs'>
      <AppShell.Section grow component={ScrollArea}>
        <NavLink
          label='Users'
          component={Link}
          active={pathname.startsWith('/admin/users')}
          href={'/admin/users'}
          leftSection={<Users size='1.1rem' />}
          rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
        />
      </AppShell.Section>
      <AppShell.Section>
        <Divider />
        <UserButton />
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function UserButton() {
  const { data: session } = useSession();

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm logout',
      children: 'Are you sure you want to logout?',
      confirmProps: { color: 'dark' },
      labels: { confirm: 'Logout', cancel: 'Cancel' },
      onConfirm: async () => await signOut(),
    });

  return (
    <Flex mt={'md'} mb={'sm'} justify='space-between' align={'center'}>
      <Group>
        <Avatar src={session?.user?.image} />
        <Stack gap={5}>
          <Text size='0.9rem'>{session?.user?.name}</Text>
          <Text size='0.7rem' c={'dimmed'}>
            {session?.user?.email}
          </Text>
        </Stack>
      </Group>
      <ActionIcon variant='default' size={'lg'}>
        <LogOutIcon size='1rem' onClick={openModal} />
      </ActionIcon>
    </Flex>
  );
}

// function NotificationIndicator({
//   children,
//   label,
// }: PropsWithChildren<{ label: React.ReactNode }>) {
//   return (
//     <Indicator
//       position='middle-end'
//       color='red'
//       offset={20}
//       size={23}
//       label={label}
//       disabled={!label}
//     >
//       {children}
//     </Indicator>
//   );
// }
