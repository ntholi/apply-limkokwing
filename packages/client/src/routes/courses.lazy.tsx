import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/courses')({
  component: () => <div>Hello /courses!</div>
})