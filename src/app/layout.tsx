import type { Metadata } from 'next';
import SessionProvider from './(main)/auth/SessionProvider';

export const metadata: Metadata = {
  title: 'Apply Online',
  description: 'Limkokwing Lesotho Online Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
