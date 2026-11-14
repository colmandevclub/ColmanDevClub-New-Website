# E3 Admissions — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §6.2 admissions endpoints, §9.1. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 6. API design

### 6.2 Endpoints

**Auth & account**

| Method | Path              | Access    | Requirements |
| ------ | ----------------- | --------- | ------------ |
| GET    | `/me/application` | Applicant | R-09         |

**Public**

| Method | Path                                               | Requirements   |
| ------ | -------------------------------------------------- | -------------- |
| GET    | `/public/assessment-days` (open and not full only) | R-04.2         |
| GET    | `/public/form-options`                             | R-04.1, R-29.2 |
| POST   | `/public/applications` (Turnstile token required)  | R-04           |

**Admissions**

| Method                      | Path                                                               | Access        | Requirements   |
| --------------------------- | ------------------------------------------------------------------ | ------------- | -------------- |
| GET / POST / PATCH          | `/assessment-days[/:id]`                                           | Admin         | R-29.1         |
| GET / POST / PATCH / DELETE | `/form-options[/:id]`                                              | Admin         | R-29.2         |
| GET                         | `/applications?status=&dayId=&q=` (contact fields only for Admins) | Mentor, Admin | R-29.3, R-44.2 |
| PUT                         | `/applications/:id/evaluations/me` `{ score 1–5, notes }`          | Mentor, Admin | R-29.3         |
| PATCH                       | `/applications/:id/status` `{ accepted \| not_accepted }`          | Admin         | R-29.4–5       |
| POST                        | `/applications/assign-day` `{ applicationIds, dayId }`             | Admin         | R-29.7         |
| GET                         | `/applications/export.csv`                                         | Admin         | R-29.6         |

## 9. Key business flows

### 9.1 Registration → Waitlisted / Registered (R-04, R-29.7, D22)

1. `POST /public/applications` with the Turnstile token and the honeypot field, rate-limited to 5/h per IP.
2. Validate with zod. Find or create the password-less Applicant user (R-04.5).
3. If `assessmentDayId` is present → check the day is open and `registeredCount < capacity`, using an atomic `$inc` with a condition → `status: registered`. Otherwise → `status: waitlisted` (R-04.8).
4. Upsert on `(admissionYearId, email)` (R-04.6).
5. Send the confirmation email with a "set password" link (R-04.4).
6. Later, an Admin assigns waitlisted applicants to a day → `registered` (R-29.7).
