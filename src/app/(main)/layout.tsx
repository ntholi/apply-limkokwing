import './globals.css';
import Providers from './providers';
import Navbar from './home/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  );
}
