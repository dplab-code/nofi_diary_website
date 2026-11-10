import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { canIndexPublicPages, isPublicRelease } from "@/lib/site-release";
import { publishedFragments } from "@/content/fragments";
import { editorialSeoPaths } from "@/lib/seo-routes";

const siteUrl = "https://nofidiary.com";
const languageAlternates = (path = "") => Object.fromEntries(
  locales.map((locale) => [locale, `${siteUrl}${localePath(locale, path)}`])
);

export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndexPublicPages) return [];

  // Pre-launch keeps the existing homepage/privacy/fragment inventory.
  // Editorial pages are advertised to crawlers only with the public release.
  const publicPages = [
    "",
    "/privacy",
    ...(isPublicRelease ? editorialSeoPaths : []),
  ];

  const fixedPages = publicPages.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      changeFrequency: (path === "" ? "weekly" : path === "/privacy" ? "yearly" : "monthly") as
        "weekly" | "yearly" | "monthly",
      priority: path === "" ? 1 : path === "/privacy" ? 0.4 : 0.7,
      alternates: {
        languages: {
          ...languageAlternates(path),
          "x-default": `${siteUrl}${localePath("en", path)}`,
        },
      },
    }))
  );

  const fragmentPages = publishedFragments.flatMap((fragment) => {
    const path = `/fragments/${fragment.slug}`;
    return locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified: fragment.publishAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          ...languageAlternates(path),
          "x-default": `${siteUrl}${path}`,
        },
      },
    }));
  });

  return [...fixedPages, ...fragmentPages];
}
