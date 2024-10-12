import { auth } from '@/auth';
import { Stack, Text, Title } from '@mantine/core';
import { Suspense } from 'react';

export default function AdminPage() {
  return (
    <Stack h={'70vh'} w={'100%'} justify='center' align='center'>
      <div>
        <Title fw={'lighter'}>Admin Panel</Title>
        <Suspense fallback={<Text>...</Text>}>
          <UserDisplay />
        </Suspense>
      </div>
    </Stack>
  );
}

async function UserDisplay() {
  const session = await auth();
  return (
    <Text size='sm' mt='xs'>
      Welcome, {session?.user?.name}
    </Text>
  );
}
