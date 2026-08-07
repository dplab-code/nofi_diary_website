import type { MetadataRoute } from "next";
import { isPublicRelease } from "@/lib/site-release";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPublicRelease ? { allow: "/" } : { disallow: "/" })
    }
  };
}
