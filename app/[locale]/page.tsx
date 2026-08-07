import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { copy, isLocale, localePath, locales } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(l => l !== "en").map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale) || locale === "en") return {}; const t = copy(locale); return { title: `NoFi Diary — ${t.heroTitle}`, description: t.heroLead, alternates: { canonical: localePath(locale), languages: { en: "/", it: "/it", fr: "/fr", es: "/es", de: "/de" } } }; }
export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || locale === "en") notFound(); return <HomePage locale={locale} />; }
