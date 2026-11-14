# Worked example: R-20.4 "New since your last visit"

One real feature taken through every SDD stage. Read it once before your first story, and copy its shape.

---

## 1. Requirement (REQUIREMENTS.md)

The requirement already exists as part of R-20:

> #### R-20 Member access to materials — **Must**
>
> _As a member, I want to find this week's materials quickly, so that I can prepare._
> … 4. THE SYSTEM SHALL indicate which materials are new since the member's last visit.

**Reading it like a tester:** it's a `THE SYSTEM SHALL` criterion, so it is always true and has no trigger. It says _what_ (members see which materials are new) and _why_ (find this week's materials quickly). It says nothing about how "last visit" is stored, which is correct for a requirement.

**Questions it leaves open.** Answer these before you code:

1. What is a "visit"? Opening the materials library, or any page?
2. What does a member see on their **first** visit, when no last visit exists yet?
3. If the visit is recorded when the page loads, do the badges disappear the moment they appear?
4. Is a material that was unpublished and then published again "new"?

The requirement can stay as it is. The answers are _how_ decisions, so they belong in DESIGN.

---

## 2. Design (DESIGN.md)

The existing design already covers most of it:

- §8 `users.materialsSeenAt?`: the time of the member's last visit.
- §8 `materials.publishedAt?`: set when the material is published.
- §8 derived value: **"New" materials (R-20.4):** `publishedAt > user.materialsSeenAt`.
- §6.2 `POST /me/materials/seen` (Member): updates the last visit (R-20.4).

The open questions become a design note. **This is the part of the PR that changes DESIGN:**

```md
- **"New" materials (R-20.4):** `isNew = publishedAt > user.materialsSeenAt`, computed by the API
  for members in `GET /years/:id/materials` (never stored).
  - A _visit_ is opening the materials library (`/my/materials`).
  - First visit (`materialsSeenAt` unset): nothing is marked new. Otherwise a new member's whole
    library would light up, and the badge would mean nothing.
  - The client calls `POST /me/materials/seen` after the list renders and does **not** refetch,
    so the badges stay for the current visit and are gone on the next one.
  - Publishing sets `publishedAt` every time, so a material that is unpublished and published
    again counts as new.
  - Mentors and Admins get no `isNew` field.
```

Then bump DESIGN to the next version, with a changelog row: `R-20.4 rules for first visit and badge lifetime`.

