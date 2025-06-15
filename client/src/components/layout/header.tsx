import { Button } from "@ui/button";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { logout } from "@/api/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { UserRound } from "lucide-react";

type Props = {
  children: ReactNode;
};

export function Header({ children }: Props) {
  const user = useAtomValue(userAtom);
  return (
    <header
      className="border-border/40 bg-background/90 supports-[backdrop-filter]:bg-background/60
        sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div className="container mx-auto flex h-12 justify-between max-sm:px-2">
        {children}
        <div className="flex items-center gap-x-2">
          {user ? (
            <>
              <UserRound />
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
