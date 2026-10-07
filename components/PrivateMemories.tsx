import type { Locale } from "@/lib/i18n";
import styles from "./PrivateMemories.module.css";

type StoryCopy = { kicker: string; title: string; subtitle: string; meet: string; send: string; open: string; recognition: string; delivery: string; arrival: string; closing: string; distinction: string };

const stories: Record<Locale, StoryCopy> = {
  it: {
    kicker: "Quando affidi un ricordo a qualcuno",
    title: "Un ricordo può viaggiare lontano.", subtitle: "Senza smettere di essere vostro.",
    meet: "La prima volta che due NoFi si incontrano, si riconoscono con sei piccoli simboli. Da quel momento possono ricordarsi l’uno dell’altro.",
    send: "Anche dall’altra parte del mondo, puoi preparare un ricordo per quel NoFi e farlo arrivare con WhatsApp, una mail o il mezzo che scegli. Viaggia come un file NoFi protetto: il servizio fa da tramite, senza aprirne il contenuto.",
    open: "Il NoFi a cui è destinato lo apre e ritrova foto, voce, parole e atmosfera. Non serve un account né un cloud NoFi per farvi ritrovare.",
    recognition: "Una volta vicini. Sei simboli per riconoscersi.", delivery: "WhatsApp, mail o il mezzo che scegli", arrival: "Si apre nel NoFi a cui è destinato.",
    closing: "Una volta vicini. Poi vicini anche da lontano.",
    distinction: "Invia come NoFi custodisce il ricordo per un altro NoFi. Esporta come foto o video crea invece un media normalmente visibile a chi lo riceve."
  },
  en: {
    kicker: "When you entrust someone with a memory",
    title: "A memory can travel far.", subtitle: "And still stay between you.",
    meet: "The first time two NoFi meet, they recognise each other through six little symbols. From then on, they can remember each other.",
    send: "Even across the world, you can prepare a memory for that NoFi and send it through WhatsApp, email or whatever you choose. It travels as a protected NoFi file: the service carries it without opening its contents.",
    open: "The NoFi it was meant for opens it to find photos, voice, words and atmosphere. No NoFi account or cloud is needed to bring you together.",
    recognition: "Close once. Six symbols to recognise each other.", delivery: "WhatsApp, email or the way you choose", arrival: "Opened by the NoFi it was meant for.",
    closing: "Close once. Then close, even from afar.",
    distinction: "Send as NoFi keeps a memory for another NoFi. Export as a photo or video creates ordinary media that whoever receives it can view."
  },
  fr: {
    kicker: "Quand vous confiez un souvenir à quelqu’un",
    title: "Un souvenir peut voyager loin.", subtitle: "Et rester entre vous.",
    meet: "La première fois que deux NoFi se rencontrent, ils se reconnaissent grâce à six petits symboles. Dès lors, ils peuvent se souvenir l’un de l’autre.",
    send: "Même à l’autre bout du monde, vous pouvez préparer un souvenir pour ce NoFi et l’envoyer par WhatsApp, mail ou le moyen de votre choix. Il voyage comme un fichier NoFi protégé : le service le transporte sans en ouvrir le contenu.",
    open: "Le NoFi auquel il est destiné l’ouvre et retrouve photos, voix, mots et atmosphère. Aucun compte ni cloud NoFi n’est nécessaire pour vous retrouver.",
    recognition: "Proches une fois. Six symboles pour se reconnaître.", delivery: "WhatsApp, mail ou le moyen de votre choix", arrival: "Ouvert par le NoFi auquel il est destiné.",
    closing: "Proches une fois. Puis proches, même de loin.",
    distinction: "Envoyer en NoFi garde le souvenir pour un autre NoFi. Exporter en photo ou vidéo crée un média ordinaire, visible par la personne qui le reçoit."
  },
  es: {
    kicker: "Cuando confías un recuerdo a alguien",
    title: "Un recuerdo puede viajar lejos.", subtitle: "Y seguir siendo vuestro.",
    meet: "La primera vez que dos NoFi se encuentran, se reconocen con seis pequeños símbolos. Desde entonces pueden recordarse el uno al otro.",
    send: "Incluso al otro lado del mundo, puedes preparar un recuerdo para ese NoFi y enviarlo por WhatsApp, correo o como tú elijas. Viaja como un archivo NoFi protegido: el servicio lo transporta sin abrir su contenido.",
    open: "El NoFi al que va destinado lo abre y recupera fotos, voz, palabras y atmósfera. No hace falta una cuenta ni una nube NoFi para reencontraros.",
    recognition: "Cerca una vez. Seis símbolos para reconocerse.", delivery: "WhatsApp, correo o el medio que elijas", arrival: "Lo abre el NoFi al que va destinado.",
    closing: "Cerca una vez. Después cerca, incluso desde lejos.",
    distinction: "Enviar como NoFi guarda el recuerdo para otro NoFi. Exportar como foto o vídeo crea un contenido normal que puede ver quien lo recibe."
  },
  de: {
    kicker: "Wenn du jemandem eine Erinnerung anvertraust",
    title: "Eine Erinnerung kann weit reisen.", subtitle: "Und trotzdem zwischen euch bleiben.",
    meet: "Wenn zwei NoFi sich zum ersten Mal treffen, erkennen sie einander an sechs kleinen Symbolen. Von da an können sie sich aneinander erinnern.",
    send: "Auch am anderen Ende der Welt kannst du eine Erinnerung für dieses NoFi vorbereiten und per WhatsApp, E-Mail oder auf einem Weg deiner Wahl senden. Sie reist als geschützte NoFi-Datei: Der Dienst überbringt sie, ohne ihren Inhalt zu öffnen.",
    open: "Das NoFi, für das sie bestimmt ist, öffnet sie und findet Fotos, Stimme, Worte und Atmosphäre wieder. Dafür braucht ihr weder ein NoFi-Konto noch eine NoFi-Cloud.",
    recognition: "Einmal nah. Sechs Symbole zum Wiedererkennen.", delivery: "WhatsApp, E-Mail oder dein eigener Weg", arrival: "Geöffnet vom NoFi, für das sie bestimmt ist.",
    closing: "Einmal nah. Dann nah, auch aus der Ferne.",
    distinction: "Als NoFi senden bewahrt die Erinnerung für ein anderes NoFi. Als Foto oder Video exportieren erstellt gewöhnliche Medien, die der Empfänger ansehen kann."
  }
};

