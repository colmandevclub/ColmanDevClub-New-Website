# E0 Project setup & foundations — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-0.1, S-0.2, S-0.3, S-0.4, S-0.5, S-0.6, S-0.7, S-0.8. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

## E0 — Project setup & foundations

_Both repos, CI, hosting, services and the design system exist, so feature work can start in parallel._

### S-0.1 Scaffold the API repo

- **Repo:** api · **Points:** 3 · **DESIGN:** §3.2, §6.1
- **Requirements:** T-08, T-13, T-16
- **Depends on:** —

**Acceptance criteria**

- [ ] `colmandevclub-api` repo created with Express 5 + TypeScript, pnpm, Node 22
- [ ] ESLint, Prettier, Husky + lint-staged configured (copied from Sagol360)
- [ ] Vitest + supertest + mongodb-memory-server run one passing health test
- [ ] Folder structure matches DESIGN §3.2 (modules, middleware, services, models, policies, schemas)
- [ ] Env vars parsed and validated with zod at boot; `.env.example` lists every key
- [ ] `GET /api/v1/health` returns 200

### S-0.2 Scaffold the web repo

- **Repo:** web · **Points:** 3 · **DESIGN:** §3.1, §4
- **Requirements:** T-01, T-02, T-03, T-04, R-38.1
- **Depends on:** —

**Acceptance criteria**

- [ ] `colmandevclub-web` repo created with Vite + React 19 + TypeScript, pnpm
- [ ] Tailwind + shadcn/ui installed; React Router, TanStack Query, axios, react-hook-form + zod installed
- [ ] `<html lang="he" dir="rtl">`; lint rule blocks physical direction classes (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`)
- [ ] axios client sends `X-CDC-Request: 1` on every request and uses `/api/v1` as base
- [ ] Vite dev server proxies `/api` to the local API
- [ ] ESLint, Prettier, Husky, Vitest configured

### S-0.3 CI pipelines, branch protection and PR template

- **Repo:** both · **Points:** 2 · **DESIGN:** §14
- **Requirements:** T-13
- **Depends on:** S-0.1, S-0.2

**Acceptance criteria**

- [ ] GitHub Actions on every PR: install → lint → prettier → test → build, in both repos
- [ ] `main` is protected: PR required, checks green, 1 review
- [ ] PR template includes a "Requirements: R-xx" field and a Jira link
- [ ] Dependabot enabled on both repos

### S-0.4 Vercel projects and same-origin routing

- **Repo:** both · **Points:** 3 · **DESIGN:** §1, §3, §14
- **Requirements:** T-19, R-44.1
- **Depends on:** S-0.1, S-0.2

**Acceptance criteria**

- [ ] Two Vercel projects (web, api) connected to their repos; every PR gets a preview URL
- [ ] API deployed as a serverless function via `api/index.ts`
- [ ] Web `vercel.json` rewrites `/api/*` to the API project and falls back to `index.html` for SPA routes
- [ ] From the web domain, `/api/v1/health` responds (same origin, no CORS)
- [ ] Production and preview environment variables configured

### S-0.5 Set up external services

- **Repo:** api · **Points:** 3 · **DESIGN:** §10, §11, §12
- **Requirements:** T-20, T-21, T-22, T-15, R-44.7
- **Depends on:** S-0.4

**Acceptance criteria**

- [ ] MongoDB Atlas M0 clusters for `dev` and `prod`; connection cached across invocations, `maxPoolSize: 5`
- [ ] Cloudinary account on the club Gmail; PDF and ZIP delivery allowed in the security settings; API secret stored only as a Vercel env var (T-21, changed from Supabase in DESIGN v0.4)
- [ ] Club Gmail app password created and stored as a secret
- [ ] Cloudflare Turnstile site and secret keys created
- [ ] At-rest encryption confirmed for Atlas and Cloudinary and recorded in the runbook (R-44.7)

### S-0.6 API security and error baseline

- **Repo:** api · **Points:** 3 · **DESIGN:** §6.1, §12
- **Requirements:** R-44.1, R-12.2, T-10
- **Depends on:** S-0.1

**Acceptance criteria**

- [ ] Middleware redirects any non-HTTPS request (`x-forwarded-proto`) to HTTPS
- [ ] `helmet` sends HSTS (`max-age=31536000; includeSubDomains`)
- [ ] Unified error format `{ error: { code, message, fields } }` with codes 400/401/403/404/409/429
- [ ] `csrfGuard` rejects state-changing requests without `X-CDC-Request: 1` or with a foreign `Origin`
- [ ] `validate(zodSchema)` and `rateLimit` helpers available; `pino-http` logs contain no PII
- [ ] Mongoose `sanitizeFilter` and `strictQuery` enabled

### S-0.7 Design system and layouts

- **Repo:** web · **Points:** 8 · **DESIGN:** §4.2, §4.3, §4.5
- **Requirements:** R-05.1, R-33, R-34, R-35, R-37.1, R-37.2, R-37.3, R-38, R-42
- **Depends on:** S-0.2

**Acceptance criteria**

- [ ] Tailwind theme holds the design tokens from DESIGN §4.2 (colors, radii, fonts)
- [ ] IBM Plex Sans Hebrew and JetBrains Mono self-hosted with `font-display: swap`
- [ ] Base components restyled to the Claude Design: Button, Input, Select, Textarea, Dialog, Drawer, Tabs, Switch, Toast, Skeleton, EmptyState, StatusPill, WeekChip, Avatar (initials fallback), ConfirmDialog, UndoToast
- [ ] Layouts built: SiteHeader (guest / applicant / member variants), SiteFooter with social links, DashSidebar (mentor / admin), DashTopbar
- [ ] Motion primitives (route transition, scroll reveal) disabled under `prefers-reduced-motion`
- [ ] Every component has a visible focus ring and passes `vitest-axe`
- [ ] Design gate (R-33): open gaps from the design review (mobile views, week edit screen, account menu, member notes and absence history) are closed in Claude Design before their screens are built

### S-0.8 Team onboarding page (HTML)

- **Repo:** both · **Points:** 2 · **DESIGN:** §3, §14
- **Requirements:** T-13
- **Depends on:** S-0.1, S-0.2, S-0.3, S-0.4, S-0.5, S-0.6, S-0.7

**Acceptance criteria**

- [ ] Single self-contained HTML file in `colmandevclub-web/docs/onboarding.html`, linked from both READMEs
- [ ] Prerequisites, tool access (GitHub, Jira, Vercel, Atlas, Cloudinary) and where secrets come from
- [ ] Local setup for both repos: clone, install, `.env`, run API + web together
- [ ] Folder structure of both repos and where new code goes
- [ ] Conventions: RTL logical classes, zod schemas, policies, error format
- [ ] Workflow: sprint story → branch `KAN-<n>-<slug>` → PR with R-IDs + Jira key → CI + review → merge
- [ ] How to run unit, API and E2E tests; links to REQUIREMENTS, DESIGN, TASKS, Claude Design, Jira
- [ ] A teammate not involved in setup follows it end to end without help
