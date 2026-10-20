import type { Metadata } from "next";
import { locales, localePath, type Locale } from "@/lib/i18n";
import { googlePlayUrl } from "@/lib/store";

export const siteUrl = "https://nofidiary.com";
export const publicPagePaths = ["", "/privacy", "/manifesto", "/time-capsules", "/stickers", "/themes", "/appearances"] as const;
export const ogLocales: Record<Locale, string> = { en: "en_US", it: "it_IT", fr: "fr_FR", es: "es_ES", de: "de_DE" };
export const homeSeo: Record<Locale, { title: string; description: string }> = {
  en: { title: "NoFi Diary — Private, Local-First Diary for Photos & Voice", description: "A private, local-first Android diary for photos, voice and tactile pages. No account, no public feed, designed to work offline." },
  it: { title: "NoFi Diary — Diario privato e local-first per foto e voce", description: "Un diario Android privato e local-first per foto, voce e pagine tattili. Nessun account, nessun feed pubblico, progettato per funzionare offline." },
  fr: { title: "NoFi Diary — Journal privé pour photos et voix, conservé sur votre appareil", description: "Un journal Android privé pour vos photos, votre voix et vos pages tactiles, gardé sur votre appareil. Sans compte ni fil public, conçu pour fonctionner hors ligne." },
  es: { title: "NoFi Diary — Diario privado para fotos y voz, guardado en tu dispositivo", description: "Un diario Android privado para fotos, voz y páginas táctiles, guardado en tu dispositivo. Sin cuenta ni feed público, diseñado para funcionar sin conexión." },
  de: { title: "NoFi Diary — Privates Tagebuch für Fotos und Stimme, lokal auf deinem Gerät", description: "Ein privates Android-Tagebuch für Fotos, Stimme und fühlbare Seiten, lokal auf deinem Gerät. Ohne Konto und öffentlichen Feed, auch offline nutzbar." },
};

export function languageAlternates(path = "") {
  return { ...Object.fromEntries(locales.map(locale => [locale, `${siteUrl}${localePath(locale, path)}`])), "x-default": `${siteUrl}${localePath("en", path)}` };
}

export function pageMetadata(locale: Locale, path: string, title: string, description: string, image = "/images/editorial/hero-diary.png"): Metadata {
  const url = `${siteUrl}${localePath(locale, path)}`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { siteName: "NoFi Diary", type: "website", title, description, url, locale: ogLocales[locale], alternateLocale: locales.filter(item => item !== locale).map(item => ogLocales[item]), images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function homepageMetadata(locale: Locale) {
  return pageMetadata(locale, "", homeSeo[locale].title, homeSeo[locale].description);
}

export function mobileApplicationData(locale: Locale) {
  return { "@context": "https://schema.org", "@type": "MobileApplication", name: "NoFi Diary", url: `${siteUrl}${localePath(locale)}`, inLanguage: locale, description: homeSeo[locale].description, operatingSystem: "Android", applicationCategory: "LifestyleApplication", downloadUrl: googlePlayUrl };
}
