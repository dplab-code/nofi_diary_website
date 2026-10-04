const host = "nofidiary.com";
const key = "f1f3fab70bfd46d892cb8ee8719b6568";
const keyLocation = `https://${host}/${key}.txt`;
const localePrefixes = ["", "/it", "/fr", "/es", "/de"];
const publishedFragmentSlugs = ["001-road-to-sea", "002-the-song-kept-playing"];
const localizedPaths = path => localePrefixes.map(prefix => `${prefix}${path}` || "/");
const defaults = [
  ...localizedPaths(""),
  ...localizedPaths("/privacy"),
  ...publishedFragmentSlugs.flatMap(slug => localizedPaths(`/fragments/${slug}`))
];
const paths = process.argv.slice(2);
const urlList = (paths.length ? paths : defaults).map(value => new URL(value, `https://${host}`).href);

if (urlList.some(url => new URL(url).hostname !== host)) throw new Error(`Every URL must belong to ${host}`);

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList })
});

if (!response.ok) throw new Error(`IndexNow returned ${response.status}: ${await response.text()}`);
console.log(`IndexNow accepted ${urlList.length} URL(s) with status ${response.status}.`);
