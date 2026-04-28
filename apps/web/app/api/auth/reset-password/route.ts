import { NextResponse } from "next/server";
import { APP_API_URL } from "../../../../lib/auth-config";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const response = await fetch(`${APP_API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Backend auth service unavailable" }, { status: 503 });
  }
}
