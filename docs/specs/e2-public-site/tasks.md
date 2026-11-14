# E2 Public site — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-2.1, S-2.2, S-2.3, S-2.4. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

## E2 — Public site

_The public pages present the club, the projects and the mentors._

### S-2.1 Home page

- **Repo:** web · **Points:** 8 · **DESIGN:** §3.1 content/, §4.5, §4.6
- **Requirements:** R-01, R-02, R-05.2, R-05.3, R-35, R-41
- **Depends on:** S-0.7

**Acceptance criteria**

- [ ] Home sections built from the design: hero, what members build, project showcase, join CTA
- [ ] Showcase reads from `content/` (D12, D23); a designed placeholder is shown when a project has no visual
- [ ] If the showcase auto-advances, it can be paused and navigated manually (R-02.4)
- [ ] Every join button goes to `/join` (R-05.2); social links present (R-05.3)
- [ ] The 3D hero scene loads lazily after first paint, with a static fallback; reveals respect reduced motion
- [ ] Public entry chunk ≤ 150 KB gzip

### S-2.2 Mentors directory

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2 /public/mentors
- **Requirements:** R-03.1, R-03.2, R-03.3
- **Depends on:** S-4.2, S-0.7

**Acceptance criteria**

- [ ] `GET /public/mentors` returns mentors grouped by academic year, newest first
- [ ] Legacy mentors group comes from `content/`
- [ ] Cards show photo or initials, name, title and links; reveal interaction as in the design
- [ ] A mentor assigned to a year appears in that year's group automatically

### S-2.3 Link preview and tab titles

- **Repo:** web · **Points:** 1 · **DESIGN:** §3.1 index.html, §4.1
- **Requirements:** R-06.1, R-06.2
- **Depends on:** S-0.2

**Acceptance criteria**

- [ ] `index.html` contains site-wide `<title>`, description, Open Graph and Twitter tags with a share image
- [ ] A `useTitle()` hook sets a distinct tab title on every route
- [ ] Verified with a link-preview debugger (WhatsApp/LinkedIn)

### S-2.4 Migrate public content from the current site

- **Repo:** web · **Points:** 2 · **DESIGN:** §3.1 content/
- **Requirements:** R-02, R-03, R-05.3
- **Depends on:** S-2.1

**Acceptance criteria**

- [ ] Selected showcase projects (D12) added to `content/` with links and tech tags
- [ ] Legacy mentors and their links added to `content/`; broken links from the old site fixed
- [ ] Social links (GitHub, LinkedIn, Instagram, WhatsApp) added
