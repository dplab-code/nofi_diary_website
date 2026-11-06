import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {createWebsiteTracker,publicPage} from '../lib/cloudflare-events.ts';
function harness(href='https://nofidiary.com/it?utm_source=instagram&utm_medium=social&utm_campaign=fragment_gallery_launch') {
 const rows=[];let current=href,allowed=true;
 const tracker=createWebsiteTracker({href:()=>current,referrer:'https://www.google.com/search?q=private-text',allowed:()=>allowed,id:randomUUID,send:e=>rows.push(e)});
 return {rows,tracker,go:url=>{current=url;tracker.navigate();},deny:()=>{allowed=false;}};
}
test('public routes/locales and editorial fragment IDs match real pages',()=>{
 assert.deepEqual(publicPage('https://nofidiary.com/it/fragments/002-the-song-kept-playing'),{page:'fragment',locale:'it',fragment:'002'});
 assert.deepEqual(publicPage('https://nofidiary.com/coming-soon?locale=fr'),{page:'coming_soon',locale:'fr'});
 assert.equal(publicPage('https://nofidiary.com/api/private'),null);
 assert.equal(publicPage('https://nofidiary.com/fragments/private-memory'),null);
});
test('Strict Mode/navigation deduplication, return visits and in-memory attribution',()=>{
 const h=harness();h.tracker.navigate();h.tracker.navigate();assert.equal(h.rows.length,1);
 h.go('https://nofidiary.com/it/privacy');h.go('https://nofidiary.com/it');assert.equal(h.rows.length,3);
 h.go('https://nofidiary.com/it/fragments/002-the-song-kept-playing');h.tracker.navigate();assert.equal(h.rows.length,5);
 assert.equal(h.rows[4].event,'shared_fragment_view');assert.equal(h.rows[4].detail.fragment,'002');assert.equal(h.rows[4].utm.source,'instagram');
 assert.equal(new Set(h.rows.map(r=>r.id)).size,5);
});
test('raw URL, diary text and arbitrary properties never enter transmitted fields',()=>{
 const h=harness('https://nofidiary.com/it?utm_source=someone@example.invalid&utm_campaign=private-text&email=secret');h.tracker.navigate();
 h.tracker.track('download_click',{placement:'hero',variant:'button',destination:'google_play',email:'private'});
 assert.equal(h.rows[0].utm.source,'unrecognized');assert.equal(h.rows[0].utm.campaign,'unrecognized');assert.equal(h.rows[0].referrer,'google.com');
 assert.doesNotMatch(JSON.stringify(h.rows),/example|private|secret|https:|search\?q/);
 assert.deepEqual(Object.keys(h.rows[1].detail),['placement','variant','destination']);
});
test('first audio start per route/fragment, repeated store clicks, invalid details and delivery failure',()=>{
 const h=harness();h.tracker.navigate();const detail={fragment:'002',gallery:'coming_soon_fragments',interaction_type:'audio_start'};
 h.tracker.track('gallery_interaction',detail);h.tracker.track('gallery_interaction',detail);assert.equal(h.rows.length,2);
 h.tracker.track('gallery_interaction',{...detail,fragment:'personal-id'});assert.equal(h.rows.length,2);
 for(let i=0;i<2;i++)h.tracker.track('download_click',{placement:'header',variant:'button',destination:'google_play'});assert.equal(h.rows.length,4);
 const failed=createWebsiteTracker({href:()=> 'https://nofidiary.com/',referrer:'',allowed:()=>true,id:randomUUID,send:()=>{throw Error('offline');}});assert.doesNotThrow(()=>failed.navigate());
});
test('preview origins, privacy preference and per-document budget suppress requests',()=>{
 const preview=harness('https://preview.vercel.app/');preview.tracker.navigate();assert.equal(preview.rows.length,0);
 const h=harness();h.deny();h.tracker.navigate();assert.equal(h.rows.length,0);
 const capped=harness();for(let i=0;i<200;i++)capped.tracker.track('download_click',{placement:'hero',variant:'button',destination:'google_play'});assert.equal(capped.rows.length,120);
});
