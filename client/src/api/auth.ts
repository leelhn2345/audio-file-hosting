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

export async function logout() {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
