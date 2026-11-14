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
| POST   | `/public/applications/confirm-update` `{ token }`  | R-04.6         |

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
3. Look up the application on `(admissionYearId, email)`.
4. **New application:** in one transaction, if `assessmentDayId` is present, increment `registeredCount` with a conditional `$inc` (`isOpen` and `registeredCount < capacity`) → `status: registered`; otherwise → `status: waitlisted` (R-04.8). Insert the application; the unique index on `(admissionYearId, email)` stops a concurrent duplicate. Send the confirmation email with a "set password" link (R-04.4).
5. **Existing application (R-04.6, D34):** change nothing. Store the submitted fields in `emailTokens` (`type: confirm_update`, 24 h) and email the address a confirmation link. The response is identical to a new registration, so it doesn't reveal that the email is registered.
6. `POST /public/applications/confirm-update` with the token: in one transaction, if the day changes, increment the new day (same conditional `$inc`; if it's full, nothing changes and the applicant is told the day is full) and decrement the old day; then update the application and mark the token used. Re-confirming the same day leaves the counts as they are.
7. Later, an Admin assigns waitlisted applicants to a day → `registered` (R-29.7).
