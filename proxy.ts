import { NextRequest, NextResponse } from "next/server";
import { isComingSoon } from "@/lib/coming-soon";

const comingSoonPath = "/coming-soon";
const publicPaths = new Set([comingSoonPath, "/privacy"]);
const localizedPrivacyPath = /^\/(it|fr|es|de)\/privacy$/;

export function proxy(request: NextRequest) {
  if (!isComingSoon || publicPaths.has(request.nextUrl.pathname) || localizedPrivacyPath.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const firstSegment = request.nextUrl.pathname.split("/")[1];
  const locale = ["it", "fr", "es", "de"].includes(firstSegment) ? firstSegment : "en";
  const destination = new URL(comingSoonPath, request.url);
  destination.searchParams.set("locale", locale);
  return NextResponse.rewrite(destination);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
