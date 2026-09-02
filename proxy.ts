import { NextRequest, NextResponse } from "next/server";
import { isComingSoon, isIndexable } from "@/lib/coming-soon";

const comingSoonPath = "/coming-soon";
const publicPaths = new Set([comingSoonPath, "/coming-soon/opengraph-image", "/", "/it", "/fr", "/es", "/de", "/privacy"]);
const localizedPrivacyPath = /^\/(it|fr|es|de)\/privacy$/;
const publishedFragmentPath = /^(?:\/(?:it|fr|es|de))?\/fragments\/[^/]+$/;

function withIndexingGuard(response: NextResponse, request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (!isIndexable || host === "localhost" || host === "127.0.0.1" || host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export function proxy(request: NextRequest) {
  if (!isComingSoon || publicPaths.has(request.nextUrl.pathname) || localizedPrivacyPath.test(request.nextUrl.pathname) || publishedFragmentPath.test(request.nextUrl.pathname)) {
    return withIndexingGuard(NextResponse.next(), request);
  }

  const firstSegment = request.nextUrl.pathname.split("/")[1];
  const locale = ["it", "fr", "es", "de"].includes(firstSegment) ? firstSegment : "en";
  const destination = new URL(comingSoonPath, request.url);
  destination.searchParams.set("locale", locale);
  return withIndexingGuard(NextResponse.rewrite(destination), request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
