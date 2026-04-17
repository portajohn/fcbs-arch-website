# Four Corners Architectural Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 6-page static website showcasing Four Corners' premium window & door lines (Kolbe, Lepage, Origin, Quartz) with a warm cream luxury aesthetic modeled after Cornerstone Companies FL.

**Architecture:** Static HTML/CSS/JS with shared CSS (`styles.css`) and shared JS (`main.js`). Each page is a standalone HTML file that includes the shared assets. No build step, no framework. Shared header/footer markup is repeated per page (no templating — keeps it simple and dependency-free).

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Google Fonts (Playfair Display + Montserrat), Pexels stock imagery.

---

## File Structure

```
fcbs-arch-website/
  index.html          # Homepage
  kolbe.html           # Kolbe product page
  lepage.html          # Lepage product page
  origin.html          # Origin product page
  quartz.html          # Quartz product page
  contact.html         # Contact page
  css/
    styles.css         # All styles (tokens, layout, components, responsive)
  js/
    main.js            # Header scroll, mobile nav, scroll animations, form handling
  assets/
    images/            # Stock photos (downloaded from Pexels)
    video/             # Hero background video (placeholder)
  .gitignore
```

---

### Task 1: Project Scaffold + CSS Foundation

**Files:**
- Create: `.gitignore`
- Create: `css/styles.css`
- Create: `assets/images/` (directory)
- Create: `assets/video/` (directory)

- [ ] **Step 1: Create .gitignore**

```
.DS_Store
.superpowers/
node_modules/
```

- [ ] **Step 2: Create `css/styles.css` with reset, tokens, and base typography**

