import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@stores/user";
import { LogOut, UserCog, UserRound, Headphones, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  children: ReactNode;
};

export function Header({ children }: Props) {
  const [user, setUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(undefined);
      toast.success("Logout successful.");
      navigate({ to: "/" });
      setIsOpen(false);
    },
  });

  function handleLogout() {
    mutate();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/60 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br
              from-purple-600 to-blue-600"
          >
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <span
            className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold
              text-transparent"
          >
            AudioHost
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">{children}</div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-0 hover:bg-purple-50"
                >
                  <UserRound
                    className="text-purple-600"
                    height={10}
                    width={10}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-48">
                <DropdownMenuLabel className="text-purple-600">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex cursor-pointer">
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
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
                  hover:to-blue-700"
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5 text-purple-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br
                      from-purple-600 to-blue-600"
                  >
                    <Headphones className="h-4 w-4 text-white" />
                  </div>
                  <span
                    className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-lg font-bold
                      text-transparent"
                  >
                    AudioHost
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-3">
                  <Link
                    to="/"
                    className="rounded-lg px-4 py-2 text-lg font-medium text-gray-700 transition-all
                      hover:bg-purple-50 hover:text-purple-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="rounded-lg px-4 py-2 text-lg font-medium text-gray-700 transition-all
                      hover:bg-purple-50 hover:text-purple-600"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  {user && (
                    <>
                      <Link
                        to="/audios"
                        className="rounded-lg px-4 py-2 text-lg font-medium text-gray-700 transition-all
                          hover:bg-purple-50 hover:text-purple-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Audios
                      </Link>
                      <Link
                        to="/genres"
                        className="rounded-lg px-4 py-2 text-lg font-medium text-gray-700 transition-all
                          hover:bg-purple-50 hover:text-purple-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Genres
                      </Link>
                    </>
                  )}
                </nav>

                {/* Mobile Actions */}
                <div className="border-t pt-6">
                  {user ? (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        asChild
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/profile" className="flex items-center">
                          <UserCog className="mr-2 h-4 w-4" />
                          Manage Profile
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        asChild
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white
                          hover:from-purple-700 hover:to-blue-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/register">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
