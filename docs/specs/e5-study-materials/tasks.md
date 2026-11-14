# E5 Study materials — Tasks

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Stories: S-5.1, S-5.2, S-5.3, S-5.4, S-5.5, S-5.6, S-5.7. Live status in [Jira](https://almoglavi29.atlassian.net/jira/software/projects/KAN/boards/1).

## E5 — Study materials

_Mentors publish materials; members find and download them._

### S-5.1 Storage service

- **Repo:** api · **Points:** 3 · **DESIGN:** §10
- **Requirements:** R-18.4, R-19.3, T-21
- **Depends on:** S-0.5, S-1.5

**Acceptance criteria**

- [ ] `StorageService` with Cloudinary and local filesystem adapters
- [ ] `POST /materials/upload-url` validates type (PDF, images, ZIP, PPTX/DOCX) and size (≤ 10 MB) and returns signed upload parameters for an `authenticated` (private) asset
- [ ] Rejected files return a clear error message (R-18.4)
- [ ] Signed download URLs expire after 5 minutes; assets have no public delivery URL

### S-5.2 Materials API

- **Repo:** api · **Points:** 5 · **DESIGN:** §6.2 Materials, §7 canManageMaterials
- **Requirements:** R-18.1, R-18.2, R-18.3, R-18.5, R-19.1, R-19.2
- **Depends on:** S-5.1, S-4.3

**Acceptance criteria**

- [ ] Create, edit and delete materials of kind file or link, attached to a year and week
- [ ] Any mentor of the year can manage materials of any week of that year (D28)
- [ ] Title, description, tags, type (lesson / exercise / solution / recording)
- [ ] Visibility Draft / Published / Mentors-only; `publishedAt` set on publish
- [ ] Author and last-updated time returned

### S-5.3 Dashboard materials screen

- **Repo:** web · **Points:** 5 · **DESIGN:** §4.1 /dashboard/materials
- **Requirements:** R-18, R-19, R-37.5
- **Depends on:** S-5.2, S-0.7

**Acceptance criteria**

- [ ] Week chips and per-week material list with state pills, as in the design
- [ ] Add-material drawer in 3 steps: kind → details → publish (R-37.5)
- [ ] Upload progress and file-rejection message
- [ ] Edit, unpublish (with undo) and delete (with confirm)

### S-5.4 Download, open and view tracking

- **Repo:** api · **Points:** 3 · **DESIGN:** §6.2 /download, /open, §8 materialViews
- **Requirements:** R-20.3, R-23.1, R-19.3
- **Depends on:** S-5.2

**Acceptance criteria**

- [ ] `GET /materials/:id/download` checks permission, records the view, 302s to a signed URL
- [ ] `GET /materials/:id/open` records the view and 302s to the external link
- [ ] Views upserted per (material, user) with first and last opened time and count

### S-5.5 Member materials library

- **Repo:** both · **Points:** 5 · **DESIGN:** §4.1 /my/materials
- **Requirements:** R-20.1, R-20.2, R-20.3, R-20.4
- **Depends on:** S-5.4, S-0.7

**Acceptance criteria**

- [ ] Published materials of the member's year grouped by week, current week emphasized
- [ ] Search by title, topic and tag
- [ ] Download and open directly from the week view
- [ ] "New since your last visit" badges; `POST /me/materials/seen` updates the last visit
- [ ] Mentors-only and draft items never returned to members

### S-5.6 Member home

- **Repo:** both · **Points:** 3 · **DESIGN:** §6.2 /me/week
- **Requirements:** R-32.1, R-32.2, R-32.3
- **Depends on:** S-5.5

**Acceptance criteria**

- [ ] `GET /me/week` returns the current week's topic, mentors, session date and materials
- [ ] Member home screen as in the design, with the no-materials-yet empty state
- [ ] No attendance, absence, progress, note or status data in any member response or screen

### S-5.7 Reuse from earlier years

- **Repo:** both · **Points:** 5 · **DESIGN:** §9.2
- **Requirements:** R-17.1, R-17.2, R-17.3
- **Depends on:** S-5.2

**Acceptance criteria**

- [ ] Mentors and Admins browse earlier years' curriculum and materials (read-only)
- [ ] Copy a single material, a whole week, or a whole curriculum into the current year
- [ ] Copies are independent, start as Draft, and share the immutable stored file
- [ ] A file object is deleted only when no material references it
- [ ] Reuse screen as in the design, with a preview of what will be copied
