import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { generateUploadUrl, Bucket } from "@/api/file";
import { postAudio, type NewAudio } from "@/api/audio";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileAudio,
  X,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

const uploadSchema = z.object({
  name: z.string().min(1, "File name is required"),
  artist: z.string().optional(),
  description: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface UploadedFile {
  file: File;
  preview: string;
}

// Real upload function using your APIs
const uploadAudio = async (
  file: File,
  metadata: UploadFormData,
  onProgress?: (progress: number) => void,
) => {
  // Step 1: Generate presigned URL
  onProgress?.(10);

  const uploadFileObject = {
    bucket: Bucket.AUDIO,
    fileName: metadata.name,
    fileSize: file.size,
  };

  const { presignedUrl, fileObject } =
    await generateUploadUrl(uploadFileObject);
  onProgress?.(20);

  console.log(presignedUrl);

  // Step 2: Upload file to presigned URL
  const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed: ${uploadResponse.statusText}`);
  }

  onProgress?.(70);

  // Step 3: Create audio record
  const audioData: NewAudio = {
    name: metadata.name,
    fileObject: {
      bucket: fileObject.bucket,
      objectKey: fileObject.objectKey,
      fileSize: file.size,
    },
    description: metadata.description,
    artist: metadata.artist,
  };

  const result = await postAudio(audioData);
  onProgress?.(100);

  return result;
};

interface UploadDialogProps {
  children?: React.ReactNode;
}

export function UploadDialog({ children }: UploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const queryClient = useQueryClient();

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      artist: "",
      description: "",
    },
  });

  const { mutate: uploadMutation, isPending: isUploading } = useMutation({
    mutationFn: ({
      file,
      metadata,
    }: {
      file: File;
      metadata: UploadFormData;
    }) => uploadAudio(file, metadata, setUploadProgress),
    onSuccess: () => {
      toast.success("Audio file uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["audios"] });
      handleReset();
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
      setUploadProgress(0);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Auto-populate name from filename (without extension)
        const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        form.setValue("name", nameWithoutExtension);

        setUploadedFile({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "audio/mpeg": [".mp3"],
        "video/mp4": [".mp4"],
      },
      maxFiles: 1,
      maxSize: 100 * 1024 * 1024, // 100MB
    });

  const handleReset = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    form.reset();
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
      setUploadedFile(null);
      form.setValue("name", "");
    }
  };

  const onSubmit = (data: UploadFormData) => {
    if (!uploadedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    uploadMutation({
      file: uploadedFile.file,
      metadata: data,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
              hover:to-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Upload Audio
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-purple-600" />
            Upload Audio File
          </DialogTitle>
          <DialogDescription>
            Upload your MP3 or MP4 files and add metadata information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Drop Zone */}
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center
              transition-colors ${
              isDragActive
                  ? "border-purple-400 bg-purple-50"
                  : uploadedFile
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
              }`}
          >
            <input {...getInputProps()} />

            {uploadedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-3">
                    <FileAudio className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      {uploadedFile.file.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatFileSize(uploadedFile.file.size)} •{" "}
                    {uploadedFile.file.type}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {isDragActive ? "Drop your file here" : "Upload audio file"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Drag & drop or click to select MP3 or MP4 files
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Maximum file size: 100MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* File Rejection Errors */}
          {fileRejections.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Upload Error
                </span>
              </div>
              {fileRejections.map(({ file, errors }, index) => (
                <div key={index} className="mt-2">
                  <p className="text-sm text-red-700">
                    {file.name}: {errors.map((e) => e.message).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="font-medium text-gray-900">
                  {uploadProgress}%
                </span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Metadata Form */}
          {uploadedFile && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter file name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artist</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter artist name (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add a description (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              handleReset();
              setOpen(false);
            }}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={!uploadedFile || isUploading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700
              hover:to-blue-700"
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

