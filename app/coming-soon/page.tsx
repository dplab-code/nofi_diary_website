import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FragmentAudio } from "./FragmentAudio";
import { comingSoonCopy, fragments } from "./content";
import styles from "./coming-soon.module.css";
import { isComingSoon } from "@/lib/coming-soon";
import { isLocale, localeNames, localePath, locales, type Locale } from "@/lib/i18n";

function localeFrom(value: string | string[] | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && isLocale(candidate) ? candidate : "en";
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ locale?: string | string[] }> }): Promise<Metadata> {
  const locale = localeFrom((await searchParams).locale);
  const copy = comingSoonCopy[locale];
  const canonical = localePath(locale);
  const languages = Object.fromEntries(locales.map(item => [item, localePath(item)]));
  return {
    title: { absolute: copy.metaTitle }, description: copy.metaDescription,
    alternates: { canonical, languages: { ...languages, "x-default": "/" } },
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: { title: copy.metaTitle, description: copy.socialDescription, type: "website", url: canonical, images: [{ url: "/images/coming-soon/hero-memory.webp", alt: copy.socialImageAlt }] },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.socialDescription, images: ["/images/coming-soon/hero-memory.webp"] },
  };
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
      <div className={styles.heroCopy}><p className={styles.eyebrow}>NoFi Diary · Android</p><h1 id="coming-soon-title">{copy.heroTitle}</h1><p className={styles.status}>{copy.comingSoon}</p><p className={styles.promise}>{copy.promise}</p><a className={styles.discover} href="#fragments">{copy.discover}<span aria-hidden="true">↓</span></a></div>
      <div className={styles.heroObject} aria-hidden="true"><figure className={styles.heroPhoto}><Image src="/images/coming-soon/hero-memory.webp" alt="" fill priority sizes="(max-width: 760px) 96vw, 48vw" /></figure><p className={styles.heroNote}>{copy.heroNote}</p><div className={styles.stamp}><span>NOFI</span><b>{copy.stamp[0]}<br />{copy.stamp[1]}</b></div></div>
    </section>
    <section id="fragments" className={styles.fragments} aria-labelledby="fragments-title">
      <header className={styles.sectionIntro}><p>{copy.foundLabel}</p><h2 id="fragments-title">{copy.foundTitle}</h2><span>{copy.foundIntro}</span></header>
      <div className={styles.fragmentList}>{fragments.map((fragment, index) => { const localized = fragment.copy[locale]; return <article className={`${styles.fragment} ${styles[`fragment${index + 1}`]}`} key={fragment.id}><div className={styles.fragmentImage}><Image src={fragment.image} alt={localized.alt} fill sizes="(max-width: 760px) 92vw, 48vw" /></div><div className={styles.fragmentPaper}><p className={styles.fragmentNumber}>{copy.fragment} {fragment.id}</p><h3>{localized.title}</h3>{localized.text.map(line => <p key={line}>{line}</p>)}{fragment.audio && <FragmentAudio src={fragment.audio} duration={fragment.duration ?? 0} labels={{ play: copy.play, pause: copy.pause, timeline: copy.timeline }} fragment={fragment.slug} />}</div></article>; })}<div className={styles.nextFragment} aria-label={copy.moreSoon}><span>004</span><p>{copy.moreSoon}</p></div></div>
    </section>
    <aside className={styles.foundNote} aria-label={copy.privateTitle}><Image src="/images/coming-soon/private-by-design-paper-v2.webp" alt="" fill sizes="(max-width: 900px) 96vw, 980px" /><div><p>{copy.privateTitle}</p><span>{copy.privateBody}</span></div></aside>
    <footer className={styles.footer}><div><strong>NoFi Diary</strong><p>{copy.footerLine}</p></div><Link className={styles.footerPrivacy} href={localePath(locale, "/privacy")}>{copy.privacy}</Link><span>© 2026 NoFi Diary</span></footer>
  </main>;
}
