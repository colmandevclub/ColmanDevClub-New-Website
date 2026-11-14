# E6 Member tracking & overview — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §6.2 tracking endpoints. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 6. API design

### 6.2 Endpoints

**Years & curriculum**

| Method | Path                                         | Access                   | Requirements |
| ------ | -------------------------------------------- | ------------------------ | ------------ |
| GET    | `/years/:id/overview` (no trend series, D27) | Mentor (assigned), Admin | R-27         |

**Tracking**

| Method       | Path                                      | Access                   | Requirements   |
| ------------ | ----------------------------------------- | ------------------------ | -------------- |
| GET          | `/years/:id/members?status=&sort=&q=`     | Mentor (assigned), Admin | R-28           |
| GET          | `/years/:id/members/:userId`              | Mentor (assigned), Admin | R-23.4         |
| PATCH        | `/years/:id/members/:userId/status`       | Mentor (assigned), Admin | R-23.3         |
| POST         | `/years/:id/members/:userId/notes`        | Mentor (assigned), Admin | R-23.2         |
| GET          | `/weeks/:id/absences`                     | Mentor (assigned), Admin | R-22           |
| PUT / DELETE | `/weeks/:id/absences/:userId` `{ note? }` | Mentor (assigned), Admin | R-22.1, R-22.4 |
