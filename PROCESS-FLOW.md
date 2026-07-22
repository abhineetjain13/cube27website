# Cube27 Website — How to Maintain It (Process Flow Guide)

This guide explains **how the Cube27 website works and how to keep it updated**, with
diagrams. It is written for **two kinds of people**:

- 👩‍💼 **Non-technical team members** — marketing, content, or ops. You update the site
  by **describing what you want to an AI assistant inside VS Code** — the same way this
  entire project was built. You don't need to write code yourself.
- 👩‍💻 **Technical team members** — developers. You edit the files directly and follow
  the safe path from edit → live site.

> The diagrams below are drawn as text so they render in **any** Markdown viewer
> (VS Code preview, GitHub, plain text) — no plugins required.
>
> Also see [`README.md`](README.md) (setup & commands), [`AGENTS.md`](AGENTS.md)
> (code conventions), and [`MAINTENANCE.md`](MAINTENANCE.md) (why this architecture).

---

## 1. The big picture — how any change reaches the live website

Every update follows the same journey. Nothing goes live until it is saved into the
code repository (GitHub) and automatically published by Cloudflare.

```
        Idea for a change
                │
                ▼
  ┌───────────────────────────────────────────────┐
  │ Describe it to the AI assistant in VS Code      │
  │   ── or ──                                      │
  │ A developer edits the file directly             │
  └───────────────────────────────────────────────┘
                │
                ▼
     AI / developer edits the right file(s)
                │
                ▼
     Run the quality check:  pnpm run verify
                │
          ┌─────┴─────┐
       passes       fails ──► back to editing
          │
          ▼
        Push to GitHub  (git push)
                │
                ▼
   Cloudflare Pages builds automatically  (~1 min)
                │
                ▼
          Live at www.cube27.com
```

There is no separate "publish" button and no login dashboard — **the code *is* the
content**, and pushing to GitHub is what publishes it.

---

## 2. The AI-driven workflow (for non-technical team members)

This website was **created through an AI assistant in VS Code**, and it is maintained
the same way. You describe the change you want in ordinary words; the AI finds the
right files, makes the edits, checks them, and publishes.

```
  You (in words)                 AI assistant in VS Code
  ─────────────                  ───────────────────────
  "Change the About            ┌──────────────────────────┐
   headline to X"       ──────►│ 1. Finds the correct file │
                                │ 2. Makes the edit         │
                                │ 3. Shows you the result   │
                                │ 4. Runs `pnpm run verify` │
                                │ 5. Commits & pushes        │
                                └──────────────────────────┘
                                            │
                                            ▼
                                  Cloudflare publishes it
                                            │
                                            ▼
                             You review it live on the site
```

**Step by step:**

1. **Open the project** in VS Code.
2. **Open the AI assistant** (the chat panel / Claude Code) in VS Code.
3. **Describe the change** in normal language. Be specific:
   - _which page_ (e.g. "the About page", "the footer", "the contact section"),
   - _the exact new wording or value_ you want.
4. **Let the AI locate and edit** the correct file(s). It will show you what changed.
5. **Ask it to preview / check**: "run the dev server so I can see it" and
   "run `pnpm run verify`".
6. **Ask it to publish**: "commit and push this." (Or use VS Code's Source Control
   panel to commit and push yourself.)
7. **Confirm on the live site** a minute or two later at `www.cube27.com`.

**How to describe a change well (so the AI gets it right the first time):**

- Name the page or area exactly.
- Paste the *current* text if you can, and the *new* text you want.
- Ask for one change at a time when possible.
- Ask the AI to **show you the change and run `pnpm run verify` before pushing**.

**Example requests you can type to the AI:**

> "On the Contact page, change the response-time note from 24 hours to 48 hours."

> "Replace the phone number in the footer with our LinkedIn link."

> "Add a new case study to the Success Stories page with this title and summary: …"

---

## 3. Who does what

```
  👩‍💼 Non-technical team                👩‍💻 Developer (optional / for deeper work)
  ─────────────────────                ──────────────────────────────────────────
  Decide what to change                Handle new features, layout, or logic
  Describe it to the AI in VS Code     Edit files directly when needed
  Review the AI's edit                 Debug build or deploy issues
  Approve / ask AI to publish          Manage secrets & Cloudflare settings
  Check the live site
```

> This site has **no visual admin panel** (like WordPress `/wp-admin`). Content lives
> in code — but the AI assistant is what lets non-technical teammates edit that code by
> describing changes in words. A developer is only needed for larger structural work.
> See [`MAINTENANCE.md`](MAINTENANCE.md) if you ever want to weigh adding a CMS.

---

## 4. Map of the repository (where things live)

```
📁 cube27  (project root)
├── 📁 src ................ the website itself
│   ├── 📁 pages .......... one file per web page / URL
│   ├── 📁 components
│   │   ├── 📁 pages ...... the content & layout of each page
│   │   ├── 📁 sections ... shared navbar, footer, contact block
│   │   └── 📁 ui ......... reusable buttons, cards, etc.
│   ├── 📄 site-config.ts . company name, email, address, social links
│   └── 📄 styles/globals.css  brand colors & fonts
├── 📁 functions ......... contact-form logic (server-side)
├── 📁 public ............ images, favicon, llms.txt (drop-in files)
├── 📁 files ............. text copies of each page's copy (easy to read/draft)
└── 📄 README / AGENTS / MAINTENANCE / PROCESS-FLOW  docs
```

