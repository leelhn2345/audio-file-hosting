export enum Bucket {
  AUDIO = "audio",
}

export type FileObject = {
  bucket: Bucket;
  objectKey: string;
  size: number;
};

export async function generateUploadUrl(fileObject: FileObject) {
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
  const url: string = result.presignedUrl;
  return url;
}

export async function generateDownloadUrl(fileObject: FileObject) {
  const searchParams = new URLSearchParams({});

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
