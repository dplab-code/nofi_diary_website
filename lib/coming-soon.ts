// This candidate previews the full website without changing the production flag.
// Keep the exception scoped to both the preview environment and this branch.
const isPrivateMemoriesCandidate =
  process.env.VERCEL_ENV === "preview" &&
  process.env.VERCEL_GIT_COMMIT_REF === "codex/private-memories";

// Keep other deployments closed unless the full site is explicitly enabled.
export const isComingSoon = !isPrivateMemoriesCandidate && process.env.COMING_SOON !== "false";

// Indexing is deliberately independent from the visible release mode. This lets
// the pre-launch experience be public without exposing the unreleased website.
export const isIndexable = process.env.INDEXABLE === "true";
