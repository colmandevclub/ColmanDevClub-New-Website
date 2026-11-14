# E4 Academic years & curriculum — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §6.2 years & curriculum endpoints. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 6. API design

### 6.2 Endpoints

**Years & curriculum**

| Method              | Path                                                                                                              | Access                                    | Requirements        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------- |
| GET                 | `/years`                                                                                                          | Mentor (assigned + archived), Admin       | R-26.2, R-17.1      |
| POST                | `/years`                                                                                                          | Admin                                     | R-14.1              |
| PATCH               | `/years/:id` (name, dates, week count)                                                                            | Admin                                     | R-14.1–2            |
| POST                | `/years/:id/activate`, `/years/:id/archive`                                                                       | Admin                                     | R-14.3–4            |
| GET / POST / DELETE | `/years/:id/mentors[/:userId]`                                                                                    | Admin                                     | R-15                |
| GET                 | `/years/:id/weeks`                                                                                                | Mentor (assigned or archived year), Admin | R-16.1, R-16.5      |
| PATCH               | `/weeks/:id` (Admin: `mentorIds`, `sessionDate`, `topic`, `description`. Assigned mentor: `topic`, `description`) | per field                                 | R-16.2, R-16.6, D28 |
| GET                 | `/search?q=&yearId=`                                                                                              | Mentor, Admin                             | R-26.3              |
