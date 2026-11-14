# ColmanDevClub specs

The specs are split by feature: one folder per epic, plus `core/` for the rules every feature follows. Each folder holds the three SDD stages for that feature: **requirements** (what and why), **design** (how) and **tasks** (the stories). How the method works: [docs/sdd/](../sdd/README.md).

| Document     | Version                        |
| ------------ | ------------------------------ |
| Requirements | **Approved v1.1** (2026-11-14) |
| Design       | Draft v0.4 (2026-11-14)        |
| Tasks        | 2026-11-14                     |

History of every document: [CHANGELOG.md](CHANGELOG.md). Latest reconciliation: [reconciliation-2026-11-14.md](reconciliation-2026-11-14.md).

## Where things live

| Feature                          | Folder                                       | Requirements                                                                                                                                                  | Design (§)                                                                | Stories       |
| -------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| Core (all features)              | [core/](core/)                               | §1–§4 (goals, decisions D-xx, glossary, roles and permission table), R-12, R-33, R-34, R-35, R-37, R-38, R-41, R-42, R-43, R-44, open questions, future scope | §1–§3, T-xx, §4.1, §4.4, §6.1, §7, §8 data model, §11 email, §12–§17, O-x | —             |
| E0 — Project setup & foundations | [e0-foundations/](e0-foundations/)           | —                                                                                                                                                             | §4.2, §4.3, §4.5, §4.6                                                    | S-0.1 – S-0.8 |
| E1 — Authentication & accounts   | [e1-auth/](e1-auth/)                         | R-07, R-08, R-10, R-11                                                                                                                                        | §5, §6.2 auth endpoints                                                   | S-1.1 – S-1.8 |
| E2 — Public site                 | [e2-public-site/](e2-public-site/)           | R-01, R-02, R-03, R-05, R-06                                                                                                                                  | §6.2 public endpoints                                                     | S-2.1 – S-2.4 |
| E3 — Admissions                  | [e3-admissions/](e3-admissions/)             | R-04, R-09, R-29                                                                                                                                              | §6.2 admissions endpoints, §9.1                                           | S-3.1 – S-3.6 |
| E4 — Academic years & curriculum | [e4-years-curriculum/](e4-years-curriculum/) | R-14, R-15, R-16, R-26                                                                                                                                        | §6.2 years & curriculum endpoints                                         | S-4.1 – S-4.4 |
| E5 — Study materials             | [e5-study-materials/](e5-study-materials/)   | R-17, R-18, R-19, R-20, R-32                                                                                                                                  | §6.2 materials endpoints, §9.2, §10                                       | S-5.1 – S-5.7 |
| E6 — Member tracking & overview  | [e6-member-tracking/](e6-member-tracking/)   | R-22, R-23, R-27, R-28                                                                                                                                        | §6.2 tracking endpoints                                                   | S-6.1 – S-6.4 |
| E7 — User management & privacy   | [e7-user-management/](e7-user-management/)   | R-13                                                                                                                                                          | §6.2 user endpoints, §9.3                                                 | S-7.1 – S-7.3 |
| E8 — Quality & launch            | [e8-quality-launch/](e8-quality-launch/)     | —                                                                                                                                                             | — (uses core §12–§14)                                                     | S-8.1 – S-8.5 |

## Rules for the split

1. **One home per ID.** Every R-xx, §, S-#.# lives in exactly one file (the table above). Other files link to it; they never copy it.
2. **IDs and § numbers don't change.** DESIGN headings keep their original § numbers, so "DESIGN §10" still means storage, now in `e5-study-materials/design.md`.
3. **New requirement:** add it to the epic that will build it, with the next free R number. If every feature must follow it (a permission, security or UX rule), add it to `core/`.
4. **New endpoint:** add the row to the owning epic's `design.md` under §6.2 and its group label.
5. **Versions and history:** bump the version in the table above and add a row to [CHANGELOG.md](CHANGELOG.md) under the document you changed.

## Planning

Implements REQUIREMENTS v1.1 and DESIGN v0.4. Stage 3 of SDD (requirements → design → tasks).

**Conventions**

- Epic `E#` → Story `S-#.#`. Every story lists the requirement IDs it satisfies (R-xx / T-xx), the DESIGN section, its dependencies and its acceptance criteria.
- Epics are in dependency order. Within an epic, stories are in build order.
- Repo: `api` = colmandevclub-api, `web` = colmandevclub-web, `both` = one PR in each.
- Points: Fibonacci (1, 2, 3, 5, 8). Anything bigger gets split.
- Definition of done: CI green, tests for the acceptance criteria, reviewed, deployed to preview, R-IDs in the PR description.

## Summary

| Epic | Name                        | Stories | Points  |
| ---- | --------------------------- | ------- | ------- |
| E0   | Project setup & foundations | 8       | 27      |
| E1   | Authentication & accounts   | 8       | 33      |
| E2   | Public site                 | 4       | 14      |
| E3   | Admissions                  | 6       | 25      |
| E4   | Academic years & curriculum | 4       | 16      |
| E5   | Study materials             | 7       | 29      |
| E6   | Member tracking & overview  | 4       | 18      |
| E7   | User management & privacy   | 3       | 13      |
| E8   | Quality & launch            | 5       | 17      |
|      | **Total**                   | **49**  | **192** |

## Suggested milestones

1. **M1 — Foundations:** E0 + E1 (anyone can sign in, roles enforced).
2. **M2 — Public & admissions:** E2 + E3 (the site can replace the current one for recruiting).
3. **M3 — Teaching:** E4 + E5 (mentors publish, members learn).
4. **M4 — Tracking & admin:** E6 + E7.
5. **M5 — Launch:** E8.

