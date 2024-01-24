'use client';

import { NextUIProvider } from '@nextui-org/react';
import SessionProvider from './auth/SessionProvider';
import ApplicationProvider from './apply/ApplicationProvider';
import { Suspense } from 'react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <NextUIProvider>
        <SessionProvider>
          <ApplicationProvider>{children}</ApplicationProvider>
        </SessionProvider>
      </NextUIProvider>
    </Suspense>
  );
}

export default Providers;
