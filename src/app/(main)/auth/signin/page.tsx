'use client';
import { auth } from '@/lib/config/firebase';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
} from '@nextui-org/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Container from '../../core/Container';
import SignInForm, { Steps } from './SignInForm';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const [step, setStep] = React.useState<Steps>('start');
  const router = useRouter();
  return (
    <Container width='xs'>
      <Card>
        <CardHeader className='justify-center'>
          <h1 className='text-lg'>Account</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex min-h-full flex-1 flex-col justify-center px-6 pb-10 lg:px-8'>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
              {step === 'start' && (
                <>
                  <div className='space-y-3'>
                    <Button
                      variant='bordered'
                      className='flex w-full justify-start border-1 border-zinc-500 p-6'
                      startContent={<FcGoogle size='1.4rem' />}
                      onClick={() =>
                        signInWithPopup(auth, new GoogleAuthProvider())
                          .then(() => {
                            router.push('/');
                          })
                          .catch((error) => {
                            console.error({ error });
                          })
                      }
                    >
                      Continue with Google
                    </Button>
                    <Button
                      variant='bordered'
                      isDisabled={true}
                      className='flex w-full justify-start border-1 border-zinc-500 p-6'
                      startContent={
                        <FaFacebook color='#1877F2' size='1.4rem' />
                      }
                    >
                      Continue with Facebook
                    </Button>
                  </div>

                  <div className='inline-flex w-full items-center justify-center'>
                    <Divider className='my-8 h-px ' />
                    <span className='absolute left-1/2 -translate-x-1/2 light:bg-white px-3 font-medium '>
                      OR
                    </span>
                  </div>
                  <h3 className='mb-2 ps-1 text-small text-default-500'>
                    Email and password
                  </h3>
                </>
              )}
              <SignInForm step={step} setStep={setStep} />
              <p
                className='mt-10 text-center text-sm text-gray-500'
                color='foreground'
              >
                Already registered?{' '}
                <Link
                  onClick={() => setStep('sign_in')}
                  className='cursor-pointer'
                  size='sm'
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
