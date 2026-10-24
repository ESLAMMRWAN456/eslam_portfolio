# Repository Audit — `ESLAMMRWAN456/eslam_portfolio`

**Auditor:** Senior software engineer review
**Audit date:** 2026-10-24
**Commit audited:** `c15cda64` (`main`, pushed 2026-06-27T12:01:50Z)
**Repo metadata:** public · TypeScript · 62 KB · 3 commits · 0 stars · 0 open issues · no license · no releases · no GitHub Pages
**Stated description:** *"Personal portfolio for Python Automation & Data Solutions"*

> **Scope note:** This is a read-only audit. No application code was modified, nothing was deployed, and nothing was merged. The only file added is this report. A dependency-upgrade experiment was run in an isolated throwaway sandbox (outside the repo) purely to verify remediation claims.

---

## 1. Executive summary

**The repository does not contain an application.** It is a correctly-formed Next.js 15 *configuration scaffold* with **zero source files**. Every build-capable entry point described in the README is absent.

The root cause is a single, concrete mistake: the path `app` — which must be the Next.js App Router **directory** — exists in git as a **1-byte regular file** containing a single newline (`0x0A`). The final commit is literally titled *"Create app"*; it appears a file named `app` was created through the GitHub web UI instead of a directory such as `app/layout.tsx`. Because a file blocks the directory name, this breaks the build, breaks linting, and will block `app/` creation on any fresh clone until removed.

Separately, and independently of the missing code, the pinned dependency set carries **12 known advisories including 1 critical and 7 high**, among them **three unauthenticated remote-code-execution advisories against Next.js itself**. One of those RCEs is in the Image Optimization AVIF path — which `next.config.ts` **explicitly opts into**. This would be a live, internet-facing RCE the moment the site is deployed with real code.

Finally, there is a **strategic mismatch**: every piece of prose, the service taxonomy, and the repo description position this as a *Python Automation freelance lead-generation site*. The stated goal is a **Mechatronics Engineering portfolio**. That is a content-architecture rewrite, not a copy edit.

### Verdict

| Dimension | Status |
|---|---|
| Builds? | ❌ **No** — fails hard (`ENOTDIR`) |
| Lints? | ❌ **No** — fails hard (`ENOTDIR`, exit 2) |
| Typechecks? | ⚠️ **Vacuous pass** — exit 0 because there is nothing to check |
| Tests? | ❌ **None exist** — no runner, no `test` script, no test files |
| Dependencies install? | ✅ **Yes** — lockfile is valid and reproducible |
| Dependency security? | ❌ **1 critical + 7 high** (3 × unauthenticated RCE in Next.js) |
| Secrets leaked? | ✅ **None** — full history reviewed, clean |
| Production ready? | ❌ **No** — effectively a greenfield build |
| Fit for stated goal? | ❌ **No** — positioned for the wrong discipline |

**Bottom line:** treat this as a greenfield project with a good starting config, not as a codebase to repair. The scaffold is genuinely worth keeping — the configuration is competent and the dependency intent is modern. What is missing is the application.

---

## 2. Test results (verbatim, honest)

All commands run on Windows 11, Node v24.15.0, npm 11.12.1, against a clean extraction of `main`.

### 2.1 `npm ci` — ✅ PASS

```
added 367 packages in 1m
EXITCODE=0
```

Lockfile (`lockfileVersion: 3`) is valid, complete, and installs reproducibly. Deprecation warnings were emitted for `inflight`, `glob@7.2.3`, `rimraf@3`, `@humanwhocodes/*`, and notably **`eslint@8.57.1` ("This version is no longer supported")**.

Dependency counts: **424 total** (19 production, 370 dev).

### 2.2 `npm run build` — ❌ FAIL

```
> next build
   ▲ Next.js 15.5.19

> Build error occurred
[Error: ENOTDIR: not a directory, scandir '...\eslam_portfolio-main\app'] {
  errno: -4052,
  code: 'ENOTDIR',
  syscall: 'scandir',
  path: '...\\eslam_portfolio-main\\app'
}
EXITCODE=1
```

Next.js attempts to enumerate the App Router directory, finds a file, and aborts. This is unrecoverable without fixing the path.

### 2.3 `npm run lint` — ❌ FAIL

```
Oops! Something went wrong! :(
ESLint: 8.57.1
Error: Error while loading rule '@next/next/no-html-link-for-pages':
  ENOTDIR: not a directory, scandir '...\app'
Occurred while linting ...\next.config.ts
LINT_EXIT=2
```

