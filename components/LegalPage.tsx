import type { Metadata } from "next";
import Link from "next/link";
import { getLegalContent, type LegalDocumentId } from "@/content/legal";
import { copy, localePath, locales, type Locale } from "@/lib/i18n";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { BrandMark } from "@/components/BrandMark";
import { isComingSoon } from "@/lib/coming-soon";

const documentIds: LegalDocumentId[] = ["privacy", "terms", "disclaimer"];
export function isLegalDocument(value: string): value is LegalDocumentId { return documentIds.includes(value as LegalDocumentId); }
export function legalMetadata(locale: Locale, id: LegalDocumentId): Metadata {
  const document = getLegalContent(locale).documents[id];
  return { title: document.title, description: document.description, alternates: { canonical: localePath(locale, `/${id}`), languages: Object.fromEntries(locales.map(item => [item, localePath(item, `/${id}`)])) } };
}
export function LegalPage({ locale, documentId }: { locale: Locale; documentId: LegalDocumentId }) {
  const siteCopy = copy(locale); const legal = getLegalContent(locale); const document = legal.documents[documentId];
  return <div className="legalPage">{isComingSoon ? <header className="legalComingSoonHeader shell" aria-label="NoFi Diary"><BrandMark /><span>NoFi Diary</span></header> : <SiteHeader locale={locale} nav={siteCopy.nav} currentPath={`/${documentId}`} />}<main id="top" className="legalMain">
    <header className="legalHero"><p className="kicker">{legal.legalLabel}</p><h1>{document.title}</h1><p className="legalIntroduction">{document.introduction}</p><p className="legalUpdated"><time dateTime={document.lastUpdated}>{document.updatedLabel}: {document.lastUpdated}</time></p></header>
    <nav className="legalContents" aria-label={`${document.title} contents`}><ol>{document.sections.map((section, index) => <li key={section.heading}><a href={`#${documentId}-${index}`}>{section.heading}</a></li>)}</ol></nav>
    <div className="legalBody">{document.sections.map((section, index) => <section id={`${documentId}-${index}`} key={section.heading} aria-labelledby={`${documentId}-${index}-title`}><h2 id={`${documentId}-${index}-title`}>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}<a className="backToTop" href="#top">↑</a></section>)}</div>
    {!isComingSoon && <nav className="legalDocuments" aria-label={legal.legalLabel}>{documentIds.map(id => <Link key={id} aria-current={id === documentId ? "page" : undefined} href={localePath(locale, `/${id}`)}>{legal.documents[id].title}</Link>)}</nav>}
  </main>{!isComingSoon && <SiteFooter locale={locale} text={siteCopy.footer} nav={siteCopy.nav} />}</div>;
}
