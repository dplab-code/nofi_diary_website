import { homepageMetadata } from "@/content/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { copy, isLocale, localePath, locales } from "@/lib/i18n";
import { ComingSoonExperience, comingSoonMetadata } from "@/app/coming-soon/page";
import { isComingSoon, isIndexable } from "@/lib/coming-soon";
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(l => l !== "en").map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale) || locale === "en") return {}; if (isComingSoon) return comingSoonMetadata(locale, isIndexable); return homepageMetadata(locale); }
export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || locale === "en") notFound(); return isComingSoon ? <ComingSoonExperience locale={locale} /> : <HomePage locale={locale} />; }
