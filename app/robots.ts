import type { MetadataRoute } from "next";
import { canIndexPublicPages, isPublicRelease } from "@/lib/site-release";
import { locales, localePath } from "@/lib/i18n";

const siteUrl = "https://nofidiary.com";
const prematureRoutes = ["/terms", "/disclaimer", "/manifesto", "/themes", "/appearances", "/stickers", "/time-capsules"];

export default function robots(): MetadataRoute.Robots {
  if (!canIndexPublicPages) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: isPublicRelease ? ["/coming-soon"] : ["/coming-soon", ...prematureRoutes.flatMap(path => locales.map(locale => localePath(locale, path)))]
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
