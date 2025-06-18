import { getGenres, postGenre, deleteGenre } from "@/api/genre";
import { isAuthenticated } from "@/utils/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, MoreVertical, Trash2 } from "lucide-react";

export const Route = createFileRoute("/genres/")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});

const createGenreSchema = z.object({
  name: z
    .string()
    .min(1, "Genre name is required")
    .max(50, "Genre name must be less than 50 characters"),
});

type CreateGenreForm = z.infer<typeof createGenreSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [deleteGenreId, setDeleteGenreId] = useState<string | null>(null);

  const {
    data: genres,
    isPending,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    initialData: { data: [], total: 0 },
  });

  const form = useForm<CreateGenreForm>({
    resolver: zodResolver(createGenreSchema),
    defaultValues: {
      name: "",
    },
  });

  const createGenreMutation = useMutation({
    mutationFn: postGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      form.reset();
      setIsCreating(false);
      toast.success("Genre created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create genre: ${error.message}`);
    },
  });

  const deleteGenreMutation = useMutation({
    mutationFn: deleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      setDeleteGenreId(null);
      toast.success("Genre deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete genre: ${error.message}`);
    },
  });

  const onSubmit = (data: CreateGenreForm) => {
    createGenreMutation.mutate(data.name);
  };

  if (isPending) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br
              from-purple-400 to-blue-400 opacity-20 blur-3xl"
          />
          <div
            className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br
              from-blue-400 to-purple-400 opacity-20 blur-3xl"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-8">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="space-y-4 text-center">
              <div
                className="inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-full
                  bg-gradient-to-br from-purple-100 to-blue-100"
              >
                <div
                  className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600
                    border-t-transparent"
                ></div>
              </div>
              <p className="text-lg font-medium text-gray-700">
                Loading genres...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br
              from-purple-400 to-blue-400 opacity-20 blur-3xl"
          />
          <div
            className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br
              from-blue-400 to-purple-400 opacity-20 blur-3xl"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-8">
          <Card className="mx-auto max-w-md border-0 bg-white/70 shadow-xl backdrop-blur-sm">
            <CardContent className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Error Loading Genres
              </h3>
              <p className="mb-4 text-red-600">{error.message}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br
            from-purple-400 to-blue-400 opacity-20 blur-3xl"
        />
        <div
          className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br
            from-blue-400 to-purple-400 opacity-20 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1
              className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold
                text-transparent"
            >
              Genres
            </h1>
            <Button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white
                hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create Genre
            </Button>
          </div>

          {isCreating && (
            <Card className="border-0 bg-white/70 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Create New Genre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-gray-700">
                            Genre Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              placeholder="e.g., Jazz, Rock, Classical..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={createGenreMutation.isPending}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
                          hover:to-blue-700"
                      >
                        {createGenreMutation.isPending
                          ? "Creating..."
                          : "Create Genre"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsCreating(false);
                          form.reset();
                        }}
                        className="border-gray-200 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                All Genres
              </h2>
              <p className="mt-1 text-gray-600">
                {genres.total === 0
                  ? "No genres created yet"
                  : `${genres.total} ${genres.total === 1 ? "genre" : "genres"} total`}
              </p>
            </div>

            {genres.data.length === 0 ? (
              <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full
                      bg-gradient-to-br from-purple-100 to-blue-100"
                  >
                    <Plus className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No genres yet
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Get started by creating your first genre to organize your
                    audio files.
                  </p>
                  <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
                      hover:to-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Genre
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {genres.data.map((genre) => (
                  <Card
                    key={genre.id}
                    className="group border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all
                      duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => navigate({ to: `/genres/${genre.id}` })}
                        >
                          <h3 className="text-center text-xl font-semibold text-gray-900">
                            {genre.name}
                          </h3>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setDeleteGenreId(genre.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Genre
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteGenreId} onOpenChange={() => setDeleteGenreId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Genre</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this genre? This action cannot be undone.
              All audio files tagged with this genre will lose this tag.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteGenreId) {
                  deleteGenreMutation.mutate(deleteGenreId);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

