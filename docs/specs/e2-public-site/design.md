# E2 Public site — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §6.2 public endpoints. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 6. API design

### 6.2 Endpoints

**Public**

| Method | Path                                              | Requirements |
| ------ | ------------------------------------------------- | ------------ |
| GET    | `/public/mentors` (grouped by year, newest first) | R-03         |
