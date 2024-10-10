import { ThemeProvider } from '@/components/theme/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { SessionProvider } from '@hono/auth-js/react';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme='dark' storageKey='limkokwing-ui-theme'>
      <SessionProvider>
        <Outlet />
      </SessionProvider>
    </ThemeProvider>
  ),
});
