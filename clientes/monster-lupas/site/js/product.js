/* Monster Lupas — página de produto individual (produto.html?id=plantaris&color=...) */

function renderMarquee() {
  const items = [
    'Envio para todo o Brasil', 'Compra Segura', 'Estoque à Pronta-Entrega',
    'Proteção UV400 Garantida', 'Pague com Pix e ganhe 5% OFF',
  ];
  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>';
  const oneSet = items.map((t) => `<span class="marquee__item">${icon}${t}</span>`).join('');
  document.getElementById('marqueeTrack').innerHTML = oneSet + oneSet;
}

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  function onScroll() { header.classList.toggle('is-compact', window.scrollY > 260); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function currentVariant(product, colorParam) {
  const match = product.variants.find((v) => v.name === colorParam);
  return match || product.variants[0];
}

function renderProduct() {
  const id = getParam('id');
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const colorParam = getParam('color');
  const variant = currentVariant(product, colorParam);

  const categoryLabel = (CATEGORIES.find((c) => c.id === product.category) || {}).label || 'Produtos';

  document.title = `${product.name} — Monster Lupas`;
  document.getElementById('breadcrumb').innerHTML =
    `<a href="index.html">Início</a> <span>/</span> <a href="index.html#produtos">${categoryLabel}</a> <span>/</span> <span>${product.name}</span>`;

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
          <span class="pd-badge pd-badge-promo">Compre 1, Leve 2</span>
          <span class="pd-badge pd-badge-dark">Qualidade Premium</span>
        </div>
        <h1>${product.name}</h1>
        <p class="pd-tagline">${product.tagline}</p>
        <div class="pd-price-row">
          ${product.oldPrice ? `<span class="price-old">${fmtBRL(product.oldPrice)}</span>` : ''}
          <span class="price-now" id="pdPrice">${fmtBRL(product.price)}</span>
          ${product.discountPct ? `<span class="pd-discount-chip">-${product.discountPct}%</span>` : ''}
        </div>
        <span class="price-install">${product.installment}</span>
        <div class="pd-pix-row">
          <span class="price-pix">${fmtBRL(pixPrice(product.price))} no Pix (5% OFF)</span>
          <span class="badge badge-shipping pd-shipping-inline">Envio Prioritário</span>
        </div>

        <div class="pd-color-current">Cor selecionada: <b id="pdColorName">${variant.name}</b></div>
        ${otherColors.length ? `<div class="pd-color-note">${colorNames.length} cores disponíveis</div>` : ''}

        <div class="pd-cta-row">
          <div class="pd-stepper">
            <button type="button" id="pdQtyMinus" aria-label="Diminuir quantidade">−</button>
            <span id="pdQty">1</span>
            <button type="button" id="pdQtyPlus" aria-label="Aumentar quantidade">+</button>
          </div>
          <button type="button" class="btn-primary" id="pdAddCart">Adicionar ao Carrinho</button>
          <a href="#" class="pd-cart-icon" id="pdBuyWhats" data-whats-buy aria-label="Comprar no WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.87.51 3.63 1.4 5.13L2 22l4.99-1.35A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
          </a>
        </div>
        <a href="#" class="pd-whats-link" id="pdBuyWhatsLink" data-whats-buy>Prefere comprar direto pelo WhatsApp?</a>

        <div class="model-feature-pills pd-pills">
          <span>UV400</span><span>Lente Polarizada</span><span>Garantia 7 Dias</span>
        </div>

        <div class="pd-payment-row">
          <span>VISA</span><span>MASTER</span><span>PIX</span><span>ELO</span><span>AMEX</span><span>BOLETO</span>
        </div>

        <ul class="pd-trust">
          <li>${checkIcon} Produto original Monster Lupas, com nota fiscal</li>
          <li>${checkIcon} Envio para todo o Brasil em até 24h úteis</li>
          <li>${checkIcon} Troca garantida em até 7 dias após o recebimento</li>
          <li>${checkIcon} Pagamento 100% seguro (Pix, cartão e boleto)</li>
        </ul>
      </div>
    </div>
  `;

  // Troca de variante
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

  document.getElementById('pdAddCart').addEventListener('click', () => {
    const colorName = document.getElementById('pdColorName').textContent;
    const img = document.getElementById('pdMainImg').src;
    addToCart(product.id, colorName, img, qty);
  });

  ['pdBuyWhats', 'pdBuyWhatsLink'].forEach((id) => {
    document.getElementById(id).addEventListener('click', (e) => {
      e.preventDefault();
      const colorName = document.getElementById('pdColorName').textContent;
      window.open(waLink(`Olá! Quero comprar ${qty}x o óculos ${product.name} (${colorName}) — ${fmtBRL(product.price)} cada.`), '_blank');
    });
  });

  renderRelated(product);
}

function renderRelated(current) {
  const others = PRODUCTS.filter((p) => p.id !== current.id);
  document.getElementById('relatedRow').innerHTML = others.map((p) => `
    <div class="card">
      <a class="card-img" href="produto.html?id=${p.id}"><img src="${p.cover}" alt="Óculos ${p.name}" loading="lazy"></a>
      <div class="card-body">
        <a href="produto.html?id=${p.id}"><h3>${p.name}</h3></a>
        <div class="price-row"><span class="price-now">${fmtBRL(p.price)}</span></div>
        <span class="price-install">${p.installment}</span>
        <div class="card-cta-row">
          <a class="card-buy-btn" href="produto.html?id=${p.id}">Ver Produto</a>
        </div>
      </div>
    </div>
  `).join('');

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

document.addEventListener('DOMContentLoaded', () => {
  renderMarquee();
  renderProduct();
  initCartUI();
  renderCart();
  initHeaderScroll();
  initMenuSearch();
  initReveal();
  initImageFade();
});
