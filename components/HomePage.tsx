import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { copy, Locale, localePath } from "@/lib/i18n";

const playUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";
const memoryImages = ["memory-page-cutout.png", "memory-box-cutout.png", "memory-capsule-cutout.png", "memory-diary-cutout.png"];
const featureImages = ["feature-capture-cutout.png", "feature-create-cutout.png", "feature-keep-cutout.png"];

function GooglePlayIcon() {
  return <svg className="googlePlayIcon" viewBox="0 0 32 36" aria-hidden="true">
    <path fill="#00d6ff" d="M2.4 2.3A3.4 3.4 0 001 4.9v26.2c0 1 .5 2 1.4 2.6l15.2-15.8L2.4 2.3z" />
    <path fill="#ffcf3c" d="M22.5 12.8L17.6 18l4.9 5.1 6.2-3.5c1.7-.9 1.7-2.3 0-3.2l-6.2-3.6z" />
    <path fill="#ff5963" d="M2.4 33.7c.8.5 1.8.5 2.8 0l17.3-10.6-4.9-5.1L2.4 33.7z" />
    <path fill="#00e397" d="M2.4 2.3L17.6 18l4.9-5.2L5.2 2.3a2.8 2.8 0 00-2.8 0z" />
  </svg>;
}

function NoAccountIcon() {
  return <svg className="noAccountIcon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="10" cy="7.5" r="3.25" />
    <path d="M3.5 19c.55-4.05 2.7-6.1 6.5-6.1 1.05 0 1.96.16 2.74.49" />
    <path d="M15 15l5 5M20 15l-5 5" />
  </svg>;
}

function PrivacyIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    {index === 0 && <><circle cx="32" cy="21" r="8" /><path d="M17 50c1.5-10 6.5-15 15-15s13.5 5 15 15" /><path d="M13 13l38 38" /></>}
    {index === 1 && <><rect x="13" y="15" width="38" height="34" rx="4" /><path d="M20 24h24M20 32h17M20 40h11" /><path d="M43 37l8 8M51 37l-8 8" /></>}
    {index === 2 && <><rect x="21" y="9" width="22" height="46" rx="4" /><path d="M28 15h8M29 49h6" /><rect x="26" y="27" width="12" height="11" rx="2" /><path d="M29 27v-3a3 3 0 016 0v3" /></>}
    {index === 3 && <><path d="M17 35v13h30V35" /><path d="M32 42V13M23 22l9-9 9 9" /><path d="M22 53h20" /></>}
  </svg>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy(locale);
  return <main>
    <SiteHeader locale={locale} nav={t.nav} />
    <section className="hero" id="top"><div className="shell heroGrid">
      <div className="heroCopy"><p className="kicker">Private by design · Offline-first</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroLead}</p><div className="actions"><a className="playBadge" href={playUrl} aria-label="Get NoFi Diary on Google Play"><GooglePlayIcon /><span><small>GET IT ON</small><strong>Google Play</strong></span></a><Link className="button heroSecondary" href="#how">{t.seeHow}</Link></div><p className="micro heroAssurance"><NoAccountIcon /><span>{t.micro}</span></p></div>
      <figure className="heroVisual"><Image src="/images/editorial/hero-diary-cutout-v2.png" alt="An open handmade diary beside a private journal app" fill priority sizes="(max-width: 900px) 100vw, 62vw" /></figure>
    </div></section>

    <section className="statement"><h2>{t.statement}</h2><p>{t.statementSub}</p></section>

    <section className="manifestoPreview"><div className="shell manifestoPreviewInner"><p className="kicker">{t.manifestoLabel}</p><h2>{t.manifestoTitle}</h2><p>{t.manifestoCopy}</p><Link className="textLink" href={localePath(locale, "/manifesto")}>{t.readManifesto} <span>→</span></Link></div></section>

    <section id="features" className="section shell"><div className="sectionHeading"><p className="kicker">Capture · Create · Keep</p><h2>{t.featureTitle}</h2></div><div className="threeGrid featureGrid">{t.features.map(([title, body], i) => <article className="featureCard" key={title}><div className={`featureVisual featureVisual${i}`}><Image src={`/images/editorial/${featureImages[i]}`} alt="" fill sizes="(max-width: 1050px) 90vw, 33vw" /></div><h3>{title}</h3><p>{body}</p></article>)}</div></section>

    <section className="section memoryBand"><div className="shell memoryShell"><div className="sectionHeading"><h2>{t.memoryTitle}</h2></div><div className="memoryPath"><svg className="memoryThread" viewBox="0 0 1200 340" preserveAspectRatio="none" aria-hidden="true"><path d="M35 205 C170 205 240 70 430 100 S690 270 820 205 S1010 90 1165 135" /><circle cx="145" cy="174" r="4" /><circle cx="430" cy="100" r="4" /><circle cx="820" cy="205" r="4" /><circle cx="1080" cy="116" r="4" /></svg>{t.memories.map(([title, body], i) => <article className={`memoryItem memoryItem${i}`} key={title}><span className="memoryIndex">0{i + 1}</span><div className="memoryObject"><Image src={`/images/editorial/${memoryImages[i]}`} alt="" fill sizes="(max-width: 700px) 76vw, 25vw" /></div><div className="memoryNote"><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>

    <section id="how" className="section howSection"><div className="shell"><div className="sectionHeading"><p className="kicker">Four quiet steps</p><h2>{t.howTitle}</h2></div><div className="howExperience"><div className="howArtwork"><Image src="/images/editorial/how-it-works-composition.png" alt="A camera, voice recording, handmade diary page and sealed leather diary forming one creative journey" fill sizes="(max-width: 700px) 100vw, 78vw" /></div>{t.steps.map((step, i) => <article className={`howCallout howCallout${i}`} key={step}><span>0{i + 1}</span><h3>{step}</h3><i aria-hidden="true" /></article>)}</div></div></section>

    <section className="capsuleBanner"><Image src="/images/editorial/time-capsule.png" alt="A sealed paper time capsule with lavender" fill sizes="100vw" /><div className="shell capsuleCopy"><p className="kicker">Time Capsules</p><h2>{t.capsuleTitle}</h2><p>{t.capsuleCopy}</p><Link className="button outline" href={localePath(locale, "/time-capsules")}>Discover Time Capsules</Link></div></section>

    <section id="collections" className="section shell"><div className="sectionHeading"><p className="kicker">Optional creative collections</p><h2>{t.collectionsTitle}</h2><p>{t.collectionsCopy}</p></div><div className="threeGrid collectionGrid">{t.collectionCards.map(([title, body], i) => <article key={title}><div className="collectionVisual"><Image className="collectionCardImage" src={`/images/editorial/${["collection-stickers.png", "collection-themes.png", "collection-appearances.png"][i]}`} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div><h3>{title}</h3><p>{body}</p><Link className="textLink" href={localePath(locale, `/${["stickers","themes","appearances"][i]}`)}>Explore →</Link></article>)}</div></section>

    <section id="privacy" className="section privacySection"><div className="shell privacyEditorial"><figure className="privacyVisual"><Image src="/images/editorial/privacy-still-life.png" alt="" fill sizes="(max-width: 900px) 100vw, 48vw" /></figure><div className="privacyContent"><div className="sectionHeading left"><p className="kicker">Privacy & ownership</p><h2>{t.privacyTitle}</h2><p>{t.privacyCopy}</p></div><div className="privacyGrid">{t.privacyItems.map(([title, body], i) => <article key={title}><span className="privacyIcon"><PrivacyIcon index={i} /></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></div></section>

    <section id="gallery" className="section shell gallerySection"><div className="sectionHeading left"><p className="kicker">A few quiet moments</p><h2>{t.galleryTitle}</h2></div><div className="galleryVisual"><Image src="/images/editorial/gallery-pages-v2.png" alt="Nine open handmade diaries filled with photographs, paper keepsakes and pressed flowers" fill sizes="100vw" /></div></section>

    <section className="section compareSection"><div className="shell compareGrid"><div className="compareIntro"><p className="kicker">A different kind of app</p><h2>{t.compareTitle}</h2><div className="compareLogo"><Image src="/images/nofi-logo.png" alt="NoFi Diary" fill sizes="(max-width: 1050px) 280px, 24vw" /></div></div><div className="compareBook"><div className="comparePage comparePageTypical"><h3>{t.typical}</h3>{t.comparison.map(([a]) => <p key={a}><span className="compareMark compareMarkTypical" aria-hidden="true">×</span>{a}</p>)}</div><div className="comparePage comparePageNofi"><h3>{t.nofi}</h3>{t.comparison.map(([,b]) => <p key={b}><span className="compareMark compareMarkNofi" aria-hidden="true">✓</span>{b}</p>)}</div><span className="compareRibbon" aria-hidden="true" /></div></div></section>

    <section id="faq" className="section shell faqGrid"><div><p className="kicker">Questions</p><h2>{t.faqTitle}</h2></div><div className="faqList">{t.faqs.map(([q,a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>
    <section className="finalCta"><div className="shell"><p className="kicker">Start privately</p><h2>{t.finalTitle}</h2><p>{t.finalCopy}</p><a className="button light" href={playUrl}>{t.getApp}</a></div></section>
    <SiteFooter locale={locale} text={t.footer} nav={t.nav} />
  </main>;
}
