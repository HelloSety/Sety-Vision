/* Autênticas Store — página de produto individual (produto.html?id=...&color=...) */

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  function onScroll() { header.classList.toggle('is-compact', window.scrollY > 260); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------- SEO dinâmico por produto ---------------- */
function setMetaTag(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setProductSEO(product, variant) {
  const url = `https://autenticasstore.com.br/produto.html?id=${product.id}`;
  const description = product.tagline || `${product.name} — Autênticas Store, qualidade premium e preço justo.`;

  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:title', `${product.name} — Autênticas Store`);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:image', variant.img.startsWith('http') ? variant.img : `https://autenticasstore.com.br/${variant.img}`);
  setMetaTag('property', 'og:url', url);
  setMetaTag('name', 'twitter:title', `${product.name} — Autênticas Store`);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', variant.img.startsWith('http') ? variant.img : `https://autenticasstore.com.br/${variant.img}`);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  let ld = document.getElementById('productJsonLd');
  if (!ld) {
    ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'productJsonLd';
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    image: variant.img.startsWith('http') ? variant.img : `https://autenticasstore.com.br/${variant.img}`,
    brand: { '@type': 'Brand', name: 'Autênticas Store' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'BRL',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  });
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function currentVariant(product, colorParam) {
  const match = product.variants.find((v) => v.name === colorParam);
  return match || product.variants[0];
}

/* ---------------- Descrição / Tabela de medidas ---------------- */
function descriptionHTML(product) {
  return `
    <h2>Sobre o produto</h2>
    <p>${product.tagline}</p>
    <h2>Qualidade premium e preço justo</h2>
    <p>Selecionamos cada peça com atenção ao acabamento — por isso o nome Autênticas Store. Produto fotografado em nosso estoque, sem edição que altere cor ou textura.</p>
    <h2>Compra segura</h2>
    <p>Pagamento processado com criptografia de ponta a ponta. Se não gostar, você tem 7 dias de garantia após o recebimento para solicitar troca.</p>
  `;
}

function measureTableHTML(category) {
  const t = MEASURE_TABLES[category];
  if (!t) return '<p>Tabela de medidas não disponível para esta categoria.</p>';
  return `
    <table class="pd-measure-table">
      <thead><tr>${t.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    <p class="pd-measure-note">${t.note}</p>
  `;
}

function renderTabsSection(product) {
  return `
    <div class="pd-tabs">
      <div class="pd-tabs__nav">
        <button type="button" class="pd-tabs__item is-active" data-pd-tab="descricao">Descrição</button>
        <button type="button" class="pd-tabs__item" data-pd-tab="medidas">Tabela de Medidas</button>
      </div>
      <div class="pd-tabs__content is-active" data-pd-tab-content="descricao">${descriptionHTML(product)}</div>
      <div class="pd-tabs__content" data-pd-tab-content="medidas">${measureTableHTML(product.category)}</div>
    </div>
  `;
}

function bannerCartaoHTML() {
  return `
    <div class="pd-banner-cartao">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 9h22"/></svg>
      <p>Compras feitas no <b>cartão de crédito</b> são processadas e enviadas mais rapidamente.</p>
    </div>
  `;
}

function selosCompletosHTML() {
  return `
    <div class="pd-selos">
      <div class="pd-selos__icones payment-icons"></div>
      <div class="pd-selos-confianca">
        <span class="pd-selo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg> Compra 100% Segura</span>
        <span class="pd-selo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Ambiente Criptografado</span>
      </div>
    </div>
  `;
}

function initProductTabs() {
  const nav = document.querySelector('.pd-tabs__nav');
  if (!nav) return;
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.pd-tabs__item');
    if (!btn) return;
    const alvo = btn.dataset.pdTab;
    nav.querySelectorAll('.pd-tabs__item').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.querySelectorAll('.pd-tabs__content').forEach((c) => {
      c.classList.toggle('is-active', c.dataset.pdTabContent === alvo);
    });
  });
}

function initProductFaq() {
  document.querySelectorAll('#productFaq .faq-q').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
}

