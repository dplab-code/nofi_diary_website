import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { exploreCopy, type ExplorePageId } from "@/content/explore";
import { copy, localePath, locales, type Locale } from "@/lib/i18n";

const playUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";
const imageFor: Record<ExplorePageId,string> = { "time-capsules":"time-capsule.png", stickers:"collection-stickers.png", themes:"collection-themes.png", appearances:"collection-appearances.png" };

export function exploreMetadata(locale: Locale, page: ExplorePageId): Metadata {
  const t = exploreCopy(locale); const item = page === "time-capsules" ? t.timeCapsules : t[page];
  const url = localePath(locale, `/${page}`);
  return { title:item.title, description:item.description, alternates:{canonical:url,languages:Object.fromEntries(locales.map(l=>[l,localePath(l,`/${page}`)]))}, openGraph:{title:`${item.title} — NoFi Diary`,description:item.description,url,type:"website",images:[{url:`/images/editorial/${imageFor[page]}`,alt:item.title}]} };
}

function EditorialHero({ label, title, subtitle, image, imageAlt, cta }: { label:string; title:string; subtitle:string; image:string; imageAlt:string; cta?:string }) {
  return <section className="exploreHero"><div className="exploreHeroCopy"><p className="kicker">{label}</p><h1>{title}</h1><p>{subtitle}</p>{cta && <a className="button outline" href={playUrl}>{cta}</a>}</div><figure className="exploreHeroVisual"><Image src={`/images/editorial/${image}`} alt={imageAlt} fill priority loading="eager" sizes="(max-width: 900px) 100vw, 55vw" /></figure></section>;
}
function FinalCTA({ title, action }: { title:string; action:string }) { return <section className="exploreFinal"><div><span aria-hidden="true">♡</span><h2>{title}</h2><a className="button light" href={playUrl}>{action}</a></div></section>; }