Same root cause. Note this is an ESLint **crash** (exit 2), not a lint-rule failure — so `--max-warnings=0` never even gets evaluated. Any CI gate built on `npm run lint` today reports a hard error regardless of code quality.

### 2.4 `npx tsc --noEmit` — ⚠️ PASS, but meaningless

```
TSC_EXIT=0
```

**This pass must not be read as a signal of health.** There are zero `.ts`/`.tsx` source files in the repository. TypeScript compiled the config files and found nothing to object to. Reporting this as "typechecking passes" would be misleading.

### 2.5 `npm run dev` — ⚠️ NOT EXECUTED

The dev-server probe was blocked by this environment's safety policy (the probe needed to terminate Node processes afterward). **I am not claiming a result I did not observe.** That said, `next dev` resolves the App Router through the same `scandir` call that `next build` fails on, so it is expected to fail identically; this should be confirmed locally.

### 2.6 `npm audit` — ❌ FAIL

```
moderate : 4
high     : 7
critical : 1
total    : 12
```

Full breakdown in §4.

### 2.7 `npm outdated`

| Package | Current (locked) | Latest | Gap |
|---|---|---|---|
| `next` | 15.5.19 | 16.4.3 | major + **unpatched criticals** |
| `react` / `react-dom` | 19.2.7 | 19.3.1 | patch |
| `eslint` | 8.57.1 | 10.13.0 | **2 majors, EOL** |
| `eslint-config-next` | 15.5.19 | 16.4.3 | major |
| `tailwindcss` | 3.4.19 | 4.3.3 | major |
| `framer-motion` | 12.40.0 | 14.6.0 | 2 majors |
| `lucide-react` | 0.468.0 | 1.61.0 | major (pinned to a Dec-2024 release) |
| `typescript` | 5.9.3 | 7.0.2 | 2 majors |
| `@types/node` | 22.19.21 | 26.6.5 | 4 majors |
| `postcss` | 8.5.15 | 8.5.31 | patch (**security**) |
| `autoprefixer` | 10.5.0 | 10.6.1 | minor |

---

## 3. What exists vs. what the README promises

The repository contains **12 files**, all configuration:

```
         1  app                  ← 1-byte FILE (0x0A). Should be a DIRECTORY.
        80  .gitignore
       103  postcss.config.mjs
       131  .eslintrc.json
       229  next.config.ts
       262  next-env.d.ts
       325  .env.example
       499  tailwind.config.ts
       599  tsconfig.json
       730  package.json
      2463  README.md
    225141  package-lock.json
```

The README documents a full application. Reconciliation:

| README claims | Reality |
|---|---|
| `app/layout.tsx` — SEO metadata & root layout | ❌ **Missing** |
| `app/page.tsx` — structured data & page entry | ❌ **Missing** |
| `app/robots.ts` — crawler policy | ❌ **Missing** |
| `app/sitemap.ts` — sitemap generation | ❌ **Missing** |
| `app/globals.css` (implied — Tailwind needs it) | ❌ **Missing** (never mentioned either) |
| `components/portfolio-page.tsx` | ❌ **Missing** |
| `lib/portfolio-data.ts` | ❌ **Missing** |
| `public/Eslam_Marwan_CV.pdf` | ❌ **Missing** |
| `public/og-image.png` | ❌ **Missing** |
| `public/case-studies/` | ❌ **Missing** |
| "Framer Motion" animations | ❌ Dependency installed, never imported |
| "SEO metadata, sitemap, robots, structured data, OG image" | ❌ None implemented |
| "Responsive dark interface" | ❌ No markup or CSS |

**The README is currently aspirational documentation for software that does not exist.** For a public portfolio repository this is itself a credibility risk: a technical reviewer who clones it finds a broken build and documentation describing absent features.

### Git history

Only 3 commits, all by Eslam Mohammed Mrwan on 2026-06-27:

| SHA | Message | Content |
|---|---|---|
| `5fdb69cf` | Initial commit | `README.md` only (80 B) |
| `0f3d6ac1` | Add files via upload | All 11 config files |
| `c15cda64` | Create app | The 1-byte `app` file |

I inspected all three trees. **No secrets, credentials, certificates, or private keys were ever committed** at any point in history. The `_certificates_source` entry in `.gitignore` is precautionary only and nothing matching it ever entered the repo. This is a clean history — good.

---

## 4. Security findings

### 🔴 SEC-01 — Three unauthenticated RCE advisories in Next.js 15.5.19 — **CRITICAL**

The locked `next@15.5.19` is affected by **14 advisories**, including three rated critical:

