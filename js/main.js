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

  // --- Contact form handling (Formspree AJAX) ---
  const form = document.querySelector('.contact-form');
  if (form && form.action && form.action.indexOf('formspree.io') !== -1) {
    const status = form.querySelector('.contact-form__status');
    const btn = form.querySelector('button[type="submit"]');
    const setStatus = (cls, msg) => {
      if (!status) return;
      status.hidden = false;
      status.className = 'contact-form__status' + (cls ? ' ' + cls : '');
      status.textContent = msg;
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'SENDING…';
      setStatus('', '');
      if (status) status.hidden = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          btn.textContent = 'MESSAGE SENT';
          setStatus('contact-form__status--ok', "Thanks — we'll be in touch within one business day.");
          setTimeout(() => { btn.disabled = false; btn.textContent = originalText; }, 4000);
        } else {
          let msg = "Something went wrong sending your message. Please try again, or email info@buildfcbs.com.";
          try {
            const data = await res.json();
            if (data && data.errors && data.errors.length) msg = data.errors.map((x) => x.message).join(' ');
          } catch (_) {}
          btn.disabled = false;
          btn.textContent = originalText;
          setStatus('contact-form__status--err', msg);
        }
      } catch (err) {
        btn.disabled = false;
        btn.textContent = originalText;
        setStatus('contact-form__status--err', 'Network problem — please check your connection and try again.');
      }
    });
  }
});
