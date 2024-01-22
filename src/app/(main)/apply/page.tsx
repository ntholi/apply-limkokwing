'use client';
import React from 'react';
import Container from '../core/Container';
import { Button, Card, CardBody } from '@nextui-org/react';
import Stepper from '../components/Stepper';
import Qualifications from './Qualifications';
import { useSession } from '../auth/SessionProvider';
import { useRouter } from 'next/navigation';

export default function StartPage() {
  const { user, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/signin');
  }

  return (
    <Container>
      <h1 className='text-2xl'>Application</h1>
      <Stepper className='my-10' />
      <div className='mt-5 flex flex-col gap-5'>
        <Card className='bg-black/50'>
          <CardBody className='items-center'>
            {user && <Qualifications user={user} />}
          </CardBody>
        </Card>
        <nav className='flex justify-between'>
          <Button>Back</Button>
          <Button color='primary'>Next</Button>
        </nav>
      </div>
    </Container>
  );
}
