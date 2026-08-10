import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { exploreCopy, type ExplorePageId } from "@/content/explore";
import { copy, localePath, locales, type Locale } from "@/lib/i18n";

const playUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";
const imageFor: Record<ExplorePageId,string> = { "time-capsules":"/images/editorial/time-capsule.png", stickers:"/images/editorial/collection-stickers.png", themes:"/images/editorial/collection-themes.png", appearances:"/images/editorial/collection-appearances.png" };
const exploreUi: Record<Locale, { getApp:string; next:string; all:string; labels:Record<ExplorePageId,string>; expression:string; later:string; boundary:string }> = {
  en:{getApp:"Get NoFi on Google Play",next:"Continue exploring",all:"All creative collections",labels:{"time-capsules":"Time Capsules",stickers:"Sticker Packs",themes:"Themes",appearances:"Appearances"},expression:"Expression, not decoration",later:"For another day",boundary:"A clear boundary"},
  it:{getApp:"Scarica NoFi da Google Play",next:"Continua a esplorare",all:"Tutte le collezioni creative",labels:{"time-capsules":"Time Capsules",stickers:"Sticker Pack",themes:"Temi",appearances:"Aspetti"},expression:"Espressione, non decorazione",later:"Per un altro giorno",boundary:"Un confine chiaro"},
  fr:{getApp:"Télécharger NoFi sur Google Play",next:"Continuer l’exploration",all:"Toutes les collections créatives",labels:{"time-capsules":"Capsules temporelles",stickers:"Packs de stickers",themes:"Thèmes",appearances:"Apparences"},expression:"Expression, pas décoration",later:"Pour un autre jour",boundary:"Une frontière claire"},
  es:{getApp:"Descargar NoFi en Google Play",next:"Seguir explorando",all:"Todas las colecciones creativas",labels:{"time-capsules":"Cápsulas del tiempo",stickers:"Packs de stickers",themes:"Temas",appearances:"Apariencias"},expression:"Expresión, no decoración",later:"Para otro día",boundary:"Un límite claro"},
  de:{getApp:"NoFi bei Google Play laden",next:"Weiter entdecken",all:"Alle kreativen Sammlungen",labels:{"time-capsules":"Zeitkapseln",stickers:"Sticker-Pakete",themes:"Themes",appearances:"Erscheinungsbilder"},expression:"Ausdruck statt Dekoration",later:"Für einen anderen Tag",boundary:"Eine klare Grenze"},
};
const stickerExamples: Record<Locale,{label:string;nature:string;stars:string}> = {
  en:{label:"Inside the sticker library",nature:"Leaves, flowers and quiet botanical details for memories rooted in a place.",stars:"Moons, constellations and small celestial signs for nights, wishes and distant thoughts."},
  it:{label:"Dentro la libreria di sticker",nature:"Foglie, fiori e dettagli botanici per i ricordi legati a un luogo.",stars:"Lune, costellazioni e piccoli segni celesti per notti, desideri e pensieri lontani."},
  fr:{label:"Dans la bibliothèque de stickers",nature:"Feuilles, fleurs et détails botaniques pour les souvenirs ancrés dans un lieu.",stars:"Lunes, constellations et petits signes célestes pour les nuits, les souhaits et les pensées lointaines."},
  es:{label:"Dentro de la biblioteca de stickers",nature:"Hojas, flores y detalles botánicos para recuerdos ligados a un lugar.",stars:"Lunas, constelaciones y pequeñas señales celestes para noches, deseos y pensamientos lejanos."},
  de:{label:"In der Sticker-Bibliothek",nature:"Blätter, Blumen und stille botanische Details für Erinnerungen, die mit einem Ort verbunden sind.",stars:"Monde, Sternbilder und kleine Himmelszeichen für Nächte, Wünsche und ferne Gedanken."}
};
const themeEditions: Record<Locale,{summerTitle:string;summerCopy:string}> = {
  en:{summerTitle:"Salt & Sunlight",summerCopy:"Warm paper, sea-washed colour and sun-softened details—for memories that still carry the shore."},
  it:{summerTitle:"Sale e luce",summerCopy:"Carta calda, colori lavati dal mare e dettagli addolciti dal sole—per ricordi che portano ancora con sé la riva."},
  fr:{summerTitle:"Sel et lumière",summerCopy:"Papier chaud, couleurs lavées par la mer et détails adoucis par le soleil—pour les souvenirs qui portent encore le rivage."},
  es:{summerTitle:"Sal y luz",summerCopy:"Papel cálido, colores lavados por el mar y detalles suavizados por el sol—para recuerdos que aún llevan la orilla consigo."},
  de:{summerTitle:"Salz & Sonnenlicht",summerCopy:"Warmes Papier, meeresweiche Farben und sonnensanfte Details—für Erinnerungen, die noch die Küste in sich tragen."}
};
const timeEvidenceCopy: Record<Locale,string> = {
  en:"Choose tomorrow, next month, next year—or a date that belongs only to you.",
  it:"Scegli domani, il mese prossimo, il prossimo anno—o una data che appartiene soltanto a te.",
  fr:"Choisissez demain, le mois prochain, l’année prochaine—ou une date qui n’appartient qu’à vous.",
  es:"Elige mañana, el próximo mes, el próximo año—o una fecha que solo te pertenezca a ti.",
  de:"Wähle morgen, nächsten Monat, nächstes Jahr—oder ein Datum, das nur dir gehört."
};

