# Portfolio "Signal" Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio in the approved "Signal" language — near-black, one phosphor accent, terminal typography, restrained cyberpunk motion — and make analytics, deploy, and assets correct.

**Architecture:** Keep the existing Astro single-page structure and content data. Replace the rainbow mesh/Geist-default identity with a token-driven CSS design system in `global.css`, then restyle the layout and each section against those tokens. Motion is CSS plus one small inline decode script; `animejs` and Partytown are removed. Cloudflare Web Analytics is the only tracker; Cloudflare Pages' Git integration is the only deploy path.

**Tech Stack:** Astro 5, Tailwind 4 via Vite, native CSS variables, `node:test` build-output checks, Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-05-portfolio-signal-redesign-design.md`

## Global Constraints

- Palette (dark / light): canvas `#070908` / `#f4f3ec`; elevated `#0c100c` / `#fffef8`; hairline `#1c241c` / `#dcded2`; ink `#eef2e9` / `#151713`; body `#a4aea1` / `#4e544a`; mute `#727c71` / `#7a8076`; faint `#4b534a` / `#a7aa9f`; accent `#b8ff3d` / `#3d6b00`.
- One accent only. No rainbow gradients, no magenta/cyan pairing, no RGB split on readable text.
- Motion uses only `opacity` and `transform`; support `prefers-reduced-motion: reduce`; content is visible with JavaScript disabled.
- No new runtime dependencies. Remove `animejs`, `@types/animejs`, and `@astrojs/partytown`.
- Exactly one analytics script: `https://static.cloudflareinsights.com/beacon.min.js`, token `f1b03c7ad51b497aad9e6f45fc464a8f`, production builds only.
- Cloudflare Pages Git integration is the only deploy path. No GitHub Actions deploy workflow.
- Keep the single-page information architecture and `src/data.ts` as the content source.
- Copy changes are limited to section labels, the hero status line, and the benchmark strip. Do not rewrite project or experience copy.
- All text must pass WCAG AA in both themes.

## Review Focus

- **JavaScript disabled/fails:** every section, the final name, and all links must remain visible; only decorative motion may disappear.
- **`prefers-reduced-motion: reduce`:** no decode, sweep, stagger, ticker, or reveal transitions; the page reads as a static design.
- **Light OS with no stored theme:** light tokens must load, the accent must remain readable as text, and primary buttons must use ink fill with paper text.
- **320–390 px viewport:** the telemetry strip, project rows, and status bar must not cause horizontal scrolling; the mobile drawer must keep its focus trap.
- **Cloudflare automatic injection plus the manual beacon:** exactly one beacon must exist. Verify the built HTML and the dashboard mode.

---

### Task 1: Remove overlapping analytics and add build checks

**Files:**
- Create: `tests/build-output.test.mjs`
- Modify: `package.json` (scripts, dependencies)
- Modify: `src/layouts/Layout.astro` (remove `GoogleAnalytics`, GTM noscript, Google prefetch)
- Modify: `astro.config.mjs` (remove Partytown)
- Delete: `src/components/GoogleAnalytics.astro`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `pnpm test` runs `pnpm build` then `node --test tests/*.test.mjs`; `tests/build-output.test.mjs` is the shared verification file for later tasks.

- [ ] **Step 1: Add the test script and write the failing analytics test**

Add to `package.json` scripts:

```json
"test": "pnpm build && node --test tests/*.test.mjs"
```

