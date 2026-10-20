import { pageMetadata } from "@/content/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManifestoPage } from "@/components/ManifestoPage";
import { copy, isLocale, localePath, locales } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(l => l !== "en").map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale) || locale === "en") return {}; const t = copy(locale); return pageMetadata(locale, "/manifesto", `${t.manifestoLabel} — NoFi Diary`, t.manifestoTitle); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || locale === "en") notFound(); return <ManifestoPage locale={locale} />; }
