'use client';
import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Text,
  Image,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from './Navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import logo from '/public/logo.png';

export default function AdminShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { status } = useSession();
  const colorScheme = useComputedColorScheme('dark');
  const { data: session } = useSession();
  const router = useRouter();

  if (status == 'loading') {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <LoadingOverlay visible />
      </Flex>
    );
  }

  // if (session?.user?.role !== 'admin') {
  //   return (
  //     <Modal
  //       opened={true}
  //       onClose={() => {
  //         router.push('/');
  //       }}
  //       title='Access Denied'
  //     >
  //       <Box>
  //         <Text>You are not authorized to access this page</Text>
  //       </Box>
  //     </Modal>
  //   );
  // }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
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
            <Link href='/'>
              <Image component={NextImage} src={logo} alt='logo' h={45} />
            </Link>
          </Group>
        </Group>
      </AppShell.Header>
      <Navigation />
      <AppShell.Main bg={colorScheme === 'dark' ? 'dark.8' : 'gray.0'}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
