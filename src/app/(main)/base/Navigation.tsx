'use client';

import { Button, Divider, Flex, Group, Image } from '@mantine/core';
import NextImage from 'next/image';
import Link from 'next/link';
import logo from '/public/logo.png';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <>
      <Flex px={'md'} py={'xs'} justify={'space-between'}>
        <Group>
          <Link href='/'>
            <Image component={NextImage} src={logo} alt='logo' h={45} />
          </Link>
          <Button variant='subtle' color='gray' hiddenFrom='sm'>
            Courses
          </Button>
        </Group>
        <Group visibleFrom='sm'>
          <Button variant='subtle' color='gray'>
            Home
          </Button>
          <Button variant='subtle' color='gray'>
            Courses
          </Button>
          <Button variant='subtle' color='gray'>
            Apply
          </Button>
        </Group>
        <Group>
          <Button>Login</Button>
        </Group>
      </Flex>
      <Divider />
    </>
  );
}
