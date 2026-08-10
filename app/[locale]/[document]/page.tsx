import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, isLegalDocument, legalMetadata } from "@/components/LegalPage";
import { isLocale, locales } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(locale => locale !== "en").flatMap(locale => ["privacy", "terms", "disclaimer"].map(document => ({ locale, document }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; document: string }> }): Promise<Metadata> { const { locale, document } = await params; if (!isLocale(locale) || locale === "en" || !isLegalDocument(document)) return {}; return legalMetadata(locale, document); }
export default async function Page({ params }: { params: Promise<{ locale: string; document: string }> }) { const { locale, document } = await params; if (!isLocale(locale) || locale === "en" || !isLegalDocument(document)) notFound(); return <LegalPage locale={locale} documentId={document} />; }
