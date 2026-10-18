// Local-only integration harness. Restores configuration and removes its route in finally.
// Requires Playwright externally: PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { spawn, spawnSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : "playwright");
const root = fileURLToPath(new URL("../", import.meta.url));
const configPath = path.join(root, "lib/social-channels.ts");
// A dot excludes this local test route from the existing Coming Soon proxy matcher.
const fixturePath = "/elsewhere-local-fixture.test";
const routePath = path.join(root, "app", fixturePath.slice(1));
const original = await readFile(configPath, "utf8");
const generatedFiles = await Promise.all(["AGENTS.md", "CLAUDE.md", "next-env.d.ts"].map(async name => ({
  name, content: await readFile(path.join(root, name), "utf8").catch(error => { if (error.code === "ENOENT") return null; throw error; }),
})));
const output = path.join(root, "tmp/elsewhere-evidence");
const port = process.env.ELSEWHERE_TEST_PORT || "3107";
const origin = `http://localhost:${port}`;
const locales = ["en", "it", "fr", "es", "de"];
const ids = ["instagram", "bluesky", "youtube", "tiktok", "reddit", "linkedin"];
// Fictional addresses are used only in the local fixture; all external requests are intercepted.
const urls = ["https://www.instagram.com/test_only_fixture/", "https://bsky.app/profile/test-only.invalid", "https://www.youtube.com/@test-only-fixture", "https://www.tiktok.com/@test_only_fixture", "https://www.reddit.com/r/test_only_fixture/", "https://www.linkedin.com/company/test-only-fixture/"];
const headings = ["We are here.", "Siamo qui.", "Nous sommes ici.", "Estamos aquí.", "Wir sind hier."];
const results = [];
const record = message => { results.push(message); console.log(message); };
let server, browser;
let createdRoute = false;
let logs = "";
try {
  await mkdir(output, { recursive: true });
  await mkdir(routePath); // Refuse to overwrite an existing route.
  createdRoute = true;
  await writeFile(path.join(routePath, "page.tsx"), `import { HomePage } from '@/components/HomePage';
import { ComingSoonExperience } from '@/app/coming-soon/page';
import { isLocale } from '@/lib/i18n';
export default async function Fixture({searchParams}: {searchParams: Promise<{locale?:string; mode?:string}>}) {
const p = await searchParams; const locale = p.locale && isLocale(p.locale) ? p.locale : 'en';
return p.mode === 'home' ? <HomePage locale={locale}/> : <ComingSoonExperience locale={locale}/>;
}`);
  server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", "--port", port], { cwd: root, windowsHide: true, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: ["ignore", "pipe", "pipe"] });
  server.stdout.on("data", chunk => { logs += chunk; });
  server.stderr.on("data", chunk => { logs += chunk; });
  let ready = false;
  for (let i = 0; i < 90; i++) {
    try { const response = await fetch(origin, { signal: AbortSignal.timeout(5000) }); if (response.ok) { ready = true; break; } } catch {}
    if (server.exitCode !== null) throw new Error(`Server exited: ${logs}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, logs);
  browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
  const context = await browser.newContext();
  await context.route("**/*", route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    // Block third-party scripts with valid empty JavaScript, not placeholder prose.
    return route.fulfill({ status: 200, body: "", contentType: route.request().resourceType() === "script" ? "application/javascript" : "text/plain" });
  });
  await context.addInitScript(() => { window.__socialEvents = []; window.va = (...args) => { if (args[0] === "event" && args[1]?.name === "social_exit_click") window.__socialEvents.push(args[1]); }; });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  // Real public routes must remain hidden with the shipped empty configuration.
  for (const locale of locales) {
    await page.goto(`${origin}${locale === "en" ? "/" : `/${locale}`}`);
    assert.equal(await page.locator('[id^="nofi-elsewhere-"]').count(), 0);
  }
  record("PASS: empty configuration hides section on all five actual localized routes");
  for (const mode of ["home", "coming_soon"]) {
    await page.goto(`${origin}${fixturePath}?mode=${mode}`);
    assert.equal(await page.locator('[id^="nofi-elsewhere-"]').count(), 0);
  }
  record("PASS: empty configuration hides section in both experiences");
  let index = 0;
  await writeFile(configPath, original.replace(/url: null, enabled: false/g, () => `url: ${JSON.stringify(urls[index++])}, enabled: true`));
  assert.equal(index, 6);
  // Wait for Next's file watcher before testing the newly configured section.
  for (let attempt = 0; attempt < 20; attempt++) {
    await page.goto(`${origin}${fixturePath}?mode=home&refresh=${attempt}`);
    if (await page.locator('#nofi-elsewhere-home').count()) break;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  for (const mode of ["home", "coming_soon"]) for (const [i, locale] of locales.entries()) {
    await page.goto(`${origin}${fixturePath}?mode=${mode}&locale=${locale}`);
    await page.waitForLoadState("networkidle");
    const section = page.locator(`#nofi-elsewhere-${mode}`);
    await section.waitFor();
    assert.ok((await section.locator("h2").textContent()).startsWith(headings[i]));
    assert.deepEqual(await section.locator("a").evaluateAll(elements => elements.map(e => e.dataset.socialChannel)), ids);
    // Section is after privacy/ownership, before footer (and before final CTA at home).
    assert.ok(await section.evaluate((el, mode) => {
      const before = mode === "home" ? document.querySelector("#privacy") : document.querySelector("#ownership-title");
      const after = mode === "home" ? document.querySelector(".finalCta") : document.querySelector("footer");
      return Boolean(before.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) && Boolean(el.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING);
    }, mode));
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await section.scrollIntoViewIfNeeded();
      assert.ok(await section.evaluate(el => el.scrollWidth <= el.clientWidth), `${mode}/${locale}/${width}: section overflow`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${mode}/${locale}/${width}: page overflow`);
      assert.equal(await section.locator("ol").evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length), width <= 600 ? 1 : 2);
      assert.ok(await section.locator("a").first().evaluate(el => el.getBoundingClientRect().height >= 44));
      if (locale === "it" && [375, 1440].includes(width)) await section.screenshot({ path: path.join(output, `${mode}-it-${width}-FIXTURE.png`), style: ".siteHeaderFrame,nextjs-portal{visibility:hidden!important}" });
    }
    const thought = section.locator('[aria-live="polite"]');
    const button = section.locator("button");
    const first = await thought.textContent();
    await button.focus();
    assert.notEqual(await button.evaluate(el => getComputedStyle(el).outlineStyle), "none");
    const initialBox = await section.boundingBox();
    await button.press("Enter");
    await page.waitForFunction(first => document.querySelector('section[id^="nofi-elsewhere-"] [aria-live="polite"]').textContent !== first, first);
    assert.notEqual(await thought.textContent(), first);
    assert.ok(await button.evaluate(el => el === document.activeElement));
    assert.equal((await section.boundingBox()).height, initialBox.height);
    for (let n = 0; n < 4; n++) {
      const previous = await thought.textContent();
      await button.press("Space");
      await page.waitForFunction(previous => document.querySelector('section[id^="nofi-elsewhere-"] [aria-live="polite"]').textContent !== previous, previous);
    }
    assert.equal(await thought.textContent(), first);
    assert.equal(await page.evaluate(() => window.__socialEvents.length), 0);
    const link = section.locator("a").first();
    await link.focus();
    assert.notEqual(await link.evaluate(el => getComputedStyle(el).outlineStyle), "none");
    const popupPromise = page.waitForEvent("popup");
    await link.press("Enter");
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.equal(popup.url(), urls[0]);
    assert.equal(await popup.evaluate(() => window.opener), null);
    await popup.close();
    const events = await page.evaluate(() => window.__socialEvents);
    assert.equal(events.length, 1);
    assert.deepEqual(events[0].data, { channel: "instagram", placement: mode, locale });
    assert.equal(events[0].name, "social_exit_click");
    record(`PASS: ${mode}/${locale}: four widths, order, placement, keyboard, stable height, single exact analytics event`);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.locator('#nofi-elsewhere-coming_soon button').evaluate(el => getComputedStyle(el).animationName), "none");
  record("PASS: reduced-motion: no animated interaction");
  // In-place locale navigation must replace the copy and reset the reflection.
  await page.goto(`${origin}/it`);
  await page.locator('#nofi-elsewhere-coming_soon button').click();
  await page.locator('a[hreflang="de"]').click();
  await page.waitForURL(`${origin}/de`);
  assert.ok((await page.locator('#nofi-elsewhere-coming_soon h2').textContent()).startsWith(headings[4]));
  assert.equal(await page.locator('#nofi-elsewhere-coming_soon [aria-live="polite"]').textContent(), "Auch Stille hat Platz im Veröffentlichungsplan.");
  record("PASS: actual language navigation it → de replaces section copy and resets thought");
  await page.evaluate(() => { window.__socialEvents = []; });
  for (let i = 0; i < ids.length; i++) {
    const popupPromise = page.waitForEvent("popup");
    await page.locator('#nofi-elsewhere-coming_soon a').nth(i).click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.equal(popup.url(), urls[i]);
    await popup.close();
  }
  assert.deepEqual(await page.evaluate(() => window.__socialEvents.map(event => event.data)), ids.map(channel => ({ channel, placement: "coming_soon", locale: "de" })));
  record("PASS: all six channels open native new tabs and emit once with exact properties");
  await page.locator('#nofi-elsewhere-coming_soon a').first().dispatchEvent("auxclick", { button: 1 });
  assert.equal(await page.evaluate(() => window.__socialEvents.length), 7);
  await page.locator('#nofi-elsewhere-coming_soon a').first().dispatchEvent("auxclick", { button: 2 });
  assert.equal(await page.evaluate(() => window.__socialEvents.length), 7);
  record("PASS: synthetic middle-click emits once; right-click emits nothing (native middle-tab opening NOT RUN)");
  // A missing or throwing analytics API must never suppress native navigation.
  for (const behavior of ["missing", "throwing"]) {
    await page.evaluate(behavior => { window.va = behavior === "missing" ? undefined : () => { throw new Error("Blocked analytics fixture"); }; }, behavior);
    const popupPromise = page.waitForEvent("popup");
    await page.locator('#nofi-elsewhere-coming_soon a').first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.equal(popup.url(), urls[0]);
    await popup.close();
  }
  record("PASS: native navigation with missing/throwing analytics");
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  await noJs.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.fulfill({ body: "Intercepted fixture" }));
  const plain = await noJs.newPage();
  for (const mode of ["home", "coming_soon"]) {
    await plain.goto(`${origin}${fixturePath}?mode=${mode}&locale=it`);
    const links = plain.locator(`#nofi-elsewhere-${mode} a`);
    assert.equal(await links.count(), 6);
    const popupPromise = plain.waitForEvent("popup");
    await links.first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.equal(popup.url(), urls[0]);
    await popup.close();
  }
  record("PASS: both experiences render and open native links without JavaScript");
  assert.deepEqual(errors, []);
  record("PASS: no uncaught browser exceptions");
} catch (error) {
  results.push(`FAIL: ${error.stack}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server) {
    if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { windowsHide: true });
    else server.kill("SIGTERM");
  }
  await writeFile(configPath, original);
  if (createdRoute) await rm(routePath, { recursive: true, force: true });
  // Next's generated dev validator otherwise retains an import of the removed route.
  for (const name of ["validator.ts", "routes.d.ts"]) await rm(path.join(root, ".next/dev/types", name), { force: true });
  for (const file of generatedFiles) {
    if (file.content === null) await rm(path.join(root, file.name), { force: true });
    else await writeFile(path.join(root, file.name), file.content);
  }
  await writeFile(path.join(output, "results.txt"), results.join("\n") + "\n");
  await writeFile(path.join(output, "server.log"), logs);
  if (process.exitCode) console.log(results.at(-1));
}
