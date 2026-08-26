# Four Corners Architectural — website

Static marketing site for **Four Corners Architectural** (the architectural
division of Four Corners Building Supply, North Charleston SC), live at
**https://fcarchitectural.com**. Showcases six premium window/door brands —
Kolbe, Lepage, LaCantina, Quartz, Optimum, and Exclusive Wood Doors — and
drives visitors toward consultation requests.

## Stack

Hand-written HTML/CSS/JS. **No framework, no build step, no package
manager** — that's deliberate: nothing to patch, nothing to rebuild, and the
whole site is auditable by reading eight files.

- Eight standalone pages: `index.html`, six brand pages, `contact.html`.
  Header/nav/footer markup is intentionally duplicated across all eight
  (no templating) — a shared-markup change must touch every page.
- `css/styles.css` + `js/main.js` serve the seven subpages; the homepage
  carries its own inline styles and script.
- Dark "obsidian" design language (near-black backgrounds, cream ink,
  orange-brass accent, Fraunces + Inter typography) via CSS custom
  properties — use the tokens, never hard-coded hex.
- The only dynamic feature is the contact form, which posts to
  **Formspree** (a third-party form service) via AJAX — no server of our
  own receives data.
- `_headers` ships a strict Content-Security-Policy and security headers.

## Hosting / deploy

Cloudflare Workers static assets (`wrangler.jsonc`, assets directory `.`).
**Auto-deploys on push to `main`** — there is no manual deploy step.
`.assetsignore` keeps docs, design references, and tooling off the public
site. The "Mouldings" nav item links out to the trim catalog at
https://trim.fcarchitectural.com (a separate repo/Worker); `/trim` on this
domain 301-redirects there.

## Local preview

Open `index.html` directly, or serve the folder so the hero video behaves
across browsers:

```powershell
python -m http.server 8000
```

No tests or linter are configured. See [CLAUDE.md](./CLAUDE.md) for the
full architecture notes (design tokens, page anatomy, gotchas) and the
single source of truth for contact info.
