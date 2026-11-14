# E7 User management & privacy — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-13. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### C. Access control

#### R-13 User & role management — **Must**

1. THE SYSTEM SHALL let an Admin invite users by email, one at a time or in bulk, with a role and an Academic Year.
2. THE SYSTEM SHALL let an Admin change a user's role, and deactivate or reactivate a user.
3. IF a user is deactivated, THEN THE SYSTEM SHALL block their sign-in and keep their history.
4. THE SYSTEM SHALL keep an audit record of every role change, deactivation and permission-relevant action: who, what and when.
5. THE SYSTEM SHALL let an Admin search and filter users by role, year and status.
