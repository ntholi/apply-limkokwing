'use client';
import React, { useEffect } from 'react';
import Container from '../core/Container';
import { Button, Spinner } from '@nextui-org/react';
import Stepper from '../components/Stepper';
import Qualifications from './qualifications/Qualifications';
import { useSession } from '../auth/SessionProvider';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useApplication } from './ApplicationProvider';
import DocumentsUpload from './documents/DocumentsUpload';
import Review from './review/Review';
import ContentWrapper from '../components/ContentWrapper';
import { useRouter } from 'next/navigation';
import CoursePicker from './courses/CoursePicker';

export default function StartPage() {
  const [isPending, startTransition] = React.useTransition();
  const [step, setStep] = useQueryState('step', parseAsInteger.withDefault(1));
  const { user, status } = useSession();
  const [canProceed, setCanProceed] = React.useState(false);
  const router = useRouter();
  const application = useApplication();

  function handleSubmit() {
    startTransition(async () => {
      if (application) {
        await applicationsRepository.updateStatus(application.id, 'submitted');
      }
    });
    router.push('/apply/status');
  }

  if (status === 'unauthenticated') {
    router.push(`/auth/signin?redirect=apply`);
  }

  useEffect(() => {
    if (!application) return;
    if (step === 1 && application.results.length > 0) {
      setCanProceed(true);
    } else if (step === 2 && application.firstChoice) {
      setCanProceed(true);
    } else if (step === 3 && application.documents.length > 0) {
      setCanProceed(true);
    } else if (step === 4) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [application, step]);

  if (!application) {
    return (
      <div className='w-full mt-20 flex justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const steps = [
    <ContentWrapper key={1}>
      <Qualifications />
    </ContentWrapper>,
    <ContentWrapper key={2}>
      <CoursePicker application={application} />
    </ContentWrapper>,
    <ContentWrapper key={3}>
      <DocumentsUpload />
    </ContentWrapper>,
    <Review key={4} />,
  ];

  return (
    <Container>
      <h1 className='text-2xl'>Application</h1>
      <Stepper className='my-10' />
      <div className='mt-5 flex flex-col gap-5'>
        {steps[step - 1]}
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
            isDisabled={!canProceed}
            onClick={() => {
              if (step < steps.length) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            isLoading={isPending}
          >
            {step === steps.length ? 'Submit' : 'Next'}
          </Button>
        </nav>
      </div>
    </Container>
  );
}
