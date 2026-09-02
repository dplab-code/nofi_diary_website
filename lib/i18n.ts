export const locales = ["en", "it", "fr", "es", "de"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = { en: "EN", it: "IT", fr: "FR", es: "ES", de: "DE" };
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const localePath = (locale: Locale, path = "") => path
  ? `${locale === "en" ? "" : `/${locale}`}${path}`
  : locale === "en" ? "/" : `/${locale}`;

type Copy = {
  nav: string[]; heroTitle: string; heroLead: string; getApp: string; seeHow: string; micro: string;
  statement: string; statementSub: string; manifestoLabel: string; manifestoTitle: string; manifestoCopy: string; readManifesto: string;
  featureTitle: string; features: [string, string][]; memoryTitle: string; memories: [string, string][];
  howTitle: string; steps: string[]; capsuleTitle: string; capsuleCopy: string; collectionsTitle: string; collectionsCopy: string;
  collectionCards: [string, string][]; privacyTitle: string; privacyCopy: string; privacyItems: [string, string][];
  galleryTitle: string; compareTitle: string; typical: string; nofi: string; comparison: [string, string][];
  faqTitle: string; faqs: [string, string][]; finalTitle: string; finalCopy: string; footer: string;
};

const en: Copy = {
  nav: ["Features", "How it works", "Collections", "Privacy", "Gallery", "Manifesto"],
  heroTitle: "Your memories. Yours to keep.", heroLead: "NoFi Diary is a private, offline-first creative diary for photos, voice and tactile pages. Keep meaningful moments on your own terms.", getApp: "Get the app", seeHow: "See how it works", micro: "No account required. No public feed.",
  statement: "Not everything should be posted.", statementSub: "Some memories deserve privacy, permanence and intention.",
  manifestoLabel: "The NoFi Manifesto", manifestoTitle: "Your memories don’t need an audience.", manifestoCopy: "A memory is not a performance. NoFi is a quiet place where moments become keepsakes — privately and beautifully.", readManifesto: "Read the NoFi Manifesto",
  featureTitle: "Made for the moments nobody else needs to see.", features: [["Capture", "Add a photo, a voice note, a place and the feeling of the moment."], ["Create", "Arrange stickers, handwriting, tape, textures and themes on a tactile canvas."], ["Keep", "Store it locally, seal it in a Time Capsule, or export it when you choose."]],
  memoryTitle: "A memory can become more than a page.", memories: [["Page", "A single moment made of image, voice and atmosphere."], ["Box", "A curated collection of memories that belong together."], ["Time Capsule", "A memory sealed until the date you choose."], ["Diary", "A personal chronology that remains portable and yours."]],
  howTitle: "How it works", steps: ["Capture a moment", "Add your voice", "Make it yours", "Keep, seal or share it"],
  capsuleTitle: "Some memories are meant for later.", capsuleCopy: "Seal a page or collection until a future date. When the moment arrives, NoFi opens it like a private gift from your past.",
  collectionsTitle: "Make NoFi feel like yours.", collectionsCopy: "Optional creative collections give every page a language of its own.", collectionCards: [["Sticker Packs", "Add visual language to your pages."], ["Themes", "Change paper, texture and atmosphere."], ["Appearances", "Change how the app itself feels."]],
  privacyTitle: "Your memories are not our product.", privacyCopy: "Private by default. Local by design.", privacyItems: [["No account", "Start writing without creating a profile."], ["No public feed", "Nothing is published unless you choose."], ["Local by default", "Your diary lives on your device."], ["Portable by design", "Export memories in formats you control."]],
  galleryTitle: "Made with NoFi", compareTitle: "Why NoFi Diary?", typical: "Typical social apps", nofi: "NoFi Diary", comparison: [["Public by default", "Private by default"], ["Account-centric", "Diary-centric"], ["Cloud-dependent", "Local-first"], ["Built for reactions", "Built for remembrance"], ["Infinite feed", "Personal chronology"], ["Locked in a platform", "Exportable memories"]],
  faqTitle: "Frequently asked questions", faqs: [["Does NoFi require an account?", "No. The core diary works without creating a profile."], ["Are my memories uploaded?", "NoFi is local-first. Content stays on your device unless you export or share it."], ["Can I back up my diary?", "You can export and import pages, Boxes and diary archives."], ["Can I use NoFi offline?", "Yes. Core creation, editing and playback are designed to work offline."]],
  finalTitle: "Your diary, in airplane mode.", finalCopy: "Create your first page without an account, a feed or a cloud dependency.", footer: "A private space for your real memories."
};

const translations: Record<Exclude<Locale, "en">, Partial<Copy>> = {
  it: { nav: ["Funzioni", "Come funziona", "Collezioni", "Privacy", "Galleria", "Manifesto"], heroTitle: "I tuoi ricordi. Da custodire.", heroLead: "NoFi Diary è un diario creativo privato e offline-first per foto, voce e pagine tattili. Conserva i momenti importanti alle tue condizioni.", getApp: "Scarica l’app", seeHow: "Scopri come funziona", micro: "Nessun account. Nessun feed pubblico.", statement: "Non tutto deve essere pubblicato.", statementSub: "Alcuni ricordi meritano privacy, durata e intenzione.", manifestoLabel: "Il Manifesto NoFi", manifestoTitle: "I tuoi ricordi non hanno bisogno di un pubblico.", manifestoCopy: "Un ricordo non è una performance. NoFi è un luogo quieto dove i momenti diventano tesori — in privato, con bellezza.", readManifesto: "Leggi il Manifesto NoFi", featureTitle: "Pensato per i momenti che nessun altro deve vedere.", howTitle: "Come funziona", capsuleTitle: "Alcuni ricordi sono fatti per il futuro.", collectionsTitle: "Rendi NoFi davvero tuo.", privacyTitle: "I tuoi ricordi non sono il nostro prodotto.", galleryTitle: "Creato con NoFi", compareTitle: "Perché NoFi Diary?", faqTitle: "Domande frequenti", finalTitle: "Il tuo diario, in modalità aereo.", finalCopy: "Crea la tua prima pagina senza account, feed o dipendenza dal cloud.", footer: "Uno spazio privato per i tuoi ricordi autentici." },
  fr: { nav: ["Fonctions", "Comment ça marche", "Collections", "Confidentialité", "Galerie", "Manifeste"], heroTitle: "Vos souvenirs. À vous de les garder.", heroLead: "NoFi Diary est un journal créatif privé et hors ligne pour vos photos, votre voix et vos pages tactiles.", getApp: "Obtenir l’app", seeHow: "Voir comment ça marche", micro: "Aucun compte. Aucun fil public.", statement: "Tout ne doit pas être publié.", statementSub: "Certains souvenirs méritent intimité, permanence et intention.", manifestoLabel: "Le Manifeste NoFi", manifestoTitle: "Vos souvenirs n’ont pas besoin d’un public.", manifestoCopy: "Un souvenir n’est pas une performance. NoFi transforme les instants en trésors, discrètement et en privé.", readManifesto: "Lire le Manifeste NoFi", featureTitle: "Pour les moments que personne d’autre n’a besoin de voir.", howTitle: "Comment ça marche", capsuleTitle: "Certains souvenirs sont faits pour plus tard.", collectionsTitle: "Faites de NoFi votre journal.", privacyTitle: "Vos souvenirs ne sont pas notre produit.", galleryTitle: "Créé avec NoFi", compareTitle: "Pourquoi NoFi Diary ?", faqTitle: "Questions fréquentes", finalTitle: "Votre journal, en mode avion.", finalCopy: "Créez votre première page sans compte, fil ni dépendance au cloud.", footer: "Un espace privé pour vos vrais souvenirs." },
  es: { nav: ["Funciones", "Cómo funciona", "Colecciones", "Privacidad", "Galería", "Manifiesto"], heroTitle: "Tus recuerdos. Tuyos para siempre.", heroLead: "NoFi Diary es un diario creativo privado y offline para fotos, voz y páginas táctiles.", getApp: "Descargar la app", seeHow: "Ver cómo funciona", micro: "Sin cuenta. Sin feed público.", statement: "No todo debería publicarse.", statementSub: "Algunos recuerdos merecen privacidad, permanencia e intención.", manifestoLabel: "El Manifiesto NoFi", manifestoTitle: "Tus recuerdos no necesitan público.", manifestoCopy: "Un recuerdo no es una actuación. NoFi convierte momentos en tesoros, en silencio y en privado.", readManifesto: "Leer el Manifiesto NoFi", featureTitle: "Para los momentos que nadie más necesita ver.", howTitle: "Cómo funciona", capsuleTitle: "Algunos recuerdos son para más adelante.", collectionsTitle: "Haz que NoFi sea tuyo.", privacyTitle: "Tus recuerdos no son nuestro producto.", galleryTitle: "Creado con NoFi", compareTitle: "¿Por qué NoFi Diary?", faqTitle: "Preguntas frecuentes", finalTitle: "Tu diario, en modo avión.", finalCopy: "Crea tu primera página sin cuenta, feed ni dependencia de la nube.", footer: "Un espacio privado para tus recuerdos reales." },
  de: { nav: ["Funktionen", "So funktioniert’s", "Sammlungen", "Privatsphäre", "Galerie", "Manifest"], heroTitle: "Deine Erinnerungen. Für dich bewahrt.", heroLead: "NoFi Diary ist ein privates, offline verfügbares Kreativtagebuch für Fotos, Stimme und haptische Seiten.", getApp: "App laden", seeHow: "So funktioniert’s", micro: "Kein Konto. Kein öffentlicher Feed.", statement: "Nicht alles sollte gepostet werden.", statementSub: "Manche Erinnerungen verdienen Privatsphäre, Beständigkeit und Achtsamkeit.", manifestoLabel: "Das NoFi Manifest", manifestoTitle: "Deine Erinnerungen brauchen kein Publikum.", manifestoCopy: "Eine Erinnerung ist keine Darbietung. NoFi macht Momente still und privat zu Andenken.", readManifesto: "Das NoFi Manifest lesen", featureTitle: "Für Momente, die niemand sonst sehen muss.", howTitle: "So funktioniert’s", capsuleTitle: "Manche Erinnerungen sind für später.", collectionsTitle: "Mach NoFi zu deinem Ort.", privacyTitle: "Deine Erinnerungen sind nicht unser Produkt.", galleryTitle: "Mit NoFi gestaltet", compareTitle: "Warum NoFi Diary?", faqTitle: "Häufige Fragen", finalTitle: "Dein Tagebuch im Flugmodus.", finalCopy: "Erstelle deine erste Seite ohne Konto, Feed oder Cloud-Abhängigkeit.", footer: "Ein privater Ort für deine echten Erinnerungen." }
};

const localizedDetails: Record<Exclude<Locale,"en">, Partial<Copy>> = {
  it: {
    features:[["Cattura","Aggiungi una foto, una nota vocale, un luogo e la sensazione del momento."],["Crea","Disponi sticker, scrittura, nastri, texture e temi su una tela tattile."],["Custodisci","Conserva tutto in locale, sigillalo in una Time Capsule oppure esportalo quando vuoi."]],
    memoryTitle:"Un ricordo può diventare più di una pagina.", memories:[["Pagina","Un singolo momento fatto di immagine, voce e atmosfera."],["Box","Una raccolta curata di ricordi che appartengono alla stessa storia."],["Time Capsule","Un ricordo sigillato fino alla data che scegli."],["Diario","Una cronologia personale, portatile e davvero tua."]],
    steps:["Cattura un momento","Aggiungi la tua voce","Rendilo tuo","Custodiscilo, sigillalo o condividilo"], capsuleCopy:"Sigilla una pagina o una raccolta fino a una data futura. Quando arriva il momento, NoFi la apre come un regalo privato dal tuo passato.",
    collectionsCopy:"Collezioni creative facoltative per dare alle pagine il tuo linguaggio.", collectionCards:[["Sticker Pack","Aggiungi un linguaggio visivo alle tue pagine."],["Temi","Cambia carta, texture e atmosfera."],["Aspetti","Cambia il modo in cui si presenta l’app."]],
    privacyCopy:"Privato per impostazione predefinita. Locale per progettazione.", privacyItems:[["Nessun account","Inizia a scrivere senza creare un profilo."],["Nessun feed pubblico","Nulla viene pubblicato senza una tua scelta."],["Locale per impostazione predefinita","Il diario vive sul tuo dispositivo."],["Portatile per progettazione","Esporta i ricordi in formati che controlli."]],
    typical:"Le tipiche app social", nofi:"NoFi Diary", comparison:[["Pubblico per impostazione predefinita","Privato per impostazione predefinita"],["Centrato sull’account","Centrato sul diario"],["Dipendente dal cloud","Local-first"],["Pensato per le reazioni","Pensato per ricordare"],["Feed infinito","Cronologia personale"],["Bloccato nella piattaforma","Ricordi esportabili"]],
    faqs:[["NoFi richiede un account?","No. Il diario essenziale funziona senza creare un profilo."],["I miei ricordi vengono caricati online?","NoFi è local-first. I contenuti restano sul dispositivo finché non scegli di esportarli o condividerli."],["Posso fare un backup del diario?","Puoi esportare e importare pagine, Box e archivi del diario."],["Posso usare NoFi offline?","Sì. Creazione, modifica e riproduzione essenziali sono progettate per funzionare offline."]]
  },
  fr: {
    features:[["Capturer","Ajoutez une photo, une note vocale, un lieu et l’émotion du moment."],["Créer","Disposez stickers, écriture, rubans, textures et thèmes sur une toile tactile."],["Garder","Conservez localement, scellez dans une capsule temporelle ou exportez quand vous le souhaitez."]],
    memoryTitle:"Un souvenir peut devenir plus qu’une page.", memories:[["Page","Un instant composé d’image, de voix et d’atmosphère."],["Boîte","Une collection choisie de souvenirs liés."],["Capsule temporelle","Un souvenir scellé jusqu’à la date choisie."],["Journal","Une chronologie personnelle, portable et à vous."]],
    steps:["Capturer un instant","Ajouter votre voix","Le rendre unique","Le garder, le sceller ou le partager"], capsuleCopy:"Scellez une page ou une collection jusqu’à une date future. Le moment venu, NoFi l’ouvre comme un cadeau privé de votre passé.",
    collectionsCopy:"Des collections créatives facultatives pour donner votre langage aux pages.", collectionCards:[["Packs de stickers","Ajoutez un langage visuel à vos pages."],["Thèmes","Changez le papier, la texture et l’atmosphère."],["Apparences","Changez la façon dont l’application elle-même se présente."]],
    privacyCopy:"Privé par défaut. Local par conception.", privacyItems:[["Aucun compte","Commencez à écrire sans créer de profil."],["Aucun fil public","Rien n’est publié sans votre décision."],["Local par défaut","Votre journal vit sur votre appareil."],["Portable par conception","Exportez vos souvenirs dans des formats que vous contrôlez."]],
    typical:"Applications sociales classiques", nofi:"NoFi Diary", comparison:[["Public par défaut","Privé par défaut"],["Centré sur le compte","Centré sur le journal"],["Dépendant du cloud","Local-first"],["Conçu pour les réactions","Conçu pour se souvenir"],["Fil infini","Chronologie personnelle"],["Enfermé dans une plateforme","Souvenirs exportables"]],
    faqs:[["NoFi nécessite-t-il un compte ?","Non. Le journal principal fonctionne sans créer de profil."],["Mes souvenirs sont-ils envoyés en ligne ?","NoFi est local-first. Le contenu reste sur votre appareil sauf si vous choisissez de l’exporter ou de le partager."],["Puis-je sauvegarder mon journal ?","Vous pouvez exporter et importer pages, Boîtes et archives du journal."],["Puis-je utiliser NoFi hors ligne ?","Oui. La création, la modification et la lecture principales sont conçues pour fonctionner hors ligne."]]
  },
  es: {
    features:[["Captura","Añade una foto, una nota de voz, un lugar y la emoción del momento."],["Crea","Combina stickers, escritura, cintas, texturas y temas en un lienzo táctil."],["Guarda","Consérvalo localmente, séllalo en una cápsula del tiempo o expórtalo cuando quieras."]],
    memoryTitle:"Un recuerdo puede ser más que una página.", memories:[["Página","Un momento hecho de imagen, voz y atmósfera."],["Caja","Una colección cuidada de recuerdos relacionados."],["Cápsula del tiempo","Un recuerdo sellado hasta la fecha que elijas."],["Diario","Una cronología personal, portátil y tuya."]],
    steps:["Captura un momento","Añade tu voz","Hazlo tuyo","Guárdalo, séllalo o compártelo"], capsuleCopy:"Sella una página o colección hasta una fecha futura. Cuando llegue el momento, NoFi la abrirá como un regalo privado de tu pasado.",
    collectionsCopy:"Colecciones creativas opcionales para dar a las páginas tu propio lenguaje.", collectionCards:[["Packs de stickers","Añade un lenguaje visual a tus páginas."],["Temas","Cambia el papel, la textura y la atmósfera."],["Apariencias","Cambia la sensación de la propia aplicación."]],
    privacyCopy:"Privado de forma predeterminada. Local por diseño.", privacyItems:[["Sin cuenta","Empieza a escribir sin crear un perfil."],["Sin feed público","Nada se publica sin que tú lo decidas."],["Local por defecto","Tu diario vive en tu dispositivo."],["Portátil por diseño","Exporta recuerdos en formatos que controlas."]],
    typical:"Aplicaciones sociales típicas", nofi:"NoFi Diary", comparison:[["Público por defecto","Privado por defecto"],["Centrado en la cuenta","Centrado en el diario"],["Dependiente de la nube","Local-first"],["Diseñado para reacciones","Diseñado para recordar"],["Feed infinito","Cronología personal"],["Encerrado en una plataforma","Recuerdos exportables"]],
    faqs:[["¿NoFi necesita una cuenta?","No. El diario esencial funciona sin crear un perfil."],["¿Se suben mis recuerdos?","NoFi es local-first. El contenido permanece en tu dispositivo salvo que decidas exportarlo o compartirlo."],["¿Puedo hacer una copia del diario?","Puedes exportar e importar páginas, Cajas y archivos del diario."],["¿Puedo usar NoFi sin conexión?","Sí. La creación, edición y reproducción esenciales están diseñadas para funcionar sin conexión."]]
  },
  de: {
    features:[["Festhalten","Füge ein Foto, eine Sprachnotiz, einen Ort und das Gefühl des Moments hinzu."],["Gestalten","Arrangiere Sticker, Handschrift, Klebeband, Texturen und Themes auf einer haptischen Fläche."],["Bewahren","Speichere lokal, versiegle in einer Zeitkapsel oder exportiere, wann du möchtest."]],
    memoryTitle:"Eine Erinnerung kann mehr als eine Seite werden.", memories:[["Seite","Ein Moment aus Bild, Stimme und Atmosphäre."],["Box","Eine kuratierte Sammlung zusammengehöriger Erinnerungen."],["Zeitkapsel","Eine Erinnerung, versiegelt bis zu deinem gewählten Datum."],["Tagebuch","Eine persönliche Chronologie, tragbar und ganz deine."]],
    steps:["Einen Moment festhalten","Deine Stimme hinzufügen","Ihn persönlich gestalten","Bewahren, versiegeln oder teilen"], capsuleCopy:"Versiegle eine Seite oder Sammlung bis zu einem zukünftigen Datum. Wenn es so weit ist, öffnet NoFi sie wie ein privates Geschenk aus deiner Vergangenheit.",
    collectionsCopy:"Optionale kreative Sammlungen geben deinen Seiten eine eigene Sprache.", collectionCards:[["Sticker-Pakete","Gib deinen Seiten eine visuelle Sprache."],["Themes","Verändere Papier, Textur und Atmosphäre."],["Erscheinungsbilder","Verändere, wie sich die App selbst anfühlt."]],
    privacyCopy:"Standardmäßig privat. Lokal konzipiert.", privacyItems:[["Kein Konto","Beginne ohne ein Profil anzulegen."],["Kein öffentlicher Feed","Nichts wird ohne deine Entscheidung veröffentlicht."],["Standardmäßig lokal","Dein Tagebuch lebt auf deinem Gerät."],["Tragbar konzipiert","Exportiere Erinnerungen in kontrollierbaren Formaten."]],
    typical:"Typische Social Apps", nofi:"NoFi Diary", comparison:[["Standardmäßig öffentlich","Standardmäßig privat"],["Kontozentriert","Tagebuchzentriert"],["Cloud-abhängig","Local-first"],["Für Reaktionen gebaut","Für Erinnerungen gebaut"],["Endloser Feed","Persönliche Chronologie"],["An eine Plattform gebunden","Exportierbare Erinnerungen"]],
    faqs:[["Benötigt NoFi ein Konto?","Nein. Das zentrale Tagebuch funktioniert ohne Profil."],["Werden meine Erinnerungen hochgeladen?","NoFi ist local-first. Inhalte bleiben auf deinem Gerät, bis du sie exportierst oder teilst."],["Kann ich mein Tagebuch sichern?","Du kannst Seiten, Boxen und Tagebucharchive exportieren und importieren."],["Kann ich NoFi offline verwenden?","Ja. Erstellen, Bearbeiten und Wiedergeben sind für die Offline-Nutzung ausgelegt."]]
  }
};

export const copy = (locale: Locale): Copy => ({ ...en, ...(locale === "en" ? {} : localizedDetails[locale]), ...(locale === "en" ? {} : translations[locale]) });

const manifestoEn = `Your memories don't need an audience.

For years we've been taught that every meaningful moment should be shared.

Published.\nLiked.\nMeasured.

We stopped collecting memories.\nWe started producing content.

NoFi was born from the opposite idea.\nA memory is not a performance.

A photograph isn't complete because it gets thousands of views.\nA voice note doesn't become more valuable because someone reacts to it.\nThe moments that shape our lives often happen when nobody is watching.\nNoFi exists for those moments.

Ownership matters.\nYour memories belong to you.\nNot to an algorithm.\nNot to a cloud service.\nNot to a timeline optimized for engagement.

When you create something with NoFi, it lives on your device.\nYou decide if it stays private.\nYou decide if it travels.\nYou decide if it disappears.

Technology should disappear.\nJournaling shouldn't feel like managing files.\nOr folders.\nOr databases.

It should feel like placing a photograph inside a notebook.\nAdding a piece of tape.\nDrawing a small star.\nRecording the sound of the rain.\nThen closing the page.

Memory is multisensory.\nA picture captures what happened.\nA voice captures how it felt.\nA small doodle can say more than a paragraph.

Every page is made of fragments.\nTogether they become something larger than documentation.\nThey become atmosphere.

Offline is not a limitation.\nOffline is freedom.\nNo waiting.\nNo accounts.\nNo servers deciding when your memories are available.

Your diary should work on a mountain.\nOn a train.\nOn a plane.\nTwenty years from now.

Sharing should be intentional.\nNot everything deserves a feed.\nSome memories deserve proximity.\nA trusted person.\nA nearby device.\nA deliberate gesture.\nBecause intimacy has value precisely because it isn't automatic.

Time deserves texture.\nDigital life flattened everything.\nWe want paper.\nTape.\nInk.\nImperfections.\nLayers.\nThings that look touched by human hands.

Because memories aren't sterile.\nNeither should your diary be.

We believe in slow technology.\nTechnology should help us remember.\nNot distract us from remembering.\nNo endless scrolling.\nNo engagement loops.\nNo pressure to come back tomorrow.

If you open NoFi after six months,\nit should simply be happy to see you again.

This is NoFi.\nNot a social network.\nNot a cloud gallery.\nNot a productivity app.\nA place where moments become keepsakes.

Quietly.\nPrivately.\nBeautifully.`;

const translatedManifestos: Record<Exclude<Locale, "en">, string> = {
  it: `I tuoi ricordi non hanno bisogno di un pubblico.

Per anni ci hanno insegnato che ogni momento importante dovesse essere condiviso.

Pubblicato.\nApprezzato.\nMisurato.

Abbiamo smesso di raccogliere ricordi.\nAbbiamo iniziato a produrre contenuti.

NoFi è nato dall’idea opposta.\nUn ricordo non è una performance.

Una fotografia non è completa perché ottiene migliaia di visualizzazioni.\nUna nota vocale non acquista valore perché qualcuno reagisce.\nI momenti che plasmano la nostra vita spesso accadono quando nessuno guarda.\nNoFi esiste per quei momenti.

La proprietà conta.\nI tuoi ricordi appartengono a te.\nNon a un algoritmo.\nNon a un servizio cloud.\nNon a una timeline ottimizzata per il coinvolgimento.

Quando crei qualcosa con NoFi, vive sul tuo dispositivo.\nDecidi tu se rimane privato.\nDecidi tu se viaggia.\nDecidi tu se scompare.

La tecnologia dovrebbe scomparire.\nScrivere un diario non dovrebbe sembrare una gestione di file.\nO cartelle.\nO database.

Dovrebbe sembrare di mettere una fotografia in un quaderno.\nAggiungere un pezzo di nastro.\nDisegnare una piccola stella.\nRegistrare il suono della pioggia.\nPoi chiudere la pagina.

La memoria è multisensoriale.\nUn’immagine cattura ciò che è accaduto.\nUna voce cattura come ci siamo sentiti.\nUn piccolo disegno può dire più di un paragrafo.

Ogni pagina è fatta di frammenti.\nInsieme diventano qualcosa di più grande della documentazione.\nDiventano atmosfera.

Offline non è un limite.\nOffline è libertà.\nNessuna attesa.\nNessun account.\nNessun server che decide quando i tuoi ricordi sono disponibili.

Il tuo diario dovrebbe funzionare su una montagna.\nSu un treno.\nSu un aereo.\nTra vent’anni.

Condividere dovrebbe essere intenzionale.\nNon tutto merita un feed.\nAlcuni ricordi meritano vicinanza.\nUna persona fidata.\nUn dispositivo vicino.\nUn gesto deliberato.\nPerché l’intimità ha valore proprio perché non è automatica.

Il tempo merita consistenza.\nLa vita digitale ha appiattito tutto.\nVogliamo carta.\nNastro.\nInchiostro.\nImperfezioni.\nStrati.\nCose che sembrano toccate da mani umane.

Perché i ricordi non sono sterili.\nE nemmeno il tuo diario dovrebbe esserlo.

Crediamo nella tecnologia lenta.\nLa tecnologia dovrebbe aiutarci a ricordare.\nNon distrarci dal ricordo.\nNessuno scorrimento infinito.\nNessun circuito di coinvolgimento.\nNessuna pressione a tornare domani.

Se apri NoFi dopo sei mesi,\ndovrebbe semplicemente essere felice di rivederti.

Questo è NoFi.\nNon un social network.\nNon una galleria cloud.\nNon un’app di produttività.\nUn luogo dove i momenti diventano tesori.

In silenzio.\nIn privato.\nCon bellezza.`,
  fr: `Vos souvenirs n’ont pas besoin d’un public.

Pendant des années, on nous a appris que chaque moment important devait être partagé.

Publié.\nAimé.\nMesuré.

Nous avons cessé de collectionner des souvenirs.\nNous avons commencé à produire du contenu.

NoFi est né de l’idée inverse.\nUn souvenir n’est pas une performance.

Une photographie n’est pas accomplie parce qu’elle reçoit des milliers de vues.\nUne note vocale ne gagne pas en valeur parce que quelqu’un y réagit.\nLes moments qui façonnent nos vies arrivent souvent quand personne ne regarde.\nNoFi existe pour ces moments.

La propriété compte.\nVos souvenirs vous appartiennent.\nPas à un algorithme.\nPas à un service cloud.\nPas à une chronologie optimisée pour l’engagement.

Ce que vous créez avec NoFi vit sur votre appareil.\nVous décidez si cela reste privé.\nVous décidez si cela voyage.\nVous décidez si cela disparaît.

La technologie devrait s’effacer.\nTenir un journal ne devrait pas ressembler à la gestion de fichiers.\nDe dossiers.\nOu de bases de données.

Cela devrait ressembler au geste de glisser une photo dans un carnet.\nAjouter un morceau de ruban.\nDessiner une petite étoile.\nEnregistrer le bruit de la pluie.\nPuis refermer la page.

La mémoire est multisensorielle.\nUne image saisit ce qui s’est passé.\nUne voix saisit ce que l’on a ressenti.\nUn petit dessin peut en dire plus qu’un paragraphe.

Chaque page est faite de fragments.\nEnsemble, ils deviennent plus qu’une documentation.\nIls deviennent une atmosphère.

Hors ligne n’est pas une limite.\nHors ligne, c’est la liberté.\nPas d’attente.\nPas de compte.\nPas de serveur décidant quand vos souvenirs sont disponibles.

Votre journal devrait fonctionner sur une montagne.\nDans un train.\nDans un avion.\nDans vingt ans.

Le partage devrait être intentionnel.\nTout ne mérite pas un fil.\nCertains souvenirs méritent la proximité.\nUne personne de confiance.\nUn appareil proche.\nUn geste délibéré.\nCar l’intimité a de la valeur précisément parce qu’elle n’est pas automatique.

Le temps mérite de la texture.\nLa vie numérique a tout aplati.\nNous voulons du papier.\nDu ruban.\nDe l’encre.\nDes imperfections.\nDes couches.\nDes choses qui semblent touchées par des mains humaines.

Les souvenirs ne sont pas stériles.\nVotre journal ne devrait pas l’être non plus.

Nous croyons en une technologie lente.\nLa technologie devrait nous aider à nous souvenir.\nPas nous en détourner.\nPas de défilement infini.\nPas de boucles d’engagement.\nPas de pression pour revenir demain.

Si vous ouvrez NoFi après six mois,\nil devrait simplement être heureux de vous revoir.

Voici NoFi.\nPas un réseau social.\nPas une galerie cloud.\nPas une application de productivité.\nUn lieu où les moments deviennent des trésors.

Discrètement.\nEn privé.\nAvec beauté.`,
  es: `Tus recuerdos no necesitan público.

Durante años nos enseñaron que todo momento importante debía compartirse.

Publicado.\nAprobado.\nMedido.

Dejamos de coleccionar recuerdos.\nEmpezamos a producir contenido.

NoFi nació de la idea contraria.\nUn recuerdo no es una actuación.

Una fotografía no está completa porque consiga miles de visitas.\nUna nota de voz no vale más porque alguien reaccione.\nLos momentos que dan forma a nuestra vida suelen ocurrir cuando nadie mira.\nNoFi existe para esos momentos.

La propiedad importa.\nTus recuerdos te pertenecen.\nNo a un algoritmo.\nNo a un servicio en la nube.\nNo a una cronología optimizada para generar interacción.

Cuando creas algo con NoFi, vive en tu dispositivo.\nTú decides si permanece privado.\nTú decides si viaja.\nTú decides si desaparece.

La tecnología debería desaparecer.\nEscribir un diario no debería parecerse a gestionar archivos.\nO carpetas.\nO bases de datos.

Debería sentirse como colocar una fotografía en un cuaderno.\nAñadir un trozo de cinta.\nDibujar una pequeña estrella.\nGrabar el sonido de la lluvia.\nY cerrar la página.

La memoria es multisensorial.\nUna imagen captura lo que ocurrió.\nUna voz captura cómo se sintió.\nUn pequeño dibujo puede decir más que un párrafo.

Cada página está hecha de fragmentos.\nJuntos se convierten en algo más grande que la documentación.\nSe convierten en atmósfera.

Sin conexión no es una limitación.\nSin conexión es libertad.\nSin esperas.\nSin cuentas.\nSin servidores que decidan cuándo están disponibles tus recuerdos.

Tu diario debería funcionar en una montaña.\nEn un tren.\nEn un avión.\nDentro de veinte años.

Compartir debería ser intencional.\nNo todo merece un feed.\nAlgunos recuerdos merecen cercanía.\nUna persona de confianza.\nUn dispositivo cercano.\nUn gesto deliberado.\nPorque la intimidad tiene valor precisamente porque no es automática.

El tiempo merece textura.\nLa vida digital lo ha aplanado todo.\nQueremos papel.\nCinta.\nTinta.\nImperfecciones.\nCapas.\nCosas que parezcan tocadas por manos humanas.

Porque los recuerdos no son estériles.\nTu diario tampoco debería serlo.

Creemos en la tecnología lenta.\nLa tecnología debería ayudarnos a recordar.\nNo distraernos del recuerdo.\nSin desplazamiento infinito.\nSin bucles de interacción.\nSin presión para volver mañana.

Si abres NoFi después de seis meses,\nsimplemente debería alegrarse de volver a verte.

Esto es NoFi.\nNo una red social.\nNo una galería en la nube.\nNo una aplicación de productividad.\nUn lugar donde los momentos se convierten en tesoros.

En silencio.\nEn privado.\nCon belleza.`,
  de: `Deine Erinnerungen brauchen kein Publikum.

Jahrelang wurde uns beigebracht, dass jeder bedeutende Moment geteilt werden sollte.

Veröffentlicht.\nGeliked.\nGemessen.

Wir hörten auf, Erinnerungen zu sammeln.\nWir begannen, Inhalte zu produzieren.

NoFi entstand aus der gegenteiligen Idee.\nEine Erinnerung ist keine Darbietung.

Ein Foto ist nicht vollkommener, weil es tausende Aufrufe erhält.\nEine Sprachnachricht wird nicht wertvoller, weil jemand darauf reagiert.\nDie Momente, die unser Leben prägen, geschehen oft, wenn niemand zusieht.\nFür diese Momente gibt es NoFi.

Eigentum zählt.\nDeine Erinnerungen gehören dir.\nNicht einem Algorithmus.\nNicht einem Cloud-Dienst.\nNicht einer auf Interaktion optimierten Timeline.

Was du mit NoFi erschaffst, lebt auf deinem Gerät.\nDu entscheidest, ob es privat bleibt.\nDu entscheidest, ob es reist.\nDu entscheidest, ob es verschwindet.

Technologie sollte verschwinden.\nTagebuchschreiben sollte sich nicht wie Dateiverwaltung anfühlen.\nOder Ordnerverwaltung.\nOder Datenbankpflege.

Es sollte sich anfühlen, als legte man ein Foto in ein Notizbuch.\nEin Stück Klebeband hinzufügen.\nEinen kleinen Stern zeichnen.\nDas Geräusch des Regens aufnehmen.\nDann die Seite schließen.

Erinnerung spricht alle Sinne an.\nEin Bild hält fest, was geschah.\nEine Stimme hält fest, wie es sich anfühlte.\nEine kleine Zeichnung kann mehr sagen als ein Absatz.

Jede Seite besteht aus Fragmenten.\nGemeinsam werden sie zu mehr als Dokumentation.\nSie werden Atmosphäre.

Offline ist keine Einschränkung.\nOffline ist Freiheit.\nKein Warten.\nKeine Konten.\nKeine Server, die entscheiden, wann deine Erinnerungen verfügbar sind.

Dein Tagebuch sollte auf einem Berg funktionieren.\nIn einem Zug.\nIn einem Flugzeug.\nIn zwanzig Jahren.

Teilen sollte bewusst geschehen.\nNicht alles verdient einen Feed.\nManche Erinnerungen verdienen Nähe.\nEinen vertrauten Menschen.\nEin Gerät in der Nähe.\nEine bewusste Geste.\nDenn Intimität ist gerade deshalb wertvoll, weil sie nicht automatisch ist.

Zeit verdient Struktur.\nDas digitale Leben hat alles geglättet.\nWir wollen Papier.\nKlebeband.\nTinte.\nUnvollkommenheiten.\nSchichten.\nDinge, die von menschlichen Händen berührt aussehen.

Denn Erinnerungen sind nicht steril.\nDein Tagebuch sollte es auch nicht sein.

Wir glauben an langsame Technologie.\nTechnologie sollte uns helfen, uns zu erinnern.\nUns nicht davon ablenken.\nKein endloses Scrollen.\nKeine Engagement-Schleifen.\nKein Druck, morgen zurückzukehren.

Wenn du NoFi nach sechs Monaten öffnest,\nsollte es sich einfach freuen, dich wiederzusehen.

Das ist NoFi.\nKein soziales Netzwerk.\nKeine Cloud-Galerie.\nKeine Produktivitäts-App.\nEin Ort, an dem Momente zu Andenken werden.

Still.\nPrivat.\nWunderschön.`
};

export const manifesto = (locale: Locale) => ({
  title: copy(locale).manifestoLabel,
  blocks: (locale === "en" ? manifestoEn : translatedManifestos[locale]).split("\n\n").map(block => block.split("\n"))
});
