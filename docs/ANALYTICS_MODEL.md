# NoFi Analytics Model

## Principle and boundary

NoFi measures how the public website helps people discover the product. It does not measure how a person uses the NoFi app.

- Website: communication, discovery, content, store conversion and selected events.
- Analytics layer: Vercel Web Analytics and Speed Insights, plus the independent NoFi event collector on Cloudflare Workers Free + D1 EU. Counts from different providers must not be added together.
- Project Hub: a future private maintainer tool that correlates initiatives, sources, traffic and outcomes; it does not replicate Vercel's dashboard.
- App: no behavioural analytics, installation identifier, user identifier or diary-content collection.

Vercel Web Analytics is configured in `app/layout.tsx`. Store CTAs use `TrackedStoreLink`; Coming Soon events record only page-level discovery, one section arrival, deliberate navigation and the first audio start. Event properties are deliberately low-cardinality and must never contain personal data or diary content.

## Cloudflare site collection — 6 November 2026

`WebsiteEvents` observes public route/language changes; `lib/cloudflare-events.ts` sends only page_view, shared_fragment_view, download_click and first audio_start per fragment/route. The current prelaunch site stays prelaunch: deployment does not enable unavailable store links or unreleased pages. Editorial fragment IDs 001/002/003 and real-memory IDs eccoli/fuori/sancius/altrove are separate fixed labels; coming_soon_fragments and real_memories identify their respective galleries. A view is an event, not a unique person; store clicks are not installations. Strict Mode/remounts and hash-only navigation do not duplicate a visit; returning from another route counts a new view. Audio repeats on the same route/fragment do not count again.

The fixed endpoint is `https://nofi-site-events.frosty-hill-86d4.workers.dev/v1/events`. No key is shipped to the browser; reads and diagnostics use separate protected endpoints in Marketing OS. Only the production custom origins send; previews/local development do not. Fetch is best effort with keepalive, credentials omitted and referrer-policy no-referrer; failures never interrupt navigation/audio and there is no retry queue. Maximum 120 events per document is a client guard, separate from cloud limits. This means blocked JS, privacy signals, navigation timing and quotas can reduce coverage.

Before transmission, URLs become fixed page/language labels, campaigns use the collector vocabulary and arbitrary values become unrecognized. Referrer is reduced to a recognized hostname or a generic label. No full URL, free text, personal diary content, IP address, visitor/device ID, cookie or browser storage is used by this adapter. Attribution survives SPA navigation only in document memory; document reload/new tab starts fresh. UUIDv4 identifies only an event receipt, retained seven days for deduplication; daily aggregates are retained 400 days. Cloudflare necessarily handles connection metadata at its edge. Global Privacy Control or Do Not Track suppress this adapter, without claiming to control the separate Vercel integrations.

Backend/cloud code and activation evidence live in `dplab-ai/nofi-marketing-lab-api` (`integrations/site-events/`) and `dplab-ai/ultimate-marketing-dashboard` (`docs/m04a/`). Privacy notice v1.2 is updated in all five languages. Run `npm run test:site-events` and `npm run build` before release. The 6 November lockfile update moves Next.js 16.3.0 to 16.4.5 and compatible transitive fixes; npm audit reported zero vulnerabilities afterward. Rollback the site deployment and disable COLLECTION_ENABLED on the existing Worker; preserve D1 and application read/test keys. Do not delete resources, change billing, or alter the mobile app.

## Events Registry

