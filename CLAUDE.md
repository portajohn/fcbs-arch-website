# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **Four Corners Architectural** (the architectural division of Four Corners Building Supply, North Charleston SC). Showcases six premium window/door brands — Kolbe, Lepage, LaCantina, Quartz, Optimum, and Exclusive Wood Doors (EWD) — and drives visitors toward consultation requests.

## Running / "Building"

There is **no build step, no package manager, no tooling**. It's hand-written HTML/CSS/JS intended to be deployed as static files (GitHub Pages, Netlify, any static host).

- To preview locally, open `index.html` directly in a browser, or serve the folder with any static server (e.g. `python -m http.server`, `npx serve`). A server is required if you want the hero `<video>` to behave correctly across all browsers.
- No tests, no linter, no formatter configured. Don't invent commands — if the user wants tooling added, ask first.

## Architecture

### Eight pages, no templating

`index.html`, `kolbe.html`, `lepage.html`, `lacantina.html`, `quartz.html`, `optimum.html`, `ewd.html`, `contact.html`. Each is a complete standalone HTML document. The header block, mobile nav, and footer markup are **intentionally duplicated** across every page — there is no template engine and no includes. When you change shared markup (nav links, footer contact info, a new page in the dropdown), you must update **all eight files**.

The home page uses `<header class="header header--transparent">` because it sits above the hero video; every other page uses `header--solid` from the start. `js/main.js` only toggles transparent↔solid when the header starts transparent (i.e., on the homepage).

### Design language — obsidian (dark)

The site uses the obsidian palette from the Claude Design handoff: near-black backgrounds (`--bg #0e0d0b`, `--bg-2 #0e0d0b`, `--panel #1a1814`), cream ink (`--ink #ede8dc`, `--ink-2 #c5beae`), an **orange-brass** accent (`--brass #f06020`, `--brass-2 #ff8a4c`), with **Fraunces** (serif, italic for emphasis) + **Inter** (sans) typography. `<em>` is styled as brass italic site-wide. Use the tokens — never hard-code hex values. Legacy tokens (`--bg-cream`, `--accent`, `--text-primary`, etc.) are aliased in `styles.css` so older inline `style="..."` attributes still resolve correctly; new code should use the primary token names (`--bg`, `--brass`, `--ink`).

### Shared assets

- **`index.html` has its own inline `<style>` block** and does not load `css/styles.css`. It's the canonical obsidian layout (hero → 6-card products grid → values → CTA → footer). The **Projects section is parked inside a `<template id="projects-section-parked">`** so the browser doesn't render or fetch its images — it stays dormant until install photos are ready. If you restyle the homepage, edit its inline styles.
- `css/styles.css` — stylesheet loaded by the six brand pages + `contact.html`. Mirrors the obsidian tokens and typography from `index.html`.
- `js/main.js` — one file, DOMContentLoaded-scoped, handles: header scroll state, mobile hamburger open/close, `IntersectionObserver` fade-ins, and the contact-form submit. The contact form posts to **Formspree** (`contact.html` form `action="https://formspree.io/f/meewjyjl"`); `main.js` intercepts the submit and sends it via AJAX `fetch`, showing **"MESSAGE SENT"** on success. Used by the 7 pages that load `css/styles.css`; `index.html` has its own tiny inline script for header scroll + hamburger.

### Class naming

BEM-style (`block__element--modifier`): `product-card__image`, `header--transparent`, `mobile-nav__link`. Follow this pattern when adding new components.

### Scroll-in animations

Any element with the class `fade-in` will be observed by the IntersectionObserver in `main.js` and get `.visible` added when it scrolls into view. To animate a new section, just add `fade-in` to the wrapper — no JS changes needed.

### Product-page template

The six brand pages — `kolbe.html`, `lepage.html`, `lacantina.html`, `quartz.html`, `optimum.html`, `ewd.html` — share the same structure: brand hero → brand overview → product types (3-card grid) → gallery (8-image grid) → CTA band → footer. When duplicating a new brand page or restyling one, keep the structure consistent across all six.

### Responsive breakpoints

Both `css/styles.css` and `index.html`'s inline `<style>` use `1024px` (desktop → tablet) and `640px` (tablet → phone). At ≤1024px the header hides `.header__nav` and `.header__right` and shows `.header__hamburger`, which opens `.mobile-nav` as a fullscreen overlay. At ≤640px the homepage hero hides its CTAs (`.hero__actions`) and the stat block (`.hero__aside`) for a clean phone load.

## Design Reference

The site implements the **d-obsidian** variant from the Claude Design handoff at [design-handoff/fcbs-arch/project/variants/d-obsidian.html](design-handoff/fcbs-arch/project/variants/d-obsidian.html). That's the authoritative *layout* reference — cross-check structure against it rather than guessing. Note it predates the orange-brass palette and the LaCantina / Optimum / EWD brands, so treat it as layout reference, not current brand/content truth. The original pre-obsidian design docs in `docs/superpowers/specs/` and `docs/superpowers/plans/` are historical.

### design-handoff/ is reference-only

The `design-handoff/` directory (and `FCBS Arch-handoff.zip` it came from) is an exported Claude Design bundle. **Do not edit files there, link to them at runtime, or treat their `index.html` as part of the site** — it's a bundler loader. The live site is the eight top-level HTML files. The only files worth reading are [design-handoff/fcbs-arch/project/variants/d-obsidian.html](design-handoff/fcbs-arch/project/variants/d-obsidian.html) (design reference) and [design-handoff/fcbs-arch/project/uploads/kolbehomevideo.mp4](design-handoff/fcbs-arch/project/uploads/kolbehomevideo.mp4) (the hero video source, already copied into `assets/video/hero.mp4`).

## Contact info (single source of truth)

Phone `(843) 970-2146`, email `info@buildfcbs.com`, address `3870 Leeds Ave #101, North Charleston, SC 29405`. These appear in the footer of every page and in `contact.html`. If they change, update all eight pages.

## Multi-agent workflow

(Added for the parallel-session / verify-loop setup.)

- **Verify before declaring done.** Run `/verify` — for this static site that's a cross-page consistency check (nav/footer drift, broken asset references). There's no build/test; don't invent one.
- **Start non-trivial tasks in plan mode**, agree the approach, then implement. Re-plan instead of pushing a half-working change.
- **Duplicated markup:** header/nav/footer are duplicated across every page — when you change shared markup, update all affected pages and let `/verify` confirm they stay consistent.
- **Committing:** use `/commit-push-pr` (feature branch + PR, base `main`).
- **Agents:** `explorer` (read-only mapping), `verifier` (adversarial check), `simplifier` (post-change cleanup). For a parallel sweep across pages (e.g. one nav change applied per page), `batch-worker` runs each page's edit in its own git worktree.

### Gotchas

_Append a line here every time Claude gets something wrong in this repo._

- The homepage hero aside (`index.html`, `.hero__aside`) still lists `Kolbe · Lepage · Origin · Quartz` — stale (Origin was dropped; LaCantina / Optimum / EWD were added). It's hidden on phones (≤640px) but still shows on desktop; fix the brand list next time you touch the hero.
