# WEB-SOC-001 — NoFi Elsewhere: Places We Borrow

Data: 18 ottobre 2026. Candidate: `feature/nofi-elsewhere`.
Base esatta: `1af7b15fd3a7428749a069f3576e0e57dee7863c`.

**Stato: PASS — implementazione tecnica e configurazione della candidate completate.** I sette URL sono stati forniti direttamente dal responsabile del progetto dopo la prima consegna. La sezione è ora visibile nella candidate. Nessun deploy production, merge, modifica DNS o attivazione di servizi esterni è stato eseguito.

## Obiettivo e architettura

La sezione editoriale presenta luoghi di conversazione senza catturare l’attenzione: “We are here. Not to keep you here.” Nessun feed, contatore, SDK social, promessa di frequenza o invito a seguire tutti i canali.

`NoFiElsewhere` è un Server Component condiviso dalle due esperienze. Restituisce `null` se non esistono canali pubblicabili. Gli anchor HTML, le descrizioni e i titoli sono renderizzati dal server; l’intera destinazione è cliccabile, con `target="_blank"`, `rel="noopener noreferrer"`, nome accessibile e avviso localizzato di nuova scheda. Il layout usa palette lavanda e variabili tipografiche esistenti: due colonne da 601 px, una colonna fino a 600 px.

`lib/social-channels.ts` è l’unica configurazione di ID, nome, URL, abilitazione e ordine. Il filtro accetta solo URL HTTPS di profili dei domini previsti, senza credenziali, porte non standard, query, frammenti, homepage generiche o segnaposto riconoscibili. La validazione sintattica non certifica la proprietà dell’account: per questa consegna la fonte degli indirizzi ufficiali è il responsabile del progetto. Non è stata verificata la disponibilità pubblica dei profili sulle piattaforme. I testi sono separati in `lib/elsewhere-copy.ts`, tipizzati per cinque lingue e tutti i canali con `Record<Locale, ...>`.

`ElsewhereThought` è una piccola isola client: prima riflessione iniziale, avanzamento circolare manuale sulle cinque frasi, nessun timer o autoplay, annuncio `aria-live="polite"`, focus conservato. Copie di misura invisibili e nascoste agli screen reader riservano l’altezza della frase più lunga. Non sono presenti animazioni o transizioni.

`SocialExitTracking` aggiunge un listener per `click` e uno per `auxclick` centrale, rimossi correttamente al cambio lingua/unmount. Emette solo `social_exit_click` con `channel`, `placement`, `locale`. Non traccia esposizione o riflessioni, non aggiunge UTM e non impedisce mai la navigazione. Le eccezioni analytics sono intercettate. Nessuna nuova dipendenza.

## Collocazione e rilascio

- Coming Soon: dopo ownership/privacy, immediatamente prima del footer.
- Homepage: dopo le FAQ e prima della CTA conclusiva.
- La preview Vercel della branch `feature/nofi-elsewhere` mostra il sito completo come la candidate di base `codex/private-memories`. L’eccezione in `lib/coming-soon.ts` è limitata a queste due branch e a `VERCEL_ENV=preview`. Il comportamento production del flag `COMING_SOON` rimane invariato, come `lib/site-release.ts`, proxy, routing, SEO e pagine legali.
- Worktree separato dalla copia originale, le cui modifiche preesistenti sono preservate.
- La PR #2 punta a `codex/private-memories`, corrispondente alla base richiesta `1af7b15`; `main` era precedente alla base al momento della creazione.

## File consegnati

Creati: `components/NoFiElsewhere.tsx`, `components/NoFiElsewhere.module.css`, `components/ElsewhereThought.tsx`, `components/SocialExitTracking.tsx`, `lib/social-channels.ts`, `lib/elsewhere-copy.ts`, `scripts/test-elsewhere.mjs`, `scripts/test-elsewhere-browser.mjs`, questo report e quattro screenshot con log finale in `docs/milestones/evidence/WEB-SOC-001/`.

