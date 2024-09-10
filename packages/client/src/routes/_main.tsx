import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: MainLayout,
});

function MainLayout() {
  return (
    <div>
      <h1>Main Layout</h1>
      <Outlet />
    </div>
  );
}
