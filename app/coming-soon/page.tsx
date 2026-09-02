import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ComingSoonHeader } from "./ComingSoonHeader";
import { DocumentLanguage } from "./DocumentLanguage";
import { FragmentAudio } from "./FragmentAudio";
import { HoldToRemember } from "./HoldToRemember";
import { comingSoonCopy } from "./content";
import styles from "./coming-soon.module.css";
import { isComingSoon } from "@/lib/coming-soon";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n";

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
  return <><DocumentLanguage locale={locale} /><main className={styles.page}>
    <ComingSoonHeader locale={locale} />
    <section className={styles.hero} aria-labelledby="coming-soon-title">
      <div className={styles.heroCopy}><p className={styles.eyebrow}>NoFi Diary</p><h1 id="coming-soon-title">{copy.heroTitle}</h1><p className={styles.heroSubline}>{copy.heroSubline}</p><div className={styles.arrival}><span>{copy.almostReady}</span><small>{copy.platform}</small></div></div>
      <HoldToRemember label={copy.hold} confirmation={copy.kept}>
        <span className={styles.memoryDate}>{copy.memoryDate}</span>
        <span className={styles.heroPhoto}><Image src="/images/coming-soon/fragment-001-road-to-sea.webp" alt="" fill priority sizes="(max-width: 760px) 92vw, 46vw" /></span>
        <span className={styles.memoryWave} aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} />)}</span>
        <span className={styles.memoryWords}>{copy.heroMemory}</span><time className={styles.memoryTime}>{copy.memoryTime}</time>
      </HoldToRemember>
    </section>
    <section className={styles.positioning} aria-labelledby="position-title"><div className={styles.positionInner}><span className={styles.pencilMark} aria-hidden="true" /><h2 id="position-title">{copy.positionTitle}</h2><p>{copy.positionBody}</p></div></section>
    <section id="fragments" className={styles.fragments} aria-labelledby="fragments-title">
      <header className={styles.sectionIntro}><p>{copy.fragmentsEyebrow}</p><h2 id="fragments-title">{copy.fragmentsTitle}</h2></header>
      <div className={styles.fragmentShelf}>
        <article className={styles.voiceFragment}><p>{copy.voiceLabel}</p><blockquote>“{copy.voiceQuote}”</blockquote><span className={styles.voiceNote}>{copy.voiceNote}</span><FragmentAudio src="/memories/audio/fuori-strada.m4a" duration={23} gain={2.25} labels={{ play: copy.play, pause: copy.pause, timeline: copy.timeline }} fragment="voice-preview" /></article>
        <article className={styles.photoFragment}><div><Image src="/images/coming-soon/fragment-002-dolphins.webp" alt={copy.photoAlt} fill sizes="(max-width: 700px) 86vw, 30vw" /></div><p>{copy.photoLabel} · {copy.photoDate}</p><span>{copy.photoNote}</span></article>
        <article className={styles.capsuleFragment}><span className={styles.capsuleString} aria-hidden="true" /><p>{copy.capsuleLabel}</p><span>{copy.capsuleOpen}</span><strong>{copy.capsuleDuration}</strong><i aria-hidden="true">✦</i></article>
      </div>
    </section>
    <section className={styles.ownership} aria-labelledby="ownership-title"><div className={styles.ownershipObject}><Image className={styles.ownershipPaper} src="/images/coming-soon/private-by-design-paper-v2.webp" alt="" fill sizes="(max-width: 760px) 96vw, 1120px" /><div className={styles.ownershipCopy}><p className={styles.eyebrow}>NoFi Diary</p><h2 id="ownership-title">{copy.privacyTitle}</h2><span>{copy.privacyBody}</span><strong>{copy.privacyLine}</strong></div></div></section>
    <footer className={styles.footer}><strong>NoFi</strong><p>{copy.footerLine}</p><Link className={styles.footerPrivacy} href={localePath(locale, "/privacy")}>{copy.privacy}</Link><span>© 2026</span></footer>
  </main></>;
}
