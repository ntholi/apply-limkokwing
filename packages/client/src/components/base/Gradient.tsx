import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Gradient({ children, className }: Props) {
  return (
    <div className={cn('relative min-h-screen', className)}>
      {children}
      <div className='pointer-events-none fixed inset-0'>
        <div className='absolute inset-0 bg-gradient-to-bl from-transparent via-blue-900/10 to-blue-900/15' />
      </div>
    </div>
  );
}