```css
/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Montserrat', sans-serif; font-weight: 400; font-size: 16px; line-height: 1.6; color: var(--text-primary); background: var(--bg-cream); -webkit-font-smoothing: antialiased; }
img, video { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button, input, textarea, select { font: inherit; }

/* ===== TOKENS ===== */
:root {
  --bg-cream: #f3efe9;
  --bg-white: #ffffff;
  --bg-dark: #1a1a1a;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-muted: #999999;
  --text-light: #f3efe9;
  --accent: #9e785a;
  --accent-hover: #8a6a4e;
  --border: #e0dbd4;
  --container: 1200px;
  --section-pad: 100px;
  --section-pad-mobile: 60px;
}

/* ===== TYPOGRAPHY ===== */
h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; line-height: 1.2; }
h1 { font-size: 60px; }
h2 { font-size: 44px; margin-bottom: 20px; }
h3 { font-size: 30px; }
h4 { font-size: 22px; }
p { margin-bottom: 16px; }

/* ===== UTILITIES ===== */
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }
.section { padding: var(--section-pad) 0; }
.text-center { text-align: center; }
.subtitle { color: var(--text-secondary); font-size: 18px; max-width: 600px; margin: 0 auto 48px; }
.btn {
  display: inline-block; padding: 14px 36px;
  font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 13px;
  letter-spacing: 2px; text-transform: uppercase;
  border: none; cursor: pointer; transition: background 0.3s, color 0.3s;
}
.btn-primary { background: var(--accent); color: var(--bg-white); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-outline { background: transparent; border: 1px solid var(--accent); color: var(--accent); }
.btn-outline:hover { background: var(--accent); color: var(--bg-white); }
.btn-light { background: transparent; border: 1px solid var(--text-light); color: var(--text-light); }
.btn-light:hover { background: var(--text-light); color: var(--bg-dark); }

/* ===== HEADER ===== */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: 80px; display: flex; align-items: center;
  padding: 0 40px; transition: background 0.3s, box-shadow 0.3s;
}
.header--transparent { background: transparent; }
.header--solid { background: var(--bg-cream); box-shadow: 0 1px 0 var(--border); }
.header__logo { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 3px; color: var(--text-primary); }
.header--transparent .header__logo { color: var(--bg-white); }
.header__nav { margin-left: auto; display: flex; align-items: center; gap: 32px; }
.header__link {
  font-family: 'Montserrat', sans-serif; font-weight: 500; font-size: 13px;
  letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-primary);
  transition: color 0.3s; position: relative;
}
.header--transparent .header__link { color: var(--bg-white); }
.header__link:hover { color: var(--accent); }

/* Products dropdown */
.header__dropdown { position: relative; }
.header__dropdown-menu {
  display: none; position: absolute; top: 100%; left: -16px;
  background: var(--bg-white); border: 1px solid var(--border);
  padding: 12px 0; min-width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.header__dropdown:hover .header__dropdown-menu { display: block; }
.header__dropdown-item {
  display: block; padding: 8px 24px; font-size: 13px; font-weight: 400;
  letter-spacing: 1px; color: var(--text-primary); transition: background 0.2s;
}
.header__dropdown-item:hover { background: var(--bg-cream); color: var(--accent); }

/* Hamburger (mobile) */
.header__hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
.header__hamburger span { display: block; width: 24px; height: 2px; background: var(--text-primary); transition: 0.3s; }
.header--transparent .header__hamburger span { background: var(--bg-white); }

/* Mobile nav overlay */
.mobile-nav {
  display: none; position: fixed; inset: 0; background: var(--bg-cream); z-index: 200;
  flex-direction: column; align-items: center; justify-content: center; gap: 32px;
}
.mobile-nav.open { display: flex; }
.mobile-nav__close { position: absolute; top: 24px; right: 24px; background: none; border: none; font-size: 28px; cursor: pointer; color: var(--text-primary); }
.mobile-nav__link { font-family: 'Montserrat', sans-serif; font-weight: 500; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-primary); }
.mobile-nav__link:hover { color: var(--accent); }

/* ===== HERO ===== */
.hero {
  position: relative; height: 100vh; display: flex; align-items: center; justify-content: center;
  overflow: hidden; color: var(--text-light); text-align: center;
}
.hero__video {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;
}
.hero__overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.45); z-index: 1;
}
.hero__content { position: relative; z-index: 2; max-width: 700px; padding: 0 24px; }
.hero__title { font-size: 64px; margin-bottom: 16px; color: var(--text-light); }
.hero__subtitle { font-size: 18px; color: rgba(243,239,233,0.85); margin-bottom: 36px; }

/* ===== PRODUCT CARDS ===== */
.products-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px;
}
.product-card {
  background: var(--bg-white); overflow: hidden; transition: transform 0.3s;
  border: 1px solid var(--border);
}
.product-card:hover { transform: translateY(-4px); }
.product-card__image { aspect-ratio: 4/3; overflow: hidden; }
.product-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.product-card:hover .product-card__image img { transform: scale(1.05); }
.product-card__body { padding: 24px; }
.product-card__name { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 8px; }
.product-card__tagline { color: var(--text-secondary); font-size: 14px; margin-bottom: 16px; }
.product-card__link {
  font-weight: 600; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--accent); transition: color 0.3s;
}
.product-card__link:hover { color: var(--accent-hover); }

/* ===== PROJECTS GRID ===== */
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.project-card { position: relative; overflow: hidden; aspect-ratio: 4/3; }
.project-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.project-card:hover img { transform: scale(1.05); }
.project-card__overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 24px; background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: var(--text-light);
}
.project-card__name { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 4px; }
.project-card__location { font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
.project-card__link { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); font-weight: 600; }

/* ===== VALUE PROPS ===== */
.values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px 64px; }
.value-item__title { font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 12px; }
.value-item__text { color: var(--text-secondary); line-height: 1.7; }

/* ===== CTA BAND ===== */
.cta-band {
  background: var(--bg-dark); color: var(--text-light); text-align: center;
  padding: var(--section-pad) 24px;
}
.cta-band h2 { color: var(--text-light); margin-bottom: 16px; }
.cta-band p { color: rgba(243,239,233,0.7); margin-bottom: 32px; }

/* ===== FOOTER ===== */
.footer { background: var(--bg-dark); color: var(--text-light); padding: 64px 0 32px; }
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.footer__logo { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 3px; margin-bottom: 16px; }
.footer__text { color: rgba(243,239,233,0.6); font-size: 14px; line-height: 1.7; }
.footer__heading { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
.footer__link { display: block; color: rgba(243,239,233,0.6); font-size: 14px; margin-bottom: 10px; transition: color 0.3s; }
.footer__link:hover { color: var(--accent); }
.footer__bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center; color: rgba(243,239,233,0.4); font-size: 13px; }

/* ===== BRAND PAGE HERO ===== */
.brand-hero {
  height: 60vh; display: flex; align-items: center; justify-content: center;
  background-size: cover; background-position: center; position: relative;
  color: var(--text-light); text-align: center;
}
.brand-hero__overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
.brand-hero__content { position: relative; z-index: 1; }
.brand-hero__title { font-size: 56px; margin-bottom: 12px; }
.brand-hero__tagline { font-size: 18px; color: rgba(243,239,233,0.85); }

/* ===== BRAND OVERVIEW ===== */
.brand-overview { max-width: 800px; margin: 0 auto; text-align: center; }
.brand-overview p { color: var(--text-secondary); font-size: 17px; line-height: 1.8; }

/* ===== PRODUCT TYPES GRID ===== */
.types-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.type-card { background: var(--bg-white); border: 1px solid var(--border); overflow: hidden; }
.type-card__image { aspect-ratio: 3/2; overflow: hidden; }
.type-card__image img { width: 100%; height: 100%; object-fit: cover; }
.type-card__body { padding: 24px; }
.type-card__name { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 8px; }
.type-card__desc { color: var(--text-secondary); font-size: 14px; }

/* ===== GALLERY ===== */
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.gallery-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; cursor: pointer; transition: opacity 0.3s; }
.gallery-grid img:hover { opacity: 0.85; }

/* ===== CONTACT ===== */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
.form-group { margin-bottom: 24px; }
.form-group label { display: block; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; color: var(--text-secondary); }
.form-group input, .form-group textarea, .form-group select {
  width: 100%; padding: 14px 16px; border: 1px solid var(--border);
  background: var(--bg-white); font-size: 15px; color: var(--text-primary);
  transition: border-color 0.3s;
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: var(--accent); }
.form-group textarea { min-height: 140px; resize: vertical; }
.contact-info__item { margin-bottom: 24px; }
.contact-info__label { font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px; }
.contact-info__value { font-size: 17px; color: var(--text-primary); }
.contact-info__value a { color: var(--accent); }
.contact-info__value a:hover { color: var(--accent-hover); }

/* ===== SCROLL ANIMATIONS ===== */
.fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .footer__grid { grid-template-columns: 1fr 1fr; }
  .types-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
  h1, .hero__title { font-size: 48px; }
  h2 { font-size: 36px; }
}
@media (max-width: 768px) {
  :root { --section-pad: var(--section-pad-mobile); }
  .header__nav { display: none; }
  .header__hamburger { display: flex; }
  .products-grid { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .footer__grid { grid-template-columns: 1fr; }
  .types-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  h1, .hero__title { font-size: 36px; }
  h2 { font-size: 30px; }
  .brand-hero { height: 50vh; }
  .brand-hero__title { font-size: 40px; }
}
```

