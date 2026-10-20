import { moduleLoader } from "./load-ts.mjs";

const host = "nofidiary.com";
const key = "f1f3fab70bfd46d892cb8ee8719b6568";
const keyLocation = `https://${host}/${key}.txt`;
const localePrefixes = ["", "/it", "/fr", "/es", "/de"];
const load = moduleLoader({ VERCEL_ENV: "production", COMING_SOON: "false", SITE_RELEASE_MODE: "public", INDEXABLE: "true" });
const publishedFragmentSlugs = load("content/fragments.ts").publishedFragments.map(fragment => fragment.slug);
const publicPaths = load("content/seo.ts").publicPagePaths;
const localizedPaths = path => localePrefixes.map(prefix => `${prefix}${path}` || "/");
const defaults = [
  ...publicPaths.flatMap(localizedPaths),
  ...publishedFragmentSlugs.flatMap(slug => localizedPaths(`/fragments/${slug}`))
];
const dryRun = process.argv.includes("--dry-run");
const paths = process.argv.slice(2).filter(value => value !== "--dry-run");
const urlList = (paths.length ? paths : defaults).map(value => new URL(value, `https://${host}`).href);

if (urlList.some(url => new URL(url).hostname !== host)) throw new Error(`Every URL must belong to ${host}`);

if (dryRun) { console.log(JSON.stringify({ dryRun: true, urlList }, null, 2)); process.exit(0); }
const state = moduleLoader()("lib/site-release.ts");
if (process.env.VERCEL_ENV !== "production" || !state.canIndexPublicPages || !state.isPublicRelease) throw new Error("NO-GO: IndexNow requires the validated public production environment");
const sitemapResponse = await fetch(`https://${host}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error("NO-GO: live sitemap unavailable");
const liveSitemap = await sitemapResponse.text();
if (urlList.some(url => !liveSitemap.includes(`<loc>${url}</loc>`))) throw new Error("NO-GO: only URLs in the live public sitemap may be submitted");
const homepage = await fetch(`https://${host}/`);
const html = await homepage.text();
if (!homepage.ok || /noindex/i.test(homepage.headers.get("x-robots-tag") || "") || /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html) || html.includes('id="coming-soon-title"')) throw new Error("NO-GO: production has not passed the public-site smoke gate");

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList })
});

if (!response.ok) throw new Error(`IndexNow returned ${response.status}: ${await response.text()}`);
console.log(`IndexNow accepted ${urlList.length} URL(s) with status ${response.status}.`);
