'use client';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProgressBar } from 'next-nprogress-bar';
import React, { Suspense } from 'react';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ColorSchemeScript defaultColorScheme='dark' />
      <MantineProvider defaultColorScheme='dark'>
        <Notifications />
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
          <AppProgressBar
            height='3px'
            color='#2196F3'
            options={{ showSpinner: false }}
            shallowRouting
          />
        </ModalsProvider>
      </MantineProvider>
    </Suspense>
  );
}
