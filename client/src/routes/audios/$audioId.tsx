import { isAuthenticated } from "@/utils/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAudio, putAudio, type NewAudio } from "@/api/audio";
import { generateDownloadUrl, type DownloadFileObject } from "@/api/file";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Music,
  Video,
  Edit3,
  Calendar,
  FileAudio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

// Extended types for fullscreen API
interface ExtendedHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

export const Route = createFileRoute("/audios/$audioId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { audioId } = Route.useParams();
  const navigate = useNavigate();
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewAudio>();

  const {
    data: audio,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["audio", audioId],
    queryFn: () => getAudio(audioId),
  });

  const { mutate: updateAudio } = useMutation({
    mutationFn: async (audioData: NewAudio) => {
      return await putAudio(audioId, audioData);
    },
    onSuccess: () => {
      toast.success("Audio metadata updated successfully!");
      setIsEditDialogOpen(false);
      refetch();
    },
    onError: (error: Error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  // Generate media URL when audio data is available
  useEffect(() => {
    if (audio) {
      const generateMediaUrl = async () => {
        try {
          const downloadFileObject: DownloadFileObject = {
            bucket: audio.fileObject.bucket,
            objectKey: audio.fileObject.objectKey,
          };
          const presignedUrl = await generateDownloadUrl(downloadFileObject);
          setMediaUrl(presignedUrl);
        } catch (error) {
          console.error("Error generating media URL:", error);
          toast.error("Failed to load media file");
        }
      };
      generateMediaUrl();
    }
  }, [audio]);

  // Reset form when audio data changes
  useEffect(() => {
    if (audio) {
      reset({
        name: audio.name,
        description: audio.description || "",
        artist: audio.artist || "",
        releaseDate: audio.releaseDate || "",
        fileObject: audio.fileObject,
      });
    }
  }, [audio, reset]);

  // Media event handlers
  const handlePlayPause = useCallback(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }, []);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (mediaRef.current) {
        mediaRef.current.volume = newVolume;
      }
      setIsMuted(newVolume === 0);
    },
    [],
  );

  const handleMute = useCallback(() => {
    if (mediaRef.current) {
      if (isMuted) {
        mediaRef.current.volume = volume;
        setIsMuted(false);
      } else {
        mediaRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  const handleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return;

    const element = playerContainerRef.current as ExtendedHTMLElement;
    const extendedDocument = document as ExtendedDocument;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (extendedDocument.exitFullscreen) {
        extendedDocument.exitFullscreen();
      } else if (extendedDocument.webkitExitFullscreen) {
        extendedDocument.webkitExitFullscreen();
      } else if (extendedDocument.msExitFullscreen) {
        extendedDocument.msExitFullscreen();
      }
    }
  }, [isFullscreen]);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = speed;
    }
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const extendedDocument = document as ExtendedDocument;
      setIsFullscreen(
        !!(
          extendedDocument.fullscreenElement ||
          extendedDocument.webkitFullscreenElement ||
          extendedDocument.msFullscreenElement
        ),
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  // Set playback speed when media loads
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackSpeed;
    }
  }, [mediaUrl, playbackSpeed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts when not focused on input elements
      if (
        e.target &&
        ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          handlePlayPause();
          break;
        case "f":
        case "F":
          e.preventDefault();
          handleFullscreen();
          break;
        case "m":
        case "M":
          e.preventDefault();
          handleMute();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (mediaRef.current) {
            mediaRef.current.currentTime = Math.max(
              0,
              mediaRef.current.currentTime - 10,
            );
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (mediaRef.current) {
            mediaRef.current.currentTime = Math.min(
              duration,
              mediaRef.current.currentTime + 10,
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((prev) => Math.min(1, prev + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 0.1));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handlePlayPause, handleFullscreen, handleMute, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isVideo =
    mediaUrl &&
    (mediaUrl.toLowerCase().includes(".mp4") ||
      mediaUrl.toLowerCase().includes(".mov") ||
      mediaUrl.toLowerCase().includes(".avi") ||
      mediaUrl.toLowerCase().includes(".webm") ||
      mediaUrl.toLowerCase().includes(".mkv") ||
      mediaUrl.toLowerCase().includes(".m4v"));

  const onSubmit = (data: NewAudio) => {
    updateAudio(data);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !audio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="shadow-lg">
            <CardContent className="py-12">
              <FileAudio className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Failed to load audio
              </h3>
              <p className="mb-6 text-gray-600">
                The audio file could not be found or loaded.
              </p>
              <Button
                onClick={() => navigate({ to: "/audios" })}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700
                  hover:to-blue-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Audio Library
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
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/audios" })}
              className="hover:bg-white/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/50 hover:bg-white/70"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Metadata
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Edit Audio Metadata</DialogTitle>
                    <DialogDescription>
                      Update the information for this audio file.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist</Label>
                      <Input id="artist" {...register("artist")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" {...register("description")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="releaseDate">Release Date</Label>
                      <Input
                        id="releaseDate"
                        type="date"
                        {...register("releaseDate")}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Media Player */}
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                {mediaUrl ? (
                  <div className="relative" ref={playerContainerRef}>
                    {isVideo ? (
                      <video
                        ref={mediaRef as React.RefObject<HTMLVideoElement>}
                        src={mediaUrl}
                        className="aspect-video w-full object-cover"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        controls={false}
                        preload="metadata"
                      />
                    ) : (
                      <div className="relative">
                        <div
                          className="flex aspect-video w-full items-center justify-center bg-gradient-to-br
                            from-purple-600 to-blue-600"
                          style={{
                            backgroundImage: "url('/api/placeholder/800/450')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="relative z-10 text-center text-white">
                            <Music className="mx-auto mb-4 h-16 w-16" />
                            <h3 className="text-xl font-semibold">
                              {audio.name}
                            </h3>
                            {audio.artist && (
                              <p className="text-white/80">{audio.artist}</p>
                            )}
                          </div>
                        </div>
                        <audio
                          ref={mediaRef as React.RefObject<HTMLAudioElement>}
                          src={mediaUrl}
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleLoadedMetadata}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                    )}

                    {/* Keyboard Shortcuts Help */}
                    <div
                      className="absolute top-4 right-4 rounded-lg bg-black/80 p-3 text-sm text-white opacity-0
                        transition-opacity duration-300 hover:opacity-100"
                    >
                      <div className="space-y-1">
                        <div className="mb-2 font-semibold">
                          Keyboard Shortcuts
                        </div>
                        <div>Space: Play/Pause</div>
                        <div>F: Fullscreen</div>
                        <div>M: Mute</div>
                        <div>←/→: Seek 10s</div>
                        <div>↑/↓: Volume</div>
                      </div>
                    </div>

                    {/* Media Controls */}
                    <div className="absolute right-0 bottom-0 left-0 bg-black/70 p-4 text-white">
                      <div className="space-y-3">
                        {/* Progress Bar */}
                        <div className="flex items-center space-x-2">
                          <span className="w-12 text-right text-sm">
                            {formatTime(currentTime)}
                          </span>
                          <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-white/20"
                          />
                          <span className="w-12 text-sm">
                            {formatTime(duration)}
                          </span>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                              onClick={handlePlayPause}
                            >
                              {isPlaying ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Play className="h-5 w-5" />
                              )}
                            </Button>

                            {/* Playback Speed Control */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white hover:bg-white/20"
                                >
                                  <Settings className="mr-1 h-4 w-4" />
                                  {playbackSpeed}x
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-32">
                                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(
                                  (speed) => (
                                    <DropdownMenuItem
                                      key={speed}
                                      onClick={() => handleSpeedChange(speed)}
                                      className={`cursor-pointer ${
                                        playbackSpeed === speed
                                          ? "bg-accent"
                                          : ""
                                        }`}
                                    >
                                      {speed}x
                                    </DropdownMenuItem>
                                  ),
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Volume Controls */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                              onClick={handleMute}
                            >
                              {isMuted ? (
                                <VolumeX className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </Button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="h-1 w-20 cursor-pointer appearance-none rounded-lg bg-white/20"
                            />

                            {/* Fullscreen Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                              onClick={handleFullscreen}
                            >
                              {isFullscreen ? (
                                <Minimize className="h-4 w-4" />
                              ) : (
                                <Maximize className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <FileAudio className="mx-auto mb-4 h-12 w-12" />
                      <p>Loading media...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {isVideo ? (
                      <Video className="mr-2 h-5 w-5" />
                    ) : (
                      <Music className="mr-2 h-5 w-5" />
                    )}
                    Audio Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {audio.name}
                    </h2>
                    {audio.artist && (
                      <p className="mt-1 text-lg text-gray-600">
                        by {audio.artist}
                      </p>
                    )}
                  </div>

                  {audio.description && (
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                        Description
                      </h3>
                      <p className="mt-1 text-gray-900">{audio.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                        Uploaded
                      </h3>
                      <div className="mt-1 flex items-center text-gray-900">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(audio.createdAt)}
                      </div>
                    </div>

                    {audio.releaseDate && (
                      <div>
                        <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                          Release Date
                        </h3>
                        <p className="mt-1 text-gray-900">
                          {formatDate(audio.releaseDate)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      File Information
                    </h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-900">
                        Size:{" "}
                        {(audio.fileObject.fileSize / (1024 * 1024)).toFixed(2)}{" "}
                        MB
                      </p>
                      <p className="text-gray-900">
                        Format: {isVideo ? "Video" : "Audio"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
