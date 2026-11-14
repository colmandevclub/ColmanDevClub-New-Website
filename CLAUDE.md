# CLAUDE.md — ColmanDevClub-New-Website

<!-- shared-core:start — identical in ColmanDevClub-New-Website and ColmanDevClub-Server. Change it in both repos, in paired PRs. -->

## Project

The ColmanDevClub website: public club site, admissions, and a Mentor/Admin dashboard for running each academic year (curriculum, study materials, absences, member progress). Hebrew only, fully RTL. Two repos:

| Repo                        | What                 | Stack                                                                                                                     |
| --------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `ColmanDevClub-New-Website` | Web SPA              | Vite + React 19 + TS, React Router 7, Tailwind + shadcn/ui, TanStack Query + axios, react-hook-form + zod, Motion, Vitest |
| `ColmanDevClub-Server`      | REST API (`/api/v1`) | Express 5 + TS, MongoDB/Mongoose, zod, JWT in httpOnly cookies, Cloudinary, Gmail SMTP, Vitest + supertest                |

Both deploy to Vercel on one origin: the web project rewrites `/api/*` to the API. pnpm, Node 22. Scripts live in each `package.json`; that file is authoritative.

## Specs: the source of truth

The specs live in the web repo under `docs/specs/` (from the API repo, clone both side by side and read `../ColmanDevClub-New-Website/docs/specs/`):

- `REQUIREMENTS.md`: **what** and why. Requirement IDs `R-xx.y` (EARS criteria), decisions `Dxx`.
- `DESIGN.md`: **how**. Technical decisions `T-xx`, routes, endpoints, data model, policies, open items `O-x`.
- `TASKS.md`: epics `E#` and stories `S-#.#`, each traced to R/T IDs, with acceptance criteria.

Read the story's R-IDs in REQUIREMENTS and the DESIGN sections the story names **before writing code**. When code and spec disagree, the spec wins. If the spec is wrong or silent, fix the spec in the same PR (see Workflow). How the method works, a full worked example, and templates: `docs/sdd/` in the web repo.

## Hard rules

1. **RTL with logical utilities.** Use `ms-/me-`, `ps-/pe-`, `start-/end-`, `text-start/text-end`. Physical classes (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`) fail CI. Wrap English terms inside Hebrew text in `<bdi>`; emails, URLs, phones and code get `dir="ltr"`.
2. **Permissions live in policies.** Every API route declares a policy from `src/policies/` (`isAdmin`, `isMentorOfYear`, `canManageMaterials`, …). The server decides; web route guards only shape the UX.
3. **The API's zod schemas are authoritative.** The web repo keeps a copy in `src/schemas/`. Change the API schema first, then mirror it in the same pair of PRs. Every route registers its schemas in the OpenAPI registry (`/api/docs`).
4. **One error format:** `{ "error": { "code", "message", "fields?" } }` with `VALIDATION_ERROR` 400, `UNAUTHENTICATED` 401, `FORBIDDEN` 403, `NOT_FOUND` 404, `CONFLICT` 409, `RATE_LIMITED` 429. 403/404 never reveal whether someone else's resource exists.
5. **Secrets and PII stay out of the repo and the logs.** Secrets come from env vars (keys listed in `.env.example`). Logs carry request ids, user ids and status codes only, never emails, phones, tokens or notes.
6. **Members never see tracking data.** Absences, attendance, progress, notes and member status go only to that year's Mentors and to Admins, and never to members, including about themselves (R-32.2, R-44.3). Applicant phone and email go to Admins only (R-44.2). Enforce this in the serializer and test it.

## Workflow (SDD)

1. **Start from a Jira story** (project `KAN`). Its description holds the `S-#.#`, R-IDs and acceptance criteria from TASKS.
2. **Branch** `KAN-<n>-<short-slug>` from `main`, e.g. `KAN-42-new-since-last-visit`.
3. **Tests per acceptance criterion.** Every criterion gets a test whose name starts with its ID (`R-20.4 marks materials published after the last visit as new`), or an explicit "checked by hand" line in the PR.
4. **IDs are stable.** Reference R/D/T/S IDs exactly. A removed ID is retired and never reused; new ones take the next free number.
5. **Docs move with the code.** A change in scope, an endpoint, a model field or a decision updates REQUIREMENTS/DESIGN/TASKS (bump the doc's version and changelog row). The specs live in the web repo, so a web change updates them in the same PR, and an API change opens a paired web PR with the same Jira key and links the two.
6. **PR** title starts with the Jira key; fill `.github/pull_request_template.md`. CI green + one lead approval (CODEOWNERS); then the author merges.

<!-- shared-core:end -->

## This repo: web

**Folders** (DESIGN §3.1): `src/pages/{public,applicant,member,account,dashboard,errors}` screens · `src/components/{ui,layout,shared}` (shadcn/ui restyled, layouts, EmptyState/Skeleton/ConfirmDialog/UndoToast…) · `src/features/<domain>/` hooks + API calls · `src/schemas/` zod copy · `src/content/` static public content (showcase, legacy mentors, social links) · `src/lib/` axios client, query keys, bidi helpers · `docs/specs/`, `docs/sdd/`, `docs/onboarding.html`.

**Conventions**

- Server state only through TanStack Query, with query keys per feature (`['years', id, 'materials', filters]`). Client state is React state/context. The selected year lives in the URL (`?year=`).
- Every query-driven list or widget renders a skeleton while pending and an `<EmptyState>` with the next action when empty (R-37.1–2). Deletes go through `<ConfirmDialog>`; reversible actions show `<UndoToast>`.
- Animate `transform` and `opacity` only, and gate motion on `useReducedMotion` (R-35).
- Visual values come from the Tailwind theme tokens (DESIGN §4.2); the Claude Design screenshots on the Jira story define how a screen looks.
- Each screen works with the keyboard only, passes `vitest-axe`, and is usable at 360 px (dashboard: tablet and up).
- Use the shared axios client in `src/lib/`: it sets the `/api/v1` base and the `X-CDC-Request: 1` header and handles the silent refresh.
