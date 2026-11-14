# E6 Member tracking & overview — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-22, R-23, R-27, R-28. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### F. Member tracking

#### R-22 Absences — **Must**

_As a mentor, I want to mark members who didn't show up, so that I can spot members who are falling away._

1. THE SYSTEM SHALL let any Mentor assigned to the year, and Admins, mark one or more members as absent from a session, with an optional note (e.g. a reason).
2. THE SYSTEM SHALL treat marking as optional. THE SYSTEM SHALL NOT require, prompt for, or flag a missing absence report for any session (D16).
3. THE SYSTEM SHALL consider a member present at a session unless they're marked absent from it.
4. THE SYSTEM SHALL allow an absence to be removed or edited later, and record who changed it.
5. THE SYSTEM SHALL show each member's absence count and attendance rate for the year, based on the sessions held so far.

#### R-23 Progress — **Must**

_As a mentor, I want to see each member's progress, so that I can help the members who need it._

1. THE SYSTEM SHALL record automatically which published materials each member opened, and when. Members SHALL NOT need to take any action for this (D10).
2. THE SYSTEM SHALL let Mentors and Admins add dated notes on a member, visible to Mentors and Admins only.
3. THE SYSTEM SHALL let Mentors and Admins set a status on each member: On track / Needs attention / At risk / Inactive.
4. THE SYSTEM SHALL give Mentors and Admins a per-member view that combines absence history, material engagement, notes and status.

### G. Management dashboard (Mentor & Admin)

#### R-27 Overview — **Must**

_As a mentor or admin, I want a one-screen summary of the year, so that I know what needs attention._

1. THE SYSTEM SHALL show key figures for the viewed year: number of members, average attendance rate, the current week, and how many materials are published for the current week.
2. _Retired: attendance trend chart (D27)._
3. THE SYSTEM SHALL list the members whose status is Needs attention or At risk (R-23.3).
4. THE SYSTEM SHALL show the curriculum for the current week and the next week, including mentor and material status.
5. THE SYSTEM SHALL show recent activity: materials published, absences marked, member status changes.
6. WHILE a Mentor is signed in, THE SYSTEM SHALL emphasize the weeks they teach and their pending actions (e.g. a week without materials). Absence marking SHALL NOT be shown as a pending action.
7. THE SYSTEM SHALL show pending applicants.

#### R-28 Members list — **Must**

1. THE SYSTEM SHALL list the members of the viewed year with attendance rate, status and last activity, sortable and filterable.
2. WHEN a member is selected, THE SYSTEM SHALL open the per-member view (R-23.4).