- [ ] **Step 3: Create asset directories**

```bash
mkdir -p assets/images assets/video
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore css/styles.css
git commit -m "feat: add project scaffold with CSS foundation, tokens, and responsive styles"
```

---

### Task 2: Shared JavaScript (`main.js`)

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create `js/main.js` with header scroll, mobile nav, and scroll animations**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // --- Header: transparent → solid on scroll ---
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.remove('header--transparent');
        header.classList.add('header--solid');
      } else {
        header.classList.remove('header--solid');
        header.classList.add('header--transparent');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Mobile nav ---
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav__close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // --- Scroll fade-in animations ---
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(el => observer.observe(el));
  }

  // --- Contact form handling ---
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'SENT!';
      btn.style.background = '#5a9e6b';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 2500);
    });
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add shared JS — header scroll, mobile nav, fade-in, form handler"
```

---

### Task 3: Download Stock Images

**Files:**
- Create: multiple files in `assets/images/`

- [ ] **Step 1: Download placeholder stock photos from Pexels**

Use `curl` to download free stock photos for each section. These are all Pexels free-license images:

```bash
cd assets/images

# Hero fallback
curl -L -o hero-fallback.jpg "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920"

# Product cards (one per brand)
curl -L -o kolbe.jpg "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800"
curl -L -o lepage.jpg "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800"
curl -L -o origin.jpg "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
curl -L -o quartz.jpg "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=800"

# Project cards
curl -L -o project-1.jpg "https://images.pexels.com/photos/2816323/pexels-photo-2816323.jpeg?auto=compress&cs=tinysrgb&w=800"
curl -L -o project-2.jpg "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800"
curl -L -o project-3.jpg "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800"

# Brand page heroes
curl -L -o brand-kolbe-hero.jpg "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920"
curl -L -o brand-lepage-hero.jpg "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1920"
curl -L -o brand-origin-hero.jpg "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1920"
curl -L -o brand-quartz-hero.jpg "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1920"

# Product type cards (reuse across brands)
curl -L -o type-casement.jpg "https://images.pexels.com/photos/2816323/pexels-photo-2816323.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o type-sliding.jpg "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o type-specialty.jpg "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"

# Gallery images
curl -L -o gallery-1.jpg "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-2.jpg "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-3.jpg "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-4.jpg "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-5.jpg "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-6.jpg "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-7.jpg "https://images.pexels.com/photos/2816323/pexels-photo-2816323.jpeg?auto=compress&cs=tinysrgb&w=600"
curl -L -o gallery-8.jpg "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600"

