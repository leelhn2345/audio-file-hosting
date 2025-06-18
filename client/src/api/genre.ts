import type { Audio } from "./audio";

type AllGenres = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export async function getGenres(): Promise<{
  total: number;
  data: AllGenres[];
}> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/genres`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

type Genre = {
  id: string;
  name: string;
  audios: Audio[];
};

export async function getGenreById(genreId: string): Promise<Genre> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/genre/${genreId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function deleteGenre(genreId: string) {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/genre/${genreId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function postGenre(
  name: string,
): Promise<{ id: string; message: string }> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/genre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}
