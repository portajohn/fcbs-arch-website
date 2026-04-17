# Four Corners Architectural Website — Design Spec

## Overview

A 6-page static website (HTML/CSS/JS) for Four Corners Building Supply's architectural division. Showcases four premium window & door product lines (Kolbe, Lepage, Origin, Quartz) and drives visitors toward consultation requests. Modeled after [Cornerstone Companies FL](https://cornerstonecompaniesfl.com/) with a warm cream luxury aesthetic.

## Goals

- **Product showcase:** Educate visitors on the four window/door lines with dedicated pages per brand
- **Lead generation:** Drive homeowners, architects, builders, and contractors toward consultation/quote requests
- **Brand positioning:** Establish Four Corners' architectural division as a premium fenestration partner

## Target Audience

Mix of homeowners, architects/designers, builders/contractors — the site speaks to all three with professional but approachable language.

## Tech Stack

- **Static HTML + CSS + JS** — no framework, no build step
- **Google Fonts** — Playfair Display (headlines), Montserrat (body)
- **Pexels/Unsplash** — stock architectural photography for placeholders
- **HTML5 `<video>`** — background video in hero section (looping, muted, autoplay)
- Deploy anywhere (GitHub Pages, Netlify, or static hosting)

## Pages

### 1. Homepage (`index.html`)

Sections in scroll order:

1. **Fixed header**
   - Logo left, nav right
   - Nav items: About, Products (dropdown with 4 brands), Projects, Contact
   - Transparent on hero, solid cream on scroll
   - Height: ~80px

2. **Hero section**
   - Fullscreen background video (looping, muted, autoplay)
   - Dark overlay for text legibility
   - Headline: "Elevated Design" (or similar)
   - Subheadline: "Premium window & door solutions for distinctive architecture"
   - CTA button: "LEARN MORE" → scrolls to products section
   - Fallback: static image if video can't load

3. **Product lines**
   - Section heading: "Our Product Lines"
   - 4-column grid (responsive: 2-col on tablet, 1-col on mobile)
   - Each card: product image, brand name, brief tagline, link to brand page
   - Brands: Kolbe, Lepage, Origin, Quartz

4. **Featured projects**
   - Section heading: "Featured Projects"
   - 3-column photo grid
   - Each card: project photo, project name, location, "VIEW PROJECT" link
   - Placeholder content for now (swap in real projects later)

5. **Why Four Corners**
   - 3-4 value proposition blocks
   - Topics: Expertise, Quality Craftsmanship, Full-Service Support, Trusted Partnership
   - Short paragraph per value prop

6. **CTA band**
   - Dark background (`#1a1a1a`)
   - Headline: "Ready to start your project?"
   - Subtext + "REQUEST CONSULTATION" button → Contact page

7. **Footer**
   - Logo
   - Nav links: About, Products, Projects, Contact
   - Contact info: phone, email, address
   - Social links: Instagram, Facebook, LinkedIn (placeholders)
   - Copyright line

### 2–5. Product Pages (`kolbe.html`, `lepage.html`, `origin.html`, `quartz.html`)

All four follow the same template:

1. **Hero banner** — brand name + tagline over a full-width image
2. **Brand overview** — 1-2 paragraphs about the brand's story and strengths
3. **Product types** — grid of product categories (e.g., casement windows, sliding doors, specialty shapes) with images and brief descriptions
4. **Photo gallery** — grid of product/installation photos (stock placeholders)
5. **CTA** — "Interested in [Brand]?" + "REQUEST A QUOTE" button → Contact page

### 6. Contact Page (`contact.html`)

1. **Header** — "Get In Touch"
2. **Two-column layout:**
   - Left: contact form (name, email, phone, project type dropdown, message, submit)
   - Right: phone number, email, address, embedded map (placeholder)
3. **Footer** — same as homepage

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-cream` | `#f3efe9` | Primary background |
| `--bg-white` | `#ffffff` | Cards, form fields |
| `--bg-dark` | `#1a1a1a` | Dark sections, CTA bands |
| `--text-primary` | `#1a1a1a` | Headlines, body text |
| `--text-secondary` | `#666666` | Secondary text |
| `--text-muted` | `#999999` | Captions, labels |
| `--text-light` | `#f3efe9` | Text on dark backgrounds |
| `--accent` | `#9e785a` | Buttons, links, highlights |
| `--accent-hover` | `#8a6a4e` | Button hover state |
| `--border` | `#e0dbd4` | Subtle borders, dividers |

### Typography

| Element | Font | Weight | Size (desktop) |
|---------|------|--------|----------------|
| h1 | Playfair Display | 400 | 56-64px |
| h2 | Playfair Display | 400 | 40-48px |
| h3 | Playfair Display | 400 | 28-32px |
| Body | Montserrat | 400 | 16px |
| Nav | Montserrat | 500 | 13px, letter-spacing 1.5px |
| Button | Montserrat | 600 | 13px, letter-spacing 2px |
| Caption | Montserrat | 400 | 14px |

### Spacing

- Section padding: 100px vertical (60px on mobile)
- Container max-width: 1200px, centered
- Card gaps: 24-32px
- Generous whitespace throughout

### Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px – 1024px
- Mobile: < 768px

## Imagery Strategy

- **Hero video:** Stock architectural footage (luxury home with floor-to-ceiling windows) or Seedance AI-generated. User will swap in final asset.
- **Product cards:** Stock photos of premium windows/doors from Pexels
- **Project photos:** Placeholder luxury home exteriors/interiors
- **Brand pages:** Stock photos relevant to each brand's product types
- All images lazy-loaded, responsive sizes via `srcset` where applicable

## Interactions & Animations

- Header: transparent → solid on scroll
- Smooth scroll for anchor links
- Subtle fade-in on scroll for content sections
- Product cards: slight scale on hover
- CTA buttons: background color transition on hover
- Mobile: hamburger menu with slide-out nav

## Future Considerations (not in v1)

- Projects/portfolio with real case studies
- Resources section (guides, specs, downloads)
- Blog/news
- Quote builder integration
- CMS integration for content updates