# Contact page
curl -L -o contact-hero.jpg "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1920"
```

- [ ] **Step 2: Download a placeholder hero video**

```bash
cd assets/video
# Download a free stock video from Pexels (luxury architecture)
curl -L -o hero.mp4 "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
```

If the video URL doesn't work, create a note that the user needs to supply `assets/video/hero.mp4` manually (or use Seedance to generate one).

- [ ] **Step 3: Commit**

```bash
git add assets/images/ assets/video/
git commit -m "feat: add stock placeholder images and hero video"
```

---

### Task 4: Homepage (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with all homepage sections**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Four Corners Architectural — Premium Windows & Doors</title>
  <meta name="description" content="Four Corners Building Supply's architectural division. Premium window and door solutions from Kolbe, Lepage, Origin, and Quartz.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- HEADER -->
  <header class="header header--transparent">
    <a href="index.html" class="header__logo">FOUR CORNERS</a>
    <nav class="header__nav">
      <a href="#about" class="header__link">About</a>
      <div class="header__dropdown">
        <a href="#products" class="header__link">Products</a>
        <div class="header__dropdown-menu">
          <a href="kolbe.html" class="header__dropdown-item">Kolbe</a>
          <a href="lepage.html" class="header__dropdown-item">Lepage</a>
          <a href="origin.html" class="header__dropdown-item">Origin</a>
          <a href="quartz.html" class="header__dropdown-item">Quartz</a>
        </div>
      </div>
      <a href="#projects" class="header__link">Projects</a>
      <a href="contact.html" class="header__link">Contact</a>
    </nav>
    <button class="header__hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </header>

  <!-- MOBILE NAV -->
  <div class="mobile-nav">
    <button class="mobile-nav__close" aria-label="Close">&times;</button>
    <a href="#about" class="mobile-nav__link">About</a>
    <a href="kolbe.html" class="mobile-nav__link">Kolbe</a>
    <a href="lepage.html" class="mobile-nav__link">Lepage</a>
    <a href="origin.html" class="mobile-nav__link">Origin</a>
    <a href="quartz.html" class="mobile-nav__link">Quartz</a>
    <a href="#projects" class="mobile-nav__link">Projects</a>
    <a href="contact.html" class="mobile-nav__link">Contact</a>
  </div>

  <!-- HERO -->
  <section class="hero">
    <video class="hero__video" autoplay muted loop playsinline poster="assets/images/hero-fallback.jpg">
      <source src="assets/video/hero.mp4" type="video/mp4">
    </video>
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <h1 class="hero__title">Elevated Design</h1>
      <p class="hero__subtitle">Premium window & door solutions for distinctive architecture</p>
      <a href="#products" class="btn btn-light">LEARN MORE</a>
    </div>
  </section>

  <!-- PRODUCT LINES -->
  <section id="products" class="section">
    <div class="container text-center">
      <h2 class="fade-in">Our Product Lines</h2>
      <p class="subtitle fade-in">Four world-class brands, one trusted partner</p>
      <div class="products-grid">
        <a href="kolbe.html" class="product-card fade-in">
          <div class="product-card__image"><img src="assets/images/kolbe.jpg" alt="Kolbe Windows & Doors" loading="lazy"></div>
          <div class="product-card__body">
            <h3 class="product-card__name">Kolbe</h3>
            <p class="product-card__tagline">Crafted for those who demand the finest in design and performance.</p>
            <span class="product-card__link">EXPLORE &rarr;</span>
          </div>
        </a>
        <a href="lepage.html" class="product-card fade-in">
          <div class="product-card__image"><img src="assets/images/lepage.jpg" alt="Lepage Windows & Doors" loading="lazy"></div>
          <div class="product-card__body">
            <h3 class="product-card__name">Lepage</h3>
            <p class="product-card__tagline">European engineering meets North American craftsmanship.</p>
            <span class="product-card__link">EXPLORE &rarr;</span>
          </div>
        </a>
        <a href="origin.html" class="product-card fade-in">
          <div class="product-card__image"><img src="assets/images/origin.jpg" alt="Origin Windows & Doors" loading="lazy"></div>
          <div class="product-card__body">
            <h3 class="product-card__name">Origin</h3>
            <p class="product-card__tagline">Innovative bi-fold and aluminium solutions for modern living.</p>
            <span class="product-card__link">EXPLORE &rarr;</span>
          </div>
        </a>
        <a href="quartz.html" class="product-card fade-in">
          <div class="product-card__image"><img src="assets/images/quartz.jpg" alt="Quartz Windows & Doors" loading="lazy"></div>
          <div class="product-card__body">
            <h3 class="product-card__name">Quartz</h3>
            <p class="product-card__tagline">Precision-engineered for energy efficiency and lasting beauty.</p>
            <span class="product-card__link">EXPLORE &rarr;</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FEATURED PROJECTS -->
  <section id="projects" class="section" style="background: var(--bg-white);">
    <div class="container text-center">
      <h2 class="fade-in">Featured Projects</h2>
      <p class="subtitle fade-in">Architectural statements crafted with precision</p>
      <div class="projects-grid">
        <div class="project-card fade-in">
          <img src="assets/images/project-1.jpg" alt="Modern Residence" loading="lazy">
          <div class="project-card__overlay">
            <h3 class="project-card__name">Modern Residence</h3>
            <p class="project-card__location">Durango, CO</p>
            <span class="project-card__link">VIEW PROJECT &rarr;</span>
          </div>
        </div>
        <div class="project-card fade-in">
          <img src="assets/images/project-2.jpg" alt="Mountain Estate" loading="lazy">
          <div class="project-card__overlay">
            <h3 class="project-card__name">Mountain Estate</h3>
            <p class="project-card__location">Telluride, CO</p>
            <span class="project-card__link">VIEW PROJECT &rarr;</span>
          </div>
        </div>
        <div class="project-card fade-in">
          <img src="assets/images/project-3.jpg" alt="Desert Contemporary" loading="lazy">
          <div class="project-card__overlay">
            <h3 class="project-card__name">Desert Contemporary</h3>
            <p class="project-card__location">Farmington, NM</p>
            <span class="project-card__link">VIEW PROJECT &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- WHY FOUR CORNERS -->
  <section id="about" class="section">
    <div class="container">
      <div class="text-center" style="margin-bottom: 64px;">
        <h2 class="fade-in">Why Four Corners</h2>
        <p class="subtitle fade-in">Built on decades of expertise and an unwavering commitment to quality</p>
      </div>
      <div class="values-grid">
        <div class="value-item fade-in">
          <h4 class="value-item__title">Expertise</h4>
          <p class="value-item__text">With decades of experience in the building supply industry, our architectural team brings deep product knowledge and specification expertise to every project.</p>
        </div>
        <div class="value-item fade-in">
          <h4 class="value-item__title">Quality Craftsmanship</h4>
          <p class="value-item__text">We partner exclusively with premium manufacturers who share our commitment to exceptional materials, engineering, and finish quality.</p>
        </div>
        <div class="value-item fade-in">
          <h4 class="value-item__title">Full-Service Support</h4>
          <p class="value-item__text">From initial consultation through installation and beyond, our team provides hands-on support at every stage of your project.</p>
        </div>
        <div class="value-item fade-in">
          <h4 class="value-item__title">Trusted Partnership</h4>
          <p class="value-item__text">Architects, builders, and homeowners trust Four Corners as their single source for premium fenestration solutions.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="cta-band">
    <h2 class="fade-in">Ready to start your project?</h2>
    <p class="fade-in">Let our architectural team help you find the perfect window and door solutions.</p>
    <a href="contact.html" class="btn btn-light fade-in">REQUEST CONSULTATION</a>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__logo">FOUR CORNERS</div>
          <p class="footer__text">Four Corners Building Supply's architectural division. Premium window and door solutions for distinctive design.</p>
        </div>
        <div>
          <div class="footer__heading">Navigate</div>
          <a href="#about" class="footer__link">About</a>
          <a href="#products" class="footer__link">Products</a>
          <a href="#projects" class="footer__link">Projects</a>
          <a href="contact.html" class="footer__link">Contact</a>
        </div>
        <div>
          <div class="footer__heading">Products</div>
          <a href="kolbe.html" class="footer__link">Kolbe</a>
          <a href="lepage.html" class="footer__link">Lepage</a>
          <a href="origin.html" class="footer__link">Origin</a>
          <a href="quartz.html" class="footer__link">Quartz</a>
        </div>
        <div>
          <div class="footer__heading">Contact</div>
          <a href="tel:+15551234567" class="footer__link">(555) 123-4567</a>
          <a href="mailto:arch@fourcornersbuild.com" class="footer__link">arch@fourcornersbuild.com</a>
          <p class="footer__text" style="margin-top: 8px;">123 Main Street<br>Farmington, NM 87401</p>
        </div>
      </div>
      <div class="footer__bottom">
        &copy; 2026 Four Corners Building Supply. All rights reserved.
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Start a local server and verify in browser**

```bash
cd /path/to/fcbs-arch-website
python3 -m http.server 8080
# Open http://localhost:8080
```

Verify: header turns solid on scroll, hero video plays (or fallback shows), product cards display in 4-column grid, fade-in animations trigger on scroll, mobile hamburger works at narrow widths.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage with hero video, products, projects, values, CTA, footer"
```

