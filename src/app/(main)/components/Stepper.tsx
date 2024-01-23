'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import useIsMobile from '@/app/hooks/useIsMobile';

type Props = {
  className?: string;
};
export default function Stepper({ className }: Props) {
  const steps = [
    {
      step: 1,
      name: 'Qualifications',
      description: 'Enter your qualifications',
    },
    {
      step: 2,
      name: 'Course',
      description: 'Select course',
    },
    { step: 3, name: 'Documents', description: 'Upload your documents' },
    { step: 4, name: 'Review', description: 'Review your application' },
  ];
  return (
    <section
      className={twMerge([
        'flex justify-between items-center gap-3',
        className,
      ])}
    >
      {steps.map((item, i) => (
        <Step key={item.step} {...item} showLine={i != steps.length - 1} />
      ))}
    </section>
  );
}

type StepProps = {
  step: number;
  name: string;
  description: string;
  showLine?: boolean;
};

function Step({ step, name, description, showLine = false }: StepProps) {
  const [activeStep] = useQueryState('step', parseAsInteger.withDefault(1));
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  return (
    <>
      <article
        className={clsx(
          'cursor-pointer flex gap-2 items-center',
          showLine && 'flex-1'
        )}
        onClick={() => buttonRef.current?.click()}
      >
        <Button
          ref={buttonRef}
          radius='full'
          isIconOnly
          variant={activeStep && step <= activeStep ? 'solid' : 'bordered'}
          color={activeStep && step <= activeStep ? 'primary' : 'default'}
          size={isMobile ? 'md' : 'lg'}
        >
          {activeStep && step < activeStep ? <Check /> : step}
        </Button>
        <div className='flex flex-col'>
          <span className='font-light sm:font-bold text-xs sm:text-sm'>
            {name}
          </span>
          {showLine && <div className='h-2 border-b w-full block sm:hidden' />}
          <span className='hidden sm:block text-xs'>{description}</span>
        </div>
        {showLine && <div className='h-2 border-b w-full hidden sm:block' />}
      </article>
    </>
  );
}
