# NoFi Diary — Public Launch Readiness candidate

Data: 20 ottobre 2026, Europe/Rome. Branch: `codex/public-launch-readiness`.
Base e rollback della precedente candidate: `1ab82c3ef070f90e6fcfa8cf574c1c77be6712b8`.

**Candidate tecnica: PASS. FINAL DECISION per lo switch pubblico: NO-GO.**

Questa consegna prepara una nuova candidate del **sito completo**, non pubblica il sito né l’app. L’utente ha confermato che l’app non è ancora pubblicata: l’indisponibilità pubblica della scheda Google Play è attesa e non significa che il package URL sia errato. Non sono stati eseguiti merge, promozioni production, cambi DNS, invii IndexNow o richieste di indicizzazione.

## Le quattro variazioni richieste

1. X rimosso dalla configurazione, dai testi attivi e dai test.
2. Threads inserito al suo posto: `https://www.threads.com/@nofi_diary`, con descrizioni EN/IT/FR/ES/DE. Nessun LinkedIn. Le sette destinazioni sono Instagram, Bluesky, YouTube, TikTok, Reddit, Pinterest e Threads.
3. Google Play centralizzato in `lib/store.ts`: `https://play.google.com/store/apps/details?id=com.nofi.nofi_diary`. Usato da header, homepage, Explore e JSON-LD. Il package è confermato da `nofi_diary/android/app/build.gradle` e dai report Alpha build 26/28; il track non cambia l’application ID. L’accesso reale resta determinato dalla distribuzione Play.
4. `MetricoolTracker` nel root layout carica lo script richiesto dopo l’idratazione con hash `4b1f47aa5bdf6604eecdfb061d2c5e42`. Un solo loader, una chiamata iniziale e una per navigazione client a un pathname diverso; nessuna duplicazione da render, nessuna interferenza se bloccato. La sezione dei servizi del sito nella privacy è aggiornata nelle cinque lingue, versione 1.2 del 20 ottobre; i claim dell’app sono preservati.

