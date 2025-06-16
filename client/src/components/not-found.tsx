import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, Frown } from "lucide-react";

export function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50
        via-white to-blue-50 px-4"
    >
      {/* Background Elements */}
      <div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-purple-400 to-pink-400 opacity-20 blur-3xl"
      ></div>
      <div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-blue-400 to-cyan-400 opacity-20 blur-3xl"
      ></div>

      <div className="relative w-full max-w-md text-center">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-6">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl
                bg-gradient-to-br from-purple-600 to-blue-600"
            >
              <Frown className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="mb-2 text-3xl font-bold text-gray-900">
              404
            </CardTitle>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Page Not Found
            </h2>
            <p className="text-gray-600">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or doesn't exist.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                asChild
                className="h-11 w-full bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-white
                  hover:from-purple-700 hover:to-blue-700"
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 w-full border-gray-200 hover:border-purple-300 hover:bg-purple-50"
              >
                <Link to="/about">
                  <Search className="mr-2 h-4 w-4" />
                  Learn About Us
                </Link>
              </Button>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="mb-3 text-xs text-gray-500">
                Need help? Here are some popular pages:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs
                    text-purple-700 transition-colors hover:bg-purple-100"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700
                    transition-colors hover:bg-blue-100"
                >
                  About
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs
                    text-green-700 transition-colors hover:bg-green-100"
                >
                  Register
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
