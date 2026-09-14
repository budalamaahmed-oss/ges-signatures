/* Global GES · site motion and interaction. Everything here degrades to a still, fully readable page. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- nav ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  if (nav && toggle) {
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); } });
  }
  var setScrolled = function (y) { if (nav) nav.classList.toggle('scrolled', y > 24); };

  /* ---- inertia scroll (structural); native scroll if Lenis is absent ---- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id.length < 2) return;
        var el = document.querySelector(id); if (!el) return;
        e.preventDefault(); lenis.scrollTo(el, { offset: -64 });
        el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
      });
    });
  }

  /* ---- scroll-driven pieces ---- */
  var philosophy = document.querySelector('.philosophy');
  var lifecycle = document.querySelector('.lifecycle');
  var stages = lifecycle ? lifecycle.querySelectorAll('.stage') : [];
  var chapters = philosophy ? philosophy.querySelectorAll('.chapter') : [];
  var rings = philosophy ? philosophy.querySelectorAll('.diagram .ring') : [];
  var ringLabels = philosophy ? philosophy.querySelectorAll('.diagram .lbl') : [];
  var formulaWords = philosophy ? philosophy.querySelectorAll('.formula-big span') : [];

  var setStage = function (n) {
    if (!philosophy) return;
    if (philosophy.dataset.stage === String(n)) return;
    philosophy.dataset.stage = String(n);
    rings.forEach(function (r, i) { r.classList.toggle('active', n === 4 || i === n - 1); });
    ringLabels.forEach(function (l, i) { l.classList.toggle('active', n === 4 || i === n - 1); });
    formulaWords.forEach(function (w, i) { w.classList.toggle('active', n === 4 || i === n - 1); });
  };

  var onScroll = function (y) {
    setScrolled(y);
    var vh = window.innerHeight;
    /* philosophy chapters drive the sticky diagram */
    if (chapters.length) {
      var stage = 0;
      chapters.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        if (r.top < vh * 0.55) stage = i + 1;
      });
      if (stage > 0) setStage(stage);
    }
    /* lifecycle: pinned horizontal sequence on desktop, progress line otherwise */
    if (lifecycle) {
      var wrap = lifecycle.querySelector('.pin-wrap');
      var pinned = wrap && window.matchMedia('(min-width: 901px)').matches;
      var p;
      if (pinned) {
        var wr = wrap.getBoundingClientRect();
        p = Math.max(0, Math.min(1, (-wr.top) / (wr.height - vh + 0.0001)));
        var track = lifecycle.querySelector('.stages');
        var shell = lifecycle.querySelector('.shell');
        var max = Math.max(0, track.scrollWidth - shell.clientWidth);
        lifecycle.style.setProperty('--shift', (-max * p).toFixed(1) + 'px');
      } else {
        var lr = lifecycle.getBoundingClientRect();
        var start = vh * 0.85, end = vh * 0.25;
        p = Math.max(0, Math.min(1, (start - lr.top) / (lr.height - (start - end) + 0.0001)));
        lifecycle.style.setProperty('--shift', '0px');
      }
      lifecycle.style.setProperty('--progress', p.toFixed(3));
      var n = Math.round(p * stages.length);
      stages.forEach(function (s, i) { s.classList.toggle('active', i < Math.max(1, n)); });
    }
  };
  if (reduce) {
    setStage(4);
    if (lifecycle) { lifecycle.style.setProperty('--progress', '1'); stages.forEach(function (s) { s.classList.add('active'); }); }
  } else {
    if (lenis) lenis.on('scroll', function (e) { onScroll(e.scroll); });
    else window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });
    window.addEventListener('resize', function () { onScroll(window.scrollY); });
    onScroll(window.scrollY);
    if (philosophy && !philosophy.dataset.stage) setStage(1);
  }

  /* ---- reveals: only sections below the fold are hidden, so nothing is hidden at rest ---- */
  var els = document.querySelectorAll('.reveal');
  var activate = function (el) {
    el.classList.add('in');
    var g = el.querySelector('.globe'); if (g) g.classList.add('in');
    el.querySelectorAll('.count').forEach(countUp);
  };
  if (!reduce && 'IntersectionObserver' in window) {
    var vh0 = window.innerHeight;
    els.forEach(function (el) { if (el.getBoundingClientRect().top > vh0 * 0.9) el.classList.add('pre'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { activate(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    els.forEach(function (el) { if (el.classList.contains('pre')) io.observe(el); else activate(el); });
  } else {
    document.querySelectorAll('.globe').forEach(function (g) { g.classList.remove('draw'); });
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- number count-up (real figures only; the target is the text already in the DOM) ---- */
  function countUp(el) {
    if (reduce || el.dataset.done) return;
    el.dataset.done = '1';
    var raw = el.textContent.trim();
    var m = raw.match(/^(\d+)(.*)$/); if (!m) return;
    var target = parseInt(m[1], 10), suffix = m[2], t0 = null, dur = 1100;
    var step = function (t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur); k = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * k) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---- scroll spy for sticky indexes (services) ---- */
  var spyLinks = document.querySelectorAll('[data-spy] a[href^="#"]');
  if (spyLinks.length) {
    var targets = [];
    spyLinks.forEach(function (a) { var t = document.querySelector(a.getAttribute('href')); if (t) targets.push([a, t]); });
    var spy = function () {
      var y = window.innerHeight * 0.35, current = null;
      targets.forEach(function (pair) { if (pair[1].getBoundingClientRect().top <= y) current = pair; });
      targets.forEach(function (pair) { if (pair === current) pair[0].setAttribute('aria-current', 'true'); else pair[0].removeAttribute('aria-current'); });
    };
    if (lenis) lenis.on('scroll', spy); else window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---- project filters: industry and capability, no scroll jump ---- */
  var filterRoot = document.querySelector('[data-filters]');
  if (filterRoot) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-filterable] > li'));
    var groups = filterRoot.querySelectorAll('[data-filter-group]');
    var countEl = filterRoot.querySelector('.filter-count');
    var empty = document.querySelector('.projects-empty');
    var state = {};
    groups.forEach(function (g) { state[g.dataset.filterGroup] = 'all'; });
    var apply = function () {
      var visible = 0;
      items.forEach(function (li) {
        var ok = Object.keys(state).every(function (k) { return state[k] === 'all' || (li.dataset[k] || '').split(' ').indexOf(state[k]) !== -1; });
        li.hidden = !ok;
        if (ok) { li.dataset.pos = String(visible % 4); visible++; }
      });
      if (countEl) countEl.textContent = visible + ' of ' + items.length + ' engagements';
      if (empty) empty.classList.toggle('show', visible === 0);
      if (lenis) lenis.resize();
    };
    groups.forEach(function (g) {
      g.querySelectorAll('.chip').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          state[g.dataset.filterGroup] = btn.dataset.value;
          g.querySelectorAll('.chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
          apply();
        });
      });
    });
    apply();
  }

  /* ---- magnetic primary buttons: subtle, fine pointers only ---- */
  if (!reduce && finePointer) {
    document.querySelectorAll('.magnet').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        btn.style.transform = 'translate(' + (dx * 6).toFixed(1) + 'px,' + (dy * 4).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---- regional presence: live local time per hub ---- */
  var clocks = document.querySelectorAll('[data-tz]');
  if (clocks.length) {
    var tick = function () {
      var now = new Date();
      clocks.forEach(function (el) {
        try {
          el.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }).format(now);
        } catch (e) { el.textContent = ''; }
      });
    };
    tick(); setInterval(tick, 30000);
  }

})();
