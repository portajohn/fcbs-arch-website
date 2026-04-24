# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **Four Corners Architectural** (the architectural division of Four Corners Building Supply, North Charleston SC). Showcases four premium window/door brands — Kolbe, Lepage, Origin, Quartz — and drives visitors toward consultation requests.

## Running / "Building"

There is **no build step, no package manager, no tooling**. It's hand-written HTML/CSS/JS intended to be deployed as static files (GitHub Pages, Netlify, any static host).

- To preview locally, open `index.html` directly in a browser, or serve the folder with any static server (e.g. `python -m http.server`, `npx serve`). A server is required if you want the hero `<video>` to behave correctly across all browsers.
- No tests, no linter, no formatter configured. Don't invent commands — if the user wants tooling added, ask first.

## Architecture

### Six pages, no templating

`index.html`, `kolbe.html`, `lepage.html`, `origin.html`, `quartz.html`, `contact.html`. Each is a complete standalone HTML document. The header block, mobile nav, and footer markup are **intentionally duplicated** across every page — there is no template engine and no includes. When you change shared markup (nav links, footer contact info, a new page in the dropdown), you must update **all six files**.

The home page uses `<header class="header header--transparent">` because it sits above the hero video; every other page uses `header--solid` from the start. `js/main.js` only toggles transparent↔solid when the header starts transparent (i.e., on the homepage).

### Design language — obsidian (dark)

The site uses the obsidian palette from the Claude Design handoff: near-black backgrounds (`--bg #0e0d0b`, `--bg-2 #17151f`, `--panel #1a1814`), cream ink (`--ink #ede8dc`, `--ink-2 #c5beae`), brass-gold accent (`--brass #c8a26a`), with **Fraunces** (serif, italic for emphasis) + **Inter** (sans) typography. `<em>` is styled as brass italic site-wide. Use the tokens — never hard-code hex values. Legacy tokens (`--bg-cream`, `--accent`, `--text-primary`, etc.) are aliased to the obsidian values in `styles.css` so older inline `style="..."` attributes still resolve correctly; new code should use the primary token names (`--bg`, `--brass`, `--ink`).

### Shared assets

- **`index.html` has its own inline `<style>` block** and does not load `css/styles.css`. It's the canonical obsidian layout (hero with aside → 4-up products → 4-up projects → values → CTA → footer). If you restyle the homepage, edit its inline styles.
- `css/styles.css` — stylesheet loaded by the 4 brand pages + `contact.html`. Mirrors the obsidian tokens and typography from `index.html`.
- `js/main.js` — one file, DOMContentLoaded-scoped, handles: header scroll state, mobile hamburger open/close, `IntersectionObserver` fade-ins, and a fake contact-form submit (no backend — the form currently just shows "SENT!" and resets). Used by the 5 pages that load `css/styles.css`; `index.html` has its own tiny inline script for header scroll + hamburger.

### Class naming

BEM-style (`block__element--modifier`): `product-card__image`, `header--transparent`, `mobile-nav__link`. Follow this pattern when adding new components.

### Scroll-in animations

Any element with the class `fade-in` will be observed by the IntersectionObserver in `main.js` and get `.visible` added when it scrolls into view. To animate a new section, just add `fade-in` to the wrapper — no JS changes needed.

### Product-page template

`kolbe.html`, `lepage.html`, `origin.html`, `quartz.html` all share the same structure: brand hero → brand overview → product types (3-card grid) → gallery (8-image grid) → CTA band → footer. When duplicating a new brand page or restyling one, keep the structure consistent across all four.

### Responsive breakpoints

Defined in `css/styles.css` at the bottom: `1024px` (desktop → tablet) and `768px` (tablet → mobile). Mobile hides `.header__nav` and shows `.header__hamburger`, which opens `.mobile-nav` as a fullscreen overlay.

## Design Reference

The site implements the **d-obsidian** variant from the Claude Design handoff at [design-handoff/fcbs-arch/project/variants/d-obsidian.html](design-handoff/fcbs-arch/project/variants/d-obsidian.html). That's the authoritative visual reference — cross-check against it rather than guessing. The original pre-obsidian design docs in `docs/superpowers/specs/` and `docs/superpowers/plans/` are historical.

### design-handoff/ is reference-only

The `design-handoff/` directory (and `FCBS Arch-handoff.zip` it came from) is an exported Claude Design bundle. **Do not edit files there, link to them at runtime, or treat their `index.html` as part of the site** — it's a bundler loader. The live site is the six top-level HTML files. The only files worth reading are [design-handoff/fcbs-arch/project/variants/d-obsidian.html](design-handoff/fcbs-arch/project/variants/d-obsidian.html) (design reference) and [design-handoff/fcbs-arch/project/uploads/kolbehomevideo.mp4](design-handoff/fcbs-arch/project/uploads/kolbehomevideo.mp4) (the hero video source, already copied into `assets/video/hero.mp4`).

## Contact info (single source of truth)

Phone `(843) 970-2146`, email `info@buildfcbs.com`, address `3870 Leeds Ave #101, North Charleston, SC 29405`. These appear in the footer of every page and in `contact.html`. If they change, update all six pages.
