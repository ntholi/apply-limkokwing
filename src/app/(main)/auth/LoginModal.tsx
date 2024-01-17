'use client';
import React from 'react';
import {
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { MdArrowBack } from 'react-icons/md';
import { auth } from '@/lib/config/firebase';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

type Steps = 'start' | 'sign_in' | 'sign_up';

export default function LoginModal({ children }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [step, setStep] = React.useState<Steps>('start');

  return (
    <>
      <Button color='default' variant='flat' onPress={onOpen}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='mt-5 flex items-center justify-between gap-1'>
                <span>Account</span>
                {step !== 'start' && (
                  <Button
                    size='sm'
                    startContent={<MdArrowBack />}
                    onClick={() => setStep('start')}
                  >
                    Back
                  </Button>
                )}
              </ModalHeader>
              <ModalBody>
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
                                // .then(() => {
                                //   router.push('/admin');
                                // })
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
                          <span className='absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium '>
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

type Input = {
  names: string;
  email: string;
  password: string;
  confirm_password: string;
};

function SignInForm({
  step,
  setStep,
}: {
  step: Steps;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Input>();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setLoading(true);
    try {
      if (step === 'sign_in') {
        try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
          console.error({ error });
          setError('Error signing in. Please try again.');
        }
      } else if (step === 'sign_up') {
        try {
          await createUserWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
          console.error({ error });
          setError('Error signing up. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    const email = getValues('email');
    if (!email) return;

    try {
      const res = await axios.get('/api/users', { params: { email } });
      if (res.data.exists) {
        setStep('sign_in');
      } else {
        setStep('sign_up');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method='POST'>
      <div className='space-y-6'>
        <Input
          type='email'
          variant='bordered'
          label='Email'
          isDisabled={step !== 'start' && getValues('email').length > 0}
          {...register('email', { required: true })}
        />
        {step === 'sign_up' && (
          <>
            <Input
              type='text'
              variant='bordered'
              label='Full Names'
              {...register('names', {
                required: true,
                minLength: 3,
              })}
            />
            <Input
              type='password'
              variant='bordered'
              required
              label='Password'
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              errorMessage={
                errors.password?.type === 'minLength' &&
                'Password must be at least 6 characters'
              }
            />
            <Input
              type='password'
              variant='bordered'
              required
              label='Confirm Password'
              {...register('confirm_password', {
                required: true,
                minLength: 6,
              })}
              errorMessage={
                getValues('confirm_password') !== getValues('password') &&
                'The passwords do not match'
              }
            />
          </>
        )}

        {step == 'sign_in' && (
          <Input
            type='password'
            variant='bordered'
            required
            label='Password'
            {...register('password', {
              required: true,
              minLength: 6,
            })}
          />
        )}

        <div>
          {step === 'start' ? (
            <Button
              color='primary'
              variant='solid'
              onClick={handleContinue}
              type='button'
              isLoading={loading}
              className='flex w-full justify-center p-6'
            >
              Continue
            </Button>
          ) : (
            <Button
              color='primary'
              variant='solid'
              type='submit'
              isLoading={loading}
              className='flex w-full justify-center p-6'
            >
              {
                {
                  sign_in: 'Sign In',
                  sign_up: 'Sign Up',
                }[step]
              }
            </Button>
          )}
          {error && (
            <p className='text-center text-sm text-danger-foreground'>
              {error}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
