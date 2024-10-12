import { signIn } from '@/auth';
import {
  Box,
  Button,
  Center,
  Divider,
  Image,
  Paper,
  Stack,
} from '@mantine/core';
import NextImage from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import logo from '/public/logo.png';

export default function LoginPage() {
  async function handleSignIn() {
    'use server';
    await signIn('google');
  }

  return (
    <Center h='80vh' p='md'>
      <Box w={{ base: '100%', md: '400px' }} mt={{ base: '2rem', md: '5rem' }}>
        <Paper withBorder p='xl' component='form' action={handleSignIn}>
          <Image
            component={NextImage}
            src={logo}
            alt='logo'
            h={'auto'}
            mx='auto'
            w={250}
          />
          <Divider label='Login' labelPosition='center' my='md' />

          <Stack mt='xl'>
            <Button
              type='submit'
              variant='default'
              fullWidth
              leftSection={<FcGoogle />}
            >
              Login with Google
            </Button>
            <Button
              type='submit'
              color='blue'
              fullWidth
              leftSection={<FaFacebook />}
            >
              Login with Facebook
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Center>
  );
}
