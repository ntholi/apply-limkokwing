import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account')({
  component: () => <div>Hello /account!</div>
})