import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/admin/')({
  component: () => <div>Hello /admin/!</div>
})