import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

function Container({ children, as, width = 'lg', ...props }: Props) {
  const widthMap = {
    xs: 'max-w-[30rem]',
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className='bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] via-20% to-60% from-slate-900 via-slate-950 to-black min-h-[91.5vh]'>
      {React.createElement(
        as || 'div',
        {
          ...props,
          className: twMerge(
            'container mx-auto px-4 py-8 sm:py-12',
            widthMap[width],
            props.className
          ),
        },
        children
      )}
    </div>
  );
}

export default Container;