---

### Task 5: Product Page Template — Kolbe (`kolbe.html`)

**Files:**
- Create: `kolbe.html`

- [ ] **Step 1: Create `kolbe.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kolbe Windows & Doors — Four Corners Architectural</title>
  <meta name="description" content="Explore Kolbe's premium window and door solutions at Four Corners Architectural.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- HEADER -->
  <header class="header header--solid">
    <a href="index.html" class="header__logo">FOUR CORNERS</a>
    <nav class="header__nav">
      <a href="index.html#about" class="header__link">About</a>
      <div class="header__dropdown">
        <a href="index.html#products" class="header__link">Products</a>
        <div class="header__dropdown-menu">
          <a href="kolbe.html" class="header__dropdown-item">Kolbe</a>
          <a href="lepage.html" class="header__dropdown-item">Lepage</a>
          <a href="origin.html" class="header__dropdown-item">Origin</a>
          <a href="quartz.html" class="header__dropdown-item">Quartz</a>
        </div>
      </div>
      <a href="index.html#projects" class="header__link">Projects</a>
      <a href="contact.html" class="header__link">Contact</a>
    </nav>
    <button class="header__hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </header>

  <!-- MOBILE NAV -->
  <div class="mobile-nav">
    <button class="mobile-nav__close" aria-label="Close">&times;</button>
    <a href="index.html" class="mobile-nav__link">Home</a>
    <a href="kolbe.html" class="mobile-nav__link">Kolbe</a>
    <a href="lepage.html" class="mobile-nav__link">Lepage</a>
    <a href="origin.html" class="mobile-nav__link">Origin</a>
    <a href="quartz.html" class="mobile-nav__link">Quartz</a>
    <a href="contact.html" class="mobile-nav__link">Contact</a>
  </div>

  <!-- BRAND HERO -->
  <section class="brand-hero" style="background-image: url('assets/images/brand-kolbe-hero.jpg');">
    <div class="brand-hero__overlay"></div>
    <div class="brand-hero__content">
      <h1 class="brand-hero__title">Kolbe</h1>
      <p class="brand-hero__tagline">Crafted for those who demand the finest in design and performance</p>
    </div>
  </section>

  <!-- BRAND OVERVIEW -->
  <section class="section">
    <div class="container">
      <div class="brand-overview fade-in">
        <h2>A Legacy of Craftsmanship</h2>
        <p>For over 75 years, Kolbe has been crafting premium windows and doors that combine timeless design with industry-leading performance. Every product is built to order in Wausau, Wisconsin, offering virtually unlimited design flexibility for the most demanding architectural applications.</p>
        <p>From expansive walls of glass to historically accurate replications, Kolbe's product lines deliver beauty, durability, and energy efficiency without compromise.</p>
      </div>
    </div>
  </section>

  <!-- PRODUCT TYPES -->
  <section class="section" style="background: var(--bg-white);">
    <div class="container text-center">
      <h2 class="fade-in">Product Types</h2>
      <p class="subtitle fade-in">Solutions for every architectural vision</p>
      <div class="types-grid">
        <div class="type-card fade-in">
          <div class="type-card__image"><img src="assets/images/type-casement.jpg" alt="Casement Windows" loading="lazy"></div>
          <div class="type-card__body">
            <h3 class="type-card__name">Casement Windows</h3>
            <p class="type-card__desc">Versatile, energy-efficient windows that open outward for maximum ventilation and unobstructed views.</p>
          </div>
        </div>
        <div class="type-card fade-in">
          <div class="type-card__image"><img src="assets/images/type-sliding.jpg" alt="Sliding Doors" loading="lazy"></div>
          <div class="type-card__body">
            <h3 class="type-card__name">Sliding Doors</h3>
            <p class="type-card__desc">Expansive glass panels that glide effortlessly, connecting indoor and outdoor living spaces.</p>
          </div>
        </div>
        <div class="type-card fade-in">
          <div class="type-card__image"><img src="assets/images/type-specialty.jpg" alt="Specialty Shapes" loading="lazy"></div>
          <div class="type-card__body">
            <h3 class="type-card__name">Specialty Shapes</h3>
            <p class="type-card__desc">Custom geometric and curved windows designed to realize any architectural vision.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERY -->
  <section class="section">
    <div class="container text-center">
      <h2 class="fade-in">Gallery</h2>
      <p class="subtitle fade-in">Kolbe installations in the field</p>
      <div class="gallery-grid fade-in">
        <img src="assets/images/gallery-1.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-2.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-3.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-4.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-5.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-6.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-7.jpg" alt="Kolbe installation" loading="lazy">
        <img src="assets/images/gallery-8.jpg" alt="Kolbe installation" loading="lazy">
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-band">
    <h2 class="fade-in">Interested in Kolbe?</h2>
    <p class="fade-in">Let us help you specify the perfect Kolbe solution for your project.</p>
    <a href="contact.html" class="btn btn-light fade-in">REQUEST A QUOTE</a>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__logo">FOUR CORNERS</div>
          <p class="footer__text">Four Corners Building Supply's architectural division. Premium window and door solutions for distinctive design.</p>
        </div>
        <div>
          <div class="footer__heading">Navigate</div>
          <a href="index.html#about" class="footer__link">About</a>
          <a href="index.html#products" class="footer__link">Products</a>
          <a href="index.html#projects" class="footer__link">Projects</a>
          <a href="contact.html" class="footer__link">Contact</a>
        </div>
        <div>
          <div class="footer__heading">Products</div>
          <a href="kolbe.html" class="footer__link">Kolbe</a>
          <a href="lepage.html" class="footer__link">Lepage</a>
          <a href="origin.html" class="footer__link">Origin</a>
          <a href="quartz.html" class="footer__link">Quartz</a>
        </div>
        <div>
          <div class="footer__heading">Contact</div>
          <a href="tel:+15551234567" class="footer__link">(555) 123-4567</a>
          <a href="mailto:arch@fourcornersbuild.com" class="footer__link">arch@fourcornersbuild.com</a>
          <p class="footer__text" style="margin-top: 8px;">123 Main Street<br>Farmington, NM 87401</p>
        </div>
      </div>
      <div class="footer__bottom">&copy; 2026 Four Corners Building Supply. All rights reserved.</div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8080/kolbe.html`. Check: brand hero displays with overlay, overview text is centered, product types grid shows 3 cards, gallery shows 8 images in 4-col grid, CTA links to contact, footer is consistent.

