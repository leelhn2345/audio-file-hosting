import { isAuthenticated } from "@/utils/auth";
import { userAtom } from "@stores/user";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useAtomValue(userAtom);
  return (
    <div>
      <h1>Welcome Home!</h1>
      {user ? <div>dashboard here</div> : <div>login please</div>}
    </div>
  );
}
