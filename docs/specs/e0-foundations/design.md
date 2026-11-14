# E0 Project setup & foundations — Design

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: §4.2, §4.3, §4.5, §4.6. Shared design (architecture, T-xx, data model, authorization, security, testing): [core/design.md](../core/design.md). Section numbers (§) match the original DESIGN.md.

## 4. Frontend design

### 4.2 Design tokens → Tailwind (T-03)

Extracted from the Claude Design source files:

| Token                   | Value                                                         | Tailwind name                         |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------- |
| Page background         | `#FAFAFB`                                                     | `bg-page`                             |
| Surface                 | `#FFFFFF`                                                     | `bg-surface`                          |
| Subtle surface          | `#F4F3F6` / `#F7F7F9`                                         | `bg-subtle`, `bg-subtle-2`            |
| Border                  | `#E7E5EC`, strong `#C9C5D3`                                   | `border-line`, `border-line-strong`   |
| Text                    | `#1C1A22`, muted `#5E5A6B`                                    | `text-ink`, `text-muted`              |
| Accent                  | `#6B5BA8`, accent text `#5A4B94`, tint `#F1EEF8`              | `accent`, `accent-ink`, `accent-tint` |
| Dark band               | `#2E2350`                                                     | `bg-ink-band`                         |
| Status OK / warn / risk | `#F1EEF8`/`#5A4B94`, `#F8F0E2`/`#80551A`, `#F7E8E6`/`#94382C` | `status-*`                            |
| Radii                   | 10 / 12 / 16 / 18 / 22 / full                                 | `rounded-*` scale                     |
| Fonts                   | IBM Plex Sans Hebrew, JetBrains Mono                          | `font-sans`, `font-mono`              |

The design files are the source of truth for these values. Any change happens in the design first, then in `tailwind.config`.

### 4.3 RTL (R-38)

- `<html lang="he" dir="rtl">`.
- Tailwind **logical** utilities only: `ms-/me-`, `ps-/pe-`, `start-/end-`, `text-start`. CI fails the build if `ml-`, `mr-`, `pl-`, `pr-`, `left-` or `right-` appear in a PR (ESLint rule or grep).
- Mixed text: English terms are wrapped in `<bdi>`. Emails, URLs, phone numbers and code use `dir="ltr"`.

### 4.5 UX patterns (R-35, R-37, R-42)

- **Loading:** every query-driven list or widget has a skeleton variant (`<XSkeleton/>`) rendered while `isPending` (R-37.1).
- **Empty:** `<EmptyState title action />` on every list, with the next action (R-37.2).
- **Destructive actions:** `<ConfirmDialog>` for deletes. `<UndoToast>` for reversible actions such as removing an absence or unpublishing (R-37.3).
- **Motion:** route transitions and scroll reveals through `motion`. All motion is disabled when `prefers-reduced-motion` is set (R-35.3). Only `transform` and `opacity` are animated, so there's no layout shift (R-35.2).
- **Accessibility:** Radix primitives handle focus and ARIA. A global focus ring token is used. `eslint-plugin-jsx-a11y` runs in lint, and `vitest-axe` runs in component tests (R-42).

### 4.6 Performance (R-41)

- Route-level code splitting: the public pages, the member area and the dashboard are separate chunks. A public visitor never downloads dashboard code.
- The hero 3D scene loads lazily, after first paint, behind `requestIdleCallback`, and has a static fallback image.
- Images: AVIF/WebP with explicit width and height.
- **Budget:** public entry chunk ≤ 150 KB gzip. Lighthouse CI runs on the PR preview URL (§14).

---
