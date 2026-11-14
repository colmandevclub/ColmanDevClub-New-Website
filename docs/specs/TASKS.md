# ColmanDevClub — TASKS

Implements REQUIREMENTS v1.0 and DESIGN v0.4. Stage 3 of SDD (requirements → design → tasks).

**Conventions**

- Epic `E#` → Story `S-#.#`. Every story lists the requirement IDs it satisfies (R-xx / T-xx), the DESIGN section, its dependencies and its acceptance criteria.
- Epics are in dependency order. Within an epic, stories are in build order.
- Repo: `api` = colmandevclub-api, `web` = colmandevclub-web, `both` = one PR in each.
- Points: Fibonacci (1, 2, 3, 5, 8). Anything bigger gets split.
- Definition of done: CI green, tests for the acceptance criteria, reviewed, deployed to preview, R-IDs in the PR description.

## Summary

| Epic | Name                        | Stories | Points  |
| ---- | --------------------------- | ------- | ------- |
| E0   | Project setup & foundations | 8       | 27      |
| E1   | Authentication & accounts   | 8       | 33      |
| E2   | Public site                 | 4       | 14      |
| E3   | Admissions                  | 6       | 25      |
| E4   | Academic years & curriculum | 4       | 16      |
| E5   | Study materials             | 7       | 29      |
| E6   | Member tracking & overview  | 4       | 18      |
| E7   | User management & privacy   | 3       | 13      |
| E8   | Quality & launch            | 5       | 17      |
|      | **Total**                   | **49**  | **192** |

## Suggested milestones

1. **M1 — Foundations:** E0 + E1 (anyone can sign in, roles enforced).
2. **M2 — Public & admissions:** E2 + E3 (the site can replace the current one for recruiting).
3. **M3 — Teaching:** E4 + E5 (mentors publish, members learn).
4. **M4 — Tracking & admin:** E6 + E7.
5. **M5 — Launch:** E8.

E2 can run in parallel with E1 once S-0.7 is done.

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

## E1 — Authentication & accounts

_People can sign up, sign in, verify, reset, and manage their profile; every request is checked by role._

### S-1.1 Users, sessions and email/password auth API

- **Repo:** api · **Points:** 8 · **DESIGN:** §5.1, §5.3, §8 users/sessions
- **Requirements:** R-07.1, R-07.2, R-07.4, R-07.5, T-10, T-14
- **Depends on:** S-0.6

**Acceptance criteria**

- [ ] `users` and `sessions` models with the indexes in DESIGN §8
- [ ] `POST /auth/signup` creates an Applicant with an argon2id password hash
- [ ] `POST /auth/login` sets `cdc_at` (15 min) and `cdc_rt` (30 days) as `HttpOnly; Secure; SameSite=Lax` cookies
- [ ] `POST /auth/refresh` rotates the refresh token; reusing an old one revokes all of the user's sessions
- [ ] `POST /auth/logout` revokes the session and clears both cookies; `GET /auth/me` returns the current user
- [ ] Login failure always returns the same generic message (R-07.4); 5 failures / 15 min per IP+email returns 429 (R-07.5)
- [ ] Changing `tv` invalidates outstanding access tokens

### S-1.2 Email service and templates

- **Repo:** api · **Points:** 2 · **DESIGN:** §11
- **Requirements:** T-22, R-04.4, R-08, R-13.1
- **Depends on:** S-0.5

**Acceptance criteria**

- [ ] `EmailService` interface with a Gmail SMTP adapter (nodemailer) and a console adapter for development
- [ ] Hebrew RTL templates with plain-text fallback: registration-confirmation, verify-email, reset-password, invite
- [ ] Sending failures are logged without PII and don't crash the request

### S-1.3 Email verification, password reset and set-password

- **Repo:** api · **Points:** 5 · **DESIGN:** §5.3, §8 emailTokens
- **Requirements:** R-08.1, R-08.2, R-04.5
- **Depends on:** S-1.1, S-1.2

