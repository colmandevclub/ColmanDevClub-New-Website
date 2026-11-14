# ColmanDevClub Website — Requirements Specification

|                    |                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**         | **Approved v1.1** (2026-11-14)                                                                                                                                |
| **Date**           | 2026-11-10                                                                                                                                                    |
| **Method**         | Spec-Driven Development (SDD): **phase 1, requirements**                                                                                                      |
| **Next artifacts** | `DESIGN.md` (architecture, data model, tech stack, integrations, UI design, routes, content), then `tasks.md` (implementation plan traced to requirement IDs) |

### SDD rules for this document

1. This document defines **what** the system must do and **why**. It doesn't define **how**. Technology, data model, storage, routes, page layout and content belong in `design.md`.
2. Requirements are written at the **feature level**. Specific content (texts, which projects or people appear) is decided outside this spec.
3. Every requirement has a unique ID (`R-xx`), a user story, acceptance criteria and a priority.
4. Acceptance criteria use **EARS** notation:
   - `THE SYSTEM SHALL …`
   - `WHEN <trigger>, THE SYSTEM SHALL …`
   - `WHILE <state>, THE SYSTEM SHALL …`
   - `IF <condition>, THEN THE SYSTEM SHALL …`
   - `WHERE <option>, THE SYSTEM SHALL …`
5. Every requirement in v1 is a **Must** (D17). Requirement IDs are stable: a removed requirement's number is retired, not reused.
6. Every design element and task must trace back to a requirement ID. Scope changes are made here first.

---

## 1. Introduction

### 1.1 Purpose

ColmanDevClub is the development community of COLMAN. The website:

- presents the club to the public
- runs admission through assessment days
- lets Admins and Mentors plan each academic year, publish weekly study materials, and follow member attendance and progress
- gives Members one place for their study materials

### 1.2 Goals

- **G1** Keep every feature of the current site (§4).
- **G2** Role-based access: Guest, Applicant, Member, Mentor, Admin.
- **G3** Manage the club by academic year: mentors, a weekly curriculum, and materials that can be reused from earlier years.
- **G4** Let Mentors and Admins track member attendance and progress.
- **G5** A UX/UI that is impressive by developer-community standards.
- **G6** Hebrew, fully right-to-left.

### 1.3 Out of scope (v1)

- Project or task management. Members don't manage their work on the site.
- Members marking materials as completed.
- Splitting members into groups per mentor. This is planned for the second semester (§7).
- Announcements and messaging.
- A second language, and preparing the code for one (D26).
- Payments.

### 1.4 Decisions log

