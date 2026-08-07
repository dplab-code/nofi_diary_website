import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { copy, Locale, localePath } from "@/lib/i18n";

const playUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy(locale);
  return <main>
    <SiteHeader locale={locale} nav={t.nav} />
    <section className="hero" id="top"><div className="shell heroGrid">
      <div className="heroCopy"><p className="kicker">Private by design · Offline-first</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroLead}</p><div className="actions"><a className="playBadge" href={playUrl}><span className="playTriangle">▶</span><span><small>GET IT ON</small>Google Play</span></a><Link className="button outline" href="#how">{t.seeHow}</Link></div><p className="micro">♡ {t.micro}</p></div>
      <figure className="heroVisual"><Image src="/images/editorial/hero-diary.png" alt="An open handmade diary beside a private journal app" fill priority sizes="(max-width: 900px) 100vw, 58vw" /></figure>
    </div></section>

    <section className="statement"><h2>{t.statement}</h2><p>{t.statementSub}</p></section>

    <section className="manifestoPreview"><div className="shell manifestoPreviewInner"><p className="kicker">{t.manifestoLabel}</p><h2>{t.manifestoTitle}</h2><p>{t.manifestoCopy}</p><Link className="textLink" href={localePath(locale, "/manifesto")}>{t.readManifesto} <span>→</span></Link></div></section>

    <section id="features" className="section shell"><div className="sectionHeading"><p className="kicker">Capture · Create · Keep</p><h2>{t.featureTitle}</h2></div><div className="threeGrid featureGrid">{t.features.map(([title, body], i) => <article className="featureCard" key={title}><div className={`featureVisual featureVisual${i}`}><Image src="/images/editorial/feature-journey.png" alt="" fill sizes="(max-width: 1050px) 90vw, 33vw" /></div><h3>{title}</h3><p>{body}</p></article>)}</div></section>

    <section className="section memoryBand"><div className="shell"><div className="sectionHeading"><h2>{t.memoryTitle}</h2></div><div className="fourGrid memoryGrid">{t.memories.map(([title, body], i) => <article key={title}><div className={`memoryCrop crop${i}`}><Image src="/images/editorial/memory-system.png" alt="" fill sizes="(max-width: 700px) 90vw, 25vw" /></div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section id="how" className="section howSection"><div className="shell"><div className="sectionHeading"><p className="kicker">Four quiet steps</p><h2>{t.howTitle}</h2></div><div className="fourGrid steps">{t.steps.map((step, i) => <article key={step}><span>0{i + 1}</span><div className={`stepObject stepVisual${i}`}><Image src="/images/editorial/how-it-works.png" alt="" fill sizes="(max-width: 700px) 70vw, 25vw" /></div><h3>{step}</h3></article>)}</div></div></section>

    <section className="capsuleBanner"><Image src="/images/editorial/time-capsule.png" alt="A sealed paper time capsule with lavender" fill sizes="100vw" /><div className="shell capsuleCopy"><p className="kicker">Time Capsules</p><h2>{t.capsuleTitle}</h2><p>{t.capsuleCopy}</p><Link className="button outline" href="#faq">Discover Time Capsules</Link></div></section>

    <section id="collections" className="section shell"><div className="sectionHeading"><p className="kicker">Optional creative collections</p><h2>{t.collectionsTitle}</h2><p>{t.collectionsCopy}</p></div><div className="threeGrid collectionGrid">{t.collectionCards.map(([title, body], i) => <article key={title}><div className={`collectionVisual collection${i}`}><Image src="/images/editorial/gallery-pages.png" alt="" fill sizes="33vw" /></div><h3>{title}</h3><p>{body}</p><span className="textLink">Explore →</span></article>)}</div></section>

    <section id="privacy" className="section privacySection"><div className="shell"><div className="sectionHeading"><p className="kicker">Privacy & ownership</p><h2>{t.privacyTitle}</h2><p>{t.privacyCopy}</p></div><div className="fourGrid privacyGrid">{t.privacyItems.map(([title, body], i) => <article key={title}><span className="privacyIcon">{["♙", "◌", "▣", "⇥"][i]}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section id="gallery" className="section shell gallerySection"><div className="sectionHeading left"><p className="kicker">A few quiet moments</p><h2>{t.galleryTitle}</h2></div><div className="galleryVisual"><Image src="/images/editorial/gallery-pages.png" alt="A collection of tactile diary pages with photographs and pressed flowers" fill sizes="100vw" /></div></section>

    <section className="section compareSection"><div className="shell compareGrid"><div><p className="kicker">A different kind of app</p><h2>{t.compareTitle}</h2><div className="comparePhoto"><Image src="/images/editorial/gallery-pages.png" alt="" fill sizes="35vw" /></div></div><div className="compareTable"><div className="compareRow head"><b>{t.typical}</b><b>{t.nofi}</b></div>{t.comparison.map(([a,b]) => <div className="compareRow" key={a}><span>{a}</span><span>{b}</span></div>)}</div></div></section>

    <section id="faq" className="section shell faqGrid"><div><p className="kicker">Questions</p><h2>{t.faqTitle}</h2></div><div className="faqList">{t.faqs.map(([q,a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>
    <section className="finalCta"><div className="shell"><p className="kicker">Start privately</p><h2>{t.finalTitle}</h2><p>{t.finalCopy}</p><a className="button light" href={playUrl}>{t.getApp}</a></div></section>
    <SiteFooter locale={locale} text={t.footer} nav={t.nav} />
  </main>;
}
