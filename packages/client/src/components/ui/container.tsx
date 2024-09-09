import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export default function Container({
  children,
  width = 'lg',
  className = '',
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[width]} ${className}`}
    >
      {children}
    </div>
  );
}
