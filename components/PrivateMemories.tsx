import Image, { type StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n";
import englishStory from "@/public/images/private-memories/private-memories-en.webp";
import italianStory from "@/public/images/private-memories/private-memories-it.webp";
import frenchStory from "@/public/images/private-memories/private-memories-fr.webp";
import spanishStory from "@/public/images/private-memories/private-memories-es.webp";
import germanStory from "@/public/images/private-memories/private-memories-de.webp";
import styles from "./PrivateMemories.module.css";

type StoryCopy = { kicker: string; title: string; subtitle: string; meet: string; send: string; open: string; imageAlt: string; closing: string; distinction: string };

const stories: Record<Locale, StoryCopy> = {
  it: {
    kicker: "Quando affidi un ricordo a qualcuno",
    title: "Un ricordo può viaggiare lontano.", subtitle: "Senza smettere di essere vostro.",
    meet: "La prima volta che due NoFi si incontrano, si riconoscono attraverso sei piccoli simboli. Da quel momento possono ricordarsi l’uno dell’altro.",
    send: "Anche dall’altra parte del mondo, puoi preparare un ricordo per quel NoFi e inviarlo con WhatsApp, una mail o il mezzo che scegli. Viaggia come un file NoFi protetto: il servizio lo trasporta senza aprirne il contenuto.",
    open: "Il NoFi a cui è destinato lo apre e ritrova foto, voce, parole e atmosfera. Per ritrovarvi non servono né un account NoFi né un servizio cloud NoFi.",
    imageAlt: "Due persone si riconoscono in NoFi con sei simboli. Un ricordo viaggia come file memory.nofi cifrato tramite un’app di messaggistica e viene aperto dal destinatario come pagina con foto, voce e parole.",
    closing: "Una volta vicini. Poi vicini anche da lontano.",
    distinction: "Con «Invia come NoFi», il ricordo viene custodito per un altro NoFi. Con «Esporta come foto o video», diventa una foto o un video che chi lo riceve può vedere normalmente."
  },
  en: {
    kicker: "When you entrust someone with a memory",
    title: "A memory can travel far.", subtitle: "And still stay between you.",
    meet: "The first time two NoFi meet, they recognise each other through six little symbols. From then on, they can remember each other.",
    send: "Even from the other side of the world, you can prepare a memory for that NoFi and send it via WhatsApp, email or a service of your choice. It travels as a protected NoFi file: the service carries it without opening its contents.",
    open: "The NoFi it’s intended for opens it to find photos, voice, words and atmosphere. You don’t need a NoFi account or a NoFi cloud service to reconnect.",
    imageAlt: "Two people recognise each other in NoFi using six symbols. A memory travels as an encrypted memory.nofi file through a messaging app, and the recipient opens it as a page with photos, voice and words.",
    closing: "Meet once. Stay close, even from afar.",
    distinction: "With “Send as NoFi”, the memory is kept for another NoFi. With “Export as a photo or video”, it becomes a photo or video that anyone who receives it can view normally."
  },
  fr: {
    kicker: "Quand vous confiez un souvenir à quelqu’un",
    title: "Un souvenir peut voyager loin.", subtitle: "Et rester entre vous.",
    meet: "La première fois que deux NoFi se rencontrent, ils se reconnaissent grâce à six petits symboles. Dès lors, ils peuvent se souvenir l’un de l’autre.",
    send: "Même à l’autre bout du monde, vous pouvez préparer un souvenir pour ce NoFi et l’envoyer par WhatsApp, par e-mail ou par le moyen de votre choix. Il voyage sous la forme d’un fichier NoFi protégé : le service le transporte sans en ouvrir le contenu.",
    open: "Le NoFi auquel il est destiné l’ouvre et y retrouve des photos, une voix, des mots et une atmosphère. Vous n’avez besoin ni d’un compte NoFi ni d’un service cloud NoFi pour garder ce lien.",
    imageAlt: "Deux personnes se reconnaissent dans NoFi grâce à six symboles. Un souvenir voyage sous la forme d’un fichier memory.nofi chiffré via une application de messagerie, puis le destinataire l’ouvre comme une page avec des photos, une voix et des mots.",
    closing: "Une première rencontre. Puis la proximité, même à distance.",
    distinction: "Avec « Envoyer au format NoFi », le souvenir est conservé pour un autre NoFi. Avec « Exporter en photo ou en vidéo », il devient une photo ou une vidéo que toute personne qui la reçoit peut consulter normalement."
  },
  es: {
    kicker: "Cuando confías un recuerdo a alguien",
    title: "Un recuerdo puede viajar lejos.", subtitle: "Y seguir siendo vuestro.",
    meet: "La primera vez que dos NoFi se encuentran, se reconocen mediante seis pequeños símbolos. A partir de entonces, pueden recordarse el uno al otro.",
    send: "Incluso desde el otro lado del mundo, puedes preparar un recuerdo para ese NoFi y enviarlo por WhatsApp, por correo electrónico o por el medio que elijas. Viaja como un archivo NoFi protegido: el servicio lo transporta sin abrir su contenido.",
    open: "El NoFi al que va destinado lo abre y recupera fotos, voz, palabras y atmósfera. No necesitáis una cuenta NoFi ni un servicio en la nube de NoFi para reencontraros.",
    imageAlt: "Dos personas se reconocen en NoFi mediante seis símbolos. Un recuerdo viaja como archivo memory.nofi cifrado a través de una aplicación de mensajería y el destinatario lo abre como una página con fotos, voz y palabras.",
    closing: "Un primer encuentro. Después, cerca incluso a distancia.",
    distinction: "Con «Enviar como NoFi», el recuerdo se guarda para otro NoFi. Con «Exportar como foto o vídeo», se convierte en una foto o un vídeo que cualquiera que lo reciba puede ver normalmente."
  },
  de: {
    kicker: "Wenn du jemandem eine Erinnerung anvertraust",
    title: "Eine Erinnerung kann weit reisen.", subtitle: "Und trotzdem nur euch gehören.",
    meet: "Wenn sich zwei NoFi zum ersten Mal treffen, erkennen sie einander an sechs kleinen Symbolen. Von da an können sie sich aneinander erinnern.",
    send: "Auch vom anderen Ende der Welt aus kannst du eine Erinnerung für dieses NoFi vorbereiten und per WhatsApp, E-Mail oder auf einem Weg deiner Wahl senden. Sie reist als geschützte NoFi-Datei: Der Dienst übermittelt sie, ohne ihren Inhalt zu öffnen.",
    open: "Das NoFi, für das sie bestimmt ist, öffnet sie und findet darin Fotos, Stimme, Worte und Atmosphäre wieder. Dafür braucht ihr weder ein NoFi-Konto noch einen Cloud-Dienst von NoFi.",
    imageAlt: "Zwei Personen erkennen einander in NoFi an sechs Symbolen. Eine Erinnerung wird als verschlüsselte memory.nofi-Datei über eine Messaging-App versendet. Der Empfänger öffnet sie als Seite mit Fotos, Stimme und Worten.",
    closing: "Einmal zusammen. Danach verbunden, auch aus der Ferne.",
    distinction: "Mit „Als NoFi senden“ wird die Erinnerung für ein anderes NoFi bewahrt. Mit „Als Foto oder Video exportieren“ wird daraus ein Foto oder Video, das alle, die es erhalten, ganz normal ansehen können."
  }
};

const storyImages: Record<Locale, StaticImageData> = {
  en: englishStory, it: italianStory, fr: frenchStory, es: spanishStory, de: germanStory
};

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
        {/* Already compressed as WebP; keep the embedded lettering crisp. */}
        <Image className={styles.illustration} src={storyImages[locale]} alt={t.imageAlt} unoptimized />
        <figcaption>{t.closing}</figcaption>
      </figure>
      <p className={styles.distinction}>{t.distinction}</p>
    </div>
  </section>;
}
