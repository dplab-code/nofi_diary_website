import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, isLegalDocument, legalMetadata } from "@/components/LegalPage";
import { ExplorePage, exploreMetadata } from "@/components/ExplorePages";
import { explorePageIds, isExplorePage } from "@/content/explore";
import { isLocale, locales } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(locale => locale !== "en").flatMap(locale => ["privacy", "terms", "disclaimer", ...explorePageIds].map(document => ({ locale, document }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; document: string }> }): Promise<Metadata> { const { locale, document } = await params; if (!isLocale(locale) || locale === "en") return {}; if (isLegalDocument(document)) return legalMetadata(locale, document); if (isExplorePage(document)) return exploreMetadata(locale, document); return {}; }
export default async function Page({ params }: { params: Promise<{ locale: string; document: string }> }) { const { locale, document } = await params; if (!isLocale(locale) || locale === "en") notFound(); if (isLegalDocument(document)) return <LegalPage locale={locale} documentId={document}/>; if (isExplorePage(document)) return <ExplorePage locale={locale} page={document}/>; notFound(); }
