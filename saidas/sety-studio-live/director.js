/* ══════════════════════════════════════════════════════
   SETY STUDIO — DIRECTOR OF ART v4.0
   Marquee infinito · Auto-scroll · Modal premium
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  /* ══════════════════════════════════════════════════
     MARQUEE ENGINE
     RAF-based infinite horizontal scroll.
     Funciona para banners e feedbacks.
     Suporta: hover pause, drag (mouse + touch), wheel.
  ══════════════════════════════════════════════════════ */

  function createMarquee(container, speed) {
    var paused   = false;
    var dragging = false;
    var halfWidth = 0;
    var startX = 0, startScroll = 0;
    var tStartX = 0, tStartScroll = 0;
    var rafId;
    var moved = false; // distinguir clique de drag

    function clamp(v) {
      if (halfWidth <= 0) return v;
      v = v % halfWidth;
      if (v < 0) v += halfWidth;
      return v;
    }

    function tick() {
      if (!paused && !dragging && halfWidth > 0) {
        container.scrollLeft = clamp(container.scrollLeft + speed);
      }
      rafId = requestAnimationFrame(tick);
    }

    /* Hover: pausa a animação */
    container.addEventListener('mouseenter', function () { paused = true; });
    container.addEventListener('mouseleave', function () { paused = false; });

    /* Drag com mouse */
    container.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      dragging = true;
      moved    = false;
      startX      = e.clientX;
      startScroll = container.scrollLeft;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    });
    document.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      container.style.cursor = 'grab';
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var delta = startX - e.clientX;
      if (Math.abs(delta) > 4) moved = true;
      container.scrollLeft = clamp(startScroll + delta);
    });

    /* Touch */
    container.addEventListener('touchstart', function (e) {
      tStartX      = e.touches[0].clientX;
      tStartScroll = container.scrollLeft;
      moved = false;
    }, { passive: true });
    container.addEventListener('touchmove', function (e) {
      var delta = tStartX - e.touches[0].clientX;
      if (Math.abs(delta) > 4) moved = true;
      container.scrollLeft = clamp(tStartScroll + delta);
    }, { passive: true });

    /* Scroll wheel */
    container.addEventListener('wheel', function (e) {
      e.preventDefault();
      container.scrollLeft = clamp(container.scrollLeft + e.deltaY);
    }, { passive: false });

    rafId = requestAnimationFrame(tick);

    return {
      setHalfWidth: function (w) { halfWidth = w; },
      wasDragged:   function () { return moved; },
      stop:         function () { cancelAnimationFrame(rafId); }
    };
  }

  /* ══════════════════════════════════════════════════
     MODAL PREMIUM
     Singleton global · Lightbox Behance/Dribbble style.
  ══════════════════════════════════════════════════════ */

  var modal = {
    overlay: null,
    img:     null,
    counter: null,
    gallery: [],
    idx:     0,
    cursorTimer: null,

    build: function () {
      if (document.getElementById('artModalOverlay')) return;

      var overlay = document.createElement('div');
      overlay.className = 'art-modal-overlay';
      overlay.id = 'artModalOverlay';

      overlay.innerHTML = [
        '<button class="art-modal-close" aria-label="Fechar">',
          '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        '</button>',
        '<div class="art-modal">',
          '<div class="art-modal-img-wrap">',
            /* Zona clicável esquerda (anterior) */
            '<div class="art-modal-zone art-modal-zone-prev" aria-label="Anterior"></div>',
            '<img class="art-modal-img" src="" alt="" />',
            /* Zona clicável direita (próxima) */
            '<div class="art-modal-zone art-modal-zone-next" aria-label="Próxima"></div>',
          '</div>',
          '<div class="art-modal-nav">',
            '<button class="art-modal-btn" id="artModalPrev" aria-label="Anterior">',
              '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
            '</button>',
            '<span class="art-modal-counter" id="artModalCounter">1 / 1</span>',
            '<button class="art-modal-btn" id="artModalNext" aria-label="Próximo">',
              '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',
            '</button>',
          '</div>',
        '</div>'
      ].join('');

      document.body.appendChild(overlay);
      this.overlay = overlay;
      this.img     = overlay.querySelector('.art-modal-img');
      this.counter = overlay.querySelector('#artModalCounter');

      var self = this;

      /* Fechar ao clicar no overlay */
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) self.close();
      });
      overlay.querySelector('.art-modal-close').addEventListener('click', function () {
        self.close();
      });

      /* Botões de navegação */
      overlay.querySelector('#artModalPrev').addEventListener('click', function () {
        self.navigate(-1);
      });
      overlay.querySelector('#artModalNext').addEventListener('click', function () {
        self.navigate(1);
      });

      /* Click zones: metade esquerda = prev, metade direita = next */
      overlay.querySelector('.art-modal-zone-prev').addEventListener('click', function () {
        self.navigate(-1);
      });
      overlay.querySelector('.art-modal-zone-next').addEventListener('click', function () {
        self.navigate(1);
      });

      /* Teclado */
      document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('is-open')) return;
        if (e.key === 'Escape')     self.close();
        if (e.key === 'ArrowLeft')  self.navigate(-1);
        if (e.key === 'ArrowRight') self.navigate(1);
      });

      /* Swipe touch */
      var tX = 0;
      overlay.addEventListener('touchstart', function (e) {
        tX = e.touches[0].clientX;
      }, { passive: true });
      overlay.addEventListener('touchend', function (e) {
        var delta = e.changedTouches[0].clientX - tX;
        if (Math.abs(delta) > 50) self.navigate(delta < 0 ? 1 : -1);
      }, { passive: true });

      /* Cursor auto-hide estilo Netflix/Vimeo */
      overlay.addEventListener('mousemove', function () {
        overlay.classList.remove('cursor-hidden');
        clearTimeout(self.cursorTimer);
        self.cursorTimer = setTimeout(function () {
          if (overlay.classList.contains('is-open')) {
            overlay.classList.add('cursor-hidden');
          }
        }, 2500);
      });
    },

    open: function (galleryData, idx) {
      this.gallery = galleryData;
      this.idx     = idx;
      this.render();
      this.overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      /* Ativa cursor-hide timer */
      var self = this;
      clearTimeout(self.cursorTimer);
      self.cursorTimer = setTimeout(function () {
        self.overlay.classList.add('cursor-hidden');
      }, 2500);
    },

    close: function () {
      this.overlay.classList.remove('is-open');
      this.overlay.classList.remove('cursor-hidden');
      clearTimeout(this.cursorTimer);
      document.body.style.overflow = '';
    },

    navigate: function (dir) {
      this.idx = (this.idx + dir + this.gallery.length) % this.gallery.length;
      this.render();
    },

    render: function () {
      var item = this.gallery[this.idx];
      var img  = this.img;

      img.style.transition = 'opacity .25s ease';
      img.style.opacity    = '0';

      setTimeout(function () {
        img.src = item.src;
        img.alt = item.alt || '';
        img.style.opacity = '1';
      }, 220);

      this.counter.textContent = (this.idx + 1) + ' / ' + this.gallery.length;
    }
  };

  /* ══════════════════════════════════════════════════
     UTILITÁRIOS
  ══════════════════════════════════════════════════════ */

  function addViewHint(card, label) {
    var hint = document.createElement('div');
    hint.className = 'art-view-hint';
    hint.textContent = label || '↗ Ver em tamanho real';
    card.appendChild(hint);
  }

  function observeFade(els, baseDelay) {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04 });
    els.forEach(function (el, i) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(16px)';
      el.style.transition =
        'opacity .45s ease ' + ((baseDelay || 0) + i * 55) + 'ms, ' +
        'transform .45s ' + EASE + ' ' + ((baseDelay || 0) + i * 55) + 'ms';
      io.observe(el);
    });
  }

  function makeCard(item, i, clickCb) {
    /* Factory compartilhada por banners e feedbacks */
  }

  /* ══════════════════════════════════════════════════
     1. GALERIA DE BANNERS — AUTO-SCROLL INFINITO
  ══════════════════════════════════════════════════════ */

  function buildBannerGallery() {
    var servicos = document.getElementById('servicos');
    if (!servicos) return;

    /* Localizar scroller original */
    var bannerScroller = null;
    servicos.querySelectorAll('[style*="overflow"][style*="scroll"], [style*="overflow-x"]').forEach(function (el) {
      if (el.querySelectorAll('img').length >= 4) bannerScroller = el;
    });
    if (!bannerScroller) bannerScroller = servicos.querySelector('[style*="scrollbar-width"]');
    if (!bannerScroller) { console.warn('[Director] Banner scroller não encontrado'); return; }

    /* Extrair imagens únicas */
    var bannerData = [];
    bannerScroller.querySelectorAll('img').forEach(function (img) {
      var src = img.src || img.getAttribute('src') || '';
      if (src && !bannerData.find(function (d) { return d.src === src; })) {
        bannerData.push({ src: src, alt: img.alt || 'Banner Esportivo' });
      }
    });
    if (bannerData.length === 0) return;

    var bannerWrapper = bannerScroller.closest('section') || bannerScroller.parentElement;

    /* Nova seção */
    var section = document.createElement('div');
    section.className = 'art-banner-section';

    var header = document.createElement('div');
    header.className = 'art-banner-header';
    header.innerHTML = [
      '<div>',
        '<div class="art-banner-label">Design Esportivo</div>',
        '<div class="art-banner-title">Banners que<br>vendem de verdade</div>',
      '</div>',
      '<div class="art-banner-count">' + bannerData.length + ' peças</div>'
    ].join('');

    /* Track — overflow hidden, scroll via RAF */
    var track = document.createElement('div');
    track.className = 'art-banner-track';
    track.style.cursor = 'grab';

    function createBannerCard(item, i) {
      var card  = document.createElement('div');
      card.className    = 'art-banner-item';
      card.dataset.index = i;

      var frame = document.createElement('div');
      frame.className = 'art-banner-frame';

      var img     = document.createElement('img');
      img.src     = item.src;
      img.alt     = item.alt;
      img.loading = 'lazy';
      img.draggable = false;

      frame.appendChild(img);
      card.appendChild(frame);
      addViewHint(card, '↗ Ver arte completa');
      return card;
    }

    /* Original + clone para loop */
    bannerData.forEach(function (item, i) {
      track.appendChild(createBannerCard(item, i));
    });
    bannerData.forEach(function (item, i) {
      var clone = createBannerCard(item, i);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    /* Event delegation — funciona em originais e clones */
    track.addEventListener('click', function (e) {
      if (marquee.wasDragged()) return;
      var card = e.target.closest('.art-banner-item');
      if (!card) return;
      var idx = parseInt(card.dataset.index, 10) % bannerData.length;
      modal.open(bannerData, idx);
    });

    var hint = document.createElement('div');
    hint.className = 'art-banner-scroll-hint';
    hint.innerHTML = '<span></span>Arraste para explorar · Clique para ampliar';

    section.appendChild(header);
    section.appendChild(track);
    section.appendChild(hint);

    bannerWrapper.parentNode.insertBefore(section, bannerWrapper);
    bannerWrapper.style.display = 'none';

    /* Iniciar marquee após DOM render (medir halfWidth) */
    var marquee = createMarquee(track, 0.35); /* lento, elegante */
    requestAnimationFrame(function () {
      marquee.setHalfWidth(track.scrollWidth / 2);
    });

    observeFade(
      Array.from(track.querySelectorAll('.art-banner-item')).slice(0, bannerData.length),
      0
    );
    console.log('[Director] Banner gallery: ' + bannerData.length + ' ✓');
  }

  /* ══════════════════════════════════════════════════
     2. MASONRY DE RESULTADOS (dentro de #cases)
  ══════════════════════════════════════════════════════ */

  function buildResultsMasonry() {
    var cases = document.getElementById('cases');
    if (!cases) return;

    var allBtns = Array.from(cases.querySelectorAll('button[aria-label*="Ampliar"]'));
    if (allBtns.length === 0) { console.warn('[Director] Botões "Ampliar" não encontrados'); return; }

    var resultBtns = allBtns.filter(function (b) {
      var src = ((b.querySelector('img') || {}).src || '').toLowerCase();
      return src.includes('resultado') || src.includes('screenshot');
    });
    var feedbackBtns = allBtns.filter(function (b) {
      var src = ((b.querySelector('img') || {}).src || '').toLowerCase();
      return src.includes('feedback');
    });

    if (!resultBtns.length && !feedbackBtns.length) {
      var half = Math.ceil(allBtns.length / 2);
      resultBtns   = allBtns.slice(0, half);
      feedbackBtns = allBtns.slice(half);
    }

    var resultData = resultBtns.map(function (btn, i) {
      var img   = btn.querySelector('img');
      var label = (btn.querySelector('[class*="text-[10px]"]') || {}).textContent || 'Resultado';
      return { src: img ? img.src : '', alt: (img ? img.alt : '') || 'Resultado ' + (i+1), label: label.trim() };
    }).filter(function (d) { return d.src; });

    if (!resultData.length) return feedbackBtns;

    var firstBtn     = resultBtns[0];
    var gridContainer = firstBtn.closest('[class*="grid"]') || firstBtn.parentElement;
    while (gridContainer && gridContainer !== cases) {
      if ((gridContainer.className || '').includes('grid') || gridContainer.children.length >= resultBtns.length) break;
      gridContainer = gridContainer.parentElement;
    }

    var wrap = document.createElement('div');
    wrap.className = 'art-results-wrap';

    var labelEl = document.createElement('div');
    labelEl.className = 'art-results-label';
    labelEl.innerHTML = [
      '<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">',
        '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>',
        '<polyline points="16 7 22 7 22 13"/>',
      '</svg>',
      'Resultados reais'
    ].join('');

    var grid = document.createElement('div');
    grid.className = 'art-results-grid';

    resultData.forEach(function (item, i) {
      var card     = document.createElement('div');
      card.className = 'art-result-item' + (i === 0 ? ' featured' : '');
      card.style.cursor = 'pointer';

      var img     = document.createElement('img');
      img.src     = item.src;
      img.alt     = item.alt;
      img.loading = 'lazy';

      var overlay = document.createElement('div');
      overlay.className = 'art-result-overlay';
      var tag = document.createElement('span');
      tag.className   = 'art-result-tag';
      tag.textContent = item.label || 'Resultado';
      overlay.appendChild(tag);

      card.appendChild(img);
      card.appendChild(overlay);
      card.addEventListener('click', function () { modal.open(resultData, i); });
      grid.appendChild(card);
    });

    wrap.appendChild(labelEl);
    wrap.appendChild(grid);

    if (gridContainer && gridContainer !== cases) {
      gridContainer.parentNode.insertBefore(wrap, gridContainer);
      gridContainer.style.display = 'none';
    } else {
      firstBtn.parentElement.appendChild(wrap);
    }

    observeFade(Array.from(grid.querySelectorAll('.art-result-item')), 100);
    console.log('[Director] Results masonry: ' + resultData.length + ' ✓');
    return feedbackBtns;
  }

  /* ══════════════════════════════════════════════════
     3. CARROSSEL DE FEEDBACKS — MARQUEE INFINITO
     Auto-scroll · Pause on hover · Drag · Touch
  ══════════════════════════════════════════════════════ */

  function buildFeedbackStrip(feedbackBtns) {
    var cases = document.getElementById('cases');
    if (!cases) return;

    if (!feedbackBtns || !feedbackBtns.length) {
      feedbackBtns = Array.from(cases.querySelectorAll('button[aria-label*="Ampliar"]')).filter(function (b) {
        return ((b.querySelector('img') || {}).src || '').toLowerCase().includes('feedback');
      });
    }
    if (!feedbackBtns.length) { console.warn('[Director] Feedback buttons não encontrados'); return; }

    var feedbackData = feedbackBtns.map(function (btn, i) {
      var img = btn.querySelector('img');
      return { src: img ? img.src : '', alt: (img ? img.alt : '') || 'Feedback ' + (i+1) };
    }).filter(function (d) { return d.src; });

    if (!feedbackData.length) return;

    var firstBtn     = feedbackBtns[0];
    var feedbackGrid = firstBtn.closest('[class*="grid"]') || firstBtn.parentElement;
    while (feedbackGrid && feedbackGrid !== cases) {
      if ((feedbackGrid.className || '').includes('grid') || feedbackGrid.children.length >= feedbackBtns.length) break;
      feedbackGrid = feedbackGrid.parentElement;
    }

    var wrap = document.createElement('div');
    wrap.className = 'art-feedback-wrap';

    var labelEl = document.createElement('div');
    labelEl.className = 'art-feedback-label';
    labelEl.innerHTML = [
      '<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">',
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      '</svg>',
      'O que os clientes dizem'
    ].join('');

    /* Strip — overflow hidden, controlado pelo RAF */
    var strip = document.createElement('div');
    strip.className = 'art-feedback-strip';

    function createFeedbackCard(item, i) {
      var card    = document.createElement('div');
      card.className     = 'art-feedback-card';
      card.dataset.index = i;

      var img     = document.createElement('img');
      img.src     = item.src;
      img.alt     = item.alt;
      img.loading = 'lazy';
      img.draggable = false;

      card.appendChild(img);
      addViewHint(card, '↗ Ver completo');
      return card;
    }

    /* Original + clone para loop infinito */
    feedbackData.forEach(function (item, i) {
      strip.appendChild(createFeedbackCard(item, i));
    });
    feedbackData.forEach(function (item, i) {
      var clone = createFeedbackCard(item, i);
      clone.setAttribute('aria-hidden', 'true');
      strip.appendChild(clone);
    });

    /* Event delegation — abre modal (funciona em clones também) */
    var feedbackMarquee;
    strip.addEventListener('click', function (e) {
      if (feedbackMarquee && feedbackMarquee.wasDragged()) return;
      var card = e.target.closest('.art-feedback-card');
      if (!card) return;
      var idx = parseInt(card.dataset.index, 10) % feedbackData.length;
      modal.open(feedbackData, idx);
    });

    var cta = document.createElement('div');
    cta.className = 'art-proof-cta';
    cta.innerHTML = [
      '<a href="#cta">',
        'Quero resultados assim',
        '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">',
          '<line x1="5" y1="12" x2="19" y2="12"/>',
          '<polyline points="12 5 19 12 12 19"/>',
        '</svg>',
      '</a>'
    ].join('');

    wrap.appendChild(labelEl);
    wrap.appendChild(strip);
    wrap.appendChild(cta);

    if (feedbackGrid && feedbackGrid !== cases) {
      feedbackGrid.parentNode.insertBefore(wrap, feedbackGrid);
      feedbackGrid.style.display = 'none';
    } else {
      firstBtn.parentElement.appendChild(wrap);
    }

    /* Iniciar marquee após DOM render */
    feedbackMarquee = createMarquee(strip, 0.55); /* mais rápido que banners */
    requestAnimationFrame(function () {
      feedbackMarquee.setHalfWidth(strip.scrollWidth / 2);
    });

    observeFade(
      Array.from(strip.querySelectorAll('.art-feedback-card')).slice(0, feedbackData.length),
      80
    );
    console.log('[Director] Feedback marquee: ' + feedbackData.length + ' ✓');
  }

  /* ══════════════════════════════════════════════════
     4B. MÉTRICAS DE AUTORIDADE
     Substitui o grid de métricas com:
     - Dados atualizados (500+, 471+, 7 dias, 100%)
     - Count-up ao entrar na viewport
     - 4 colunas no desktop, 2×2 no mobile
     - Hover microanimação
  ══════════════════════════════════════════════════════ */

  var METRICS = [
    { target: 500, suffix: '+',    label: 'Lojas Entregues',               sub: 'Shopify, Nuvemshop e WooCommerce'         },
    { target: 471, suffix: '+',    label: 'Produtos Prontos',               sub: 'Catálogo pronto para importar'  },
    { target: 7,   suffix: ' Dias',label: 'Prazo Médio de Entrega',         sub: 'Do briefing ao site no ar'                },
    { target: 100, suffix: '%',    label: 'Projetos Aprovados',             sub: 'Todos os projetos entregues e aprovados'  }
  ];

  function countUp(el, target, suffix, duration) {
    var start = null;
    var from  = 0;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var val      = Math.round(from + (target - from) * eased);
      el.innerHTML = val + '<span>' + suffix + '</span>';
      if (progress < 1) requestAnimationFrame(step);
      else el.innerHTML = target + '<span>' + suffix + '</span>';
    }
    requestAnimationFrame(step);
  }

  function buildMetrics() {
    /* ── LIMPEZA: remove qualquer injeção anterior ── */
    document.querySelectorAll('.art-metrics-grid').forEach(function (el) { el.remove(); });
    /* Restaura cards escondidos de tentativas anteriores */
    document.querySelectorAll('[class*="text-center"][class*="p-8"]').forEach(function (el) {
      el.style.display = '';
    });

    /* ── LOCALIZAÇÃO: encontrar o container com os 4 cards ──
       Estratégia: subir a partir de "Lojas Entregues" (texto folha)
       até encontrar um ancestral com 4+ filhos diretos.
    ── */
    var gridEl = null;
    var allNodes = document.querySelectorAll('*');

    for (var i = 0; i < allNodes.length; i++) {
      var node = allNodes[i];
      if (node.children.length === 0 && node.textContent.trim() === 'Lojas Entregues') {
        var cursor = node.parentElement;
        while (cursor && cursor !== document.body) {
          if (cursor.children.length >= 4) {
            gridEl = cursor;
            break;
          }
          cursor = cursor.parentElement;
        }
        break;
      }
    }

    if (!gridEl) {
      /* Fallback: qualquer grid com 4 cards text-center */
      document.querySelectorAll('[class*="grid"]').forEach(function (el) {
        var cards = el.querySelectorAll('[class*="text-center"][class*="p-8"]');
        if (cards.length >= 3 && !gridEl) gridEl = el;
      });
    }

    if (!gridEl) { console.warn('[Director] Metrics container não encontrado'); return; }

    /* ── RECONSTRUÇÃO: limpa TUDO e insere 4 cards novos ── */
    while (gridEl.firstChild) gridEl.removeChild(gridEl.firstChild);

    /* Aplica a classe que define o layout (4 colunas → 2×2 no mobile) */
    gridEl.className = 'art-metrics-grid';
    gridEl.removeAttribute('style');

    var valueEls = [];

    METRICS.forEach(function (m) {
      var card = document.createElement('div');
      card.className = 'art-metric-card';

      var val = document.createElement('div');
      val.className = 'art-metric-value';
      val.innerHTML = '0<span>' + m.suffix + '</span>';

      var lbl = document.createElement('div');
      lbl.className = 'art-metric-label';
      lbl.textContent = m.label;

      var sub = document.createElement('div');
      sub.className = 'art-metric-sub';
      sub.textContent = m.sub;

      card.appendChild(val);
      card.appendChild(lbl);
      card.appendChild(sub);
      gridEl.appendChild(card);
      valueEls.push({ el: val, target: m.target, suffix: m.suffix });
    });

    /* ── ANIMAÇÃO: count-up ao entrar na viewport ── */
    if ('IntersectionObserver' in window) {
      var triggered = false;
      var io = new IntersectionObserver(function (entries) {
        if (triggered) return;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          triggered = true;
          valueEls.forEach(function (item, i) {
            setTimeout(function () {
              countUp(item.el, item.target, item.suffix, 1400);
            }, i * 120);
          });
          io.disconnect();
        });
      }, { threshold: 0.2 });
      io.observe(gridEl);
    }

    console.log('[Director] Metrics: 4 cards ✓');
  }

  /* ══════════════════════════════════════════════════
     5. COPA 2026 — REFINAMENTOS SUTIS
  ══════════════════════════════════════════════════════ */

  function refineCopa() {
    var copa = document.getElementById('copa2026');
    if (!copa) return;

    copa.querySelectorAll('[class*="cursor-pointer"]').forEach(function (card) {
      card.style.transition = 'transform 300ms ' + EASE + ', box-shadow 300ms ease';
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px) scale(1.04)';
        this.style.boxShadow = '0 12px 32px rgba(0,0,0,.4)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });

    copa.querySelectorAll('[style*="aspect-ratio"] img').forEach(function (img) {
      img.style.padding = '10px';
    });

    console.log('[Director] Copa 2026 ✓');
  }

  /* ══════════════════════════════════════════════════
     5. SCROLL WHEEL EM CAROUSELS EXISTENTES
  ══════════════════════════════════════════════════════ */

  function enableWheelOnCarousels() {
    document.querySelectorAll('[style*="scrollbar-width:none"], [style*="overflow-x: auto"], [style*="overflow-x:auto"]').forEach(function (el) {
      if (el.dataset.wheelEnabled) return;
      el.dataset.wheelEnabled = '1';
      el.addEventListener('wheel', function (e) {
        if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
        }
      }, { passive: false });
    });
  }

  /* ══════════════════════════════════════════════════
     6. INJETAR CSS
  ══════════════════════════════════════════════════════ */

  function injectDirectorCSS() {
    if (document.querySelector('link[href*="director.css"]')) return;
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = '/director.css';
    document.head.appendChild(link);
  }

  /* ══════════════════════════════════════════════════
     INICIALIZAÇÃO
  ══════════════════════════════════════════════════════ */

  function init() {
    injectDirectorCSS();
    modal.build();

    setTimeout(function () {
      buildBannerGallery();
      var feedbackBtns = buildResultsMasonry();
      buildFeedbackStrip(feedbackBtns);
      buildMetrics();
      refineCopa();
      enableWheelOnCarousels();
      console.log('[Sety Studio] Director v4.0 ativo ✓');
    }, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
