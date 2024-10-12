import type { PropsWithChildren } from 'react';
import Navigation from './base/Navigation';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
