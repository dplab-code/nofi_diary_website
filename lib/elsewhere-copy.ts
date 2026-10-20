import type { Locale } from "@/lib/i18n";
import type { SocialDescriptions } from "@/lib/social-channels";

type ElsewhereCopy = {
  subtitle: string; title: [string, string]; intro: string; invitation: string;
  thoughts: [string, string, string, string, string]; another: string; external: string;
};

export const elsewhereCopy: Record<Locale, ElsewhereCopy> = {
  en: {
    subtitle: "Places We Borrow", title: ["We are here.", "Not to keep you here."],
    intro: "We borrow a few corners of the internet to share an idea: not everything worth remembering needs an audience.",
    invitation: "Different places. Different conversations. No need to follow them all.",
    thoughts: ["Silence is a valid publishing schedule.", "Not everything needs an audience.", "A memory is not a metric.", "The internet can be a place you visit, not a place you live.", "Some things are better kept than shared."],
    another: "Another thought", external: "opens in a new tab",
  },
  it: {
    subtitle: "Luoghi in prestito", title: ["Siamo qui.", "Non per trattenerti qui."],
    intro: "Prendiamo in prestito qualche angolo di Internet per condividere un’idea: non tutto ciò che vale la pena ricordare ha bisogno di un pubblico.",
    invitation: "Luoghi diversi. Conversazioni diverse. Non serve seguirli tutti.",
    thoughts: ["Anche il silenzio è un ritmo di pubblicazione.", "Non tutto ha bisogno di un pubblico.", "Un ricordo non è una metrica.", "Internet può essere un luogo da visitare, non un luogo in cui vivere.", "Certe cose è meglio custodirle che condividerle."],
    another: "Un altro pensiero", external: "si apre in una nuova scheda",
  },
  fr: {
    subtitle: "Des lieux en prêt", title: ["Nous sommes ici.", "Pas pour vous y retenir."],
    intro: "Nous empruntons quelques coins d’Internet pour partager une idée : tout ce qui mérite d’être gardé en mémoire n’a pas besoin d’un public.",
    invitation: "Des lieux différents. Des conversations différentes. Inutile de nous suivre partout.",
    thoughts: ["Le silence aussi a sa place dans un calendrier de publication.", "Tout n’a pas besoin d’un public.", "Un souvenir ne se mesure pas en chiffres.", "Internet peut être un lieu de passage, pas un lieu de vie.", "Certaines choses gagnent à être gardées plutôt que partagées."],
    another: "Une autre pensée", external: "s’ouvre dans un nouvel onglet",
  },
  es: {
    subtitle: "Lugares prestados", title: ["Estamos aquí.", "No para retenerte aquí."],
    intro: "Tomamos prestados algunos rincones de Internet para compartir una idea: no todo lo que merece ser recordado necesita un público.",
    invitation: "Lugares distintos. Conversaciones distintas. No hace falta seguirnos en todos.",
    thoughts: ["El silencio también tiene cabida en un calendario de publicaciones.", "No todo necesita un público.", "Un recuerdo no es una métrica.", "Internet puede ser un lugar que visitas, no un lugar donde vives.", "Algunas cosas merecen guardarse más que compartirse."],
    another: "Otra reflexión", external: "se abre en una pestaña nueva",
  },
  de: {
    subtitle: "Orte auf Zeit", title: ["Wir sind hier.", "Nicht, um dich hier festzuhalten."],
    intro: "Wir leihen uns ein paar Ecken im Internet, um einen Gedanken zu teilen: Nicht alles, was eine Erinnerung wert ist, braucht ein Publikum.",
    invitation: "Verschiedene Orte. Verschiedene Gespräche. Du musst uns nicht überall folgen.",
    thoughts: ["Auch Stille hat Platz im Veröffentlichungsplan.", "Nicht alles braucht ein Publikum.", "Eine Erinnerung ist keine Kennzahl.", "Das Internet kann ein Ort sein, den du besuchst, statt ein Ort, an dem du lebst.", "Manches ist besser aufgehoben als geteilt."],
    another: "Ein weiterer Gedanke", external: "öffnet sich in einem neuen Tab",
  },
};

export const socialDescriptions: SocialDescriptions = {
  en: { instagram: "Fragments of ordinary life", bluesky: "Thoughts about a different internet", youtube: "Small films about remembering", tiktok: "Interruptions to the feed", reddit: "Conversations worth having", pinterest: "Visual notes worth keeping", threads: "Brief thoughts, open conversations" },
  it: { instagram: "Frammenti di vita quotidiana", bluesky: "Pensieri su un Internet diverso", youtube: "Piccoli film sul ricordare", tiktok: "Interruzioni nel flusso", reddit: "Conversazioni che vale la pena avere", pinterest: "Appunti visivi da custodire", threads: "Pensieri brevi, conversazioni aperte" },
  fr: { instagram: "Fragments du quotidien", bluesky: "Réflexions sur un autre Internet", youtube: "Petits films autour du souvenir", tiktok: "Des pauses dans le fil", reddit: "Des conversations qui en valent la peine", pinterest: "Des notes visuelles à garder", threads: "Pensées brèves, conversations ouvertes" },
  es: { instagram: "Fragmentos de la vida cotidiana", bluesky: "Ideas sobre un Internet diferente", youtube: "Pequeñas películas sobre recordar", tiktok: "Pausas en el flujo de contenido", reddit: "Conversaciones que merecen la pena", pinterest: "Apuntes visuales que merece la pena guardar", threads: "Ideas breves, conversaciones abiertas" },
  de: { instagram: "Fragmente aus dem Alltag", bluesky: "Gedanken über ein anderes Internet", youtube: "Kleine Filme über das Erinnern", tiktok: "Unterbrechungen im Feed", reddit: "Gespräche, die sich lohnen", pinterest: "Visuelle Notizen zum Aufbewahren", threads: "Kurze Gedanken, offene Gespräche" },
};
