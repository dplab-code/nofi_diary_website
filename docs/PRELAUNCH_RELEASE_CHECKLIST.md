# Pre-launch release checklist

Baseline frozen from `main` at commit `6519d38` on 2026-09-02. Subsequent work belongs to the technical publishing candidate and should contain only blocking visual fixes, publishing infrastructure, measurement and approved Fragment content.

## Visual matrix

| Surface | Viewport | Result | Evidence / limitation |
| --- | ---: | --- | --- |
| Edge desktop | 1440 × 900 | Pass | Full Coming Soon layout, transparent objects, narrow contact shadows and footer inspected. |
| Edge mobile | 390 × 844 | Pass | Header, language row, Privacy link, hero crop and audio control inspected. |
| Edge landscape | 844 × 390 | Pass | Header remains horizontal, Privacy visible and hero scales without horizontal overflow. |
| Small Android-equivalent | 360 × 800 | Pass | Language touch targets, hero type, image crop and memory card inspected after image load. |
| Firefox engine | — | Not available in the connected Edge test surface | Must be exercised on a real Firefox build before the final product launch. |
| Safari / iPhone engine | — | Not available on this Windows/Edge test surface | Must be exercised on a physical iPhone or a macOS/WebKit test service before the final product launch. |

Audio playback advances and exposes play/pause state correctly. Touch targets are at least 44 px. The Privacy link remains visible in the Coming Soon header and footer. The mobile Privacy page uses the same horizontal pre-launch header.

## Translation sign-off

English, Italian, French, Spanish and German Coming Soon copy was reviewed under “Mandatory Native Grammar & Idiomatic Correctness” and committed in `6519d38`. The review includes visible copy, control labels, alternative text and social metadata.

## Privacy invariant

The frozen SHA-256 of `app/privacy/page.tsx` is `0A897AC082D66CE5203CB63A35FCA0E544CBCEA38BA66C096B40224D39D0845D`. Re-check it before every production promotion. Legal content, route, metadata and internal styling are out of scope.

Expected behavior:

- `COMING_SOON=true`: Privacy uses the Coming Soon header.
- `COMING_SOON=false` and `SITE_RELEASE_MODE=public`: Privacy uses the official site header and footer.
- `/privacy`, `/it/privacy`, `/fr/privacy`, `/es/privacy`, `/de/privacy` remain reachable.
