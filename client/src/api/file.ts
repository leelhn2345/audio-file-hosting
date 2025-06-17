import { URLSearchParams } from "url";

export enum Bucket {
  AUDIO = "audio",
}

interface FileBucket {
  bucket: Bucket;
}

export type FileObject = {
  bucket: Bucket;
  objectKey: string;
  fileSize: number;
};

export interface UploadFileObject extends FileBucket {
  fileName: string;
  fileSize: number;
}

export interface DownloadFileObject extends FileBucket {
  objectKey: string;
}

type PostPresignedUrl = {
  presignedUrl: string;
  fileObject: DownloadFileObject;
};

export async function generateUploadUrl(
  fileObject: UploadFileObject,
): Promise<PostPresignedUrl> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/file/upload-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(fileObject),
    },
  );
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function generateDownloadUrl(fileObject: DownloadFileObject) {
  const { bucket, objectKey } = fileObject;

  const searchParams = new URLSearchParams({ bucket, objectKey });

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/file/download-url?${searchParams}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  const url: string = result.presignedUrl;
  return url;
}