**Acceptance criteria**

- [ ] Email sign-up sends a single-use verification link valid 24 h; `POST /auth/verify-email` marks the user verified
- [ ] Roles above Applicant don't take effect until the email is verified (R-08.1)
- [ ] `POST /auth/forgot-password` always returns a neutral response; the reset link is single-use, valid 1 h, and bumps `tv`
- [ ] A `set_password` token lets a password-less applicant set a password
- [ ] Tokens are stored only as SHA-256 hashes

### S-1.4 Google sign-in

- **Repo:** both · **Points:** 3 · **DESIGN:** §5.3
- **Requirements:** R-07.1
- **Depends on:** S-1.1

**Acceptance criteria**

- [ ] Google Identity Services button on sign-in and sign-up
- [ ] `POST /auth/google` verifies the ID token's signature, audience and `email_verified`
- [ ] Links to an existing account with the same email, otherwise creates an Applicant
- [ ] Same session cookies as email login

### S-1.5 Authorization framework and role guards

- **Repo:** both · **Points:** 5 · **DESIGN:** §4.1, §7
- **Requirements:** R-12.1, R-12.2, R-12.3, R-12.4, R-11.2
- **Depends on:** S-1.1

**Acceptance criteria**

- [ ] `authenticate` middleware rejects missing, expired, deactivated or outdated-`tv` tokens
- [ ] Policy functions in `src/policies/` (isAdmin, isMentorOfYear, canEditWeekContent, canManageMaterials, canViewMaterial, canSeeApplicantContact, canSeeTracking)
- [ ] Table-driven tests cover every row of the permission table in REQUIREMENTS §3
- [ ] Denied requests return 403/404 without revealing data (R-12.2)
- [ ] Web `<RequireRole>` guard redirects to `/signin` or `/403`; the dashboard route group is Mentor/Admin only
- [ ] No-access (403) and Not-found pages implemented from the design

### S-1.6 Auth screens

- **Repo:** web · **Points:** 5 · **DESIGN:** §4.1 auth routes
- **Requirements:** R-07, R-08
- **Depends on:** S-0.7, S-1.3, S-1.4

**Acceptance criteria**

- [ ] Sign in / sign up screen as in the design, with show/hide password
- [ ] Verify-email, forgot-password, check-your-email and set-new-password screens
- [ ] Generic error banner on failed login; throttling message on 429
- [ ] Silent refresh: a 401 triggers `/auth/refresh` once, then retries the original request

### S-1.7 Account menu and role home redirect

- **Repo:** web · **Points:** 2 · **DESIGN:** §4.1
- **Requirements:** R-11.1, R-11.2
- **Depends on:** S-1.6

**Acceptance criteria**

- [ ] Signed-in header shows an avatar menu: Profile, my area, Sign out
- [ ] Dashboard entry shown only to Mentors and Admins
- [ ] After sign-in: Applicant → `/application`, Member → `/my`, Mentor/Admin → `/dashboard`

### S-1.8 Profile page

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2 /me/profile, §10
- **Requirements:** R-10.1, R-10.2, R-10.3
- **Depends on:** S-1.5, S-5.1

**Acceptance criteria**

- [ ] `GET/PATCH /me/profile` for name, title, field of study, school year, LinkedIn, GitHub, website
- [ ] Invalid URLs rejected with a field error; valid links normalized (https added, whitespace trimmed)
- [ ] Photo upload through a signed URL to the `avatars` bucket; initials shown when there's no photo
- [ ] Profile screen and save toast as in the design

## E2 — Public site

_The public pages present the club, the projects and the mentors._

### S-2.1 Home page

- **Repo:** web · **Points:** 8 · **DESIGN:** §3.1 content/, §4.5, §4.6
- **Requirements:** R-01, R-02, R-05.2, R-05.3, R-35, R-41
- **Depends on:** S-0.7

