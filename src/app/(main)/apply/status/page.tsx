'use client';

import React from 'react';
import Container from '../../core/Container';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
} from '@nextui-org/react';
import { useSession } from '../../auth/SessionProvider';
import { useApplication } from '../ApplicationProvider';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';

export default function ApplicationStatusPage() {
  const application = useApplication();
  const router = useRouter();
  const { status } = useSession();
  const pathname = usePathname();

  if (status === 'unauthenticated') {
    router.push(`/auth/signin?redirect=apply/status`);
  }

  if (!application) {
    return (
      <div className='w-full mt-20 flex justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  return (
    <Container>
      <h1 className='text-xl'>My Application</h1>
      <Divider className='my-4' />
      <Card className='max-w-[400px] mt-4'>
        <CardHeader className='flex gap-3'>
          <div className='flex flex-col w-full'>
            <div className='flex justify-between'>
              <p className='text-md'>Application Status</p>
            </div>
            <p className='text-small text-default-500'>
              Status:{' '}
              <span
                className={clsx([
                  `text-default-900 capitalize`,
                  getStatusColor(application?.status),
                ])}
              >
                {application?.status}
              </span>
            </p>
          </div>
          <Button size='sm'>Update</Button>
        </CardHeader>
        <Divider />
        <CardBody className='gap-3'>
          <InfoDisplay
            label='Names'
            value={`${application.userDetails?.firstName} ${application.userDetails?.lastName}`}
          />

          <InfoDisplay
            label='First Choice'
            value={application.firstChoice?.programName}
          />
          <InfoDisplay
            label='Second Choice'
            value={application.secondChoice?.programName}
          />
        </CardBody>
      </Card>
    </Container>
  );
}

function InfoDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <div className='flex flex-col gap-1'>
      <p className=''>{value || '(Empty)'}</p>
      <label className='text-xs mt-0 text-default-500'>{label}</label>
    </div>
  );
}

function getStatusColor(status: Application['status'] | undefined) {
  switch (status) {
    case 'submitted':
      return 'text-primary-500';
    case 'incomplete':
      return 'text-warning-500';
    case 'accepted':
      return 'text-success-500';
    case 'rejected':
      return 'text-error-500';
    default:
      return 'text-default-500';
  }
}
