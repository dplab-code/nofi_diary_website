# WEB-SOC-001 — NoFi Elsewhere: Places We Borrow

Data: 18 ottobre 2026. Candidate: `feature/nofi-elsewhere`.
Base esatta: `1af7b15fd3a7428749a069f3576e0e57dee7863c`.

**Esito tecnico: PASS. Attivazione pubblica: PARTIAL, bloccata dai sei URL ufficiali mancanti.** La sezione resta intenzionalmente nascosta nella configurazione consegnata. Nessun deploy production, merge, modifica DNS o attivazione di servizi esterni è stato eseguito.

## Obiettivo e architettura

Una sezione editoriale che presenta luoghi di conversazione senza incoraggiare la cattura dell’attenzione: “We are here. Not to keep you here.” Nessun feed, contatore, SDK social, promessa di frequenza o invito a seguire tutti i canali.

`NoFiElsewhere` è un Server Component condiviso dalle due esperienze. Restituisce `null` se non esistono canali pubblicabili. Gli anchor HTML, le descrizioni e i titoli sono renderizzati dal server; l’intera destinazione è cliccabile, con `target="_blank"`, `rel="noopener noreferrer"`, nome accessibile e avviso localizzato di nuova scheda. Il layout usa la palette lavanda, le variabili tipografiche e le texture già presenti: due colonne da 601 px, una colonna fino a 600 px.

`lib/social-channels.ts` è l’unica configurazione di ID, nome, URL, abilitazione e ordine. Il filtro accetta solo URL HTTPS di profili dei domini previsti, senza credenziali, porte non standard, query, frammenti, homepage generiche o segnaposto riconoscibili. La validazione sintattica **non certifica la proprietà dell’account**: la verifica ufficiale resta necessaria prima dell’inserimento. I testi sono separati dalla configurazione in `lib/elsewhere-copy.ts`, tipizzati per tutte le cinque lingue e tutti i canali secondo la convenzione `Record<Locale, ...>` del repository.

`ElsewhereThought` è una piccola isola client: prima riflessione iniziale, avanzamento circolare manuale sulle cinque frasi, nessun timer o autoplay, annuncio `aria-live="polite"`, focus conservato. Copie di misura invisibili e nascoste agli screen reader riservano l’altezza della frase più lunga per evitare spostamenti durante l’interazione. Non sono presenti animazioni o transizioni.

`SocialExitTracking` aggiunge un solo listener per tipo (`click` e `auxclick` centrale) all’interno della sezione, rimosso e reinstallato correttamente al cambio lingua/unmount. Emette esclusivamente `social_exit_click` con `channel`, `placement`, `locale`. Non traccia esposizione o cambio riflessione, non aggiunge UTM e non impedisce mai la navigazione. Eventuali eccezioni analytics vengono intercettate. Nessuna nuova dipendenza di produzione o test è stata installata.

## Collocazione e rilascio

- Coming Soon: dopo la sezione ownership/privacy, immediatamente prima del footer.
- Homepage: dopo le FAQ e prima della CTA conclusiva, alla fine del percorso di presentazione del prodotto.
- `lib/coming-soon.ts`, `lib/site-release.ts`, proxy, routing, SEO e pagine legali sono invariati.
- La candidate parte esattamente dalla base richiesta e usa un worktree separato. Le modifiche preesistenti nel checkout originale sono state preservate.
- Al momento della preparazione, `main` punta a `4628083`, precedente alla base richiesta. La singola PR è quindi indirizzata a `codex/private-memories`, verificata sul remoto a `1af7b15`, per isolare questa milestone. La scelta non cambia il comportamento del flag `COMING_SOON`.

## File consegnati

Creati:

- `components/NoFiElsewhere.tsx`
- `components/NoFiElsewhere.module.css`
- `components/ElsewhereThought.tsx`
- `components/SocialExitTracking.tsx`
- `lib/social-channels.ts`
- `lib/elsewhere-copy.ts`
- `scripts/test-elsewhere.mjs`
- `scripts/test-elsewhere-browser.mjs`
- Questo report e quattro screenshot con il log finale in `docs/milestones/evidence/WEB-SOC-001/`.

