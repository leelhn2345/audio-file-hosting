import Cookies from "js-cookie";

export async function register(data: unknown) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function login(data: unknown) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}

async function getUserJwt() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user-jwt`, {
    method: "POST",
    credentials: "include",
  });

  const result = await res.text();

  if (!res.ok) throw new Error("Authentication error.");

  Cookies.set("userProfile", result, {
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  });
}

export async function logout() {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
