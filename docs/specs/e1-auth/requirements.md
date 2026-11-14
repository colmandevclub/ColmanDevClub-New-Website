# E1 Authentication & accounts — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-07, R-08, R-10, R-11. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### B. Accounts

#### R-07 Sign up & sign in — **Must**

1. THE SYSTEM SHALL support signing up and signing in with Google and with email + password.
2. WHEN someone signs up without an invitation, THE SYSTEM SHALL assign the Applicant role.
3. WHEN someone signs up through a valid invitation (R-13), THE SYSTEM SHALL assign the role and Academic Year the invitation specifies.
4. IF sign-in fails, THEN THE SYSTEM SHALL show a generic error that doesn't reveal whether the account exists.
5. IF there are repeated failed sign-in attempts, THEN THE SYSTEM SHALL temporarily throttle further attempts.

#### R-08 Email verification & password reset — **Must**

1. WHEN a user signs up with email, THE SYSTEM SHALL require email verification before granting any role above Applicant.
2. WHEN a user requests a password reset, THE SYSTEM SHALL email a single-use link that expires.

#### R-10 Profile — **Must**

1. THE SYSTEM SHALL let every signed-in user edit their name, photo, title, field of study, school year and professional links.
2. IF a link isn't a valid URL, THEN THE SYSTEM SHALL reject it.
3. THE SYSTEM SHALL normalize every link before saving it.

#### R-11 Account menu — **Must**

1. WHILE a user is signed in, THE SYSTEM SHALL give access to their profile, their role's home area and sign-out.
2. THE SYSTEM SHALL show the dashboard entry only to Mentors and Admins.
