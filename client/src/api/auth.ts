export async function register(data: unknown) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message);
  }
  const result = await res.json();
  return result;
}

export async function login() {}

export async function logout() {}
