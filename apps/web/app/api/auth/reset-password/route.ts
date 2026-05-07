import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "../../../../lib/auth-local";

export async function POST(request: Request) {
  const payload = (await request.json()) as { token?: string; password?: string };

  if (!payload.token || !payload.password) {
    return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
  }

  try {
    const result = resetPasswordWithToken(payload.token, payload.password);
    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 404 });
    }

    return NextResponse.json({ message: "Password reset successful" });
  } catch {
    return NextResponse.json({ message: "Invalid reset token" }, { status: 400 });
  }
}
