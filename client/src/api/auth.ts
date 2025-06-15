export async function register(data: unknown) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
}

export async function login() {}

export async function logout() {}
