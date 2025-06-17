import type { FileObject } from "./file";

export interface NewAudio {
  name: string;
  fileObject: FileObject;
  description?: string;
  artist?: string;
  releaseDate?: string;
}

export interface Audio extends NewAudio {
  id: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export async function getAudios(): Promise<{ total: number; data: Audio[] }> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/audios`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function getAudio(audioId: string): Promise<Audio> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${audioId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function putAudio(audioId: string, audioData: NewAudio) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${audioId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(audioData),
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function deleteAudio(audioId: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${audioId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function postAudio(audioId: string, audioData: NewAudio) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${audioId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(audioData),
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}
