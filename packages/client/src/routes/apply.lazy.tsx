import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/apply')({
  component: () => <div>Hello /apply!</div>,
});
