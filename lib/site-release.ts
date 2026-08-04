export type SiteReleaseMode = "preview" | "public";

const configuredMode = process.env.SITE_RELEASE_MODE;

export const siteReleaseMode: SiteReleaseMode =
  configuredMode === "public" ? "public" : "preview";

export const isPublicRelease = siteReleaseMode === "public";