'use client';

import { NextUIProvider } from '@nextui-org/react';
import SessionProvider from './auth/SessionProvider';
import ApplicationProvider from './apply/ApplicationProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <ApplicationProvider>{children}</ApplicationProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}

export default Providers;
