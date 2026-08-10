"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Locale, localeNames, localePath, locales } from "@/lib/i18n";
import { getLegalContent } from "@/content/legal";

const chromeCopy: Record<Locale, { navigation: string; menu: string; close: string; language: string; getApp: string; footer: string }> = {
  en: { navigation: "Main navigation", menu: "Open menu", close: "Close menu", language: "Language", getApp: "Get NoFi on Google Play", footer: "Footer navigation" },
  it: { navigation: "Navigazione principale", menu: "Apri il menu", close: "Chiudi il menu", language: "Lingua", getApp: "Scarica NoFi da Google Play", footer: "Navigazione a piè di pagina" },
  fr: { navigation: "Navigation principale", menu: "Ouvrir le menu", close: "Fermer le menu", language: "Langue", getApp: "Télécharger NoFi sur Google Play", footer: "Navigation de pied de page" },
  es: { navigation: "Navegación principal", menu: "Abrir el menú", close: "Cerrar el menú", language: "Idioma", getApp: "Descargar NoFi en Google Play", footer: "Navegación del pie" },
  de: { navigation: "Hauptnavigation", menu: "Menü öffnen", close: "Menü schließen", language: "Sprache", getApp: "NoFi bei Google Play laden", footer: "Fußzeilennavigation" },
};

export function SiteHeader({ locale, nav, manifesto = false, currentPath }: { locale: Locale; nav: string[]; manifesto?: boolean; currentPath?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const ui = chromeCopy[locale];
  const anchors = ["features", "how", "collections", "privacy", "gallery"];
  const home = localePath(locale);

  useEffect(() => { document.documentElement.lang = locale; localStorage.setItem("nofi-locale", locale); }, [locale]);
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <header className={`siteHeaderFrame${scrolled ? " scrolled" : ""}`}>
    <div className="siteHeader shell">
      <Link className="brand" href={home} aria-label="NoFi Diary — Home"><BrandMark /><span>NoFi Diary</span></Link>
      <button ref={menuButton} className="menuButton" type="button" aria-label={open ? ui.close : ui.menu} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(value => !value)}><span /><span /></button>
      <nav id="site-nav" className={open ? "open" : ""} aria-label={ui.navigation}>
        {nav.slice(0, 5).map((label, i) => <Link ref={i === 0 ? firstLink : undefined} key={label} href={`${home}#${anchors[i]}`} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href={localePath(locale, "/manifesto")} aria-current={manifesto ? "page" : undefined} onClick={() => setOpen(false)}>{nav[5]}</Link>
      </nav>
      <div className="headerTools">
        <label className="srOnly" htmlFor="locale">{ui.language}</label>
        <select id="locale" aria-label={ui.language} value={locale} onChange={event => {
          const next = event.target.value as Locale;
          window.location.href = localePath(next, currentPath ?? (manifesto ? "/manifesto" : ""));
        }}>{locales.map(item => <option key={item} value={item}>{localeNames[item]}</option>)}</select>
        <a className="button dark headerCta" href={process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary"} aria-label={ui.getApp}>{ui.getApp}</a>
      </div>
    </div>
  </header>;
}

export function SiteFooter({ locale, text, nav }: { locale: Locale; text: string; nav: string[] }) {
  const legal = getLegalContent(locale);
  return <footer className="siteFooter shell">
    <Link className="brand" href={localePath(locale)} aria-label="NoFi Diary — Home"><BrandMark /><span>NoFi Diary</span></Link>
    <p>{text}</p>
    <nav aria-label={chromeCopy[locale].footer}><Link href={localePath(locale, "/manifesto")}>{nav[5]}</Link><Link href={localePath(locale, "/privacy")}>{legal.documents.privacy.title}</Link><Link href={localePath(locale, "/terms")}>{legal.documents.terms.title}</Link><Link href={localePath(locale, "/disclaimer")}>{legal.documents.disclaimer.title}</Link></nav>
    <span>© 2026 NoFi Diary</span>
  </footer>;
}
