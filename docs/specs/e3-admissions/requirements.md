# E3 Admissions — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-04, R-09, R-29. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### A. Public features

#### R-04 Assessment-day registration — **Must**

_As a candidate, I want to register for an assessment day, so that I can be considered for the club._

1. THE SYSTEM SHALL collect the candidate's full name, email, phone, field of study, school year, preferred assessment day and experience level.
2. THE SYSTEM SHALL offer only assessment days that are open and not full.
3. IF a required field is missing or invalid, THEN THE SYSTEM SHALL show an error next to that field and not submit.
4. WHEN a registration is submitted, THE SYSTEM SHALL confirm it on screen and by email.
5. WHEN a registration is submitted, THE SYSTEM SHALL create or link an Applicant account for that email.
6. IF the same email registers again in the same Academic Year, THEN THE SYSTEM SHALL keep the existing registration unchanged, show the same confirmation as for a new registration, and email that address a confirmation link. WHEN the link is opened, THE SYSTEM SHALL apply the new details to the existing registration (D34).
7. THE SYSTEM SHALL protect registration from automated spam.
8. IF no assessment day is open, THEN THE SYSTEM SHALL still accept the registration without a day and set the applicant's status to Waitlisted (D22).

### B. Accounts

#### R-09 Applicant status — **Must**

_As an applicant, I want to see where my application stands, so that I'm not left guessing._

1. WHILE signed in as an Applicant, THE SYSTEM SHALL show the application status: Waitlisted / Registered / Accepted / Not accepted (D22).
2. WHEN an Admin accepts an applicant (R-29), THE SYSTEM SHALL make the user a Member of the active Academic Year.
3. THE SYSTEM SHALL NOT show applicants any member-only content.

### G. Management dashboard (Mentor & Admin)

#### R-29 Admissions — **Must**

1. THE SYSTEM SHALL let an Admin create assessment days with a date, time, location and capacity, and open or close them for registration.
2. THE SYSTEM SHALL let an Admin manage the answer options offered in registration (field of study, school year, experience).
3. THE SYSTEM SHALL let Mentors and Admins view applicants, filter them, and record an evaluation (score and notes) for each one (D11).
4. THE SYSTEM SHALL set an applicant's status to Waitlisted or Registered automatically on registration (R-04), and SHALL let an Admin set it to Accepted or Not accepted.
5. WHEN an Admin accepts an applicant, THE SYSTEM SHALL make them a Member of the active year (R-09.2).
6. THE SYSTEM SHALL let an Admin export the applicant list.
7. WHEN an assessment day opens, THE SYSTEM SHALL let an Admin assign Waitlisted applicants to it, changing their status to Registered.
