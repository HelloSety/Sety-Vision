const CART_KEY = 'deroche_cart';
const PERSONALIZABLE_CATS = ['futebol', 'nba', 'infantil'];

function canPersonalize(id) {
  const p = PRODUCTS[id];
  return p && PERSONALIZABLE_CATS.includes(p.category);
}

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, opts) {
  opts = opts || {};
  const cart = getCart();
  cart.push({
    id,
    size: opts.size || null,
    name: opts.name || '',
    number: opts.number || '',
    qty: opts.qty || 1,
  });
  saveCart(cart);
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartDrawer();
}
function setCartQty(index, qty) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].qty = Math.max(1, qty);
    saveCart(cart);
    renderCartDrawer();
  }
}
function cartCount() {
  return getCart().reduce((s, item) => s + item.qty, 0);
}
function cartTotal() {
  return getCart().reduce((s, item) => {
    const p = PRODUCTS[item.id];
    return s + (p ? priceOf(p) * item.qty : 0);
  }, 0);
}
function updateCartBadge() {
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartCount());
}

function cartWhatsAppLink() {
  const cart = getCart();
  let msg = 'Olá! Gostaria de finalizar meu pedido:\n\n';
  cart.forEach((item, i) => {
    const p = PRODUCTS[item.id];
    if (!p) return;
    msg += `${i + 1}. ${p.name}\n`;
    const details = [];
    if (item.size) details.push(`Tamanho: ${item.size}`);
    if (item.name) details.push(`Nome: ${item.name.toUpperCase()}`);
    if (item.number) details.push(`Nº: ${item.number}`);
    if (details.length) msg += `   ${details.join(' | ')}\n`;
    msg += `   Qtd: ${item.qty} — ${fmtBRL(priceOf(p) * item.qty)}\n\n`;
  });
  msg += `------------------------\nTotal: ${fmtBRL(cartTotal())}\n\nPode me ajudar a fechar o pedido?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function cartItemRowHTML(item, index) {
  const p = PRODUCTS[item.id];
  if (!p) return '';
  const details = [];
  if (item.size) details.push(`Tam: ${item.size}`);
  if (item.name) details.push(`Nome: ${item.name.toUpperCase()}`);
  if (item.number) details.push(`Nº: ${item.number}`);
  return `
    <div class="cart-item" data-index="${index}">
      <img src="${imgSrc(p.img)}" alt="${p.name}">
      <div class="cart-item-info">
        <h4>${p.name}</h4>
        ${details.length ? `<span class="cart-item-details">${details.join(' · ')}</span>` : ''}
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">${fmtBRL(priceOf(p) * item.qty)}</span>
        <button class="cart-item-remove" data-action="remove">Remover</button>
      </div>
    </div>`;
}

function renderCartDrawer() {
  let drawer = document.getElementById('cart-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    document.body.appendChild(drawer);
  }
  const cart = getCart();
  drawer.innerHTML = `
    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-panel">
      <div class="cart-header">
        <h3>Seu Carrinho (${cartCount()})</h3>
        <button class="cart-close" id="cart-close">✕</button>
      </div>
      <div class="cart-body">
        ${cart.length ? cart.map(cartItemRowHTML).join('') : '<p class="cart-empty">Seu carrinho está vazio.</p>'}
      </div>
      ${cart.length ? `
        <div class="cart-footer">
          <div class="cart-total-row"><span>Total</span><span class="cart-total">${fmtBRL(cartTotal())}</span></div>
          <a class="btn-primary cart-checkout" style="display:block;text-align:center" href="${cartWhatsAppLink()}" target="_blank" rel="noopener">Finalizar Pedido no WhatsApp</a>
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  drawer.querySelectorAll('.cart-item').forEach(row => {
    const index = parseInt(row.dataset.index);
    const item = cart[index];
    row.querySelector('[data-action="dec"]').addEventListener('click', () => setCartQty(index, item.qty - 1));
    row.querySelector('[data-action="inc"]').addEventListener('click', () => setCartQty(index, item.qty + 1));
    row.querySelector('[data-action="remove"]').addEventListener('click', () => removeFromCart(index));
  });
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
  updateCartBadge();
  document.querySelectorAll('.cart-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });
});
