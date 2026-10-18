import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
function load(path, mocks = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2017,
  } }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", compiled)(name => name in mocks ? mocks[name] : require(name), module, module.exports);
  return module.exports;
}
const config = load("lib/social-channels.ts");
const copy = load("lib/elsewhere-copy.ts");
// Deliberately fictional fixtures, never written into shipped configuration.
export const fixtureUrls = [
  "https://www.instagram.com/test_only_fixture/", "https://bsky.app/profile/test-only.invalid",
  "https://www.youtube.com/@test-only-fixture", "https://www.tiktok.com/@test_only_fixture",
  "https://www.reddit.com/r/test_only_fixture/", "https://www.linkedin.com/company/test-only-fixture/",
];
const fixtures = config.socialChannels.map((channel, i) => ({ ...channel, enabled: true, url: fixtureUrls[i] }));

test("safe publication: empty, disabled, invalid and partially configured channels", () => {
  assert.deepEqual(config.getPublishedSocialChannels(fixtures.map(c => ({ ...c, url: null }))), []);
  assert.deepEqual(config.getPublishedSocialChannels([]), []);
  assert.equal(config.getPublishedSocialChannels(fixtures).length, 6);
  assert.deepEqual(config.getPublishedSocialChannels([...fixtures].reverse()).map(c => c.id), config.socialChannelIds);
  assert.equal(config.getPublishedSocialChannels(fixtures.map(c => ({ ...c, enabled: false }))).length, 0);
  const mixed = fixtures.map((c, i) => ({ ...c, enabled: i === 2 }));
  assert.deepEqual(config.getPublishedSocialChannels(mixed).map(c => c.id), ["youtube"]);
  for (const channel of config.socialChannels) if (channel.url !== null) assert.ok(config.isSocialProfileUrl(channel.id, channel.url), "Configured profiles must pass validation");
});

test("URL guard rejects unsafe schemes, impostor domains, homepages, content and placeholders", () => {
  for (const channel of fixtures) {
    assert.equal(config.isSocialProfileUrl(channel.id, channel.url), true);
    for (const value of [null, "", "#", "javascript:alert(1)", "https://example.com/profile", channel.url.replace("https:", "http:"), channel.url + "?utm_source=fixture", channel.url + "#anchor", channel.url.replace("https://", "https://user:pass@"), new URL(channel.url).origin]) {
      assert.equal(config.isSocialProfileUrl(channel.id, value), false, `${channel.id}: ${value}`);
    }
  }
  for (const url of ["https://instagram.com.evil.invalid/nofi", "https://instagram.com/explore/", "https://instagram.com/reels/", "https://instagram.com/YOUR_HANDLE", "https://instagram.com/placeholder"]) assert.equal(config.isSocialProfileUrl("instagram", url), false);
});

test("complete localized editorial copy for every locale and channel", () => {
  for (const locale of ["en", "it", "fr", "es", "de"]) {
    const localized = copy.elsewhereCopy[locale];
    assert.equal(localized.thoughts.length, 5);
    assert.equal(new Set(localized.thoughts).size, 5);
    for (const value of Object.values(localized).flat()) assert.ok(value.trim());
    assert.deepEqual(Object.keys(copy.socialDescriptions[locale]), [...config.socialChannelIds]);
    if (locale !== "en") {
      for (const key of ["subtitle", "intro", "invitation", "another", "external"]) assert.notEqual(localized[key], copy.elsewhereCopy.en[key]);
      for (const id of config.socialChannelIds) assert.notEqual(copy.socialDescriptions[locale][id], copy.socialDescriptions.en[id]);
    }
  }
});

test("server section hides when empty and renders native localized links in both placements", () => {
  const css = new Proxy({}, { get: (_, key) => String(key) });
  const render = (channels, locale, placement) => {
    const { NoFiElsewhere } = load("components/NoFiElsewhere.tsx", {
      "@/lib/elsewhere-copy": copy,
      "@/lib/social-channels": { getPublishedSocialChannels: () => config.getPublishedSocialChannels(channels) },
      "./NoFiElsewhere.module.css": { default: css },
      "./ElsewhereThought": { ElsewhereThought: () => null },
      "./SocialExitTracking": { SocialExitTracking: () => null },
    });
    return renderToStaticMarkup(React.createElement(NoFiElsewhere, { locale, placement }));
  };
  assert.equal(render([], "en", "home"), "");
  for (const placement of ["home", "coming_soon"]) for (const locale of ["en", "it", "fr", "es", "de"]) {
    const html = render(fixtures, locale, placement);
    assert.equal((html.match(/target="_blank"/g) || []).length, 6);
    assert.equal((html.match(/rel="noopener noreferrer"/g) || []).length, 6);
    assert.ok(html.includes(`lang="${locale}"`));
    assert.ok(html.includes(`id="nofi-elsewhere-${placement}"`));
    for (const channel of fixtures) assert.ok(html.includes(`href="${channel.url}"`));
  }
});
