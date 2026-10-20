type Environment = Record<string, string | undefined>;

export function resolveRelease(env: Environment) {
  const production = env.VERCEL_ENV === "production";
  const preview = env.VERCEL_ENV === "preview" || env.VERCEL_ENV === "development";
  const candidate = env.VERCEL_ENV === "preview" && [
    "codex/private-memories", "feature/nofi-elsewhere", "codex/public-launch-readiness", "codex/privacy-backup-clarity",
  ].includes(env.VERCEL_GIT_COMMIT_REF ?? "");
  const isComingSoon = !candidate && env.COMING_SOON !== "false";
  const siteReleaseMode = env.SITE_RELEASE_MODE === "public" ? "public" : "preview";
  if (production) {
    for (const name of ["COMING_SOON", "INDEXABLE"] as const) {
      if (env[name] !== undefined && !["true", "false"].includes(env[name]!)) throw new Error(`NO-GO: invalid ${name}`);
    }
    if (env.SITE_RELEASE_MODE !== undefined && !["preview", "public"].includes(env.SITE_RELEASE_MODE)) throw new Error("NO-GO: invalid SITE_RELEASE_MODE");
    if (!isComingSoon && (siteReleaseMode !== "public" || env.INDEXABLE !== "true")) {
      throw new Error("NO-GO: production full site requires COMING_SOON=false, SITE_RELEASE_MODE=public, INDEXABLE=true in one deployment");
    }
  }
  const isIndexable = !preview && env.INDEXABLE === "true";
  const isPublicRelease = siteReleaseMode === "public" && !isComingSoon;
  return { isComingSoon, isIndexable, siteReleaseMode, isPublicRelease, canIndexPublicPages: isIndexable && (isComingSoon || isPublicRelease) };
}
