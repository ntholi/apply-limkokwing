'use client';

import { NextUIProvider } from '@nextui-org/react';
import SessionProvider from './auth/SessionProvider';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </Provider>
  );
}

export default Providers;
