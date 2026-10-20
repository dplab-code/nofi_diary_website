import { execFileSync } from "node:child_process";
import { moduleLoader } from "./load-ts.mjs";

const load = moduleLoader();
const state = load("lib/release-config.ts").resolveRelease(process.env);
console.log(JSON.stringify({
  commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  rollbackCommit: "1ab82c3ef070f90e6fcfa8cf574c1c77be6712b8",
  timestamp: new Date().toISOString(),
  deployment: process.env.RELEASE_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null),
  environment: process.env.VERCEL_ENV || "local",
  COMING_SOON: process.env.COMING_SOON ?? null,
  SITE_RELEASE_MODE: process.env.SITE_RELEASE_MODE ?? null,
  INDEXABLE: process.env.INDEXABLE ?? null,
  effectiveRelease: state,
  sitemap: "https://nofidiary.com/sitemap.xml",
  robots: "https://nofidiary.com/robots.txt",
  googlePlay: load("lib/store.ts").googlePlayUrl,
  publishedFragments: load("content/fragments.ts").publishedFragments.length,
}, null, 2));