function TimeCapsules({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.timeCapsules; return <>
  <EditorialHero label="Time Capsules" title={p.title} subtitle={p.subtitle} image="time-capsule.png" imageAlt="A handmade envelope sealed with wax beside lavender" cta={p.cta}/>
  <section className="timeJourney section"><div className="shell"><div className="timeLine" aria-hidden="true"/><div className="timeStates">{p.phases.map(([title,body],i)=><article key={title}><div className={`timeObject timeObject${i}`}><Image src={`/images/editorial/${["memory-page-cutout.png","memory-capsule-cutout.png","memory-diary-cutout.png"][i]}`} alt="" fill sizes="(max-width:700px) 75vw, 30vw" /></div><p className="kicker">{title}</p><h2>{body}</h2></article>)}</div></div></section>
  <section className="futureSection section"><div className="shell futureLayout"><div><p className="kicker">For another day</p><h2>{p.futureTitle}</h2></div><div className="futureDates">{p.uses.map((use,i)=><p key={use}><span>0{i+1}</span>{use}</p>)}</div></div></section>
  <section className="capsulePrivacy"><div className="shell"><p className="kicker">{t.common.privacy}</p><h2>{p.privacyTitle}</h2><p>{p.privacyBody}</p></div></section>
  <aside className="worthKnowing shell"><p className="kicker">{t.common.worth}</p><p>{p.warning}</p></aside><FinalCTA title={p.finalTitle} action={p.cta}/>
  </>; }

function Stickers({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.stickers; return <>
  <EditorialHero label="Sticker Packs" title={p.title} subtitle={p.subtitle} image="collection-stickers.png" imageAlt="A tactile diary page surrounded by paper stickers"/>
  <section className="stickerManifesto section shell"><div className="stickerWords" aria-hidden="true"><span>♡</span><span>→</span><span>✦</span></div><div><p className="kicker">Expression, not decoration</p><h2>{p.vocabularyTitle}</h2><p>{p.vocabularyBody}</p></div></section>
  <section className="stickerEntries section"><article className="stickerEntry shell"><figure><Image src="/images/editorial/collection-stickers.png" alt="Starter Doodles sticker sheet arranged around a diary page" fill sizes="(max-width:900px) 100vw, 58vw"/></figure><div><p className="kicker">{t.common.included}</p><h2>Starter Doodles</h2><p>{p.starterCopy}</p></div></article><article className="stickerEntry stickerEntryReverse shell"><div><p className="kicker">{t.common.coming}</p><h2>Rainy Window</h2><p>{p.rainyCopy}</p></div><figure className="comingVisual"><Image src="/images/editorial/collection-stickers.png" alt="Editorial placeholder for the planned Rainy Window sticker pack" fill sizes="(max-width:900px) 100vw, 50vw"/></figure></article></section>
  <section className="stickerCompare section shell"><div className="sectionHeading"><h2>{p.compareTitle}</h2><p>{p.compareBody}</p></div><div className="stickerPages"><figure><Image src="/images/editorial/memory-page.png" alt="A quiet diary page before personal marks" fill sizes="50vw"/><figcaption>{p.neutral}</figcaption></figure><figure><Image src="/images/editorial/collection-stickers.png" alt="A diary page surrounded by personal visual marks" fill sizes="50vw"/><figcaption>{p.marked}</figcaption></figure></div></section><FinalCTA title={p.finalTitle} action={p.finalTitle}/>
  </>; }

function Themes({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.themes; return <>
  <EditorialHero label="Themes" title={p.title} subtitle={p.subtitle} image="collection-themes.png" imageAlt="The same seaside memory presented on three tactile diary papers"/>
  <section className="themeStatement"><div className="shell"><h2>{p.keyTitle}</h2></div></section>
  <section className="themeComparison section shell"><article><div className="themeFrame original"><Image src="/images/editorial/collection-themes.png" alt="Seaside memory on Original Paper" fill sizes="50vw"/></div><p className="kicker">{t.common.included}</p><h2>Original Paper</h2><p>{p.originalCopy}</p></article><article><div className="themeFrame summer"><Image src="/images/editorial/collection-themes.png" alt="Editorial preview of the planned Old Summer Film theme" fill sizes="50vw"/></div><p className="kicker">{t.common.coming}</p><h2>Old Summer Film</h2><p>{p.summerCopy}</p></article></section>
  <section className="themeClarify section"><div className="shell clarifyGrid"><div><p className="kicker">A clear boundary</p><h2>{p.clarifyTitle}</h2><p>{p.clarifyBody}</p></div><ul>{p.unchanged.map(item=><li key={item}>{item}<span>—</span></li>)}</ul></div></section><FinalCTA title={p.finalTitle} action={p.cta}/>
  </>; }

function Appearances({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.appearances; return <>
  <EditorialHero label="Appearances" title={p.title} subtitle={p.subtitle} image="collection-appearances.png" imageAlt="Three interface appearance previews showing the same memory"/>
  <section className="appearanceStatement section shell"><h2>{p.keyTitle}</h2></section>
  <section className="appearanceDifference section"><div className="shell differenceBook"><article><p className="kicker">01</p><h2>{p.theme}</h2><ul>{p.themeItems.map(x=><li key={x}>{x}</li>)}</ul></article><article><p className="kicker">02</p><h2>{p.appearance}</h2><ul>{p.appearanceItems.map(x=><li key={x}>{x}</li>)}</ul></article></div></section>
  <section className="appearanceEditions section shell"><article><div className="phoneCrop originalPhone"><Image src="/images/editorial/collection-appearances.png" alt="NoFi Original appearance preview" fill sizes="50vw"/></div><p className="kicker">{t.common.included}</p><h2>NoFi Original</h2><p>{p.originalCopy}</p></article><article><div className="phoneCrop lavenderPhone"><Image src="/images/editorial/collection-appearances.png" alt="Editorial preview of the planned Midnight Lavender appearance" fill sizes="50vw"/></div><p className="kicker">{t.common.coming}</p><h2>Midnight Lavender</h2><p>{p.lavenderCopy}</p></article></section>
  <section className="exportNote"><div className="shell"><h2>{p.exportTitle}</h2><p>{p.exportBody}</p><p className="readableNote">{p.readable}</p></div></section><FinalCTA title={p.finalTitle} action={p.finalTitle}/>
  </>; }

export function ExplorePage({ locale, page }: { locale:Locale; page:ExplorePageId }) { const site=copy(locale); return <main className={`explorePage explore-${page}`}><SiteHeader locale={locale} nav={site.nav} currentPath={`/${page}`}/>{page==="time-capsules"?<TimeCapsules locale={locale}/>:page==="stickers"?<Stickers locale={locale}/>:page==="themes"?<Themes locale={locale}/>:<Appearances locale={locale}/>}<SiteFooter locale={locale} text={site.footer} nav={site.nav}/></main>; }
