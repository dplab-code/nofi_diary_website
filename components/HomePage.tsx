import Image from "next/image";
import Link from "next/link";
import { MemoryJourney } from "@/components/MemoryJourney";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { copy, Locale, localePath } from "@/lib/i18n";

const playUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";
const memoryImages = ["memory-page-cutout.png", "memory-box-cutout.png", "memory-capsule-cutout.png", "memory-diary-cutout.png"];
const featureImages = ["feature-capture-cutout.png", "feature-create-cutout.png", "feature-keep-cutout.png"];
const collectionImages = ["/images/editorial/collection-stickers.png", "/images/editorial/collection-themes.png", "/images/editorial/collection-appearances.png"];
const memoryAnatomy: Record<Locale,{kicker:string;title:string;body:string;layers:[string,string][];cta:string}> = {
  en:{kicker:"Inside a memory",title:"One moment. Kept in layers.",body:"A photograph remembers the place. Your voice keeps what happened around it. A few personal details hold the feeling.",layers:[["Photo","The place as you saw it."],["Voice","The part only you can tell."],["Atmosphere","The feeling you want to find again."]],cta:"See how a memory is made"},
  it:{kicker:"Dentro un ricordo",title:"Un momento. Custodito a strati.",body:"Una fotografia ricorda il luogo. La tua voce conserva ciò che accadeva intorno. Pochi dettagli personali trattengono l’atmosfera.",layers:[["Foto","Il luogo come lo hai visto."],["Voce","La parte che solo tu puoi raccontare."],["Atmosfera","La sensazione che vuoi ritrovare."]],cta:"Scopri come nasce un ricordo"},
  fr:{kicker:"Dans un souvenir",title:"Un instant. Gardé en plusieurs couches.",body:"Une photographie se souvient du lieu. Votre voix garde ce qui l’entourait. Quelques détails personnels en retiennent l’atmosphère.",layers:[["Photo","Le lieu tel que vous l’avez vu."],["Voix","La part que vous seul pouvez raconter."],["Atmosphère","La sensation que vous souhaitez retrouver."]],cta:"Voir comment naît un souvenir"},
  es:{kicker:"Dentro de un recuerdo",title:"Un momento. Guardado por capas.",body:"Una fotografía recuerda el lugar. Tu voz conserva lo que sucedía alrededor. Unos pocos detalles personales guardan la atmósfera.",layers:[["Foto","El lugar tal como lo viste."],["Voz","La parte que solo tú puedes contar."],["Atmósfera","La sensación que quieres volver a encontrar."]],cta:"Descubre cómo nace un recuerdo"},
  de:{kicker:"In einer Erinnerung",title:"Ein Moment. In Schichten bewahrt.",body:"Ein Foto erinnert an den Ort. Deine Stimme bewahrt, was rundherum geschah. Persönliche Details halten das Gefühl fest.",layers:[["Foto","Der Ort, wie du ihn gesehen hast."],["Stimme","Der Teil, den nur du erzählen kannst."],["Atmosphäre","Das Gefühl, das du wiederfinden möchtest."]],cta:"So entsteht eine Erinnerung"}
};
const homeUi: Record<Locale,{hero:string;features:string;steps:string;capsules:string;collections:string;explore:string;privacy:string;gallery:string;different:string;questions:string;start:string;discover:string;play:string}> = {
  en:{hero:"Private by design · Offline-first",features:"Capture · Create · Keep",steps:"Four quiet steps",capsules:"Time Capsules",collections:"Optional creative collections",explore:"Explore",privacy:"Privacy & ownership",gallery:"A few quiet moments",different:"A different kind of app",questions:"Questions",start:"Start privately",discover:"Discover Time Capsules",play:"Get NoFi Diary on Google Play"},
  it:{hero:"Privato per scelta · Offline-first",features:"Cattura · Crea · Custodisci",steps:"Quattro gesti silenziosi",capsules:"Time Capsules",collections:"Collezioni creative facoltative",explore:"Esplora",privacy:"Privacy e proprietà",gallery:"Alcuni momenti quieti",different:"Un altro tipo di app",questions:"Domande",start:"Inizia in privato",discover:"Scopri le Time Capsules",play:"Scarica NoFi Diary da Google Play"},
  fr:{hero:"Privé par conception · Offline-first",features:"Capturer · Créer · Garder",steps:"Quatre gestes discrets",capsules:"Capsules temporelles",collections:"Collections créatives facultatives",explore:"Explorer",privacy:"Confidentialité et propriété",gallery:"Quelques instants tranquilles",different:"Une autre façon de concevoir une app",questions:"Questions",start:"Commencer en privé",discover:"Découvrir les capsules temporelles",play:"Télécharger NoFi Diary sur Google Play"},
  es:{hero:"Privado por diseño · Offline-first",features:"Captura · Crea · Guarda",steps:"Cuatro gestos tranquilos",capsules:"Cápsulas del tiempo",collections:"Colecciones creativas opcionales",explore:"Explorar",privacy:"Privacidad y propiedad",gallery:"Algunos momentos tranquilos",different:"Otro tipo de aplicación",questions:"Preguntas",start:"Empieza en privado",discover:"Descubre las cápsulas del tiempo",play:"Descargar NoFi Diary en Google Play"},
  de:{hero:"Privat konzipiert · Offline-first",features:"Festhalten · Gestalten · Bewahren",steps:"Vier ruhige Schritte",capsules:"Zeitkapseln",collections:"Optionale kreative Sammlungen",explore:"Entdecken",privacy:"Privatsphäre und Eigentum",gallery:"Einige stille Momente",different:"Eine andere Art von App",questions:"Fragen",start:"Privat beginnen",discover:"Zeitkapseln entdecken",play:"NoFi Diary bei Google Play laden"}
};

