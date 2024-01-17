import { Button } from '@nextui-org/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};
export default function Stepper({ className }: Props) {
  return (
    <section className={twMerge(['flex gap-5', className])}>
      <Step
        label='1'
        name='Qualifications'
        description='Enter your qualifications'
      />
      <Step label='2' name='Documents' description='Upload your documents' />
      <Step label='3' name='Review' description='Review your application' />
    </section>
  );
}

type StepProps = { label: string; name: string; description: string };

function Step({ label, name, description }: StepProps) {
  return (
    <article className='flex gap-2'>
      <Button radius='full' isIconOnly size='lg'>
        {label}
      </Button>
      <div className='flex flex-col'>
        <span className='font-bold text-sm'>{name}</span>
        <span className='text-xs'>{description}</span>
      </div>
    </article>
  );
}
