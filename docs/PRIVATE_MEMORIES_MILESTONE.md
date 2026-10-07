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
