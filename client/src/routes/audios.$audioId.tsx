import { isAuthenticated } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/audios/$audioId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { audioId } = Route.useParams();
  return <div>Hello "/audios/$audioId"!</div>;
}