**Acceptance criteria**

- [ ] Home sections built from the design: hero, what members build, project showcase, join CTA
- [ ] Showcase reads from `content/` (D12, D23); a designed placeholder is shown when a project has no visual
- [ ] If the showcase auto-advances, it can be paused and navigated manually (R-02.4)
- [ ] Every join button goes to `/join` (R-05.2); social links present (R-05.3)
- [ ] The 3D hero scene loads lazily after first paint, with a static fallback; reveals respect reduced motion
- [ ] Public entry chunk ≤ 150 KB gzip

### S-2.2 Mentors directory

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2 /public/mentors
- **Requirements:** R-03.1, R-03.2, R-03.3
- **Depends on:** S-4.2, S-0.7

**Acceptance criteria**

- [ ] `GET /public/mentors` returns mentors grouped by academic year, newest first
- [ ] Legacy mentors group comes from `content/`
- [ ] Cards show photo or initials, name, title and links; reveal interaction as in the design
- [ ] A mentor assigned to a year appears in that year's group automatically

### S-2.3 Link preview and tab titles

- **Repo:** web · **Points:** 1 · **DESIGN:** §3.1 index.html, §4.1
- **Requirements:** R-06.1, R-06.2
- **Depends on:** S-0.2

**Acceptance criteria**

- [ ] `index.html` contains site-wide `<title>`, description, Open Graph and Twitter tags with a share image
- [ ] A `useTitle()` hook sets a distinct tab title on every route
- [ ] Verified with a link-preview debugger (WhatsApp/LinkedIn)

### S-2.4 Migrate public content from the current site

- **Repo:** web · **Points:** 2 · **DESIGN:** §3.1 content/
- **Requirements:** R-02, R-03, R-05.3
- **Depends on:** S-2.1

**Acceptance criteria**

- [ ] Selected showcase projects (D12) added to `content/` with links and tech tags
- [ ] Legacy mentors and their links added to `content/`; broken links from the old site fixed
- [ ] Social links (GitHub, LinkedIn, Instagram, WhatsApp) added

## E3 — Admissions

_Candidates register, mentors evaluate, admins decide._

### S-3.1 Assessment days and registration options

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Admissions, §8
- **Requirements:** R-29.1, R-29.2
- **Depends on:** S-1.5, S-0.7

**Acceptance criteria**

- [ ] `assessmentDays` and `formOptions` models and Admin endpoints
- [ ] Admin creates days with date, time, location and capacity, and opens or closes them
- [ ] Admin adds, removes and orders the options for field of study, school year and experience
- [ ] Assessment Days screen as in the design (capacity bar, open/closed switch)

### S-3.2 Public registration API

- **Repo:** api · **Points:** 5 · **DESIGN:** §9.1
- **Requirements:** R-04.1, R-04.2, R-04.4, R-04.5, R-04.6, R-04.7, R-04.8, T-15
- **Depends on:** S-3.1, S-1.3

**Acceptance criteria**

- [ ] `GET /public/assessment-days` returns only open days that aren't full
- [ ] `POST /public/applications` requires a valid Turnstile token and an empty honeypot; 5/h per IP
- [ ] With a day: status Registered, capacity enforced atomically. Without an open day: status Waitlisted
- [ ] Same email in the same admission year updates the existing application
- [ ] Finds or creates a password-less Applicant account
- [ ] Sends the confirmation email with a set-password link

### S-3.3 Registration screen

- **Repo:** web · **Points:** 3 · **DESIGN:** §4.1 /join
- **Requirements:** R-04, R-05.2
- **Depends on:** S-3.2, S-0.7

**Acceptance criteria**

- [ ] Form as in the design, with inline zod validation next to each field
- [ ] Only open days are offered; the no-open-days variant registers as Waitlisted
- [ ] Success and error states as in the design
- [ ] Turnstile widget included

