export async function getUserData() {
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
