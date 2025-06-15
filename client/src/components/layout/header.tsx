import { Button } from "@ui/button";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { isAuthenticated } from "@/utils/auth";
import { logout } from "@/api/auth";

type Props = {
  children: ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header
      className="border-border/40 bg-background/90 supports-[backdrop-filter]:bg-background/60
        sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div className="container mx-auto flex h-12 justify-between max-sm:px-2">
        {children}
        <div className="flex items-center gap-x-2">
          {isAuthenticated() ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