### S-3.4 Applicant status page

- **Repo:** both · **Points:** 2 · **DESIGN:** §6.2 /me/application
- **Requirements:** R-09.1, R-09.3
- **Depends on:** S-3.2, S-1.7

**Acceptance criteria**

- [ ] `GET /me/application` returns the applicant's own status and assessment day
- [ ] Status tracker shows Waitlisted / Registered / Accepted / Not accepted
- [ ] Applicants can't reach any member-only route or endpoint

### S-3.5 Applicants list and evaluation

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Admissions, §7
- **Requirements:** R-29.3, R-44.2
- **Depends on:** S-3.2, S-1.5

**Acceptance criteria**

- [ ] `GET /applications` with filters by status, day and search
- [ ] Mentors and Admins record their own score (1–5) and notes; others' scores and the average are shown
- [ ] Phone and email are returned only to Admins; the Mentor view omits them entirely
- [ ] Applicants screen as in the design, with the mentor variant

### S-3.6 Admission decisions and export

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Admissions, §8
- **Requirements:** R-29.4, R-29.5, R-29.6, R-29.7, R-09.2
- **Depends on:** S-3.5, S-4.1

**Acceptance criteria**

- [ ] Admin sets Accepted or Not accepted; acceptance makes the user a Member of the active year (membership created, audit log written)
- [ ] Membership takes effect only after email verification (R-08.1)
- [ ] Admin assigns Waitlisted applicants to an opened day, changing them to Registered
- [ ] CSV export of the filtered applicant list (Admin only)

## E4 — Academic years & curriculum

_Admins run years, mentors and weeks; mentors see and edit their weeks._

### S-4.1 Academic years

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Years, §8 academicYears
- **Requirements:** R-14.1, R-14.2, R-14.3, R-14.4
- **Depends on:** S-1.5, S-0.7

**Acceptance criteria**

- [ ] Admin creates a year with name, dates and number of weeks; weeks 1…N are generated
- [ ] Changing the number of weeks adds or removes empty trailing weeks
- [ ] Exactly one active year enforced by a partial unique index
- [ ] Archived years are read-only
- [ ] Academic Years screen as in the design

### S-4.2 Mentor assignment to years

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2, §8 yearMemberships
- **Requirements:** R-15.1, R-15.2
- **Depends on:** S-4.1

**Acceptance criteria**

- [ ] Admin adds and removes mentors of a year
- [ ] Removing a mentor revokes their management access to that year; their materials remain
- [ ] Changes written to the audit log

### S-4.3 Weekly curriculum

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 /weeks, §7 canEditWeekContent
- **Requirements:** R-16.1, R-16.2, R-16.4, R-16.5, R-16.6
- **Depends on:** S-4.2

**Acceptance criteria**

- [ ] Curriculum screen lists weeks 1…N with topic, mentors, session date and material status
- [ ] Admin edits a week's mentors, date, topic and description
- [ ] Mentors assigned to a week edit its topic and description; other mentors see it read-only
- [ ] Weeks with no mentor or no published materials are flagged
- [ ] Each mentor sees the weeks they teach highlighted

### S-4.4 Year switcher, dashboard search and settings

- **Repo:** both · **Points:** 3 · **DESIGN:** §4.4, §6.2 /search
- **Requirements:** R-26.1, R-26.2, R-26.3, R-26.4
- **Depends on:** S-4.1, S-0.7

**Acceptance criteria**

- [ ] Topbar year switcher, defaulting to the active year and kept in the URL
- [ ] `GET /search` across members, weeks and materials of the viewed year
- [ ] Topbar shows the signed-in user and role
- [ ] Settings entry in the sidebar links to personal settings

## E5 — Study materials

_Mentors publish materials; members find and download them._

### S-5.1 Storage service

- **Repo:** api · **Points:** 3 · **DESIGN:** §10
- **Requirements:** R-18.4, R-19.3, T-21
- **Depends on:** S-0.5, S-1.5

