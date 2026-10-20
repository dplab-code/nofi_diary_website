import assert from "node:assert/strict";
import { moduleLoader } from "./load-ts.mjs";

const prod = { VERCEL_ENV: "production", COMING_SOON: "false", SITE_RELEASE_MODE: "public", INDEXABLE: "true" };
const preview = { ...prod, VERCEL_ENV: "preview", SITE_RELEASE_MODE: "preview", INDEXABLE: "false" };
const load = moduleLoader(prod);
const { resolveRelease } = load("lib/release-config.ts");
assert.equal(resolveRelease(prod).canIndexPublicPages, true);
for (const mode of ["preview", "public"]) for (const index of ["true", "false", undefined]) {
  if (mode === "public" && index === "true") continue;
  assert.throws(() => resolveRelease({ ...prod, SITE_RELEASE_MODE: mode, INDEXABLE: index }), /NO-GO/);
}
for (const env of [preview, { ...preview, INDEXABLE: "true", SITE_RELEASE_MODE: "public" }]) assert.equal(resolveRelease(env).canIndexPublicPages, false);
for (const mode of ["preview", "public"]) assert.equal(resolveRelease({ ...prod, COMING_SOON: "true", SITE_RELEASE_MODE: mode }).isComingSoon, true);
assert.equal(resolveRelease({ ...preview, COMING_SOON: "true", VERCEL_GIT_COMMIT_REF: "codex/public-launch-readiness" }).isComingSoon, false);
assert.throws(() => resolveRelease({ ...prod, INDEXABLE: "yes" }), /NO-GO/);
console.log("PASS release environment matrix, invalid production rejection and preview isolation");

const { locales, localePath } = load("lib/i18n.ts");
const { publicPagePaths, siteUrl, mobileApplicationData, homeSeo } = load("content/seo.ts");
const { publishedFragments, fragments } = load("content/fragments.ts");
const { googlePlayUrl, isOfficialPlayUrl } = load("lib/store.ts");
assert.ok(isOfficialPlayUrl(googlePlayUrl));
assert.equal(isOfficialPlayUrl("https://play.google.com/store/apps/details?id=wrong.package"), false);
const sitemap = load("app/sitemap.ts").default();
const expected = [...publicPagePaths, ...publishedFragments.map(f => `/fragments/${f.slug}`)].flatMap(p => locales.map(l => `${siteUrl}${localePath(l, p)}`));
assert.deepEqual(new Set(sitemap.map(item => item.url)), new Set(expected));
assert.equal(sitemap.length, expected.length);
for (const entry of sitemap) {
  assert.equal(Object.keys(entry.alternates.languages).length, 6);
  assert.ok(entry.alternates.languages["x-default"].startsWith(siteUrl));
  assert.ok(!/coming-soon|\/terms$|\/disclaimer$/.test(entry.url));
  for (const f of fragments.filter(f => f.status !== "published")) assert.ok(!entry.url.includes(f.slug));
}
assert.deepEqual(moduleLoader(preview)("app/sitemap.ts").default(), []);
const rules = load("app/robots.ts").default();
assert.deepEqual(rules.rules.disallow, ["/coming-soon"]);
assert.equal(rules.rules.allow, "/");
assert.equal(rules.sitemap, `${siteUrl}/sitemap.xml`);
assert.equal(moduleLoader(preview)("app/robots.ts").default().rules.disallow, "/");
console.log(`PASS robots, exact sitemap set (${sitemap.length} URLs), published fragments only and six language alternates`);

let metadataCount = 0;
for (const locale of locales) for (const page of [...publicPagePaths, "/terms", "/disclaimer", ...publishedFragments.map(f => `/fragments/${f.slug}`)]) {
  let metadata;
  if (!page) metadata = load("content/seo.ts").homepageMetadata(locale);
  else if (["/privacy", "/terms", "/disclaimer"].includes(page)) metadata = load("components/LegalPage.tsx").legalMetadata(locale, page.slice(1));
  else if (page === "/manifesto") {
    const route = locale === "en" ? "app/manifesto/page.tsx" : "app/[locale]/manifesto/page.tsx";
    const mod = load(route);
    metadata = locale === "en" ? mod.metadata : await mod.generateMetadata({ params: Promise.resolve({ locale }) });
  } else if (page.startsWith("/fragments/")) {
    metadata = await load(locale === "en" ? "app/fragments/[slug]/page.tsx" : "app/[locale]/fragments/[slug]/page.tsx").generateMetadata({ params: Promise.resolve({ locale, slug: page.split("/").at(-1) }) });
  } else metadata = load("components/ExplorePages.tsx").exploreMetadata(locale, page.slice(1));
  assert.ok(metadata.title && metadata.description, `${locale}${page}: missing metadata`);
  assert.equal(new URL(metadata.alternates.canonical, siteUrl).href, `${siteUrl}${localePath(locale, page)}`);
  for (const l of [...locales, "x-default"]) assert.equal(new URL(metadata.alternates.languages[l], siteUrl).href, `${siteUrl}${localePath(l === "x-default" ? "en" : l, page)}`);
  assert.ok(metadata.openGraph.title && metadata.openGraph.description && metadata.openGraph.locale);
  assert.equal(new URL(metadata.openGraph.url, siteUrl).href, `${siteUrl}${localePath(locale, page)}`);
  assert.equal(metadata.openGraph.alternateLocale.length, 4);
  if (["/terms", "/disclaimer"].includes(page)) assert.deepEqual(metadata.robots, { index: false, follow: true });
  metadataCount++;
}
for (const locale of locales) {
  const data = mobileApplicationData(locale);
  assert.equal(data["@type"], "MobileApplication");
  assert.equal(data.downloadUrl, googlePlayUrl);
  assert.equal(data.operatingSystem, "Android");
  for (const forbidden of ["offers", "aggregateRating", "review", "award"]) assert.equal(data[forbidden], undefined);
  assert.ok(!/fully encrypted|100% private|zero tracking|video diary|unhackable/i.test(homeSeo[locale].description));
  const policy = load("content/legal.ts").getLegalContent(locale).documents.privacy;
  assert.ok(policy.sections[9].paragraphs.some(text => text.includes("Metricool")));
}
const channels = load("lib/social-channels.ts").getPublishedSocialChannels();
assert.equal(channels.length, 7);
assert.equal(channels.at(-1).id, "threads");
assert.equal(channels.at(-1).url, "https://www.threads.com/@nofi_diary");
console.log(`PASS ${metadataCount} localized metadata/canonical/hreflang/OG records, JSON-LD, Play target, Threads and website disclosure`);

// Validate the actual environment too: this can intentionally fail a deployment.
resolveRelease(process.env);
assert.ok(isOfficialPlayUrl(moduleLoader(process.env)("lib/store.ts").googlePlayUrl), "NO-GO: configured Google Play URL has the wrong package");
console.log("PASS current environment. This check does not grant production GO: manual product/privacy and live preview gates remain required.");