Modificati: `components/HomePage.tsx`, `app/coming-soon/page.tsx`, `package.json` (solo comandi di test), `docs/ANALYTICS_MODEL.md`.

## Stato dei canali e attivazione

La ricerca nel repository non ha individuato profili ufficiali verificati. I riferimenti ai nomi delle piattaforme nel modello analytics e nel Project Hub non contengono URL di account e non costituiscono prova di proprietà.

| Ordine | Canale / ID | URL | Abilitato | Stato |
| --- | --- | --- | --- | --- |
| 1 | Instagram / `instagram` | `null` | no | Mancante |
| 2 | Bluesky / `bluesky` | `null` | no | Mancante |
| 3 | YouTube / `youtube` | `null` | no | Mancante |
| 4 | TikTok / `tiktok` | `null` | no | Mancante |
| 5 | Reddit / `reddit` | `null` | no | Mancante |
| 6 | LinkedIn / `linkedin` | `null` | no | Mancante |

Per attivare un canale, verificare l’URL ufficiale, inserirlo nel suo campo `url` in `lib/social-channels.ts` e impostare `enabled: true`. Un URL valido con `enabled: false` resta escluso. Per disabilitarlo impostare `enabled: false`; per rimuoverlo cancellare l’URL impostandolo a `null`. Cambiare `order` per riordinare. Le descrizioni si modificano in `socialDescriptions` in `lib/elsewhere-copy.ts` per tutte le lingue. Non è necessario modificare i componenti React. Le modifiche richiedono una nuova build; non esiste una configurazione runtime remota. Se il dominio o il formato ufficiale non è fra quelli ammessi, rivedere esplicitamente validatore e test prima di abilitarlo.

## Verifiche eseguite

| Verifica | Esito | Evidenza / limiti |
| --- | --- | --- |
| `npm run typecheck` | PASS | TypeScript senza errori |
| `npm run build` | PASS | Next.js 16.3.0, 68 pagine generate; nessuna route fixture nella build finale |
| `npm run test:elsewhere` | PASS | 4 gruppi: pubblicazione vuota/parziale, sicurezza URL, completezza localizzazione, rendering server in 10 combinazioni lingua/modalità |
| `npm run test:elsewhere:browser` | PASS | Chromium headless locale; log salvato con gli screenshot |
| Configurazione vuota | PASS | Sezione assente nelle cinque route reali localizzate e nelle due esperienze |
| Configurazione parziale/disabilitata/non valida | PASS | Test automatici sul filtro; nessun link fittizio |
| Posizionamento, sei canali e ordine | PASS | Browser nelle due esperienze per tutte le lingue, più rendering server |
| Responsive 320 / 375 / 768 / 1440 px | PASS | 40 combinazioni modalità/lingua/larghezza; nessun overflow di sezione o pagina, numero colonne e touch target verificati |
| Cinque riflessioni, ciclo manuale, tastiera | PASS | Invio e Spazio; nessun cambio focus o altezza della sezione durante il ciclo |
| Navigazione localizzata reale | PASS | Link italiano → tedesco: testi aggiornati e riflessione ripristinata |
| Focus e contrasto | PASS | Outline visibile su link e bottone; contrasti del testo sulla lavanda: 10,77:1, 6,91:1 e minimo 5,50:1 |
| Reduced motion | PASS | Nessuna animazione nell’interazione, verificata anche con media preference `reduce` |
| Link senza JavaScript | PASS | Rendering e apertura nuova scheda nelle due esperienze |
| Nuova scheda e isolamento opener | PASS | Navigazione nativa e `window.opener === null`; tutti i sei canali collaudati con richieste esterne intercettate |
| Evento analytics | PASS | Un evento per attivazione, nome e tre proprietà esatte; zero eventi per rendering e cambio riflessione; listener corretto dopo cambio lingua |
| Analytics assente o in errore | PASS | Il link apre comunque la destinazione; nessuna eccezione browser non gestita |
| Clic centrale / destro | PASS / NOT RUN | Evento centrale sintetico emesso una volta, destro ignorato. Apertura nativa centrale non verificata nel browser headless: il tentativo non ha prodotto una finestra osservabile |
| Revisione visiva desktop/mobile | PASS | Screenshot italiani di entrambe le modalità a 1440 e 375 px, ispezionati |
| `git diff --check` | PASS | Nessun errore whitespace |
| Screen reader reale, altri browser e dispositivi fisici | NOT RUN | Semantica e annunci verificati a livello di codice/browser, senza collaudo assistivo completo |
| Tutte le interazioni preesistenti Fragment/audio | NOT RUN | Nessuna modifica ai componenti esistenti; non eseguito un collaudo funzionale esaustivo |
| Ricezione eventi Vercel in produzione | NOT RUN | L’integrazione locale non dimostra l’ingestione sul servizio; richiede canale attivo e osservazione dashboard |
| Core Web Vitals sul campo | NOT RUN | Nessuna attivazione production; stabilità d’altezza locale verificata, senza equivalenza con una misura CLS/LCP/INP reale |

