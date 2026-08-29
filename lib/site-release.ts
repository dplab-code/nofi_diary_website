import { isComingSoon } from "@/lib/coming-soon";

export type SiteReleaseMode = "preview" | "public";

export const siteReleaseMode: SiteReleaseMode =
  process.env.SITE_RELEASE_MODE === "public" ? "public" : "preview";

export const isPublicRelease = siteReleaseMode === "public" && !isComingSoon;
