import Gradient from '@/components/base/Gradient';
import Navbar from '@/components/base/Navbar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: MainLayout,
});

function MainLayout() {
  return (
    <Gradient>
      <Navbar />
      <main className='px-4 py-8'>
        <Outlet />
      </main>
    </Gradient>
  );
}
