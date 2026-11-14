# E1 Authentication & accounts — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-1.1, S-1.2, S-1.3, S-1.4, S-1.5, S-1.6, S-1.7, S-1.8. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

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
