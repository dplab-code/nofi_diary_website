# Privacy and backup clarity candidate

New candidate branch: `codex/privacy-backup-clarity`.
Exact base and rollback point: `c83b85453a0a2282a5353cb881f7019967a1b376` on `codex/public-launch-readiness` ([previous candidate PR #3](https://github.com/dplab-code/nofi_diary_website/pull/3)). The original release `1af7b15fd3a7428749a069f3576e0e57dee7863c` remains an ancestor through the previous candidates.

Privacy Policy v1.3 distinguishes Android-managed system backups/device transfers from manual app exports and from a NoFi-operated cloud service. Corrected homepage FAQs, privacy cards, Coming Soon and Time Capsule copy in English, Italian, French, Spanish and German. The older English FAQ component reuses the same answers. Evidence from the read-only app/build-61 audit is recorded in `docs/PRELAUNCH_PRIVACY_CLAIMS.md`.

The new branch is included in the existing full-site Vercel **preview-only** exception. Production behavior and preview noindex rules are preserved. The app is still unpublished; the configured Google Play package URL remains unchanged. No Android configuration or device data was changed.

Validation results and remote deployment status are recorded below after verification. Historical launch-readiness screenshots, snapshot and performance results refer to the previous candidate; they are not evidence of remote validation of this new branch. This candidate does not authorize production promotion, merge or search-engine submission.

## Validation

- `npm ci`: PASS, zero reported vulnerabilities.
- `npm run typecheck`: PASS.
- `npm run release:check`: PASS, including new-branch preview isolation and production release guards.
- `npm run test:elsewhere`: PASS, all five groups.
- `npm run build`: PASS with `VERCEL_ENV=preview`, `VERCEL_GIT_COMMIT_REF=codex/privacy-backup-clarity`, `COMING_SOON=true`, `SITE_RELEASE_MODE=preview`, `INDEXABLE=false`. The preview-only branch exception produces the full site.
- Local HTTP audit: PASS on 60 rendered pages across five languages, with 35 checks for visible updated disclosures and absence of obsolete backup/cloud/upload claims. Coming Soon source disclosures checked in all five languages (the route redirects to the homepage in full-site mode). [Evidence](evidence/PUBLIC-LAUNCH/privacy-copy-audit.json).

Remote preview readiness is tracked by the Vercel commit status and PR deployment comment. A Ready deployment is not a completed authenticated remote crawl. The app remains unpublished; production launch remains pending. No merge or production promotion is part of this candidate.
