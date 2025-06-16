import { isAuthenticated } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      console.log(" hello ");
      throw redirect({ to: "/register" });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>;
}
