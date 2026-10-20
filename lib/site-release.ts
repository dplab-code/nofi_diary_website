import { resolveRelease } from "@/lib/release-config";

export type SiteReleaseMode = "preview" | "public";

export const { siteReleaseMode, isPublicRelease, canIndexPublicPages } = resolveRelease(process.env);
