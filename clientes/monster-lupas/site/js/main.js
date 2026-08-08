/* Monster Lupas — site. Carrinho compartilhado vive em js/cart.js */

/* ---------------- Marquee ---------------- */
function renderMarquee() {
  const items = [
    'Envio para todo o Brasil', 'Compra Segura', 'Estoque à Pronta-Entrega',
    'Proteção UV400 Garantida', 'Pague com Pix e ganhe 5% OFF',
  ];
  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>';
  const oneSet = items.map((t) => `<span class="marquee__item">${icon}${t}</span>`).join('');
  document.getElementById('marqueeTrack').innerHTML = oneSet + oneSet;
}

/* ---------------- Render: tabs de categoria ---------------- */
function renderCategoryTabs() {
  const host = document.getElementById('categoryTabs');
  const tabsHTML = ['<button type="button" class="category-tab is-active" data-cat="all">Todos</button>']
    .concat(CATEGORIES.map((c) => `<button type="button" class="category-tab" data-cat="${c.id}">${c.label}</button>`));
  host.innerHTML = tabsHTML.join('');

  host.querySelectorAll('.category-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      host.querySelectorAll('.category-tab').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterByCategory(btn.dataset.cat);
    });
  });
}

function filterByCategory(cat) {
  document.querySelectorAll('#modelCircles .sticker-item').forEach((el) => {
    el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
  });
}

/* ---------------- Render: sticker de modelo ---------------- */
function renderCircles() {
  const host = document.getElementById('modelCircles');
  host.innerHTML = PRODUCTS.map((p) => `
    <a class="sticker-item" href="produto.html?id=${p.id}" data-name="${p.name.toLowerCase()}" data-cat="${p.category}">
      <div class="sticker-tile"><img src="${p.cover}" alt="Óculos ${p.name}" loading="lazy"></div>
      <span>${p.name}</span>
    </a>
  `).join('');
}

/* ---------------- Render: fileira "Mais Vendidos" ---------------- */
function swatchRowHTML(p) {
  const shown = p.variants.slice(0, 4);
  const extra = p.colorCount - shown.length;
  const imgs = shown.map((v) => `<img src="${v.img}" alt="${v.name}" loading="lazy">`).join('');
  return `<div class="swatch-row">${imgs}${extra > 0 ? `<span class="swatch-more">+${extra}</span>` : ''}</div>`;
}

function productCardHTML(p) {
  return `
    <div class="card" data-name="${p.name.toLowerCase()}">
      <a class="card-img" href="produto.html?id=${p.id}">
        ${p.discountPct ? `<span class="badge badge-discount">-${p.discountPct}% OFF</span>` : ''}
        <span class="badge badge-shipping">Frete Grátis</span>
        <img src="${p.cover}" alt="Óculos ${p.name}" loading="lazy">
      </a>
      <div class="card-body">
        <a href="produto.html?id=${p.id}"><h3>${p.name}</h3></a>
        ${swatchRowHTML(p)}
        <div class="price-row">
          ${p.oldPrice ? `<span class="price-old">${fmtBRL(p.oldPrice)}</span>` : ''}
          <span class="price-now">${fmtBRL(p.price)}</span>
        </div>
        <span class="price-install">${p.installment}</span>
        <span class="price-pix">${fmtBRL(pixPrice(p.price))} no Pix (5% OFF)</span>
        <div class="card-cta-row">
          <a class="card-buy-btn" href="produto.html?id=${p.id}">Ver Produto</a>
          <a class="card-cart-btn" href="produto.html?id=${p.id}" aria-label="Ver produto ${p.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </a>
        </div>
      </div>
    </div>`;
}

function renderFeaturedRow() {
  const featured = PRODUCTS.filter((p) => p.featured);
  document.getElementById('featuredRow').innerHTML = featured.map(productCardHTML).join('');
}

