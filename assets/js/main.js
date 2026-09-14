/* Experts Gate by GES — shared behaviour
   1. header state + mobile menu
   2. reveal-on-scroll (IntersectionObserver)
   3. lifecycle sticky story (active stage tracking)
   4. horizontal strip controls
   5. contact form handling (endpoint placeholder)
*/
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Header ---- */
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  let lastY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 24);
      // hide on fast downward scroll, show on upward
      if (y > 320 && y - lastY > 6 && !document.body.classList.contains('menu-open')) header.classList.add('is-hidden');
      else if (lastY - y > 4 || y < 320) header.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
      header.classList.remove('is-hidden');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }));
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) menuBtn.click();
    });
  }

  /* ---- 2. Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-line');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(el => io.observe(el));
  }

  /* hero image fade-in once loaded */
  const hero = document.querySelector('.hero');
  if (hero) {
    const img = hero.querySelector('.hero__media img');
    const ready = () => hero.classList.add('is-ready');
    if (!img || img.complete) ready(); else { img.addEventListener('load', ready); img.addEventListener('error', ready); }
  }

  /* ---- 3. Lifecycle story ---- */
  const lifecycle = document.querySelector('.lifecycle');
  if (lifecycle && !reduce && window.matchMedia('(min-width: 821px)').matches) {
    const stages = [...lifecycle.querySelectorAll('.stage')];
    const ticks = [...lifecycle.querySelectorAll('.lifecycle__track i')];
    const current = lifecycle.querySelector('.lifecycle__current');
    const list = lifecycle.querySelector('.lifecycle__stages');
    let active = -1;
    function setActive(i) {
      if (i === active) return;
      active = i;
      list.classList.toggle('has-active', i >= 0);
      stages.forEach((s, k) => s.classList.toggle('is-active', k === i));
      ticks.forEach((t, k) => { t.classList.toggle('is-active', k === i); t.classList.toggle('is-past', k < i); });
      if (current && i >= 0) {
        const s = stages[i];
        current.innerHTML = '<span>' + s.querySelector('.num').textContent + '</span>' + s.querySelector('.h3').textContent;
      }
    }
    function update() {
      const mid = window.innerHeight * 0.45;
      let best = -1, bestD = Infinity;
      stages.forEach((s, k) => {
        const r = s.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (r.bottom > 0 && r.top < window.innerHeight && d < bestD) { bestD = d; best = k; }
      });
      const lr = lifecycle.getBoundingClientRect();
      if (lr.top > window.innerHeight * 0.6 || lr.bottom < window.innerHeight * 0.3) best = -1;
      setActive(best);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---- 4. Strip controls ---- */
  document.querySelectorAll('.strip').forEach(strip => {
    const sc = strip.querySelector('.strip__scroller');
    const prev = strip.querySelector('[data-prev]');
    const next = strip.querySelector('[data-next]');
    const step = () => { const it = sc.querySelector('.strip__item'); return it ? it.getBoundingClientRect().width + 16 : 400; };
    if (prev) prev.addEventListener('click', () => sc.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    if (next) next.addEventListener('click', () => sc.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
  });

  /* ---- 5. Contact form ---- */
  const form = document.querySelector('form[data-contact]');
  if (form) {
    const status = form.querySelector('.form__status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute('action');
      const data = new FormData(form);
      if (!endpoint || endpoint.includes('REPLACE_WITH')) {
        // No endpoint configured yet: fall back to a pre-filled email.
        const body = [...data.entries()].map(([k, v]) => k + ': ' + v).join('\n');
        window.location.href = 'mailto:info@globalges.net?subject=' + encodeURIComponent('Enquiry from ' + (data.get('organisation') || data.get('name') || 'website')) + '&body=' + encodeURIComponent(body);
        if (status) status.textContent = 'Opening your email client…';
        return;
      }
      if (status) status.textContent = 'Sending…';
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (status) status.textContent = res.ok ? 'Thank you. We will be in touch shortly.' : 'Something went wrong. Please email info@globalges.net.';
        if (res.ok) form.reset();
      } catch (err) {
        if (status) status.textContent = 'Something went wrong. Please email info@globalges.net.';
      }
    });
  }

  /* current year */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