function GooglePlayIcon() {
  return <svg className="googlePlayIcon" viewBox="0 0 32 36" aria-hidden="true">
    <path fill="#00d6ff" d="M2.4 2.3A3.4 3.4 0 001 4.9v26.2c0 1 .5 2 1.4 2.6l15.2-15.8L2.4 2.3z" />
    <path fill="#ffcf3c" d="M22.5 12.8L17.6 18l4.9 5.1 6.2-3.5c1.7-.9 1.7-2.3 0-3.2l-6.2-3.6z" />
    <path fill="#ff5963" d="M2.4 33.7c.8.5 1.8.5 2.8 0l17.3-10.6-4.9-5.1L2.4 33.7z" />
    <path fill="#00e397" d="M2.4 2.3L17.6 18l4.9-5.2L5.2 2.3a2.8 2.8 0 00-2.8 0z" />
  </svg>;
}

function NoAccountIcon() {
  return <svg className="noAccountIcon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="10" cy="7.5" r="3.25" />
    <path d="M3.5 19c.55-4.05 2.7-6.1 6.5-6.1 1.05 0 1.96.16 2.74.49" />
    <path d="M15 15l5 5M20 15l-5 5" />
  </svg>;
}

function PrivacyIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    {index === 0 && <><circle cx="32" cy="21" r="8" /><path d="M17 50c1.5-10 6.5-15 15-15s13.5 5 15 15" /><path d="M13 13l38 38" /></>}
    {index === 1 && <><rect x="13" y="15" width="38" height="34" rx="4" /><path d="M20 24h24M20 32h17M20 40h11" /><path d="M43 37l8 8M51 37l-8 8" /></>}
    {index === 2 && <><rect x="21" y="9" width="22" height="46" rx="4" /><path d="M28 15h8M29 49h6" /><rect x="26" y="27" width="12" height="11" rx="2" /><path d="M29 27v-3a3 3 0 016 0v3" /></>}
    {index === 3 && <><path d="M17 35v13h30V35" /><path d="M32 42V13M23 22l9-9 9 9" /><path d="M22 53h20" /></>}
  </svg>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy(locale); const ui = homeUi[locale]; const anatomy = memoryAnatomy[locale];
  return <main>
    <SiteHeader locale={locale} nav={t.nav} />
    <section className="hero" id="top"><div className="shell heroGrid">
      <div className="heroCopy"><p className="kicker">{ui.hero}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroLead}</p><div className="actions"><a className="playBadge" href={playUrl} aria-label={ui.play}><GooglePlayIcon /><span><small>GET IT ON</small><strong>Google Play</strong></span></a><Link className="button heroSecondary" href="#how">{t.seeHow}</Link></div><p className="micro heroAssurance"><NoAccountIcon /><span>{t.micro}</span></p></div>
      <figure className="heroVisual"><Image src="/images/editorial/hero-diary-cutout-v3.webp" alt="An open handmade diary beside a private journal app" fill priority sizes="(max-width: 900px) 100vw, 62vw" /></figure>
    </div></section>

    <section className="statement"><h2>{t.statement}</h2><p>{t.statementSub}</p></section>

    <section className="manifestoPreview"><div className="shell manifestoPreviewInner"><p className="kicker">{t.manifestoLabel}</p><h2>{t.manifestoTitle}</h2><p>{t.manifestoCopy}</p><Link className="textLink" href={localePath(locale, "/manifesto")}>{t.readManifesto} <span>→</span></Link></div></section>

    <section id="features" className="section shell"><div className="sectionHeading"><p className="kicker">{ui.features}</p><h2>{t.featureTitle}</h2></div><div className="threeGrid featureGrid">{t.features.map(([title, body], i) => <article className="featureCard" key={title}><div className={`featureVisual featureVisual${i}`}><Image src={`/images/editorial/${featureImages[i]}`} alt="" fill sizes="(max-width: 1050px) 90vw, 33vw" /></div><h3>{title}</h3><p>{body}</p></article>)}</div></section>

    <section className="section memoryBand"><div className="shell memoryShell"><div className="sectionHeading"><h2>{t.memoryTitle}</h2></div><div className="memoryPath"><svg className="memoryThread" viewBox="0 0 1200 340" preserveAspectRatio="none" aria-hidden="true"><path d="M35 205 C170 205 240 70 430 100 S690 270 820 205 S1010 90 1165 135" /><circle cx="145" cy="174" r="4" /><circle cx="430" cy="100" r="4" /><circle cx="820" cy="205" r="4" /><circle cx="1080" cy="116" r="4" /></svg>{t.memories.map(([title, body], i) => <article className={`memoryItem memoryItem${i}`} key={title}><span className="memoryIndex">0{i + 1}</span><div className="memoryObject"><Image src={`/images/editorial/${memoryImages[i]}`} alt="" fill sizes="(max-width: 700px) 76vw, 25vw" /></div><div className="memoryNote"><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>

    <MemoryJourney locale={locale}/>

    <section className="capsuleBanner"><Image src="/images/editorial/time-capsule.png" alt="A sealed paper time capsule with lavender" fill sizes="100vw" /><div className="shell capsuleCopy"><p className="kicker">{ui.capsules}</p><h2>{t.capsuleTitle}</h2><p>{t.capsuleCopy}</p><Link className="button outline" href={localePath(locale, "/time-capsules")}>{ui.discover}</Link></div></section>

    <section id="collections" className="section shell"><div className="sectionHeading"><p className="kicker">{ui.collections}</p><h2>{t.collectionsTitle}</h2><p>{t.collectionsCopy}</p></div><div className="threeGrid collectionGrid">{t.collectionCards.map(([title, body], i) => <article key={title}><div className="collectionVisual"><Image className="collectionCardImage" src={collectionImages[i]} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div><h3>{title}</h3><p>{body}</p><Link className="textLink" href={localePath(locale, `/${["stickers","themes","appearances"][i]}`)}>{ui.explore} →</Link></article>)}</div></section>

    <section id="privacy" className="section privacySection"><div className="shell privacyEditorial"><figure className="privacyVisual"><Image src="/images/editorial/privacy-still-life.png" alt="" fill sizes="(max-width: 900px) 100vw, 48vw" /></figure><div className="privacyContent"><div className="sectionHeading left"><p className="kicker">{ui.privacy}</p><h2>{t.privacyTitle}</h2><p>{t.privacyCopy}</p><Link className="textLink privacyPolicyLink" href={localePath(locale,"/privacy")}>{t.nav[3]} →</Link></div><div className="privacyGrid">{t.privacyItems.map(([title, body], i) => <article key={title}><span className="privacyIcon"><PrivacyIcon index={i} /></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></div></section>

    <section id="gallery" className="section memoryAnatomy"><div className="shell"><header className="memoryAnatomyIntro"><p className="kicker">{anatomy.kicker}</p><h2>{anatomy.title}</h2><p>{anatomy.body}</p></header><div className="memoryAnatomyGrid"><figure className="layeredMemory"><Image src="/images/editorial/memory-page-stickered.png" alt="A personal NoFi memory composed with a coastal photograph and botanical details" fill sizes="(max-width: 800px) 100vw, 58vw"/><div className="memoryAudio" aria-hidden="true"><span>▶</span><i/><b>00:37</b></div></figure><div className="memoryLayers">{anatomy.layers.map(([title,body],index)=><article key={title} className={`memoryLayer memoryLayer${index}`}><span aria-hidden="true"/><div><p className="kicker">{title}</p><p>{body}</p></div></article>)}<Link className="textLink anatomyLink" href="#how">{anatomy.cta} →</Link></div></div></div></section>

    <section className="section compareSection"><div className="shell compareGrid"><div className="compareIntro"><p className="kicker">{ui.different}</p><h2>{t.compareTitle}</h2><div className="compareLogo"><Image src="/images/nofi-logo.png" alt="NoFi Diary" fill sizes="(max-width: 1050px) 280px, 24vw" /></div></div><div className="compareBook"><div className="comparePage comparePageTypical"><h3>{t.typical}</h3>{t.comparison.map(([a]) => <p key={a}><span className="compareMark compareMarkTypical" aria-hidden="true">×</span>{a}</p>)}</div><div className="comparePage comparePageNofi"><h3>{t.nofi}</h3>{t.comparison.map(([,b]) => <p key={b}><span className="compareMark compareMarkNofi" aria-hidden="true">✓</span>{b}</p>)}</div><span className="compareRibbon" aria-hidden="true" /></div></div></section>

    <section id="faq" className="section shell faqGrid"><div><p className="kicker">{ui.questions}</p><h2>{t.faqTitle}</h2></div><div className="faqList">{t.faqs.map(([q,a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>
    <section className="finalCta"><div className="shell"><p className="kicker">{ui.start}</p><h2>{t.finalTitle}</h2><p>{t.finalCopy}</p><a className="button light" href={playUrl}>{ui.play}</a></div></section>
    <SiteFooter locale={locale} text={t.footer} nav={t.nav} />
  </main>;
}
