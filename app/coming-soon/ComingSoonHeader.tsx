import Image from "next/image";
import Link from "next/link";
import { localeNames, localePath, locales, type Locale } from "@/lib/i18n";
import { comingSoonCopy } from "./content";
import styles from "./coming-soon.module.css";
import { TrackedComingSoonLink } from "./TrackedComingSoonLink";

export function ComingSoonHeader({ locale, privacyPage = false, currentPath }: { locale: Locale; privacyPage?: boolean; currentPath?: string }) {
  const copy = comingSoonCopy[locale];
  const home = localePath(locale);
  const localizedPath = currentPath ?? (privacyPage ? "/privacy" : "");

  return <header className={styles.header}>
    <Link className={styles.brand} href={home} aria-label="NoFi Diary — Home"><Image src="/images/nofi-logo.png" alt="" width={52} height={52} priority /><span>NoFi Diary</span></Link>
    <nav className={styles.primaryNav} aria-label={copy.navigation}>
      <Link href={`${home}#fragments`}>{copy.fragmentsLink}</Link>
      <TrackedComingSoonLink className={styles.privacyLink} href={localePath(locale, "/privacy")} current={privacyPage} event="privacy_open" value="header">{copy.privacy}</TrackedComingSoonLink>
    </nav>
    <nav className={styles.languages} aria-label={copy.languageLabel}>{locales.map(item => <TrackedComingSoonLink key={item} href={localePath(item, localizedPath)} current={item === locale} hrefLang={item} event="language_change" value={item}>{localeNames[item]}</TrackedComingSoonLink>)}</nav>
  </header>;
}
