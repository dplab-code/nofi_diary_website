import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { moduleLoader } from "./load-ts.mjs";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : "playwright");
const load = moduleLoader({ VERCEL_ENV: "production", COMING_SOON: "false", SITE_RELEASE_MODE: "public", INDEXABLE: "true" });
const { locales, localePath } = load("lib/i18n.ts");
const { publicPagePaths } = load("content/seo.ts");
const { publishedFragments } = load("content/fragments.ts");
const routePaths = [...publicPagePaths, "/terms", "/disclaimer", ...publishedFragments.map(f => `/fragments/${f.slug}`)];
const output = path.join(root, "tmp/launch-evidence");
const origin = process.env.RELEASE_ORIGIN || "http://localhost:3110";
const records = [], checks = [], failures = [];
let server, browser;
let logs = "";
await mkdir(output, { recursive: true });
try {
  if (!process.env.RELEASE_ORIGIN) {
    server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "-p", "3110"], { cwd: root, windowsHide: true, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    server.stdout.on("data", c => { logs += c; }); server.stderr.on("data", c => { logs += c; });
    for (let i = 0; i < 30; i++) {
      try { if ((await fetch(origin, { signal: AbortSignal.timeout(2000) })).ok) break; } catch {}
      if (server.exitCode !== null) throw new Error(logs);
      await new Promise(r => setTimeout(r, 500));
    }
  }
  browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
  const context = await browser.newContext();
  await context.route("**/*", route => {
    const u = new URL(route.request().url());
    if (u.href === "https://tracker.metricool.com/resources/be.js") return route.fulfill({ contentType: "application/javascript", body: "window.__metricoolVisits=[];window.beTracker={t:function(data){window.__metricoolVisits.push({hash:data.hash,url:location.href})}};" });
    if (u.origin !== origin || u.pathname.startsWith("/_vercel/")) return route.fulfill({ contentType: "application/javascript", body: "" });
    return route.continue();
  });
  const page = await context.newPage();
  page.on("pageerror", e => failures.push(e.message));
  page.on("response", response => { if (response.url().startsWith(origin) && response.status() >= 400 && !response.url().includes("not-published")) failures.push(`${response.status()} ${response.url()}`); });
  const discovered = new Set();
  for (const locale of locales) for (const route of routePaths) {
    const pathname = localePath(locale, route);
    const response = await context.request.get(origin + pathname);
    assert.equal(response.status(), 200, pathname);
    assert.match(response.headers()["x-robots-tag"], /noindex/);
    assert.equal(response.headers()["content-language"], locale);
    const html = await response.text();
    const result = await page.evaluate(html => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const attr = (selector, name) => doc.querySelector(selector)?.getAttribute(name);
      return { title: doc.title, description: attr('meta[name="description"]', "content"), canonical: attr('link[rel="canonical"]', "href"), robots: attr('meta[name="robots"]', "content"), htmlLanguage: doc.documentElement.lang, h1: doc.querySelectorAll("h1").length, alternates: [...doc.querySelectorAll('link[rel="alternate"][hreflang]')].map(el => [el.getAttribute("hreflang"), el.getAttribute("href")]), links: [...doc.querySelectorAll("a[href]")].map(el => el.getAttribute("href")) };
    }, html);
    assert.ok(result.title && result.description, pathname);
    assert.equal(result.h1, 1, pathname);
    assert.equal(new URL(result.canonical).href, `https://nofidiary.com${pathname}`);
    assert.match(result.robots, /noindex/, pathname);
    for (const l of [...locales, "x-default"]) assert.ok(result.alternates.some(([lang, href]) => lang === l && new URL(href).href === `https://nofidiary.com${localePath(l === "x-default" ? "en" : l, route)}`), pathname);
    for (const link of result.links) if (link.startsWith("/") && !link.startsWith("//")) discovered.add(new URL(link, origin).pathname);
    records.push({ pathname, ...result, links: undefined });
  }
  for (const pathname of discovered) assert.equal((await context.request.get(origin + pathname)).status(), 200, `broken internal link ${pathname}`);
  for (const pathname of ["/fragments/not-published", "/it/fragments/not-published"]) assert.equal((await context.request.get(origin + pathname)).status(), 404);
  const robots = await (await context.request.get(`${origin}/robots.txt`)).text();
  const sitemap = await (await context.request.get(`${origin}/sitemap.xml`)).text();
  assert.match(robots, /Disallow: \//);
  assert.ok(!sitemap.includes("<loc>"));
  checks.push(`PASS crawl ${records.length} public/legal pages; ${discovered.size} internal destinations; no missing metadata, canonical or hreflang; previews noindex; draft/unknown fragments 404; preview sitemap empty`);
  for (const width of [375, 1440]) for (const pathname of ["/", "/it", "/time-capsules", "/manifesto", "/fragments/002-the-song-kept-playing", "/privacy"]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto(origin + pathname, { waitUntil: "networkidle" });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${pathname} ${width}: overflow`);
    await page.waitForFunction(() => window.__metricoolVisits?.length === 1);
    assert.equal(await page.locator('script[src="https://tracker.metricool.com/resources/be.js"]').count(), 1);
    assert.equal(await page.evaluate(() => window.__metricoolVisits[0].hash), "4b1f47aa5bdf6604eecdfb061d2c5e42");
    const images = await page.locator("img").evaluateAll(images => images.filter(img => img.loading !== "lazy").every(img => img.complete && img.naturalWidth > 0));
    assert.ok(images, `${pathname} ${width}: image load`);
    if (pathname === "/it" || pathname === "/fragments/002-the-song-kept-playing") await page.screenshot({ path: path.join(output, `${pathname === "/it" ? "home-it" : "fragment-002"}-${width}.png`) });
  }
  checks.push("PASS six representative routes on mobile/desktop: no overflow, eager images loaded, no hydration exceptions, Metricool once per page with exact hash");
  await page.goto(origin + "/", { waitUntil: "networkidle" });
  await page.locator("#locale").selectOption("it");
  await page.waitForURL(origin + "/it");
  assert.equal(await page.locator("html").getAttribute("lang"), "it");
  await page.getByRole("link", { name: /Leggi il Manifesto NoFi/ }).click();
  await page.waitForURL(origin + "/it/manifesto");
  await page.waitForFunction(() => window.__metricoolVisits?.length === 2);
  checks.push("PASS real language selector and internal navigation; Metricool records one additional page on client navigation");
  await page.goto(origin + "/fragments/002-the-song-kept-playing", { waitUntil: "networkidle" });
  const audio = page.locator("audio");
  if (await audio.count()) {
    await audio.locator("..").locator("button").click();
    await page.waitForFunction(() => { const audio = document.querySelector("audio"); return audio && !audio.paused && audio.currentTime > 0; });
    checks.push("PASS Fragment audio starts and progresses");
  }
  const links = await page.locator('a[href*="play.google.com"]').evaluateAll(elements => elements.map(a => a.getAttribute("href")));
  assert.ok(links.length && links.every(url => url === "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary"));
  assert.deepEqual(failures, []);
  checks.push("PASS exact Google Play CTA; no failing app resources or uncaught browser exceptions");
} catch (error) { checks.push(`FAIL ${error.stack}`); process.exitCode = 1; }
finally {
  await browser?.close();
  if (server) { if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { windowsHide: true }); else server.kill(); }
  await writeFile(path.join(output, process.env.RELEASE_ORIGIN ? "preview-crawl.json" : "local-crawl.json"), JSON.stringify({ origin, timestamp: new Date().toISOString(), checks, records, failures }, null, 2));
  await writeFile(path.join(output, "server.log"), logs);
  console.log(checks.join("\n"));
}
