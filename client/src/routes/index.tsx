import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="container mx-auto">
      <h1>Welcome Home!</h1>
    </main>
  );
}
