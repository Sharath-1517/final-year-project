import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Middleware = (request: NextRequest) => NextResponse;

export const WHITE_LIST_URL = ["/signup", "/login"];

const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get("passcode")?.value;

  if (authSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

const authenticated: Middleware = (request) => {
  const authSession = request.cookies?.get("passcode")?.value;

  if (!authSession) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set({
      name: "redirect",
      value: request.url,
    });
    return response;
  }
  return NextResponse.next();
};

export default function middleware(request: NextRequest) {
  // if (WHITE_LIST_URL.includes(request.nextUrl.pathname)) {
  //   return NextResponse.next();
  // }

  // if (["/login"].includes(request.nextUrl.pathname)) {
  //   return redirectIfAuthenticated(request);
  // }

  // if (!["/login"].includes(request.nextUrl.pathname)) {
  //   return authenticated(request);
  // } else NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
