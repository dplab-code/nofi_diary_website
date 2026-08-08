"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Locale, localeNames, localePath, locales } from "@/lib/i18n";

export function SiteHeader({ locale, nav, manifesto = false }: { locale: Locale; nav: string[]; manifesto?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { document.documentElement.lang = locale; localStorage.setItem("nofi-locale", locale); }, [locale]);
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  const anchors = ["features", "how", "collections", "privacy", "gallery"];
  const home = localePath(locale);
  return <header className={`siteHeaderFrame${scrolled ? " scrolled" : ""}`}>
    <div className="siteHeader shell">
      <Link className="brand" href={home}><BrandMark /><span>NoFi Diary</span></Link>
      <button className="menuButton" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}><span /><span /></button>
      <nav id="site-nav" className={open ? "open" : ""} aria-label="Main navigation">
        {nav.slice(0, 5).map((label, i) => <Link key={label} href={`${home}${manifesto ? "" : ""}#${anchors[i]}`} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href={localePath(locale, "/manifesto")} onClick={() => setOpen(false)}>{nav[5]}</Link>
      </nav>
      <div className="headerTools">
        <label className="srOnly" htmlFor="locale">Language</label>
        <select id="locale" value={locale} onChange={e => {
          const next = e.target.value as Locale;
          window.location.href = localePath(next, manifesto ? "/manifesto" : "");
        }}>{locales.map(l => <option key={l} value={l}>{localeNames[l]}</option>)}</select>
        <a className="button dark headerCta" href={process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary"}>Get the app</a>
      </div>
    </div>
  </header>;
}

export function SiteFooter({ locale, text, nav }: { locale: Locale; text: string; nav: string[] }) {
  return <footer className="siteFooter shell">
    <Link className="brand" href={localePath(locale)}><BrandMark /><span>NoFi Diary</span></Link>
    <p>{text}</p>
    <nav><Link href={localePath(locale, "/manifesto")}>{nav[5]}</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
    <span>© 2026 NoFi Diary</span>
  </footer>;
}
