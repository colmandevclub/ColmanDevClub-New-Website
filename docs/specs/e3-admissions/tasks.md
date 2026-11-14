# E3 Admissions — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-3.1, S-3.2, S-3.3, S-3.4, S-3.5, S-3.6. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

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
