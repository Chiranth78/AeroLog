import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { User } from "@aerodesign/shared";
import { SESSION_COOKIE_NAME } from "../../../../lib/auth-config";
import { signupUser } from "../../../../lib/auth-local";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    role?: User["role"];
    domain?: User["domain"];
    year?: string;
    batch?: string;
    teamRole?: string;
  };

  if (!payload.name || !payload.email || !payload.password) {
    return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
  }

  const result = signupUser({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    domain: payload.domain,
    year: payload.year,
    batch: payload.batch,
    teamRole: payload.teamRole
  });

  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: 409 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ user: result.user }, { status: 201 });
}
