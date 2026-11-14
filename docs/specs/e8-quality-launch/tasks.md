# E8 Quality & launch — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-8.1, S-8.2, S-8.3, S-8.4, S-8.5. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

## E8 — Quality & launch

_The site meets the non-functional requirements and goes live._

### S-8.1 Accessibility pass

- **Repo:** web · **Points:** 3 · **DESIGN:** §4.5, §13
- **Requirements:** R-42
- **Depends on:** S-6.4, S-5.6

**Acceptance criteria**

- [ ] Every screen usable by keyboard only, with visible focus
- [ ] `vitest-axe` clean on all page components; Lighthouse Accessibility ≥ 90
- [ ] Meaningful alt text and labels everywhere

### S-8.2 Performance pass and Lighthouse CI

- **Repo:** web · **Points:** 3 · **DESIGN:** §4.6, §13
- **Requirements:** R-41.1, R-41.2, R-41.3
- **Depends on:** S-2.1

**Acceptance criteria**

- [ ] Lighthouse CI on PR previews; public pages ≥ 90 in every category on mobile
- [ ] LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on public pages
- [ ] Dashboard views interactive within 2 s

### S-8.3 Responsive pass

- **Repo:** web · **Points:** 3 · **DESIGN:** §15 R-43
- **Requirements:** R-43.1, R-43.2
- **Depends on:** S-6.4, S-5.6

**Acceptance criteria**

- [ ] Public pages and member area fully usable from 360 px
- [ ] Dashboard fully usable on tablet and desktop; core read-only views work on phones

### S-8.4 End-to-end tests for key flows

- **Repo:** web · **Points:** 5 · **DESIGN:** §13
- **Requirements:** R-04, R-20, R-22, R-29
- **Depends on:** S-6.4, S-3.6

**Acceptance criteria**

- [ ] Playwright runs on the preview deployment
- [ ] Flows: join → status; member finds this week's material; mentor marks an absence in ≤ 3 interactions; admin accepts an applicant

### S-8.5 Production launch

- **Repo:** both · **Points:** 3 · **DESIGN:** §12, §14, §17
- **Requirements:** R-44.1, R-44.7
- **Depends on:** S-8.1, S-8.2, S-8.3, S-8.4

**Acceptance criteria**

- [ ] Production env vars set; first Admin account created
- [ ] HTTPS redirect and HSTS verified on production
- [ ] Encryption at rest re-verified for Atlas and Cloudinary
- [ ] Domain decision (O-4: stay on `.vercel.app`) applied; old site redirected to the new one
