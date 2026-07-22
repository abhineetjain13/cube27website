# Cube27 Marketing Website

Standalone [Astro](https://astro.build) marketing site with React islands, styled with Tailwind v4 and deployed to **Cloudflare Pages**. See [MAINTENANCE.md](MAINTENANCE.md) for the architectural overview and [AGENTS.md](AGENTS.md) for contributor conventions.

## Prerequisites

- Node.js 20+ and [pnpm](https://pnpm.io)

## Local development

```bash
pnpm install
pnpm dev          # Astro dev server on http://localhost:3000
```

To exercise the contact-form API route locally (Cloudflare Pages Functions), run
the Wrangler dev server instead, which loads `.dev.vars`:

```bash
pnpm build
pnpm wrangler pages dev ./dist
```

## Quality gate

```bash
pnpm run verify   # eslint + astro check (types) + astro build
```

Run this before every commit and deploy.

## Contact form configuration

The contact form posts to `/api/contact`, handled by
[functions/api/contact.ts](functions/api/contact.ts). It emails submissions via
[Resend](https://resend.com) and includes a honeypot field for spam protection.
The endpoint returns **HTTP 503** until all three secrets below are set.

| Variable             | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`     | Resend API key (`re_…`)                                      |
| `CONTACT_TO_EMAIL`   | Inbox that receives submissions                              |
| `CONTACT_FROM_EMAIL` | Verified Resend sender address (its domain must be verified) |

**Setup steps:**

1. Create a [Resend](https://resend.com) account and **verify your sending
   domain** (add the DNS records Resend provides to your DNS host).
2. Generate an API key.
3. **Local:** copy [.dev.vars.example](.dev.vars.example) to `.dev.vars` and fill
   in the values. `.dev.vars` is gitignored — never commit secrets.
4. **Production:** in the Cloudflare dashboard, go to your Pages project →
   **Settings → Environment variables** and add the three keys as
   **encrypted secrets** for the Production (and Preview) environments.

## Image assets

Optimized WebP variants live in [public/](public/) and are committed directly,
so the build needs no image tooling. They were generated with
[sharp](https://sharp.pixelplumbing.com):

```bash
pnpm run optimize:images
```

The committed assets are:

- **Hero background** — `cube27-bg.webp` (1600px master) plus downscaled tiers
  `cube27-bg-640/960/1280.webp`, wired up via `srcset`/`sizes` in the hero.
- **Logo** — `cube27_logo.webp`, used both for on-page display and as the
  schema.org structured-data logo.
- **Partner logos** — `images/logos/opt/{n}.webp` for the Trusted Partners
  marquee, whitespace-trimmed so each mark fills its frame (no card chrome).
- **Life at Cube27 photos** — `images/office/opt/life-NN.webp` (ordered
  numerically) for the culture gallery.

The heavy source masters (original logo PNGs, office JPGs) have been removed
from the repo to keep it lean — the optimized `opt/*.webp` are now the assets of
record. To add or re-optimize images, drop the source files back into
`public/images/logos/` or `public/images/office/` and re-run the script; it
regenerates the hero tiers from `cube27-bg.webp` and skips any step whose source
is absent. If you change the number of images, update the `count` on
`<PartnerMarquee>` (home) and `<LifeAtCube27>` (about) accordingly.

## Deployment

Push to the connected GitHub repository; Cloudflare Pages builds and deploys
automatically. Build output is `./dist` (see [wrangler.jsonc](wrangler.jsonc)).

- **HTTPS/SSL:** Cloudflare provisions Universal SSL automatically for
  `*.pages.dev` and for custom domains once they are added and their DNS is
  proxied through Cloudflare — no certificate upload is required in the standard
  case.
- **Custom domain:** add `www.cube27.com` under the Pages project's **Custom
  domains** tab. The `site` value in [astro.config.mjs](astro.config.mjs) is
  already set to `https://www.cube27.com` (used for canonical URLs, the sitemap,
  and structured data).
