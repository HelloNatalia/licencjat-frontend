import Cookies from "js-cookie";

export function setAuthTokenCookie(token) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  Cookies.set("authToken", token, {
    expires: expirationDate,
    path: "/",
  });
}

export function getAuthTokenFromCookie() {
  const cookieValue = Cookies.get("authToken");

  return cookieValue || null;
}