- [ ] **Step 3: Commit**

```bash
git add kolbe.html
git commit -m "feat: add Kolbe product page"
```

---

### Task 6: Remaining Product Pages (Lepage, Origin, Quartz)

**Files:**
- Create: `lepage.html`
- Create: `origin.html`
- Create: `quartz.html`

- [ ] **Step 1: Create `lepage.html`**

Copy the structure from `kolbe.html`. Replace:
- `<title>`: "Lepage Windows & Doors — Four Corners Architectural"
- Hero image: `assets/images/brand-lepage-hero.jpg`
- Hero title: "Lepage"
- Hero tagline: "European engineering meets North American craftsmanship"
- Overview heading: "Engineering Excellence"
- Overview text: "Lepage Millwork has earned its reputation as a leader in high-performance fenestration through relentless innovation and precision manufacturing. Their products combine European design sensibility with the durability demanded by North American climates." / "From thermally broken aluminum systems to custom wood interiors, Lepage delivers solutions that exceed the expectations of architects and homeowners alike."
- CTA heading: "Interested in Lepage?"
- CTA text: "Let us help you specify the perfect Lepage solution for your project."

- [ ] **Step 2: Create `origin.html`**

Copy the structure from `kolbe.html`. Replace:
- `<title>`: "Origin Windows & Doors — Four Corners Architectural"
- Hero image: `assets/images/brand-origin-hero.jpg`
- Hero title: "Origin"
- Hero tagline: "Innovative aluminium solutions for modern living"
- Overview heading: "Redefining Modern Living"
- Overview text: "Origin has revolutionized the way we think about indoor-outdoor living. Their award-winning bi-fold doors and aluminium window systems are engineered for smooth operation, stunning aesthetics, and exceptional thermal performance." / "With industry-leading lead times and a 20-year guarantee, Origin products deliver confidence from specification through decades of daily use."
- CTA heading: "Interested in Origin?"
- CTA text: "Let us help you specify the perfect Origin solution for your project."