| Event | Purpose | Trigger | Properties | Interpretation |
| --- | --- | --- | --- | --- |
| `download_click` | Download intent | A visitor selects a download CTA | `placement`, `page`, `variant`, `destination` | Directional intent, not a verified installation |
| `gallery_interaction` | Product exploration | First audio start for a real Fragment during the mounted page view | `interaction_type=audio_start`, `gallery=real_memories`, `fragment` | Meaningful engagement with the gallery; repeated pause/play actions are not counted |
| `coming_soon_view` | Pre-launch reach | Coming Soon mounts | `locale` | Page exposure, not a known person |
| `coming_soon_fragments_reached` | Editorial discovery | Found Fragments becomes at least 25% visible once | `locale` | Section reach, not continuous scroll tracking |
| `language_change` | Localization usefulness | A language link is selected | `to_locale` | Navigation choice only |
| `privacy_open` | Privacy-information interest | A Coming Soon Privacy link is selected | `placement=header|footer` | Link intent, not confirmation that the policy was read |
| `shared_fragment_view` | Shared Fragment reach | A published Fragment page mounts | `fragment`, `locale` | Page exposure; the fragment value is a public editorial ID |

`app_share_landing` is intentionally represented through acquisition parameters rather than a JavaScript event. A NoFi-generated share uses:

```text
https://nofidiary.com/?utm_source=nofi_app&utm_medium=share&utm_campaign=memory_share
```

This identifies the source and feature, never the person, device or installation. The canonical builder is `buildNofiAppShareUrl()` in `lib/acquisition.ts`; the mobile repository can reproduce the same fixed convention without importing website code.

Out of scope: continuous scroll depth, heatmaps, mouse movement, session recording, fingerprinting, persistent IDs, cross-session profiles, arbitrary per-element clicks and app analytics.

`external_store_click` is reserved for a future distribution model with more than one meaningful download/store hand-off. With Google Play as the only destination it would duplicate `download_click`, so it is deliberately not emitted in this milestone.

## Acquisition Convention

Required fields:

| Parameter | Meaning | Format |
| --- | --- | --- |
| `utm_source` | Originating platform or owned surface | lowercase `snake_case`, e.g. `nofi_app`, `instagram`, `reddit`, `linkedin`, `newsletter`, `direct_share` |
| `utm_medium` | Distribution mechanism | lowercase `snake_case`, e.g. `share`, `social`, `organic`, `post`, `bio` |
| `utm_campaign` | Stable initiative identifier | lowercase `snake_case`; descriptive, date-independent where possible, e.g. `memory_share`, `fragment_gallery_launch` |
| `utm_content` | Optional creative or placement variant | lowercase `snake_case`, e.g. `carousel_01`, `profile_bio`; never an audience or individual identifier |

Rules:

1. Never put names, emails, handles, user/device/installation IDs, tokens or memory identifiers in UTM values.
2. Reuse one campaign identifier across the links belonging to the same initiative.
3. Use `nofi_app / share / memory_share` for the app's “Share with a friend” website link.
4. Treat direct and unattributed traffic as valid data; do not invent attribution.
5. Record the final campaign identifier in the future Project Hub initiative entry.

Examples:

```text
?utm_source=instagram&utm_medium=social&utm_campaign=fragment_gallery_launch&utm_content=carousel_01
?utm_source=reddit&utm_medium=post&utm_campaign=privacy_manifesto
?utm_source=nofi_app&utm_medium=share&utm_campaign=memory_share
```

## Initial funnel

```text
Acquisition → Website Visit → Product Exploration → Download / Store Intent
```

Installation, app use and retention are not measured in this model.

## KPI Registry

