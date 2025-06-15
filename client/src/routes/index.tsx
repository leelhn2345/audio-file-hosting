import { isAuthenticated } from "@/utils/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>Welcome Home!</h1>
      {isAuthenticated() ? <div>dashboard here</div> : <div>login please</div>}
    </div>
  );
}