E2 can run in parallel with E1 once S-0.7 is done.

## Jira plan (rebuilt 2026-11-14)

The stories in the epic folders (`e0-…/tasks.md` to `e8-…/tasks.md`) are the original plan. Jira is the live plan: after the 2026-11-14 code/Jira audit, E0 grew from S-0.8 to S-0.22, and component stories (S-0.14 to S-0.19 sub-tasks) were folded into their parents. Stable IDs are kept; superseded items stay in Jira, marked `[Superseded]`, and their IDs are not reused.

- Board: <https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1>
- E0 epic (KAN-1): <https://almoglavi29.atlassian.net/browse/KAN-1>

| Story                                                    | Jira            | Status (2026-11-14) | Notes                                             |
| -------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------- |
| S-0.1 – S-0.6                                            | KAN-10 – KAN-15 | Done                | Sprint 1 setup baseline                           |
| S-0.7 Theme, fonts, motion, component gallery            | KAN-16          | To Do               | Split into S-0.7-A/B/C (KAN-117 – KAN-119)        |
| S-0.8 Team onboarding page                               | KAN-58          | Done                | File restored to `docs/onboarding.html` by S-0.22 |
| S-0.9 Shared CLAUDE.md and SDD example                   | KAN-59          | Done                | `docs/sdd/`                                       |
| S-0.10 Design: mobile views, section below the hero      | KAN-60          | To Do               |                                                   |
| S-0.11 Decisions needed from the chairman                | KAN-61          | Done                | Answers recorded as DESIGN O-4, O-5 by S-0.22     |
| S-0.12 API docs: OpenAPI + Swagger UI                    | KAN-62          | Done                | T-23                                              |
| S-0.13 CodeRabbit PR reviews                             | KAN-63          | Done                | T-24                                              |
| S-0.14 – S-0.19 Components and layouts                   | KAN-66 – KAN-71 | To Do               |                                                   |
| S-0.20 MongoDB across serverless requests                | KAN-112         | To Do               |                                                   |
| S-0.21 HTTPS local development and deployment routing    | KAN-113         | To Do               |                                                   |
| S-0.22 Restore specs and onboarding; reconcile decisions | KAN-114         | In progress         | This reconciliation                               |
| S-0.23 Split the specs into per-epic feature folders     | KAN-121         | In progress         | This layout                                       |

## Traceability (requirement → stories)

| Requirement | Stories                                         |
| ----------- | ----------------------------------------------- |
| R-01        | S-2.1                                           |
| R-02        | S-2.1, S-2.4                                    |
| R-03        | S-2.2, S-2.4                                    |
| R-04        | S-1.2, S-1.3, S-3.2, S-3.3, S-8.4               |
| R-05        | S-0.7, S-2.1, S-2.4, S-3.3                      |
| R-06        | S-2.3                                           |
| R-07        | S-1.1, S-1.4, S-1.6, S-7.2                      |
| R-08        | S-1.2, S-1.3, S-1.6                             |
| R-09        | S-3.4, S-3.6                                    |
| R-10        | S-1.8                                           |
| R-11        | S-1.5, S-1.7                                    |
| R-12        | S-0.6, S-1.5                                    |
| R-13        | S-1.2, S-7.1, S-7.2                             |
| R-14        | S-4.1                                           |
| R-15        | S-4.2                                           |
| R-16        | S-4.3                                           |
| R-17        | S-5.7                                           |
| R-18        | S-5.1, S-5.2, S-5.3                             |
| R-19        | S-5.1, S-5.2, S-5.3, S-5.4                      |
| R-20        | S-5.4, S-5.5, S-8.4                             |
| R-22        | S-6.1, S-6.2, S-8.4                             |
| R-23        | S-5.4, S-6.3                                    |
| R-26        | S-4.4                                           |
| R-27        | S-6.4                                           |
| R-28        | S-6.2                                           |
| R-29        | S-3.1, S-3.5, S-3.6, S-8.4                      |
| R-32        | S-5.6                                           |
| R-33        | S-0.7                                           |
| R-34        | S-0.7                                           |
| R-35        | S-0.7, S-2.1                                    |
| R-37        | S-0.7, S-5.3, S-6.1                             |
| R-38        | S-0.2, S-0.7                                    |
| R-41        | S-2.1, S-8.2                                    |
| R-42        | S-0.7, S-8.1                                    |
| R-43        | S-8.3                                           |
| R-44        | S-0.4, S-0.5, S-0.6, S-3.5, S-6.3, S-7.3, S-8.5 |
| T-01        | S-0.2                                           |
| T-02        | S-0.2                                           |
| T-03        | S-0.2                                           |
| T-04        | S-0.2                                           |
| T-08        | S-0.1                                           |
| T-10        | S-0.6, S-1.1                                    |
| T-13        | S-0.1, S-0.3, S-0.8                             |
| T-14        | S-1.1                                           |
| T-15        | S-0.5, S-3.2                                    |
| T-16        | S-0.1                                           |
| T-19        | S-0.4                                           |
| T-20        | S-0.5                                           |
| T-21        | S-0.5, S-5.1, S-0.22                            |
| T-22        | S-0.5, S-1.2                                    |
| T-23        | S-0.12, S-0.22                                  |
| T-24        | S-0.13, S-0.22                                  |
| T-25        | S-0.3, S-0.22                                   |
