function fmtBRL(cents) {
  return 'R$ ' + (cents / 100).toFixed(2).replace('.', ',');
}

async function fetchCart() {
  const res = await fetch('/cart.js');
  return res.json();
}

function updateCartBadge(cart) {
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = cart.item_count;
    el.classList.toggle('hide', cart.item_count === 0);
  });
}

function cartItemRowHTML(item, index) {
  const hasSize = item.variant_title && item.variant_title !== 'Default Title';
  const propDetails = (item.properties ? Object.entries(item.properties) : [])
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  const details = [hasSize ? `Tamanho: ${item.variant_title}` : null, ...propDetails].filter(Boolean);
  return `
    <div class="cart-item" data-line="${index + 1}" data-key="${item.key}">
      <div class="cart-item-img"><img src="${item.image}&width=140" alt="${item.product_title}"></div>
      <div class="cart-item-info">
        <h4>${item.product_title}</h4>
        ${details.length ? `<span class="cart-item-size">${details.join(' · ')}</span>` : ''}
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" type="button" aria-label="Diminuir quantidade">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="inc" type="button" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">${fmtBRL(item.final_line_price)}</span>
        <button class="cart-item-remove" data-action="remove" type="button">Remover</button>
      </div>
    </div>`;
}

async function renderCartDrawer() {
  const cart = await fetchCart();
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  drawer.innerHTML = `
    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-panel">
      <div class="cart-header">
        <h3>Seu Carrinho</h3>
        <button class="cart-close" id="cart-close" type="button" aria-label="Fechar carrinho">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div class="cart-items">
        ${cart.items.length ? cart.items.map(cartItemRowHTML).join('') : `
          <div class="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
            <p>Seu carrinho está vazio.<br>Adicione produtos pra montar seu pedido.</p>
          </div>`}
      </div>
      ${cart.items.length ? `
        <div class="cart-footer">
          <div class="cart-subtotal-row"><span>Subtotal</span><span>${fmtBRL(cart.total_price)}</span></div>
          <span class="cart-pix-total">${fmtBRL(Math.round(cart.total_price * 0.9))} no Pix (10% OFF)</span>
          <a class="btn-primary" href="/checkout">Finalizar Compra</a>
        </div>` : ''}
    </div>`;

  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);

  drawer.querySelectorAll('.cart-item').forEach(row => {
    const line = parseInt(row.dataset.line);
    const item = cart.items[line - 1];
    row.querySelector('[data-action="dec"]').addEventListener('click', () => changeCartLine(line, item.quantity - 1));
    row.querySelector('[data-action="inc"]').addEventListener('click', () => changeCartLine(line, item.quantity + 1));
    row.querySelector('[data-action="remove"]').addEventListener('click', () => changeCartLine(line, 0));
  });

  updateCartBadge(cart);
}

async function changeCartLine(line, quantity) {
  await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ line, quantity: Math.max(0, quantity) }),
  });
  renderCartDrawer();
}

function openCart() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCart().then(updateCartBadge);

  document.querySelectorAll('.cart-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Carrosséis horizontais (Mais Vendidos, Coleção Moletons, Coleção Bermudas & Calças...)
  document.querySelectorAll('[data-carrossel]').forEach(wrap => {
    const track = wrap.querySelector('[data-carrossel-track]');
    if (!track) return;
    wrap.querySelector('[data-carrossel-prev]')?.addEventListener('click', () => {
      track.scrollBy({ left: -280, behavior: 'smooth' });
    });
    wrap.querySelector('[data-carrossel-next]')?.addEventListener('click', () => {
      track.scrollBy({ left: 280, behavior: 'smooth' });
    });
  });

  // Galeria de fotos na página de produto
  const galleryThumbs = document.getElementById('gallery-thumbs');
  const mainImg = document.getElementById('main-product-img');
  if (galleryThumbs && mainImg) {
    galleryThumbs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        galleryThumbs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mainImg.src = btn.dataset.full;
      });
    });
  }

  // Seletor de variante (tamanho) na página de produto
  const sizeGrid = document.getElementById('size-grid');
  const variantSelect = document.getElementById('variant-id-select');
  if (sizeGrid && variantSelect) {
    sizeGrid.querySelectorAll('.size-opt:not(.disabled)').forEach(el => {
      el.addEventListener('click', () => {
        sizeGrid.querySelectorAll('.size-opt').forEach(o => o.classList.remove('active'));
        el.classList.add('active');
        variantSelect.value = el.dataset.variantId;
      });
    });
  }

  // Quantidade na página de produto
  const qtyInput = document.getElementById('qty-input');
  const qtyDec = document.getElementById('qty-dec');
  const qtyInc = document.getElementById('qty-inc');
  if (qtyInput && qtyDec && qtyInc) {
    qtyDec.addEventListener('click', () => { qtyInput.value = Math.max(1, parseInt(qtyInput.value || 1) - 1); });
    qtyInc.addEventListener('click', () => { qtyInput.value = parseInt(qtyInput.value || 1) + 1; });
  }

  // Submit do formulário de produto via AJAX (Cart API)
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(productForm);
      const btn = document.getElementById('add-cart-btn');
      if (btn) { btn.disabled = true; btn.textContent = 'Adicionando...'; }

      try {
        await fetch('/cart/add.js', { method: 'POST', body: formData });
        const toast = document.getElementById('add-toast');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2200);
        }
        fetchCart().then(updateCartBadge);
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Adicionar ao Carrinho'; }
      }
    });
  }

  // Slider de banners promo (seção opcional, fora da home padrão)
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

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
});
