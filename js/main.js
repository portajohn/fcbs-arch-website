/**
 * Four Corners Architectural — Shared JS
 * Covers: header scroll, mobile nav, fade-in observer, contact form
 */

(function () {
  'use strict';

  /* =========================================================================
     1. HEADER — transparent → solid on scroll past 60px
     ========================================================================= */

  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  // Run once on load in case page is already scrolled
  updateHeader();

  window.addEventListener('scroll', updateHeader, { passive: true });


  /* =========================================================================
     2. MOBILE NAV — hamburger open / close button / link click closes
     ========================================================================= */

  const hamburger  = document.querySelector('.header__hamburger');
  const mobileNav  = document.querySelector('.header__mobile-nav');
  const closeBtn   = document.querySelector('.header__mobile-close');
  const mobileLinks = document.querySelectorAll('.header__mobile-nav-link');

  function openMobileNav() {
    if (!mobileNav || !hamburger) return;
    mobileNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav || !hamburger) return;
    mobileNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'mobile-nav');
    hamburger.addEventListener('click', openMobileNav);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileNav);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
  });


  /* =========================================================================
     3. FADE-IN — IntersectionObserver for .fade-in elements
     ========================================================================= */

  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: reveal all immediately if IntersectionObserver not supported
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }


  /* =========================================================================
     4. CONTACT FORM — prevent default, show "SENT!", reset after 2.5s
     ========================================================================= */

  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;

      // Visual feedback
      submitBtn.textContent = 'SENT!';
      submitBtn.classList.add('is-sent');
      submitBtn.disabled = true;

      // Reset after 2.5 s
      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('is-sent');
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2500);
    });
  }

})();
