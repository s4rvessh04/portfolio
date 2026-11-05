# Portfolio — "Signal" redesign

**Date:** 2026-11-05
**Status:** Approved
**Owner:** Sarvesh Rane
**Working title:** Signal — a quiet cyberpunk portfolio

## Intent

The portfolio should read instantly as the work of a backend engineer with taste: minimal, precise, and quietly cyberpunk. The current site is already clean and Geist-flavoured, but its personality lives in a rainbow mesh gradient and a handful of stock reveals. This redesign replaces that decoration with a single, coherent signal: one phosphor accent, terminal-grade typography, and motion that behaves like a system booting rather than a template animating.

The second half of the brief is operational. The site must actually work: one analytics pipeline, a real deploy workflow, and no 7.8 MB image stalling first paint.

## Why now

The site is being used as a hiring artefact. It should survive a five-second skim on a phone and reward a closer look on a desktop. Right now the build is sound, but the deploy workflow is a placeholder and three analytics systems overlap, so "it works" is not yet true.

## Goals

- Establish one visual language ("Signal") across every section.
- Make motion purposeful, smooth, and element-level: decode, scanline, line draw, telemetry.
- Keep it minimal: one accent, no rainbow gradients, no glitch on every heading.
- Support light and dark as two readings of the same system.
- Leave exactly one analytics system: Cloudflare Web Analytics.
- Make the deploy path explicit and reproducible through Cloudflare's Git integration.
- Cut the hero/About image from 7.8 MB to the existing 56 KB WebP.
- Regenerate the social preview card and favicon in the Signal language.
- Respect `prefers-reduced-motion` and keep WCAG AA contrast.

## Non-goals

- Rewriting the copy, project list, experience, or skills content.
- Adding a blog, CMS, contact backend, or multi-page routing.
- Animating every element or adding audio, cursor trails, or scroll-jacking.
- Changing the information architecture: hero → work → experience → skills → about → footer.
- Redesigning the project preview SVGs.

## Anti-goals

- Neon overload, magenta/cyan everywhere, RGB split on body text.
- Scanlines or grain over readable text.
- A perpetual animation that competes with reading.
- Two analytics tools whose numbers will never agree.
- Adding a JS animation library for effects CSS can do.

## Constraints

- Astro 5 static output; Tailwind 4 via Vite; deployed to Cloudflare Pages.
- Content remains in `src/data.ts` and `src/config.ts`.
- Single page, one layout, existing component boundaries.
- No new runtime dependencies for motion.
- Must work without JavaScript for content (progressive enhancement), and with reduced motion.
- Deploy target remains `https://sarveshrane.pages.dev`.

## Approaches considered

### A — Signal (chosen)

Near-black canvas, one phosphor accent, mono labels, a name that decodes on load, one scanline sweep, and a telemetry strip built from real project numbers. Cyberpunk through behaviour and restraint.

**Why chosen:** it is the highest-signal reading of "cyberpunk + minimal + taste" per unit of decoration. It also translates cleanly into light mode as a paper-terminal variant, and the motion can be done in CSS plus ~40 lines of JS.

### B — Blueprint

Warm paper, dotted grid, schematic annotations, a packet travelling along a footer rule. Timeless and editorial, but cyberpunk only in motion. Rejected because it under-delivers on the explicit ask.

### C — Neon CRT

Deep navy, cyan-to-magenta signal, RGB-split glitch, scanlines, throughput bars. The loudest reading. Rejected because it drifts toward template and ages fastest; it is harder to keep clean across a long page.

## The design

### 1. Colour

Dark is the primary identity. Light is a paper variant, not an afterthought.

| Token | Dark | Light |
|---|---|---|
| `--canvas` | `#070908` | `#f4f3ec` |
| `--canvas-elevated` | `#0c100c` | `#fffef8` |
| `--hairline` | `#1c241c` | `#dcded2` |
| `--text-ink` | `#eef2e9` | `#151713` |
| `--text-body` | `#a4aea1` | `#4e544a` |
| `--text-mute` | `#727c71` | `#7a8076` |
| `--text-faint` | `#4b534a` | `#a7aa9f` |
| `--accent` | `#b8ff3d` | `#3d6b00` |
| `--accent-soft` | `rgba(184,255,61,.12)` | `#e6f0d6` |
| `--accent-glow` | `rgba(184,255,61,.18)` | `transparent` |

