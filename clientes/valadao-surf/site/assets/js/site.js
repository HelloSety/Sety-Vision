// ATENÇÃO: trocar pelo número real do WhatsApp do Valadão Street Wear antes de publicar (formato: 55DDNÚMERO, só dígitos).
const WHATSAPP_NUMBER = '5591999999999';

function fmtBRL(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function productPhotos(p) {
  const arr = [];
  for (let i = 1; i <= p.photos; i++) arr.push(`assets/produtos/${p.handle}/${i}.jpg`);
  return arr;
}

function whatsLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function productCardHTML(p) {
  const photos = productPhotos(p);
  return `
    <div class="card" data-handle="${p.handle}">
      <div class="card-img">
        ${p.estimated ? '<span class="badge">Confirmar</span>' : ''}
        <span class="badge-desconto">-10% NO PIX</span>
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

function destaqueCardHTML(p, showBestSeller) {
  const photos = productPhotos(p);
  const sizesShown = p.sizes.slice(0, 3);
  const extra = p.sizes.length - sizesShown.length;
  return `
    <div class="dest-card" data-handle="${p.handle}">
      <div class="dest-card-img">
        ${p.estimated ? '<span class="badge">Confirmar</span>' : (showBestSeller ? '<span class="badge badge-vendido">Mais Vendido</span>' : '')}
        <span class="badge-desconto">-10% NO PIX</span>
        <img src="${photos[0]}" alt="${p.title}" loading="lazy">
      </div>
      <p class="dest-card-nome">${p.title}<em>${p.vendor}</em></p>
      <div class="dest-card-tamanhos">
        ${sizesShown.map(s => `<span class="dest-card-tamanho">${s}</span>`).join('')}
        ${extra > 0 ? `<span class="dest-card-tamanho">+${extra}</span>` : ''}
      </div>
      <hr class="dest-card-divisor">
      <p class="dest-card-preco">${fmtBRL(p.price)}</p>
      <span class="dest-card-pix">${fmtBRL(p.price * 0.9)} no Pix</span>
      <div class="dest-card-cta">
        <span>Comprar</span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></span>
      </div>
    </div>`;
}

function renderDestaques(container, products, showBestSeller) {
  container.innerHTML = products.map(p => destaqueCardHTML(p, showBestSeller)).join('');
  container.querySelectorAll('.dest-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.handle));
  });
}

function scrollCarrossel(trackId, direcao) {
  document.getElementById(trackId).scrollBy({ left: direcao * 260, behavior: 'smooth' });
}

let currentModalPhotos = [];
let currentModalProduct = null;
let currentModalSize = null;
let currentModalQty = 1;

function updateBuyLink() {
  const p = currentModalProduct;
  if (!p) return;
  const sizePart = currentModalSize ? ` | Tamanho: ${currentModalSize}` : '';
  const qtyPart = currentModalQty > 1 ? ` | Quantidade: ${currentModalQty}` : '';
  const buyLink = whatsLink(
    `Olá! Tenho interesse neste produto: ${p.title} - ${fmtBRL(p.price)}${sizePart}${qtyPart}`
  );
  document.getElementById('modal-buy-btn').href = buyLink;
  document.getElementById('modal-buy-btn-sticky').href = buyLink;
  document.getElementById('modal-ask-btn').href = whatsLink(
    `Olá! Tenho uma dúvida sobre este produto: ${p.title}${sizePart}`
  );
}

function updateQtyDisplay() {
  document.getElementById('qty-value').textContent = currentModalQty;
}

function openModal(handle) {
  const p = PRODUCTS.find(x => x.handle === handle);
  if (!p) return;
  currentModalProduct = p;
  currentModalPhotos = productPhotos(p);
  currentModalSize = p.sizes[0];
  currentModalQty = 1;
  updateQtyDisplay();

  document.getElementById('modal-vendor').textContent = p.vendor;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-price').textContent = fmtBRL(p.price);
  document.getElementById('modal-installment').textContent = `ou em até 3x de ${fmtBRL(p.price / 3)} sem juros`;
  document.getElementById('modal-pix').textContent = `${fmtBRL(p.price * 0.9)} no Pix (10% OFF)`;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-main-img').src = currentModalPhotos[0];
  document.getElementById('modal-sticky-price').textContent = fmtBRL(p.price);
  document.getElementById('modal-sticky-pix').textContent = `${fmtBRL(p.price * 0.9)} no Pix`;

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

// ===== Carrinho (localStorage, acumula vários produtos pra 1 pedido só no WhatsApp) =====
const CART_KEY = 'valadao_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(handle, size, qty) {
  const cart = getCart();
  const existing = cart.find(i => i.handle === handle && i.size === size);
  if (existing) existing.qty += qty;
  else cart.push({ handle, size, qty });
  saveCart(cart);
  updateCartBadge();
  renderCart();
  showCartToast();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function updateCartItemQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function cartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.classList.toggle('hide', count === 0);
}

function showCartToast() {
  const toast = document.getElementById('cart-toast');
  if (!toast) return;
  toast.classList.add('show');
  clearTimeout(showCartToast._t);
  showCartToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}
function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const itemsEl = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');
  if (!itemsEl) return;
  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        <p>Seu carrinho está vazio.<br>Adicione produtos pra montar seu pedido.</p>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }
  if (footerEl) footerEl.style.display = '';

  let subtotal = 0;
  itemsEl.innerHTML = cart.map((item, index) => {
    const p = PRODUCTS.find(x => x.handle === item.handle);
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    subtotal += lineTotal;
    const photo = productPhotos(p)[0];
    return `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${photo}" alt="${p.title}" loading="lazy"></div>
        <div class="cart-item-info">
          <h4>${p.title}</h4>
          <span class="cart-item-size">Tamanho: ${item.size}</span>
          <div class="cart-item-qty">
            <button type="button" data-qty-minus="${index}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty-plus="${index}">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${fmtBRL(lineTotal)}</span>
          <button type="button" class="cart-item-remove" data-remove="${index}">Remover</button>
        </div>
      </div>`;
  }).join('');

  itemsEl.querySelectorAll('[data-qty-minus]').forEach(b => b.addEventListener('click', () => updateCartItemQty(+b.dataset.qtyMinus, -1)));
  itemsEl.querySelectorAll('[data-qty-plus]').forEach(b => b.addEventListener('click', () => updateCartItemQty(+b.dataset.qtyPlus, 1)));
  itemsEl.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => removeFromCart(+b.dataset.remove)));

  document.getElementById('cart-subtotal').textContent = fmtBRL(subtotal);
  document.getElementById('cart-pix-total').textContent = `${fmtBRL(subtotal * 0.9)} no Pix (10% OFF)`;

  const lines = cart.map(item => {
    const p = PRODUCTS.find(x => x.handle === item.handle);
    if (!p) return '';
    return `• ${p.title} | Tam: ${item.size} | Qtd: ${item.qty} | ${fmtBRL(p.price * item.qty)}`;
  }).join('\n');
  const msg = `Olá! Quero fechar este pedido na Valadão Street Wear:\n\n${lines}\n\nSubtotal: ${fmtBRL(subtotal)}\nNo Pix: ${fmtBRL(subtotal * 0.9)}`;
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) checkoutBtn.href = whatsLink(msg);
}

// Barra de anúncio giratória
const anuncioMensagens = ['Estoque à Pronta-Entrega', 'Frete Grátis acima de R$299', 'Parcele em até 3x sem juros', 'Atendimento Direto no WhatsApp'];
let anuncioIndex = 0;
let anuncioTimer;
function renderAnuncio() {
  document.getElementById('anuncio-texto').textContent = anuncioMensagens[anuncioIndex];
}
function anuncioGo(delta) {
  anuncioIndex = (anuncioIndex + delta + anuncioMensagens.length) % anuncioMensagens.length;
  renderAnuncio();
  restartAnuncio();
}
function restartAnuncio() {
  clearInterval(anuncioTimer);
  anuncioTimer = setInterval(() => anuncioGo(1), 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  restartAnuncio();
  updateCartBadge();

  document.getElementById('cart-open-btn')?.addEventListener('click', openCart);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  document.getElementById('modal-add-cart-btn')?.addEventListener('click', () => {
    if (!currentModalProduct) return;
    addToCart(currentModalProduct.handle, currentModalSize, currentModalQty);
  });

  // WhatsApp links dinâmicos (float + footer + header)
  document.querySelectorAll('[data-whats-link]').forEach(el => {
    el.href = whatsLink('Olá! Vim pelo site e quero saber mais sobre os produtos da Valadão Street Wear.');
  });

  // Compre por Modelo — cards de categoria (home)
  const modelTrack = document.getElementById('model-track');
  if (modelTrack) {
    modelTrack.innerHTML = CATEGORIES.map(c => `
      <a class="model-item" href="catalogo.html?filtro=${c.id}">
        <img src="${c.img}" alt="${c.label} Valadão Street Wear" loading="lazy">
      </a>`).join('');
  }

  // Mais Vendidos — carrossel (home), 8 primeiros produtos
  const destaquesTrack = document.getElementById('destaques-track');
  if (destaquesTrack) renderDestaques(destaquesTrack, PRODUCTS.slice(0, 8), true);

  // Coleção Moletons — carrossel (home)
  const moletonsTrack = document.getElementById('moletons-track');
  if (moletonsTrack) renderDestaques(moletonsTrack, PRODUCTS.filter(p => p.type === 'moletons').slice(0, 10));

  // Coleção Bermudas & Calças — carrossel (home)
  const bermudasTrack = document.getElementById('bermudas-track');
  if (bermudasTrack) renderDestaques(bermudasTrack, PRODUCTS.filter(p => p.type === 'bermudas-calcas').slice(0, 10));

  // Catálogo completo com filtro
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

  // Modal
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (currentModalQty > 1) { currentModalQty--; updateQtyDisplay(); updateBuyLink(); }
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    currentModalQty++; updateQtyDisplay(); updateBuyLink();
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });

  // Newsletter (front-end only, sem backend — redireciona pro WhatsApp)
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = e.target.querySelector('input[type="text"]').value;
    window.open(whatsLink(`Olá! Meu nome é ${nome} e quero receber novidades da Valadão Street Wear por e-mail.`), '_blank');
  });
});
