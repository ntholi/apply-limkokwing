import { Button } from '@nextui-org/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Props = {
  className?: string;
};
export default function Stepper({ className }: Props) {
  const steps = [
    {
      label: '1',
      name: 'Qualifications',
      description: 'Enter your qualifications',
    },
    { label: '2', name: 'Documents', description: 'Upload your documents' },
    { label: '3', name: 'Review', description: 'Review your application' },
  ];
  return (
    <section
      className={twMerge([
        'flex justify-between items-center gap-3',
        className,
      ])}
    >
      {steps.map((step, i) => (
        <Step key={step.label} {...step} showLine={i != steps.length - 1} />
      ))}
    </section>
  );
}

type StepProps = {
  label: string;
  name: string;
  description: string;
  showLine?: boolean;
};

function Step({ label, name, description, showLine = false }: StepProps) {
  return (
    <>
      <article
        className={clsx('flex gap-2 items-center', showLine && 'flex-1')}
      >
        <Button radius='full' isIconOnly size='lg'>
          {label}
        </Button>
        <div className='flex flex-col'>
          <span className='font-bold text-sm'>{name}</span>
          <span className='text-xs'>{description}</span>
        </div>
        {showLine && <div className='h-2 border-b w-full' />}
      </article>
    </>
  );
}
