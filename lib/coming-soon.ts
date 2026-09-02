// Keep unreleased deployments closed unless the full site is explicitly enabled.
export const isComingSoon = process.env.COMING_SOON !== "false";

// Indexing is deliberately independent from the visible release mode. This lets
// the pre-launch experience be public without exposing the unreleased website.
export const isIndexable = process.env.INDEXABLE === "true";
