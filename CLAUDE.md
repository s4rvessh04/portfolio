# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Architecture & Structure
- **Framework**: Astro 5.x with Tailwind CSS 4.x (via Vite plugin)
- **Styling**: Global CSS in `src/styles/global.css`
- **Components**: Astro components in `src/components/`
- **Layouts**: Base layout in `src/layouts/Layout.astro`
- **Pages**: Single page application style with `src/pages/index.astro`
- **Data Layer**: Static configuration and content managed in `src/config.ts` and `src/data.ts`
- **Integrations**: 
  - `@astrojs/sitemap` for SEO
  - `@astrojs/partytown` for offloading third-party scripts (e.g., Google Analytics)
