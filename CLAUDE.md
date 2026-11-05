# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Preview build: `pnpm preview`
- Tests: `pnpm test` (builds, then runs `node --test tests/*.test.mjs`)

## Architecture & Structure
- **Framework**: Astro 5.x with Tailwind CSS 4.x (via Vite plugin)
- **Styling**: Signal design tokens and primitives in `src/styles/global.css` — near-black/paper canvas, one phosphor accent (`#b8ff3d` dark, `#3d6b00` light). Do not add a second accent or rainbow gradients.
- **Components**: Astro components in `src/components/`
- **Layouts**: Base layout in `src/layouts/Layout.astro`
- **Pages**: Single page application style with `src/pages/index.astro`
- **Data Layer**: Static configuration and content managed in `src/config.ts` and `src/data.ts`
- **Integrations**:
  - `@astrojs/sitemap` for SEO

## Analytics
- Cloudflare Web Analytics is the only tracker. The beacon is injected manually from `src/layouts/Layout.astro` using `CLOUDFLARE_ANALYTICS_TOKEN` in `src/config.ts`, production builds only.
- The Cloudflare dashboard must use "Enable with JS Snippet installation". If it uses automatic injection instead, the edge and the manual beacon both fire and analytics double-count.
- Do not add Google Analytics, Google Tag Manager, or Partytown back.

## Deployment
- Cloudflare Pages Git integration is the only deploy path. Pushing the branch triggers the build.
- Build settings: command `pnpm build`, output directory `dist`, `NODE_VERSION=22`, `PNPM_VERSION=11`.
- There is no GitHub Actions deploy workflow. Do not add one.

## Verification
- `pnpm test` is the automated gate: it builds the site and checks analytics, assets, tokens, layout, hero, and section hooks in `dist/index.html`.
- Manual QA before shipping: both themes, `prefers-reduced-motion: reduce`, JavaScript disabled, and 390 px width with no horizontal scroll.
