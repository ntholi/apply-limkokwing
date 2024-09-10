import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/admin/applications')({
  component: () => <div>Hello /_admin/admin/applications!</div>
})