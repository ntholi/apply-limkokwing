import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/courses')({
  component: () => <div>Hello /courses!</div>
})