| Advisory | Severity | Vulnerable range | Affected here? |
|---|---|---|---|
| [GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4) — Unauthenticated RCE in Image Optimization API **when AVIF files are used** | **critical** | `>=10.0.0 <15.5.24` | ✅ **Yes — and config opts in** |
| [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw) — Unauthenticated RCE in Image Optimization API when SVG files are used | **critical** | `>=10.0.0 <=15.5.27` | ✅ Yes |
| [GHSA-p293-qw3h-jr36](https://github.com/advisories/GHSA-p293-qw3h-jr36) — Unauthenticated RCE on **Windows-hosted** servers | **critical** | `>=13.4.0 <15.5.24` | ✅ Yes |
| [GHSA-p9j2-gv94-2wf4](https://github.com/advisories/GHSA-p9j2-gv94-2wf4) — SSRF in rewrites via attacker-controlled destination hostname | high | `>=12.0.0 <15.5.21` | ✅ Yes |
| [GHSA-89xv-2m56-2m9x](https://github.com/advisories/GHSA-89xv-2m56-2m9x) — SSRF in Server Actions on custom servers | high | `>=14.1.1 <15.5.21` | ✅ Yes |
| [GHSA-m99w-x7hq-7vfj](https://github.com/advisories/GHSA-m99w-x7hq-7vfj) / [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) — DoS in App Router via Server Actions | high | `<=15.5.27` | ✅ Yes |
| [GHSA-955p-x3mx-jcvp](https://github.com/advisories/GHSA-955p-x3mx-jcvp) — Unauthenticated disclosure of internal Server Function endpoints | moderate | `>=13.0.0 <15.5.21` | ✅ Yes |
| [GHSA-4jqv-mc3x-m676](https://github.com/advisories/GHSA-4jqv-mc3x-m676) / [GHSA-mcj8-r9mp-w47p](https://github.com/advisories/GHSA-mcj8-r9mp-w47p) — Cache poisoning of SSG/ISR pages | moderate | `>=15.0.0 <15.5.27` | ✅ Yes |
| [GHSA-68g3-v927-f742](https://github.com/advisories/GHSA-68g3-v927-f742), [GHSA-4633-3j49-mh5q](https://github.com/advisories/GHSA-4633-3j49-mh5q) — Cache confusion of response bodies | moderate | `>=13.0.0 <15.5.21` | ✅ Yes |
| [GHSA-q8wf-6r8g-63ch](https://github.com/advisories/GHSA-q8wf-6r8g-63ch) — DoS in Image Optimization API using SVGs | moderate | `>=15.5.0 <15.5.21` | ✅ Yes |
| [GHSA-4c39-4ccg-62r3](https://github.com/advisories/GHSA-4c39-4ccg-62r3) — Unbounded Server Action payload in Edge runtime | moderate | `>=13.0.0 <15.5.21` | ✅ Yes |

**The AVIF finding deserves emphasis.** `next.config.ts` contains:

```ts
images: {
  formats: ["image/avif", "image/webp"]
}
```

This is an explicit opt-in to exactly the code path described by the critical AVIF RCE advisory. The configuration and the vulnerability line up precisely. Right now this is inert because there is no app to deploy — but it becomes an internet-facing, unauthenticated RCE on first successful deploy. **Do not deploy this dependency set.**

**Fix:** upgrade to `next@15.5.28` or later (or migrate to 16.x). **Verified** — see §4.6.

### 🟠 SEC-02 — `postcss` path traversal / arbitrary `.map` disclosure — **HIGH**

`postcss@8.5.15` (direct devDependency, also pinned via `overrides`):

- [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) — **high** — Path traversal in previous-source-map auto-loading (`sourceMappingURL`) → arbitrary `.map` file disclosure (`<=8.5.17`)
- [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) — moderate — incomplete fix; attacker-controlled `sourceMappingURL` reads arbitrary `.map` files when `from` is unset (`<=8.5.22`)

Build-time rather than runtime exposure, but it processes CSS that may include third-party content. The `overrides: { "postcss": "^8.5.10" }` range *permits* the patched 8.5.31 — the lockfile simply pins an older resolution. A refresh fixes it. **Fix:** `npm update postcss` → 8.5.31.

### 🟠 SEC-03 — `sharp` native image-pipeline CVEs — **HIGH**

`sharp` (transitive via `next`, used for image optimization):

- [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) — librsvg CVE-2026-96889 (`<0.35.5`)
- [GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c) — libheif GHSA-g89c-p67h-r497, GHSA-2jg2-4ch7-h545 (`<0.35.4`)
- [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) — libvips CVE-2026-33327/33328/35590/35591 (`<0.35.0`)

These are native-code CVEs in the exact image pipeline the project enables. Compounds SEC-01. Resolved by the `next` upgrade pulling a newer `sharp`.

### 🟠 SEC-04 — Build-toolchain DoS cluster — **HIGH / MODERATE**

`brace-expansion` (high, 10 advisories), `browserslist` (high, 2), `js-yaml` (high, 3), `nanoid` (high, 2), `source-map-js` (high), `baseline-browser-mapping` (moderate), `postcss-nested` (moderate), `postcss-selector-parser` (moderate).

All transitive and predominantly build-time DoS (exponential/quadratic expansion, unbounded memory, stack exhaustion). Lower real-world risk for a static portfolio, but they keep `npm audit` red, which blocks any CI security gate you add later. Note `nanoid` *is* reachable at runtime in Next.

### 🟡 SEC-05 — Personal email address committed to a public repository — **MODERATE (privacy)**

`.env.example` line 6:

```
CONTACT_TO_EMAIL=<real personal Gmail address — redacted in this report>
```

> Redacted deliberately: this report is intended to be committed, and quoting
> the address verbatim would reproduce the very exposure the finding describes.
> The live value is in `.env.example` at commit `c15cda64` and in git history.

This is **not a credential leak** — it is a real personal email address hardcoded into a public, indexable repository, inside a file whose entire purpose is to hold *placeholder* values. GitHub is continuously scraped for addresses; this invites spam and phishing and cannot be fully undone once indexed.

**Fix:** replace with `CONTACT_TO_EMAIL=you@example.com`. Serve the real address at runtime from an environment variable, and obfuscate or gate it in the UI. Consider a form-relay provider (Resend, Formspree, Vercel Functions) so the address is never in client-visible markup.

### 🟡 SEC-06 — No security response headers — **MODERATE**

`poweredByHeader: false` is good practice and correctly set, but it is the only hardening present. Missing entirely:

- `Content-Security-Policy` (critical for a site that will render structured data and possibly embedded media)
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `X-Frame-Options` / `frame-ancestors`
- `Permissions-Policy`

**Fix:** add a `headers()` block in `next.config.ts`, or a `middleware.ts`, once the app exists.

### 🟡 SEC-07 — Image optimization enabled with no source allowlist — **LOW (latent)**

`images.formats` is set but no `remotePatterns`, `localPatterns`, `dangerouslyAllowSVG`, or `contentDispositionType` policy is declared. Next's secure default (no remote patterns ⇒ remote optimization disabled) currently protects you, but this is implicit rather than intentional. Given SEC-01 and SEC-03 both live in this subsystem, the policy should be explicit. Also consider whether AVIF is worth enabling at all — it is the slowest format to encode and carries the heaviest CVE history.

### 4.6 Remediation — verified, not assumed

I validated the dependency fix in an **isolated sandbox** (copying only `package.json` + `package-lock.json` to a temp directory; the repository was not touched):

```
npm install next@15.5.28 && npm update
```

**Result:**

| | Before | After |
|---|---|---|
| critical | **1** | **0** ✅ |
| high | **7** | **0** ✅ |
| moderate | 4 | 3 |
| **total** | **12** | **3** |

Resolved `next` to `15.5.28`. All three critical RCEs, and every high, cleared.

**The 3 remaining moderates** are `tailwindcss@3.4.19` → `postcss-nested` → `postcss-selector-parser`. They cannot be cleared on Tailwind 3; they require **Tailwind 4** (a breaking major with a new CSS-first config model). Keep them as accepted risk during the initial build and schedule the Tailwind 4 migration deliberately — do not take it on in the same change as the rebuild.

---

## 5. Configuration & code-quality findings

### 🔴 CFG-01 — `app` is a file, not a directory — **BLOCKER**

The single highest-priority item. `app` is a 1-byte blob (`0x0A`). It must be deleted and recreated as a directory.

Because a file and a directory cannot share a name, **every developer cloning this repo hits the same wall**, and `mkdir app` fails until the blob is removed. Remove it in its own commit:

```bash
git rm app
git commit -m "Remove stray 1-byte 'app' file blocking App Router directory"
```

### 🟠 CFG-02 — ESLint 8.57.1 is end-of-life

npm itself warns: *"This version is no longer supported."* ESLint 8 receives no security patches. It also pulls the vulnerable `@humanwhocodes/*` and `js-yaml` chain (SEC-04).

Combined with CFG-03, migrate to ESLint 9+ flat config.

### 🟠 CFG-03 — Legacy `.eslintrc.json` format

`.eslintrc.json` uses eslintrc, deprecated in favour of flat config (`eslint.config.mjs`). Next 15 still supports it; Next 16 and ESLint 10 push hard toward flat config. Migrate now while the codebase is empty — it is a 10-minute job today and a tedious one after 30 components exist.

The `extends` values (`next/core-web-vitals`, `next/typescript`) are the right choices and carry over.

### 🟡 CFG-04 — `tsconfig.json` is good but under-strict

Correct and sensible as-is (`strict: true`, `moduleResolution: "bundler"`, `isolatedModules`, `noEmit`). Recommended tightening for a greenfield build:

| Setting | Current | Recommend | Why |
|---|---|---|---|
| `target` | `ES2017` | `ES2022` | Next 15 / React 19 ship modern output anyway; ES2017 only costs you downlevelled helpers |
| `noUncheckedIndexedAccess` | unset | `true` | Catches `array[i]` being `undefined` — the single highest-value extra strict flag |
| `noImplicitOverride` | unset | `true` | Cheap safety |
| `forceConsistentCasingInFileNames` | unset | `true` | **Important here** — you develop on Windows (case-insensitive) and Vercel builds on Linux (case-sensitive). This class of bug fails *only* in production |
| `verbatimModuleSyntax` | unset | consider | Clearer type-only imports |

Minor: `paths: { "@/*": ["./*"] }` is declared without `baseUrl`. Valid in TypeScript 5 (resolves relative to the config file) — noted so it is not mistaken for a bug.

### 🟡 CFG-05 — No Node version floor

`package.json` has no `engines` field, no `packageManager` field, and there is no `.nvmrc`. Nothing pins the toolchain, so local, CI, and Vercel can silently diverge. Add:

```json
"engines": { "node": ">=20.9.0" },
"packageManager": "npm@11.12.1"
```

### 🟡 CFG-06 — `next-env.d.ts` references a build artifact

Line 3 references `./.next/types/routes.d.ts`, which does not exist until after a build. Harmless (and the file is auto-generated — do not hand-edit it), but it means a cold `tsc` on a fresh clone relies on Next having run. Worth knowing when wiring CI: run `next build` before, or instead of, a standalone typecheck.

### 🟢 CFG-07 — What is actually well done

Credit where due — this scaffold shows real competence:

- `package-lock.json` committed, `lockfileVersion: 3`, installs cleanly and reproducibly
- `.gitignore` is correct and thorough (`node_modules`, `.next`, `out`, `dist`, `.env`, `.env*.local`, `*.tsbuildinfo`) — and `.env` is properly ignored
- `poweredByHeader: false` — deliberate hardening
- `.env.example` committed and **documented with explanatory comments**, which many projects skip
- `darkMode: "class"` — the correct choice over `media`
- Tailwind `content` globs (`./app`, `./components`, `./lib`) correctly anticipate the intended structure, so they will work unchanged once the directories exist
- A coherent design token set already defined (`ink`, `panel`, `line`, `shadow-glow`)
- `overrides` used to force a patched `postcss` — shows security awareness, even though the lockfile resolution lagged
- Clean git history with no secrets

---

## 6. Missing engineering infrastructure

| ID | Missing | Impact |
|---|---|---|
| INF-01 | **No `LICENSE`** (GitHub API: `license: null`) | A public repo with no license is "all rights reserved" by default. Ambiguous and off-putting for a portfolio meant to be read by recruiters and engineers. Add **MIT** (code) or **CC BY 4.0** (content). |
| INF-02 | **No tests, no runner, no `test` script** | Nothing can be verified. Add Vitest + React Testing Library, and Playwright for one smoke test. |
| INF-03 | **No CI** (no `.github/workflows/`) | Nothing prevents pushing a broken build — exactly how the current state arose. A 20-line workflow running `install → typecheck → lint → build` would have caught CFG-01 immediately. |
| INF-04 | **No Dependabot / Renovate** | How 12 advisories accumulated silently. `.github/dependabot.yml` is ~10 lines. |
| INF-05 | **No `app/globals.css`** | Tailwind's `@tailwind` directives are never imported, so **no styles would load even if components existed**. Easy to overlook. |
| INF-06 | **No error/loading/404 boundaries** | `app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx` absent. |
| INF-07 | **No `metadataBase` fallback** | `NEXT_PUBLIC_SITE_URL` has no default. If unset at build time, Next emits a `metadataBase` warning and OG/canonical URLs resolve relative — breaking exactly the LinkedIn/WhatsApp previews the README promises. Needs a hardcoded production fallback. |
| INF-08 | **No `SECURITY.md` / `CONTRIBUTING.md`** | Low priority for a personal portfolio. |
| INF-09 | **No accessibility or performance budget** | `next/core-web-vitals` gives partial `jsx-a11y` coverage. Add Lighthouse CI and `eslint-plugin-jsx-a11y` explicitly — accessibility is a visible professionalism signal on a portfolio. |
| INF-10 | **No Prettier / formatting config** | Add Prettier + `prettier-plugin-tailwindcss` for deterministic class ordering. |
| INF-11 | **No repo `homepage`, no topics, `has_pages: false`** | Repo metadata is empty. Topics and a live homepage URL materially affect discoverability. |

---

## 7. Strategic mismatch: Python Automation vs. Mechatronics Engineering

This is as important as the technical findings. The goal is a **Mechatronics Engineering portfolio**, but every piece of existing content targets a different market.

### 7.1 Current positioning

- **Repo description:** "Personal portfolio for Python Automation & Data Solutions"
- **README title:** "Eslam Mrwan Python Automation Website"
- **README positioning:** *"a high-converting freelance website … positioned as a Python Automation Developer for founders, agencies, and small businesses"*
- **Explicit intent:** *"The site focuses on client acquisition, not recruiting."*
- **Services listed:** Python Automation · Data Processing · Web Scraping · Excel Automation · Data Cleaning · Reporting Scripts

### 7.2 Why this conflicts

The existing brief is a **freelance lead-generation funnel** optimised for conversion: short About (<120 words), service tiles, a contact form, CTA-driven. A mechatronics engineering portfolio has a different job — it must demonstrate **technical depth and evidence of engineering judgement** to engineers, hiring managers, and graduate admissions committees.

Concretely:

| Dimension | Current (freelance automation) | Needed (mechatronics) |
|---|---|---|
| Audience | Founders, agencies, SMBs | Engineering hiring managers, technical recruiters, academia |
| Goal | Book a paid gig | Prove capability and depth |
| Proof format | Service tiles + outcomes | Project deep-dives: problem → design → build → validation → result |
| Evidence | Testimonials, ROI claims | Schematics, CAD renders, oscilloscope traces, control-loop plots, video of working hardware, BOM |
| About length | Capped at 120 words | Needs room for education, specialisations, tooling |
| Content model | Flat service list | Rich, media-heavy project entities |

Note also that the six listed services are all **software** services. None reflects mechatronics competency: embedded firmware, control systems, robotics, PCB design, CAD/CAM, FEA/simulation, PLC/SCADA, sensors and actuators, mechanical design, signal processing.

### 7.3 Required content architecture

The absent `lib/portfolio-data.ts` is the leverage point — define it correctly from the start. A mechatronics project entity needs roughly:

```ts
type Project = {
  slug: string
  title: string
  summary: string
  domain: ("embedded" | "control" | "robotics" | "mechanical" | "pcb" | "simulation")[]
  problem: string          // what needed solving, and the constraints
  approach: string         // design decisions and the trade-offs behind them
  validation: string       // how it was tested — the section engineers read first
  results: string[]        // quantified outcomes
  hardware: string[]       // MCUs, sensors, actuators, drivers
  software: string[]       // firmware, toolchains, languages
  tools: string[]          // SolidWorks, Altium, MATLAB/Simulink, ROS, KiCad
  media: { type: "image" | "video" | "cad" | "schematic" | "plot"; src: string; caption: string }[]
  repo?: string            // only when a real public repo exists
  status: "complete" | "in-progress" | "repo-coming-soon"
}
```

Two points worth preserving from the original README's customization notes, because they reflect good instincts: *"Add case-study GitHub links only when a real public repository exists"* and *"Keep incomplete projects clearly marked."* **Honesty in a portfolio is a feature** — keep that discipline.

The site should also add sections a freelance funnel omits: **Education**, **Technical Skills** (grouped by mechanical / electrical / firmware / software), **Certifications**, and a downloadable **CV**.

---

## 8. Prioritized implementation plan

Five phases. Each is independently shippable and leaves the repo in a better state than it started.

---

### Phase 0 — Unblock the build *(P0 · ~1–2 hours · Low complexity)*

The minimum to get `main` green. Do this first and in isolation.

| # | Task | Addresses |
|---|---|---|
| 0.1 | `git rm app` — remove the 1-byte blob. **Must be its own commit.** | CFG-01 |
| 0.2 | Create `app/layout.tsx` with root layout + `metadata` (incl. `metadataBase` with a hardcoded production fallback) | INF-07 |
| 0.3 | Create `app/globals.css` with `@tailwind base/components/utilities`, import it in the layout | INF-05 |
| 0.4 | Create a minimal `app/page.tsx` | — |
| 0.5 | Verify `npm run build`, `npm run lint`, `npx tsc --noEmit` all pass | §2 |

**Exit criteria:** all three commands exit 0. ✅

---

### Phase 1 — Security remediation *(P0 · ~2–3 hours · Low complexity, verified)*

Do this **before any deployment**, not after. Phases 0 and 1 are independent and can run in parallel.

| # | Task | Addresses |
|---|---|---|
| 1.1 | `npm install next@15.5.28 && npm update` → clears 1 critical + 7 high. **Verified in §4.6** | SEC-01/02/03/04 |
| 1.2 | Scrub the real email from `.env.example` → `you@example.com` | SEC-05 |
| 1.3 | Add security headers via `headers()` in `next.config.ts` (CSP, HSTS, nosniff, Referrer-Policy, frame-ancestors, Permissions-Policy) | SEC-06 |
| 1.4 | Make the image policy explicit: declare `remotePatterns`/`localPatterns`; reconsider whether AVIF is worth its CVE surface | SEC-07 |
| 1.5 | Add `engines` + `packageManager` to `package.json`, add `.nvmrc` | CFG-05 |
| 1.6 | Accept the 3 remaining Tailwind-3 moderates and record the decision | §4.6 |

**Exit criteria:** `npm audit` shows 0 critical, 0 high. ✅

---

### Phase 2 — Engineering guardrails *(P1 · ~3–4 hours · Low–Medium complexity)*

Put the ratchet in place *before* writing lots of code, so quality is enforced rather than hoped for.

| # | Task | Addresses |
|---|---|---|
| 2.1 | GitHub Actions CI: `install → typecheck → lint → build` on push and PR | INF-03 |
| 2.2 | `dependabot.yml` — weekly npm updates, grouped | INF-04 |
| 2.3 | Migrate ESLint 8 eslintrc → ESLint 9 flat config (`eslint.config.mjs`). **Cheapest now, while the codebase is empty** | CFG-02/03 |
| 2.4 | Tighten `tsconfig.json` — especially `forceConsistentCasingInFileNames` (Windows dev → Linux build) and `noUncheckedIndexedAccess` | CFG-04 |
| 2.5 | Add Prettier + `prettier-plugin-tailwindcss` | INF-10 |
| 2.6 | Add `LICENSE` (MIT for code, or CC BY 4.0 for content) | INF-01 |
| 2.7 | Add Vitest + React Testing Library, one real test, and a `test` script wired into CI | INF-02 |

**Exit criteria:** CI green on a PR; a failing build cannot reach `main`.

---

### Phase 3 — Mechatronics content architecture *(P1 · ~1–2 days · Medium complexity)*

The core rebuild. This is where the portfolio actually becomes a mechatronics portfolio.

| # | Task | Addresses |
|---|---|---|
| 3.1 | Define `lib/portfolio-data.ts` with the typed mechatronics `Project` model from §7.3 | §7 |
| 3.2 | Rewrite the skills taxonomy: embedded · control systems · robotics · PCB · CAD · simulation · PLC — replacing the six software-service tiles | §7.2 |
| 3.3 | Build components: `Hero`, `About`, `Skills`, `ProjectCard`, `ProjectDetail`, `Education`, `Contact` | — |
| 3.4 | Add per-project dynamic routes `app/projects/[slug]/page.tsx` with `generateStaticParams` + per-project metadata | — |
| 3.5 | Add `app/robots.ts` and `app/sitemap.ts` (README promises both) | §3 |
| 3.6 | Add JSON-LD structured data (`Person` + `CreativeWork` per project) | §3 |
| 3.7 | Add `app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx` | INF-06 |
| 3.8 | Add real `public/` assets: CV PDF, `og-image.png`, project media | §3 |
| 3.9 | **Rewrite `README.md` to describe what exists** and re-point it at mechatronics; update the repo description and add topics | §3, INF-11 |

**Exit criteria:** README and reality match. Every documented feature works.

---

### Phase 4 — Polish & launch readiness *(P2 · ~1 day · Medium complexity)*

| # | Task | Addresses |
|---|---|---|
| 4.1 | Accessibility pass — `eslint-plugin-jsx-a11y`, keyboard nav, focus states, contrast, alt text | INF-09 |
| 4.2 | Lighthouse CI with a performance budget; target ≥95 across the board | INF-09 |
| 4.3 | Framer Motion animations (dependency is installed but unused) — respect `prefers-reduced-motion` | §3 |
| 4.4 | Upgrade the contact form from `mailto:` to a server action or relay provider, keeping the address off the client | SEC-05 |
| 4.5 | Playwright smoke test: homepage renders, nav works, CV downloads | INF-02 |
| 4.6 | Deploy to Vercel, set `NEXT_PUBLIC_SITE_URL`, redeploy, verify OG previews on LinkedIn/WhatsApp | §3 |

---

### Phase 5 — Deferred / optional *(P3 · Medium–High complexity)*

| # | Task | Notes |
|---|---|---|
| 5.1 | **Tailwind 3 → 4 migration** | Clears the last 3 moderates. Breaking: new CSS-first config model. **Do not bundle with Phase 3.** |
| 5.2 | **Next 15 → 16 migration** | Only after 15.5.28 is stable in production. |
| 5.3 | ESLint 9 → 10, TypeScript 5 → 7 | Sequence after the above. |
| 5.4 | `framer-motion` 12 → 14, `lucide-react` 0.468 → 1.x | Two majors each; verify animation APIs. |
| 5.5 | Internationalisation (Arabic/English) | Plausibly valuable for this audience; scope separately. |
| 5.6 | MDX-authored case studies | Only if the typed data model becomes limiting. |

---

## 9. Complexity & effort estimate

| Phase | Priority | Effort | Complexity | Risk if skipped |
|---|---|---|---|---|
| 0 — Unblock build | **P0** | 1–2 h | **Low** | Repo is permanently broken |
| 1 — Security | **P0** | 2–3 h | **Low** (verified) | **Unauthenticated RCE on deploy** |
| 2 — Guardrails | P1 | 3–4 h | Low–Medium | Regressions recur silently |
| 3 — Content rebuild | P1 | 1–2 days | **Medium** | Wrong discipline; no portfolio |
| 4 — Polish & launch | P2 | 1 day | Medium | Unprofessional first impression |
| 5 — Deferred majors | P3 | 1–2 days | **Medium–High** | 3 moderate advisories persist |

**Total to a professional, deployed, secure portfolio: roughly 3–5 focused working days**, of which Phases 0+1 (≈half a day) deliver the steepest risk reduction.

### Critical path

```
Phase 0 (unblock) ──┬──> Phase 2 (guardrails) ──> Phase 3 (content) ──> Phase 4 (launch)
Phase 1 (security) ─┘
```

Phases 0 and 1 are independent and parallelisable. **Phase 1 must complete before any deploy.**

---

## 10. Next recommended actions

Immediate, in order:

1. **`git rm app`** in its own commit. One line, unblocks everything, and every clone is broken until it lands.
2. **Upgrade `next` to 15.5.28** (`npm install next@15.5.28 && npm update`). Verified to clear 1 critical + 7 high, including three unauthenticated RCEs. **Non-negotiable before deployment.**
3. **Scrub the personal email** from `.env.example`.
4. **Decide the content direction explicitly** — confirm the pivot from "Python Automation freelance" to "Mechatronics Engineering portfolio", since it determines the data model in Phase 3 and is expensive to reverse later.
5. **Add CI before writing the application.** A 20-line workflow would have caught the `app` blob at push time. Installing the ratchet first is what prevents the next instance of this.

### Two framing points

**Treat this as greenfield, not as a rescue.** There is no legacy code to preserve or refactor — a genuine advantage. Strict TypeScript settings, flat-config ESLint, and the correct data model all cost nearly nothing now and get materially more expensive after 30 components exist.

**The scaffold is worth keeping.** The configuration is competent: committed lockfile, correct `.gitignore`, `poweredByHeader: false`, documented `.env.example`, a thought-through design token set, `overrides` used deliberately for security. The failure here is not one of skill — it is a single mis-created path plus four months of unattended dependency drift, both entirely mechanical to fix.

---

## Appendix A — Environment

| | |
|---|---|
| OS | Windows 11 Pro 10.0.26300 |
| Node | v24.15.0 |
| npm | 11.12.1 |
| Python | 3.13.14 (not used by this project) |
| git / gh CLI | **Not installed** — repo fetched via GitHub Codeload archive + REST API |
| Audit method | Clean extraction of `main`, `npm ci`, then build / lint / typecheck / audit |
| Sandbox | Dependency-upgrade verification run in an isolated temp directory; repository never modified |

## Appendix B — Reproducing these results

```bash
npm ci                 # ✅ exit 0  — 367 packages
npm run build          # ❌ exit 1  — ENOTDIR: not a directory, scandir 'app'
npm run lint           # ❌ exit 2  — ESLint crash, same root cause
npx tsc --noEmit       # ⚠️ exit 0  — vacuous: zero source files
npm audit              # ❌ exit 1  — 12 advisories: 1 critical, 7 high, 4 moderate
npm run dev            # ⚠️ NOT TESTED in this environment (process-control restriction)
```
