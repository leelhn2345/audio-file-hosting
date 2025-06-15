import Cookies from "js-cookie";

export function isAuthenticated() {
  const cookie = Cookies.get("userProfile");
  if (!cookie) return false;

  // Extend cookie expiry by 1 hour
  Cookies.set("userProfile", cookie, {
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  });

  return true;
}
