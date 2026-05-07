import "server-only";

import { cookies } from "next/headers";
import { getUserFromSessionToken } from "./auth-local";
import { SESSION_COOKIE_NAME } from "./auth-config";
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
    return getUserFromSessionToken(token);
  } catch {
    return null;
  }
}
