import NextLink from 'next/link';
import { Button } from '@nextui-org/button';
import React from 'react';
import { useApplication } from '../apply/ApplicationProvider';

export default function HomeButton() {
  const application = useApplication();
  return application ? (
    <Button
      color='primary'
      className='mt-20 w-full sm:w-52'
      radius='full'
      as={NextLink}
      fullWidth={true}
      href='/apply/status'
    >
      View My Application
    </Button>
  ) : (
    <Button
      color='primary'
      className='mt-20 w-full sm:w-52'
      radius='full'
      as={NextLink}
      fullWidth={true}
      href='/apply'
    >
      Apply Now
    </Button>
  );
}
