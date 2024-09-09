import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Navbar from '@/components/Navbar';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
});
