'use client';
import { useDisclosure } from '@mantine/hooks';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Divider,
  Flex,
  Group,
  Indicator,
  LoadingOverlay,
  NavLink,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconBike,
  IconBuildingStore,
  IconChevronRight,
  IconGauge,
  IconLogout2,
  IconMailbox,
  IconMessage,
  IconMoon,
  IconSchool,
  IconSettings,
  IconShoppingBag,
  IconSpeakerphone,
  IconSun,
  IconTruckDelivery,
  IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AccessDenied from './core/AccessDenied';
import { modals } from '@mantine/modals';
import Logo from './core/Logo';
import { useSession } from '../(main)/auth/SessionProvider';
import { auth } from '@/lib/config/firebase';
import { signOut } from 'firebase/auth';

export default function AdminShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { user, status } = useSession();
  const router = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('light');

  if (status == 'loading') {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <LoadingOverlay visible />
      </Flex>
    );
  } else if (status == 'unauthenticated') {
    router.push('/admin/signin');
    return null;
  }

  const hasAccess = true; //user?.role === 'admin';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: hasAccess ? 300 : 0,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md' justify='space-between'>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='md'
              size='sm'
            />
            <Logo />
          </Group>
        </Group>
      </AppShell.Header>
      {hasAccess && <Navigation />}
      <AppShell.Main bg={colorScheme === 'dark' ? 'dark.8' : 'gray.0'}>
        {hasAccess ? children : <AccessDenied />}
      </AppShell.Main>
    </AppShell>
  );
}

function UserButton() {
  const { user } = useSession();

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm logout',
      children: 'Are you sure you want to logout?',
      confirmProps: { color: 'dark' },
      labels: { confirm: 'Logout', cancel: 'Cancel' },
      onConfirm: () => signOut(auth),
    });

  return (
    <NavLink
      label='Logout'
      description={user?.displayName}
      onClick={openModal}
      leftSection={<Avatar src={user?.photoURL} />}
      rightSection={<IconLogout2 size='1.1rem' />}
    />
  );
}

function Navigation() {
  const pathname = usePathname();

  return (
    <AppShell.Navbar p='md'>
      <AppShell.Section grow>
        <NavLink
          component={Link}
          href={'/admin/faculties'}
          label='Faculties'
          active={pathname.startsWith('/admin/faculties')}
          leftSection={<IconSchool size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='Applications'
          leftSection={<IconMailbox size='1.1rem' />}
          opened
        >
          <NavLink
            label='Applications'
            component={Link}
            active={pathname.startsWith('/admin/store-applications')}
            href={'/admin/store-applications'}
            leftSection={<IconMessage size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
          <NavLink
            label='Stores'
            component={Link}
            active={pathname.startsWith('/admin/stores')}
            href={'/admin/stores'}
            leftSection={<IconBuildingStore size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
        </NavLink>
      </AppShell.Section>
      <AppShell.Section>
        <Divider mb='md' />
        <UserButton />
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
