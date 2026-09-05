/* =============================================================================
   SETY STUDIO — Página de vendas · comportamento
   Config em js/config.js · sem dependências externas
   ============================================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var CFG = window.SITE_CONFIG || {};
  var TRK = window.TRACKING_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(max-width: 820px)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------ TRACKING */
  window.dataLayer = window.dataLayer || [];
  function trackEvent(name, props) {
    var payload = Object.assign({ event: name }, props || {});
    window.dataLayer.push(payload);
    if (typeof window.fbq === "function") window.fbq("trackCustom", name, props || {});
    if (typeof window.gtag === "function") window.gtag("event", name, props || {});
    if (/localhost|127\.0\.0\.1|file:/.test(location.href)) console.debug("[track]", name, props || "");
  }
  window.trackEvent = trackEvent;

  (function injectTracking() {
    if (TRK.googleTagManagerId) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtm.js?id=" + TRK.googleTagManagerId;
      document.head.appendChild(s);
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    }
    if (TRK.googleAnalyticsId) {
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + TRK.googleAnalyticsId;
      document.head.appendChild(g);
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", TRK.googleAnalyticsId);
    }
    if (TRK.metaPixelId) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq("init", TRK.metaPixelId);
      window.fbq("track", "PageView");
      /* eslint-enable */
    }
  })();

  /* ------------------------------------------------------------- LINKS / CTAs */
  function waLink() {
    var msg = encodeURIComponent(CFG.whatsappMessage || "Olá! Quero falar com a Sety Studio.");
    return "https://wa.me/" + (CFG.whatsapp || "") + "?text=" + msg;
  }
  var DEST = {
    whatsapp: { href: waLink(), ext: true },
    instagram: { href: CFG.instagram || "#", ext: true },
    behance: { href: CFG.behance || "#", ext: true },
    email: { href: "mailto:" + (CFG.email || ""), ext: false },
  };
  function bindCtas(root) {
    $$("[data-cta]", root).forEach(function (el) {
      var d = DEST[el.getAttribute("data-cta")];
      if (!d) return;
      el.setAttribute("href", d.href);
      if (d.ext) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    });
  }
  function bindTracks(root) {
    $$("[data-track]", root).forEach(function (el) {
      if (el.__tracked) return;
      el.__tracked = true;
      el.addEventListener("click", function () {
        trackEvent(el.getAttribute("data-track"), { label: (el.textContent || "").trim().slice(0, 40) });
      });
    });
  }

  /* --------------------------------------------------------------- ÍCONES SVG */
  var ICON = {
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>',
    layers: '<svg viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5-9-5Zm-9 11 9 5 9-5M3 11l9 5 9-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    route: '<svg viewBox="0 0 24 24"><circle cx="6" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 18H14a4 4 0 000-8H9a4 4 0 010-8h1.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M4 13l5 5 11-13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.3L21 9l-4.9 4.2L17.6 20 12 16.4 6.4 20l1.5-6.8L3 9l6.4-.7L12 2Z" fill="currentColor"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    be: '<svg viewBox="0 0 24 24"><path d="M3 6h6a3.2 3.2 0 010 6.4H3Zm0 6.4h6.6a3.3 3.3 0 010 6.6H3ZM15 9h6M15 15c.3-2.6 2.2-4 4.2-4S23 12.4 23 15Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.4" fill="currentColor"/></svg>',
  };
  function h(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }

  /* --------------------------------------------------------------- STAT BAND */
  (function () {
    function avImg(n, sz) { return '<span class="av"><img src="assets/logos/c' + n + '.webp?v=20" alt="" width="' + sz + '" height="' + sz + '" loading="lazy" decoding="async"></span>'; }
    function avStack(order) { return '<span class="avstack avstack--sm" aria-hidden="true">' + order.map(function (n) { return avImg(n, 30); }).join('') + '<span class="av av--check">' + ICON.check + '</span></span>'; }
    var avs = avStack([1, 2, 7, 5]);
    var avsAlt = avStack([6, 3, 8, 4]);
    $$("[data-statband]").forEach(function (wrap) {
      var kind = wrap.getAttribute("data-statband");
      var ctaClass = kind === "orange" ? "btn--light" : "btn--orange";
      var ctaTxt = "Falar com a Sety Studio";
      var stat = '<span class="statband__stat"><span class="statband__ico">' + ICON.target +
        '</span><span><span><b>Tráfego qualificado</b><small>na frente das pessoas certas</small></span></span></span>';
      var proof = '<span class="statband__proof">' + avs +
        '<span class="proof__txt"><b>Projetos no ar</b><small>tráfego + site + conversão</small></span></span>';
      var html;
      if (kind === "portfolio") {
        wrap.style.justifyContent = "center";
        html =
          '<span class="statband__cta-group">' +
          '<a class="btn btn--blue statband__cta btn--breathe" href="' + (CFG.behance || "#") + '" target="_blank" rel="noopener" data-cta="behance" data-track="click_behance"><span>Ver mais no Behance</span><i class="btn__arrow" aria-hidden="true">' + ICON.be + '</i></a>' +
          '<a class="btn btn--instagram statband__cta" href="' + (CFG.instagram || "#") + '" target="_blank" rel="noopener noreferrer" data-cta="instagram" data-track="click_instagram"><span>Ver no Instagram</span><i class="btn__arrow" aria-hidden="true">' + ICON.ig + '</i></a>' +
          '</span>' +
          '<span class="statband__vr"></span>' +
          '<span class="statband__proof">' + avsAlt +
            '<span class="proof__txt"><b>Criativos &amp; campanhas</b><small>portfólio completo no Behance</small></span></span>';
      } else {
        html = stat +
          '<span class="statband__vr"></span>' +
          '<a class="btn ' + ctaClass + ' statband__cta" href="' + waLink() + '" target="_blank" rel="noopener" data-cta="whatsapp" data-track="click_whatsapp"><span>' + ctaTxt + '</span><i class="btn__arrow" aria-hidden="true">' + ICON.arrow + '</i></a>' +
          '<span class="statband__vr"></span>' +
          proof;
      }
      wrap.innerHTML = html;
    });
  })();

  /* --------------------------------------------------------------- RENDER */
  // Serviços
  (function () {
    var wrap = $("[data-services]"); if (!wrap || !window.SERVICES) return;
    wrap.setAttribute("data-stagger", "");
    window.SERVICES.forEach(function (s) {
      wrap.appendChild(h(
        '<article class="svc-card reveal">' +
          '<span class="svc-card__ico">' + (ICON[s.icon] || ICON.star) + '</span>' +
          '<span class="svc-card__line"></span>' +
          '<h3>' + s.title + '</h3>' +
          '<p>' + s.html + '</p>' +
        '</article>'
      ));
    });
  })();

  // Portfólio — card enxuto: imagem + título + categoria (fiel à referência)
  (function () {
    var wrap = $("[data-portfolio]"); if (!wrap || !window.PORTFOLIO_ITEMS) return;
    wrap.setAttribute("data-stagger", "");
    window.PORTFOLIO_ITEMS.forEach(function (p) {
      var tag = p.url ? "a" : "article";
      var attrs = p.url ? ' href="' + p.url + '" target="_blank" rel="noopener" data-track="click_projeto"' : "";
      wrap.appendChild(h(
        "<" + tag + ' class="proj-card reveal"' + attrs + ">" +
          '<div class="proj-card__img">' +
            '<img src="' + p.image + '" loading="lazy" decoding="async" alt="Site ' + p.title + " — " + p.category + ', por Sety Studio" width="640" height="480">' +
            (p.url ? '<span class="proj-card__view" aria-hidden="true">Ver ao vivo ' + ICON.arrow + '</span>' : "") +
          "</div>" +
          '<div class="proj-card__meta">' +
            '<h3 class="proj-card__title">' + p.title + "</h3>" +
            '<p class="proj-card__cat">' + p.category + "</p>" +
          "</div>" +
        "</" + tag + ">"
      ));
    });
    bindTracks(wrap);
  })();

  // Resultados — prova real de gestão de tráfego (vídeos + prints de feedback).
  // Fonte: pasta RESULTADOS do cliente. Card = mídia + legenda fiel ao material.
  // Clique/toque/Enter abre o lightbox central (vídeo com som, ou print ampliado).
  (function () {
    var wrap = $("[data-testimonials]");
    var data = window.RESULTS || window.TESTIMONIALS;
    if (!wrap || !data) return;
    wrap.setAttribute("data-stagger", "");
    function tag(isVideo) {
      var ico = isVideo
        ? '<path d="M8 5v14l11-7z" fill="currentColor"/>'
        : '<path d="M4 5h16v14H4z M4 15l5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
      return '<span class="t-card__tag"><svg viewBox="0 0 24 24" aria-hidden="true">' + ico + '</svg>' +
        (isVideo ? "Vídeo · resultado real" : "Print · resultado real") + "</span>";
    }

    var items = data.filter(function (t) { return t.video || t.image; });
    items.forEach(function (t) {
      var isVideo = !!t.video;
      var media = isVideo ? (t.poster || "") : t.image;
      var cap = t.caption ? '<p class="t-card__cap">' + t.caption + "</p>" : "";
      var play = isVideo
        ? '<span class="t-card__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>'
        : "";
      var card = h(
        '<article class="t-card reveal' + (isVideo ? "" : " t-card--img") + '" role="button" tabindex="0" ' +
          'aria-label="Abrir ' + (isVideo ? "vídeo" : "print") + ' de resultado: ' + (t.caption || t.alt || "resultado real de cliente") + '">' +
          '<div class="t-card__vid" style="background-image:url(' + media + ')">' + play + '</div>' +
          '<div class="t-card__foot">' + tag(isVideo) + cap + "</div>" +
        "</article>"
      );
      card.__data = t;
      wrap.appendChild(card);
    });

    /* ---- Lightbox (um só, reutilizado — vídeo OU imagem) ---- */
    var modal = h(
      '<div class="t-modal" hidden aria-hidden="true">' +
        '<div class="t-modal__backdrop" data-modal-close></div>' +
        '<div class="t-modal__dialog" role="dialog" aria-modal="true" aria-label="Resultado real de cliente">' +
          '<button class="t-modal__close" type="button" data-modal-close aria-label="Fechar">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
          '</button>' +
          '<div class="t-modal__media">' +
            '<video controls playsinline preload="auto" hidden></video>' +
            '<img alt="" hidden />' +
          '</div>' +
          '<p class="t-modal__cap"></p>' +
        '</div>' +
      '</div>'
    );
    document.body.appendChild(modal);
    var mVideo = $("video", modal);
    var mImg = $("img", modal);
    var mCap = $(".t-modal__cap", modal);
    var lastFocus = null;
    var closeTimer = null;

    function openModal(t, trigger) {
      lastFocus = trigger || null;
      clearTimeout(closeTimer);
      var isVideo = !!t.video;
      if (isVideo) {
        mImg.hidden = true; mImg.removeAttribute("src");
        mVideo.hidden = false;
        mVideo.src = t.video;
        mVideo.poster = t.poster || "";
      } else {
        try { mVideo.pause(); } catch (e) {}
        mVideo.hidden = true; mVideo.removeAttribute("src");
        mImg.hidden = false;
        mImg.src = t.image;
        mImg.alt = t.alt || t.caption || "Resultado real de cliente";
      }
      mCap.textContent = t.caption || "";
      mCap.hidden = !t.caption;
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
      // força reflow p/ a transição de entrada disparar
      void modal.offsetWidth;
      modal.classList.add("is-open");
      $(".t-modal__close", modal).focus();
      if (isVideo) { var p = mVideo.play(); if (p && p.catch) p.catch(function () {}); }
      trackEvent("resultado_open", { cap: (t.caption || "").slice(0, 60), tipo: isVideo ? "video" : "print" });
    }
    function closeModal() {
      if (modal.hidden) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      try { mVideo.pause(); } catch (e) {}
      var finish = function () {
        modal.hidden = true;
        mVideo.removeAttribute("src"); mVideo.load();
        mImg.removeAttribute("src");
        document.body.classList.remove("is-locked");
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      };
      if (reduceMotion) finish();
      else closeTimer = setTimeout(finish, 300);
    }

    $$(".t-card", wrap).forEach(function (card) {
      card.addEventListener("click", function () { openModal(card.__data, card); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); openModal(card.__data, card); }
      });
    });
    $$("[data-modal-close]", modal).forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  })();

  // FAQ — acordeão (primeira aberta)
  (function () {
    var wrap = $("[data-faq]");
    var data = window.FAQ || window.OBJECTIONS;
    if (!wrap || !data) return;
    wrap.setAttribute("data-stagger", "");
    data.forEach(function (item, i) {
      var q = item.q || item.question || "";
      var a = item.a || item.answer || "";
      var open = i === 0 ? " is-open" : "";
      var el = h(
        '<div class="faq-item reveal' + open + '">' +
          '<button class="faq-item__q" type="button" aria-expanded="' + (i === 0 ? "true" : "false") + '">' +
            '<span>' + q + '</span>' +
            '<i class="faq-item__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></i>' +
          '</button>' +
          '<div class="faq-item__a"><p>' + a + '</p></div>' +
        '</div>'
      );
      wrap.appendChild(el);
    });
    $$(".faq-item__q", wrap).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentNode;
        var isOpen = item.classList.contains("is-open");
        $$(".faq-item", wrap).forEach(function (o) {
          o.classList.remove("is-open");
          o.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          trackEvent("faq_open", { q: (btn.textContent || "").trim().slice(0, 60) });
        }
      });
    });
  })();

  bindCtas(document);
  bindTracks(document);

  /* --------------------------------------------------------- REVEAL ON SCROLL */
  var revealTargets = $$(".reveal, [data-stagger]");
  function revealAll() { revealTargets.forEach(function (el) { el.classList.add("is-in"); }); }
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealTargets.forEach(function (el) { io.observe(el); });
    window.addEventListener("load", function () {
      setTimeout(function () {
        revealTargets.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 1.1) el.classList.add("is-in");
        });
      }, 400);
    });
    setTimeout(revealAll, 2600);
  }

  // page_view (garante o evento no dataLayer mesmo sem GA/GTM) + UTM
  (function () {
    var p = new URLSearchParams(location.search);
    var utm = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) {
      if (p.get(k)) utm[k] = p.get(k);
    });
    trackEvent("page_view", Object.assign({ path: location.pathname, title: document.title }, utm));
  })();

  // scroll_depth — 25 / 50 / 75 / 100 (uma vez cada)
  (function () {
    var marks = [25, 50, 75, 100], hit = {};
    function onDepth() {
      var st = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? Math.round((st / h) * 100) : 100;
      marks.forEach(function (m) {
        if (pct >= m && !hit[m]) { hit[m] = 1; trackEvent("scroll_depth", { percent: m }); }
      });
      if (hit[100]) window.removeEventListener("scroll", onDepth);
    }
    window.addEventListener("scroll", onDepth, { passive: true });
    onDepth();
  })();

  // eventos de visualização de seção (uma vez cada)
  var VIEW_EVENTS = { "#servicos": "view_services", "#portfolio": "view_portfolio", "#depoimentos": "view_testimonials" };
  Object.keys(VIEW_EVENTS).forEach(function (sel) {
    var node = $(sel); if (!node) return;
    var once = false;
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !once) { once = true; trackEvent(VIEW_EVENTS[sel]); vo.disconnect(); }
      });
    }, { threshold: 0.3 });
    vo.observe(node);
  });

  /* ------------------------------------------------------ CTA FIXO (mobile) */
  var heroEl = $(".hero");
  // esconde o CTA fixo quando qualquer bloco de CTA da página (statbands, seção laranja, footer) está à vista
  var ctaBlockers = $$(".sec--quem, .foot, [data-statband], .dep__cta, .faq__foot, .flow__cta");
  function updateStickyCta() {
    if (!heroEl) return;
    var past = window.scrollY > heroEl.offsetHeight * 0.7;
    var nearBlocker = ctaBlockers.some(function (el) {
      var r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 40 && r.bottom > -40;
    });
    document.body.classList.toggle("show-sticky-cta", past && !nearBlocker);
  }

  /* ---- fundo estático: sem parallax, sem elementos seguindo o scroll ---- */
  function onScroll() {
    updateStickyCta();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateStickyCta, { passive: true });
  updateStickyCta();

  /* --------------------------------------------------------- NAV scroll state */
  var navEl = $("[data-nav]");
  function onNav() { if (navEl) navEl.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onNav, { passive: true });
  onNav();

  /* --------------------------------------------------------- MENU MOBILE */
  var toggle = $("[data-nav-toggle]");
  var mnav = $("[data-mobile-nav]");
  function setMenu(open) {
    document.body.classList.toggle("mnav-open", open);
    document.body.classList.toggle("is-locked", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (mnav) mnav.hidden = false;
  }
  if (toggle && mnav) {
    toggle.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("mnav-open"));
    });
    $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    mnav.addEventListener("click", function (e) { if (e.target === mnav) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("mnav-open")) setMenu(false);
    });
  }

  /* ------------------------------------------------------- SMOOTH ANCHORS */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ---------------------------------------------------------------- YEAR */
  var yEl = $("[data-year]"); if (yEl) yEl.textContent = new Date().getFullYear();
})();
