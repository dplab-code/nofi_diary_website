import type { MetadataRoute } from "next";
import { canIndexPublicPages, isPublicRelease } from "@/lib/site-release";
import { locales, localePath } from "@/lib/i18n";
import { editorialSeoPaths, intentionallyRestrictedPaths } from "@/lib/seo-routes";

const siteUrl = "https://nofidiary.com";

export default function robots(): MetadataRoute.Robots {
  // Keep unpublished deployments closed. The coming-soon experience may be
  // indexable, but the editorial site must not leak into that release mode.
  if (!canIndexPublicPages) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const restrictedPaths = [
    ...intentionallyRestrictedPaths,
    ...(!isPublicRelease ? editorialSeoPaths : []),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/coming-soon",
        ...restrictedPaths.flatMap((path) =>
          locales.map((locale) => localePath(locale, path))
        ),
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
