# E7 User management & privacy — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §6.2 user endpoints, §9.3. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 6. API design

### 6.2 Endpoints

**Auth & account**

| Method | Path  | Access | Requirements |
| ------ | ----- | ------ | ------------ |
| DELETE | `/me` | Member | R-44.6       |

**Users**

| Method | Path                                    | Access | Requirements |
| ------ | --------------------------------------- | ------ | ------------ |
| GET    | `/users?role=&yearId=&status=&q=`       | Admin  | R-13.5       |
| POST   | `/invites` `{ emails[], role, yearId }` | Admin  | R-13.1       |
| PATCH  | `/users/:id/role`, `/users/:id/status`  | Admin  | R-13.2–3     |
| DELETE | `/users/:id`                            | Admin  | R-44.4       |
| GET    | `/audit-log?entity=&actorId=`           | Admin  | R-13.4       |

## 9. Key business flows

### 9.3 Deleting a user (R-44.4, R-44.6)

Runs in a transaction:

1. Delete: `sessions`, `emailTokens`, `invites` for the email, `materialViews`, `absences`, `memberNotes` about the user, `applications`, `yearMemberships`, and the profile photo object.
2. Keep materials authored by the user, with `authorId` pointing to a tombstone "משתמש/ת שנמחק/ה" (R-15.2 spirit).
3. Delete the `users` document itself.
4. Rewrite earlier `auditLogs` entries to replace the user's id with the tombstone, and add one log entry with no personal data.

A Member deletes themselves from `/profile` after typing a confirmation phrase. An Admin deletes from `/dashboard/users`.

---
