# ColmanDevClub — Web

Hebrew RTL SPA built with Vite, React 19 and TypeScript. S-0.2 implements the
frontend foundation from DESIGN §3.1 and §4 (T-01–T-04, R-38.1).

## Local development

Use Node.js 22.22.2+ on the Node 22 LTS line (`.nvmrc`) and pnpm 10.32.1 (pinned in
`package.json`). Node 24.15+ and 26 are also supported by the installed tooling.

```sh
nvm install
nvm use
npm install --global pnpm@10.32.1
pnpm install
pnpm dev
```

Open [localhost:5173](http://localhost:5173). Start the sibling
`ColmanDevClub-Server` app separately with `pnpm dev`; its default port is `3000`.
Vite proxies `/api` to `http://localhost:3000` without stripping the path, so
`/api/v1/health` reaches the API's health endpoint. If the API uses another port,
update `DEVELOPMENT.API_TARGET` in `src/constants/development.ts`. No frontend environment variables
are required for this scaffold.

```sh
curl http://localhost:5173/api/v1/health
```

## Commands

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Vite dev server with API proxy           |
| `pnpm build`        | TypeScript checks and production bundle  |
| `pnpm preview`      | Serve the production bundle locally      |
| `pnpm lint`         | ESLint, including the RTL direction rule |
| `pnpm format`       | Format source and config files           |
| `pnpm format:check` | Check formatting                         |
| `pnpm test`         | Run Vitest once                          |
| `pnpm test:watch`   | Run Vitest in watch mode                 |

`pnpm install` runs Husky's `prepare` script. The pre-commit hook runs lint-staged
to lint and format staged JavaScript/TypeScript and format supported text files.
Vitest uses jsdom and Testing Library for React; the ESLint rule tests use Node.

## Source conventions

- `src/app/`: routing and providers (TanStack Query and Radix RTL direction).
- `src/pages/`: route screens, starting with the home page and a not-found page.
- `src/components/ui/`: shadcn/ui components generated with the Radix preset and RTL enabled.
- `src/lib/`: shared helpers, including the axios `api` instance and `cn` helper.
- `src/constants/`: API settings, routes, locale, site metadata, page copy,
  page styles, button variants, theme tokens and the local API target, in separate
  files by topic. Import constants directly from the relevant file.
- `src/test/`: shared test setup. Tests live beside the code they cover.
- `tools/eslint/`: the local RTL lint rule and its regression tests.
- Import source modules through `@/`, which resolves to `src/` in TypeScript,
  Vite and Vitest.

As features are added, follow DESIGN §3.1 for `features/`, `schemas/`, `content/`,
shared components and layouts. The complete design tokens, self-hosted Hebrew
fonts and production layouts belong to S-0.7.

Use the shared axios client for API calls:

```ts
import { api } from '@/lib/api'

const { data } = await api.get('/health')
```

The client uses `/api/v1`, includes cookies and sends `X-CDC-Request: 1` on every
request. A request interceptor preserves the marker if request-specific headers
attempt to override it. Form dependencies (`react-hook-form`, Zod and
`@hookform/resolvers`) are installed for feature work.

The document is `<html lang="he" dir="rtl">`. Use logical Tailwind utilities:
`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`, and `text-start`. ESLint rejects
`ml-`, `mr-`, `pl-`, `pr-`, `left-` and `right-` in source string literals and
template literals, including variants, negative values and important modifiers.
Keep complete class names in source rather than building them from fragments.
Wrap English terms in `<bdi>`; use `dir="ltr"` for emails, URLs, phone numbers
and code.

`index.html` uses placeholders populated by Vite from `src/constants/site.ts`
and `src/constants/locale.ts` in both development and production. Edit these
constants to change the title, favicon, root element, language or direction.
CSS theme values live in `src/constants/theme.css`, imported by `src/index.css`.
Test fixtures and expected values remain explicit so tests independently verify
the application's behavior.

To add another shadcn/ui component:

```sh
pnpm exec shadcn add input
```

The setup follows the official [shadcn/ui Vite guide](https://ui.shadcn.com/docs/installation/vite)
and [RTL guide](https://ui.shadcn.com/docs/rtl/vite).

The repository's GitHub Actions workflow runs install, lint, formatting checks,
tests and build on pull requests. Vercel API rewrites and the production SPA
fallback belong to S-0.4; the API proxy here applies to development.
