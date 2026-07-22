# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **Four Corners Architectural** (the architectural division of Four Corners Building Supply, North Charleston SC). Showcases six premium window/door brands — Kolbe, Lepage, LaCantina, Quartz, Optimum, and Exclusive Wood Doors (EWD) — and drives visitors toward consultation requests.

## Running / "Building"

There is **no build step, no package manager, no tooling**. It's hand-written HTML/CSS/JS deployed as static assets via Cloudflare Workers (`wrangler.jsonc`, assets directory `.`); `.assetsignore` keeps docs, `design-handoff/`, and tooling off the public site — if you add a non-deliverable file, make sure it's covered.

- To preview locally, open `index.html` directly in a browser, or serve the folder with any static server (e.g. `python -m http.server`, `npx serve`). A server is required if you want the hero `<video>` to behave correctly across all browsers.
- No tests, no linter, no formatter configured. Don't invent commands — if the user wants tooling added, ask first.

## Architecture

### Eight pages, no templating

`index.html`, `kolbe.html`, `lepage.html`, `lacantina.html`, `quartz.html`, `optimum.html`, `ewd.html`, `contact.html`. Each is a complete standalone HTML document. The header block, mobile nav, and footer markup are **intentionally duplicated** across every page — there is no template engine and no includes. When you change shared markup (nav links, footer contact info, a new page in the dropdown), you must update **all eight files**.

The subpages ship `<header class="header header--solid">` in markup, but `js/main.js` immediately swaps to `header--transparent` at the top of the page and back to `--solid` after 60px of scroll — so over a brand hero the header starts see-through, like the homepage. `index.html` does **not** load `main.js`; its own inline script only toggles `header--solid` (no transparent class involved).

### Design language — obsidian (dark)

The site uses the obsidian palette from the Claude Design handoff: near-black backgrounds (`--bg #0e0d0b`, `--bg-2 #0e0d0b`, `--panel #1a1814`), cream ink (`--ink #ede8dc`, `--ink-2 #c5beae`), an **orange-brass** accent (`--brass #f06020`, `--brass-2 #ff8a4c`), with **Fraunces** (serif, italic for emphasis) + **Inter** (sans) typography. `<em>` is styled as brass italic site-wide. Use the tokens (`--bg`, `--brass`, `--ink`, …) — never hard-code hex values. The pre-obsidian legacy aliases (`--bg-cream`, `--accent`, `--text-primary`, …) were removed once nothing referenced them; don't reintroduce.

### Shared assets

- **`index.html` has its own inline `<style>` block** and does not load `css/styles.css`. It's the canonical obsidian layout (hero → 6-card products grid → values → CTA → footer). The **Projects section is parked inside a `<template id="projects-section-parked">`** so the browser doesn't render or fetch its images — it stays dormant until install photos are ready. If you restyle the homepage, edit its inline styles.
- `css/styles.css` — stylesheet loaded by the six brand pages + `contact.html`. Mirrors the obsidian tokens and typography from `index.html`.
- `js/main.js` — one file, DOMContentLoaded-scoped, handles: header scroll state, mobile hamburger open/close, `IntersectionObserver` fade-ins, and the contact-form submit. The contact form posts to **Formspree** (`contact.html` form `action="https://formspree.io/f/meewjyjl"`); `main.js` intercepts the submit and sends it via AJAX `fetch`, showing **"MESSAGE SENT"** on success. Used by the 7 pages that load `css/styles.css`; `index.html` has its own tiny inline script for header scroll + hamburger.

### Class naming

BEM-style (`block__element--modifier`): `product-card__image`, `header--transparent`, `mobile-nav__link`. Follow this pattern when adding new components.

### Scroll-in animations

Any element with the class `fade-in` will be observed by the IntersectionObserver in `main.js` and get `.visible` added when it scrolls into view. To animate a new section, just add `fade-in` to the wrapper — no JS changes needed.

### Product-page template

The six brand pages — `kolbe.html`, `lepage.html`, `lacantina.html`, `quartz.html`, `optimum.html`, `ewd.html` — share the same structure: brand hero → brand overview → gallery (image count varies, 5–18) → CTA band → footer. When duplicating a new brand page or restyling one, keep the structure consistent across all six. (An earlier "product types" 3-card section was cut from the design; its CSS and `type-*.jpg` images were removed — recover from git history if it ever comes back.)

### Responsive breakpoints

Both `css/styles.css` and `index.html`'s inline `<style>` use `1024px` (desktop → tablet) and `640px` (tablet → phone). At ≤1024px the header hides `.header__nav` and `.header__right` and shows `.header__hamburger`, which opens `.mobile-nav` as a fullscreen overlay. At ≤640px the homepage hero hides its CTAs (`.hero__actions`) and the stat block (`.hero__aside`) for a clean phone load.

## Design Reference

The site implements the **d-obsidian** variant from the Claude Design handoff at [design-handoff/fcbs-arch/project/variants/d-obsidian.html](design-handoff/fcbs-arch/project/variants/d-obsidian.html) — the only handoff file still in the repo, kept as the authoritative *layout* reference. Cross-check structure against it rather than guessing, but note it predates the orange-brass palette and the LaCantina / Optimum / EWD brands, so treat it as layout reference, not current brand/content truth. (Its hero video won't play — the bundle videos were deduplicated into `assets/video/hero.mp4`.) **Do not edit it or link to it at runtime**; it's excluded from deploy via `.assetsignore`. The rest of the handoff bundle (variants a/b/c, explorations, the bundler loader) and the pre-obsidian design docs (`docs/superpowers/`) were removed 2026-06-10 — recover from git history if needed.

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

- (none currently — the stale hero brand list was fixed 2026-06-10)
- `_headers` sets a strict CSP whose `frame-src` allows **only `https://www.google.com`**. The
  contact-page map iframe must use that exact host — a `maps.google.com` URL is silently blocked
  in production (it renders fine locally, where `_headers` isn't applied). Fixed 2026-07-22.
