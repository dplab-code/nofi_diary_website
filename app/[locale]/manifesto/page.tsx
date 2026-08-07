import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManifestoPage } from "@/components/ManifestoPage";
import { copy, isLocale, localePath, locales } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(l => l !== "en").map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale) || locale === "en") return {}; const t = copy(locale); return { title: t.manifestoLabel, description: t.manifestoTitle, alternates: { canonical: localePath(locale, "/manifesto"), languages: { en: "/manifesto", it: "/it/manifesto", fr: "/fr/manifesto", es: "/es/manifesto", de: "/de/manifesto" } } }; }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || locale === "en") notFound(); return <ManifestoPage locale={locale} />; }
