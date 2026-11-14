# Spec reconciliation — 2026-11-14

|                      |                                                                              |
| -------------------- | ---------------------------------------------------------------------------- |
| **Version**          | 1.0                                                                          |
| **Story**            | S-0.22 · [KAN-114](https://almoglavi29.atlassian.net/browse/KAN-114)         |
| **Source**           | 2026-11-14 code/Jira audit; REQUIREMENTS v1.0, DESIGN v0.3 → **v0.4**, TASKS |
| **Owner / reviewer** | Elad Abutbul / Almog Lavi                                                    |

This note records what changed when the specs were restored to the repo and brought in line with the Sprint 1 work that's already done. It doesn't reopen any Sprint 1 story. Where evidence is missing, it's listed in [§4](#4-missing-operational-evidence) with an owner.

## 1. Restored

| Item                                       | Before                                           | Now                                                                   |
| ------------------------------------------ | ------------------------------------------------ | --------------------------------------------------------------------- |
| `REQUIREMENTS.md`, `DESIGN.md`, `TASKS.md` | Outside both repos; the README links were broken | `docs/specs/` in the web repo. REQUIREMENTS content unchanged (v1.0). |
| `docs/onboarding.html` (S-0.8)             | Untracked, linked from the web README only       | Committed, and linked from both READMEs                               |

## 2. Decisions reconciled

| ID                    | Change                                                                                                                                                                                           | Evidence                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-21, DESIGN §10, §16 | Supabase Storage → **Cloudinary**, max **10 MB** per file (owner-confirmed). Kept: private (`authenticated`) assets, signed direct uploads, 5-minute signed downloads, local filesystem adapter. | [KAN-14](https://almoglavi29.atlassian.net/browse/KAN-14) criteria (Cloudinary on the club Gmail); `CLOUDINARY_*` keys in the API's `.env.example` |
| O-2                   | Resolution text updated to Cloudinary                                                                                                                                                            | —                                                                                                                                                  |
| T-23 (new)            | OpenAPI 3.1 from zod, Swagger UI at `/api/docs`, `pnpm docs:check` in CI                                                                                                                         | [KAN-62](https://almoglavi29.atlassian.net/browse/KAN-62), API [PR #10](https://github.com/colmandevclub/ColmanDevClub-Server/pull/10)             |
| T-24 (new)            | CodeRabbit comments on PRs and never approves                                                                                                                                                    | [KAN-63](https://almoglavi29.atlassian.net/browse/KAN-63), `.coderabbit.yaml` in both repos                                                        |
| T-25 (new)            | `main` protected; green CI + 1 lead approval (CODEOWNERS); the author merges                                                                                                                     | [KAN-12](https://almoglavi29.atlassian.net/browse/KAN-12), `.github/CODEOWNERS` in both repos                                                      |
| TASKS                 | Storage criteria in S-0.5, S-0.8, S-5.1, S-8.5 updated to match; Jira plan section and T-23 – T-25 traceability added                                                                            | [Jira board](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1)                                                                |

Stable IDs: no R, D, T or S ID was renamed, renumbered or reused. T-23 – T-25 are the next free T numbers. O-5 is the next free O number.

## 3. Completed decisions recorded

S-0.11 ([KAN-61](https://almoglavi29.atlassian.net/browse/KAN-61)) was closed on 2026-11-14 without its answers being written down. The owner (Almog Lavi) confirmed them on 2026-11-14 for this note:

| ID  | Decision                                                                                                                                     | Recorded in                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| O-4 | **Domain:** stay on `.vercel.app`; no custom domain for launch                                                                               | DESIGN §16, §17; TASKS S-8.5 |
| O-5 | **Account ownership:** the club Gmail owns or administers Vercel, MongoDB Atlas, Cloudinary, Cloudflare, Google sign-in and the club mailbox | DESIGN §17                   |

## 4. Missing operational evidence

These items are listed so they can be closed. None of them reopens Sprint 1.

| #   | Gap                                                                                                                                                                                                                                                                | Why it matters                                                | Suggested owner                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | KAN-61 and KAN-14 were closed with every checkbox unticked and no comments                                                                                                                                                                                         | No audit trail for what was set up                            | Almog: tick the boxes and link this note                                                |
| 2   | No per-service proof for O-5 (for example, the owner or admin shown in each service's settings)                                                                                                                                                                    | The decision is recorded, but nobody has checked each account | Elad                                                                                    |
| 3   | No runbook entry for at-rest encryption (R-44.7, KAN-14) in either repo                                                                                                                                                                                            | R-44.7 needs it at setup and again at launch (S-8.5)          | Elad                                                                                    |
| 4   | Cloudinary PDF/ZIP delivery setting: no record that it was enabled                                                                                                                                                                                                 | S-5.1 downloads fail without it                               | Elad                                                                                    |
| 5   | Gmail app password and Cloudinary secret: no record that they're stored as Vercel env vars                                                                                                                                                                         | Needed before S-1.2 and S-5.1                                 | Elad                                                                                    |
| 6   | Local dev doesn't work over HTTP: the Vite proxy calls `http://localhost:3000` and the API redirects every HTTP request (308)                                                                                                                                      | New teammates can't run both repos                            | Tracked by S-0.21 · [KAN-113](https://almoglavi29.atlassian.net/browse/KAN-113)         |
| 7   | API `pnpm dev` crashes on `main` (`ReferenceError: require is not defined`): `import helmet = require('helmet')` in `src/app.ts` (from KAN-15's Vercel fix) runs under `tsc` but not under `tsx`. Workaround: `pnpm build && node --env-file=.env dist/server.js`. | No hot-reload API for local dev                               | Add to S-0.21 · [KAN-113](https://almoglavi29.atlassian.net/browse/KAN-113) (local dev) |

## Changelog

| Version | Changes                 |
| ------- | ----------------------- |
| 1.0     | First version (S-0.22). |
