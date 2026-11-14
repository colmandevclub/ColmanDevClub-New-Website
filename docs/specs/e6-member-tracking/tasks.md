# E6 Member tracking & overview — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-6.1, S-6.2, S-6.3, S-6.4. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

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
