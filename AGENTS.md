# Cube27 website instructions

This repository contains the Cube27 marketing website. It uses Astro 6, React 19, TypeScript, Tailwind CSS v4, and Cloudflare Pages.

## Commands

```bash
pnpm install
pnpm run verify       # eslint + Astro check + production build
pnpm run dev          # local site at localhost:3000
pnpm run dev:pages    # local Pages preview after building
pnpm run format       # Prettier
```

`pnpm run verify` is the required gate after changes.

## Structure

- `src/pages/` contains thin Astro route shells.
- `src/components/pages/` contains page compositions and page-local sections.
- `src/components/sections/` contains shared navigation, footer, and contact sections.
- `src/components/ui/` contains reusable primitives.
- `src/styles/globals.css` contains Tailwind v4 theme tokens.
- `functions/` contains Cloudflare Pages Functions.
- `public/` contains static assets.

## Conventions

- Use kebab-case filenames and PascalCase exports.
- Keep page-only components inside the corresponding page subtree.
- Use `@/*` for imports into shared code and relative imports within a page subtree.
- Use semantic Cube27 tokens from `globals.css`; do not add raw hex colors to components.
- Use lucide-react for interface icons.
- Use `motion/react` only for meaningful complex motion and respect reduced-motion preferences.
- Keep public routes static unless a future feature has a clear request-time requirement.

## Deployment

- The canonical hostname is `https://www.cube27.com`.
- Cloudflare Pages uses `wrangler.jsonc` and `dist/` as the build output.
- Contact submissions are handled by `/api/contact` and delivered through Resend.
- Never commit API keys or production secrets. Configure them as Cloudflare secrets.