I primi tentativi di build/test hanno incontrato limiti del sandbox (risoluzione delle dipendenze nel nuovo worktree, EPERM e accesso localhost) e problemi dell’harness locale (versione Chromium, attesa watcher/idratazione, selettore live region e risposta fittizia a script esterni). Risolti nell’ambiente di lavoro e nell’harness: la matrice riporta le esecuzioni finali, senza attribuire questi tentativi a regressioni del prodotto. Nessun workaround è stato aggiunto al comportamento di rilascio.

## Riproduzione ed evidenze visive

Eseguire `npm run typecheck`, `npm run test:elsewhere`, `npm run build`. Non sono presenti altri comandi di test nella base del repository.

Per il browser serve un’installazione esterna di Playwright con Chromium. `npm run test:elsewhere:browser` può usare `PLAYWRIGHT_MODULE` (percorso assoluto al suo `index.mjs`) e, se necessario, `PLAYWRIGHT_EXECUTABLE_PATH`. Il test avvia Next in locale sulla porta 3107, modificabile tramite `ELSEWHERE_TEST_PORT`. Non avviare contemporaneamente build o deploy dallo stesso checkout: l’harness abilita temporaneamente fixture dichiaratamente fittizie e crea una route locale di prova per renderizzare entrambe le esperienze senza modificare `COMING_SOON`. In `finally` ripristina la configurazione, rimuove la route, chiude server/browser e ripristina eventuali file generati da Next. Se il processo viene terminato forzatamente prima del cleanup, controllare e ripristinare questi file prima di build/deploy.

Tutte le richieste a destinazioni esterne, inclusi font e script analytics, sono intercettate. Gli screenshot mostrano pertanto i font di fallback previsti dal design system. I crop isolano la sezione e nascondono soltanto l’header sovrapposto della homepage e l’indicatore di sviluppo Next; nessun elemento della sezione è rimosso. Sono **preview con sei canali fixture**, non evidenze di URL ufficiali attivati. I file finali non contengono tali URL nella configurazione di pubblicazione.

- [Homepage desktop — fixture](evidence/WEB-SOC-001/home-it-1440-FIXTURE.png)
- [Homepage mobile — fixture](evidence/WEB-SOC-001/home-it-375-FIXTURE.png)
- [Coming Soon desktop — fixture](evidence/WEB-SOC-001/coming_soon-it-1440-FIXTURE.png)
- [Coming Soon mobile — fixture](evidence/WEB-SOC-001/coming_soon-it-375-FIXTURE.png)
- [Risultati browser finali](evidence/WEB-SOC-001/results.txt)

## Differenze dal concept e attività residue

Il concept è implementato senza attivare collegamenti non verificati. Il titolo di brand `NOFI / ELSEWHERE` resta intenzionalmente invariato; sottotitolo, messaggio, descrizioni, riflessioni, controllo e avvisi sono localizzati. Il sottotitolo inglese “Places We Borrow” è tradotto nelle altre lingue. La homepage colloca la sezione dopo le FAQ per accompagnare la CTA finale. Nessuna variante visiva distinta è necessaria: entrambe le esperienze condividono lo stesso linguaggio editoriale.

Per la piena attivazione pubblica restano da fornire e verificare gli URL, abilitarne almeno uno e osservare gli eventi in Vercel dopo un rilascio separatamente autorizzato. La candidate è tecnicamente pronta per revisione; l’esito complessivo resta **PARTIAL** finché mancano i canali ufficiali.
