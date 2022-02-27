const ACCESS_TOKEN = "@ecommerce_web:access_token";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setAccessToken(token: string) {
  return localStorage.setItem(ACCESS_TOKEN, token);
}