- Dark primary buttons: accent fill, near-black text, soft outer glow.
- Light primary buttons: ink fill, paper text; accent is reserved for dots, rules, and small labels.
- Status dot stays green in both modes.
- No gradients except one low-opacity phosphor bloom behind the hero and the faint dot grid.
- All text pairs must pass WCAG AA; verify `--text-mute` on `--canvas` in both modes before shipping.
- When no theme is stored, follow the OS preference. Dark is the primary expression of the design and the main QA pass, but visitors are never forced out of their system theme.

### 2. Type

- **Display / body:** existing Geist. Headlines stay tight (`-0.04em` to `-0.055em`).
- **Labels / nav / buttons / telemetry:** Geist Mono, uppercase, `0.08em`–`0.12em` tracking.
- **Name:** large, uppercase, one line on desktop. It is the only element that decodes.
- **Numbers:** tabular, mono, with a dim unit (`1,185 RPS`, `~15µs`, `10k+ / day`).
- Section labels gain an index prefix: `// 01 — selected work`, `// 02 — experience`, continuing through the page.

### 3. Layout

The existing single-page structure stays. Each section gets the same treatment:

- **Nav:** wordmark, text links, theme toggle, GitHub button. Transparent at rest, frosted with a hairline after 60 px of scroll.
- **Hero:** left-aligned. Eyebrow (`// backend engineer — navi mumbai`), name, tagline, status row, two CTAs. At the bottom edge, a one-line telemetry strip: real benchmark numbers only (`1,185 RPS · L4 LB`, `~15 µs · Kafka outbox`, `10k+ txn/day · Jio`). No invented uptime. The rotating typed role is removed: the eyebrow already states the role, and a perpetual typewriter fights the "quiet" motion rule. The status row becomes `● open to work · navi mumbai, IST`.
- **Ticker:** the skill marquee stays but reads as a signal ticker (mono, dim, `▸` separators), still `aria-hidden`.
- **Work:** hairline rows with mono index, title, description, stack tags, source/live links, and the preview image. Hover lifts the image 1.01× and turns the index accent.
- **Experience:** hairline rows; period in accent mono; highlights and stack tags as today.
- **Skills:** hairline cards with mono group labels and bordered skill chips.
- **About:** WebP portrait with a faint dot-grid frame, grayscale only; stat cards; bio; social links.
- **Footer:** the existing CTA band, restyled with one accent hairline; footer columns; the status bar remains a fixed telemetry strip on desktop.

### 4. Motion

Motion is the centrepiece, so it gets a budget. All of it uses `opacity` and `transform`, runs at 60 fps, and is disabled under `prefers-reduced-motion`.

- **Boot (on load, ~900 ms):**
  1. Nav fades/slides in.
  2. Hero eyebrow, tagline, status, and CTAs rise 12–16 px with a 40–60 ms stagger.
  3. The name decodes from random glyphs to `SARVESH RANE`. The final text is in the HTML; JS only scrambles it, so no-JS users see the name immediately.
  4. A single low-opacity scanline sweeps the hero once.
- **Ambient (very quiet):** cursor blink and status-dot pulse only. An optional scanline repeat every 14 s at ≤4% opacity; drop it if it feels busy.
- **Scroll reveals:** opacity + 12 px rise, 400–500 ms, `IntersectionObserver`, staggered 40 ms. Hairlines draw left-to-right with `scaleX`.
- **Hover:** 150 ms border/colour transitions; project image 500 ms scale; no hover effects on touch.
- **No:** parallax, scroll-jacking, text glitch on paragraphs, or looping marquees beyond the existing ticker.
- **Progressive enhancement:** hidden reveal states apply only when JS has marked `<html class="js">`; if JS fails, content is visible. The decode falls back to static text.

### 5. Analytics

Keep **Cloudflare Web Analytics only**, installed manually in the repo.

- Move the beacon token into `src/config.ts` as `CLOUDFLARE_ANALYTICS_TOKEN` (it is public, not a secret).
- Render the beacon once in `Layout.astro`, only when `import.meta.env.PROD`.
- In the Cloudflare dashboard, set Web Analytics to **Enable with JS Snippet installation** for this Pages project. That stops Cloudflare from injecting a second beacon at the edge. If the mode cannot be changed, disable automatic setup instead.
- Delete `src/components/GoogleAnalytics.astro`.
- Remove the GTM `<noscript>` iframe and the `googletagmanager.com` DNS prefetch.
- Remove `@astrojs/partytown` from `astro.config.mjs` and `package.json`.
- Remove the `static.cloudflareinsights.com` prefetch duplication; one preconnect is enough.
- Result: exactly one analytics request, no cookies, no consent banner, one source of truth for pageviews, referrers, paths, countries, and devices.

### 6. Deploy

