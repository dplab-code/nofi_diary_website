import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { copy, Locale, localePath, manifesto } from "@/lib/i18n";
const manifestoUi: Record<Locale, { contents: string; back: string; continue: string }> = {
  en: { contents: "In this manifesto", back: "Back to NoFi", continue: "See how NoFi works" },
  it: { contents: "In questo manifesto", back: "Torna a NoFi", continue: "Scopri come funziona NoFi" },
  fr: { contents: "Dans ce manifeste", back: "Retour à NoFi", continue: "Découvrir NoFi" },
  es: { contents: "En este manifiesto", back: "Volver a NoFi", continue: "Descubre cómo funciona NoFi" },
  de: { contents: "In diesem Manifest", back: "Zurück zu NoFi", continue: "So funktioniert NoFi" },
};

export function ManifestoPage({ locale }: { locale: Locale }) {
  const t = copy(locale); const content = manifesto(locale); const ui = manifestoUi[locale];
  const body = content.blocks.slice(1);
  const landmarks = body.map((lines, index) => ({ index, label: lines[0] })).filter((_, index) => index % 4 === 0);
  return <main className="manifestoPage">
    <SiteHeader locale={locale} nav={t.nav} manifesto />
    <header className="manifestoHero shell"><p className="kicker">NoFi Diary</p><h1>{content.title}</h1><p>{content.blocks[0].join(" ")}</p><a className="manifestoScroll" href="#manifesto-0" aria-label={ui.contents}>↓</a></header>
    <nav className="manifestoContents shell" aria-label={ui.contents}><p className="kicker">{ui.contents}</p><ol>{landmarks.map(item => <li key={item.index}><a href={`#manifesto-${item.index}`}>{item.label}</a></li>)}</ol></nav>
    <article className="manifestoBody shell" aria-label={content.title}>{body.map((lines, i) => <section id={`manifesto-${i}`} key={i} className={i % 4 === 0 ? "manifestoEmphasis" : ""}>{lines.map((line, j) => j === 0 && i % 4 === 0 ? <h2 key={j}>{line}</h2> : <p key={j}>{line}</p>)}</section>)}<footer className="manifestoEnd"><span aria-hidden="true">♡</span><p>NoFi Diary</p><div className="manifestoActions"><Link className="textLink" href={localePath(locale)}>← {ui.back}</Link><Link className="button dark" href={`${localePath(locale)}#how`}>{ui.continue}</Link></div></footer></article>
    <SiteFooter locale={locale} text={t.footer} nav={t.nav} />
  </main>;
}
