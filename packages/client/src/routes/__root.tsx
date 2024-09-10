import { ModeToggle } from '@/components/theme/mode-toggle';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Outlet />
      <div className='fixed bottom-0 right-0 p-4'>
        <ModeToggle />
      </div>
    </ThemeProvider>
  ),
});