**Acceptance criteria**

- [ ] `StorageService` with Cloudinary and local filesystem adapters
- [ ] `POST /materials/upload-url` validates type (PDF, images, ZIP, PPTX/DOCX) and size (≤ 10 MB) and returns signed upload parameters for an `authenticated` (private) asset
- [ ] Rejected files return a clear error message (R-18.4)
- [ ] Signed download URLs expire after 5 minutes; assets have no public delivery URL

### S-5.2 Materials API

- **Repo:** api · **Points:** 5 · **DESIGN:** §6.2 Materials, §7 canManageMaterials
- **Requirements:** R-18.1, R-18.2, R-18.3, R-18.5, R-19.1, R-19.2
- **Depends on:** S-5.1, S-4.3

**Acceptance criteria**

- [ ] Create, edit and delete materials of kind file or link, attached to a year and week
- [ ] Any mentor of the year can manage materials of any week of that year (D28)
- [ ] Title, description, tags, type (lesson / exercise / solution / recording)
- [ ] Visibility Draft / Published / Mentors-only; `publishedAt` set on publish
- [ ] Author and last-updated time returned

### S-5.3 Dashboard materials screen

- **Repo:** web · **Points:** 5 · **DESIGN:** §4.1 /dashboard/materials
- **Requirements:** R-18, R-19, R-37.5
- **Depends on:** S-5.2, S-0.7

**Acceptance criteria**

- [ ] Week chips and per-week material list with state pills, as in the design
- [ ] Add-material drawer in 3 steps: kind → details → publish (R-37.5)
- [ ] Upload progress and file-rejection message
- [ ] Edit, unpublish (with undo) and delete (with confirm)

### S-5.4 Download, open and view tracking

- **Repo:** api · **Points:** 3 · **DESIGN:** §6.2 /download, /open, §8 materialViews
- **Requirements:** R-20.3, R-23.1, R-19.3
- **Depends on:** S-5.2

**Acceptance criteria**

- [ ] `GET /materials/:id/download` checks permission, records the view, 302s to a signed URL
- [ ] `GET /materials/:id/open` records the view and 302s to the external link
- [ ] Views upserted per (material, user) with first and last opened time and count

### S-5.5 Member materials library

- **Repo:** both · **Points:** 5 · **DESIGN:** §4.1 /my/materials
- **Requirements:** R-20.1, R-20.2, R-20.3, R-20.4
- **Depends on:** S-5.4, S-0.7

**Acceptance criteria**

- [ ] Published materials of the member's year grouped by week, current week emphasized
- [ ] Search by title, topic and tag
- [ ] Download and open directly from the week view
- [ ] "New since your last visit" badges; `POST /me/materials/seen` updates the last visit
- [ ] Mentors-only and draft items never returned to members

### S-5.6 Member home

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2 /me/week
- **Requirements:** R-32.1, R-32.2, R-32.3
- **Depends on:** S-5.5

**Acceptance criteria**

- [ ] `GET /me/week` returns the current week's topic, mentors, session date and materials
- [ ] Member home screen as in the design, with the no-materials-yet empty state
- [ ] No attendance, absence, progress, note or status data in any member response or screen

### S-5.7 Reuse from earlier years

- **Repo:** both · **Points:** 5 · **DESIGN:** §9.2
- **Requirements:** R-17.1, R-17.2, R-17.3
- **Depends on:** S-5.2

**Acceptance criteria**

- [ ] Mentors and Admins browse earlier years' curriculum and materials (read-only)
- [ ] Copy a single material, a whole week, or a whole curriculum into the current year
- [ ] Copies are independent, start as Draft, and share the immutable stored file
- [ ] A file object is deleted only when no material references it
- [ ] Reuse screen as in the design, with a preview of what will be copied

## E6 — Member tracking & overview

_Mentors mark absences and follow each member's progress._

