import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorComponentProps {
  error?: Error | string;
  onRetry?: () => void;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  title?: string;
  description?: string;
}

export function ErrorComponent({
  error,
  onRetry,
  showHomeButton = true,
  showBackButton = false,
  title = "Something went wrong",
  description,
}: ErrorComponentProps) {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const defaultDescription =
    description || "An unexpected error occurred. Please try again.";

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

      <div className="relative w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-6 text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl
                bg-gradient-to-br from-red-500 to-orange-500"
            >
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
            <p className="mt-2 text-gray-600">{defaultDescription}</p>
            {errorMessage && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="font-mono text-sm break-words text-red-700">
                  {errorMessage}
                </p>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="h-11 w-full bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-white
                    hover:from-purple-700 hover:to-blue-700"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}

              <div className="flex gap-3">
                {showBackButton && (
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="h-11 flex-1 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Button>
                )}

                {showHomeButton && (
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/")}
                    className={`h-11 border-gray-200 hover:border-purple-300 hover:bg-purple-50 ${
                    showBackButton ? "flex-1" : "w-full" }`}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Button>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 text-center">
              <p className="text-xs text-gray-500">
                If this problem persists, please contact support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Specific error components for common use cases
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorComponent
      title="Network Error"
      description="Unable to connect to the server. Please check your internet connection."
      onRetry={onRetry}
      showBackButton
    />
  );
}

export function NotFoundError() {
  return (
    <ErrorComponent
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      showHomeButton
      showBackButton
    />
  );
}

export function UnauthorizedError() {
  return (
    <ErrorComponent
      title="Access Denied"
      description="You don't have permission to access this resource."
      showHomeButton
      showBackButton
    />
  );
}

export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorComponent
      title="Server Error"
      description="Something went wrong on our end. We're working to fix it."
      onRetry={onRetry}
      showHomeButton
    />
  );
}

