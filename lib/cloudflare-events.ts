// Public website only. No cookie, storage, person identifier or raw URL leaves this module.
export const SITE_EVENT_ENDPOINT = 'https://nofi-site-events.frosty-hill-86d4.workers.dev/v1/events';
const origins = ['https://nofidiary.com', 'https://www.nofidiary.com'];
const locales = ['en', 'it', 'fr', 'es', 'de'];
const fragments: Record<string, string> = {'001-road-to-sea':'001', '002-the-song-kept-playing':'002', '003-three-small-shadows':'003'};
const memoryIds = ['001','002','003','eccoli','fuori','sancius','altrove'];
const campaigns = {source:['nofi_app','instagram','threads','bluesky','pinterest','tiktok','youtube','reddit','linkedin','newsletter','direct_share'], medium:['share','social','organic','post','bio','email'], campaign:['memory_share','fragment_gallery_launch','privacy_manifesto'], content:['carousel_01','profile_bio']};
const referrers = ['google.com','bing.com','instagram.com','l.instagram.com','t.co','bsky.app','pinterest.com','youtube.com','tiktok.com','reddit.com','linkedin.com','nofidiary.com'];
type Event = 'page_view' | 'download_click' | 'shared_fragment_view' | 'gallery_interaction';
type Detail = Record<string, unknown>;
type Page = {page:string; locale:string; fragment?:string};
type Payload = {version:1; id:string; event:Event; page:string; locale:string; utm:Record<string,string>; referrer:string; detail:Detail};
const pick = (value:string|null, vocabulary:readonly string[]) => !value ? 'unattributed' : vocabulary.includes(value) ? value : 'unrecognized';
export function publicPage(href:string): Page|null {
  const url = new URL(href), parts = url.pathname.split('/').filter(Boolean);
  const locale = locales.includes(parts[0]) ? parts.shift()! : 'en';
  if (!parts.length) return {page:'home',locale};
  if (parts.length===2 && parts[0]==='fragments' && fragments[parts[1]]) return {page:'fragment',locale,fragment:fragments[parts[1]]};
  const pages:Record<string,string> = {manifesto:'manifesto',privacy:'privacy',terms:'terms',disclaimer:'disclaimer',appearances:'appearances',themes:'themes',stickers:'stickers','time-capsules':'time_capsules','coming-soon':'coming_soon'};
  if(parts.length!==1 || !Object.hasOwn(pages,parts[0])) return null;
  return {page:pages[parts[0]], locale:parts[0]==='coming-soon' && locales.includes(url.searchParams.get('locale')??'') ? url.searchParams.get('locale')! : locale};
}
export function createWebsiteTracker(options:{href:()=>string; referrer:string; allowed:()=>boolean; id:()=>string; send:(payload:Payload)=>void}) {
  let attribution:Record<string,string>|undefined, visit='', emitted=0;
  const once = new Set<string>();
  let referrer='unattributed';
  try {referrer=pick(new URL(options.referrer).hostname.replace(/^www\./,''),referrers);} catch { /* Empty referrer. */ }
  function context() {
    if(!options.allowed() || emitted>=120) return null;
    const href=options.href(),url=new URL(href);
    if(!origins.includes(url.origin)) return null;
    const page=publicPage(href); if(!page) return null;
    if(!attribution || Object.keys(campaigns).some(key=>url.searchParams.has('utm_'+key))) {
      attribution=Object.fromEntries(Object.entries(campaigns).map(([key,values])=>[key,pick(url.searchParams.get('utm_'+key),values)]));
    }
    return {...page,utm:{...attribution}};
  }
  function emit(event:Event, detail:Detail={}, deduplicate=false) {
    const page=context(); if(!page) return;
    const key=event+':'+JSON.stringify(detail); if(deduplicate && once.has(key)) return;
    if(deduplicate) once.add(key);
    const {fragment:_,...fields}=page;
    try { options.send({version:1,id:options.id(),event,...fields,referrer,detail}); emitted++; } catch { /* Analytics must not interrupt the website. */ }
  }
  function navigate() {
    const page=context(); if(!page) return;
    const key=JSON.stringify([page.page,page.locale,page.fragment,page.utm]);
    if(visit===key) return; visit=key; once.clear();
    emit('page_view',{},true);
    if(page.fragment) emit('shared_fragment_view',{fragment:page.fragment},true);
  }
  return {navigate, track(event:Event, detail:Detail) {
    navigate();
    if(event==='download_click' && ['header','hero','final_cta'].includes(String(detail.placement)) && ['button','google_play_badge'].includes(String(detail.variant)) && detail.destination==='google_play') emit(event,{placement:detail.placement,variant:detail.variant,destination:'google_play'});
    if(event==='gallery_interaction' && memoryIds.includes(String(detail.fragment)) && detail.interaction_type==='audio_start' && ['real_memories','coming_soon_fragments'].includes(String(detail.gallery))) emit(event,{fragment:detail.fragment,interaction_type:'audio_start',gallery:detail.gallery},true);
  }};
}
let tracker:ReturnType<typeof createWebsiteTracker>|undefined;
function currentTracker() {
  if(typeof window==='undefined') return undefined;
  return tracker ??= createWebsiteTracker({href:()=>window.location.href,referrer:document.referrer,allowed:()=>navigator.doNotTrack!=='1' && !(navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl,id:()=>crypto.randomUUID(),send:payload=>{void fetch(SITE_EVENT_ENDPOINT,{method:'POST',mode:'cors',credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',keepalive:true,headers:{'Content-Type':'text/plain'},body:JSON.stringify(payload)}).catch(()=>{});}});
}
export function recordWebsiteVisit() {currentTracker()?.navigate();}
export function recordWebsiteEvent(event:Event, detail:Detail) {currentTracker()?.track(event,detail);}