> **Why not decide this in the code?** The next person to touch materials (the Overview's "recent activity", the reuse import) reads DESIGN, not your component. A decision that only lives in code gets broken by someone who never knew about it.

---

## 3. Story (TASKS.md + Jira)

R-20.4 is part of the existing story **S-5.5 Member materials library** (R-20.1–R-20.4). Its criterion for this feature is:

> - [ ] "New since your last visit" badges; `POST /me/materials/seen` updates the last visit

The design note made it precise, so update the story's criteria in TASKS and in the Jira description:

```md
- [ ] R-20.4 Materials published after the member's last visit are returned with `isNew: true`
- [ ] R-20.4 On a member's first visit, no material is marked new
- [ ] R-20.4 `POST /me/materials/seen` sets the last visit to now; badges stay until the next visit
- [ ] R-20.4 `isNew` is never computed for drafts or mentors-only items (they aren't returned to members)
```

Jira story **KAN-57** (the number is illustrative), summary `S-5.5 Member materials library`, in epic E5, with the Claude Design board for "Materials library" attached.

---

## 4. Branch, tests, code

```bash
git switch -c KAN-57-new-since-last-visit
```

### 4.1 Tests first: one per criterion, named by ID

`ColmanDevClub-Server/src/modules/materials/materials.test.ts`

```ts
describe('R-20.4 new since last visit', () => {
  it('R-20.4 marks materials published after the last visit as new', async () => {
    const { member, year, week } = await seedMemberYear()
    await publishMaterial(week, { publishedAt: daysAgo(3) })
    await setSeenAt(member, daysAgo(2))
    const fresh = await publishMaterial(week, { publishedAt: daysAgo(1) })

    const res = await as(member)
      .get(`/api/v1/years/${year.id}/materials`)
      .expect(200)

    expect(res.body.items.find((m) => m.id === fresh.id).isNew).toBe(true)
    expect(res.body.items.filter((m) => m.isNew)).toHaveLength(1)
  })

  it('R-20.4 marks nothing new on the first visit', async () => {
    const { member, year, week } = await seedMemberYear() // materialsSeenAt unset
    await publishMaterial(week, { publishedAt: daysAgo(1) })

    const res = await as(member)
      .get(`/api/v1/years/${year.id}/materials`)
      .expect(200)

    expect(res.body.items.every((m) => m.isNew === false)).toBe(true)
  })

  it('R-20.4 POST /me/materials/seen moves the last visit to now', async () => {
    const { member } = await seedMemberYear()
    await as(member)
      .post('/api/v1/me/materials/seen')
      .set('X-CDC-Request', '1')
      .expect(204)
    expect((await reloadUser(member)).materialsSeenAt).toBeCloseToNow()
  })

  it('R-20.4 never returns drafts or mentors-only items to members', async () => {
    const { member, year, week } = await seedMemberYear()
    await createMaterial(week, { visibility: 'draft' })
    await createMaterial(week, { visibility: 'mentors' })

    const res = await as(member)
      .get(`/api/v1/years/${year.id}/materials`)
      .expect(200)

    expect(res.body.items).toHaveLength(0)
  })
})
```

Run them and watch them fail (red) before you write the code.

### 4.2 API: schema → service → route

Schema (authoritative, `src/schemas/materials.ts`). Add the field to the member DTO:

```ts
export const MemberMaterialDTO = MaterialDTO.extend({ isNew: z.boolean() })
```

Service (`materials.service.ts`). The rule lives here, in one place:

```ts
export function isNewForMember(m: Material, seenAt: Date | undefined): boolean {
  if (!seenAt || !m.publishedAt) return false // first visit: nothing is new (DESIGN §8)
  return m.publishedAt > seenAt
}
```

Route (`materials.routes.ts`). Declare the policy and the schema, and register the route in the OpenAPI registry:

```ts
router.post(
  '/me/materials/seen',
  authenticate,
  authorize(isMember),
  markMaterialsSeen,
) // R-20.4
```

### 4.3 Web: schema copy → hook → screen

- Mirror `MemberMaterialDTO` into `src/schemas/materials.ts`.
- `features/materials/useMarkSeen.ts`: a mutation that fires once after the library's query succeeds, and doesn't invalidate the list (badges stay for this visit).
- On the library screen, show `<Badge>חדש</Badge>` when `isNew`. Also give it a screen-reader label so the meaning isn't color-only (R-42).
- Add a component test that checks the badge renders for `isNew: true`, plus `vitest-axe`.

### 4.4 Docs in the same PR

- `docs/specs/DESIGN.md`: the §8 note from step 2, a version bump and a changelog row.
- `docs/specs/TASKS.md`: S-5.5's sharpened criteria from step 3.
- Seed script: a member with `materialsSeenAt` set, and one material published after it.

---

## 5. Pull request

Title: `KAN-57 Member materials library: new-since-last-visit badges`

```md
## What does this PR do?

Members see a "חדש" badge on materials published since their last visit to the library (R-20.4).
Adds `isNew` to the member materials response and `POST /me/materials/seen`.
Nothing is marked new on a member's first visit, and badges stay until the next visit.
DESIGN §8 updated with these rules.

## Jira

KAN-57

## Checklist

- [x] I worked from the SDD template (story → spec → code)
- [x] I checked my code and tested it locally
- [x] CI is green
```

The reviewer checks it against S-5.5's criteria. Each one has a test whose name starts with `R-20.4`, and the DESIGN diff explains the first-visit choice.

---

## What to take from this

- The requirement didn't change. The **design** absorbed the open questions, and the **story** got sharper criteria from it.
- Every test name starts with a criterion ID, so "is R-20.4 covered?" is a single search.
- The decision about the first visit is written down once, in DESIGN §8. The code points to it.
