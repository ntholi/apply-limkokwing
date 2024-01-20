'use client';
import {
  MantineColorSchemeManager,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { ModalsProvider } from '@mantine/modals';
import { AppProgressBar } from 'next-nprogress-bar';
import SessionProvider from '../(main)/auth/SessionProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    breakpoints: {
      xl: '1538px',
    },
  });

  return (
    <MantineProvider forceColorScheme='dark' theme={theme}>
      <Notifications />
      <ModalsProvider>
        <SessionProvider>
          {children}
          <AppProgressBar
            height='3px'
            color='#2196F3'
            options={{ showSpinner: false }}
            shallowRouting
          />
        </SessionProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
