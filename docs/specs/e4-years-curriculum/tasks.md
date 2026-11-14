# E4 Academic years & curriculum — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-4.1, S-4.2, S-4.3, S-4.4. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

## E4 — Academic years & curriculum

_Admins run years, mentors and weeks; mentors see and edit their weeks._

### S-4.1 Academic years

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 Years, §8 academicYears
- **Requirements:** R-14.1, R-14.2, R-14.3, R-14.4
- **Depends on:** S-1.5, S-0.7

**Acceptance criteria**

- [ ] Admin creates a year with name, dates and number of weeks; weeks 1…N are generated
- [ ] Changing the number of weeks adds or removes empty trailing weeks
- [ ] Exactly one active year enforced by a partial unique index
- [ ] Archived years are read-only
- [ ] Academic Years screen as in the design

### S-4.2 Mentor assignment to years

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2, §8 yearMemberships
- **Requirements:** R-15.1, R-15.2
- **Depends on:** S-4.1

**Acceptance criteria**

- [ ] Admin adds and removes mentors of a year
- [ ] Removing a mentor revokes their management access to that year; their materials remain
- [ ] Changes written to the audit log

### S-4.3 Weekly curriculum

- **Repo:** both · **Points:** 5 · **DESIGN:** §6.2 /weeks, §7 canEditWeekContent
- **Requirements:** R-16.1, R-16.2, R-16.4, R-16.5, R-16.6
- **Depends on:** S-4.2

**Acceptance criteria**

- [ ] Curriculum screen lists weeks 1…N with topic, mentors, session date and material status
- [ ] Admin edits a week's mentors, date, topic and description
- [ ] Mentors assigned to a week edit its topic and description; other mentors see it read-only
- [ ] Weeks with no mentor or no published materials are flagged
- [ ] Each mentor sees the weeks they teach highlighted

### S-4.4 Year switcher, dashboard search and settings

- **Repo:** both · **Points:** 3 · **DESIGN:** §4.4, §6.2 /search
- **Requirements:** R-26.1, R-26.2, R-26.3, R-26.4
- **Depends on:** S-4.1, S-0.7

**Acceptance criteria**

- [ ] Topbar year switcher, defaulting to the active year and kept in the URL
- [ ] `GET /search` across members, weeks and materials of the viewed year
- [ ] Topbar shows the signed-in user and role
- [ ] Settings entry in the sidebar links to personal settings