### S-6.1 Absences

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Tracking, §8 absences
- **Requirements:** R-22.1, R-22.2, R-22.3, R-22.4, R-37.4
- **Depends on:** S-4.3

**Acceptance criteria**

- [ ] Any mentor of the year or Admin marks or unmarks a member absent for a session, with an optional note
- [ ] Marking an absence for the current session takes ≤ 3 interactions from the dashboard (optimistic update)
- [ ] No reminder, warning or flag ever appears for sessions without marks
- [ ] Edits recorded with who changed them (audit log)
- [ ] Absences screen as in the design

### S-6.2 Members list

- **Repo:** both · **Points:** 3 · **DESIGN:** §8 derived values
- **Requirements:** R-28.1, R-28.2, R-22.5
- **Depends on:** S-6.1

**Acceptance criteria**

- [ ] Members of the viewed year with attendance rate, absence count, status and last activity
- [ ] Attendance rate = (sessions held − absences) / sessions held; unmarked = present
- [ ] Sortable and filterable by status; search by name
- [ ] Row opens the per-member view; loading and empty states as in the design

### S-6.3 Per-member view

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 /members/:userId
- **Requirements:** R-23.2, R-23.3, R-23.4, R-44.3
- **Depends on:** S-6.2, S-5.4

**Acceptance criteria**

- [ ] Shows absence history, materials opened (and not opened), notes and status
- [ ] Mentors and Admins add dated private notes
- [ ] Status On track / Needs attention / At risk / Inactive, with who changed it and when
- [ ] Only the year's mentors and Admins can access it

### S-6.4 Dashboard overview

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 /overview
- **Requirements:** R-27.1, R-27.3, R-27.4, R-27.5, R-27.6, R-27.7
- **Depends on:** S-6.3, S-3.5

**Acceptance criteria**

- [ ] Key figures: members, average attendance, current week, materials published this week
- [ ] Members with status Needs attention or At risk
- [ ] This week and next week with mentor and material status
- [ ] Recent activity: materials published, absences marked, status changes
- [ ] Mentor variant highlights their weeks and pending actions; absence marking is never a pending action
- [ ] Pending applicants list

## E7 — User management & privacy

_Admins manage users and roles; personal data can be deleted._

### S-7.1 Users, roles and audit log

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Users, §8 auditLogs
- **Requirements:** R-13.2, R-13.3, R-13.4, R-13.5
- **Depends on:** S-1.5, S-0.7

**Acceptance criteria**

- [ ] Users list with search and filters by role, year and status
- [ ] Admin changes a role or deactivates/reactivates a user; `tv` bumped so it applies immediately
- [ ] Deactivated users can't sign in; their history is kept
- [ ] Audit log of role changes, deactivations and permission-relevant actions, viewable by Admins

### S-7.2 Invites

- **Repo:** both · **Points:** 3 · **DESIGN:** §5.3, §8 invites
- **Requirements:** R-13.1, R-07.3
- **Depends on:** S-7.1, S-1.2

**Acceptance criteria**

- [ ] Admin invites one or many emails with a role and year
- [ ] Invite email with a single-use link valid 7 days
- [ ] `/invite/:token` sign-up fixes the email and applies the invited role and year

### S-7.3 Delete user data

- **Repo:** both · **Points:** 5 · **DESIGN:** §9.3
- **Requirements:** R-44.4, R-44.6
- **Depends on:** S-7.1, S-5.2

**Acceptance criteria**

- [ ] Admin permanently deletes a user from the Users screen, with confirmation
- [ ] A Member deletes their own account from the Profile page after typing a confirmation phrase
- [ ] Personal data removed in one transaction (sessions, tokens, views, absences, notes about them, applications, memberships, photo)
- [ ] Materials they authored remain, attributed to "deleted user"; audit entries anonymized

## E8 — Quality & launch

_The site meets the non-functional requirements and goes live._

