# E4 Academic years & curriculum — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-14, R-15, R-16, R-26. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### D. Academic years & curriculum

#### R-14 Academic Year lifecycle — **Must**

_As an Admin, I want to open a new year, so that each season has its own mentors, members and content._

1. THE SYSTEM SHALL let an Admin create an Academic Year with a name, start date, end date and number of weeks.
2. THE SYSTEM SHALL let an Admin change the number of weeks of a year.
3. THE SYSTEM SHALL let an Admin mark exactly one year as active.
4. WHEN a year is archived, THE SYSTEM SHALL keep its data read-only and available for reuse (R-17).

#### R-15 Mentor assignment — **Must**

1. THE SYSTEM SHALL let an Admin add mentors to an Academic Year and remove them from it.
2. WHEN a mentor is removed from a year, THE SYSTEM SHALL revoke their management access to that year and keep the materials they authored.

#### R-16 Weekly curriculum — **Must**

_As an Admin, I want to plan who teaches what in each week, so that the whole year is organized in one place._

1. THE SYSTEM SHALL present the year's weeks numbered from 1 to N.
2. THE SYSTEM SHALL let an Admin set, for each week, one or more teaching mentors and the session date (D20).
3. _Retired: moving a week (D28)._
4. THE SYSTEM SHALL show each mentor the weeks they teach.
5. THE SYSTEM SHALL indicate which weeks have no mentor or no published materials yet.
6. THE SYSTEM SHALL let the mentors assigned to a week, and Admins, set that week's topic and short description (D20).

### G. Management dashboard (Mentor & Admin)

#### R-26 Dashboard structure — **Must**

1. THE SYSTEM SHALL provide a dashboard with these areas: Overview, Curriculum, Materials, Members, Absences, Applicants, Settings. Admins also get Academic Years, Assessment Days and Users.
2. THE SYSTEM SHALL let the user switch which Academic Year they're viewing. The default is the active year.
3. THE SYSTEM SHALL provide search across members, weeks and materials.
4. THE SYSTEM SHALL show the signed-in user and their role.
