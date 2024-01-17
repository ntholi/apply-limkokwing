'use client';

import { NextUIProvider } from '@nextui-org/react';
import SessionProvider from './auth/SessionProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}

export default Providers;