### S-8.1 Accessibility pass

- **Repo:** web · **Points:** 3 · **DESIGN:** §4.5, §13
- **Requirements:** R-42
- **Depends on:** S-6.4, S-5.6

**Acceptance criteria**

- [ ] Every screen usable by keyboard only, with visible focus
- [ ] `vitest-axe` clean on all page components; Lighthouse Accessibility ≥ 90
- [ ] Meaningful alt text and labels everywhere

### S-8.2 Performance pass and Lighthouse CI

- **Repo:** web · **Points:** 3 · **DESIGN:** §4.6, §13
- **Requirements:** R-41.1, R-41.2, R-41.3
- **Depends on:** S-2.1

**Acceptance criteria**

- [ ] Lighthouse CI on PR previews; public pages ≥ 90 in every category on mobile
- [ ] LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on public pages
- [ ] Dashboard views interactive within 2 s

### S-8.3 Responsive pass

- **Repo:** web · **Points:** 3 · **DESIGN:** §15 R-43
- **Requirements:** R-43.1, R-43.2
- **Depends on:** S-6.4, S-5.6

**Acceptance criteria**

- [ ] Public pages and member area fully usable from 360 px
- [ ] Dashboard fully usable on tablet and desktop; core read-only views work on phones

### S-8.4 End-to-end tests for key flows

- **Repo:** web · **Points:** 5 · **DESIGN:** §13
- **Requirements:** R-04, R-20, R-22, R-29
- **Depends on:** S-6.4, S-3.6

**Acceptance criteria**

- [ ] Playwright runs on the preview deployment
- [ ] Flows: join → status; member finds this week's material; mentor marks an absence in ≤ 3 interactions; admin accepts an applicant

### S-8.5 Production launch

- **Repo:** both · **Points:** 3 · **DESIGN:** §12, §14, §17
- **Requirements:** R-44.1, R-44.7
- **Depends on:** S-8.1, S-8.2, S-8.3, S-8.4

**Acceptance criteria**

- [ ] Production env vars set; first Admin account created
- [ ] HTTPS redirect and HSTS verified on production
- [ ] Encryption at rest re-verified for Atlas and Cloudinary
- [ ] Domain decision (O-4: stay on `.vercel.app`) applied; old site redirected to the new one

## Jira plan (rebuilt 2026-11-14)

The stories above are the original plan. Jira is the live plan: after the 2026-11-14 code/Jira audit, E0 grew from S-0.8 to S-0.22, and component stories (S-0.14 to S-0.19 sub-tasks) were folded into their parents. Stable IDs are kept; superseded items stay in Jira, marked `[Superseded]`, and their IDs are not reused.

- Board: <https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1>
- E0 epic (KAN-1): <https://almoglavi29.atlassian.net/browse/KAN-1>

| Story                                                    | Jira            | Status (2026-11-14) | Notes                                             |
| -------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------- |
| S-0.1 – S-0.6                                            | KAN-10 – KAN-15 | Done                | Sprint 1 setup baseline                           |
| S-0.7 Theme, fonts, motion, component gallery            | KAN-16          | To Do               | Split into S-0.7-A/B/C (KAN-117 – KAN-119)        |
| S-0.8 Team onboarding page                               | KAN-58          | Done                | File restored to `docs/onboarding.html` by S-0.22 |
| S-0.9 Shared CLAUDE.md and SDD example                   | KAN-59          | Done                | `docs/sdd/`                                       |
| S-0.10 Design: mobile views, section below the hero      | KAN-60          | To Do               |                                                   |
| S-0.11 Decisions needed from the chairman                | KAN-61          | Done                | Answers recorded as DESIGN O-4, O-5 by S-0.22     |
| S-0.12 API docs: OpenAPI + Swagger UI                    | KAN-62          | Done                | T-23                                              |
| S-0.13 CodeRabbit PR reviews                             | KAN-63          | Done                | T-24                                              |
| S-0.14 – S-0.19 Components and layouts                   | KAN-66 – KAN-71 | To Do               |                                                   |
| S-0.20 MongoDB across serverless requests                | KAN-112         | To Do               |                                                   |
| S-0.21 HTTPS local development and deployment routing    | KAN-113         | To Do               |                                                   |
| S-0.22 Restore specs and onboarding; reconcile decisions | KAN-114         | In progress         | This reconciliation                               |

