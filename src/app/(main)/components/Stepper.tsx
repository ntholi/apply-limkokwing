'use client';
import { Button, Progress } from '@nextui-org/react';
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
  const isMobile = useIsMobile();
  const steps = [
    {
      step: 1,
      name: 'Personal',
      description: 'Personal details',
    },
    {
      step: 2,
      name: 'Qualifications',
      description: 'Enter your qualifications',
    },
    {
      step: 3,
      name: 'Course',
      description: 'Select course',
    },
    { step: 4, name: 'Documents', description: 'Upload your documents' },
    { step: 5, name: 'Review', description: 'Review your application' },
  ];

  if (isMobile)
    return (
      <nav className={className}>
        <MobileStepper steps={steps} />
      </nav>
    );

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

function MobileStepper({ steps }: { steps: StepProps[] }) {
  const [activeStep] = useQueryState('step', parseAsInteger.withDefault(1));
  return (
    <Progress
      size='sm'
      label={steps[activeStep - 1].name}
      showValueLabel={true}
      value={activeStep}
      maxValue={steps.length}
    />
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

  return (
    <nav
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
        size='lg'
      >
        {activeStep && step < activeStep ? <Check /> : step}
      </Button>
      <div className='flex flex-col'>
        <span className='font-light sm:font-bold text-xs sm:text-sm'>
          {name}
        </span>
        <span className='text-xs'>{description}</span>
      </div>
      {showLine && <div className='h-2 border-b w-full' />}
    </nav>
  );
}
