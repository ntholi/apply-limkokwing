'use client';

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Flex,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '/public/logo.png';
import NextImage from 'next/image';

export default function Navigation() {
  return (
    <>
      <Flex px={'md'} py={'xs'} justify={'space-between'}>
        <Image component={NextImage} src={logo} alt='logo' h={45} />
        <Group>
          <Button variant='subtle' color='gray'>
            Home
          </Button>
          <Button variant='subtle' color='gray'>
            Apply
          </Button>
          <Button variant='subtle' color='gray'>
            Courses
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