export function exploreMetadata(locale: Locale, page: ExplorePageId): Metadata {
  const t = exploreCopy(locale); const item = page === "time-capsules" ? t.timeCapsules : t[page];
  const url = localePath(locale, `/${page}`);
  return { title:item.title, description:item.description, alternates:{canonical:url,languages:Object.fromEntries(locales.map(l=>[l,localePath(l,`/${page}`)]))}, openGraph:{title:`${item.title} — NoFi Diary`,description:item.description,url,type:"website",images:[{url:imageFor[page],alt:item.title}]} };
}

function EditorialHero({ label, title, subtitle, image, imageAlt, cta }: { label:string; title:string; subtitle:string; image:string; imageAlt:string; cta?:string }) {
  return <section className="exploreHero"><div className="exploreHeroCopy"><p className="kicker">{label}</p><h1>{title}</h1><p>{subtitle}</p>{cta && <a className="button outline" href={playUrl}>{cta}</a>}</div><figure className="exploreHeroVisual"><Image src={image} alt={imageAlt} fill priority loading="eager" sizes="(max-width: 900px) 100vw, 55vw" /></figure></section>;
}
function RelatedPages({locale,page}:{locale:Locale;page:ExplorePageId}) { const ui=exploreUi[locale]; const order:ExplorePageId[]=["time-capsules","stickers","themes","appearances"]; const related=order.filter(item=>item!==page).slice(0,3); return <nav className="exploreRelated shell" aria-label={ui.next}><p className="kicker">{ui.next}</p><div>{related.map(item=><Link key={item} href={localePath(locale,`/${item}`)}><span>{ui.labels[item]}</span><b aria-hidden="true">→</b></Link>)}</div><Link className="textLink" href={`${localePath(locale)}#collections`}>{ui.all}</Link></nav>; }
function FinalCTA({ title, locale }: { title:string; locale:Locale }) { return <section className="exploreFinal"><div><span aria-hidden="true">♡</span><h2>{title}</h2><a className="button light" href={playUrl}>{exploreUi[locale].getApp}</a></div></section>; }
function TimePhaseIcon({index}:{index:number}) { const common={fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round" as const,strokeLinejoin:"round" as const}; return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>{index===0?<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>:index===1?<><rect x="6" y="10" width="12" height="10" rx="2"/><path d="M8.5 10V7.5a3.5 3.5 0 017 0V10M12 14v2.5"/></>:<><path d="M7 3h10M7 21h10M8 3c0 4 1.4 6.2 4 9-2.6 2.8-4 5-4 9M16 3c0 4-1.4 6.2-4 9 2.6 2.8 4 5 4 9"/></>}</svg>; }

function TimeCapsules({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.timeCapsules,ui=exploreUi[locale]; return <>
  <EditorialHero label={ui.labels["time-capsules"]} title={p.title} subtitle={p.subtitle} image={imageFor["time-capsules"]} imageAlt="A handmade envelope sealed with wax beside lavender" cta={ui.getApp}/>
  <section className="timeJourney section"><div className="shell"><div className="timeLine" aria-hidden="true"/><div className="timeStates">{p.phases.map(([title,body],i)=><article key={title}><div className={`timeObject timeObject${i}`}><Image src="/images/editorial/memory-page-cutout.png" alt="" fill sizes="(max-width:700px) 75vw, 30vw" /><span className="timeSeal" aria-hidden="true"><TimePhaseIcon index={i}/></span></div><p className="kicker">{title}</p><h2>{body}</h2></article>)}</div></div></section>
  <section className="futureSection section"><div className="shell futureLayout"><div><p className="kicker">{ui.later}</p><h2>{p.futureTitle}</h2></div><div className="futureDates">{p.uses.map((use,i)=><p key={use}><span>0{i+1}</span>{use}</p>)}</div></div></section>
  <section className="capsulePrivacy"><div className="shell"><p className="kicker">{t.common.privacy}</p><h2>{p.privacyTitle}</h2><p>{p.privacyBody}</p></div></section>
  <section className="appEvidence section shell"><div><p className="kicker">{ui.labels["time-capsules"]}</p><h2>{p.futureTitle}</h2><p>{timeEvidenceCopy[locale]}</p></div><div className="androidScreen"><Image src="/images/app/time-capsule-nofi.png" alt="A NoFi memory prepared as a private Time Capsule" fill sizes="(max-width:700px) 78vw, 30vw" /></div></section>
  <aside className="worthKnowing shell"><p className="kicker">{t.common.worth}</p><p>{p.warning}</p></aside><RelatedPages locale={locale} page="time-capsules"/><FinalCTA title={p.finalTitle} locale={locale}/>
  </>; }

function Stickers({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.stickers,ui=exploreUi[locale],examples=stickerExamples[locale]; return <>
  <EditorialHero label={ui.labels.stickers} title={p.title} subtitle={p.subtitle} image={imageFor.stickers} imageAlt="A tactile diary page surrounded by paper stickers" cta={ui.getApp}/>
  <section className="stickerManifesto section"><div className="shell stickerManifestoInner"><div className="stickerVocabulary" aria-hidden="true"><span>♡</span><span>↗</span><span>✦</span><span>☾</span><span>✿</span><span>≈</span><i/><i/><i/></div><div className="stickerManifestoCopy"><p className="kicker">{ui.expression}</p><h2>{p.vocabularyTitle}</h2><p>{p.vocabularyBody}</p><div className="stickerRule" aria-hidden="true"><span/><b>✦</b><span/></div></div></div></section>
  <section className="stickerExamples section shell"><article><div className="stickerShowcase natureShowcase"><span className="paperTab" aria-hidden="true"/><div className="stickerLibraryCrop"><Image src="/images/app/stickers-nature.jpeg" alt="Nature sticker collection shown in NoFi Diary" fill sizes="(max-width:700px) 92vw, 42vw"/></div><i aria-hidden="true">✿</i></div><p className="kicker">{examples.label}</p><h2>Nature</h2><p>{examples.nature}</p></article><article><div className="stickerShowcase starsShowcase"><span className="paperTab" aria-hidden="true"/><div className="stickerLibraryCrop"><Image src="/images/app/stickers-stars.jpeg" alt="Stars sticker collection shown in NoFi Diary" fill sizes="(max-width:700px) 92vw, 42vw"/></div><i aria-hidden="true">✦</i></div><p className="kicker">{examples.label}</p><h2>Stars</h2><p>{examples.stars}</p></article></section>
  <section className="stickerCompare section shell"><div className="sectionHeading"><h2>{p.compareTitle}</h2><p>{p.compareBody}</p></div><div className="stickerPages"><figure><Image src="/images/editorial/memory-page-photo-only.png" alt="A diary page with only a photograph attached by paper tape" fill sizes="50vw"/><figcaption>{p.neutral}</figcaption></figure><figure><Image src="/images/editorial/memory-page-stickered.png" alt="The same diary page enriched with personal visual marks" fill sizes="50vw"/><figcaption>{p.marked}</figcaption></figure></div></section><section className="appEvidence appEvidenceReverse section shell"><div><p className="kicker">{ui.labels.stickers}</p><h2>{p.vocabularyTitle}</h2><p>{p.vocabularyBody}</p></div><div className="androidScreen"><Image src="/images/app/stickers-nofi.png" alt="A curated NoFi sticker library beside a personal memory preview" fill sizes="(max-width:700px) 78vw, 30vw" /></div></section><RelatedPages locale={locale} page="stickers"/><FinalCTA title={p.finalTitle} locale={locale}/>
  </>; }

function Themes({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.themes,ui=exploreUi[locale],editions=themeEditions[locale]; return <>
  <EditorialHero label={ui.labels.themes} title={p.title} subtitle={p.subtitle} image={imageFor.themes} imageAlt="The same seaside memory presented on three tactile diary papers" cta={ui.getApp}/>
  <section className="themeStatement"><div className="shell"><h2>{p.keyTitle}</h2></div></section>
  <section className="themeComparison section shell"><article><div className="phoneCrop productScreenshot"><Image src="/images/app/theme-original.jpeg" alt="Original Paper theme shown in NoFi Diary on Android" fill sizes="(max-width:700px) 82vw, 32vw"/></div><p className="kicker">{t.common.included}</p><h2>Original Paper</h2><p>{p.originalCopy}</p></article><article><div className="phoneCrop productScreenshot"><Image src="/images/app/theme-old-summer.jpeg" alt={`${editions.summerTitle} theme shown in NoFi Diary on Android`} fill sizes="(max-width:700px) 82vw, 32vw"/></div><p className="kicker">{t.common.coming}</p><h2>{editions.summerTitle}</h2><p>{editions.summerCopy}</p></article></section>
  <section className="themeClarify section"><div className="shell clarifyGrid"><div><p className="kicker">{ui.boundary}</p><h2>{p.clarifyTitle}</h2><p>{p.clarifyBody}</p></div><ul>{p.unchanged.map(item=><li key={item}>{item}<span>—</span></li>)}</ul></div></section><RelatedPages locale={locale} page="themes"/><FinalCTA title={p.finalTitle} locale={locale}/>
  </>; }

function Appearances({ locale }: { locale:Locale }) { const t=exploreCopy(locale),p=t.appearances,ui=exploreUi[locale]; return <>
  <EditorialHero label={ui.labels.appearances} title={p.title} subtitle={p.subtitle} image={imageFor.appearances} imageAlt="Three interface appearance previews showing the same memory" cta={ui.getApp}/>
  <section className="appearanceStatement section shell"><h2>{p.keyTitle}</h2></section>
  <section className="appearanceDifference section"><div className="shell differenceBook"><article className="differenceTheme"><div className="differenceVisual" aria-hidden="true"><span className="memorySheet"><i/><i/><i/></span></div><p className="kicker">01</p><h2>{p.theme}</h2><ul>{p.themeItems.map(x=><li key={x}>{x}</li>)}</ul></article><article className="differenceAppearance"><div className="differenceVisual" aria-hidden="true"><span className="appShell"><i/><i/><i/><b/></span></div><p className="kicker">02</p><h2>{p.appearance}</h2><ul>{p.appearanceItems.map(x=><li key={x}>{x}</li>)}</ul></article></div></section>
  <section className="appearanceEditions section shell"><article><div className="phoneCrop productScreenshot"><Image src="/images/app/appearance-home.jpeg" alt="NoFi Diary with the Ocean Memories appearance on Android" fill sizes="(max-width:700px) 78vw, 32vw"/></div><p className="kicker">{t.common.included}</p><h2>Ocean Memories</h2><p>{p.subtitle}</p></article><article><div className="phoneCrop productScreenshot"><Image src="/images/app/appearance-selector.jpeg" alt="The NoFi appearance selector on Android" fill sizes="(max-width:700px) 78vw, 32vw"/></div><p className="kicker">{t.common.included}</p><h2>{ui.labels.appearances}</h2><p>{p.readable}</p></article></section>
  <section className="exportNote"><div className="shell"><h2>{p.exportTitle}</h2><p>{p.exportBody}</p><p className="readableNote">{p.readable}</p></div></section><RelatedPages locale={locale} page="appearances"/><FinalCTA title={p.finalTitle} locale={locale}/>
  </>; }

export function ExplorePage({ locale, page }: { locale:Locale; page:ExplorePageId }) { const site=copy(locale); return <main className={`explorePage explore-${page}`}><SiteHeader locale={locale} nav={site.nav} currentPath={`/${page}`}/>{page==="time-capsules"?<TimeCapsules locale={locale}/>:page==="stickers"?<Stickers locale={locale}/>:page==="themes"?<Themes locale={locale}/>:<Appearances locale={locale}/>}<SiteFooter locale={locale} text={site.footer} nav={site.nav}/></main>; }
