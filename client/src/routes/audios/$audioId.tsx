import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/audios/$audioId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/audios/$audioId"!</div>
}
