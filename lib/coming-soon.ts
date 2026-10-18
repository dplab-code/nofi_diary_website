// These candidates preview the full website without changing the production flag.
// Keep the exception scoped to the preview environment and explicit branches.
const isFullSiteCandidate =
  process.env.VERCEL_ENV === "preview" &&
  ["codex/private-memories", "feature/nofi-elsewhere"].includes(process.env.VERCEL_GIT_COMMIT_REF ?? "");

// Keep other deployments closed unless the full site is explicitly enabled.
export const isComingSoon = !isFullSiteCandidate && process.env.COMING_SOON !== "false";

// Indexing is deliberately independent from the visible release mode. This lets
// the pre-launch experience be public without exposing the unreleased website.
export const isIndexable = process.env.INDEXABLE === "true";
