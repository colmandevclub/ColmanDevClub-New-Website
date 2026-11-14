# ColmanDevClub Website — Requirements Specification

|                    |                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**         | **Approved v1.0** (2026-11-13)                                                                                                                                |
| **Date**           | 2026-11-10                                                                                                                                                    |
| **Method**         | Spec-Driven Development (SDD): **phase 1, requirements**                                                                                                      |
| **Next artifacts** | `DESIGN.md` (architecture, data model, tech stack, integrations, UI design, routes, content), then `tasks.md` (implementation plan traced to requirement IDs) |

> Core of the [spec set](../README.md): rules every feature follows. Feature requirements live in the epic folders (`e0-…` to `e8-…`); the [index](../README.md#where-things-live) says where each ID lives.

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

| ID  | Decision                                                                                                                                                                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Members don't manage their work on the website.                                                                                                                                                                                                    |
| D2  | No projects are managed on the website. Mentors upload study materials and see member data such as progress and absences.                                                                                                                          |
| D3  | An Applicant role exists.                                                                                                                                                                                                                          |
| D4  | The site is Hebrew now. A second language will be added later for the whole site.                                                                                                                                                                  |
| D5  | Content is organized per academic year. The Admin creates a year, adds and removes mentors, and assigns what each mentor teaches and in which week (weeks numbered from 1). Mentors and Admins add materials and can take them from earlier years. |
| D6  | Storage and external integrations are design decisions.                                                                                                                                                                                            |
| D7  | The current UX/UI and the Figma dashboard are references, not commitments.                                                                                                                                                                         |
| D8  | "Keep current functionality" means keep the **features**, not the specific routes or content.                                                                                                                                                      |
| D9  | Groups per mentor apply only from the second semester and are out of scope for now.                                                                                                                                                                |
| D10 | Members don't mark materials as done. Progress is measured without any member action.                                                                                                                                                              |
| D11 | Mentors can view and evaluate applicants.                                                                                                                                                                                                          |
| D12 | Which past projects appear in the showcase is decided later.                                                                                                                                                                                       |
| D13 | The number of weeks is set per academic year.                                                                                                                                                                                                      |
| D14 | Announcements are out of scope for now.                                                                                                                                                                                                            |
| D15 | Members can't see their own attendance.                                                                                                                                                                                                            |
| D16 | Mentors mark only absences. Marking is optional: a mentor may skip marking for a week. A member who isn't marked absent is considered present.                                                                                                     |
| D17 | v1 contains Must requirements only. Could and Should items were removed; scheduled publishing of materials was moved to future scope.                                                                                                              |
| D18 | The design in Claude Design ("ColmanDevClub — Website") is the chosen visual direction. No second concept is required.                                                                                                                             |
| D19 | Admins don't add or remove members of a year directly. Members join a year by being accepted.                                                                                                                                                      |
| D20 | The Admin manages the weeks (mentor assignment, session date). Mentors manage the content of the weeks they teach (topic, description); any mentor of the year can add materials to any week (D28).                                                |
| D21 | There is no page per material. Members download files and open links from the week view.                                                                                                                                                           |
| D22 | Application statuses are: Waitlisted (applied while no assessment day is open), Registered (applied for an assessment day), Accepted, Not accepted.                                                                                                |
| D23 | There is no site-content management in the dashboard. Public content (showcase projects, mentors directory details, social links) is maintained in the code.                                                                                       |
| D24 | Personal data can be deleted from inside the site: an Admin can delete any user, and a member can delete their own account.                                                                                                                        |
| D25 | One shared link preview (title, description, image) for the whole site is acceptable. Per-page previews and full server-rendered content are not required.                                                                                         |
| D26 | Readiness for a second language (externalized UI text, mirror-safe layout) is moved to future scope. v1 is Hebrew only.                                                                                                                            |
| D27 | The attendance-trend chart is out of scope for now.                                                                                                                                                                                                |
| D28 | There is no "move week" action: the Admin edits a week's content or mentors directly. Any mentor of the year can add materials to any week.                                                                                                        |
| D29 | Automatic deletion of rejected applicants' data is out of scope for now.                                                                                                                                                                           |
| D30 | Partner logos are not displayed.                                                                                                                                                                                                                   |
| D31 | No formal list of supported browsers.                                                                                                                                                                                                              |
| D32 | Encryption must not depend on the hosting provider: the system itself enforces encrypted connections, and stored data is encrypted at rest.                                                                                                        |
| D33 | All Must requirements were reviewed and approved on 2026-11-13.                                                                                                                                                                                    |

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

### C. Access control

#### R-12 Role enforcement — **Must**

1. THE SYSTEM SHALL check every request for data or an action against the requester's role and Academic Year assignment, not only by hiding UI.
2. IF a user requests something they aren't permitted to, THEN THE SYSTEM SHALL deny it without revealing any data.
3. THE SYSTEM SHALL make the management dashboard available only to Mentors and Admins.
4. WHILE a Mentor is signed in, THE SYSTEM SHALL limit their management to the years they're assigned to, plus read-only access to earlier years' materials (R-17).

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
5. THE SYSTEM SHALL let a Member permanently delete their own account and personal data, after confirming the action (D24).
6. THE SYSTEM SHALL store its database and uploaded files encrypted at rest (D32).

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
