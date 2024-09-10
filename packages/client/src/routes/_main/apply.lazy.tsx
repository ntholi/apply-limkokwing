import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_main/apply')({
  component: () => <div>Hello /apply!</div>,
});