const symbolPaths = [
  <><path d="M16 12C6 0 0 15 12 16C0 22 12 32 16 20C22 32 32 20 20 16C32 10 20 0 16 12Z" /><circle cx="16" cy="16" r="3" /></>,
  <path d="M8 24a6 6 0 0 1-1-12a9 9 0 0 1 17 2a5 5 0 0 1 0 10Z" />,
  <path d="m16 3 4 9 10 4-10 4-4 9-4-9-10-4 10-4Z" />,
  <path d="M23 4a13 13 0 1 0 5 21A13 13 0 0 1 23 4Z" />,
  <circle cx="16" cy="16" r="9" />,
  <><path d="M12 27 3 14C0 0 32 0 29 14L20 27Z" /><path d="m8 10 6 15m2-17v17m8-15-6 15M12 27h8" /></>
];

export function PrivateMemories({ locale }: { locale: Locale }) {
  const t = stories[locale];
  return <section id="private-memories" className={`section ${styles.section}`} aria-labelledby="private-memories-title">
    <div className={`shell ${styles.layout}`}>
      <div className={styles.copy}>
        <p className="kicker">{t.kicker}</p>
        <h2 id="private-memories-title">{t.title}{" "}<span>{t.subtitle}</span></h2>
        <p>{t.meet}</p><p>{t.send}</p><p>{t.open}</p>
      </div>
      <figure className={styles.story}>
        <div className={styles.meeting} aria-hidden="true">
          <span className={styles.nofi}>NoFi</span>
          <div className={styles.symbols}>{symbolPaths.map((path, i) => <svg key={i} viewBox="0 0 32 32" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">{path}</svg>)}</div>
          <span className={styles.nofi}>NoFi</span>
        </div>
        <p className={styles.caption}>{t.recognition}</p>
        <div className={styles.travel} aria-hidden="true"><span className={styles.nofi}>NoFi</span><span className={styles.file}>memory.nofi<span>→</span></span><span className={styles.nofi}>NoFi</span></div>
        <p className={styles.caption}>{t.delivery}</p>
        <p className={styles.arrival}>{t.arrival}</p>
        <figcaption>{t.closing}</figcaption>
      </figure>
      <p className={styles.distinction}>{t.distinction}</p>
    </div>
  </section>;
}
