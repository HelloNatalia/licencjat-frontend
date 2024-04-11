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
  // const cookieValue = Cookies.get("authToken");
  const cookieValue = Cookies.get("authToken", { raw: true });
  let cookieExpires = null;
  if (cookieValue) cookieExpires = cookieValue.expires;

  if (cookieValue && (!cookieExpires || new Date(cookieExpires) > new Date())) {
    return cookieValue;
  } else {
    return null;
  }
  // return cookieValue || null;
}

export function removeAuthTokenCookie() {
  Cookies.remove("authToken", { path: "/" });
}
