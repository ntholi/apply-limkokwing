import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin')({
  component: MainLayout,
});

function MainLayout() {
  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  );
}
