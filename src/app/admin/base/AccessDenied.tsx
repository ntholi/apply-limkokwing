import { Button, Stack, Text, Title } from '@mantine/core';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function AccessDenied() {
  return (
    <Stack align='center' justify='center' h={'80vh'}>
      <div>
        <ShieldAlert className='text-red-500' size={100} />
      </div>
      <Title>Access Denied</Title>
      <Text>You don't have permission to access this page.</Text>
      <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
      <Button component={Link} href={'/'}>
        Home Page
      </Button>
    </Stack>
  );
}
