// Production Next.js smoke test for indexability in PUBLIC and COMING-SOON modes.
// Only accesses a disposable local server; never submits URLs or changes Search Console.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const host = "127.0.0.1";
const mode = process.env.SEO_EXPECTED_MODE;
assert.ok(["public", "coming-soon", "preview-blocked", "public-noindex"].includes(mode), "Unknown SEO_EXPECTED_MODE");

const languages = ["en", "it", "fr", "es", "de"];
const editorial = ["/manifesto", "/time-capsules", "/stickers", "/themes", "/appearances"];
const localizedPath = (lang, route) => lang === "en" ? route : "/" + lang + route;
const sourceUrls = [
  ...["", "/privacy"].flatMap((route) => languages.map((lang) => localizedPath(lang, route))),
  ...["001-road-to-sea", "002-the-song-kept-playing", "003-three-small-shadows"].flatMap(
    (slug) => languages.map((lang) => localizedPath(lang, "/fragments/" + slug))
  ),
];
const expectedUrls = mode === "public"
  ? [...sourceUrls, ...editorial.flatMap((route) => languages.map((lang) => localizedPath(lang, route)))]
  : mode === "coming-soon" ? sourceUrls : [];
const fullUrl = (lang, route) => "https://nofidiary.com" + (localizedPath(lang, route) || "/");
const attr = (tag, name) => tag.match(new RegExp("\\b" + name + '="([^"]*)"', "i"))?.[1] ?? null;
const localizedVariants = (route) => ({
  ...Object.fromEntries(languages.map((lang) => [lang, fullUrl(lang, route)])),
  "x-default": fullUrl("en", route),
});

async function openPort() {
  const server = createServer();
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, host, resolve));
  const port = server.address().port;
  await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
  return port;
}
const port = await openPort();
const origin = `http://${host}:${port}`;
let serverLog = "";
const server = spawn(process.execPath, [
  "node_modules/next/dist/bin/next", "start", "-H", host, "-p", String(port)
], {
  cwd: process.cwd(),
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});
for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", (chunk) => { serverLog += chunk.toString(); });
}
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw Error("Next.js exited: " + serverLog.slice(-2000));
    try {
      const r = await fetch(origin + "/robots.txt");
      if (r.ok) { ready = true; break; }
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  assert.ok(ready, "Next.js fixture not ready: " + serverLog.slice(-2000));

  await test("sitemap lists exactly the intended localized canonicals with reciprocal hreflang", async () => {
    const res = await fetch(origin + "/sitemap.xml");
    assert.equal(res.status, 200);
    const xml = await res.text();
    const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
    const locs = blocks.map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1]);
    const expected = expectedUrls.map((route) => "https://nofidiary.com" + (route || "/"));
    assert.equal(locs.length, expected.length);
    assert.equal(new Set(locs).size, locs.length, "duplicate URL in sitemap");
    assert.deepEqual(locs.toSorted(), expected.toSorted(), "sitemap/canonical inventory mismatch");
    assert.ok(!xml.includes("/fragments/004-some-memories-have-a-sound"), "draft fragment listed");
    for (const route of ["/terms", "/disclaimer", "/coming-soon"]) {
      assert.ok(!xml.includes("<loc>https://nofidiary.com" + route + "</loc>"), "excluded route in sitemap");
    }
    for (const [index, block] of blocks.entries()) {
      const path = new URL(locs[index]).pathname;
      const localizedBase = path.replace(/^\/(?:it|fr|es|de)(?=\/|$)/, "");
      const base = localizedBase === "/" ? "" : localizedBase;
      const expectedAlternates = localizedVariants(base);
      const linkTags = [...block.matchAll(/<xhtml:link\b[^>]*>/gi)].map((m) => m[0]);
      const actualAlternates = linkTags.map((tag) => [attr(tag, "hreflang"), attr(tag, "href")]);
      assert.equal(linkTags.length, 6, "exactly EN/IT/FR/ES/DE + x-default for " + locs[index]);
      assert.deepEqual(
        Object.fromEntries(actualAlternates), expectedAlternates,
        "incorrect hreflang targets in sitemap for " + locs[index]
      );
    }
  });

  await test("robots respects release gates and keeps legal/draft routes excluded", async () => {
    const res = await fetch(origin + "/robots.txt");
    assert.equal(res.status, 200);
    const rules = await res.text();
    if (mode === "preview-blocked" || mode === "public-noindex") {
      assert.match(rules, /Disallow: \/($|\r?\n)/);
      assert.ok(!rules.includes("Sitemap:"), "blocked release must not advertise a sitemap");
      const indexResponse = await fetch(origin + "/");
      assert.equal(indexResponse.status, 200);
      const indexHtml = await indexResponse.text();
      assert.match(indexHtml, /<meta name="robots" content="[^"]*noindex/i, "blocked release requires noindex");
    } else {
      assert.match(rules, /Disallow: \/coming-soon/i);
      for (const lang of languages) {
        for (const path of ["/terms", "/disclaimer"]) {
          assert.ok(rules.includes("Disallow: " + localizedPath(lang, path)), "legal crawl policy changed");
        }
        for (const path of editorial) {
          const directive = "Disallow: " + localizedPath(lang, path);
          assert.equal(rules.includes(directive), mode !== "public", "wrong rule for " + directive);
        }
      }
      assert.match(rules, /Sitemap: https:\/\/nofidiary\.com\/sitemap\.xml/i);
    }
  });

  if (mode === "public") {
    await test("all 25 editorial URLs use self-canonical and exact HTML hreflang metadata", async () => {
      for (const route of editorial) {
        for (const lang of languages) {
          const path = localizedPath(lang, route);
          const response = await fetch(origin + path);
          assert.equal(response.status, 200, "HTTP status for " + path);
          const html = await response.text();
          assert.ok(!/<meta name="robots" content="[^"]*noindex/i.test(html), "noindex on " + path);
          const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
          const canonical = links.filter((link) => attr(link, "rel") === "canonical");
          assert.equal(canonical.length, 1, "exactly one canonical link for " + path);
          assert.equal(attr(canonical[0], "href"), fullUrl(lang, route), "canonical for " + path);
          const alternates = links.filter((link) => attr(link, "rel") === "alternate" && attr(link, "hreflang"));
          const actual = alternates.map((link) => [attr(link, "hreflang"), attr(link, "href")]);
          assert.equal(actual.length, 6, "exactly five alternate locales and x-default for " + path);
          assert.deepEqual(
            Object.fromEntries(actual), localizedVariants(route),
            "HTML hreflang reciprocal mapping for " + path
          );
        }
      }
    });
  }
  console.log(`PASS SEO INDEXING ${mode}: ${expectedUrls.length} sitemap URLs, release gates, robots and canonical routes`);
} finally {
  server.kill();
  await new Promise((resolve) => {
    if (server.exitCode !== null) return resolve();
    server.once("exit", resolve);
    setTimeout(() => { server.kill("SIGKILL"); resolve(); }, 3500).unref();
  });
}
