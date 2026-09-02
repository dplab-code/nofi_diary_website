import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { canIndexPublicPages } from "@/lib/site-release";
import { publishedFragments } from "@/content/fragments";

const siteUrl = "https://nofidiary.com";
const languageAlternates = (path = "") => Object.fromEntries(
  locales.map(locale => [locale, `${siteUrl}${localePath(locale, path)}`])
);

export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndexPublicPages) return [];

  const fixedPages = ["", "/privacy"].flatMap((path, groupIndex) => locales.map(locale => ({
    url: `${siteUrl}${localePath(locale, path)}`,
    changeFrequency: (groupIndex === 0 ? "weekly" : "yearly") as "weekly" | "yearly",
    priority: groupIndex === 0 ? 1 : 0.4,
    alternates: { languages: { ...languageAlternates(path), "x-default": `${siteUrl}${localePath("en", path)}` } }
  })));
  const fragmentPages = publishedFragments.flatMap(fragment => {
    const path = `/fragments/${fragment.slug}`;
    return locales.map(locale => ({ url: `${siteUrl}${localePath(locale,path)}`, lastModified: fragment.publishAt, changeFrequency: "monthly" as const, priority: .6, alternates: { languages: { ...languageAlternates(path), "x-default": `${siteUrl}${path}` } } }));
  });
  return [...fixedPages, ...fragmentPages];
}
