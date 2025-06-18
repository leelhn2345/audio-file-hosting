import { getGenreById } from "@/api/genre";
import { deleteAudio } from "@/api/audio";
import { isAuthenticated } from "@/utils/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { ArrowLeft, Music, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/genres/$genreId")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const { genreId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteAudioId, setDeleteAudioId] = useState<string | null>(null);

  const {
    data: genre,
    isPending,
    error,
  } = useQuery({
    queryKey: ["genre", genreId],
    queryFn: () => getGenreById(genreId),
  });

  const deleteAudioMutation = useMutation({
    mutationFn: deleteAudio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genre", genreId] });
      setDeleteAudioId(null);
      toast.success("Audio deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete audio: ${error.message}`);
    },
  });

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
                Loading genre...
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
                Genre Not Found
              </h3>
              <p className="mb-4 text-red-600">{error.message}</p>
              <div className="flex justify-center gap-2">
                <Button
                  onClick={() => navigate({ to: "/genres" })}
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Genres
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Try Again
                </Button>
              </div>
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
          {/* Header with back button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate({ to: "/genres" })}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Genres
            </Button>
          </div>

          {/* Genre Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br
                  from-purple-100 to-blue-100"
              >
                <Music className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1
                  className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold
                    text-transparent"
                >
                  {genre?.name}
                </h1>
                <p className="mt-1 text-gray-600">
                  {genre?.audios?.length === 0
                    ? "No audio files in this genre yet"
                    : `${genre?.audios?.length} audio ${genre?.audios?.length === 1 ? "file" : "files"}`}
                </p>
              </div>
            </div>
          </div>

          {/* Audio Files Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Audio Files
              </h2>
              <p className="mt-1 text-gray-600">
                All audio files in the{" "}
                <b className="text-xl font-extrabold">{genre?.name}</b> genre.
              </p>
            </div>

            {genre?.audios?.length === 0 ? (
              <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full
                      bg-gradient-to-br from-purple-100 to-blue-100"
                  >
                    <Music className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No audio files yet
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Upload audio files and assign them to the {genre?.name}{" "}
                    genre to see them here.
                  </p>
                  <Button
                    onClick={() => navigate({ to: "/audios" })}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
                      hover:to-blue-700"
                  >
                    <Music className="mr-2 h-4 w-4" />
                    Upload Audio
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {genre?.audios?.map((audio) => (
                  <Card
                    key={audio.id}
                    className="group border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all
                      duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge
                            variant="secondary"
                            className="border-0 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 text-sm
                              font-medium text-purple-700"
                          >
                            Audio
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setDeleteAudioId(audio.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Audio
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            navigate({ to: `/audios/${audio.id}` })
                          }
                        >
                          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                            {audio.name || "Untitled"}
                          </h3>
                          {audio.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                              {audio.description}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">
                            Uploaded{" "}
                            {new Date(audio.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
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
      <AlertDialog
        open={!!deleteAudioId}
        onOpenChange={() => setDeleteAudioId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Audio</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this audio file? This action
              cannot be undone. The audio file will be permanently removed from
              your library and all associated data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteAudioId) {
                  deleteAudioMutation.mutate(deleteAudioId);
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
