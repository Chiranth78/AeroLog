import "server-only";

import { cookies } from "next/headers";
import { APP_API_URL, SESSION_COOKIE_NAME } from "./auth-config";
import type { AuthUser } from "./auth-types";

export async function getSessionToken() {
  const store = await cookies();
  return store.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getSessionToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${APP_API_URL}/auth/session/${token}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { user: AuthUser };
    return data.user;
  } catch {
    return null;
  }
}