Modificati: `components/HomePage.tsx`, `app/coming-soon/page.tsx`, `lib/coming-soon.ts` (eccezione preview per la candidate), `package.json` (comandi di test), `docs/ANALYTICS_MODEL.md`.

## Configurazione dei canali

| Ordine | Canale / ID | URL fornito dal responsabile | Stato |
| --- | --- | --- | --- |
| 1 | Instagram / `instagram` | https://www.instagram.com/nofi_diary | Abilitato |
| 2 | Bluesky / `bluesky` | https://bsky.app/profile/nofidiary.bsky.social | Abilitato |
| 3 | YouTube / `youtube` | https://www.youtube.com/@NoFiDiary | Abilitato |
| 4 | TikTok / `tiktok` | https://www.tiktok.com/@nofidiary | Abilitato |
| 5 | Reddit / `reddit` | https://www.reddit.com/user/nofi_diary/ | Abilitato |
| 6 | Pinterest / `pinterest` | https://it.pinterest.com/nofidiary/ | Abilitato |
| 7 | X / `x` | https://x.com/NoFiDiary | Abilitato |

Tutti gli URL sono preservati esattamente come forniti, senza parametri aggiunti. Non rimangono canali mancanti nella lista concordata. La lista iniziale della milestone è stata aggiornata su indicazione dell’utente: Pinterest e X aggiunti; il canale professionale inizialmente previsto è stato completamente rimosso da configurazione, traduzioni, tracking e test.

Per modificare un indirizzo, aggiornare `url` in `lib/social-channels.ts`. Per abilitarlo usare `enabled: true`; per disabilitarlo `enabled: false`; per rimuovere l’URL usare `null`. Un URL non valido non viene pubblicato. `order` controlla l’ordine. Le descrizioni si aggiornano in `socialDescriptions` in `lib/elsewhere-copy.ts` per tutte le lingue. Non occorre modificare React; serve una nuova build. Nuovi domini o formati di profilo richiedono la revisione esplicita di validatore e test.

## Matrice delle verifiche finali

| Verifica | Esito | Evidenza / limiti |
| --- | --- | --- |
| `npm run typecheck` | PASS | TypeScript senza errori |
| `npm run build` | PASS | Build production; nessuna route temporanea nella consegna |
| Build con ambiente candidate Vercel | PASS | `VERCEL_ENV=preview`, `VERCEL_GIT_COMMIT_REF=feature/nofi-elsewhere`, `COMING_SOON=true`: HTML delle cinque homepage con `nofi-elsewhere-home` e CTA finale, senza titolo Coming Soon |
| `npm run test:elsewhere` | PASS | Cinque gruppi: flag candidate/production, filtro, sicurezza URL, localizzazione, rendering server |
| `npm run test:elsewhere:browser` | PASS | Chromium headless locale, sette canali forniti dall’utente |
| Configurazione vuota / disabilitata / parziale / non valida | PASS | Test automatici; browser con configurazione temporaneamente vuota nelle cinque route e nelle due modalità |
| Posizionamento, ordine e sette link esatti | PASS | Entrambe le esperienze, tutte le cinque lingue |
| Responsive 320 / 375 / 768 / 1440 px | PASS | 40 combinazioni; nessun overflow pagina/sezione, colonne e touch target verificati |
| Riflessioni e tastiera | PASS | Invio/Spazio, ciclo completo, focus conservato, altezza invariata |
| Navigazione localizzata reale | PASS | Italiano → tedesco, copy aggiornato e riflessione ripristinata |
| Focus e contrasto | PASS | Outline visibile; contrasti testo su lavanda 10,77:1, 6,91:1 e minimo 5,50:1 |
| Reduced motion | PASS | Nessuna animazione, anche con preference `reduce` |
| Link senza JavaScript | PASS | Rendering e apertura nuova scheda nelle due esperienze |
| Link esterni e opener | PASS | Sette destinazioni esatte; nuova scheda e isolamento opener |
| Analytics | PASS | Un evento per attivazione con tre proprietà esatte, incluso Pinterest e X; nessun evento su rendering o riflessioni |
| Analytics assente o in errore | PASS | Navigazione nativa comunque funzionante, nessuna eccezione non gestita |
| Evento clic centrale / destro | PASS | Centrale sintetico emesso una volta, destro ignorato |
| Apertura nativa con clic centrale | NOT RUN | Non osservabile nel precedente tentativo headless |
| Revisione visiva desktop/mobile | PASS | Screenshot italiani a 1440 e 375 px di entrambe le modalità |
| `git diff --check` | PASS | Nessun errore whitespace |
| Screen reader, altri browser e dispositivi fisici | NOT RUN | Semantica e annunci controllati via codice/browser |
| Collaudo esaustivo delle interazioni Fragment/audio preesistenti | NOT RUN | Componenti non modificati |
| Disponibilità remota dei profili | NOT RUN | Indirizzi confermati dall’utente; richieste esterne intercettate durante i test |
| Ricezione analytics in produzione e Web Vitals sul campo | NOT RUN | Nessun rilascio production; l’integrazione locale non dimostra ingestione o prestazioni sul campo |

