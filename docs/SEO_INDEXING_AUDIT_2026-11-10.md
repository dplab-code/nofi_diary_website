# NoFi Diary — Audit SEO indexability (10 November 2026)

Status: **candidate branch, no production release**. Scope: Google Search Console page-indexing report and public-site `robots.txt` / `sitemap.xml` consistency.

## What the owner actually supplied

Source: `nofidiary.com-Coverage-2026-11-10.zip`, containing `Grafico.csv`, `Problemi critici.csv`, `Problemi non critici.csv`, `Metadati.csv`.

The latest daily row in the export is **2026-11-06**, not 10 November:

| Search Console status | Reported URLs |
| --- | ---: |
| Indexed | 18 |
| Not indexed | 35 |
| Discovered — currently not indexed | 28 |
| Blocked by robots.txt | 4 |
| Page with redirect | 3 |
| Crawled — currently not indexed | 0 |

This is a report of **all known pages**, not a list of URLs supplied by a sitemap. The archive contains **only aggregates**, not each affected URL. The 35 non-indexed URLs must **not** all be treated as a defect. Redirected URLs and intentional policy exclusions can be correct; the report cannot establish which of the 28 discovered URLs corresponds to the site's editorial pages.

## Verified code audit

Production Vercel deployment for `nofidiary.com` at the time of audit: GitHub `dplab-code/nofi_diary_website` commit `0d9dbc2f0b021aa2c62a2f55942472a71938fa90` (Vercel state `READY`). The effective environment switches must still be verified on a live deployment before release.

Prior code:
- `app/robots.ts` disallowed the Manifesto and four editorial product sections for every locale, regardless of an approved public release.
- `app/sitemap.ts` listed homepage (5 locales), privacy (5 locales), and three published Fragments (15 URLs): **25 intended entries**.
- The following **25** candidate public URLs were missing from that sitemap: `/manifesto`, `/time-capsules`, `/stickers`, `/themes`, `/appearances` across EN/IT/FR/ES/DE.
- These editorial pages exist as Next.js routes and contain distinct metadata and locale-specific copy. This identifies a **real publication-policy inconsistency**, but does not establish that Google would index them all.

## Proposed change

1. Introduce a shared editorial route inventory (`lib/seo-routes.ts`) so a new editorial page cannot be added to the sitemap but accidentally left blocked in `robots.txt`.
2. For the **public, indexable** release only, permit Googlebot to crawl Manifesto and the four published sections and list their five locale variants in the sitemap, with matching same-language canonical and `hreflang` / `x-default`.
3. Preserve homepage, privacy and the existing three published Fragments; **never** include draft Fragment 004.
4. Preserve the **coming-soon and non-indexable deployment protections**; the preview sitemap does not publish editorial routes and `robots.txt` continues to block them.
5. Preserve the current legal-route exclusion policy for `/terms` and `/disclaimer` in all five locales. Revisiting their indexability requires separate content/legal review; robots exclusion does not guarantee de-indexing.
6. No automatic Search Console indexing requests, IndexNow submissions, analytics changes, external posts, app telemetry changes or provider credential changes.

Expected sitemap when indexed public release: **50 entries** = 5 homepage + 5 privacy + 15 published Fragment + 25 editorial. This is a **target count of URLs listed**, not a predicted indexed count.

## Acceptance and publication gates

- CI builds the real Next.js App Router in both modes and validates `robots.txt`, sitemap URL inventory, 25 editorial HTTP responses, self-canonical, locales, absence of `noindex`, draft exclusion, and persistent legal/preview protections.
- Open the PR for review. **Do not merge or promote to production without authorization**.
- Following a separately approved production deployment, verify live `/robots.txt`, `/sitemap.xml`, canonical metadata, HTTP 200, and the active release mode, then ask Google to recrawl only representative eligible URLs. A sitemap is a discovery signal, not an indexing command.
- Request a **URL-level export** from each Search Console excluded-page category before attributing the 28 discovered / 4 robots-blocked / 3 redirected counts to specific URLs.
- Monitor 2–4 weeks after rollout: indexed URLs, page-level reasons, Search Analytics impressions and clicks per landing page and language. Do not confuse changes in Google discovery with app installations.

## Privacy and positioning

Pages should communicate NoFi's genuine differentiators—personal memory, locally owned creative expression, privacy by architecture, deliberate technology—without keyword stuffing, fabricated traffic gains or invasive instrumentation.
