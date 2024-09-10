import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/account')({
  component: () => <div>Hello /account!</div>
})