import { NextResponse } from "next/server";
import { createPasswordReset } from "../../../../lib/auth-local";

export async function POST(request: Request) {
  const payload = (await request.json()) as { email?: string };
  if (!payload.email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  return NextResponse.json(createPasswordReset(payload.email));
}
