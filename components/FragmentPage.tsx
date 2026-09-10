import Image from "next/image";
import Link from "next/link";
import { ComingSoonHeader } from "@/app/coming-soon/ComingSoonHeader";
import { FragmentAudio } from "@/app/coming-soon/FragmentAudio";
import { comingSoonCopy } from "@/app/coming-soon/content";
import { FragmentVisit } from "@/components/FragmentVisit";
import type { NofiFragment } from "@/content/fragments";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./FragmentPage.module.css";

const backCopy: Record<Locale,string> = { en:"Back to NoFi",it:"Torna a NoFi",fr:"Retour à NoFi",es:"Volver a NoFi",de:"Zurück zu NoFi" };
const privacyCopy: Record<Locale,string> = { en:"Privacy",it:"Privacy",fr:"Confidentialité",es:"Privacidad",de:"Datenschutz" };

export function FragmentPage({ fragment, locale }: { fragment: NofiFragment; locale: Locale }) {
  const copy = fragment.copy[locale];
  const pageCopy = comingSoonCopy[locale];
  const home = localePath(locale);
  return <div className={styles.page}><ComingSoonHeader locale={locale} currentPath={`/fragments/${fragment.slug}`} /><FragmentVisit fragment={fragment.id} locale={locale} /><main className={styles.main}><Link className={styles.back} href={home}>← {backCopy[locale]}</Link><article className={styles.article}><p className={styles.eyebrow}>NoFi Diary · Fragment {fragment.id}</p><h1>{copy.title}</h1><p className={styles.excerpt}>{copy.excerpt}</p><div className={styles.memoryFrame}><div className={styles.memory}><Image src={fragment.image} alt={copy.imageAlt} fill priority sizes="(max-width: 700px) 92vw, 800px" /></div></div>{fragment.audio && <section className={styles.audioCard} aria-label={pageCopy.voiceLabel}><p>{pageCopy.voiceLabel}</p><FragmentAudio src={fragment.audio} duration={23} gain={2.25} bars={60} labels={{ play: pageCopy.play, pause: pageCopy.pause, timeline: pageCopy.timeline }} fragment={fragment.id} /></section>}<p className={styles.body}>{copy.body}</p><Link className={`${styles.back} ${styles.bottomBack}`} href={home}>← {backCopy[locale]}</Link></article></main><footer className={styles.footer}><strong>NoFi</strong><p>{pageCopy.footerLine}</p><Link className={styles.privacy} href={localePath(locale,"/privacy")}>{privacyCopy[locale]}</Link><span>© 2026</span></footer></div>;
}
