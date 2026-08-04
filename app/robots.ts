import type { MetadataRoute } from "next";
import { isPublicRelease } from "../lib/site-release";

export default function robots(): MetadataRoute.Robots {
  if (!isPublicRelease) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}