Cloudflare Pages' Git integration is authoritative. The site builds in the Cloudflare dashboard, not in GitHub Actions.

- Delete the placeholder `.github/workflows/pages-deployment.yaml` so pushes stop producing a failing workflow run.
- Dashboard build settings: command `pnpm build`, output directory `dist`, root `/`.
- Build variables: `NODE_VERSION=22` and `PNPM_VERSION=11` (local pnpm is 11.5.2; the Pages default is older).
- Confirm the Pages project name is `sarveshrane`; the `site` value in `astro.config.mjs` stays `https://sarveshrane.pages.dev`.
- Document the build settings in `CLAUDE.md` so the next change does not re-add a broken workflow.

### 7. Performance

- Use `/profile.webp` (56 KB) for the About portrait; remove the 7.8 MB `/profile.png` and its high-priority preload. The image is below the fold, so no preload at all.
- Delete the unused `profile.webp.bak` and `src/images/profile_old.jpg` once the page no longer references them.
- Remove `animejs` and `@types/animejs`; motion is CSS + a small inline script. This drops the ~34 KB client bundle.
- Keep Google Fonts with `display=swap` and preconnect; no new font dependency.
- Target: client JS under ~5 KB gzip, no render-blocking third-party except fonts, Lighthouse mobile performance ≥ 95.

### 8. Accessibility

- Preserve the skip link, focus-visible rings, focus trap in the mobile drawer, and semantic headings.
- Accent is never the only signal for state.
- Decorative grid, scanline, and glow are `aria-hidden`.
- Reduced motion: static name, no sweep, no reveal transitions, no ticker animation.
- Verify contrast for body, mute, and accent-on-canvas in both themes.

### 9. Social preview and favicon

The old rainbow OG card and favicon would contradict the redesign on every share and browser tab.

- Regenerate `public/og-card.png` at exactly **1200 × 630** (the current file is a 1024 × 1024 JPEG with a `.png` extension).
- Signal palette, name, `BACKEND ENGINEER`, and one benchmark line. Same near-black canvas, phosphor accent, mono labels.
- Regenerate `public/favicon.svg` as a phosphor glyph on near-black, legible at 16 px.
- Update `og:image:width` / `og:image:height` only if the new file's dimensions change; they must match 1200 × 630.

## Files touched

- `src/styles/global.css` — token rewrite and Signal primitives.
- `src/layouts/Layout.astro` — analytics, meta, motion scripts, status bar.
- `src/pages/index.astro` — hero telemetry, labels, section polish.
- `src/components/Navbar.astro`, `Footer.astro`, `Navlink.astro` — restyle.
- `src/config.ts`, `src/data.ts` — analytics token, telemetry metrics; `dataCurrently` becomes unused and is removed.
- `astro.config.mjs`, `package.json` — remove Partytown and anime.js.
- `.github/workflows/pages-deployment.yaml` — delete (Cloudflare Git integration owns deploys).
- `public/og-card.png`, `public/favicon.svg` — regenerate in the Signal language.
- `public/profile.png` (remove), `public/profile.webp.bak` (remove), `src/images/profile_old.jpg` (remove after confirmation).
- `src/components/GoogleAnalytics.astro` (delete).
- `CLAUDE.md` — update architecture and deploy notes.

## Verification

1. `pnpm build` succeeds.
2. `dist/index.html` contains exactly one Cloudflare beacon and no `gtag`, `googletagmanager`, or `GTM-` strings.
3. Cloudflare Web Analytics is set to JS Snippet installation (or automatic injection is off), confirmed in the dashboard.
4. `dist/index.html` references `profile.webp`, never `profile.png`.
5. `public/og-card.png` is a real 1200 × 630 PNG; `favicon.svg` renders at 16 px.
6. Client JS in `dist/_astro/` is under ~5 KB gzip.
7. `pnpm preview` responds 200; spot-check desktop and mobile widths, light and dark, keyboard focus, and reduced motion.
8. Lighthouse (mobile) performance target ≥ 95; no layout shift from fonts or decodes.
9. Cloudflare dashboard shows one pageview stream after the next deploy — not double-counted.
10. The deleted workflow no longer runs on push; Cloudflare builds the new commit.

## What is left to the builder

- Exact responsive tuning and breakpoints for the telemetry strip.
- Whether the ambient scanline repeat survives; remove it if it reads as noise.
- Final choice of benchmark numbers on the hero strip, drawn only from real project data.
- Whether to keep or trim the ticker on small screens.
- Exact composition of the new OG card and favicon within the stated palette and dimensions.
- Confirm the Pages project name and build variables in the dashboard during the post-deploy checklist.
