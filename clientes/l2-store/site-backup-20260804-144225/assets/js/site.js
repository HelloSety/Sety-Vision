const WHATSAPP_NUMBER = '5511985385239';

function fmtBRL(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function productPhotos(p) {
  return [`assets/produtos/${p.type}.svg`];
}

function whatsLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function productCardHTML(p) {
  const photos = productPhotos(p);
  return `
    <div class="card" data-handle="${p.handle}">
      <div class="card-img">
        ${p.estimated ? '<span class="badge">Exemplo</span>' : ''}
        <img src="${photos[0]}" alt="${p.title}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${p.title}</h3>
        <div class="price-row"><span class="price-now">${fmtBRL(p.price)}</span></div>
        <span class="price-pix">${fmtBRL(p.price * 0.9)} no Pix (10% OFF)</span>
      </div>
    </div>`;
}

function renderGrid(container, products) {
  container.innerHTML = products.map(productCardHTML).join('');
  container.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.handle));
  });
}

let currentModalPhotos = [];
let currentModalProduct = null;
let currentModalSize = null;

function updateBuyLink() {
  const p = currentModalProduct;
  if (!p) return;
  const sizePart = currentModalSize ? ` | Tamanho: ${currentModalSize}` : '';
  document.getElementById('modal-buy-btn').href = whatsLink(
    `Olá! Tenho interesse neste produto: ${p.title} - ${fmtBRL(p.price)}${sizePart}`
  );
}

function openModal(handle) {
  const p = PRODUCTS.find(x => x.handle === handle);
  if (!p) return;
  currentModalProduct = p;
  currentModalPhotos = productPhotos(p);
  currentModalSize = p.sizes[0];

  document.getElementById('modal-vendor').textContent = p.vendor;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-price').textContent = fmtBRL(p.price);
  document.getElementById('modal-pix').textContent = `${fmtBRL(p.price * 0.9)} no Pix (10% OFF) ou até 3x de ${fmtBRL(p.price / 3)} sem juros`;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-main-img').src = currentModalPhotos[0];

  const thumbs = document.getElementById('modal-thumbs');
  thumbs.innerHTML = currentModalPhotos.map((src, i) => `
    <button type="button" class="${i === 0 ? 'active' : ''}" data-src="${src}">
      <img src="${src}" alt="${p.title} - foto ${i + 1}" loading="lazy">
    </button>`).join('');
  thumbs.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      thumbs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('modal-main-img').src = btn.dataset.src;
    });
  });

  const sizesEl = document.getElementById('modal-sizes');
  sizesEl.innerHTML = p.sizes.map((size, i) => `
    <button type="button" class="size-opt ${i === 0 ? 'active' : ''}" data-size="${size}">${size}</button>`).join('');
  sizesEl.querySelectorAll('.size-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      sizesEl.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentModalSize = btn.dataset.size;
      updateBuyLink();
    });
  });

  updateBuyLink();

  document.getElementById('product-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-whats-link]').forEach(el => {
    el.href = whatsLink('Olá! Vim pelo site e quero saber mais sobre os produtos da L2 Store.');
  });

  const catContainer = document.getElementById('cat-cards');
  if (catContainer) {
    catContainer.innerHTML = CATEGORIES.map(c => `
      <a class="cat-card" href="#catalogo" data-filter="${c.id}">
        <img src="${c.img}" alt="${c.label}" loading="lazy">
        <div class="cat-card-label"><span>${c.label}</span></div>
      </a>`).join('');
  }

  const destaques = document.getElementById('grid-destaques');
  if (destaques) renderGrid(destaques, PRODUCTS.slice(0, 5));

  const grid = document.getElementById('grid-catalogo');
  const filtersBar = document.getElementById('filters');
  const countLabel = document.getElementById('catalogo-count');

  function applyFilter(filterId) {
    const filtered = filterId === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === filterId);
    renderGrid(grid, filtered);
    if (countLabel) countLabel.textContent = `${filtered.length} produtos encontrados`;
    filtersBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === filterId));
  }

  if (grid && filtersBar) {
    filtersBar.innerHTML = ['<button class="filter-btn active" data-filter="all" type="button">Todos</button>']
      .concat(CATEGORIES.map(c => `<button class="filter-btn" data-filter="${c.id}" type="button">${c.label}</button>`))
      .join('');
    filtersBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
    applyFilter('all');
  }

  document.addEventListener('click', (e) => {
    const catCard = e.target.closest('.cat-card[data-filter]');
    if (catCard && filtersBar) {
      e.preventDefault();
      applyFilter(catCard.dataset.filter);
      const btn = filtersBar.querySelector(`[data-filter="${catCard.dataset.filter}"]`);
      if (btn) btn.classList.add('active');
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });

  const promoSlider = document.getElementById('promo-slider');
  if (promoSlider) {
    const track = document.getElementById('promo-slider-track');
    const dots = promoSlider.querySelectorAll('.promo-dot');
    const prevBtn = document.getElementById('promo-prev');
    const nextBtn = document.getElementById('promo-next');
    const total = dots.length;
    let current = 0;
    let autoplay;

    function goTo(index) {
      current = (index + total) % total;
      track.classList.toggle('at-1', current === 1);
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    function restartAutoplay() {
      clearInterval(autoplay);
      autoplay = setInterval(() => goTo(current + 1), 6000);
    }

    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); restartAutoplay(); }));
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); restartAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); restartAutoplay(); });

    promoSlider.addEventListener('mouseenter', () => clearInterval(autoplay));
    promoSlider.addEventListener('mouseleave', restartAutoplay);

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (delta > 50) { goTo(current - 1); restartAutoplay(); }
      else if (delta < -50) { goTo(current + 1); restartAutoplay(); }
    });

    restartAutoplay();
  }
});
