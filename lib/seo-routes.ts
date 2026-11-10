import { explorePageIds } from "@/content/explore";

// Shared inventory of approved public editorial pages. Using the same list
// for sitemap generation and crawl restrictions prevents SEO-policy drift.
// Legal pages and the preview route have their own publication policy.
export const editorialSeoPaths = [
  "/manifesto",
  ...explorePageIds.map((id) => `/${id}`),
];

export const intentionallyRestrictedPaths = [
  "/terms",
  "/disclaimer",
] as const;
