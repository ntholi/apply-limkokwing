import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/admin/courses')({
  component: () => <div>Hello /_admin/admin/courses!</div>
})