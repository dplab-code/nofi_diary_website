import { NextRequest, NextResponse } from "next/server";
import { isComingSoon } from "@/lib/coming-soon";

const comingSoonPath = "/coming-soon";
const publicPaths = new Set([comingSoonPath, "/privacy"]);

export function proxy(request: NextRequest) {
  if (!isComingSoon || publicPaths.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(comingSoonPath, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