Create `tests/build-output.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const pkg = JSON.parse(await readFile("package.json", "utf8"));

test("analytics: exactly one Cloudflare beacon and no Google tags", () => {
  const beacons =
    html.match(/static\.cloudflareinsights\.com\/beacon\.min\.js/g) ?? [];
  assert.equal(beacons.length, 1);
  assert.doesNotMatch(html, /googletagmanager|gtag\(|GTM-/);
});

test("analytics: Partytown is not a dependency", () => {
  assert.equal("@astrojs/partytown" in (pkg.dependencies ?? {}), false);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on the Google tag assertion because `gtag(` and `googletagmanager` are still in the built HTML.

- [ ] **Step 3: Remove the extra trackers**

In `src/layouts/Layout.astro`:
- Remove `import GoogleAnalytics from "../components/GoogleAnalytics.astro";`.
- Remove `<GoogleAnalytics />`.
- Remove the `<noscript>` block containing `googletagmanager.com/ns.html?id=GTM-WW9MXB4S`.
- Remove `<link rel="dns-prefetch" href="https://www.googletagmanager.com" />`.

In `astro.config.mjs`:
- Remove the `partytown` import and integration.
- Leave `sitemap()` in place.

Run:

```bash
pnpm remove @astrojs/partytown
rm src/components/GoogleAnalytics.astro
rm .github/workflows/pages-deployment.yaml
```

Cloudflare's Git integration owns deploys from here on.

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test`
Expected: both tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove overlapping analytics and add build checks"
```

---

### Task 2: Switch to the WebP portrait and refresh social assets

**Files:**
- Modify: `src/pages/index.astro` (About image source)
- Modify: `src/layouts/Layout.astro` (remove portrait preload)
- Replace: `public/og-card.png`
- Replace: `public/favicon.svg`
- Delete: `public/profile.png`, `public/profile.webp.bak`, `src/images/profile_old.jpg`
- Test: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: the shared test file and `pnpm test` from Task 1.
- Produces: `/profile.webp` (56 KB) as the only portrait; `public/og-card.png` as a 1200 × 630 PNG; `public/favicon.svg` using `#070908` and `#b8ff3d`.

- [ ] **Step 1: Append the failing asset tests**

Append to `tests/build-output.test.mjs` (add `readFile` is already imported):

```js
test("assets: portrait is the WebP, never the PNG", () => {
  assert.match(html, /\/profile\.webp/);
  assert.doesNotMatch(html, /\/profile\.png/);
});

test("assets: og-card is a 1200x630 PNG", async () => {
  const og = await readFile("public/og-card.png");
  assert.equal(og.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(og.readUInt32BE(16), 1200);
  assert.equal(og.readUInt32BE(20), 630);
});

test("assets: favicon uses the Signal palette", async () => {
  const favicon = await readFile("public/favicon.svg", "utf8");
  assert.match(favicon, /#070908/i);
  assert.match(favicon, /#b8ff3d/i);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on `og-card` dimensions and the favicon palette; the portrait assertion also fails until Step 3.

- [ ] **Step 3: Switch the portrait and remove the oversized assets**

In `src/pages/index.astro`, change the About image to:

```astro
<img src="/profile.webp" alt="Sarvesh Rane" width="1159" height="1160" loading="lazy" decoding="async" class="profile-img" />
```

In `src/layouts/Layout.astro`, remove the line:

```html
<link rel="preload" as="image" href="/profile.png" fetchpriority="high" />
```

Run:

```bash
rm public/profile.png public/profile.webp.bak src/images/profile_old.jpg
```

- [ ] **Step 4: Generate the OG card and favicon**

Create a temporary SVG at `public/og-card.svg` with these exact properties:

- `viewBox="0 0 1200 630"`, background `#070908`.
- A faint dot grid: circles of `#b8ff3d` at 8% opacity, 24 px pitch, masked to fade toward the bottom.
- Top-left wordmark `sarvesh.dev` in mono, 22 px, `#eef2e9`; `.dev` in `#727c71`.
- Top-right mono label `BACKEND ENGINEER` in `#b8ff3d`, 18 px.
- `SARVESH RANE` in a bold sans at 86 px, `#eef2e9`, starting at x=80, baseline y=330.
- A `#b8ff3d` 2 px horizontal rule from x=80 to x=1120 at y=380.
- Three mono benchmark labels at y=440: `1,185 RPS · L4 LB`, `~15 µs · KAFKA OUTBOX`, `10k+ / DAY · JIO`, in `#a4aea1`, 20 px.
- Bottom-right mono label `SYSTEMS · GO · NODE` in `#727c71`, 16 px.

Convert and remove the source:

```bash
rsvg-convert -w 1200 -h 630 public/og-card.svg -o public/og-card.png
rm public/og-card.svg
```

If `rsvg-convert` is unavailable, use `magick public/og-card.svg public/og-card.png`.

Write `public/favicon.svg` as a 32 × 32 mark: near-black rounded square (`#070908`, radius 7), two phosphor `#b8ff3d` bracket strokes at x=9 and x=23, and a 3 px phosphor dot at center. No text.

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm test`
Expected: all asset tests PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "perf: use webp portrait and refresh social assets"
```

---

### Task 3: Build the Signal design system

**Files:**
- Modify: `src/styles/global.css`
- Test: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: the test harness from Task 1.
- Produces: CSS tokens `--canvas`, `--canvas-elevated`, `--hairline`, `--text-ink`, `--text-body`, `--text-mute`, `--text-faint`, `--accent`, `--accent-soft`, `--accent-glow`, `--btn-primary-bg`, `--btn-primary-fg`, `--status-green`; primitives `.eyebrow`, `.feature-card`, `.btn-primary`, `.btn-secondary`, `.btn-nav`, `.stack-tag`, `.hairline`, `.reveal`, `.line-reveal`, `.signal-grid`, `.signal-sweep`, `.ticker`, `.telemetry`, `.status-bar`.

- [ ] **Step 1: Append the failing token tests**

Append to `tests/build-output.test.mjs`:

```js
import { readFile as readCss } from "node:fs/promises";

test("tokens: Signal palette is defined", async () => {
  const css = await readCss("src/styles/global.css", "utf8");
  assert.match(css, /--canvas:\s*#070908/i);
  assert.match(css, /--accent:\s*#b8ff3d/i);
  assert.match(css, /--accent:\s*#3d6b00/i);
});

test("tokens: the old rainbow identity is gone", async () => {
  const css = await readCss("src/styles/global.css", "utf8");
  assert.doesNotMatch(css, /#7928ca|#ff0080|--gradient-preview-start/);
});

test("motion: reduced motion and no-js are handled", async () => {
  const css = await readCss("src/styles/global.css", "utf8");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.js \.reveal/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on the dark canvas token and the old rainbow assertion.

- [ ] **Step 3: Rewrite the tokens and base styles**

Keep `@import "tailwindcss";` and the existing spacing/radius/easing scale. Replace the colour, text, border, button, and gradient token blocks with the Global Constraints palette. Set `--status-green` to the accent in each theme.

Light tokens live in `:root`. Dark tokens live in both `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` and `[data-theme="dark"] { … }`.

Base:
- `body` uses `--canvas`, `--text-ink`, `--font-sans`.
- `html` keeps smooth scrolling and `color-scheme: light dark`.
- Selection uses accent-soft background and ink text.
- Focus-visible uses a 2 px accent outline with 2 px offset.
- `@theme` keeps the existing Geist font stacks and typography scale. Add `--animate-blink`, `--animate-pulse-slow`, `--animate-sweep`, and `--animate-ticker`.

Primitives:
- `.eyebrow`: Geist Mono, 12 px, 500, uppercase, `0.1em` tracking, `--text-mute`.
- `.feature-card`: elevated background, 1 px hairline, 12 px radius, 24 px padding.
- `.btn-primary`, `.btn-secondary`, `.btn-nav`: keep existing sizes/radii, switch colours to the tokens. Dark primary is accent fill with `#070908` text; light primary is ink fill with paper text.
- `.stack-tag`: mono 10 px, uppercase, `0.08em` tracking, 3 px 8 px padding, 3 px radius, hairline border.
- `.hairline`: 1 px `--hairline`.
- `.signal-grid`: absolute inset, dot grid `radial-gradient(var(--accent) 1px, transparent 1px)` at 22 px, opacity 0.22, masked to fade below 75%.
- `.signal-sweep`: absolute band, `linear-gradient(to bottom, transparent, var(--accent-soft), transparent)`, `animation: signal-sweep 7s linear 1`.
- `.ticker`: flex, `width: max-content`, `animation: signal-ticker 34s linear infinite`.
- `.telemetry`: mono 10 px, uppercase, `0.1em` tracking, flex, border-top 1 px, padding-top 12 px.
- `.status-bar`: fixed bottom, 28 px high, elevated background, top hairline, mono 10 px, hidden below 768 px.

Reveal system:
- `.js .reveal { opacity: 0; transform: translateY(12px); }`
- `.js .reveal.revealed { opacity: 1; transform: none; }`
- `.js .line-reveal { transform: scaleX(0); transform-origin: left; }`
- `.js .line-reveal.revealed { transform: scaleX(1); }`
- Transition timing 420 ms `var(--ease-out)`.
- Keep the existing `.stagger-1` through `.stagger-8` delays.

Reduced motion:
- `@media (prefers-reduced-motion: reduce)` disables smooth scrolling, ticker/sweep animations, and transitions.
- Force `.reveal` and `.line-reveal` visible.

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test`
Expected: the three token tests PASS; the build still succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css tests
git commit -m "feat: add Signal design tokens"
```

---

### Task 4: Rebuild the layout shell and status bar

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/config.ts`
- Test: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: tokens and primitives from Task 3.
- Produces: `CLOUDFLARE_ANALYTICS_TOKEN` in `src/config.ts`; `<html class="no-js">` with an inline `classList.replace("no-js", "js")`; IDs `#main-nav`, `#status-bar`, `#status-section`, `#status-scroll`, `#status-time`; exactly one Cloudflare beacon in production HTML.

- [ ] **Step 1: Append the failing layout tests**

Append to `tests/build-output.test.mjs`:

```js
test("layout: no-js fallback is present", () => {
  assert.match(html, /<html[^>]+class="no-js"/);
  assert.match(html, /classList\.replace\(\s*["']no-js["']\s*,\s*["']js["']\s*\)/);
});

test("layout: theme-color matches Signal", () => {
  assert.match(html, /name="theme-color" content="#070908"/);
  assert.match(html, /name="theme-color" content="#f4f3ec"/);
});

test("layout: Cloudflare beacon is production-only and single", () => {
  const beacons =
    html.match(/static\.cloudflareinsights\.com\/beacon\.min\.js/g) ?? [];
  assert.equal(beacons.length, 1);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on the `no-js` class and the new theme-color values.

- [ ] **Step 3: Add the analytics token and rebuild the head**

In `src/config.ts`, add:

```ts
export const CLOUDFLARE_ANALYTICS_TOKEN = "f1b03c7ad51b497aad9e6f45fc464a8f";
```

In `src/layouts/Layout.astro`:
- Change the opening tag to `<html lang="en" class="no-js">`.
- Immediately after `<head>`, add an inline script that replaces `no-js` with `js`, then runs the existing theme bootstrap.
- Update the two `theme-color` metas to `#f4f3ec` (light) and `#070908` (dark).
- Remove `https://www.googletagmanager.com` prefetch (already removed) and keep one preconnect to `https://static.cloudflareinsights.com`.
- Keep the existing SEO, JSON-LD, OG, and Twitter tags; replace `profile.png` references already removed in Task 2.
- Replace the Cloudflare beacon at the end of `<body>` with:

```astro
{import.meta.env.PROD && (
  <script
    is:inline
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon={`{"token":"${CLOUDFLARE_ANALYTICS_TOKEN}"}`}
  />
)}
```

- [ ] **Step 4: Rebuild the status bar markup**

Replace the inline-styled status bar with a `.status-bar` element using the same IDs. Labels:

```html
<div class="flex items-center gap-4">
  <span class="flex items-center gap-1.5"><span class="status-dot"></span><span>online</span></span>
  <span class="status-sep">│</span>
  <span id="status-section">hero</span>
</div>
<div class="flex items-center gap-4">
  <span id="status-scroll">ln 0</span>
  <span class="status-sep">│</span>
  <span id="status-time"></span>
</div>
```

Update the section list in the status script to include `{ id: "hero-section", label: "hero" }`, `{ id: "work-section", label: "work" }`, `{ id: "experience-section", label: "experience" }`, `{ id: "skills-section", label: "stack" }`, `{ id: "about-section", label: "about" }`.

In the reveal script, add a failsafe: if `IntersectionObserver` is unavailable, add `revealed` to every `.reveal` and `.line-reveal` so content is never stranded hidden.

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm test`
Expected: all layout tests PASS and the build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/Layout.astro src/config.ts tests
git commit -m "feat: rebuild layout shell and status bar"
```

---

### Task 5: Restyle the navigation

**Files:**
- Modify: `src/components/Navbar.astro`
- Modify: `src/components/Navlink.astro`
- Modify: `src/styles/global.css` (nav/drawer primitives if needed)
- Test: manual + `pnpm test`

**Interfaces:**
- Consumes: `.eyebrow`, `.btn-nav`, `.btn-nav-primary`, tokens from Task 3.
- Produces: `.nav`, `.nav-inner`, `.wordmark`, `.wordmark-tld`, `.nav-link`, `.drawer`, `.drawer-link` classes; preserves `#main-nav`, `#menu-toggle`, `#theme-toggle`, `#theme-toggle-mobile`, `#mobile-drawer`, `#mobile-drawer-overlay`, `#drawer-close`, and the drawer focus trap.

- [ ] **Step 1: Replace inline nav styling with Signal classes**

Rewrite `Navbar.astro` markup so it uses:
- `.nav` on `<nav id="main-nav">`, with the existing `opacity: 0; transform: translateY(-12px);` retained for the current anime.js entry (removed in Task 6).
- `.wordmark` for `sarvesh` and `.wordmark-tld` for `.dev`, in mono, 14 px, 600.
- `.nav-link` on desktop links, defined once in `global.css`: mono 11 px, uppercase, `0.08em` tracking, mute text, accent on hover, no pill background.
- The GitHub button uses `.btn-nav .btn-nav-primary`.
- The theme toggle and mobile buttons use `.btn-nav` with a 32 px square.
- The drawer keeps the same IDs and JS but uses `.drawer`, `.drawer-link`, `.drawer-header` classes instead of inline style strings for colour and spacing. Keep the JS mutations for `transform` and `opacity` so behaviour does not change.

Remove `style="color: var(--text-body)…"` from `Navlink.astro`; keep only `class="nav-link"`.

- [ ] **Step 2: Add nav CSS**

In `global.css`, add:
- `.nav { position: fixed; inset: 0 0 auto; z-index: 50; }`
- `.nav-inner { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }`
- `.nav-link { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-mute); text-decoration: none; padding: 8px 10px; }`
- `.nav-link:hover, .nav-link:focus-visible { color: var(--accent); }`
- `.drawer { background: var(--canvas-elevated); border-left: 1px solid var(--hairline); }`
- `.drawer-link:hover { background: var(--accent-soft); color: var(--accent); }`

- [ ] **Step 3: Verify**

Run: `pnpm test` (build must pass). Then `pnpm dev` and check at 1440 px and 390 px:
- Desktop links are mono and muted, accent on hover.
- Theme toggle still switches and persists.
- Mobile drawer opens, closes on Escape/overlay, traps focus, and links close it.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro src/components/Navlink.astro src/styles/global.css
git commit -m "feat: restyle navigation"
```

---

### Task 6: Build the Signal hero and motion system

**Files:**
- Modify: `src/pages/index.astro` (hero + ticker + decode script)
- Modify: `src/layouts/Layout.astro` (remove anime.js entry, add CSS entry)
- Modify: `src/components/Navbar.astro` (remove inline entry opacity)
- Modify: `src/data.ts` (`benchmarks`, remove `dataCurrently`)
- Modify: `package.json` (remove anime.js)
- Test: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: tokens/primitives from Task 3; nav from Task 5.
- Produces: `benchmarks` array in `src/data.ts` with `{ value, unit, label }`; hero classes `.hero`, `.hero-inner`, `.hero-content`, `.hero-title`, `.hero-cursor`, `.hero-tagline`, `.hero-status`, `.hero-actions`, `.hero-telemetry`; `[data-decode="SARVESH RANE"]`; no `#typing-text`; no `animejs` dependency.

- [ ] **Step 1: Append the failing hero tests**

Append to `tests/build-output.test.mjs`:

```js
test("hero: decode target and benchmarks are present", () => {
  assert.match(html, /data-decode="SARVESH RANE"/);
  assert.ok(html.includes("1,185"));
  assert.ok(html.includes("~15"));
  assert.ok(html.includes("10k+"));
  assert.match(html, /hero-telemetry/);
});

test("hero: the old typing loop is gone", () => {
  assert.doesNotMatch(html, /typing-text/);
});

test("motion: anime.js is gone and client JS stays small", async () => {
  assert.equal("animejs" in (pkg.dependencies ?? {}), false);
  const files = await readdir("dist/_astro");
  let bytes = 0;
  for (const file of files.filter((f) => f.endsWith(".js"))) {
    bytes += (await stat(`dist/_astro/${file}`)).size;
  }
  assert.ok(bytes < 20_000, `client JS is ${bytes} bytes`);
});
```

Add `import { readdir, stat } from "node:fs/promises";` to the test file.

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on the missing decode target, benchmarks, and the anime.js dependency.

- [ ] **Step 3: Add benchmark data**

In `src/data.ts`, remove the `dataCurrently` export and add:

```ts
export const benchmarks = [
  { value: "1,185", unit: "RPS", label: "L4 load balancer" },
  { value: "~15", unit: "µs", label: "Kafka outbox" },
  { value: "10k+", unit: "/ day", label: "Jio transactions" },
];
```

- [ ] **Step 4: Rewrite the hero and ticker**

Replace the current hero section in `src/pages/index.astro` with this structure (keep the copy). Remove `dataCurrently` from the `../data` import and delete the old `<script define:vars={{ roles: dataCurrently.map((r) => r.title) }}>` typing block entirely.

```astro
<section id="hero-section" class="hero">
  <div class="signal-grid" aria-hidden="true"></div>
  <div class="signal-sweep" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="hero-content">
      <p class="eyebrow hero-animate">// backend engineer — navi mumbai</p>
      <h1 class="hero-title hero-animate">
        <span data-decode="SARVESH RANE">SARVESH RANE</span><span class="hero-cursor" aria-hidden="true">_</span>
      </h1>
      <p class="hero-tagline hero-animate">Building backend systems that handle real traffic — and shipping them to production.</p>
      <p class="hero-status hero-animate">
        <span class="status-dot"></span> open to work <span class="status-sep">·</span> navi mumbai, IST
      </p>
      <div class="hero-actions hero-animate">
        <a href="mailto:sarveshrane2000@gmail.com" class="btn-primary">Get in touch ↗</a>
        <a href="#work-section" class="btn-secondary">View work</a>
      </div>
    </div>
    <div class="hero-telemetry telemetry" aria-label="Selected benchmarks">
      {benchmarks.map((b) => (
        <span><b>{b.value}</b> {b.unit} <span class="telemetry-label">{b.label}</span></span>
      ))}
    </div>
  </div>
</section>
```

Replace the marquee with a `.ticker` wrapper containing the same skill terms separated by `▸`; keep `aria-hidden="true"`. Duplicate the content group for the loop.

- [ ] **Step 5: Add hero/ticker CSS**

In `global.css`, add:
- `.hero { position: relative; min-height: 100svh; display: flex; align-items: center; overflow: hidden; padding: 0 var(--space-lg); }`
- `.hero-inner { position: relative; z-index: 2; width: 100%; max-width: 1200px; margin: 0 auto; padding: 96px 0 64px; display: flex; flex-direction: column; justify-content: center; }`
- `.hero-title { font-size: clamp(2.1rem, 8vw, 4.6rem); line-height: 0.95; letter-spacing: -0.055em; font-weight: 700; text-transform: uppercase; color: var(--text-ink); white-space: nowrap; }`
- `.hero-cursor { color: var(--accent); animation: blink 1s step-end infinite; }`
- `.hero-tagline { max-width: 480px; margin-top: 24px; font-size: 1rem; line-height: 1.7; color: var(--text-body); }`
- `.hero-status { margin-top: 20px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-mute); display: flex; align-items: center; gap: 8px; }`
- `.hero-actions { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 10px; }`
- `.hero-telemetry { margin-top: 56px; gap: 28px; flex-wrap: wrap; }`
- `.status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--status-green); animation: pulse-slow 3s ease-in-out infinite; }`
- `.status-sep { color: var(--hairline); }`
- `.ticker-wrapper { overflow: hidden; border-bottom: 1px solid var(--hairline); padding: 12px 0; }`
- `.ticker { display: flex; gap: 40px; white-space: nowrap; width: max-content; animation: signal-ticker 34s linear infinite; }`

Add `.js #main-nav` entry: `animation: nav-enter 500ms var(--ease-out) both;` and remove the inline `opacity: 0; transform: translateY(-12px);` from `Navbar.astro`. Add `.js .hero-animate` stagger animation in CSS (e.g. `animation: hero-enter 600ms var(--ease-out) both;` with `nth-child` delays). No JS entry timeline.

- [ ] **Step 6: Add the decode script and remove anime.js**

In `src/pages/index.astro`, add:

```astro
<script>
  const target = document.querySelector<HTMLElement>("[data-decode]");
  const final = target?.dataset.decode ?? "";
  if (target && final && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%&";
    let frame = 0;
    const total = 26;
    const timer = window.setInterval(() => {
      const progress = frame / total;
      target.textContent = Array.from(final, (ch, i) =>
        ch === " " || i < progress * final.length
          ? ch
          : chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      frame += 1;
      if (frame > total) {
        window.clearInterval(timer);
        target.textContent = final;
      }
    }, 38);
  }
</script>
```

In `src/layouts/Layout.astro`, remove the `<script>` block that imports `createTimeline, stagger` from `animejs` and calls `animatePageEntry()`. Delete its `setTimeout` that reveals the status bar; make the status bar visible via CSS (`.status-bar { opacity: 1; transform: none; }`).

Run:

```bash
pnpm remove animejs @types/animejs
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `pnpm test`
Expected: hero and motion tests PASS; client JS is under 20 KB raw.

- [ ] **Step 8: Verify motion manually**

Run `pnpm dev` and check:
- Name decodes once in ~1 s and settles.
- Scanline sweeps once; no repeat.
- Reduced motion (DevTools emulation) shows the static name and no sweep.
- No layout shift/width jitter that moves the tagline.

- [ ] **Step 9: Commit**

```bash
git add src/pages/index.astro src/layouts/Layout.astro src/components/Navbar.astro src/data.ts src/styles/global.css package.json pnpm-lock.yaml tests
git commit -m "feat: add Signal hero and motion"
```

---

### Task 7: Restyle work, experience, and skills

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Test: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: `.eyebrow`, `.feature-card`, `.stack-tag`, `.hairline`, `.line-reveal`, `.reveal`, `.telemetry` from Task 3.
- Produces: section labels `// 01 — selected work`, `// 02 — experience`, `// 03 — stack`; `.project-row`, `.project-index`, `.project-image`, `.exp-row`, `.skill-card` classes.

- [ ] **Step 1: Append the failing section tests**

Append to `tests/build-output.test.mjs`:

```js
test("sections: numbered Signal labels are present", () => {
  assert.ok(html.includes("// 01 — selected work"));
  assert.ok(html.includes("// 02 — experience"));
  assert.ok(html.includes("// 03 — stack"));
});

test("sections: project and skill hooks are present", () => {
  assert.match(html, /project-row/);
  assert.match(html, /project-index/);
  assert.match(html, /skill-card/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on the numbered labels and hooks.

- [ ] **Step 3: Restyle the work section**

In `src/pages/index.astro`:
- Replace the section eyebrow with `<span class="eyebrow">// 01 — selected work</span>`.
- Keep the heading and description.
- Change each row wrapper to `class="project-row reveal"` and the index span to `class="project-index eyebrow"`.
- Remove inline font/size/colour values that duplicate tokens; keep layout utilities.
- Keep the stack tags but use `class="stack-tag"`.
- Keep the image container and image; add `class="project-image"` to the `<img>`.

In `global.css`, add:
- `.project-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 420px); gap: 32px; padding: 32px 0; }` with a single-column override below 768 px.
- `.project-index { color: var(--text-faint); transition: color 150ms var(--ease-out); }`
- `.project-row:hover .project-index { color: var(--accent); }`
- `.project-image { transition: transform 500ms var(--ease-out); }`
- `.project-row:hover .project-image { transform: scale(1.01); }`

- [ ] **Step 4: Restyle experience and skills**

Experience:
- Eyebrow: `// 02 — experience`.
- Row: `class="exp-row reveal"`, period `class="eyebrow exp-period"` with accent colour.
- Keep highlights and stack tags; apply `.stack-tag`.

Skills:
- Eyebrow: `// 03 — stack`.
- Card: `class="feature-card skill-card reveal"`.
- Group label: `.eyebrow`.
- Chips: `.stack-tag`.

Add `.exp-period { color: var(--accent); }` and `.skill-card:hover { border-color: var(--hover-border); }` to `global.css`.

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm test`
Expected: section tests PASS.

- [ ] **Step 6: Verify visually**

Run `pnpm dev`; check 1440 px and 390 px:
- Project rows stack on mobile with no horizontal scroll.
- Hover turns the index accent and scales the image 1.01×.
- Stack tags are mono and legible in both themes.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/styles/global.css tests
git commit -m "feat: restyle work, experience, and skills"
```

---

### Task 8: Restyle about and footer

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`
- Test: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: tokens, `.feature-card`, `.btn-primary`, `.btn-secondary`, `.eyebrow`.
- Produces: `// 04 — about` label; `.about-grid`, `.about-photo`, `.about-stats`, `.cta-band`, `.footer-link` classes.

- [ ] **Step 1: Append the failing footer tests**

Append to `tests/build-output.test.mjs`:

```js
test("about and footer: Signal hooks are present", () => {
  assert.ok(html.includes("// 04 — about"));
  assert.match(html, /class="cta-band/);
  assert.match(html, /class="footer-link/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`
Expected: FAIL on the about label and `cta-band`.

- [ ] **Step 3: Restyle About**

In `src/pages/index.astro`:
- Eyebrow: `// 04 — about`.
- Photo container: `class="about-photo"`; image stays `/profile.webp` with the existing width/height.
- Stat cards: `class="feature-card"`, labels `.eyebrow`, values mono.
- Bio, education card, and social links keep their content; apply `.btn-nav` to social links.
- Add a faint dot-grid behind the photo frame using `.signal-grid` inside a positioned wrapper, `aria-hidden="true"`.

Add to `global.css`:
- `.about-photo { border: 1px solid var(--hairline); border-radius: var(--rounded-md); overflow: hidden; aspect-ratio: 3 / 4; background: var(--hairline-soft); }`
- `.about-photo img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05); }`

- [ ] **Step 4: Restyle the footer**

In `Footer.astro`:
- CTA wrapper: `class="cta-band reveal"`; keep the copy.
- CTA title and body keep their text; apply token colours.
- Primary/secondary buttons keep their classes.
- Footer columns use `.eyebrow` labels and `.footer-link` links.
- Bottom row keeps the copyright and the deploy line; change the deploy line to `Built on Cloudflare Pages · edge-deployed`.

Add to `global.css`:
- `.cta-band { border: 1px solid var(--hairline); border-radius: var(--rounded-lg); padding: 64px 32px; text-align: center; position: relative; overflow: hidden; background: var(--canvas-elevated); }`
- `.cta-band::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: .5; }`
- `.footer-link { font-size: 0.875rem; color: var(--text-body); text-decoration: none; }`
- `.footer-link:hover { color: var(--accent); }`

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm test`
Expected: about/footer test PASSES.

- [ ] **Step 6: Verify visually**

Check 1440 px and 390 px in both themes:
- Portrait is sharp, grayscale, and not stretched.
- CTA accent rule is visible but subtle.
- Footer columns stack cleanly.
- Social links remain keyboard-focusable.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/components/Footer.astro src/styles/global.css tests
git commit -m "feat: restyle about and footer"
```

---

### Task 9: Document the deploy and finish verification

**Files:**
- Modify: `CLAUDE.md`
- Modify: `README.md` (optional, commands only)
- Verify: whole repository

**Interfaces:**
- Consumes: everything from Tasks 1–8.
- Produces: accurate project documentation; a clean final test run.

- [ ] **Step 1: Update `CLAUDE.md`**

Replace the integrations section with:
- Analytics: Cloudflare Web Analytics only; manual beacon token in `src/config.ts`; dashboard must be set to "Enable with JS Snippet installation" to avoid edge injection.
- Deploy: Cloudflare Pages Git integration is authoritative; build command `pnpm build`, output `dist`, `NODE_VERSION=22`, `PNPM_VERSION=11`; there is no GitHub Actions deploy workflow.
- Tests: `pnpm test` builds and runs `node --test tests/*.test.mjs`.
- Styling: Signal tokens and primitives live in `src/styles/global.css`; one accent only.

Optionally add the same commands to `README.md`.

- [ ] **Step 2: Run the full automated check**

Run:

```bash
pnpm test
```

Expected: build succeeds and every test passes.

- [ ] **Step 3: Verify the built output manually**

Run:

```bash
grep -c "static.cloudflareinsights.com/beacon.min.js" dist/index.html
grep -c "googletagmanager\|gtag(\|GTM-" dist/index.html
grep -c "profile.png" dist/index.html
grep -c "profile.webp" dist/index.html
```

Expected: `1`, `0`, `0`, and at least `1`.

- [ ] **Step 4: Preview and visual QA**

Run `pnpm preview`, then check:

- 1440 × 900 dark: name decodes, scanline sweeps once, telemetry aligns, project images hover.
- 390 × 844 dark: no horizontal scroll; telemetry wraps or hides cleanly; drawer opens/closes/traps focus.
- Light OS: paper canvas, readable accent, ink-fill primary buttons.
- Reduced motion: static name, no sweep, no reveal transitions, content visible.
- JavaScript disabled: all content visible, name shows `SARVESH RANE`, links work.
- Keyboard: skip link, focus rings, theme toggle, drawer.
- Console: no errors; exactly one Cloudflare beacon request; no Google requests.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs: document Signal setup and verification"
```
