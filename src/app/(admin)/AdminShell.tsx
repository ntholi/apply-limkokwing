'use client';
import { auth } from '@/lib/config/firebase';
import {
  AppShell,
  Avatar,
  Burger,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  NavLink,
  ScrollArea,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconChevronRight,
  IconFileDescription,
  IconLogout2,
  IconMailbox,
  IconSchool,
} from '@tabler/icons-react';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { useSession } from '../(main)/auth/SessionProvider';
import { Faculties } from './admin/programs/modal/faculty';
import AccessDenied from './core/AccessDenied';
import Logo from './core/Logo';

export default function AdminShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { status } = useSession();
  const router = useRouter();
  const colorScheme = useComputedColorScheme('dark');

  if (status == 'loading') {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <LoadingOverlay visible />
      </Flex>
    );
  } else if (status == 'unauthenticated') {
    router.push('/auth/signin');
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
  const searchParams = useSearchParams();

  return (
    <AppShell.Navbar p='xs'>
      <AppShell.Section grow component={ScrollArea} pr={'lg'}>
        <NavLink
          label='Programs'
          leftSection={<IconSchool size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        >
          {Faculties.map((faculty) => (
            <NavLink
              key={faculty.code}
              label={faculty.code}
              description={faculty.name.replace('Faculty of ', '')}
              component={Link}
              active={
                pathname.startsWith(`/admin/programs`) &&
                searchParams.get('filter') === `faculty,${faculty.code}`
              }
              href={`/admin/programs?filter=faculty,${faculty.code}`}
              rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
            />
          ))}
        </NavLink>
        <NavLink
          label='Applications'
          leftSection={<IconMailbox size='1.1rem' />}
          opened
        >
          {Faculties.map((faculty) => (
            <NavLink
              key={faculty.code}
              label={faculty.code}
              description={faculty.name.replace('Faculty of ', '')}
              component={Link}
              active={
                pathname.startsWith(`/admin/applications`) &&
                searchParams.get('filter') === `faculty,${faculty.code}`
              }
              href={`/admin/applications?filter=faculty,${faculty.code}`}
              rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
            />
          ))}
        </NavLink>
        <NavLink
          label='Certificates'
          component={Link}
          active={pathname.startsWith('/admin/certificates')}
          href={'/admin/certificates'}
          leftSection={<IconFileDescription size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
      </AppShell.Section>
      <AppShell.Section>
        <Divider mb='md' />
        <UserButton />
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