- [ ] **Step 3: Create `quartz.html`**

Copy the structure from `kolbe.html`. Replace:
- `<title>`: "Quartz Windows & Doors — Four Corners Architectural"
- Hero image: `assets/images/brand-quartz-hero.jpg`
- Hero title: "Quartz"
- Hero tagline: "Precision-engineered for energy efficiency and lasting beauty"
- Overview heading: "Precision & Performance"
- Overview text: "Quartz windows and doors are built on a foundation of precision engineering and sustainable design. Their advanced manufacturing processes deliver products that excel in energy efficiency, sound attenuation, and structural integrity." / "Whether your project demands floor-to-ceiling glass walls or historically faithful window profiles, Quartz offers the performance and aesthetics to make it happen."
- CTA heading: "Interested in Quartz?"
- CTA text: "Let us help you specify the perfect Quartz solution for your project."

- [ ] **Step 4: Verify all three in browser**

Open each page. Check: unique hero images/text, overview content is distinct, all links work, footer is consistent.

- [ ] **Step 5: Commit**

```bash
git add lepage.html origin.html quartz.html
git commit -m "feat: add Lepage, Origin, and Quartz product pages"
```

---

### Task 7: Contact Page (`contact.html`)

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create `contact.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — Four Corners Architectural</title>
  <meta name="description" content="Get in touch with Four Corners Architectural for premium window and door consultations.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- HEADER -->
  <header class="header header--solid">
    <a href="index.html" class="header__logo">FOUR CORNERS</a>
    <nav class="header__nav">
      <a href="index.html#about" class="header__link">About</a>
      <div class="header__dropdown">
        <a href="index.html#products" class="header__link">Products</a>
        <div class="header__dropdown-menu">
          <a href="kolbe.html" class="header__dropdown-item">Kolbe</a>
          <a href="lepage.html" class="header__dropdown-item">Lepage</a>
          <a href="origin.html" class="header__dropdown-item">Origin</a>
          <a href="quartz.html" class="header__dropdown-item">Quartz</a>
        </div>
      </div>
      <a href="index.html#projects" class="header__link">Projects</a>
      <a href="contact.html" class="header__link">Contact</a>
    </nav>
    <button class="header__hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </header>

  <!-- MOBILE NAV -->
  <div class="mobile-nav">
    <button class="mobile-nav__close" aria-label="Close">&times;</button>
    <a href="index.html" class="mobile-nav__link">Home</a>
    <a href="kolbe.html" class="mobile-nav__link">Kolbe</a>
    <a href="lepage.html" class="mobile-nav__link">Lepage</a>
    <a href="origin.html" class="mobile-nav__link">Origin</a>
    <a href="quartz.html" class="mobile-nav__link">Quartz</a>
    <a href="contact.html" class="mobile-nav__link">Contact</a>
  </div>

  <!-- CONTACT HERO -->
  <section class="brand-hero" style="background-image: url('assets/images/contact-hero.jpg'); height: 40vh;">
    <div class="brand-hero__overlay"></div>
    <div class="brand-hero__content">
      <h1 class="brand-hero__title">Get In Touch</h1>
      <p class="brand-hero__tagline">We'd love to hear about your project</p>
    </div>
  </section>

  <!-- CONTACT CONTENT -->
  <section class="section">
    <div class="container">
      <div class="contact-grid">
        <!-- FORM -->
        <div class="fade-in">
          <h2 style="margin-bottom: 32px;">Send Us a Message</h2>
          <form class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required placeholder="Your full name">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="you@example.com">
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
            </div>
            <div class="form-group">
              <label for="project-type">Project Type</label>
              <select id="project-type" name="project-type">
                <option value="">Select a project type</option>
                <option value="new-construction">New Construction</option>
                <option value="renovation">Renovation / Remodel</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">SEND MESSAGE</button>
          </form>
        </div>

        <!-- CONTACT INFO -->
        <div class="fade-in">
          <h2 style="margin-bottom: 32px;">Contact Information</h2>
          <div class="contact-info__item">
            <div class="contact-info__label">Phone</div>
            <div class="contact-info__value"><a href="tel:+15551234567">(555) 123-4567</a></div>
          </div>
          <div class="contact-info__item">
            <div class="contact-info__label">Email</div>
            <div class="contact-info__value"><a href="mailto:arch@fourcornersbuild.com">arch@fourcornersbuild.com</a></div>
          </div>
          <div class="contact-info__item">
            <div class="contact-info__label">Address</div>
            <div class="contact-info__value">123 Main Street<br>Farmington, NM 87401</div>
          </div>
          <div class="contact-info__item">
            <div class="contact-info__label">Hours</div>
            <div class="contact-info__value">Monday – Friday: 8am – 5pm<br>Saturday: By appointment</div>
          </div>
          <!-- Map placeholder -->
          <div style="margin-top: 32px; background: var(--border); height: 240px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 14px;">
            Map placeholder — embed Google Maps here
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__logo">FOUR CORNERS</div>
          <p class="footer__text">Four Corners Building Supply's architectural division. Premium window and door solutions for distinctive design.</p>
        </div>
        <div>
          <div class="footer__heading">Navigate</div>
          <a href="index.html#about" class="footer__link">About</a>
          <a href="index.html#products" class="footer__link">Products</a>
          <a href="index.html#projects" class="footer__link">Projects</a>
          <a href="contact.html" class="footer__link">Contact</a>
        </div>
        <div>
          <div class="footer__heading">Products</div>
          <a href="kolbe.html" class="footer__link">Kolbe</a>
          <a href="lepage.html" class="footer__link">Lepage</a>
          <a href="origin.html" class="footer__link">Origin</a>
          <a href="quartz.html" class="footer__link">Quartz</a>
        </div>
        <div>
          <div class="footer__heading">Contact</div>
          <a href="tel:+15551234567" class="footer__link">(555) 123-4567</a>
          <a href="mailto:arch@fourcornersbuild.com" class="footer__link">arch@fourcornersbuild.com</a>
          <p class="footer__text" style="margin-top: 8px;">123 Main Street<br>Farmington, NM 87401</p>
        </div>
      </div>
      <div class="footer__bottom">&copy; 2026 Four Corners Building Supply. All rights reserved.</div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8080/contact.html`. Check: hero displays, form renders with all fields, form submit shows "SENT!" feedback, contact info displays, map placeholder visible, responsive at mobile widths.

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: add contact page with form, info, and map placeholder"
```

---

### Task 8: Final QA + Push

- [ ] **Step 1: Cross-page link check**

Open each page in the browser and click every nav link, product card link, CTA button, and footer link. Verify no broken links.

- [ ] **Step 2: Responsive check**

Resize browser to tablet (768px) and mobile (375px) for each page. Verify:
- Hamburger menu appears and works on mobile
- Grids collapse to fewer columns
- Text sizes are readable
- No horizontal overflow

- [ ] **Step 3: Push to GitHub**

```bash
git push -u origin main
```
