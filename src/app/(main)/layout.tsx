import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import '../globals.css';
import Providers from '../providers';
import Navigation from './base/Navigation';

export const metadata: Metadata = {
  title: 'Apply Limkokwing',
  description:
    'Online Application for Limkokwing University of Creative Technology, Lesotho',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
