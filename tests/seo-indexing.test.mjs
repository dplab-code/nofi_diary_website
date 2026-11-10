// Production Next.js smoke test for indexability in PUBLIC and COMING-SOON modes.
// Only accesses a disposable local server; never submits URLs or changes Search Console.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const host = "127.0.0.1";
const mode = process.env.SEO_EXPECTED_MODE;
assert.ok(["public", "coming-soon"].includes(mode), "SEO_EXPECTED_MODE must be public or coming-soon");

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
  : sourceUrls;

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

  await test("sitemap includes only intended canonical multilingual pages", async () => {
    const res = await fetch(origin + "/sitemap.xml");
    assert.equal(res.status, 200);
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((v) => v[1]);
    const expected = expectedUrls.map((route) => "https://nofidiary.com" + (route || "/"));
    assert.equal(locs.length, expected.length);
    assert.equal(new Set(locs).size, locs.length, "duplicate URL in sitemap");
    assert.deepEqual(locs.toSorted(), expected.toSorted(), "sitemap/canonical inventory mismatch");
    assert.ok(!xml.includes("/fragments/004-some-memories-have-a-sound"), "draft fragment listed");
    for (const route of ["/terms", "/disclaimer", "/coming-soon"]) {
      assert.ok(!xml.includes("<loc>https://nofidiary.com" + route + "</loc>"), "excluded route in sitemap");
    }
    if (mode === "public") {
      assert.ok(xml.includes('hreflang="it"') || xml.includes('hreflang="it"'.replace("hreflang", "hreflang")), "missing hreflang Italian");
    }
  });

  await test("robots does not block public editorial pages and preserves release gates", async () => {
    const res = await fetch(origin + "/robots.txt");
    assert.equal(res.status, 200);
    const rules = await res.text();
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
  });

  if (mode === "public") {
    await test("all 25 editorial URLs render an indexable self-canonical page", async () => {
      for (const route of editorial) {
        for (const lang of languages) {
          const path = localizedPath(lang, route);
          const response = await fetch(origin + path);
          assert.equal(response.status, 200, `HTTP status for ${path}`);
          const html = await response.text();
          const canonical = "https://nofidiary.com" + path;
          assert.ok(html.includes('rel="canonical" href="' + canonical + '"'), `canonical for ${path}`);
          assert.ok(!/<meta name="robots" content="[^"]*noindex/i.test(html), `noindex on ${path}`);
          for (const other of languages) {
            const alt = "https://nofidiary.com" + localizedPath(other, route);
            assert.ok(html.includes('href="' + alt + '"'), `missing language alternate ${other} for ${path}`);
          }
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
