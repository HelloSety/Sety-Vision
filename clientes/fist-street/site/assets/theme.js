function fmtBRL(cents) {
  return 'R$ ' + (cents / 100).toFixed(2).replace('.', ',');
}

async function fetchCart() {
  const res = await fetch('/cart.js');
  return res.json();
}

function updateCartBadge(cart) {
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = cart.item_count);
}

function cartItemRowHTML(item, index) {
  const details = [];
  if (item.variant_title && item.variant_title !== 'Default Title') details.push('Tam: ' + item.variant_title);
  (item.properties ? Object.entries(item.properties) : []).forEach(([k, v]) => {
    if (v) details.push(k + ': ' + v);
  });
  return `
    <div class="cart-item" data-line="${index + 1}" data-key="${item.key}">
      <img src="${item.image}&width=128" alt="${item.product_title}">
      <div class="cart-item-info">
        <h4>${item.product_title}</h4>
        ${details.length ? `<span class="cart-item-details">${details.join(' · ')}</span>` : ''}
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" type="button">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="inc" type="button">+</button>
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
  let drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  drawer.innerHTML = `
    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-panel">
      <div class="cart-header">
        <h3>Seu Carrinho (${cart.item_count})</h3>
        <button class="cart-close" id="cart-close" type="button">✕</button>
      </div>
      <div class="cart-body">
        ${cart.items.length ? cart.items.map(cartItemRowHTML).join('') : '<p class="cart-empty">Seu carrinho está vazio.</p>'}
      </div>
      ${cart.items.length ? `
        <div class="cart-footer">
          <div class="cart-total-row"><span>Total</span><span class="cart-total">${fmtBRL(cart.total_price)}</span></div>
          <a class="btn-primary cart-checkout" style="display:block;text-align:center" href="/checkout">Finalizar Compra</a>
        </div>
      ` : ''}
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

  // Slider de banners promo (home)
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

  // Quick add — botão de carrinho rápido nos cards de produto (grid/catálogo)
  const quickAddBar = document.getElementById('quick-add-bar');
  if (quickAddBar) {
    let selectedVariantId = null;

    function closeQuickAdd() {
      quickAddBar.classList.remove('open');
    }

    async function openQuickAdd(handle) {
      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();
      const variant = product.variants.find(v => v.available) || product.variants[0];
      selectedVariantId = variant.id;

      const hasSize = variant.option1 && variant.option1 !== 'Default Title';
      const imgUrl = product.featured_image ? product.featured_image + '&width=120' : '';

      quickAddBar.innerHTML = `
        <div class="quick-add-bar-inner">
          <img src="${imgUrl}" alt="${product.title}">
          <div class="quick-add-info">
            <h4>${product.title}</h4>
            ${hasSize ? `<span>Tam: ${variant.option1}</span>` : ''}
          </div>
          <div class="quick-add-price">
            ${product.compare_at_price > variant.price ? `<span class="price-old">${fmtBRL(product.compare_at_price)}</span>` : ''}
            <span class="price-now">${fmtBRL(variant.price)}</span>
          </div>
          <button type="button" class="btn-primary quick-add-confirm" id="quick-add-confirm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>Adicionar ao Carrinho</span>
          </button>
          <button type="button" class="quick-add-close" id="quick-add-close" type="button">✕</button>
        </div>`;

      document.getElementById('quick-add-close').addEventListener('click', closeQuickAdd);
      document.getElementById('quick-add-confirm').addEventListener('click', async () => {
        const btn = document.getElementById('quick-add-confirm');
        btn.disabled = true;
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedVariantId, quantity: 1 }),
        });
        closeQuickAdd();
        if (res.ok) {
          openCart();
        } else {
          fetchCart().then(updateCartBadge);
          btn.disabled = false;
        }
      });

      quickAddBar.classList.add('open');
    }

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-add-btn');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        openQuickAdd(btn.dataset.productHandle);
      }
    });
  }

  // Setas de navegação das fileiras de produto (scroll horizontal)
  document.querySelectorAll('.products-row-wrap').forEach(wrap => {
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

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
});
