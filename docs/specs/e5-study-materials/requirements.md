# E5 Study materials — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-17, R-18, R-19, R-20, R-32. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### D. Academic years & curriculum

#### R-17 Reuse from earlier years — **Must**

1. THE SYSTEM SHALL let Mentors and Admins browse the curriculum and materials of earlier Academic Years.
2. THE SYSTEM SHALL let Mentors and Admins copy a single material, a whole week, or a whole curriculum from an earlier year into the current one.
3. WHEN content is copied, THE SYSTEM SHALL create an independent copy. Editing the copy SHALL NOT change the original.

### E. Study materials

#### R-18 Add & edit materials — **Must**

_As a mentor, I want to upload the materials for my week, so that members can study before and after the session._

1. THE SYSTEM SHALL let Mentors (in the years they're assigned to, for any week of that year) and Admins add materials of two kinds: an uploaded file or an external link (D21, D28).
2. THE SYSTEM SHALL attach every material to an Academic Year and a Week.
3. THE SYSTEM SHALL let the author give each material a title, a description, tags and a type (e.g. lesson, exercise, solution, recording).
4. IF an uploaded file exceeds the allowed size or type, THEN THE SYSTEM SHALL reject it with a clear message.
5. THE SYSTEM SHALL show the author and the last-updated time on each material.

#### R-19 Visibility & publishing — **Must**

1. THE SYSTEM SHALL support two states: Draft (visible to Mentors and Admins) and Published.
2. THE SYSTEM SHALL support a Mentors-only visibility, for content such as solutions and teaching notes.
3. THE SYSTEM SHALL make uploaded files inaccessible to anyone without permission, including through a direct link.

#### R-20 Member access to materials — **Must**

_As a member, I want to find this week's materials quickly, so that I can prepare._

1. WHILE signed in as a Member, THE SYSTEM SHALL show the published materials of their year, grouped by week, with the current week emphasized.
2. THE SYSTEM SHALL let members search materials by title, topic and tag.
3. THE SYSTEM SHALL let members download files and open links directly from the week view, without a separate page per material (D21).
4. THE SYSTEM SHALL indicate which materials are new since the member's last visit.

### I. Member area

#### R-32 Member home — **Must**

_As a member, I want one place that shows what matters this week, so that I don't hunt for it._

1. WHILE signed in as a Member, THE SYSTEM SHALL show the current week's topic, its mentor(s), the session date and the materials.
2. THE SYSTEM SHALL NOT show members any attendance, absence, progress, note or status data, including their own (D15).
3. THE SYSTEM SHALL NOT offer members any work- or task-management features (D1).