function renderProduct() {
  const id = getParam('id');
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const colorParam = getParam('color');
  const variant = currentVariant(product, colorParam);

  const categoryLabel = (CATEGORIES.find((c) => c.id === product.category) || {}).label || 'Produtos';

  document.title = `${product.name} — Autênticas Store`;
  document.getElementById('breadcrumb').innerHTML =
    `<a href="index.html">Início</a> <span>/</span> <a href="index.html#produtos">${categoryLabel}</a> <span>/</span> <span>${product.name}</span>`;

  setProductSEO(product, variant);

  const thumbs = product.variants;

  const thumbsHTML = thumbs.map((v) => `
    <button type="button" class="pd-thumb${v.name === variant.name ? ' is-active' : ''}" data-color="${v.name}" data-img="${v.img}" aria-label="${v.name}">
      <img src="${v.img}" alt="${product.name} — ${v.name}" loading="lazy">
    </button>
  `).join('');

  const colorNames = product.variants.map((v) => v.name);
  const otherColors = colorNames.filter((c) => c !== variant.name);

  const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 13 4 4L19 7"/></svg>';

  document.getElementById('productDetail').innerHTML = `
    <div class="pd-grid">
      ${thumbs.length > 1 ? `<div class="pd-thumbs">${thumbsHTML}</div>` : '<div></div>'}
      <div class="pd-gallery__main">
        ${product.discountPct ? `<span class="badge badge-discount">-${product.discountPct}% OFF</span>` : ''}
        <span class="badge badge-shipping">Frete Grátis</span>
        <img id="pdMainImg" src="${variant.img}" alt="${product.name} — ${variant.name}">
      </div>
      <div class="pd-info">
        <div class="pd-badge-row">
          <span class="pd-badge">${categoryLabel}</span>
          <span class="pd-badge pd-badge-gold">Qualidade Premium</span>
        </div>
        <h1>${product.name}</h1>
        <p class="pd-tagline">${product.tagline}</p>
        <div class="pd-price-row">
          ${product.oldPrice ? `<span class="price-old">${fmtBRL(product.oldPrice)}</span>` : ''}
          <span class="price-now" id="pdPrice">${fmtBRL(product.price)}</span>
        </div>
        <span class="price-install">${product.installment}</span>
        <div class="pd-pix-block">
          <svg viewBox="0 0 24 24" width="20" height="20"><g transform="translate(12,12)"><path d="M-6 -6a1.8 1.8 0 0 1 2.5 0l2.7 2.7a.9.9 0 0 0 1.2 0l2.7-2.7a1.8 1.8 0 0 1 2.5 0 1.8 1.8 0 0 1 0 2.5L2.9 -.8a.9.9 0 0 0 0 1.2l2.7 2.7a1.8 1.8 0 0 1 0 2.5 1.8 1.8 0 0 1-2.5 0L.4 3a.9.9 0 0 0-1.2 0l-2.7 2.7a1.8 1.8 0 0 1-2.5 0 1.8 1.8 0 0 1 0-2.5L-3.3 .5a.9.9 0 0 0 0-1.2L-6-3.5a1.8 1.8 0 0 1 0-2.5z" fill="#1f8a4c"/></g></svg>
          <span><b>${fmtBRL(pixPrice(product.price))}</b> no Pix (5% OFF)</span>
          <span class="pd-pix-badge">Envio Prioritário</span>
        </div>

        <div class="pd-color-current">Cor selecionada: <b id="pdColorName">${variant.name}</b></div>
        ${otherColors.length ? `<div class="pd-color-note">${colorNames.length} cores disponíveis</div>` : ''}

        ${product.sizes.length ? `
        <div class="pd-size-block">
          <span class="pd-size-label">Tamanho: <b id="pdSizeName">${product.sizes[0]}</b></span>
          <div class="pd-size-row" id="pdSizeRow">
            ${product.sizes.map((s, i) => `<button type="button" class="pd-size-btn${i === 0 ? ' is-active' : ''}" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>` : ''}

        <div class="pd-qty-block">
          <span class="pd-size-label">Quantidade</span>
          <div class="pd-stepper">
            <button type="button" id="pdQtyMinus" aria-label="Diminuir quantidade">−</button>
            <span id="pdQty">1</span>
            <button type="button" id="pdQtyPlus" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>

        <div class="pd-cta-col">
          <button type="button" class="btn-primary btn-block" id="pdBuyNow">Comprar Agora</button>
          <button type="button" class="btn-whats-dark btn-block" id="pdBuyWhatsDark" data-whats-buy>Comprar pelo WhatsApp</button>
        </div>

        <div class="pd-payment-block">
          <span class="pd-size-label">Formas de Pagamento</span>
          <div class="payment-icons"></div>
        </div>

        <div class="pd-shipping-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="7" width="15" height="11" rx="1"/><path d="M16 11h3.5L22 15.5V18h-6"/><circle cx="6" cy="20" r="1.6"/><circle cx="17.5" cy="20" r="1.6"/></svg>
          <div><b>Frete Grátis</b><span>Em pedidos acima de R$ 199,90 — entrega pra todo o Brasil</span></div>
        </div>

        <ul class="pd-trust">
          <li>${checkIcon} Produto de altíssima qualidade, com nota fiscal</li>
          <li>${checkIcon} Envio para todo o Brasil</li>
          <li>${checkIcon} Troca garantida em até 7 dias após o recebimento</li>
          <li>${checkIcon} Pagamento 100% seguro (Pix, cartão e boleto)</li>
        </ul>
      </div>
    </div>
    ${renderTabsSection(product)}
    ${bannerCartaoHTML()}
    ${selosCompletosHTML()}
  `;

  document.querySelectorAll('.pd-size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pd-size-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.getElementById('pdSizeName').textContent = btn.dataset.size;
    });
  });

  document.querySelectorAll('.pd-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pd-thumb').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.getElementById('pdMainImg').src = btn.dataset.img;
      document.getElementById('pdMainImg').alt = `${product.name} — ${btn.dataset.color}`;
      document.getElementById('pdColorName').textContent = btn.dataset.color;
      const url = new URL(window.location);
      url.searchParams.set('color', btn.dataset.color);
      window.history.replaceState({}, '', url);
    });
  });

  let qty = 1;
  const qtyEl = document.getElementById('pdQty');
  document.getElementById('pdQtyMinus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyEl.textContent = qty;
  });
  document.getElementById('pdQtyPlus').addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    qtyEl.textContent = qty;
  });

  function currentLabel() {
    const colorName = document.getElementById('pdColorName').textContent;
    const sizeEl = document.getElementById('pdSizeName');
    return sizeEl ? `${colorName}, Tam. ${sizeEl.textContent}` : colorName;
  }

  document.getElementById('pdBuyNow').addEventListener('click', () => {
    const img = document.getElementById('pdMainImg').src;
    const colorName = document.getElementById('pdColorName').textContent;
    const sizeEl = document.getElementById('pdSizeName');
    buyNow(product.id, colorName, sizeEl ? sizeEl.textContent : '', img, qty);
  });

  document.getElementById('pdBuyWhatsDark').addEventListener('click', (e) => {
    e.preventDefault();
    window.open(waLink(`Olá! Quero comprar ${qty}x ${product.name} (${currentLabel()}) — ${fmtBRL(product.price)} cada.`), '_blank');
  });

  renderRelated(product);
}

function renderRelated(current) {
  const others = PRODUCTS.filter((p) => p.id !== current.id && p.category === current.category).slice(0, 12);
  const pool = others.length ? others : PRODUCTS.filter((p) => p.id !== current.id);
  document.getElementById('relatedRow').innerHTML = pool.map(productCardHTML).join('');

  const wrap = document.querySelector('.products-row-wrap');
  const row = document.getElementById('relatedRow');
  const prevBtn = wrap.querySelector('[data-row-prev]');
  const nextBtn = wrap.querySelector('[data-row-next]');
  const step = () => (row.querySelector('.card')?.offsetWidth || 220) + 16;
  prevBtn?.addEventListener('click', () => row.scrollBy({ left: -step(), behavior: 'smooth' }));
  nextBtn?.addEventListener('click', () => row.scrollBy({ left: step(), behavior: 'smooth' }));
}

function initMenuSearch() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
    document.getElementById('overlay').classList.toggle('is-open');
  });
  document.getElementById('searchToggle').addEventListener('click', () => {
    const bar = document.getElementById('searchBar');
    bar.classList.toggle('is-open');
    if (bar.classList.contains('is-open')) document.getElementById('searchInputMobile').focus();
  });
  document.getElementById('searchInputMobile').addEventListener('input', (e) => { if (e.target.value.trim()) window.location.href = `index.html#produtos`; });
  document.querySelectorAll('nav.main-nav a').forEach((a) => {
    a.addEventListener('click', () => mainNav.classList.remove('is-open'));
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => observer.observe(el));
}

function initImageFade() {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) { img.classList.add('is-loaded'); return; }
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  renderMarquee();
  initWhatsCTA();
  initHeaderScroll();
  initMenuSearch();
  renderPaymentIcons();

  await Promise.all([fetchProducts(), fetchSettings()]);

  renderProduct();
  initProductTabs();
  initProductFaq();
  initRowDots();
  initReveal();
  initImageFade();
});
