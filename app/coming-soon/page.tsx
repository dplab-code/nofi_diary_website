import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FragmentAudio } from "./FragmentAudio";
import { comingSoonCopy, fragments } from "./content";
import styles from "./coming-soon.module.css";
import { isComingSoon } from "@/lib/coming-soon";
import { isLocale, localeNames, localePath, locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "NoFi Diary — Keep what mattered. Coming soon." },
  description: "Small fragments of real memories, kept privately and offline with NoFi Diary. Coming soon on Android.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { title: "NoFi Diary — Keep what mattered.", description: "Coming soon. No cloud. No feed. No noise.", type: "website", url: "/", images: [{ url: "/memories/images/fuori-strada-render.png", alt: "A real memory composed in NoFi Diary" }] },
  twitter: { card: "summary_large_image", title: "NoFi Diary — Keep what mattered.", description: "Coming soon. No cloud. No feed. No noise.", images: ["/memories/images/fuori-strada-render.png"] },
};

function localeFrom(value: string | string[] | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && isLocale(candidate) ? candidate : "en";
}

export default async function ComingSoonPage({ searchParams }: { searchParams: Promise<{ locale?: string | string[] }> }) {
  if (!isComingSoon) redirect("/");
  const locale = localeFrom((await searchParams).locale);
  const copy = comingSoonCopy[locale];
  return <main className={styles.page}>
    <header className={styles.header}>
      <Link className={styles.brand} href={localePath(locale)} aria-label="NoFi Diary — Home"><Image src="/images/nofi-logo.png" alt="" width={52} height={52} priority /><span>NoFi Diary</span></Link>
      <nav className={styles.primaryNav} aria-label={copy.navigation}><a href="#fragments">{copy.fragmentsLink}</a><Link className={styles.privacyLink} href={localePath(locale, "/privacy")}>{copy.privacy}</Link></nav>
      <nav className={styles.languages} aria-label={copy.languageLabel}>{locales.map(item => <Link key={item} href={localePath(item)} aria-current={item === locale ? "page" : undefined} hrefLang={item}>{localeNames[item]}</Link>)}</nav>
    </header>
    <section className={styles.hero} aria-labelledby="coming-soon-title">
      <div className={styles.heroCopy}><p className={styles.eyebrow}>NoFi Diary · Android</p><h1 id="coming-soon-title">Keep what mattered.</h1><p className={styles.status}>{copy.comingSoon}</p><p className={styles.promise}>{copy.promise}</p><a className={styles.discover} href="#fragments">{copy.discover}<span aria-hidden="true">↓</span></a></div>
      <div className={styles.heroObject} aria-hidden="true"><span className={styles.heroTape} /><figure className={styles.heroPhoto}><Image src="/memories/images/fuori-strada-render.png" alt="" fill priority sizes="(max-width: 760px) 86vw, 42vw" /></figure><p className={styles.heroNote}>{copy.heroNote}</p><div className={styles.stamp}><span>NOFI</span><b>NOT QUITE<br />HERE YET</b></div></div>
    </section>
    <section id="fragments" className={styles.fragments} aria-labelledby="fragments-title">
      <header className={styles.sectionIntro}><p>{copy.foundLabel}</p><h2 id="fragments-title">{copy.foundTitle}</h2><span>{copy.foundIntro}</span></header>
      <div className={styles.fragmentList}>{fragments.map((fragment, index) => { const localized = fragment.copy[locale]; return <article className={`${styles.fragment} ${styles[`fragment${index + 1}`]}`} key={fragment.id}><div className={styles.fragmentImage}><Image src={fragment.image} alt={localized.alt} fill sizes="(max-width: 760px) 92vw, 48vw" /></div><div className={styles.fragmentPaper}><p className={styles.fragmentNumber}>{copy.fragment} {fragment.id}</p><h3>{localized.title}</h3>{localized.text.map(line => <p key={line}>{line}</p>)}{fragment.audio && <FragmentAudio src={fragment.audio} duration={fragment.duration ?? 0} labels={{ play: copy.play, pause: copy.pause, timeline: copy.timeline }} fragment={fragment.slug} />}</div></article>; })}<div className={styles.nextFragment} aria-label={copy.moreSoon}><span>004</span><p>{copy.moreSoon}</p></div></div>
    </section>
    <aside className={styles.foundNote} aria-label={copy.privateTitle}><p>{copy.privateTitle}</p><span>{copy.privateBody}</span></aside>
    <footer className={styles.footer}><div><strong>NoFi Diary</strong><p>{copy.footerLine}</p></div><Link className={styles.footerPrivacy} href={localePath(locale, "/privacy")}>{copy.privacy}</Link><span>© 2026 NoFi Diary</span></footer>
  </main>;
}
