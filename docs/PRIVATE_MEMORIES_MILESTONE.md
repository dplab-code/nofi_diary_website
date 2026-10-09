# Private memories, wherever they travel

## Analysis and proposal, before implementation

Scope: the full HomePage only (`COMING_SOON=false`), in EN/IT/FR/ES/DE. The coming-soon experience, release flags, download links, metadata and legal documents are outside this change.

The hero establishes private, offline-first ownership. The statement and manifesto preview develop intimacy; feature and memory sections introduce the object, then MemoryJourney explains creation and ends with passing a memory nearby or through another app. Privacy already explains local ownership and links to the existing policy. Header/footer navigation already exposes privacy; no additional navigation item is needed. Adding another privacy list would repeat those messages.

Minimum intervention: insert a short, static story immediately after MemoryJourney, before Time Capsules. Reuse shell/section/kicker, existing typography and paper/pastel colors. All meaning is server-rendered; no animation, interaction, dependency or extra image request is necessary. The visual stacks on mobile, with fluid type and wrapping labels.

## Copy review

Keep the proposed headline: “Un ricordo può viaggiare lontano. Senza smettere di essere vostro.” Condense the body into three moments: meet and recognize six symbols; send a protected NoFi file by your chosen service; the intended NoFi opens photo, voice, words and atmosphere. Close with “Una volta vicini. Poi vicini anche da lontano.” Omit the additional secret-journey slogan to avoid competing endings. Include a quiet clarification: sending as NoFi differs from exporting an ordinary viewable photo/video.

The repository contains sticker collection compositions and app screenshots, but no individually reusable assets for the six recognition symbols. Use small inline SVG interpretations of the brief’s flower/cloud/star/moon/dot/shell as an illustrative sequence, not an asserted screenshot or actual pairing code. Replace with canonical product assets when available. Hide decorative symbols from assistive technology; the visible caption describes six-symbol recognition.

## Validation

Production build and typecheck; browser checks at 360, 390, 412, 768 and 1440 pixels, across all locales. Confirm no horizontal overflow, headings/captions remain readable, privacy navigation works and Coming Soon contains no new section. Static presentation works without JavaScript and is identical with reduced motion; no new dark-mode behavior, analytics events or layout-shifting assets.

Results: TypeScript and production builds passed with both `COMING_SOON=false` and `COMING_SOON=true`. Browser geometry checks covered all five locales at the specified widths without section overflow; Italian mobile and desktop layouts were visually inspected. Italian Privacy rendered successfully; legal files and Coming Soon source have no changes. The true-mode generated Italian homepage excludes `private-memories`. No existing automated test suite is configured. No new animation or client code is introduced; formal CLS/performance measurements were not run.

## Vercel candidate visibility

The first remote candidate inherited `COMING_SOON=true`. A narrowly scoped exception in `lib/coming-soon.ts` now enables the full website only when `VERCEL_ENV=preview` and `VERCEL_GIT_COMMIT_REF=codex/private-memories`. Production, local runs and other branches still follow `COMING_SOON`. This uses Vercel's system environment variables and requires them to be exposed. A new push triggers a fresh Git-connected preview build. The section itself still belongs exclusively to the full website. Existing indexing guards continue to apply to preview deployments.

## Localized illustration and copy review — 2026-10-09

The earlier inline SVG illustration is replaced by the five user-supplied images: INGLESE → EN, ITALIANO → IT, FRANCESE → FR, SPAGNOLO → ES and TEDESCO → DE. Each complete 1122 × 1402 image is encoded as WebP at quality 92 (151–161 KB), without cropping or changing its embedded text. Static imports reserve the intrinsic aspect ratio. Images load lazily and are served without a second lossy conversion to preserve the lettering. The existing closing line remains as a localized HTML figcaption; the explanation and export distinction remain readable HTML. Each image has localized alternative text describing recognition, encrypted transport and opening the memory.

The review follows the “Mandatory Native Grammar & Idiomatic Correctness” criterion cited in `PRELAUNCH_RELEASE_CHECKLIST.md`. The complete generic milestone text has not been located; this records the grammar/idiom review, not a claim that every unspecified requirement has been verified. EN uses British spelling, FR retains the site's `vous`, ES retains its Spanish `tú`/`vosotros` register, DE uses `du`/`ihr`, and IT uses `tu` with the shared-memory plural. All five retain recognition through six symbols, transport by a chosen service, the intended NoFi recipient, no NoFi account/cloud requirement, and the distinction from viewable photo/video exports.

Corrections replace literal closing lines such as EN “Close once”, FR “Proches une fois” and ES “Cerca una vez”; clarify the account/cloud sentences; and quote export action names rather than using bare imperative labels as grammatical subjects. German “zwischen euch bleiben” becomes “nur euch gehören”. Fragment 003's recent narrative, alternative text and social copy, plus the Coming Soon binocular preview's note and alternative text, were also reviewed in all five languages; no textual corrections were needed.

The supplied French artwork contains “J’ai hâte d’un autre voyage ensemble”; the more idiomatic wording is “J’ai hâte de repartir en voyage ensemble”. This is embedded in the supplied bitmap and has deliberately been preserved, so the artwork itself is not marked as linguistically signed off. No generated or retouched substitute is introduced.

Validation: both `COMING_SOON=false` and `COMING_SOON=true` production builds passed, along with TypeScript. All five true-mode generated homepages exclude the new section. The five full-site homepages contain exactly one matching localized illustration with intrinsic dimensions and lazy loading. Browser checks at 360, 390, 412, 768, 900 and 1440 px found no section overflow; all five final assets loaded successfully at 1122 × 1402. Italian desktop and mobile screenshots were inspected and saved under `tmp/private-memories-desktop.jpg` and `tmp/private-memories-mobile.jpg`. This verifies the connected Chromium browser; Safari/Firefox and formal performance measurements were not run. The release target is the `codex/private-memories` Vercel candidate.
