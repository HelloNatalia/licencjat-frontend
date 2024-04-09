import Cookies from "js-cookie";

export function setAuthTokenCookie(token) {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 240);
  Cookies.set("authToken", token, {
    expires: expirationDate,
    path: "/",
  });
}

export function getAuthTokenFromCookie() {
  const cookieValue = Cookies.get("authToken");

  return cookieValue || null;
}

export function removeAuthTokenCookie() {
  Cookies.remove("authToken", { path: "/" });
}
