/* ============================================================
   VELLARIE — theme.js
   Vanilla ES. Deferred. No build step.
   Modules: reveal, header, mobile-nav, accordions, search,
   cart-drawer, pdp (gallery + variants + qty), hero carousel,
   marquee, recently-viewed, analytics hooks.
   ============================================================ */
(function () {
  'use strict';

  var V = window.Vellarie || {};
  var S = V.settings || {};
  var R = V.routes || {};
  var STR = V.strings || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var on = function (el, ev, fn, o) { el && el.addEventListener(ev, fn, o); };

  /* ---------- scroll lock (ref-counted) ---------- */
  var lockCount = 0;
  function lockScroll() { lockCount++; document.body.classList.add('is-locked'); }
  function unlockScroll() { lockCount = Math.max(0, lockCount - 1); if (!lockCount) document.body.classList.remove('is-locked'); }

  /* ---------- shared scrim ---------- */
  var scrim = document.createElement('div');
  scrim.className = 'scrim';
  document.body.appendChild(scrim);
  var scrimClose = null;
  function showScrim(cb) { scrim.classList.add('is-active'); scrimClose = cb; }
  function hideScrim() { scrim.classList.remove('is-active'); scrimClose = null; }
  on(scrim, 'click', function () { if (scrimClose) scrimClose(); });
  on(document, 'keydown', function (e) { if (e.key === 'Escape' && scrimClose) scrimClose(); });

  function money(cents) {
    try {
      return (cents / 100).toLocaleString(document.documentElement.lang || 'en', {
        style: 'currency', currency: (S.moneyFormat || '').match(/[A-Z]{3}/) ? S.moneyFormat.match(/[A-Z]{3}/)[0] : 'USD'
      });
    } catch (e) { return '$' + (cents / 100).toFixed(2); }
  }
  function push(name, payload) {
    if (!S.dataLayer) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, payload || {}));
  }

  /* ============================================================
     1. SCROLL REVEAL
     ============================================================ */
  function initReveal() {
    if (!S.animations || reduceMotion || !('IntersectionObserver' in window)) {
      $$('[data-reveal], [data-reveal-stagger]').forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var style = S.animationStyle || 'fade-up';
    $$('[data-reveal]').forEach(function (el) { if (!el.getAttribute('data-reveal')) el.setAttribute('data-reveal', style); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    $$('[data-reveal], [data-reveal-stagger]').forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     2. HEADER (sticky + overlay -> solid)
     ============================================================ */
  function initHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var overlay = header.hasAttribute('data-overlay');
    var sticky = S.stickyHeader;
    if (sticky) header.classList.add('is-sticky');
    if (overlay) header.classList.add('is-overlay');

    function update() {
      var y = window.scrollY || window.pageYOffset;
      var solid = y > 40;
      header.classList.toggle('is-solid', solid || !overlay);
      if (overlay) header.classList.toggle('is-overlay', !solid);
    }
    update();
    var ticking = false;
    on(window, 'scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
  }

  /* ============================================================
     3. MOBILE NAV
     ============================================================ */
  function initMobileNav() {
    var nav = $('[data-mobile-nav]');
    var toggle = $('[data-menu-toggle]');
    if (!nav || !toggle) return;
    var closeBtn = $('[data-menu-close]', nav);
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      nav.classList.add('is-open'); nav.removeAttribute('inert');
      toggle.setAttribute('aria-expanded', 'true');
      lockScroll(); showScrim(close);
      var f = nav.querySelector('a, button'); f && f.focus();
    }
    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      unlockScroll(); hideScrim();
      lastFocus && lastFocus.focus();
    }
    on(toggle, 'click', open);
    on(closeBtn, 'click', close);

    $$('[data-mnav-sub-toggle]', nav).forEach(function (btn) {
      on(btn, 'click', function () {
        var panel = btn.nextElementSibling;
        var isOpen = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  /* ============================================================
     4. ACCORDIONS (generic)
     ============================================================ */
  function initAccordions(root) {
    $$('[data-accordion] .accordion__trigger', root || document).forEach(function (trig) {
      if (trig.dataset.bound) return; trig.dataset.bound = '1';
      on(trig, 'click', function () {
        var panel = trig.nextElementSibling;
        var open = trig.getAttribute('aria-expanded') === 'true';
        trig.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
      });
    });
  }

  /* ============================================================
     5. SEARCH OVERLAY + PREDICTIVE
     ============================================================ */
  function initSearch() {
    var overlay = $('[data-search-overlay]');
    var openers = $$('[data-search-open]');
    if (!overlay || !openers.length) return;
    var input = $('input[type="search"], input[name="q"]', overlay);
    var results = $('[data-predictive-results]', overlay);
    var closeBtn = $('[data-search-close]', overlay);
    var t;

    function open() {
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      lockScroll(); showScrim(close);
      setTimeout(function () { input && input.focus(); }, 60);
    }
    function close() {
      overlay.classList.remove('is-open'); unlockScroll(); hideScrim();
      setTimeout(function () { overlay.hidden = true; }, 400);
    }
    openers.forEach(function (b) { on(b, 'click', open); });
    on(closeBtn, 'click', close);

    on(input, 'input', function () {
      clearTimeout(t);
      var q = input.value.trim();
      if (q.length < 2) { if (results) results.innerHTML = ''; return; }
      t = setTimeout(function () { runPredictive(q, results); push('search', { search_term: q }); }, 220);
    });
  }
  function runPredictive(q, results) {
    if (!results || !R.predictiveSearch) return;
    var url = R.predictiveSearch + '?q=' + encodeURIComponent(q) +
      '&resources[type]=product,collection,page&resources[limit]=6&section_id=predictive-search';
    fetch(url).then(function (r) { return r.text(); }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var inner = doc.querySelector('[data-predictive-results]');
      results.innerHTML = inner ? inner.innerHTML : '';
    }).catch(function () {});
  }

  /* ============================================================
     6. CART DRAWER
     ============================================================ */
  var Cart = (function () {
    var drawer = $('[data-cart-drawer]');
    var openers = $$('[data-cart-open]');
    function isDrawer() { return S.cartType === 'drawer' && drawer; }

    function open() {
      if (!isDrawer()) return;
      drawer.classList.add('is-open'); drawer.removeAttribute('inert');
      lockScroll(); showScrim(close);
      var f = drawer.querySelector('button, a'); f && f.focus();
    }
    function close() { if (!drawer) return; drawer.classList.remove('is-open'); unlockScroll(); hideScrim(); }

    function refresh() {
      return fetch(R.root + '?section_id=cart-drawer').then(function (r) { return r.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var fresh = doc.querySelector('[data-cart-drawer]');
        if (fresh && drawer) drawer.innerHTML = fresh.innerHTML;
        return fetch(R.cart + '.js').then(function (r) { return r.json(); });
      }).then(function (cart) {
        $$('[data-cart-count]').forEach(function (n) {
          n.textContent = cart.item_count;
          n.hidden = cart.item_count === 0;
        });
        bindDrawer();
        return cart;
      });
    }

    function add(form, btn) {
      var body = new FormData(form);
      body.append('sections', 'cart-drawer');
      btn && btn.classList.add('is-loading');
      return fetch(R.cartAdd, { method: 'POST', headers: { Accept: 'application/javascript' }, body: body })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.status) { flash(btn, res.description || STR.cartError); return; }
          push('add_to_cart', {
            ecommerce: { currency: (S.moneyFormat || '').match(/[A-Z]{3}/) ? RegExp.lastMatch : 'USD',
              value: (res.final_price || res.price || 0) / 100,
              items: [{ item_id: res.sku || res.variant_id, item_name: res.product_title, price: (res.final_price || 0) / 100, quantity: res.quantity || 1 }] }
          });
          return refresh().then(function () { if (isDrawer()) open(); else window.location = R.cart; });
        })
        .catch(function () { flash(btn, STR.cartError); })
        .finally(function () { btn && btn.classList.remove('is-loading'); });
    }

    function change(key, qty) {
      return fetch(R.cartChange, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty })
      }).then(function () { return refresh(); });
    }

    function bindDrawer() {
      if (!drawer) return;
      $('[data-cart-close]', drawer) && on($('[data-cart-close]', drawer), 'click', close);
      $$('[data-line-remove]', drawer).forEach(function (b) {
        on(b, 'click', function () { change(b.dataset.key, 0); });
      });
      $$('[data-line-qty]', drawer).forEach(function (wrap) {
        var input = $('input', wrap);
        $$('button', wrap).forEach(function (btn) {
          on(btn, 'click', function () {
            var step = btn.dataset.dir === 'up' ? 1 : -1;
            var next = Math.max(0, parseInt(input.value, 10) + step);
            change(input.dataset.key, next);
          });
        });
        on(input, 'change', function () { change(input.dataset.key, Math.max(0, parseInt(input.value, 10) || 0)); });
      });
      initAccordions(drawer);
    }

    function flash(btn, msg) {
      if (!btn) { alert(msg); return; }
      var lbl = $('.btn__label', btn) || btn;
      var prev = lbl.textContent;
      lbl.textContent = msg; btn.classList.add('is-error');
      setTimeout(function () { lbl.textContent = prev; btn.classList.remove('is-error'); }, 2200);
    }

    openers.forEach(function (b) {
      on(b, 'click', function (e) {
        if (isDrawer()) { e.preventDefault(); open(); }
      });
    });
    bindDrawer();

    // intercept every add-to-cart form
    on(document, 'submit', function (e) {
      var form = e.target.closest('form[action*="/cart/add"]');
      if (!form) return;
      e.preventDefault();
      add(form, form.querySelector('[type="submit"]'));
    });

    return { open: open, close: close, refresh: refresh, add: add };
  })();

  /* ============================================================
     7. PDP — gallery + variants + qty + sticky ATC
     ============================================================ */
  function initPDP(root) {
    var pdp = $('[data-pdp]', root || document);
    if (!pdp) return;

    // gallery
    var stage = $('[data-pdp-stage]', pdp);
    var track = $('[data-pdp-track]', pdp);
    var thumbs = $$('[data-pdp-thumb]', pdp);
    var counter = $('[data-pdp-count]', pdp);
    function goTo(i) {
      if (!track) return;
      var slide = track.children[i];
      if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
      thumbs.forEach(function (t, ti) { t.setAttribute('aria-current', ti === i ? 'true' : 'false'); });
    }
    thumbs.forEach(function (t, i) { on(t, 'click', function () { goTo(i); }); });
    if (track && counter) {
      on(track, 'scroll', function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        counter.textContent = (i + 1) + ' / ' + track.children.length;
      }, { passive: true });
    }

    // variants
    var dataEl = $('[data-pdp-variants]', pdp);
    var variants = dataEl ? JSON.parse(dataEl.textContent) : [];
    var form = $('form[action*="/cart/add"]', pdp);
    var idInput = form && $('input[name="id"]', form);
    var priceEl = $('[data-pdp-price]', pdp);
    var atcBtn = form && $('[data-atc]', form);
    var stickyBar = $('[data-sticky-atc]');
    var chosen = {};

    $$('[data-opt]', pdp).forEach(function (group) {
      var name = group.dataset.opt;
      var current = $('[data-opt-selected]', group);
      $$('[data-opt-value]', group).forEach(function (btn) {
        if (btn.getAttribute('aria-pressed') === 'true') chosen[name] = btn.dataset.optValue;
        on(btn, 'click', function () {
          $$('[data-opt-value]', group).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
          btn.setAttribute('aria-pressed', 'true');
          chosen[name] = btn.dataset.optValue;
          if (current) current.textContent = btn.dataset.optValue;
          resolve();
        });
      });
    });

    function resolve() {
      var names = $$('[data-opt]', pdp).map(function (g) { return g.dataset.opt; });
      var match = variants.find(function (v) {
        return names.every(function (n, i) { return v.options[i] === chosen[n]; });
      });
      if (!match) return;
      if (idInput) idInput.value = match.id;
      var url = new URL(window.location); url.searchParams.set('variant', match.id);
      window.history.replaceState({}, '', url);
      var html = priceFragment(match);
      if (priceEl) priceEl.innerHTML = html;
      if (stickyBar) { var sp = $('[data-sticky-price]', stickyBar); if (sp) sp.innerHTML = html; }
      var avail = match.available;
      if (atcBtn) {
        var lbl = $('.btn__label', atcBtn) || atcBtn;
        atcBtn.disabled = !avail;
        lbl.textContent = avail ? STR.addToCart : STR.soldOut;
      }
      // mark unavailable option values
      $$('[data-opt]', pdp).forEach(function (group, gi) {
        var nm = group.dataset.opt;
        $$('[data-opt-value]', group).forEach(function (btn) {
          var test = Object.assign({}, chosen); test[nm] = btn.dataset.optValue;
          var ok = variants.some(function (v) {
            return $$('[data-opt]', pdp).every(function (g, i) { return v.options[i] === test[g.dataset.opt]; }) && v.available;
          });
          btn.classList.toggle('is-unavailable', !ok);
        });
      });
      push('select_item', { items: [{ item_id: match.sku || match.id, item_name: (dataEl && dataEl.dataset.title) || '' }] });
    }
    function priceFragment(v) {
      if (v.compare_at_price && v.compare_at_price > v.price) {
        return '<span class="price--sale">' + money(v.price) + '</span> <span class="price--compare">' + money(v.compare_at_price) + '</span>';
      }
      return '<span>' + money(v.price) + '</span>';
    }

    // qty steppers
    $$('[data-qty]', pdp).forEach(function (wrap) {
      var input = $('input', wrap);
      $$('button', wrap).forEach(function (b) {
        on(b, 'click', function () {
          var step = b.dataset.dir === 'up' ? 1 : -1;
          input.value = Math.max(1, (parseInt(input.value, 10) || 1) + step);
        });
      });
    });

    // sticky ATC visibility
    if (stickyBar && atcBtn) {
      var io = new IntersectionObserver(function (ents) {
        stickyBar.classList.toggle('is-visible', !ents[0].isIntersecting);
      }, { rootMargin: '-120px 0px 0px 0px' });
      io.observe(form);
      var sBtn = $('[data-sticky-atc-btn]', stickyBar);
      on(sBtn, 'click', function () { form.requestSubmit ? form.requestSubmit() : form.submit(); });
    }

    resolve();
    push('view_item', { items: [{ item_id: (dataEl && dataEl.dataset.sku) || '', item_name: (dataEl && dataEl.dataset.title) || '', price: (dataEl && parseFloat(dataEl.dataset.price)) || 0 }] });
    rememberProduct(pdp.dataset.handle, pdp.dataset.title, pdp.dataset.image, pdp.dataset.url, pdp.dataset.price);
  }

  /* ============================================================
     8. HERO CAROUSEL
     ============================================================ */
  function initHero(root) {
    var hero = $('[data-hero]', root || document);
    if (!hero) return;
    var slides = $$('[data-hero-slide]', hero);
    if (slides.length < 2) { $$('[data-hero-controls]', hero).forEach(function (c) { c.hidden = true; }); return; }
    var i = 0, timer, delay = parseInt(hero.dataset.autoplay, 10) || 0;
    var count = $('[data-hero-current]', hero);
    var total = $('[data-hero-total]', hero);
    var bar = $('[data-hero-bar]', hero);
    var dots = $$('[data-hero-dot]', hero);
    if (total) total.textContent = String(slides.length).padStart(2, '0');

    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, si) { s.setAttribute('aria-hidden', si === i ? 'false' : 'true'); });
      if (count) count.textContent = String(i + 1).padStart(2, '0');
      if (bar) bar.style.setProperty('--progress', ((i + 1) / slides.length * 100) + '%');
      dots.forEach(function (d, di) { d.setAttribute('aria-current', di === i ? 'true' : 'false'); });
    }
    function next() { show(i + 1); }
    function prev() { show(i - 1); }
    on($('[data-hero-next]', hero), 'click', function () { next(); reset(); });
    on($('[data-hero-prev]', hero), 'click', function () { prev(); reset(); });
    dots.forEach(function (d, di) { on(d, 'click', function () { show(di); reset(); }); });
    function start() { if (delay && !reduceMotion) timer = setInterval(next, delay); }
    function reset() { clearInterval(timer); start(); }
    on(hero, 'mouseenter', function () { clearInterval(timer); });
    on(hero, 'mouseleave', start);
    show(0); start();
  }

  /* ============================================================
     8b. LOCALIZATION POPOVERS (country / language)
     ============================================================ */
  function initLocalization() {
    $$('[data-loc-toggle]').forEach(function (btn) {
      var key = btn.getAttribute('data-loc-toggle');
      var pop = document.querySelector('[data-loc-popover="' + key + '"]');
      if (!pop) return;
      on(btn, 'click', function (e) {
        e.stopPropagation();
        var open = !pop.hidden;
        $$('[data-loc-popover]').forEach(function (p) { p.hidden = true; });
        pop.hidden = open;
      });
    });
    on(document, 'click', function () { $$('[data-loc-popover]').forEach(function (p) { p.hidden = true; }); });
  }

  /* ============================================================
     9. MARQUEE (seamless)
     ============================================================ */
  function initMarquee() {
    $$('[data-marquee]').forEach(function (m) {
      var track = $('.marquee__track', m);
      if (track && !track.dataset.doubled) { track.innerHTML += track.innerHTML; track.dataset.doubled = '1'; }
    });
  }

  /* ============================================================
     10. RECENTLY VIEWED
     ============================================================ */
  function rememberProduct(handle, title, image, url, price) {
    if (!handle) return;
    try {
      var key = 'vellarie:recently-viewed';
      var list = JSON.parse(localStorage.getItem(key) || '[]').filter(function (p) { return p.handle !== handle; });
      list.unshift({ handle: handle, title: title, image: image, url: url, price: price });
      localStorage.setItem(key, JSON.stringify(list.slice(0, 12)));
    } catch (e) {}
  }
  function renderRecentlyViewed() {
    var host = $('[data-recently-viewed]');
    if (!host) return;
    try {
      var list = JSON.parse(localStorage.getItem('vellarie:recently-viewed') || '[]')
        .filter(function (p) { return p.handle !== host.dataset.exclude; });
      if (!list.length) { host.closest('[data-recently-section]') && (host.closest('[data-recently-section]').hidden = true); return; }
      host.innerHTML = list.slice(0, host.dataset.limit || 4).map(function (p) {
        return '<a class="card" href="' + p.url + '"><span class="card__media"><img class="card__img card__img--pri" src="' + p.image + '" alt="' + (p.title || '') + '" loading="lazy"></span><span class="card__info"><span class="card__title">' + (p.title || '') + '</span><span class="card__price">' + (p.price || '') + '</span></span></a>';
      }).join('');
    } catch (e) {}
  }

  /* ============================================================
     11. SUB-PARALLAX (hero / promo backgrounds — very subtle)
     ============================================================ */
  function initParallax() {
    if (reduceMotion || window.innerWidth < 750) return;
    var layers = $$('[data-parallax]');
    if (!layers.length) return;
    var ticking = false;
    function frame() {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var img = el.querySelector('img');
        if (!img) return;
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1
        img.style.transform = 'translate3d(0,' + (progress * -16).toFixed(1) + 'px,0) scale(1.06)';
      });
      ticking = false;
    }
    on(window, 'scroll', function () {
      if (ticking) return; ticking = true; requestAnimationFrame(frame);
    }, { passive: true });
    frame();
  }

  /* ============================================================
     12. IMAGE SKELETON (product-card media shimmer until loaded)
     ============================================================ */
  function initImgSkeleton(root) {
    $$('.card__media', root || document).forEach(function (m) {
      var img = m.querySelector('img.card__img--pri');
      if (!img || m.dataset.sk) return;
      m.dataset.sk = '1';
      if (img.complete && img.naturalWidth) return;
      m.classList.add('is-skeleton');
      var done = function () { m.classList.remove('is-skeleton'); };
      on(img, 'load', done); on(img, 'error', done);
    });
  }

  /* ============================================================
     13. NEWSLETTER POPUP (once per session; delay / exit-intent)
     ============================================================ */
  function initPopup() {
    var overlay = $('[data-np-overlay]');
    if (!overlay) return;
    var KEY = 'vellarie:np';
    var forced = overlay.hasAttribute('data-np-open-now');
    var lastFocus = null;

    function open() {
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      lockScroll(); showScrim(close);
      lastFocus = document.activeElement;
      var f = overlay.querySelector('input, button'); f && f.focus();
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    }
    function close() {
      overlay.classList.remove('is-open'); unlockScroll(); hideScrim();
      setTimeout(function () { overlay.hidden = true; }, 400);
      lastFocus && lastFocus.focus();
    }
    $$('[data-np-close]', overlay).forEach(function (b) { on(b, 'click', close); });
    on(overlay, 'click', function (e) { if (e.target === overlay) close(); });

    if (forced) { open(); return; }
    if (!S.popupEnabled) return;
    try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

    var delay = (S.popupDelay || 12) * 1000;
    var fired = false;
    var fire = function () { if (fired) return; fired = true; open(); };

    if (S.popupTrigger === 'exit' && window.innerWidth >= 750) {
      var t = setTimeout(fire, Math.max(delay, 25000)); // safety net
      on(document, 'mouseout', function (e) {
        if (!e.relatedTarget && e.clientY <= 0) { clearTimeout(t); fire(); }
      });
    } else {
      setTimeout(fire, delay);
    }
  }

  /* ============================================================
     14. COUNTDOWN (promo banner — real deadline only)
     ============================================================ */
  function initCountdown() {
    $$('[data-countdown]').forEach(function (el) {
      var end = new Date(el.getAttribute('data-countdown')).getTime();
      if (isNaN(end)) return;
      var d = $('[data-cd-d]', el), h = $('[data-cd-h]', el), m = $('[data-cd-m]', el), s = $('[data-cd-s]', el);
      function pad(n) { return String(n).padStart(2, '0'); }
      function tick() {
        var diff = end - Date.now();
        if (diff <= 0) { el.hidden = true; clearInterval(iv); return; }
        el.hidden = false;
        d.textContent = pad(Math.floor(diff / 864e5));
        h.textContent = pad(Math.floor(diff / 36e5) % 24);
        m.textContent = pad(Math.floor(diff / 6e4) % 60);
        s.textContent = pad(Math.floor(diff / 1e3) % 60);
      }
      tick();
      var iv = setInterval(tick, 1000);
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot(root) {
    initReveal();
    initHeader();
    initMobileNav();
    initAccordions(root);
    initSearch();
    initLocalization();
    initPDP(root);
    initHero(root);
    initMarquee();
    initParallax();
    initImgSkeleton(root);
    initPopup();
    initCountdown();
    renderRecentlyViewed();
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', function () { boot(); });

  // Theme Editor: re-init a reloaded section
  document.addEventListener('shopify:section:load', function (e) { boot(e.target); });
  document.addEventListener('shopify:section:select', function (e) {
    var hero = e.target.querySelector('[data-hero]'); // pause autoplay while editing
    if (hero) hero.dispatchEvent(new Event('mouseenter'));
  });
})();