| Folder / file | What it holds | Who usually touches it |
| :------------ | :------------ | :--------------------- |
| `src/pages/` | One file per URL (e.g. `about.astro` → `/about`) | AI / developer |
| `src/components/pages/` | The text & layout of each page | AI / developer |
| `src/components/sections/` | Shared **navbar, footer, contact** | AI / developer |
| `src/site-config.ts` | Company name, email, address, social links | AI / developer |
| `src/styles/globals.css` | Brand colors and fonts | Developer |
| `public/` | Images, favicon, `llms.txt` | Anyone (drop-in files) |
| `files/*.md` | Text mirror of page copy | Non-tech can read/draft here |

> 💡 The `files/` folder holds readable Markdown copies of each page's text — a safe
> place to *read* current copy or *draft* new wording before asking the AI to apply it.

---

## 5. Common tasks and their process flows

### 5a. Change text on a page (e.g. a headline or paragraph)

```
  Identify the page ─► Ask AI: "change <text> on <page> to <new text>"
        └─► AI edits src/components/pages/<page>/
              └─► preview (pnpm run dev) ─► pnpm run verify ─► push ─► live
```

### 5b. Update contact details (email, address, social links)

```
  Ask AI to update:
    src/site-config.ts .............. source of truth (email, address, links)
    src/components/sections/contact.tsx  visible Contact section
    src/components/sections/footer.tsx   site footer
    files/contact.md, privacy-policy.md, public/llms.txt  text mirrors
        └─► pnpm run verify ─► push ─► live
```

Keep these in sync — the AI will update them together if you mention "everywhere".

### 5c. Add or replace an image

```
  Put the image in public/  ─►  reference it in the page/component
        └─► pnpm run verify ─► push ─► live
```

### 5d. How the contact form works (when a visitor submits it)

```
  🧑 Visitor submits form
        │  POST /api/contact
        ▼
  functions/api/contact.ts  ── validates input + checks honeypot
        │
   ┌────┴─────────────┐
   secrets set    secrets missing
   │                    │
   ▼                    ▼
  📧 Sends email      Returns HTTP 503
   via Resend         (until secrets configured)
   │
   ▼
  Team inbox receives the submission
```

The form needs three secret values in Cloudflare (`RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Setup is in
[`README.md`](README.md#contact-form-configuration). **Never put secrets in the code.**

---

## 6. "Where do I edit this?" quick guide

| What you want to change | File / place | How to ask the AI |
| :---------------------- | :----------- | :---------------- |
| Text on a page | `src/components/pages/<page>/` | "Change the text on the … page to …" |
| Contact info / social links | `site-config.ts` + `contact.tsx` + `footer.tsx` | "Update our contact info everywhere to …" |
| An image | `public/` folder | "Replace the image on … with this file" |
| Brand colors / fonts | `src/styles/globals.css` | "Change the accent color to …" |
| Navbar / footer links | `sections/navbar.tsx` / `footer.tsx` | "Add a link to … in the navbar" |
| Contact-form behavior | `functions/api/contact.ts` | "Add a field to the contact form for …" |

---

## 7. The one rule before anything goes live

```
  Make the edit ─► pnpm run verify ─► passes ─► push to GitHub ─► deploys (~1 min)
                        │
                        └─ fails ─► fix the errors ─► run verify again
```

**`pnpm run verify`** is the safety net. It runs the code linter, checks types, and
does a full production build. On success it prints nothing; on failure it prints exactly
what's wrong. **Always run it (or ask the AI to run it) before pushing.**

---

## 8. Developer quick reference

```bash
pnpm install          # one-time: install dependencies (Node 20+ and pnpm required)
pnpm run dev          # preview locally at http://localhost:3000
pnpm run verify       # REQUIRED gate: eslint + type check + build
pnpm run format       # auto-format with Prettier
pnpm build            # production build into ./dist
pnpm run dev:pages    # preview with the contact-form function (loads .dev.vars)
```

**Deploy:** `git push` to the connected GitHub repo — Cloudflare Pages builds and
publishes automatically. There is no manual deploy step.

---

## 9. Mini-glossary

| Term | What it means |
| :--- | :------------ |
| **AI assistant** | The chat helper inside VS Code that edits the code when you describe a change. |
| **Repository / repo** | The folder of files that make up the website, tracked by GitHub. |
| **GitHub** | The online home where the code is stored and versioned. |
| **Commit / push** | Saving a change and sending it up to GitHub. |
| **Build** | Turning the code into the finished web pages. |
| **Deploy** | Publishing the finished pages to the live internet. |
| **Cloudflare Pages** | The service that builds and hosts the live site. |
| **Component** | A reusable building block of a page (e.g. the footer). |
| **Astro / React** | The tools the site is built with. |
| **Secret / environment variable** | A private key stored safely outside the code (e.g. the email key). |

---

### Summary in one line

> A teammate describes a change to the AI in VS Code (or a developer edits directly) →
> `pnpm run verify` → push to GitHub → Cloudflare publishes it live in about a minute.
> No dashboards, no servers to patch, and the code is the single source of truth.