| ID  | Decision                                                                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Members don't manage their work on the website.                                                                                                                                                                                                                                                   |
| D2  | No projects are managed on the website. Mentors upload study materials and see member data such as progress and absences.                                                                                                                                                                         |
| D3  | An Applicant role exists.                                                                                                                                                                                                                                                                         |
| D4  | The site is Hebrew now. A second language will be added later for the whole site.                                                                                                                                                                                                                 |
| D5  | Content is organized per academic year. The Admin creates a year, adds and removes mentors, and assigns what each mentor teaches and in which week (weeks numbered from 1). Mentors and Admins add materials and can take them from earlier years.                                                |
| D6  | Storage and external integrations are design decisions.                                                                                                                                                                                                                                           |
| D7  | The current UX/UI and the Figma dashboard are references, not commitments.                                                                                                                                                                                                                        |
| D8  | "Keep current functionality" means keep the **features**, not the specific routes or content.                                                                                                                                                                                                     |
| D9  | Groups per mentor apply only from the second semester and are out of scope for now.                                                                                                                                                                                                               |
| D10 | Members don't mark materials as done. Progress is measured without any member action.                                                                                                                                                                                                             |
| D11 | Mentors can view and evaluate applicants.                                                                                                                                                                                                                                                         |
| D12 | Which past projects appear in the showcase is decided later.                                                                                                                                                                                                                                      |
| D13 | The number of weeks is set per academic year.                                                                                                                                                                                                                                                     |
| D14 | Announcements are out of scope for now.                                                                                                                                                                                                                                                           |
| D15 | Members can't see their own attendance.                                                                                                                                                                                                                                                           |
| D16 | Mentors mark only absences. Marking is optional: a mentor may skip marking for a week. A member who isn't marked absent is considered present.                                                                                                                                                    |
| D17 | v1 contains Must requirements only. Could and Should items were removed; scheduled publishing of materials was moved to future scope.                                                                                                                                                             |
| D18 | The design in Claude Design ("ColmanDevClub — Website") is the chosen visual direction. No second concept is required.                                                                                                                                                                            |
| D19 | Admins don't add or remove members of a year directly. Members join a year by being accepted.                                                                                                                                                                                                     |
| D20 | The Admin manages the weeks (mentor assignment, session date). Mentors manage the content of the weeks they teach (topic, description); any mentor of the year can add materials to any week (D28).                                                                                               |
| D21 | There is no page per material. Members download files and open links from the week view.                                                                                                                                                                                                          |
| D22 | Application statuses are: Waitlisted (applied while no assessment day is open), Registered (applied for an assessment day), Accepted, Not accepted.                                                                                                                                               |
| D23 | There is no site-content management in the dashboard. Public content (showcase projects, mentors directory details, social links) is maintained in the code.                                                                                                                                      |
| D24 | Personal data can be deleted from inside the site: an Admin can delete any user, and a member can delete their own account.                                                                                                                                                                       |
| D25 | One shared link preview (title, description, image) for the whole site is acceptable. Per-page previews and full server-rendered content are not required.                                                                                                                                        |
| D26 | Readiness for a second language (externalized UI text, mirror-safe layout) is moved to future scope. v1 is Hebrew only.                                                                                                                                                                           |
| D27 | The attendance-trend chart is out of scope for now.                                                                                                                                                                                                                                               |
| D28 | There is no "move week" action: the Admin edits a week's content or mentors directly. Any mentor of the year can add materials to any week.                                                                                                                                                       |
| D29 | Automatic deletion of rejected applicants' data is out of scope for now.                                                                                                                                                                                                                          |
| D30 | Partner logos are not displayed.                                                                                                                                                                                                                                                                  |
| D31 | No formal list of supported browsers.                                                                                                                                                                                                                                                             |
| D32 | Encryption must not depend on the hosting provider: the system itself enforces encrypted connections, and stored data is encrypted at rest.                                                                                                                                                       |
| D33 | All Must requirements were reviewed and approved on 2026-11-13.                                                                                                                                                                                                                                   |
| D34 | A public resubmission with an email that already has a registration changes nothing until the owner of that email confirms through a link sent to it, so knowing someone's email is not enough to change their registration. Approved by Almog Lavi on 2026-11-14 (CodeRabbit review of KAN-114). |

---

## 2. Glossary

| Term                 | Meaning                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Academic Year**    | One club season, with its own mentors, members, curriculum and materials. One year is active at a time.                       |
| **Week**             | A numbered unit (1…N) of a year's curriculum. N is set per year.                                                              |
| **Curriculum**       | For each week: the topic, the teaching mentor(s) and the study materials.                                                     |
| **Session**          | The club meeting of a given week. Absences are recorded per session.                                                          |
| **Study Material**   | Content for members: an uploaded file or an external link (D21).                                                              |
| **Absence**          | A mark, set by a mentor, that a member didn't attend a session. A member without an absence mark is considered present (D16). |
| **Progress**         | A member's standing in the year, combining absences, material engagement and mentor assessment (R-23).                        |
| **Showcase Project** | A past club project displayed publicly. Display only.                                                                         |
| **Assessment Day**   | An admission screening event that candidates register for.                                                                    |
| **Waitlisted**       | An applicant who registered while no assessment day was open, so has no day yet (D22).                                        |

---

## 3. Roles & permissions

