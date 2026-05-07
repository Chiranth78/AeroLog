export const SESSION_COOKIE_NAME = "aerodesign_session";

function resolveAppApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/backend`;
  }

  return "http://localhost:4000/api";
}

export const APP_API_URL = resolveAppApiUrl();
