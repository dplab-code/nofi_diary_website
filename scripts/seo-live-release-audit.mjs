// Read-only production acceptance: only public GET to nofidiary.com.
import assert from "node:assert/strict";
const base="https://nofidiary.com";
const languages=["en","it","fr","es","de"];
const editorial=["/manifesto","/time-capsules","/stickers","/themes","/appearances"];
const fragments=["001-road-to-sea","002-the-song-kept-playing","003-three-small-shadows"];
const pages=["","/privacy",...fragments.map(x=>"/fragments/"+x),...editorial];
const localized=(lang,path)=>lang==="en"?(path||"/"):"/"+lang+path;
const absolute=(lang,path)=>base+localized(lang,path);
const expected=new Set(pages.flatMap(path=>languages.map(lang=>absolute(lang,path))));
const result={scope:"NOFI_LIVE_SEO_RELEASE_AUDIT",at:new Date().toISOString(),sitemapCount:null,checkedPages:0,checks:[],status:"UNVERIFIED"};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function get(path){
 let last;
 for(let n=0;n<3;n++){
  try{
   const r=await fetch(base+path,{redirect:"follow",signal:AbortSignal.timeout(10000)});
   assert.equal(r.status,200,"HTTP "+r.status+" for "+path);
   assert.ok(r.url.startsWith(base),"redirect outside production: "+r.url);
   return await r.text();
  }catch(e){last=e;if(n<2)await sleep(1300)}
 }
 throw last;
}
const tags=html=>[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
const attr=(tag,key)=>tag.match(new RegExp("\\b"+key+'="([^"]*)"', "i"))?.[1]??null;
const same=(a,b)=>JSON.stringify([...Object.entries(a)].sort())===JSON.stringify([...Object.entries(b)].sort());
const hreflang=path=>({...Object.fromEntries(languages.map(l=>[l,absolute(l,path)])),"x-default":absolute("en",path)});
try{
 const robots=await get("/robots.txt");
 assert.match(robots,/Sitemap:\s*https:\/\/nofidiary\.com\/sitemap\.xml/i);
 assert.match(robots,/Disallow:\s*\/coming-soon/i);
 for(const lang of languages){
  for(const path of editorial)assert.ok(!robots.includes("Disallow: "+localized(lang,path)),"editorial blocked: "+localized(lang,path));
  for(const path of ["/terms","/disclaimer"])assert.ok(robots.includes("Disallow: "+localized(lang,path)),"legal route unblocked: "+localized(lang,path));
 }
 result.checks.push("robots_editorial_allowed");

 const xml=await get("/sitemap.xml");
 const blocks=[...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>m[1]);
 const urls=blocks.map(b=>b.match(/<loc>([^<]+)<\/loc>/)?.[1]);
 result.sitemapCount=urls.length;
 assert.equal(urls.length,50);
 assert.equal(new Set(urls).size,50);
 assert.ok(urls.every(u=>expected.has(u)),"unexpected URL in sitemap");
 assert.ok(!xml.includes("/fragments/004-some-memories-have-a-sound"),"draft fragment exposed");
 result.checks.push("sitemap_50_expected_unique_urls");
 for(let i=0;i<blocks.length;i++){
  const rawPath=new URL(urls[i]).pathname.replace(/^\/(?:it|fr|es|de)(?=\/|$)/,"");
  const path=rawPath==="/"?"":rawPath;
  const links=[...blocks[i].matchAll(/<xhtml:link\b[^>]*>/gi)].map(m=>m[0]);
  assert.equal(links.length,6,"sitemap hreflang links for "+urls[i]);
  const found=Object.fromEntries(links.map(l=>[attr(l,"hreflang"),attr(l,"href")]));
  assert.ok(same(found,hreflang(path)),"sitemap hreflang mismatch: "+urls[i]);
 }
 result.checks.push("sitemap_50_hreflang_groups");

 for(const path of editorial){
  for(const lang of languages){
   const route=localized(lang,path),html=await get(route);
   result.checkedPages++;
   assert.ok(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html),"noindex for "+route);
   const all=tags(html);
   const canon=all.filter(t=>attr(t,"rel")==="canonical");
   assert.equal(canon.length,1,"canonical count for "+route);
   assert.equal(attr(canon[0],"href"),absolute(lang,path),"canonical for "+route);
   const alternates=all.filter(t=>attr(t,"rel")==="alternate"&&attr(t,"hreflang"));
   assert.equal(alternates.length,6,"HTML hreflang count "+route);
   const actual=Object.fromEntries(alternates.map(t=>[attr(t,"hreflang"),attr(t,"href")]));
   assert.ok(same(actual,hreflang(path)),"HTML hreflang mismatch "+route);
  }
 }
 result.checks.push("editorial_25_pages_canonical_and_hreflang");
 result.status="PASS";
 console.log(JSON.stringify(result));
}catch(e){
 result.status="FAIL";
 result.failure=String(e.message).slice(0,700);
 console.log(JSON.stringify(result));
 process.exitCode=1;
}
