import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./app/libs/auth";
import { getTokenFromAuthHeader } from "../utils/helper";

const AUTH_PAGES = ["/login", "/register"];

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest) {
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));

  const { url, nextUrl, cookies } = request;

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete("token");

    return response;
  }

  cookies.set("token", token);
  return NextResponse.next();
}

export const config = { matcher: ["/login", "/panel/:path*"] };
