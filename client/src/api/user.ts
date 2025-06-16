import type { UserData } from "@stores/user";
import { getUserJwt } from "./auth";
import Cookies from "js-cookie";

export async function getUser(): Promise<UserData> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function putUser(data: UserData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  await getUserJwt();
  return result;
}

export async function deleteUser() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  Cookies.remove("userProfile");
  return result;
}
