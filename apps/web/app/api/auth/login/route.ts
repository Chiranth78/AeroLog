import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "../../../../lib/auth-config";
import { loginWithCredentials } from "../../../../lib/auth-local";

export async function POST(request: Request) {
  const payload = (await request.json()) as { email?: string; password?: string };

  if (!payload.email || !payload.password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  const session = loginWithCredentials(payload.email, payload.password);
  if (!session) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ user: session.user });
}
