import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "./lib/auth-config";

const protectedPrefixes = ["/dashboard", "/members", "/logs", "/attendance", "/learning", "/reports"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/members/:path*", "/logs/:path*", "/attendance/:path*", "/learning/:path*", "/reports/:path*", "/login", "/signup", "/forgot-password", "/reset-password"]
};