| KPI | Meaning | Source | Calculation | Limitation |
| --- | --- | --- | --- | --- |
| Unique Visitors | Approximate audience discovering NoFi | Vercel Web Analytics | Dashboard unique visitors for the selected period | Aggregated estimate; not people known to NoFi |
| Visits / Views | Website consumption | Vercel Web Analytics | Dashboard visits and page views | Multiple views do not imply multiple people |
| Traffic Trend | Direction of traffic over time | Vercel Web Analytics | Daily and weekly series | Establish a baseline before interpreting changes |
| Referrer Distribution | Sites sending traffic | Vercel Web Analytics | Views/visits grouped by referrer | Referrers may be missing because of browser or platform behaviour |
| Traffic by Source | Acquisition mix | Vercel Web Analytics + UTM | Visits grouped by `utm_source` and `utm_medium` | UTM discipline is required; direct traffic remains unattributed |
| Campaign Traffic | Attention associated with an initiative | Vercel Web Analytics + UTM | Visits grouped by `utm_campaign` | Temporal association is not proof of causality |
| App-originated Website Visits | Word-of-mouth from NoFi shares | Vercel Web Analytics + UTM | Visits with `utm_source=nofi_app` and `utm_medium=share` | Measures opened website links, not app shares that were never opened |
| Product Exploration | Meaningful gallery interest | Custom events | Count of `gallery_interaction` by type/fragment | Audio starts are only one indicator of interest |
| Download Intent | CTA interest | Custom events | Count of `download_click` | Not an installation |
| Download Intent Rate | Share of visits expressing download intent | Web Analytics + custom events | `download_click / visits` for the same period and scope | Directional until traffic is sufficient; repeat clicks may exist |
| App-share Download Intent Rate | Store intent after app-originated discovery | UTM-filtered visits + custom events | Download clicks from app-share landings / app-share visits | Depends on dashboard filtering and adequate sample size |
| Core Web Vitals | Real-user performance guardrail | Vercel Speed Insights | LCP, INP, CLS and supporting FCP/TTFB views | Field data needs enough real traffic and varies by device/network |

Do not set numerical targets during the baseline phase. First observe daily/weekly traffic, source mix, top landing pages and material changes after communication activity.

## Production activation and verification

Code integration alone does not activate the Vercel products. For the production project:

1. In Vercel, open **Analytics**, select the NoFi project and enable Web Analytics.
2. Open **Speed Insights** and enable it for the same project.
3. Deploy the revision containing `@vercel/analytics` and `@vercel/speed-insights`.
4. Visit production without an ad blocker, navigate between at least two pages, select a test store CTA and start one Fragment audio.
5. Confirm the generated analytics and speed-insights script/intake requests in browser network tools.
6. After Vercel processes the data, verify page views, referrer/source dimensions and the three registered custom events in the dashboard.
7. Verify LCP, INP and CLS after sufficient real-user samples exist; inspect FCP and TTFB when available.

Do not mark “real page views collected” or “Web Vitals available” complete before steps 1–7 are observed on production. Ad blockers may suppress requests. New analytics, images, audio or animation must be reviewed against field performance rather than assumed harmless.

### Milestone status before deployment

| Acceptance area | Repository status | Production status |
| --- | --- | --- |
| Web Analytics integration | Implemented | Pending Vercel enablement, deployment and first observed page view |
| Speed Insights integration | Implemented | Pending Vercel enablement, deployment and field samples |
| `download_click` / store intent | Implemented on header, hero and final CTA | Pending dashboard observation |
| Gallery interaction | Implemented for first Fragment audio start | Pending dashboard observation |
| `nofi_app` attribution | Convention and URL builder implemented | Mobile share link adoption and first attributed visit pending |
| UTM, event and KPI registries | Documented | Ongoing governance |
| Project Hub seed | Independent domain contracts documented and typed | No private application, persistence or provider APIs in this milestone |

## Privacy review checklist

- Aggregated website discovery only.
- No third-party advertising cookies.
- No diary content in URLs, events or properties.
- No name, email, account, user, device or installation identifiers.
- No app telemetry or link between a website visitor and an app user.
- No session reconstruction, fingerprinting or cross-session profile.
- Privacy Policy reviewed whenever providers, purposes, properties or retention change.

## Official implementation references

- Vercel Web Analytics: <https://vercel.com/docs/analytics>
- Custom events: <https://vercel.com/docs/analytics/custom-events>
- Analytics privacy and compliance: <https://vercel.com/docs/analytics/privacy-policy>
- Speed Insights quickstart: <https://vercel.com/docs/speed-insights/quickstart>