## Riproduzione ed evidenze

Eseguire `npm run typecheck`, `npm run test:elsewhere`, `npm run build`. La base non prevedeva altri comandi di test.

Per il browser serve Playwright con Chromium, senza aggiungerlo alle dipendenze del sito. `npm run test:elsewhere:browser` accetta `PLAYWRIGHT_MODULE` (percorso assoluto a `index.mjs`), `PLAYWRIGHT_EXECUTABLE_PATH` e `ELSEWHERE_TEST_PORT` (default 3107). Non avviare build/deploy contemporanei nello stesso checkout: l’harness verifica prima la configurazione vuota e poi ripristina i sette indirizzi configurati. Una route locale temporanea consente di renderizzare entrambe le esperienze senza cambiare `COMING_SOON`. Il blocco `finally` ripristina configurazione e file generati, rimuove route e validator temporanei e chiude browser/server. Dopo una terminazione forzata, controllare il ripristino prima di build/deploy.

Tutte le richieste esterne sono intercettate: i clic verificano la destinazione esatta senza visitare le piattaforme. Gli screenshot mostrano i font di fallback del design system. I crop nascondono soltanto l’header sovrapposto della homepage e l’indicatore dev Next, senza rimuovere elementi della sezione. Le evidenze precedenti con canali fittizi sono sostituite dai sette canali configurati.

- [Homepage desktop](evidence/WEB-SOC-001/home-it-1440-CONFIGURED.png)
- [Homepage mobile](evidence/WEB-SOC-001/home-it-375-CONFIGURED.png)
- [Coming Soon desktop](evidence/WEB-SOC-001/coming_soon-it-1440-CONFIGURED.png)
- [Coming Soon mobile](evidence/WEB-SOC-001/coming_soon-it-375-CONFIGURED.png)
- [Log browser finale](evidence/WEB-SOC-001/results.txt)

## Differenze dal concept e attività residue

La lista finale segue gli indirizzi e la correzione forniti dall’utente, con sette destinazioni. Tutte hanno descrizioni nelle cinque lingue. Il brand `NOFI / ELSEWHERE` resta intenzionalmente invariato. La homepage inserisce la sezione dopo le FAQ per accompagnare la CTA finale; entrambe le esperienze usano lo stesso stile editoriale.

Nessun blocco di configurazione residuo. La candidate e la PR sono pronte per revisione. Rimangono le normali verifiche post-rilascio in produzione (analytics e Web Vitals), oltre ai collaudi assistivi e multipiattaforma indicati come NOT RUN; non è stato autorizzato un merge o un deploy production.
