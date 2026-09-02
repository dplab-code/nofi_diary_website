import Image from "next/image";
import Link from "next/link";
import { localeNames, localePath, locales, type Locale } from "@/lib/i18n";
import { comingSoonCopy } from "./content";
import styles from "./coming-soon.module.css";

export function ComingSoonHeader({ locale, privacyPage = false }: { locale: Locale; privacyPage?: boolean }) {
  const copy = comingSoonCopy[locale];
  const home = localePath(locale);

  return <header className={styles.header}>
    <Link className={styles.brand} href={home} aria-label="NoFi Diary — Home"><Image src="/images/nofi-logo.png" alt="" width={52} height={52} priority /><span>NoFi Diary</span></Link>
    <nav className={styles.primaryNav} aria-label={copy.navigation}>
      <Link href={`${home}#fragments`}>{copy.fragmentsLink}</Link>
      <Link className={styles.privacyLink} href={localePath(locale, "/privacy")} aria-current={privacyPage ? "page" : undefined}>{copy.privacy}</Link>
    </nav>
    <nav className={styles.languages} aria-label={copy.languageLabel}>{locales.map(item => <Link key={item} href={localePath(item, privacyPage ? "/privacy" : "")} aria-current={item === locale ? "page" : undefined} hrefLang={item}>{localeNames[item]}</Link>)}</nav>
  </header>;
}