/* ---------------- Render: fileiras de coleção (Novidades, Colecionador, Performance) ---------------- */
function renderCollections() {
  COLLECTIONS.forEach((col) => {
    const host = document.getElementById(`collection-${col.id}`);
    const subEl = document.getElementById(`collection-${col.id}-sub`);
    if (!host) return;
    const items = PRODUCTS.filter((p) => p.collections.includes(col.id));
    host.innerHTML = items.map(productCardHTML).join('');
    if (subEl) subEl.textContent = col.subtitle;
  });
}

/* ---------------- Setas de navegação das fileiras (scroll horizontal) ---------------- */
function initRowArrows() {
  document.querySelectorAll('.products-row-wrap').forEach((wrap) => {
    const row = wrap.querySelector('.products-row');
    const prevBtn = wrap.querySelector('[data-row-prev]');
    const nextBtn = wrap.querySelector('[data-row-next]');
    const step = () => (row.querySelector('.card')?.offsetWidth || 220) + 16;
    prevBtn?.addEventListener('click', () => row.scrollBy({ left: -step(), behavior: 'smooth' }));
    nextBtn?.addEventListener('click', () => row.scrollBy({ left: step(), behavior: 'smooth' }));

    function toggleArrows() {
      const hasOverflow = row.scrollWidth > row.clientWidth + 4;
      if (prevBtn) prevBtn.style.display = hasOverflow ? '' : 'none';
      if (nextBtn) nextBtn.style.display = hasOverflow ? '' : 'none';
    }
    toggleArrows();
    window.addEventListener('resize', toggleArrows);
  });

  document.querySelectorAll('.sticker-row-wrap').forEach((wrap) => {
    const row = wrap.querySelector('.sticker-row');
    const prevBtn = wrap.querySelector('[data-sticker-prev]');
    const nextBtn = wrap.querySelector('[data-sticker-next]');
    const step = () => (row.querySelector('.sticker-item')?.offsetWidth || 140) + 30;
    prevBtn?.addEventListener('click', () => row.scrollBy({ left: -step() * 3, behavior: 'smooth' }));
    nextBtn?.addEventListener('click', () => row.scrollBy({ left: step() * 3, behavior: 'smooth' }));

    function toggleArrows() {
      const hasOverflow = row.scrollWidth > row.clientWidth + 4;
      if (prevBtn) prevBtn.style.display = hasOverflow ? '' : 'none';
      if (nextBtn) nextBtn.style.display = hasOverflow ? '' : 'none';
    }
    toggleArrows();
    window.addEventListener('resize', toggleArrows);
  });
}

/* ---------------- Header compacto ao rolar ---------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('is-compact', window.scrollY > 260);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------- Entrada suave ao rolar (scroll reveal) ---------------- */
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

/* ---------------- Fade-in de imagens lazy ---------------- */
function initImageFade() {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) { img.classList.add('is-loaded'); return; }
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  });
}

/* ---------------- Busca ---------------- */
function filterCatalog(q) {
  const term = q.trim().toLowerCase();
  document.querySelectorAll('#modelCircles .sticker-item').forEach((el) => {
    el.style.display = el.dataset.name.includes(term) ? '' : 'none';
  });
  document.querySelectorAll('#featuredRow .card').forEach((el) => {
    el.style.display = el.dataset.name.includes(term) ? '' : 'none';
  });
}

/* ---------------- Menu / busca / carrinho / FAQ ---------------- */
function initUI() {
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

  document.getElementById('searchInputMobile').addEventListener('input', (e) => filterCatalog(e.target.value));

  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });

  document.querySelectorAll('nav.main-nav a').forEach((a) => {
    a.addEventListener('click', () => mainNav.classList.remove('is-open'));
  });
}

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderMarquee();
  renderCategoryTabs();
  renderCircles();
  renderFeaturedRow();
  renderCollections();
  initRowArrows();
  initCartUI();
  renderCart();
  initHeaderScroll();
  initUI();
  initReveal();
  initImageFade();
});