## Traceability (requirement → stories)

| Requirement | Stories                                         |
| ----------- | ----------------------------------------------- |
| R-01        | S-2.1                                           |
| R-02        | S-2.1, S-2.4                                    |
| R-03        | S-2.2, S-2.4                                    |
| R-04        | S-1.2, S-1.3, S-3.2, S-3.3, S-8.4               |
| R-05        | S-0.7, S-2.1, S-2.4, S-3.3                      |
| R-06        | S-2.3                                           |
| R-07        | S-1.1, S-1.4, S-1.6, S-7.2                      |
| R-08        | S-1.2, S-1.3, S-1.6                             |
| R-09        | S-3.4, S-3.6                                    |
| R-10        | S-1.8                                           |
| R-11        | S-1.5, S-1.7                                    |
| R-12        | S-0.6, S-1.5                                    |
| R-13        | S-1.2, S-7.1, S-7.2                             |
| R-14        | S-4.1                                           |
| R-15        | S-4.2                                           |
| R-16        | S-4.3                                           |
| R-17        | S-5.7                                           |
| R-18        | S-5.1, S-5.2, S-5.3                             |
| R-19        | S-5.1, S-5.2, S-5.3, S-5.4                      |
| R-20        | S-5.4, S-5.5, S-8.4                             |
| R-22        | S-6.1, S-6.2, S-8.4                             |
| R-23        | S-5.4, S-6.3                                    |
| R-26        | S-4.4                                           |
| R-27        | S-6.4                                           |
| R-28        | S-6.2                                           |
| R-29        | S-3.1, S-3.5, S-3.6, S-8.4                      |
| R-32        | S-5.6                                           |
| R-33        | S-0.7                                           |
| R-34        | S-0.7                                           |
| R-35        | S-0.7, S-2.1                                    |
| R-37        | S-0.7, S-5.3, S-6.1                             |
| R-38        | S-0.2, S-0.7                                    |
| R-41        | S-2.1, S-8.2                                    |
| R-42        | S-0.7, S-8.1                                    |
| R-43        | S-8.3                                           |
| R-44        | S-0.4, S-0.5, S-0.6, S-3.5, S-6.3, S-7.3, S-8.5 |
| T-01        | S-0.2                                           |
| T-02        | S-0.2                                           |
| T-03        | S-0.2                                           |
| T-04        | S-0.2                                           |
| T-08        | S-0.1                                           |
| T-10        | S-0.6, S-1.1                                    |
| T-13        | S-0.1, S-0.3, S-0.8                             |
| T-14        | S-1.1                                           |
| T-15        | S-0.5, S-3.2                                    |
| T-16        | S-0.1                                           |
| T-19        | S-0.4                                           |
| T-20        | S-0.5                                           |
| T-21        | S-0.5, S-5.1, S-0.22                            |
| T-22        | S-0.5, S-1.2                                    |
| T-23        | S-0.12, S-0.22                                  |
| T-24        | S-0.13, S-0.22                                  |
| T-25        | S-0.3, S-0.22                                   |

## Changelog

| Date       | Changes                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-11-14 | S-0.22 (KAN-114): restored to `docs/specs/`; now implements DESIGN v0.4. Storage criteria in S-0.5, S-0.8, S-5.1 and S-8.5 changed from Supabase to Cloudinary (10 MB per file). Added the Jira plan section and T-23 – T-25 traceability. See `reconciliation-2026-11-14.md`. |
