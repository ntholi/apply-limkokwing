import { Avatar, Button, Flex, Menu } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <Flex justify={'end'} miw={100}>
      {session?.user ? (
        <Menu>
          <Menu.Target>
            <Avatar
              style={{ cursor: 'pointer' }}
              src={session?.user?.image}
              radius='xl'
              size={'md'}
            >
              {session?.user?.name?.slice(0, 2)}
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{session?.user?.name}</Menu.Label>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button
          component={Link}
          href='/login'
          variant='outline'
          color='gray'
          radius='xl'
        >
          Login
        </Button>
      )}
    </Flex>
  );
}
