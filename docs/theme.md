# S-0.7-A theme note (R-34, R-42)

Owner: Elad Abutbul. Reviewer: Almog Lavi. Source: DESIGN §4.2–4.3, §4.5.
All theme values and global focus rules live in `src/constants/theme.css`,
already imported by the scaffold. Components consume semantic utilities.

## Tokens

| Purpose         | Design utilities                                                                                                                   | Existing semantic aliases                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Page / surface  | `bg-page` #FAFAFB, `bg-surface` #FFFFFF                                                                                            | `bg-background`, `bg-card`, `bg-popover`, `bg-sidebar`                                                                          |
| Subtle surfaces | `bg-subtle` #F4F3F6, `bg-subtle-2` #F7F7F9                                                                                         | `bg-muted` → subtle                                                                                                             |
| Text            | `text-ink` #1C1A22, `text-ink-muted` #5E5A6B                                                                                       | `text-foreground`, `text-muted-foreground`                                                                                      |
| Borders         | `border-line` #E7E5EC, `border-line-strong` #C9C5D3                                                                                | `border-border` → line; `border-input` → muted ink for 3:1 control boundaries                                                   |
| Accent          | `bg-accent` #6B5BA8, `text-accent-ink` #5A4B94, `bg-accent-tint` #F1EEF8                                                           | `bg-primary`, `hover:bg-primary-hover`, `text-primary-foreground`; `bg-secondary text-secondary-foreground` → tint / accent ink |
| Dark band       | `bg-ink-band` #2E2350                                                                                                              | Pair with `text-primary-foreground` (white)                                                                                     |
| Status          | `bg-status-ok text-status-ok-foreground` (#F1EEF8 / #5A4B94); `status-warn` (#F8F0E2 / #80551A); `status-risk` (#F7E8E6 / #94382C) | `text-destructive` → risk ink                                                                                                   |

DESIGN's `text-muted` is named `text-ink-muted` here: Tailwind's shared color
namespace reserves `muted` for shadcn's subtle surface. Use
`text-muted-foreground` in existing primitives, including state variants.
Use status foreground/background pairs together. Chart and sidebar aliases
reuse the approved palette; charts still need non-color identification.

Radii: `rounded-sm` 10 px, `rounded-md` 12 px, `rounded-lg` 16 px,
`rounded-xl` 18 px, `rounded-2xl` 22 px, `rounded-full` pill. `--radius` is 1 rem.
Values use rem so they follow the root font size.

Spacing: `--spacing: 0.25rem` retains the scaffold's 4 px base, including
half steps. For example, `gap-2` = 8 px, `ps-4` = 16 px, `pe-6` = 24 px.
**Reference confirmation pending:** DESIGN lists no spacing values, and the
provided [Claude artifact](https://claude.ai/code/artifact/d71e748c-c0d1-403a-bd6f-d5c238126870#page-03174c151310)
requires sign-in in the available browsers. The retained spacing grid is not
claimed as an independently verified design extraction.

The approved palette is light. The scaffold's unrelated dark palette is removed;
there is no new dark theme or theme switcher.

## Focus and contrast

`:focus-visible` paints a 2 px accent-ink outline **inside** the control, with
a white inset stroke extending to 4 px. One stroke remains distinguishable on
light, purple and dark surfaces. Unlayered rules take precedence over the
existing `outline-none`, translucent rings and invalid-state ring utilities.
Forced-colors mode uses the system `Highlight` outline without a shadow.

The inset indicator stays within controls in `overflow-hidden` containers.
Layouts must still keep the control itself visible; these rules cannot repair
an occluded or offscreen control. Keep logical `ps-`/`pe-`, `ms-`/`me-`,
`start-`/`end-` and `text-start` utilities.

White on primary is 5.70:1. The previous `hover:bg-primary/80` fell below 4.5:1;
the Button now consumes `hover:bg-primary-hover` (the approved accent ink).
The contrast suite checks normal text at 4.5:1 and focus against surfaces at
3:1, following [WCAG non-text contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html).
Theme mapping follows [Tailwind v4 theme variables](https://tailwindcss.com/docs/theme).

## Font and gallery handoff

- Person 2: retain `--font-sans`, `--font-mono`, and `--font-heading` (heading
  aliases sans). This is the proposed integration contract; font-owner signoff
  remains pending. Existing font declarations and imports are untouched.
- Person 4: application imports/router/gallery remain yours. The browser-only
  fixture at `/tests/fixtures/theme.html` renders the existing Button and native
  controls for verification; it is not an application route or production entry.
- No backend changes, Jira points, or dependency links are added. KAN-11 remains
  the integration prerequisite. PR creation and Almog's review follow the local
  review; this work is intentionally uncommitted and unpushed.

## Verification and evidence

Run `pnpm test`, `pnpm lint`, `pnpm format:check`, `pnpm build`, and
`pnpm test:browser`. First browser run needs
`pnpm exec playwright install chromium`; CI installs Chromium and runs the
browser suite. The fixture can also be opened with `pnpm dev` at
`http://localhost:5173/tests/fixtures/theme.html`.

R-34 locks the extracted palette and verifies the existing Button's rendered
colors/radius, semantic aliases and logical RTL spacing. R-42 checks contrast,
Tab/Shift+Tab including disabled skipping, native link/input focus, forced
colors, hover/active/invalid states, and actual pixels of both focus strokes
inside an edge-flush clipping container. Desktop and 360 px viewports are used.

Captured implementation evidence is in `docs/evidence/s-0.7-a/`; the browser
runner also emits PNGs and contrast JSON into ignored `test-results/`.

| Evidence                                      | Desktop                                                     | 360 px                                                     |
| --------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| Extracted palette on existing primitives      | [Theme](evidence/s-0.7-a/desktop-theme.png)                 | [Theme](evidence/s-0.7-a/mobile-theme.png)                 |
| Keyboard focus on light surface               | [Focus](evidence/s-0.7-a/desktop-focus.png)                 | [Focus](evidence/s-0.7-a/mobile-focus.png)                 |
| Keyboard focus on dark surface                | [Dark band](evidence/s-0.7-a/desktop-dark-focus.png)        | [Dark band](evidence/s-0.7-a/mobile-dark-focus.png)        |
| Both strokes inside clipping container        | [Clipped focus](evidence/s-0.7-a/desktop-clipped-focus.png) | [Clipped focus](evidence/s-0.7-a/mobile-clipped-focus.png) |
| Measured rendered text contrast, normal/hover | [Ratios](evidence/s-0.7-a/desktop-contrast.json)            | [Ratios](evidence/s-0.7-a/mobile-contrast.json)            |

Manual check (2026-11-14): opened the local fixture and used Tab through the
Button variants, past the disabled control to the dark band, then into the
clipped control; Shift+Tab returned to the dark band. Visually inspected focus
and the desktop/360 px captures. Both inset strokes remain present; Hebrew
content wraps within the mobile viewport. Rendered enabled Button text
contrast is at least 5.30:1 across the measured normal and hover states.

Local results: 56 Vitest tests and 10 browser checks pass; lint, build and
formatting for this change pass. Repository-wide `format:check` and
`git diff --check` flag only the pre-existing uncommitted whitespace edit in
`src/app/providers.tsx`, which was preserved.

**Original Claude-design screenshot comparison and Almog's approval remain
pending** until the signed-in reference can be reviewed. These captures verify
the implementation against the extracted DESIGN values, not the inaccessible
original board.
