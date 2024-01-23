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

type Input = {
  names: string;
  email: string;
  password: string;
  confirm_password: string;
};
export type Steps = 'start' | 'sign_in' | 'sign_up';
type Props = {
  step: Steps;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

export default function SignInForm({ step, setStep }: Props) {
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
