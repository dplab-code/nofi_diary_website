import Image from "next/image";
import Link from "next/link";
import { ComingSoonHeader } from "@/app/coming-soon/ComingSoonHeader";
import { FragmentVisit } from "@/components/FragmentVisit";
import type { NofiFragment } from "@/content/fragments";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./FragmentPage.module.css";

const backCopy: Record<Locale,string> = { en:"Back to NoFi",it:"Torna a NoFi",fr:"Retour à NoFi",es:"Volver a NoFi",de:"Zurück zu NoFi" };
const privacyCopy: Record<Locale,string> = { en:"Privacy",it:"Privacy",fr:"Confidentialité",es:"Privacidad",de:"Datenschutz" };

export function FragmentPage({ fragment, locale }: { fragment: NofiFragment; locale: Locale }) {
  const copy = fragment.copy[locale];
  return <div className={styles.page}><ComingSoonHeader locale={locale} currentPath={`/fragments/${fragment.slug}`} /><FragmentVisit fragment={fragment.id} locale={locale} /><main className={styles.main}><Link className={styles.back} href={localePath(locale)}>← {backCopy[locale]}</Link><article className={styles.article}><p className={styles.eyebrow}>NoFi Diary · Fragment {fragment.id}</p><h1>{copy.title}</h1><p className={styles.excerpt}>{copy.excerpt}</p><div className={styles.memory}><Image src={fragment.image} alt={copy.imageAlt} fill priority sizes="(max-width: 700px) 92vw, 860px" /></div><p className={styles.body}>{copy.body}</p><Link className={styles.privacy} href={localePath(locale,"/privacy")}>{privacyCopy[locale]}</Link></article></main></div>;
}
