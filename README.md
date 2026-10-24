# Eslam Mohammed Mrwan — Engineering Portfolio

Personal portfolio for **Eslam Mohammed Mrwan**, a senior Mechatronics Engineering
student working across robotics, embedded systems, industrial automation, control
systems, Python and data analytics.

The site is a single statically rendered page. Its guiding rule is that
**completed work and planned work are labelled separately** — nothing is
presented as finished unless it exists in a public repository.

## Stack

- **Next.js 15.5.28** (App Router) — patched release on the Next.js 15 line
- **React 19** · **TypeScript 5** in `strict` mode
- **Tailwind CSS 3.4** (intentionally not v4 — see [Dependency notes](#dependency-notes))
- **lucide-react** for icons
- SEO: generated metadata, `sitemap.xml`, `robots.txt`, a code-generated Open
  Graph image, and `Person` JSON-LD structured data
- Baseline security headers (CSP, HSTS, `nosniff`, Referrer-Policy,
  Permissions-Policy, `frame-ancestors 'none'`)
- GitHub Actions CI: typecheck, lint, build, and a high/critical audit gate

## Sections

| Section | Content |
|---|---|
| Hero | Name, role, focus-area tags, primary calls to action |
| About | Background and the honesty policy for project status |
| Technical Skills | Six focus-area cards plus evidenced tools and technologies |
| Engineering Experience | Academic standing and self-directed project work |
| Featured Projects | **Completed** and **Planned** groups, visually distinct |
| Contact | GitHub, plus email and LinkedIn when configured |

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, zero warnings tolerated |
| `npx tsc --noEmit` | Typecheck only |

## Environment variables

Copy `.env.example` to `.env.local`. **All three are optional and all are
placeholders — no personal contact details are committed to this repository.**

| Variable | Required | Effect if unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Falls back to a placeholder domain. Canonical URLs, the sitemap and Open Graph previews will point at the wrong host until set. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | The email button is hidden; the Contact section shows GitHub only. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | The LinkedIn link is hidden. |

Set `NEXT_PUBLIC_SITE_URL` in your hosting provider's project settings after the
first deployment, then redeploy so previews and the sitemap use the final domain.

> `NEXT_PUBLIC_*` variables are inlined into the client bundle at build time.
> Anything placed in them is public. Never put a secret in one.

## Editing content

All content lives in **`lib/portfolio-data.ts`**. There is no CMS and no
database — edit the typed arrays and rebuild.

```text
lib/portfolio-data.ts   focusAreas · toolGroups · experience · projects
lib/site.ts             name, role, URLs, env-driven contact details
```

Content updates to review before publication:

1. **`toolGroups`** — add the hardware, CAD and simulation tools you have
   actually used (Arduino, STM32, SolidWorks, MATLAB/Simulink, Altium, a specific
   PLC family). They are omitted right now because nothing in this repository
   evidences them yet.
2. **`experience`** — university is listed as Horus University, Egypt; add verified
   internships, laboratory work, competition teams and training, with real dates.
3. **`projects`** — the four `status: "planned"` entries are scope placeholders
   describing intended work. Replace or extend them, and move each to
   `status: "completed"` only once a public repository exists.

### Project status rules

Please keep these — they are the point of the site:

- `status: "completed"` requires publicly verifiable work, normally a repository link.
- `status: "planned"` states intended scope only. No results, measurements,
  accuracy figures or hardware demonstrations.
- Do not add metrics, awards or certifications that cannot be linked to evidence.

## Project structure

```text
app/
  layout.tsx            Root layout, metadata, fonts, skip link
  page.tsx              Section composition and Person JSON-LD
  globals.css           Tailwind layers, base styles, focus and motion rules
  robots.ts             Crawler policy
  sitemap.ts            Sitemap generation
  opengraph-image.tsx   Build-time generated OG card (1200x630)
  not-found.tsx         404 page
  error.tsx             Client error boundary
components/
  site-header.tsx       Sticky header with accessible mobile menu
  site-footer.tsx
  section.tsx           Shared section wrapper and heading
  hero.tsx  about.tsx  skills.tsx  experience.tsx  projects.tsx  contact.tsx
lib/
  site.ts               Site config, env-driven contact details
  portfolio-data.ts     All portfolio content
.github/workflows/
  ci.yml                Typecheck, lint, build, audit
```

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and one `h1` per page
- Skip-to-content link as the first focusable element
- Every section labelled via `aria-labelledby`
- Mobile menu uses a real `button` with `aria-expanded` / `aria-controls` and
  closes on <kbd>Escape</kbd>
- Visible `:focus-visible` ring kept globally
- Decorative graphics and all icons are `aria-hidden`
- `prefers-reduced-motion` honoured, including smooth scrolling

Automated accessibility and Lighthouse testing are **not** yet set up — see
[Known gaps](#known-gaps).

## Dependency notes

`npm audit` currently reports **3 moderate advisories and zero high or critical**.

All three come from `tailwindcss@3.4.19` via `postcss-nested` and
`postcss-selector-parser`. They cannot be cleared on the Tailwind 3 line; the fix
is Tailwind 4, a breaking major with a new CSS-first configuration model.
**This is a deliberate, documented trade-off** — it is scheduled separately
rather than bundled into a feature change.

`eslint` is still on `8.57.1`, which is end-of-life. Migrating to ESLint 9 flat
config is a planned follow-up.

## Deployment

1. Push to GitHub.
2. Import the repository into Vercel; keep the **Next.js** framework preset.
3. Add `NEXT_PUBLIC_SITE_URL` (and optionally the contact variables) in the
   project settings.
4. Redeploy so canonical URLs, the sitemap and social previews use the real domain.

## Known gaps

Tracked honestly rather than quietly omitted:

- No automated tests. No test runner is configured and `npm test` does not exist.
- No `LICENSE` file, so the repository is "all rights reserved" by default.
- No Lighthouse or automated accessibility checks in CI.
- No Dependabot or Renovate configuration.
- ESLint 8 is end-of-life; flat-config migration pending.
- Tailwind 3 leaves 3 moderate advisories open, as described above.
- No CV PDF is committed. Add one to `public/` and link it when ready.

See [`AUDIT.md`](AUDIT.md) for the full prior audit, including the findings this
implementation addresses and the ones still outstanding.
