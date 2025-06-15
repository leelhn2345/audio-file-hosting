import { Button } from "@ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@stores/user";
import { LogOut, UserCog, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

export function Header({ children }: Props) {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(undefined);
      toast.success("Logout successful.");
      navigate({ to: "/" });
    },
  });

  function handleLogout() {
    mutate();
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <UserRound />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex">
                      <UserCog className="mr-2 h-4 w-4" />
                      <span>Manage Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
