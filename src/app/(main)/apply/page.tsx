'use client';
import React, { useEffect } from 'react';
import Container from '../core/Container';
import { Button, Card, CardBody } from '@nextui-org/react';
import Stepper from '../components/Stepper';
import Qualifications from './Qualifications';
import { useSession } from '../auth/SessionProvider';
import { useRouter } from 'next/navigation';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';

export default function StartPage() {
  const [application, setApplication] = React.useState<Application>();
  const { user, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    return applicationsRepository.listenForDocument(user.uid, (data) => {
      setApplication(data);
    });
  }, [user]);

  if (status === 'unauthenticated') {
    router.push('/signin');
  }

  return (
    <Container>
      <h1 className='text-2xl'>Application</h1>
      <Stepper className='my-10' />
      <div className='mt-5 flex flex-col gap-5'>
        <Card className='bg-black/40'>
          <CardBody className='items-center p-4 sm:p-8'>
            {user && <Qualifications application={application} user={user} />}
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