Lo script Metricool letto il 20 ottobre trasmette URL completo, dimensioni finestra e referrer con una richiesta immagine a `tracker.metricool.com/c3po.jpg`. Non scrive cookie o localStorage nel codice osservato. Il fornitore descrive il visit tracker come privo di cookie e identificativi memorizzati: [documentazione del tracker](https://help.metricool.com/how-to-connect-your-website-or-blog-to-metricool-ejuy1), [chiarimento privacy](https://help.metricool.com/use-of-cookies-in-metricool-v5dg7). Non vengono fatte promesse autonome sulla conservazione backend. La decisione di aggiungere questo fornitore è esplicita nella richiesta dell’utente; non è telemetria dell’app. Ricezione in dashboard e configurazione contrattuale/retention restano da verificare prima del lancio.

## Release safety e indicizzazione

`resolveRelease` in `lib/release-config.ts` è la sorgente unica usata da `lib/coming-soon.ts` e `lib/site-release.ts`.

| Stato | Risultato |
| --- | --- |
| Preview Coming Soon | Consentita, sempre noindex |
| Preview sito completo (`COMING_SOON=false`, `SITE_RELEASE_MODE=preview`, `INDEXABLE=false`) | Consentita, sempre noindex |
| Preview con `INDEXABLE=true` accidentalmente ereditato | Rimane noindex: la preview prevale sul flag |
| Production Coming Soon | Consentita, indicizzazione secondo `INDEXABLE` |
| Production completa: `false / public / true` | Unica combinazione valida per il lancio |
| Production completa con release mode preview o INDEXABLE diverso da true | Eccezione esplicita `NO-GO`, rilevata durante build/caricamento |
| Flag di produzione con valori non riconosciuti | Eccezione `NO-GO` |

La nuova branch è inclusa nell’eccezione preview del sito completo, come le due candidate precedenti. Nessuna eccezione vale in production. L’ambiente production è quello dichiarato da Vercel (`VERCEL_ENV=production`); eventuale hosting diverso deve fornire esplicitamente un’identificazione equivalente prima del rilascio.

Il proxy mantiene `Content-Language` e imposta `X-Robots-Tag: noindex, nofollow` quando la release non è indicizzabile o l’host è localhost/`.vercel.app`. In preview anche i metadata sono noindex, il robots nega il crawling e la sitemap è vuota: nessuna ambiguità con una release pubblica.

Nella configurazione pubblica il robots consente `/`, esclude `/coming-soon` e dichiara la sitemap ufficiale. Terms e Disclaimer sono crawlable per leggere i rispettivi `noindex, follow`, ma sono esclusi dalla sitemap e dal cluster organico.

La sitemap pubblica contiene esattamente 50 URL: sette gruppi fissi × cinque lingue più tre Fragment pubblicati × cinque lingue. Ogni entry ha sei alternates, compreso `x-default`. Nessun draft, Coming Soon, Terms, Disclaimer o route di test.

## Metadata, struttura e contenuto

- `content/seo.ts`: title e description delle cinque homepage separati dal copy editoriale; canonical assoluti, hreflang reciproci e `x-default`, OpenGraph localizzati con locale e quattro alternate locale, immagine coerente e Twitter card.
- Homepage, Manifesto, quattro Explore, Privacy e Fragment condividono gli invarianti SEO; i metadata editoriali e l’OpenGraph specifico dei Fragment restano preservati.
- JSON-LD `MobileApplication`: nome, URL, lingua, descrizione, Android, categoria LifestyleApplication, downloadUrl. Nessun prezzo, rating, recensione, premio o conteggio inventato. Non viene promesso un rich result Google: il markup non inventa offers/rating per inseguirne i requisiti.
- H1 del brand e `lib/i18n.ts` invariati; un H1 per pagina verificato. Le FAQ esistenti e i relativi limiti sono conservati. Nessuna nuova landing, nessun blog e nessuna riscrittura del Manifesto.
- Fragment nel sito completo: `SiteHeader` e `SiteFooter`, navigazione locale, link a homepage/privacy/Manifesto. Il Fragment 002 usa il layout editoriale accessibile invece del canvas Coming Soon con hotspot; il canvas rimane disponibile nella modalità Coming Soon.
- Le immagini già decorative mantengono alt vuoto. Gli screenshot rilevanti dei ricordi reali hanno alt localizzato e dimensioni intrinseche. Restano `next/image`, sizes responsive e le immagini editoriali esistenti.

## Audit dei claim e blocker reali

Fonti: `docs/PRELAUNCH_PRIVACY_CLAIMS.md`, `content/legal.ts`, codice Android/Flutter e report locali della app. Non è stata modificata l’app né la policy per far coincidere artificialmente marketing e prodotto.

| Claim | Evidenza | Esito |
| --- | --- | --- |
| Nessun account / feed pubblico | Claim set approvato, UI del sito e struttura corrente app; nessun claim aggiuntivo nei metadata | PASS nel perimetro documentale/codice esaminato |
| Local-first / offline | Storage locale e servizi export/import presenti; nessun claim assoluto di sicurezza o indisponibilità di tutte le connessioni | PASS nel perimetro esaminato |
| No NoFi cloud sync automatica | Confini della policy conservati; trasferimento intenzionale a terzi distinto dal cloud NoFi | PASS nel perimetro esaminato |
| Export/import e Nearby | Servizi Dart e trasporti Wi-Fi Direct; manifest CAMERA/RECORD_AUDIO/NEARBY_WIFI_DEVICES e localizzazione limitata ad API precedenti | PASS documentale; non ripetuti test fisici dell’app |
| Nessun SDK analytics/crash reporting nell’app | Nessuna dipendenza Firebase Analytics/Crashlytics/Sentry nel pubspec esaminato; servizi sito esplicitamente separati | PASS nel perimetro esaminato |
| Esclusione contenuti privati dal backup Android automatico | Il manifest sorgente e quello compilato di build 28 (`build/release-28/final/manifest.xml`) non dichiarano `allowBackup=false`, `fullBackupContent` o `dataExtractionRules`; nessuna regola di esclusione trovata nel progetto Android principale | **FAIL / P0: dichiarazione non dimostrata** |

Android documenta `allowBackup=true` come default e l’inclusione di gran parte dei file in assenza di regole: [manifest application](https://developer.android.com/guide/topics/manifest/application-element), [Auto Backup](https://developer.android.com/identity/data/autobackup). Questo non dimostra che un backup sia realmente avvenuto, ma impedisce di certificare il claim di esclusione. Serve conferma sul bundle effettivamente destinato al pubblico, con policy di backup implementata e verificata, oppure revisione esplicita del claim da parte del responsabile. La policy applicativa non è stata alterata automaticamente.

Google Play: il controllo anonimo del 20 ottobre risponde HTTP 404. L’utente conferma che l’app non è pubblicata. **Target configurato: PASS; disponibilità pubblica: PENDING atteso.** Ripetere lo smoke test quando l’app sarà pubblicata. La candidate del sito è validabile prima di quel momento, il GO pubblico completo no.

## Test e performance

| Gate | Esito | Evidenza |
| --- | --- | --- |
| `npm ci` sul lockfile finale | PASS | Installazione riproducibile |
| Audit dipendenze | PASS | Da 3 vulnerabilità (1 critical, 2 high) a zero con aggiornamenti compatibili; Next 16.4.2, sharp 0.35.5, lockfile aggiornato, nessuna nuova dipendenza di prodotto |
| `npm run typecheck` | PASS | Nessun errore |
| `npm run build` preview | PASS | 68 pagine generate, sito completo e noindex |
| Build locale `VERCEL_ENV=production`, `false/public/true` | PASS | HTML delle cinque home index/follow e JSON-LD; robots pubblico; XML con 50 URL; Terms/Disclaimer noindex/follow |
| Build locale production incoerente `false/preview/false` | PASS del test negativo | Build realmente rifiutata con messaggio `NO-GO`, poi ripristinata la build preview valida |
| `npm run release:check` | PASS | Matrice dei flag, invarianti produzione, set esatto sitemap, metadata/OG/canonical/hreflang su 60 combinazioni, JSON-LD e URL Play |
| `npm run test:elsewhere` | PASS | Cinque gruppi, sicurezza URL, sette canali e localizzazione, rendering server e isolamento flag candidate |
| `npm run release:crawl` locale | PASS | 60 pagine × controlli SEO, 45 destinazioni interne HTTP 200; unknown/draft Fragment HTTP 404 |
| Browser mobile/desktop | PASS | `/`, `/it`, Time Capsules, Manifesto, Fragment 002, Privacy; immagini eager caricate, nessun overflow, nessun asset 404 applicativo o hydration error |
| Navigazione / lingua / audio | PASS | Selector reale EN→IT, navigazione al Manifesto, audio Fragment avviato e avanzato |
| Metricool | PASS integrazione | Script stubbed: un loader e una chiamata per pagina, una ulteriore chiamata su navigazione client; hash esatto; nessun traffico di test inviato alla dashboard dal crawl |
| Indicizzazione/search engine production | NOT RUN | Nessuno switch pubblico o submit; deliberatamente fuori dalla consegna candidate |

I primi tentativi del nuovo harness hanno corretto la normalizzazione dello slash della canonical root e un selettore audio; la matrice registra l’esecuzione finale. Le evidenze non attribuiscono a un pass locale la ricezione analytics o i Web Vitals di produzione.

Lighthouse 13.5.0 locale, build ottimizzata, Chromium su Windows:

| Homepage | Performance | Accessibility | Best Practices | SEO | LCP lab | CLS lab |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile prima | 69 | 96 | 96 | 69 | 13,2 s | 0,053 |
| Mobile finale | 84 | 100 | 96 | 69 | 4,26 s | 0,053 |
| Desktop finale | 98 | 100 | 96 | 69 | 0,98 s | 0,048 |

Il carico mobile è sceso da circa 3,6 MB a 620 KiB: screenshot sotto la piega lazy con dimensioni esplicite, audio scaricato su richiesta, texture ombra WebP da 10.450 byte al posto del PNG da 877.324 byte. Corretti i contrasti di piccoli testi e usato il nome accessibile naturale delle destinazioni social.

Il mobile resta un punto sotto il target indicativo 85: **WARN**, non trasformato in PASS numerico. LCP mobile lab non certifica Web Vitals buoni sul campo; va osservato sul deployment e poi in Speed Insights. SEO 69 deriva dall’audit `is-crawlable` che correttamente fallisce nella preview noindex; non si disabilita la protezione per ottenere 95. Best Practices 96 locale segnala gli endpoint Vercel non serviti da `next start`; il crawl li sostituisce per testare l’app. Questi punteggi non equivalgono a misure Vercel o dati reali utente.

I crawl browser sostituiscono script e richieste esterne (compresi i font) per isolare i test e non creare visite nella dashboard: gli screenshot usano i fallback tipografici esistenti. Lighthouse locale usa invece la normale rete. Le due misure hanno scopi e condizioni differenti.

## P1 documentato: HTML lang iniziale

Il proxy mantiene correttamente `Content-Language`; il documento viene aggiornato dal codice pre-interactive/client già esistente. Il root layout condiviso continua a emettere `lang=en` prima di JavaScript. Il crawl registra questa limitazione, non la nasconde. Ricavare la lingua dagli header nel root con `headers()` renderebbe dinamiche tutte le pagine statiche; ottenere root statici distinti richiede una ristrutturazione del routing. Come consentito dal punto P1 della milestone, questa modifica è rinviata per evitare regressioni di cache/routing prima del lancio. Non viene dichiarato PASS SSR-lang.

## Snapshot e rollback

Eseguire `npm run release:snapshot` con gli stessi flag del deployment. Il comando registra esclusivamente commit, URL deployment, timestamp, tre flag, stato effettivo, robots/sitemap, Google Play e numero Fragment pubblicati (3), senza stampare altri environment o segreti. Lo snapshot della candidate e i risultati del crawl remoto vengono aggiunti alle evidenze dopo il deploy preview.

Rollback point della precedente candidate: `1ab82c3ef070f90e6fcfa8cf574c1c77be6712b8`. Prima di un futuro switch production registrare anche **il deployment production attuale** e i suoi flag: il rollback production deve ripristinare quel deployment e la terna precedente insieme, non promuovere automaticamente questo SHA di preview.

## Procedura futura e content freeze

1. Risolvere il P0 backup con evidenza riferita all’esatta app pubblica e verificare gli altri claim rispetto a quel bundle.
2. Quando l’app è pubblicata, verificare la scheda Play senza account tester. Confermare dati legali e configurazione dei fornitori sito; osservare il connettore Metricool nella dashboard.
3. Ripetere check/crawl sulla candidate approvata, registrare snapshot e rollback della production corrente. Solo quando tutti i P0 sono PASS dichiarare content freeze: nessun redesign, nuovo Fragment, tracker o esperimento di copy.
4. Dopo GO esplicito, promuovere **lo stesso commit approvato** con `COMING_SOON=false`, `SITE_RELEASE_MODE=public`, `INDEXABLE=true` nello stesso deployment. Nessuno switch intermedio.
5. Smoke test reale production su tutte le route principali, un Fragment, robots e sitemap: HTTP 200, sito completo, nessun noindex, metadata/lingua/canonical corretti, asset e CTA. In caso di regressione ripristinare atomicamente il precedente deployment e i suoi flag.
6. Solo dopo smoke PASS attivare Search Console/Bing e sitemap. `npm run indexnow -- --dry-run` mostra le 50 URL senza inviarle; l’invio reale è protetto dalla configurazione production e dall’appartenenza alla sitemap live. Non è stato eseguito.
7. Registrare baseline iniziale di pagine scoperte/indicizzate, impression/click/query e referral disponibili, come baseline e non come risultato SEO. La prima review va dopo il tempo necessario al crawling.

Non essendoci tutti i P0 PASS, **nessun content freeze e nessun GO pubblico sono dichiarati**.

## Evidenze

- [Crawl locale e matrice canonical/hreflang](evidence/PUBLIC-LAUNCH/local-crawl.json)
- [Lighthouse prima/dopo](evidence/PUBLIC-LAUNCH/lighthouse-summary.json)
- [Homepage IT mobile](evidence/PUBLIC-LAUNCH/home-it-375.png) · [desktop](evidence/PUBLIC-LAUNCH/home-it-1440.png)
- [Fragment 002 mobile](evidence/PUBLIC-LAUNCH/fragment-002-375.png) · [desktop](evidence/PUBLIC-LAUNCH/fragment-002-1440.png)

## Esito obbligatorio di release

```text
Release candidate SHA: nello snapshot della candidate allegato dopo commit
Production deployment: nessuno (candidate soltanto)
Release timestamp: non avvenuto
P0 status: NO-GO — esclusione backup Android non dimostrata; disponibilità app pubblica ancora attesa
P1 status: HTML lang server-side rinviato; Lighthouse mobile 84/85 indicativo
Indexability: PASS configurazione e build pubblica simulata; preview correttamente noindex
robots.txt: PASS
sitemap.xml: PASS
Canonical: PASS
Hreflang: PASS
Metadata: PASS
Structured data: PASS semantico, nessuna promessa di rich result
Privacy claims: FAIL — backup automatico Android
Performance: PASS navigazione/responsive; WARN Lighthouse mobile; dati campo non disponibili
Google Play CTA: PASS URL/package; PENDING pubblicazione app
Published Fragments: PASS (3, tutte le lingue)
Rollback commit: 1ab82c3ef070f90e6fcfa8cf574c1c77be6712b8 (candidate precedente)
FINAL DECISION: NO-GO per production; candidate pronta per revisione
```
