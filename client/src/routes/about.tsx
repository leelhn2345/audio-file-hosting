import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@ui/button";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <Button>hello</Button>
    </div>
  );
}
