import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { APP_API_URL, SESSION_COOKIE_NAME } from "../../../../lib/auth-config";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const response = await fetch(`${APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const store = await cookies();
    store.set(SESSION_COOKIE_NAME, data.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return NextResponse.json({ user: data.user });
  } catch {
    return NextResponse.json({ message: "Backend auth service unavailable" }, { status: 503 });
  }
}
