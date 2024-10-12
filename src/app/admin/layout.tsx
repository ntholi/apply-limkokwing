import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';

import AdminShell from '@admin/base/AdminShell';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Admin | Apply Limkokwing',
  description: 'Apply Limkokwing',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return <AdminShell>{children}</AdminShell>;
}
