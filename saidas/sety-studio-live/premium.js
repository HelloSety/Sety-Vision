/* ══════════════════════════════════════════════════════
   SETY STUDIO — PREMIUM JS v3.0
   CRO · Chatbot · Botões · Refinamentos
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var WA_BASE = 'https://wa.me/5519988090110?text=';

  var WA = {
    site:       WA_BASE + encodeURIComponent('Olá! Vim pelo site da Sety Studio e quero o plano Loja Essencial (R$600).'),
    seo:        WA_BASE + encodeURIComponent('Olá! Vim pelo site da Sety Studio e quero o plano Loja Profissional + SEO (R$900).'),
    trafego:    WA_BASE + encodeURIComponent('Olá! Vim pelo site da Sety Studio e quero contratar Gestão de Tráfego (R$500/mês).'),
    manutencao: WA_BASE + encodeURIComponent('Olá! Vim pelo site da Sety Studio e quero saber mais sobre Manutenção & Crescimento (R$150/mês).'),
    geral:      WA_BASE + encodeURIComponent('Olá! Vim pelo site e gostaria de solicitar um orçamento.')
  };

  /* ══════════════════════════════════════════════════
     1. REFINAMENTOS VISUAIS
  ══════════════════════════════════════════════════════ */

  function refinements() {
    /* Banners: object-contain */
    document.querySelectorAll('[style*="scrollbar-width:none"] img').forEach(function (img) {
      img.style.objectFit = 'contain';
      var parent = img.closest('[style*="aspect-ratio"]');
      if (parent) parent.style.background = '#0a0a0d';
    });

    /* Resultados: frame elegante */
    document.querySelectorAll('button[aria-label*="Ampliar"]').forEach(function (btn) {
      var img = btn.querySelector('img');
      if (img) { img.style.padding = '4px'; img.style.objectFit = 'contain'; }
      var label = btn.querySelector('span[class*="text-[10px]"]');
      if (label) {
        label.style.fontSize = '11px';
        label.style.fontWeight = '700';
        label.style.padding = '4px 8px';
        label.style.borderRadius = '8px';
        label.style.backdropFilter = 'blur(8px)';
      }
    });

    /* Scroll suave em carousels */
    document.querySelectorAll('[style*="scrollbar-width:none"]').forEach(function (el) {
      el.addEventListener('wheel', function (e) {
        if (e.deltaY !== 0) { e.preventDefault(); el.scrollLeft += e.deltaY * 1.2; }
      }, { passive: false });
    });

    /* IntersectionObserver nos cards */
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('p-visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('button[aria-label*="Ampliar"]').forEach(function (el, i) {
        el.style.transitionDelay = (i * 60) + 'ms';
        obs.observe(el);
      });
    }

    console.log('[Sety Studio] Refinements ✓');
  }

  /* ══════════════════════════════════════════════════
     2. BOTÕES DOS PACOTES — mensagens individuais por plano
  ══════════════════════════════════════════════════════ */

  function fixPackageButtons() {
    var planos = document.getElementById('planos');
    if (!planos) return;

    /* Os 3 botões CTA dos planos — ordem: LOJA ESSENCIAL, LOJA PROFISSIONAL + SEO, TRÁFEGO PAGO */
    var btns = Array.from(planos.querySelectorAll('a[href*="wa.me"]')).filter(function (a) {
      return a.closest('[class*="rounded-3xl"]') || a.closest('[class*="card"]');
    });

    /* Fallback: pegar todos os links WA dentro de planos */
    if (btns.length < 3) {
      btns = Array.from(planos.querySelectorAll('a[href*="wa.me"]'));
    }

    var configs = [
      { href: WA.site,    text: '👉 Solicitar orçamento' },
      { href: WA.seo,     text: '👉 Solicitar orçamento' },
      { href: WA.trafego, text: '👉 Solicitar orçamento' }
    ];

    btns.forEach(function (btn, i) {
      if (i >= configs.length) return;
      btn.href = configs[i].href;
      /* Preservar ícone SVG se existir */
      var svg = btn.querySelector('svg');
      btn.textContent = configs[i].text;
      if (svg) btn.appendChild(svg);
    });

    console.log('[Sety Studio] Package buttons: ' + Math.min(btns.length, 3) + ' ✓');
  }

  /* ══════════════════════════════════════════════════
     2b. PLANOS — conteúdo dos cards (título, preço, prazo,
     descrição e itens)
     Atualizado em 2026-08-01: reposicionado pra loja virtual
     (Shopify/Nuvemshop) em vez de site institucional — LOJA
     ESSENCIAL (R$600, de R$800) / LOJA PROFISSIONAL + SEO
     (R$900, de R$1.200, mantém badge "mais escolhido") /
     TRÁFEGO PAGO (R$500/mês). Preço antigo riscado + preço
     promocional + economia em todo card com desconto.
  ══════════════════════════════════════════════════════ */

  function checkSvg(colorClass) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 shrink-0 ' + colorClass + '" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
  }

  function buildFeatureList(items, colorClass) {
    return items.map(function (t) {
      return '<li class="flex items-start gap-2.5 text-[13px] text-[#374151]">' + checkSvg(colorClass) + t + '</li>';
    }).join('');
  }

  function fixPlanCards() {
    var planos = document.getElementById('planos');
    if (!planos) return;
    var grid = planos.querySelector('[class*="grid"]');
    if (!grid) return;
    var cards = Array.from(grid.children);
    if (cards.length < 3) return;

    /* Título + subtítulo ficam no 2º filho do header (1º é o ícone) */
    function setHeader(card, title, subtitle) {
      var box = card.querySelector('.flex.items-center.gap-3.mb-6 > div:last-child');
      if (!box) return;
      var divs = box.querySelectorAll('div');
      if (divs[0]) divs[0].textContent = title;
      if (divs[1]) divs[1].textContent = subtitle;
    }

    /* Bloco de preço — reconstruído inteiro pra suportar riscado + economia */
    function setPriceBlock(card, html) {
      var box = card.querySelector('.mb-2');
      if (box) box.innerHTML = html;
    }

    /* Badge de prazo — 2º span (1º é o emoji ⏱) */
    function setTimeBadge(card, text) {
      var badge = card.querySelector('div.mb-6.p-3');
      if (!badge) return;
      var spans = badge.querySelectorAll('span');
      if (spans[1]) spans[1].textContent = text;
    }

    /* LOJA ESSENCIAL (antes: START) */
    (function () {
      var card = cards[0];
      setHeader(card, 'LOJA ESSENCIAL', 'Ideal para começar a vender');
      setPriceBlock(card,
        '<div class="text-[#9CA3AF] text-[11px] mb-1 font-medium uppercase tracking-wider flex items-center gap-2">' +
          '<span class="line-through">R$ 800</span>' +
          '<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold normal-case tracking-normal">-25% OFF</span>' +
        '</div>' +
        '<div class="font-black tracking-tight leading-none text-[#111827] text-4xl" style="font-family:var(--font-montserrat), sans-serif">R$ 600</div>' +
        '<div class="text-[12px] font-semibold mt-1.5 text-emerald-600">💰 Economia de R$ 200</div>'
      );
      var desc = card.querySelector('p');
      if (desc) desc.textContent = 'Loja Shopify personalizada para você começar a vender online com estrutura profissional.';
      setTimeBadge(card, '7 dias úteis');
      var ul = card.querySelector('ul');
      if (ul) {
        ul.innerHTML = buildFeatureList([
          'Loja Shopify personalizada',
          'Design moderno e responsivo',
          'Até 150 produtos cadastrados',
          'Até 2 banners profissionais',
          'Organização de categorias e coleções',
          'Página de produto otimizada',
          'Integração com WhatsApp',
          'Configuração básica de SEO',
          'Loja otimizada para celular'
        ], 'text-emerald-500');
      }
    })();

    /* LOJA PROFISSIONAL + SEO (antes: PROFISSIONAL) — mantém badge "mais escolhido" */
    (function () {
      var card = cards[1];
      setHeader(card, 'LOJA PROFISSIONAL + SEO', 'Mais escolhido');
      setPriceBlock(card,
        '<div class="text-[#9CA3AF] text-[11px] mb-1 font-medium uppercase tracking-wider flex items-center gap-2">' +
          '<span class="line-through">R$ 1.200</span>' +
          '<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold normal-case tracking-normal">-25% OFF</span>' +
        '</div>' +
        '<div class="font-black tracking-tight leading-none text-[#0057FF] text-5xl" style="font-family:var(--font-montserrat), sans-serif">R$ 900</div>' +
        '<div class="text-[#6B7280] text-[12px] font-medium mt-1.5">ou 3x de R$ 300 sem juros</div>' +
        '<div class="text-[12px] font-semibold mt-1 text-emerald-600">💰 Economia de R$ 300</div>'
      );
      var desc = card.querySelector('p');
      if (desc) desc.textContent = 'Loja completa na Shopify ou Nuvemshop, com SEO avançado e tudo pronto pra crescer e vender todo dia.';
      setTimeBadge(card, '10 a 15 dias úteis');
      var ul = card.querySelector('ul');
      if (ul) {
        ul.innerHTML = buildFeatureList([
          'Loja Shopify ou Nuvemshop premium',
          'Design exclusivo da marca',
          'Até 300 produtos cadastrados',
          'Até 3 banners profissionais',
          'Até 6 categorias estruturadas',
          'Página de produto otimizada para conversão',
          'SEO avançado inicial',
          'Google Analytics configurado',
          'Google Search Console configurado',
          'Pixel Meta Ads instalado',
          'Estrutura preparada para anúncios'
        ], 'text-[#0057FF]');
      }
    })();

    /* TRÁFEGO PAGO (antes: PERSONALIZADO) */
    (function () {
      var card = cards[2];
      setHeader(card, 'TRÁFEGO PAGO', 'Gestão mensal de anúncios');
      setPriceBlock(card,
        '<div class="text-[#9CA3AF] text-[11px] mb-0.5 font-medium uppercase tracking-wider">gestão mensal</div>' +
        '<div class="font-black tracking-tight leading-none text-[#111827] text-4xl" style="font-family:var(--font-montserrat), sans-serif">R$ 500<span class="text-lg text-[#9CA3AF] font-bold"> /mês</span></div>' +
        '<div class="text-[#6B7280] text-[12px] font-medium mt-1.5">sem fidelidade, cancele quando quiser</div>'
      );
      var desc = card.querySelector('p');
      if (desc) desc.textContent = 'Transforme visitantes em clientes com anúncios no Meta Ads, criados e otimizados todo mês.';
      setTimeBadge(card, 'Início em até 5 dias úteis');
      var ul = card.querySelector('ul');
      if (ul) {
        ul.innerHTML = buildFeatureList([
          'Planejamento de campanhas',
          'Configuração e gestão do Meta Ads',
          'Criação de anúncios',
          'Até 8 criativos mensais',
          'Testes A/B de campanhas',
          'Otimização semanal',
          'Monitoramento de resultados',
          'Estratégia de escala',
          'Relatório mensal de resultados'
        ], 'text-emerald-500');
      }
    })();

    console.log('[Sety Studio] Plan cards updated (Loja Virtual) ✓');
  }

  /* ══════════════════════════════════════════════════
     2c. HERO — copy mais curta + CTA forte + poster do VSL
     Atualizado em 2026-07-31: headline enxuta, CTA com
     benefício explícito (grátis + agora), poster no vídeo
     pra melhorar a percepção de carregamento (LCP).
     Usa MutationObserver porque são mudanças em conteúdo
     hidratado pelo React — sem isso, o React reverte.
  ══════════════════════════════════════════════════════ */

  function injectHeroLayoutCSS() {
    if (document.getElementById('sety-hero-layout')) return;
    var css = document.createElement('style');
    css.id = 'sety-hero-layout';
    css.textContent =
      '@media (max-width: 1023px){' +
      '  section:has(h1){min-height:auto !important;align-items:flex-start !important;}' +
      '  section:has(h1) > [class*="pt-28"]{padding-top:5.5rem !important;padding-bottom:2.5rem !important;}' +
      '  section:has(h1) [class*="grid-cols-1"]{gap:2rem !important;}' +
      '  section:has(h1) video{aspect-ratio:16/10 !important;}' +
      '}';
    document.head.appendChild(css);
  }

  function ensureHero() {
    /* Não há id="hero" real nesta página — usar seletores diretos
       (h1/video são únicos na home; .btn-primary com wa.me pega o
       primeiro, que é sempre o do hero por vir antes no DOM). */
    injectHeroLayoutCSS();

    var h1 = document.querySelector('h1');
    if (h1 && h1.dataset.setyFixed !== '1') {
      h1.innerHTML = 'Sites e Lojas Virtuais que <span class="grad-text">Vendem</span> <span class="grad-text">Todo Dia</span>';
      h1.dataset.setyFixed = '1';
      h1.style.fontSize = 'clamp(2.6rem, 7vw, 4.8rem)';
      h1.style.lineHeight = '1.08';
      h1.style.maxWidth = '780px';

      var p = h1.nextElementSibling;
      if (p && p.tagName === 'P') {
        p.textContent = 'Do briefing ao ar em 48h. Pronto pra vender online.';
        p.style.fontSize = '1.2rem';
        p.style.maxWidth = '480px';
        p.style.margin = '0 auto';
      }

      var badge = h1.previousElementSibling;
      if (badge && badge.className.indexOf('badge') > -1) {
        var dot = badge.querySelector('span');
        badge.textContent = 'Sites e Lojas Virtuais Profissionais';
        if (dot) badge.insertBefore(dot, badge.firstChild);
      }

      /* Hierarquia: bloco inteiro centralizado, com respiro proposital
         entre badge/H1/subtítulo/CTA/stats — pedido do Seven porque o
         texto curto ficava "solto" no espaço em vez de parecer clean. */
      var container = h1.parentElement;
      if (container) {
        container.style.textAlign = 'center';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.gap = '1.75rem';
        container.style.marginLeft = 'auto';
        container.style.marginRight = 'auto';
      }
    }

    var ctaLink = h1 && h1.parentElement && h1.parentElement.querySelector('a.btn-primary[href*="wa.me"]');
    if (ctaLink && ctaLink.dataset.setyFixed !== '1') {
      /* Nunca usar a substring "orçamento grát" aqui — removeDeadLinks()
         mais abaixo remove qualquer CTA com esse texto (já aconteceu:
         o botão sumiu porque caiu no próprio filtro de limpeza). */
      var svg = ctaLink.querySelector('svg');
      ctaLink.textContent = 'Quero começar agora';
      if (svg) ctaLink.appendChild(svg);
      ctaLink.dataset.setyFixed = '1';
      ctaLink.style.padding = '1.05rem 2.25rem';
      ctaLink.style.fontSize = '1rem';

      var ctaWrapper = ctaLink.parentElement;
      if (ctaWrapper) {
        ctaWrapper.style.justifyContent = 'center';
        ctaWrapper.style.width = '100%';
      }

      var statsWrapper = ctaWrapper && ctaWrapper.nextElementSibling;
      if (statsWrapper) {
        statsWrapper.style.justifyContent = 'center';
        statsWrapper.style.gap = '3rem';
        statsWrapper.style.width = '100%';
        Array.prototype.forEach.call(statsWrapper.querySelectorAll('span:first-child'), function (n) {
          n.style.fontSize = '1.85rem';
        });
      }
    }

    var video = document.querySelector('video');
    if (video && !video.poster) {
      video.setAttribute('poster', '/vsl/poster.jpg');
    }

    /* Mockups flutuantes ao redor da VSL: troca "Loja Esportiva"
       (Empório Norte Belém) por Fist Street. Underz Store e Lulu
       Imports já são os cases certos, mantidos como estão. */
    var mockupImg = document.querySelector('img[alt="Empório Norte Belém"]');
    if (mockupImg && mockupImg.dataset.setyFixed !== '1') {
      mockupImg.src = '/portfolio/screenshots/fist-street.png';
      mockupImg.alt = 'Fist Street';
      mockupImg.dataset.setyFixed = '1';
      var label = mockupImg.parentElement && mockupImg.parentElement.lastElementChild;
      if (label) label.textContent = 'Fist Street';
    }
  }

  /* ══════════════════════════════════════════════════
     2d. POSICIONAMENTO GENÉRICO — Seven pediu pra tirar o
     nicho "esportivo" do site inteiro: ele vende site e
     loja virtual pra qualquer lojista, não só esportivo.
     Troca por nó de texto (mais robusto que mapear cada
     seletor) — roda 1x por nó porque cada troca já deixa
     de bater com a regra na próxima passada.
  ══════════════════════════════════════════════════════ */

  var TEXT_REPLACEMENTS = [
    ['Especialistas em criação de lojas esportivas. Sites para vender camisas de time, uniformes e marcas esportivas.', 'Especialistas em criação de sites e lojas virtuais para todo tipo de negócio.'],
    ['Especialistas em lojas esportivas', 'Especialistas em sites e lojas virtuais'],
    ['6 lojas esportivas', '6 projetos'],
    ['Uniformes Esportivos', 'Sites Institucionais'],
    ['Dropshipping Esportivo', 'Dropshipping'],
    ['SEO Esportivo', 'SEO'],
    ['Marcas Esportivas', 'Marcas e Negócios']
  ];

  function ensureGenericPositioning() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var text = node.nodeValue;
      for (var i = 0; i < TEXT_REPLACEMENTS.length; i++) {
        if (text.indexOf(TEXT_REPLACEMENTS[i][0]) > -1) {
          node.nodeValue = text.split(TEXT_REPLACEMENTS[i][0]).join(TEXT_REPLACEMENTS[i][1]);
        }
      }
    }

    /* Mensagens pré-preenchidas de WhatsApp que mencionam "loja esportiva" */
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      if (a.href.indexOf('loja%20esportiva%20profissional') > -1) {
        a.href = a.href.replace('uma%20loja%20esportiva%20profissional', 'um%20site%20ou%20loja%20profissional');
      }
    });
  }

  function watchHero() {
    ensureHero();
    var obs = new MutationObserver(function () { ensureHero(); });
    obs.observe(document.body, { childList: true, subtree: true });

    /* ensureGenericPositioning roda só num intervalo curto (não a cada
       mutação, é pesada — percorre todo o texto do body) até o conteúdo
       estabilizar após a hidratação, depois para. */
    ensureGenericPositioning();
    var tries = 0;
    var t = setInterval(function () {
      ensureGenericPositioning();
      tries++;
      if (tries >= 5) clearInterval(t);
    }, 500);
  }

  /* ══════════════════════════════════════════════════
     3. PORTFOLIO — screenshots reais + links dos clientes
  ══════════════════════════════════════════════════════ */

  var PORT_SITES = [
    { name: 'Fist Street',        img: '/portfolio/screenshots/fist-street.png',         url: 'https://usefist.com.br/' },
    { name: 'Underz Store',       img: '/portfolio/screenshots/underz-store.png',        url: 'https://loja.underzstore.com/' },
    { name: 'Lulu Imports',       img: '/portfolio/screenshots/lulu-imports.png',        url: 'https://luluimports.com.br/' },
    { name: 'Big GT',             img: '/portfolio/screenshots/sport-kings.png',         url: 'https://biggt.com.br/' },
    { name: 'Loja Vancir Sports', img: '/portfolio/screenshots/vancir-sports.png',       url: 'https://lojavancirsports.com.br/' },
    { name: 'MantoPro',           img: '/portfolio/screenshots/mantopro.png',            url: 'https://mantoprooficial.com.br/' }
  ];

  function fixPortfolioCards() {
    var port = document.getElementById('portfolio');
    if (!port) return;

    var grid = port.querySelector('[class*="grid"]');
    if (!grid) return;

    var cards = Array.from(grid.children);

    /* Atualizar os cards existentes */
    cards.forEach(function (card, i) {
      if (i >= PORT_SITES.length) return;
      var site = PORT_SITES[i];

      var img = card.querySelector('img');
      if (img) { img.src = site.img; img.alt = 'Site ' + site.name; img.loading = 'lazy'; }

      var h3 = card.querySelector('h3');
      if (h3) h3.textContent = site.name;

      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        window.open(site.url, '_blank', 'noopener,noreferrer');
      });
    });

    /* Ocultar 7° card se existir (Tropa do Rei em manutenção) */
    if (cards.length > 6) {
      for (var j = 6; j < cards.length; j++) { cards[j].style.display = 'none'; }
    }

    console.log('[Sety Studio] Portfolio: 6 cards ✓');
  }

  /* ══════════════════════════════════════════════════
     4. LINKS MORTOS + BOTÕES EXTRAS — limpeza de CTAs
  ══════════════════════════════════════════════════════ */

  /* Textos de CTAs espalhados pelo site que devem ser removidos.
     Mantém: botão de Solicitar Orçamento da nav + botões dos 3 pacotes. */
  var REMOVE_BTN_TEXTS = [
    'quero resultados assim',
    'ver planos e valores',
    'solicitar mais cases',
    'solicitar orçamento grát',
    'receber orçamento',
    'orçamento grát',
    'portf'
  ];

  function removeDeadLinks() {
    /* Links para seções removidas */
    ['#portfolio', '#servicos'].forEach(function (hash) {
      document.querySelectorAll('a[href="' + hash + '"]').forEach(function (a) {
        var parent = a.parentElement;
        if (parent && (parent.tagName === 'LI' || parent.tagName === 'SPAN')) {
          parent.remove();
        } else {
          a.remove();
        }
      });
    });

    /* Botões CTA extras — remover qualquer <a> ou <button> com texto na lista */
    document.querySelectorAll('a, button').forEach(function (el) {
      /* Proteger: nav e #planos nunca são tocados */
      if (el.closest('nav') || el.closest('header')) return;
      if (el.closest('#planos')) return;
      if (el.closest('.sety-chat-btn') || el.closest('.sety-chat-win') || el.closest('[class*="sety-chat"]')) return;

      var txt = el.textContent.trim().toLowerCase();
      var shouldRemove = REMOVE_BTN_TEXTS.some(function (s) { return txt.indexOf(s) > -1; });
      if (!shouldRemove) return;

      /* Tentar remover o wrapper pai se for um container isolado */
      var parent = el.parentElement;
      var grandparent = parent ? parent.parentElement : null;

      if (parent && ['LI', 'SPAN', 'DIV'].indexOf(parent.tagName) > -1 && parent.children.length === 1) {
        /* pai tem só esse elemento — pode ser o wrapper do botão */
        if (grandparent && grandparent.children.length === 1) {
          grandparent.remove();
        } else {
          parent.remove();
        }
      } else {
        el.remove();
      }
    });

    console.log('[Sety Studio] Dead links + extra CTAs removed ✓');
  }

  /* Bloco "Gostou do que viu? / Veja nossos planos e valores" entre
     #cases e #planos ficou órfão: o botão "Ver planos e valores" já
     caía em REMOVE_BTN_TEXTS acima e sumia, mas o texto (parágrafo +
     h3) continuava lá sozinho, sem CTA, só ocupando ~110px de altura
     vazia — redundante com o header "PLANOS E INVESTIMENTO" que já
     existe logo abaixo dentro de #planos. Remove o wrapper inteiro. */
  function removeOrphanPlanosCTA() {
    document.querySelectorAll('p').forEach(function (p) {
      if (p.textContent.trim() !== 'Gostou do que viu?') return;
      var wrapper = p.parentElement;
      if (wrapper) wrapper.remove();
    });
  }

  /* ══════════════════════════════════════════════════
     4. CHATBOT — Desktop only / WA button mobile
  ══════════════════════════════════════════════════════ */

  var CHAT_OPTIONS = [
    { id: 'orcamento', label: '💰 Quero um orçamento',       resp: 'Para orçar, preciso de alguns detalhes: qual desses planos te interessa (Loja Essencial, Loja Profissional + SEO ou Tráfego Pago) e qual o prazo ideal pra você? Posso te dar uma resposta em minutos.' },
    { id: 'preco',     label: '💵 Quanto custa?',             resp: 'Temos 3 planos: <strong>Loja Essencial R$600</strong> (de R$800), <strong>Loja Profissional + SEO R$900</strong> (de R$1.200) e <strong>Tráfego Pago R$500/mês</strong>. Preço fixo, sem surpresa. Manutenção &amp; Crescimento (opcional) sai a partir de R$150/mês.' },
    { id: 'prazo',     label: '⏱ Qual é o prazo?',           resp: 'Loja Essencial: <strong>7 dias úteis</strong>. Loja Profissional + SEO: <strong>10 a 15 dias úteis</strong>. Tráfego Pago: <strong>recorrente</strong>, começa assim que o contrato é fechado.' },
    { id: 'plataforma',label: '🛒 Shopify ou WooCommerce?',  resp: 'Depende do seu perfil. <strong>Shopify</strong> é mais fácil de operar. <strong>WooCommerce</strong> tem custo menor de mensalidade. Posso indicar a melhor opção depois de entender seu negócio.' }
  ];

  function buildChatbot() {
    var isMobile = window.innerWidth < 768;

    /* Mobile: botão WA flutuante */
    if (isMobile) {
      var waBtn = document.createElement('a');
      waBtn.href   = WA.geral;
      waBtn.target = '_blank';
      waBtn.rel    = 'noopener noreferrer';
      waBtn.setAttribute('aria-label', 'Falar no WhatsApp');
      waBtn.style.cssText = 'position:fixed;bottom:22px;right:22px;z-index:900;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 22px rgba(37,211,102,0.5);transition:transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s;';
      waBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.559 4.133 1.535 5.867L.057 23.492a.5.5 0 0 0 .609.61l5.716-1.498A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.659-.52-5.17-1.428l-.367-.22-3.812.999.999-3.742-.236-.378A9.979 9.979 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';
      waBtn.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.1)'; });
      waBtn.addEventListener('mouseleave', function () { this.style.transform = ''; });
      document.body.appendChild(waBtn);
      return;
    }

    /* Desktop: chatbot Intercom-style */
    var css = document.createElement('style');
    css.textContent = '.sety-chat-btn{position:fixed;bottom:24px;right:24px;z-index:900;width:54px;height:54px;border-radius:50%;background:#0057FF;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 22px rgba(0,87,255,0.45);transition:transform .25s cubic-bezier(0.22,1,0.36,1),box-shadow .25s;}.sety-chat-btn:hover{transform:scale(1.08);box-shadow:0 8px 32px rgba(0,87,255,0.55);}.sety-chat-notif{position:absolute;top:-2px;right:-2px;width:16px;height:16px;border-radius:50%;background:#EF4444;border:2px solid #fff;font-size:9px;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center;animation:sctn .4s ease 1.2s both;}@keyframes sctn{from{transform:scale(0)}to{transform:scale(1)}}.sety-chat-win{position:fixed;bottom:88px;right:24px;z-index:900;width:340px;background:#fff;border-radius:20px;box-shadow:0 24px 70px rgba(0,0,0,.15),0 4px 20px rgba(0,0,0,.08);border:1px solid rgba(0,0,0,.06);overflow:hidden;transform:scale(.9) translateY(10px);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform .28s cubic-bezier(0.22,1,0.36,1),opacity .22s ease;}.sety-chat-win.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}.sety-chat-hd{background:linear-gradient(135deg,#003FC2,#0057FF);padding:18px 18px 15px;}.sety-chat-hd-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}.sety-chat-av{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;color:#fff;flex-shrink:0;position:relative;}.sety-chat-dot{position:absolute;bottom:0;right:0;width:11px;height:11px;background:#22C55E;border-radius:50%;border:2px solid #0057FF;}.sety-chat-nm{font-weight:800;font-size:13px;color:#fff;}.sety-chat-st{font-size:10px;color:rgba(255,255,255,.7);margin-top:1px;}.sety-chat-gr{font-size:12px;color:rgba(255,255,255,.9);line-height:1.5;}.sety-chat-body{padding:14px;max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;}.sety-chat-bub{background:#F3F4F6;border-radius:10px 10px 10px 3px;padding:10px 14px;font-size:12.5px;color:#374151;line-height:1.6;max-width:92%;align-self:flex-start;animation:bubIn .25s ease;}@keyframes bubIn{from{transform:translateY(6px);opacity:0}to{transform:translateY(0);opacity:1}}.sety-chat-opts{display:flex;flex-direction:column;gap:6px;margin-top:4px;}.sety-chat-opt{background:#EFF6FF;border:1px solid rgba(0,87,255,.12);border-radius:8px;padding:9px 13px;font-size:12px;font-weight:600;color:#0057FF;text-align:left;cursor:pointer;transition:background .18s,border-color .18s,transform .18s;font-family:inherit;}.sety-chat-opt:hover{background:#DBEAFE;border-color:rgba(0,87,255,.3);transform:translateX(2px);}.sety-chat-ans{display:none;flex-direction:column;gap:8px;}.sety-chat-ans.on{display:flex;}.sety-chat-wa{display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:#fff;border-radius:9px;padding:12px;font-size:12.5px;font-weight:700;transition:background .18s,transform .18s;text-decoration:none;margin-top:2px;}.sety-chat-wa:hover{background:#1EBE5A;transform:translateY(-1px);}.sety-chat-back{background:none;border:none;font-family:inherit;font-size:11px;color:#9CA3AF;cursor:pointer;padding:2px;text-align:center;transition:color .18s;}.sety-chat-back:hover{color:#374151;}';
    document.head.appendChild(css);

    var waIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.559 4.133 1.535 5.867L.057 23.492a.5.5 0 0 0 .609.61l5.716-1.498A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.659-.52-5.17-1.428l-.367-.22-3.812.999.999-3.742-.236-.378A9.979 9.979 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

    function buildAns(opt) {
      return '<div class="sety-chat-bub">' + opt.resp + '</div><a href="' + WA.geral + '" target="_blank" rel="noopener noreferrer" class="sety-chat-wa">' + waIcon + 'Falar no WhatsApp</a><button class="sety-chat-back" type="button">← Outras dúvidas</button>';
    }

    var btn = document.createElement('button');
    btn.className = 'sety-chat-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Abrir chat');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="sety-chat-notif" aria-hidden="true">1</span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="ic-chat"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" class="ic-close" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    var win = document.createElement('div');
    win.className = 'sety-chat-win';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat de atendimento');
    win.innerHTML = '<div class="sety-chat-hd"><div class="sety-chat-hd-row"><div class="sety-chat-av">S<span class="sety-chat-dot"></span></div><div><div class="sety-chat-nm">Sety Studio</div><div class="sety-chat-st">Online · Responde em instantes</div></div></div><p class="sety-chat-gr">Oi! Posso te ajudar? 👋</p></div><div class="sety-chat-body" id="setyChatBody"><div class="sety-chat-bub">Olá! Escolha uma opção abaixo.</div><div class="sety-chat-opts" id="setyChatOpts">' + CHAT_OPTIONS.map(function (o) { return '<button class="sety-chat-opt" type="button" data-id="' + o.id + '">' + o.label + '</button>'; }).join('') + '</div>' + CHAT_OPTIONS.map(function (o) { return '<div class="sety-chat-ans" id="setyAns-' + o.id + '">' + buildAns(o) + '</div>'; }).join('') + '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(win);

    btn.addEventListener('click', function () {
      var open = win.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.ic-chat').style.display = open ? 'none' : '';
      btn.querySelector('.ic-close').style.display = open ? '' : 'none';
      var notif = btn.querySelector('.sety-chat-notif');
      if (notif) notif.style.display = 'none';
    });

    document.getElementById('setyChatOpts').addEventListener('click', function (e) {
      var opt = e.target.closest('.sety-chat-opt');
      if (!opt) return;
      var id = opt.dataset.id;
      document.getElementById('setyChatOpts').style.display = 'none';
      var ansEl = document.getElementById('setyAns-' + id);
      if (ansEl) ansEl.classList.add('on');
    });

    win.addEventListener('click', function (e) {
      if (e.target.classList.contains('sety-chat-back')) {
        document.querySelectorAll('.sety-chat-ans.on').forEach(function (el) { el.classList.remove('on'); });
        document.getElementById('setyChatOpts').style.display = 'flex';
      }
    });

    document.addEventListener('click', function (e) {
      if (win.classList.contains('open') && !win.contains(e.target) && !btn.contains(e.target)) {
        win.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.ic-chat').style.display = '';
        btn.querySelector('.ic-close').style.display = 'none';
      }
    });

    console.log('[Sety Studio] Chatbot ✓');
  }

  /* ══════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════ */

  function init() {
    refinements();
    watchHero();
    setTimeout(function () {
      fixPlanCards();
      fixPackageButtons();
      fixPortfolioCards();
      removeDeadLinks();
      removeOrphanPlanosCTA();
      buildChatbot();
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
