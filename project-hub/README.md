# Project Hub Seed

The Project Hub is a future private, maintainer-only module. This directory defines its domain boundary; it is not a public route, dashboard, CRM, social publishing tool or replacement for Vercel Analytics.

## Responsibilities

- **Overview:** later combine a small set of traffic, acquisition, intent and recent-initiative signals.
- **Marketing Initiatives:** record what was done, where, why and under which stable campaign identifier.
- **Experiments:** preserve hypothesis → action → observation window → result → decision.
- **Providers:** normalize observations from Vercel and only the social sources actually used by NoFi.

The Hub correlates time series and initiatives as decision support. A pattern such as “post published → visits increased → download clicks increased” is an observation, not automatic proof of causality.

## Architecture boundary

```text
Private Project Hub
  ├── domain (initiatives, experiments, observations)
  ├── providers
  │   ├── vercel-analytics (future)
  │   ├── instagram (future, only if needed)
  │   ├── youtube (future, only if needed)
  │   └── reddit (future, only if needed)
  └── private storage and authentication (not selected in this milestone)

Public website
  └── emits privacy-reviewed aggregate analytics
```

Provider adapters must implement the neutral contracts in `domain.ts`. Domain records must not store website visitor identity, app user identity, diary content, device IDs or installation IDs.

## Deferred decisions

- Maintainer authentication and authorization mechanism.
- Private persistence technology.
- Vercel API ingestion and refresh cadence.
- Which, if any, social providers justify an API integration.
- Hub UI and hosting topology.

These choices remain intentionally open so the public website is not coupled to a premature administrative platform.
