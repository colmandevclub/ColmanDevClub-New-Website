# E5 Study materials — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §6.2 materials endpoints, §9.2, §10. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 6. API design

### 6.2 Endpoints

**Auth & account**

| Method | Path       | Access | Requirements |
| ------ | ---------- | ------ | ------------ |
| GET    | `/me/week` | Member | R-32         |

**Materials**

| Method         | Path                                                                                                                | Access                        | Requirements           |
| -------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------- |
| GET            | `/years/:id/materials?q=` (members: published only; mentors-only items hidden)                                      | Member of year, Mentor, Admin | R-20                   |
| POST           | `/materials/upload-url` `{ fileName, mime, size }` → `{ uploadUrl, fileKey }`                                       | Mentor of the year, Admin     | R-18.4                 |
| POST           | `/weeks/:id/materials` (any week of the year)                                                                       | Mentor of the year, Admin     | R-18, D28              |
| PATCH / DELETE | `/materials/:id`                                                                                                    | Mentor of the year, Admin     | R-18, R-19             |
| GET            | `/materials/:id/download` → 302 to a signed URL (5 min) + records a view                                            | Permitted viewers             | R-19.3, R-20.3, R-23.1 |
| GET            | `/materials/:id/open` → 302 to the external link + records a view                                                   | Permitted viewers             | R-20.3, R-23.1         |
| POST           | `/me/materials/seen` (updates the "last visit" time)                                                                | Member                        | R-20.4                 |
| POST           | `/years/:id/import` `{ sourceYearId, items: [{ weekNumber, materialIds? }], targetWeekNumber? , wholeCurriculum? }` | Mentor (assigned), Admin      | R-17.2–3               |

## 9. Key business flows

### 9.2 Reuse from an earlier year (R-17)

- Copies week `topic` and `description`, and/or selected materials, into the target year's weeks.
- Copied materials get `copiedFromId`, `authorId = <copier>` and `visibility: draft` (as in the design).
- **Files:** stored objects are **immutable** (a replaced file always gets a new key). So a copy reuses the same `fileKey`, and editing the copy never changes the original (R-17.3). A file object is deleted only when no material references its key any more.

## 10. File storage (R-18.4, R-19.3) — Cloudinary (T-21)

```ts
interface StorageService {
  createUploadUrl(
    key: string,
    mime: string,
    maxBytes: number,
  ): Promise<{ url: string; fields?: Record<string, string> }>
  createDownloadUrl(
    key: string,
    fileName: string,
    ttlSeconds: number,
  ): Promise<string>
  delete(key: string): Promise<void>
}
```

- **Provider:** one Cloudinary account (cloud set up in S-0.5 on the club Gmail). Material files are stored with delivery type **`authenticated`** (never `upload`/public), under the folders `materials/` and `avatars/`. PDF and ZIP delivery is enabled in the account's security settings. Only the API holds `CLOUDINARY_API_SECRET` (a Vercel env var). The browser only ever receives short-lived signed upload parameters and signed URLs.
- **Upload:** the API validates mime and size (allow-list: PDF, PNG/JPG, ZIP, PPTX/DOCX; **max 10 MB**, the free-plan per-file limit) → returns signed upload parameters (signature, timestamp, `public_id`, `type: authenticated`) → the browser uploads directly to Cloudinary → the client calls `POST /weeks/:id/materials` with the `fileKey` (`public_id`) → the API checks through the Admin API that the asset exists and its size matches. A file over 10 MB gets the clear error from R-18.4 before any upload starts.
- **Download:** `GET /materials/:id/download` → permission check → audit view → 302 to a signed, expiring URL valid for 5 minutes. Assets are **private**, with no public delivery URL (R-19.3).
- **Keys (`public_id`):** `materials/<uuid>/<sanitized-file-name>`, `avatars/<userId>/<uuid>`.
- **Recordings** are added as links (unlisted YouTube or Drive), not uploaded. Video files aren't on the allow-list, so the free plan's storage and bandwidth credits stay enough for documents.
- **Local development:** a filesystem adapter implements the same interface, so no Cloudinary keys are needed to run locally.

---
