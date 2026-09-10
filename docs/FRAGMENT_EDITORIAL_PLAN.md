# Fragment publishing plan

The first month is prepared as static repository content; no CMS is required.

| Moment | Fragment | State | Editorial role |
| --- | --- | --- | --- |
| Day 1 — 2026-09-02 | 001 — Before we reached the sea | Published | Establish the visual and emotional language; canonical shareable URL. |
| Day 7–10 — 2026-09-10 | 002 — The song kept playing | Published | Introduce voice and the R&B road-memory narrative. |
| Day 18–20 — 2026-09-20 | 003 — Three small shadows | Draft | Return with a photographic observation. |
| Day 30 — 2026-10-02 | 004 — Some memories have a sound | Draft | State the role of sound without turning it into a feature announcement. |

After the first month, publish one Fragment every two to four weeks. The rhythm should be recognizable but deliberately slow. Do not publish a promised date that is not reliable.

## Commit + deploy workflow

1. Add the localized copy, image, optional audio, alt text, date and social metadata to `content/fragments.ts` with `status: "draft"`.
2. Review the narrative, asset rights, privacy claims and all five translations.
3. Change only the approved item to `status: "published"`.
4. Run typecheck, production build, accessibility checks and the real-route smoke test.
5. Commit with the Fragment ID in the message and deploy through the protected production branch.
6. Verify its localized URLs, social preview, analytics event and sitemap entry on the real domain.

Automatic scheduling should be introduced only when manual commit + deploy becomes an operational burden.

## Fragment 002 publication record

Fragment 002 was promoted to production on 2026-09-10 at commit `a0bb122`.

- Canonical URL: `https://nofidiary.com/fragments/002-the-song-kept-playing`
- Approved visual: `public/images/coming-soon/fragment-002-draft-canvas-v1.png`
- Rendering contract: the approved 941 × 1672 canvas is served without Next.js image optimization or recompression. Narrow viewports scale the complete canvas proportionally; its internal composition must not reflow.
- Interaction contract: transparent hotspots preserve navigation, locale links, Privacy links and voice-note playback without adding visible elements to the approved canvas.
- Accessibility and discovery: localized semantic copy remains available in the document while the decorative canvas uses an empty alternative attribute to avoid duplicate screen-reader output.
- Release validation: production build passed; the public route returns HTTP 200, declares its self-canonical, allows `index, follow` and appears in the generated sitemap.
