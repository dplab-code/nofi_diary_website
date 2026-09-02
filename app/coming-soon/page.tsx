import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ComingSoonHeader } from "./ComingSoonHeader";
import { DocumentLanguage } from "./DocumentLanguage";
import { FragmentAudio } from "./FragmentAudio";
import { HoldToRemember } from "./HoldToRemember";
import { comingSoonCopy } from "./content";
import styles from "./coming-soon.module.css";
import { isComingSoon } from "@/lib/coming-soon";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n";
import { ComingSoonAnalytics } from "./ComingSoonAnalytics";
import { TrackedComingSoonLink } from "./TrackedComingSoonLink";

function localeFrom(value: string | string[] | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && isLocale(candidate) ? candidate : "en";
}

const seoDescriptions: Record<Locale, string> = {
  en: "NoFi Diary is a private, offline diary for photographs, voice notes and memories. Coming soon on Android.",
  it: "NoFi Diary è un diario privato e offline per fotografie, note vocali e ricordi. Prossimamente su Android.",
  fr: "NoFi Diary est un journal privé et hors ligne pour vos photos, vos notes vocales et vos souvenirs. Bientôt sur Android.",
  es: "NoFi Diary es un diario privado y sin conexión para fotografías, notas de voz y recuerdos. Muy pronto en Android.",
  de: "NoFi Diary ist ein privates Offline-Tagebuch für Fotos, Sprachnotizen und Erinnerungen. Demnächst für Android."
};

export function comingSoonMetadata(locale: Locale, indexable: boolean): Metadata {
  const copy = comingSoonCopy[locale];
  const canonical = localePath(locale);
  const languages = Object.fromEntries(locales.map(item => [item, localePath(item)]));
  return {
    title: { absolute: copy.metaTitle }, description: seoDescriptions[locale],
    alternates: { canonical, languages: { ...languages, "x-default": "/" } },
    robots: { index: indexable, follow: indexable, googleBot: { index: indexable, follow: indexable } },
    openGraph: { siteName: "NoFi Diary", title: copy.metaTitle, description: copy.socialDescription, type: "website", locale, url: canonical, images: [{ url: "/coming-soon/opengraph-image", width: 1200, height: 630, alt: copy.socialImageAlt }] },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.socialDescription, images: ["/coming-soon/opengraph-image"] },
  };
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ locale?: string | string[] }> }): Promise<Metadata> {
  return comingSoonMetadata(localeFrom((await searchParams).locale), false);
}

export function ComingSoonExperience({ locale }: { locale: Locale }) {
  const copy = comingSoonCopy[locale];
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Organization", name: "NoFi Diary", url: "https://nofidiary.com", logo: "https://nofidiary.com/images/nofi-logo.png" },
    { "@context": "https://schema.org", "@type": "WebSite", name: "NoFi Diary", url: "https://nofidiary.com", inLanguage: locales }
  ];
  return <><DocumentLanguage locale={locale} /><ComingSoonAnalytics locale={locale} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><main className={styles.page}>
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
    <section className={styles.positioning} aria-labelledby="position-title"><div className={styles.positionInner}><h2 id="position-title">{copy.positionTitle}</h2><p>{copy.positionBody}</p></div></section>
    <section id="fragments" className={styles.fragments} aria-labelledby="fragments-title">
      <header className={styles.sectionIntro}><p>{copy.fragmentsEyebrow}</p><h2 id="fragments-title">{copy.fragmentsTitle}</h2></header>
      <div className={styles.fragmentShelf}>
        <article className={styles.voiceFragment}><p>{copy.voiceLabel}</p><blockquote>“{copy.voiceQuote}”</blockquote><span className={styles.voiceNote}>{copy.voiceNote}</span><FragmentAudio src="/memories/audio/fuori-strada.m4a" duration={23} gain={2.25} labels={{ play: copy.play, pause: copy.pause, timeline: copy.timeline }} fragment="voice-preview" /></article>
        <article className={styles.photoFragment}><div><Image src="/images/coming-soon/dolphins-instant-v2.webp" alt={copy.photoAlt} fill sizes="(max-width: 700px) 88vw, 32vw" /></div><p>{copy.photoLabel} · {copy.photoDate}</p><span>{copy.photoNote}</span></article>
        <article className={styles.capsuleFragment}><div className={styles.capsuleVisual}><Image src="/images/coming-soon/time-capsule-envelope-v2.webp" alt="" fill sizes="(max-width: 700px) 76vw, 27vw" /></div><div className={styles.capsuleTag}><p>{copy.capsuleLabel}</p><span>{copy.capsuleOpen}</span><strong>{copy.capsuleDuration}</strong></div></article>
      </div>
    </section>
    <section className={styles.ownership} aria-labelledby="ownership-title"><div className={styles.ownershipObject}><Image className={styles.ownershipPaper} src="/images/coming-soon/private-by-design-paper-v2.webp" alt="" fill sizes="(max-width: 760px) 96vw, 1120px" /><div className={styles.ownershipCopy}><p className={styles.eyebrow}>NoFi Diary</p><h2 id="ownership-title">{copy.privacyTitle}</h2><span>{copy.privacyBody}</span><strong>{copy.privacyLine}</strong></div></div></section>
    <footer className={styles.footer}><strong>NoFi</strong><p>{copy.footerLine}</p><TrackedComingSoonLink className={styles.footerPrivacy} href={localePath(locale, "/privacy")} event="privacy_open" value="footer">{copy.privacy}</TrackedComingSoonLink><span>© 2026</span></footer>
  </main></>;
}

export default async function ComingSoonPage({ searchParams }: { searchParams: Promise<{ locale?: string | string[] }> }) {
  if (!isComingSoon) redirect("/");
  return <ComingSoonExperience locale={localeFrom((await searchParams).locale)} />;
}
