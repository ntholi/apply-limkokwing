import { Button, ButtonProps } from '@nextui-org/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { Check } from 'lucide-react';
import { RootState } from '@/lib/redux/store';
import { setStep } from '@/lib/redux/features/stepSlice';
import { useSession } from '../auth/SessionProvider';

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
    { step: 2, name: 'Documents', description: 'Upload your documents' },
    { step: 3, name: 'Review', description: 'Review your application' },
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
  const activeStep = useSelector((state: RootState) => state.stepper.value);
  const dispatch = useDispatch();
  const { user } = useSession();

  const buttonRef = React.useRef<HTMLButtonElement>(null);
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
          size='lg'
          onClick={() =>
            dispatch(
              setStep({
                value: step,
                userId: user?.uid!,
              })
            )
          }
        >
          {activeStep && step < activeStep ? <Check /> : step}
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
