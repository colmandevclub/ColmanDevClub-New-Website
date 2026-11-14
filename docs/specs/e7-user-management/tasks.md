# E7 User management & privacy — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-7.1, S-7.2, S-7.3. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

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
