import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apply Limkokwing',
  description:
    'Online Application for Limkokwing University of Creative Technology, Lesotho',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
