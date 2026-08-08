/* Autênticas Store — site. Carrinho e marquee compartilhados vivem em js/cart.js */

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
  document.querySelectorAll('#featuredRow .card').forEach((el) => {
    el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
  });
}

/* ---------------- Render: sticker por categoria ---------------- */
function renderCircles() {
  const host = document.getElementById('modelCircles');
  host.innerHTML = CATEGORIES.map((c) => {
    const cover = PRODUCTS.find((p) => p.category === c.id)?.cover || BRAND.logo;
    return `
    <a class="sticker-item" href="index.html#produtos" data-cat="${c.id}">
      <div class="sticker-tile"><img src="${cover}" alt="${c.label}" loading="lazy"></div>
      <span>${c.label}</span>
    </a>`;
  }).join('');
}

/* ---------------- Render: cards de produto ---------------- */
/* productCardHTML vive em catalog.js (compartilhado com produto.html) */

function renderFeaturedRow() {
  const featured = PRODUCTS.filter((p) => p.featured);
  document.getElementById('featuredRow').innerHTML = featured.map(productCardHTML).join('');
}

/* ---------------- Render: fileiras de coleção ---------------- */
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
document.addEventListener('DOMContentLoaded', async () => {
  renderMarquee();
  initWhatsCTA();
  initHeaderScroll();
  initUI();
  renderPaymentIcons();

  await Promise.all([fetchProducts(), fetchSettings()]);

  renderCategoryTabs();
  renderCircles();
  renderFeaturedRow();
  renderCollections();
  initRowArrows();
  initRowDots();
  initReveal();
  initImageFade();
});
