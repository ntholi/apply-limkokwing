'use client';
import React, { useEffect } from 'react';
import Container from '../core/Container';
import { Button, Card, CardBody, Spinner } from '@nextui-org/react';
import Stepper from '../components/Stepper';
import Qualifications from './Qualifications';
import { useSession } from '../auth/SessionProvider';
import { useRouter } from 'next/navigation';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function StartPage() {
  const [step, setStep] = useQueryState('step', parseAsInteger.withDefault(1));
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
  if (!user) {
    return (
      <div className='w-full mt-20 flex justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const steps = [
    <Qualifications key={1} application={application} user={user} />,
  ];

  return (
    <Container>
      <h1 className='text-2xl'>Application</h1>
      <Stepper className='my-10' />
      <div className='mt-5 flex flex-col gap-5'>
        <Card className='bg-black/40'>
          <CardBody className='items-center p-4 sm:p-8'>
            {steps[step - 1]}
          </CardBody>
        </Card>
        <nav className='flex justify-between'>
          <Button
            isDisabled={step === 1}
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
          >
            Back
          </Button>
          <Button
            color='primary'
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Next
          </Button>
        </nav>
      </div>
    </Container>
  );
}