| Role          | Description                                          |
| ------------- | ---------------------------------------------------- |
| **Guest**     | Not signed in.                                       |
| **Applicant** | Registered for admission and not yet accepted.       |
| **Member**    | Accepted into the active Academic Year.              |
| **Mentor**    | Assigned by the Admin to one or more Academic Years. |
| **Admin**     | Manages the club, the years and users.               |

| Capability                                          | Guest | Applicant | Member |            Mentor             | Admin |
| --------------------------------------------------- | :---: | :-------: | :----: | :---------------------------: | :---: |
| View public features                                |   ✓   |     ✓     |   ✓    |               ✓               |   ✓   |
| Register for an assessment day                      |   ✓   |     ✓     |   –    |               –               |   –   |
| See own application status                          |   –   |     ✓     |   –    |               –               |   –   |
| Edit own profile                                    |   –   |     ✓     |   ✓    |               ✓               |   ✓   |
| Delete own account and personal data                |   –   |     –     |   ✓    |               –               |   –   |
| View published materials of own year                |   –   |     –     |   ✓    |               ✓               |   ✓   |
| Access the management dashboard                     |   –   |     –     |   –    |               ✓               |   ✓   |
| Add and edit study materials                        |   –   |     –     |   –    | ✓ (years they're assigned to) |   ✓   |
| Take materials from earlier years                   |   –   |     –     |   –    |               ✓               |   ✓   |
| Mark absences, view member progress                 |   –   |     –     |   –    | ✓ (years they're assigned to) |   ✓   |
| View and evaluate applicants                        |   –   |     –     |   –    |               ✓               |   ✓   |
| Manage assessment days, accept or reject applicants |   –   |     –     |   –    |               –               |   ✓   |
| Create years, assign mentors and weeks              |   –   |     –     |   –    |               –               |   ✓   |
| Edit topic and description of weeks they teach      |   –   |     –     |   –    |         ✓ (own weeks)         |   ✓   |
| Manage users and roles                              |   –   |     –     |   –    |               –               |   ✓   |

---

## 4. Preserved features

The current site's features that the new site must keep:

| #   | Feature                                                                                         | Covered by |
| --- | ----------------------------------------------------------------------------------------------- | ---------- |
| F1  | Public presentation of the club: who we are, what we build, and a call to join                  | R-01       |
| F2  | Showcase of past club projects                                                                  | R-02       |
| F3  | Mentors directory, including past (legacy) mentors and mentors by year, with professional links | R-03       |
| F4  | Registration for an assessment day                                                              | R-04       |
| F5  | Sign up and sign in with Google or with email and password                                      | R-07, R-08 |
| F6  | Links to the club's social and community channels                                               | R-05       |

---

## 5. Requirements

### A. Public features

#### R-01 Club presentation — **Must**

_As a guest, I want to understand what the club is and why to join, so that I can decide to apply._

1. THE SYSTEM SHALL present the club's identity, the kinds of things members build, and a call to join.
2. WHEN a guest chooses to join, THE SYSTEM SHALL lead them to assessment-day registration (R-04).

#### R-02 Project showcase — **Must**

_As a guest, I want to see what members built, so that I trust the club gives real experience._

1. THE SYSTEM SHALL display a selected set of past club projects (D12).
2. THE SYSTEM SHALL show each project's name, description, visual, technologies, and its code and live links when they exist.
3. IF a project has no visual, THEN THE SYSTEM SHALL show a designed placeholder.
4. WHERE the showcase advances automatically, THE SYSTEM SHALL let the user pause it and navigate it manually.

#### R-03 Mentors directory — **Must**

_As a guest, I want to see who the mentors are, so that I know who I'll learn from._

1. THE SYSTEM SHALL show the mentors grouped by Academic Year (newest first), plus a group for legacy mentors.
2. THE SYSTEM SHALL show each mentor's photo (or a fallback when there's none), name, title, and professional links when they exist.
3. WHEN the Admin assigns a mentor to a year (R-15), THE SYSTEM SHALL include that mentor in that year's group.

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

#### R-05 Navigation & community links — **Must**

1. THE SYSTEM SHALL use the navigation and design of the chosen Claude Design artifact (D18) on every page.
2. WHEN a user activates any join entry point, THE SYSTEM SHALL lead them to assessment-day registration, which shows the no-upcoming-assessment-day state when applicable (R-04.8).
3. THE SYSTEM SHALL link to the club's social and community channels.

#### R-06 Discoverability — **Must**

1. THE SYSTEM SHALL provide a site-wide title, description and social-share preview image that link-preview services can read without running client-side scripts (D25).
2. THE SYSTEM SHALL set a distinct browser-tab title for each page.

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

#### R-09 Applicant status — **Must**

_As an applicant, I want to see where my application stands, so that I'm not left guessing._

1. WHILE signed in as an Applicant, THE SYSTEM SHALL show the application status: Waitlisted / Registered / Accepted / Not accepted (D22).
2. WHEN an Admin accepts an applicant (R-29), THE SYSTEM SHALL make the user a Member of the active Academic Year.
3. THE SYSTEM SHALL NOT show applicants any member-only content.

#### R-10 Profile — **Must**

1. THE SYSTEM SHALL let every signed-in user edit their name, photo, title, field of study, school year and professional links.
2. IF a link isn't a valid URL, THEN THE SYSTEM SHALL reject it.
3. THE SYSTEM SHALL normalize every link before saving it.

#### R-11 Account menu — **Must**

1. WHILE a user is signed in, THE SYSTEM SHALL give access to their profile, their role's home area and sign-out.
2. THE SYSTEM SHALL show the dashboard entry only to Mentors and Admins.

### C. Access control

#### R-12 Role enforcement — **Must**

1. THE SYSTEM SHALL check every request for data or an action against the requester's role and Academic Year assignment, not only by hiding UI.
2. IF a user requests something they aren't permitted to, THEN THE SYSTEM SHALL deny it without revealing any data.
3. THE SYSTEM SHALL make the management dashboard available only to Mentors and Admins.
4. WHILE a Mentor is signed in, THE SYSTEM SHALL limit their management to the years they're assigned to, plus read-only access to earlier years' materials (R-17).

#### R-13 User & role management — **Must**

1. THE SYSTEM SHALL let an Admin invite users by email, one at a time or in bulk, with a role and an Academic Year.
2. THE SYSTEM SHALL let an Admin change a user's role, and deactivate or reactivate a user.
3. IF a user is deactivated, THEN THE SYSTEM SHALL block their sign-in and keep their history.
4. THE SYSTEM SHALL keep an audit record of every role change, deactivation and permission-relevant action: who, what and when.
5. THE SYSTEM SHALL let an Admin search and filter users by role, year and status.

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

#### R-26 Dashboard structure — **Must**

1. THE SYSTEM SHALL provide a dashboard with these areas: Overview, Curriculum, Materials, Members, Absences, Applicants, Settings. Admins also get Academic Years, Assessment Days and Users.
2. THE SYSTEM SHALL let the user switch which Academic Year they're viewing. The default is the active year.
3. THE SYSTEM SHALL provide search across members, weeks and materials.
4. THE SYSTEM SHALL show the signed-in user and their role.

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

#### R-29 Admissions — **Must**

1. THE SYSTEM SHALL let an Admin create assessment days with a date, time, location and capacity, and open or close them for registration.
2. THE SYSTEM SHALL let an Admin manage the answer options offered in registration (field of study, school year, experience).
3. THE SYSTEM SHALL let Mentors and Admins view applicants, filter them, and record an evaluation (score and notes) for each one (D11).
4. THE SYSTEM SHALL set an applicant's status to Waitlisted or Registered automatically on registration (R-04), and SHALL let an Admin set it to Accepted or Not accepted.
5. WHEN an Admin accepts an applicant, THE SYSTEM SHALL make them a Member of the active year (R-09.2).
6. THE SYSTEM SHALL let an Admin export the applicant list.
7. WHEN an assessment day opens, THE SYSTEM SHALL let an Admin assign Waitlisted applicants to it, changing their status to Registered.

### I. Member area

#### R-32 Member home — **Must**

_As a member, I want one place that shows what matters this week, so that I don't hunt for it._

1. WHILE signed in as a Member, THE SYSTEM SHALL show the current week's topic, its mentor(s), the session date and the materials.
2. THE SYSTEM SHALL NOT show members any attendance, absence, progress, note or status data, including their own (D15).
3. THE SYSTEM SHALL NOT offer members any work- or task-management features (D1).

### J. UX/UI

> The current UX/UI and the Figma dashboard are references only (D7). As a developer club, the site is our portfolio: an impressive experience is a requirement, not decoration.

#### R-33 Design phase gate — **Must**

1. Before implementation, the design phase SHALL produce a design system and high-fidelity designs for the key flows: club presentation, mentors directory, join, sign in, member home, materials, dashboard overview, curriculum, per-member view, absence marking and admissions.
2. The chosen visual direction is the current Claude Design artifact (D18).

#### R-34 Developer identity — **Must**

1. THE SYSTEM's visual language SHALL clearly express developer culture, for example through code and terminal motifs, monospace accents, syntax-highlight colors and technical micro-copy, while staying clean and readable.
2. THE SYSTEM SHALL NOT look like a generic template. The design review (R-33) SHALL check this explicitly.

#### R-35 Motion & interaction — **Must**

1. THE SYSTEM SHALL use purposeful motion: transitions between views, reveals as the user scrolls, and feedback on every interactive element.
2. Animations SHALL run smoothly on mid-range phones (target 60 fps) and SHALL NOT shift the layout.
3. WHILE the user's device requests reduced motion, THE SYSTEM SHALL disable non-essential animation.

#### R-37 Dashboard usability — **Must**

1. THE SYSTEM SHALL show loading placeholders instead of blank screens.
2. THE SYSTEM SHALL provide a meaningful empty state for every list and widget, including the next action to take.
3. THE SYSTEM SHALL confirm destructive actions, and allow undo where possible.
4. Marking a member absent from the current session SHALL take no more than 3 interactions from the dashboard.
5. Adding and publishing a material SHALL take no more than 3 steps.

#### R-38 Right-to-left Hebrew — **Must**

1. THE SYSTEM SHALL render the entire UI right-to-left in Hebrew.
2. English terms, technology names and code inside Hebrew text SHALL display in the correct order, without breaking the RTL flow.

### K. Non-functional requirements

#### R-41 Performance — **Must**

1. Public pages SHALL score ≥ 90 in every Lighthouse category on the mobile profile.
2. Public pages SHALL meet the Core Web Vitals "good" thresholds: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
3. Dashboard views SHALL be interactive within 2 s on a typical student laptop and connection.

#### R-42 Accessibility — **Must**

1. THE SYSTEM SHALL conform to WCAG 2.1 AA, including keyboard operation, visible focus, sufficient contrast, screen-reader labels and meaningful alternative text.

#### R-43 Responsive support — **Must**

1. Public features and the member area SHALL be fully usable from 360 px width upward.
2. The dashboard SHALL be fully usable on tablet and desktop, and its core read-only views SHALL work on phones.

#### R-44 Security & privacy — **Must**

1. THE SYSTEM SHALL itself enforce encrypted connections (redirect any unencrypted request to HTTPS and instruct browsers to use HTTPS only), independent of the hosting provider, and SHALL connect to its database and file storage over encrypted connections only (D32).
2. THE SYSTEM SHALL show applicants' phone numbers and emails to Admins only.
3. THE SYSTEM SHALL show member absences, progress, notes and status only to the Mentors of that year and to Admins.
4. THE SYSTEM SHALL let an Admin permanently delete a user's personal data on request.
5. _Retired: automatic deletion after a retention period (D29)._
6. THE SYSTEM SHALL let a Member permanently delete their own account and personal data, after confirming the action (D24).
7. THE SYSTEM SHALL store its database and uploaded files encrypted at rest (D32).

---

## 6. Open questions

None at the moment. Q1 and Q2 from v0.3 were resolved as D15 and D16.

---

## 7. Future scope (not in v1)

- **Groups per mentor (second semester):** members split into groups, each led by a mentor, with attendance and progress per group.
- **Announcements and messaging:** Admins and Mentors communicate with members through the site.
- **Member & alumni network for the job search:**
  - Opt-in profiles with skills, availability and CV.
  - Members and alumni can find each other and ask for referrals at companies where alumni work.
  - Alumni and mentors can post jobs and internships.
  - Mentors can endorse members' skills.
  - Filters by company, role and technology.
- **Attendance-trend chart** on the dashboard overview (D27).
- **Automatic deletion of rejected applicants' data** after a retention period (D29).
- **Scheduled publishing of materials:** a mentor sets a date and time, and the material publishes automatically.
- **Second language** for the whole site, including externalizing all UI text and a mirror-safe layout (D26).
- **Quizzes and exercises** with automatic checking.
- **Registration for events and hackathons** beyond assessment days.

---

## Changelog

| Version  | Changes                                                                                                                                                                                                                                                                                                                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **v1.1** | R-04.6: a resubmission with an existing email changes the registration only after the email owner confirms by link (D34). Restored the retired placeholders R-16.3, R-27.2 and R-44.5, so the later criteria keep their original numbers (a formatter had renumbered the lists in the repo copy).                                                                                                   |
| **v1.0** | **Approved.** Reviewed all Musts with the owner (D33). R-05 now follows the chosen design and routes every join entry point to registration; removed partners (R-05.4, D30), R-33.3, R-37.6, R-43.3 (D31). R-44.1 made host-independent, and R-44.7 added for encryption at rest (D32).                                                                                                             |
| v0.11    | Removed R-27.2 attendance chart (D27), R-16.3 move week (D28), R-44.5 automatic retention deletion (D29). Mentors can add materials to any week of their year (R-18.1).                                                                                                                                                                                                                             |
| v0.10    | Moved second-language readiness (R-38.3, R-38.4) to future scope (D26).                                                                                                                                                                                                                                                                                                                             |
| v0.9     | Relaxed R-06 to one site-wide link preview plus a tab title per page (D25).                                                                                                                                                                                                                                                                                                                         |
| v0.8     | R-44.4 confirmed (Admin deletes any user's data); added R-44.6: members can delete their own account (D24).                                                                                                                                                                                                                                                                                         |
| v0.7     | Removed site-content management (D23): R-30, R-02.5, R-03.4 and R-05.5; removed "Site Content" from the dashboard areas and "Manage public content" from the permissions.                                                                                                                                                                                                                           |
| v0.6     | Aligned with the chosen design (D18–D22): removed the learning-process item from R-01, R-14.5 (adding members to a year), the text-page material kind, material filters and in-page preview, R-33.2 (two concepts) and R-34.3 (code blocks). Added Waitlisted (R-04.8, R-29.7) and new application statuses. Split week management between Admin (mentors, dates) and mentors (topic, description). |
| v0.5     | Removed all Could items (R-25 data export, R-39 easter eggs) and all Should items (R-01.3, R-19.3, R-21, R-24, R-31, R-36, R-40, R-45), and removed the references to them, including presentation-text editing from R-30. Scheduled publishing moved to future scope (D17).                                                                                                                        |
| v0.4     | Resolved the open questions: members can't see attendance (D15); mentors mark absences only, and marking is optional (D16). R-22 reworked from attendance recording to absence marking; R-24, R-27, R-32, R-37 and R-44 updated to match.                                                                                                                                                           |
| v0.3     | Requirements rewritten at the feature level: current-site routes and content removed (D8). Applied decisions D9–D14: no groups (until the second semester), no member marking, mentors evaluate applicants, showcase project selection deferred, weeks set per year, announcements out of scope. Open questions reduced to Q1–Q2 with examples. Requirements renumbered.                            |
| v0.2     | Converted to SDD format; added academic years, curriculum, member tracking and UX/UI requirements; removed project management.                                                                                                                                                                                                                                                                      |
| v0.1     | Initial draft.                                                                                                                                                                                                                                                                                                                                                                                      |
