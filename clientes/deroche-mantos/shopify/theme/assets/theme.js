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

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
});
