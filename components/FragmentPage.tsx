import Image from "next/image";
import Link from "next/link";
import { ComingSoonHeader } from "@/app/coming-soon/ComingSoonHeader";
import { FragmentAudio } from "@/app/coming-soon/FragmentAudio";
import { comingSoonCopy } from "@/app/coming-soon/content";
import { FragmentVisit } from "@/components/FragmentVisit";
import type { NofiFragment } from "@/content/fragments";
import { localeNames, localePath, locales, type Locale } from "@/lib/i18n";
import styles from "./FragmentPage.module.css";

const backCopy: Record<Locale, string> = { en: "Back to NoFi", it: "Torna a NoFi", fr: "Retour à NoFi", es: "Volver a NoFi", de: "Zurück zu NoFi" };
const privacyCopy: Record<Locale, string> = { en: "Privacy", it: "Privacy", fr: "Confidentialité", es: "Privacidad", de: "Datenschutz" };
const languageHotspots: Record<Locale, string> = {
  en: styles.canvasLanguageEn,
  it: styles.canvasLanguageIt,
  fr: styles.canvasLanguageFr,
  es: styles.canvasLanguageEs,
  de: styles.canvasLanguageDe,
};

function Fragment002Canvas({ fragment, locale }: { fragment: NofiFragment; locale: Locale }) {
  const copy = fragment.copy[locale];
  const pageCopy = comingSoonCopy[locale];
  const home = localePath(locale);
  const currentPath = `/fragments/${fragment.slug}`;

  return <div className={styles.canvasPage}>
    <FragmentVisit fragment={fragment.id} locale={locale} />
    <main className={styles.canvasStage}>
      <Image
        className={styles.canvasImage}
        src="/images/coming-soon/fragment-002-draft-canvas-v1.png"
        alt=""
        width={941}
        height={1672}
        priority
        unoptimized
        draggable={false}
      />

      <nav aria-label={pageCopy.navigation}>
        <Link className={`${styles.canvasHotspot} ${styles.canvasBrand}`} href={home} aria-label="NoFi Diary — Home"><span className={styles.srOnly}>NoFi Diary</span></Link>
        <Link className={`${styles.canvasHotspot} ${styles.canvasFragments}`} href={`${home}#fragments`}><span className={styles.srOnly}>{pageCopy.fragmentsLink}</span></Link>
        <Link className={`${styles.canvasHotspot} ${styles.canvasPrivacyTop}`} href={localePath(locale, "/privacy")}><span className={styles.srOnly}>{privacyCopy[locale]}</span></Link>
      </nav>

      <nav aria-label={pageCopy.languageLabel}>
        {locales.map(item => <Link
          key={item}
          className={`${styles.canvasHotspot} ${languageHotspots[item]}`}
          href={localePath(item, currentPath)}
          hrefLang={item}
          aria-current={item === locale ? "page" : undefined}
        ><span className={styles.srOnly}>{localeNames[item]}</span></Link>)}
      </nav>

      <Link className={`${styles.canvasHotspot} ${styles.canvasBackTop}`} href={home}><span className={styles.srOnly}>{backCopy[locale]}</span></Link>
      {fragment.audio && <div className={styles.canvasAudio}>
        <FragmentAudio
          src={fragment.audio}
          duration={23}
          gain={2.25}
          labels={{ play: pageCopy.play, pause: pageCopy.pause, timeline: pageCopy.timeline }}
          fragment={fragment.id}
        />
      </div>}
      <Link className={`${styles.canvasHotspot} ${styles.canvasBackBottom}`} href={home}><span className={styles.srOnly}>{backCopy[locale]}</span></Link>
      <Link className={`${styles.canvasHotspot} ${styles.canvasFooterBrand}`} href={home} aria-label="NoFi — Home"><span className={styles.srOnly}>NoFi</span></Link>
      <Link className={`${styles.canvasHotspot} ${styles.canvasPrivacyBottom}`} href={localePath(locale, "/privacy")}><span className={styles.srOnly}>{privacyCopy[locale]}</span></Link>

      <article className={styles.srOnly}>
        <p>NoFi Diary · Fragment {fragment.id}</p>
        <h1>{copy.title}</h1>
        <p>{copy.excerpt}</p>
        <p>{copy.body}</p>
      </article>
    </main>
  </div>;
}

export function FragmentPage({ fragment, locale }: { fragment: NofiFragment; locale: Locale }) {
  if (fragment.id === "002") return <Fragment002Canvas fragment={fragment} locale={locale} />;

  const copy = fragment.copy[locale];
  const pageCopy = comingSoonCopy[locale];
  const home = localePath(locale);
  return <div className={styles.page}><ComingSoonHeader locale={locale} currentPath={`/fragments/${fragment.slug}`} /><FragmentVisit fragment={fragment.id} locale={locale} /><main className={styles.main}><Link className={styles.back} href={home}>← {backCopy[locale]}</Link><article className={styles.article}><p className={styles.eyebrow}>NoFi Diary · Fragment {fragment.id}</p><h1>{copy.title}</h1><p className={styles.excerpt}>{copy.excerpt}</p><div className={styles.memoryFrame}><div className={styles.memory}><Image src={fragment.image} alt={copy.imageAlt} fill priority sizes="(max-width: 700px) 92vw, 800px" /></div></div>{fragment.audio && <section className={styles.audioCard} aria-label={pageCopy.voiceLabel}><p>{pageCopy.voiceLabel}</p><FragmentAudio src={fragment.audio} duration={23} gain={2.25} bars={60} labels={{ play: pageCopy.play, pause: pageCopy.pause, timeline: pageCopy.timeline }} fragment={fragment.id} /></section>}<p className={styles.body}>{copy.body}</p><Link className={`${styles.back} ${styles.bottomBack}`} href={home}>← {backCopy[locale]}</Link></article></main><footer className={styles.footer}><strong>NoFi</strong><p>{pageCopy.footerLine}</p><Link className={styles.privacy} href={localePath(locale,"/privacy")}>{privacyCopy[locale]}</Link><span>© 2026</span></footer></div>;
}
