import { isAuthenticated } from "@/utils/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userAtom } from "@stores/user";
import { getAudios, deleteAudio, type Audio } from "@/api/audio";
import { generateDownloadUrl, type DownloadFileObject } from "@/api/file";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Upload,
  Music,
  Play,
  Download,
  Trash2,
  Plus,
  Calendar,
  FileAudio,
} from "lucide-react";
import { UploadDialog } from "@/components/upload-dialog";

export const Route = createFileRoute("/audios/")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
    );
  };

  const { mutate: downloadAudio, isPending: isDownloading } = useMutation({
    mutationFn: async (audio: Audio) => {
      const downloadFileObject: DownloadFileObject = {
        bucket: audio.fileObject.bucket,
        objectKey: audio.fileObject.objectKey,
      };

      const presignedUrl = await generateDownloadUrl(downloadFileObject);

      // Fetch the file as a blob to force download in all browsers
      const response = await fetch(presignedUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Create blob URL and download link
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = audio.name || "audio-file";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      return presignedUrl;
    },
    onSuccess: () => {
      toast.success("Download started successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Download failed: ${error.message}`);
    },
  });

  const { mutate: removeAudio, isPending: isDeleting } = useMutation({
    mutationFn: async (audioId: string) => {
      return await deleteAudio(audioId);
    },
    onSuccess: () => {
      toast.success("Audio file deleted successfully!");
      // Refresh the audio list
      refetch();
    },
    onError: (error: Error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const {
    data: audioData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["audios"],
    queryFn: getAudios,
    initialData: { data: [], total: 0, totalFileSize: 0 },
  });

  // if (!audioData || isPending) {
  //   return <div>spinner here</div>;
  // }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (bytes === 0 || bytes === null) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <Card className="shadow-lg">
            <CardContent className="py-12">
              <FileAudio className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Failed to load audio files
              </h3>
              <p className="mb-6 text-gray-600">
                There was an error loading your audio files.
              </p>
              <Button
                onClick={() => refetch()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700
                  hover:to-blue-700"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Background Elements */}
      <div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-purple-400 to-pink-400 opacity-20 blur-3xl"
      ></div>
      <div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-blue-400 to-cyan-400 opacity-20 blur-3xl"
      ></div>

      <div className="relative px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Welcome back, {user?.name ? toTitleCase(user.name) : ""}!
            </h1>
            <p className="text-gray-600">Manage and share your audio content</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="shadow-lg transition-shadow hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Audio Files
                  </CardTitle>
                  <Music className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {isPending ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    audioData.total
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Files uploaded</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg transition-shadow hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Storage Used
                  </CardTitle>
                  <FileAudio className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {isPending ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    formatFileSize(audioData.totalFileSize)
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Total file size</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg transition-shadow hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Recent Uploads
                  </CardTitle>
                  <Upload className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {isPending ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    audioData.data.filter(
                      (audio) =>
                        new Date(audio.createdAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    ).length
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Audio Files Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Your Audio Files
                </CardTitle>
                <UploadDialog>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
                      hover:to-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </UploadDialog>
              </div>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                      <Skeleton className="h-8 w-20" />
                    </div>
                  ))}
                </div>
              ) : audioData.data.length === 0 ? (
                <div className="py-12 text-center">
                  <FileAudio className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    No audio files yet
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Upload your first audio file to get started
                  </p>
                  <UploadDialog>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
                        hover:to-blue-700"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Your First File
                    </Button>
                  </UploadDialog>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Artist</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audioData.data.map((audio) => (
                      <TableRow key={audio.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br
                                from-purple-100 to-blue-100"
                            >
                              <Music className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {audio.name}
                              </div>
                              {audio.description && (
                                <div className="text-sm text-gray-500">
                                  {audio.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {audio.artist ? (
                            <Badge variant="secondary">{audio.artist}</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {audio.fileObject?.fileSize
                              ? formatFileSize(audio.fileObject.fileSize)
                              : "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(audio.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                navigate({
                                  to: "/audios/$audioId",
                                  params: { audioId: audio.id },
                                });
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => downloadAudio(audio)}
                              disabled={isDownloading}
                              title="Download file"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Audio File
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "
                                    {audio.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => removeAudio(audio.id)}
                                    disabled={isDeleting}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
