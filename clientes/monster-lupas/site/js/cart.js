/* Monster Lupas — carrinho compartilhado entre index.html e produto.html */
const WHATS_NUMBER = '5511996802806';

const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pixPrice = (n) => n * 0.95;

function waLink(text) {
  return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(text)}`;
}

const CART_KEY = 'ml_cart';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(id, color, img, qty = 1) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((i) => i.id === id && i.color === color);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name: product.name, color, price: product.price, img, qty });
  }
  saveCart(cart);
  renderCart();
  openCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function changeQty(index, delta) {
  const cart = getCart();
  const item = cart[index];
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById('cartItems');
  const badge = document.getElementById('cartBadge');
  const count = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const pixRow = document.getElementById('cartPixRow');
  const pixEl = document.getElementById('cartPixTotal');
  const gamify = document.getElementById('cartGamify');
  const totalUnits = cart.reduce((s, i) => s + (i.qty || 1), 0);

  badge.textContent = totalUnits;
  count.textContent = totalUnits;

  if (!cart.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛍️</span>
        <p>Seu carrinho está vazio</p>
        <span>Escolha seus óculos e garanta a oferta exclusiva</span>
        <a href="index.html#produtos" class="cart-empty-btn">Ver coleção</a>
      </div>`;
  } else {
    itemsEl.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-details">${item.color}</span>
          <div class="cart-item-qty">
            <button type="button" data-qty-minus="${i}" aria-label="Diminuir quantidade">−</button>
            <span>${item.qty || 1}</span>
            <button type="button" data-qty-plus="${i}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${fmtBRL(item.price * (item.qty || 1))}</span>
          <span class="cart-item-remove" data-remove="${i}">remover</span>
        </div>
      </div>
    `).join('');
    itemsEl.querySelectorAll('[data-remove]').forEach((el) => {
      el.addEventListener('click', () => removeFromCart(Number(el.dataset.remove)));
    });
    itemsEl.querySelectorAll('[data-qty-plus]').forEach((el) => {
      el.addEventListener('click', () => changeQty(Number(el.dataset.qtyPlus), 1));
    });
    itemsEl.querySelectorAll('[data-qty-minus]').forEach((el) => {
      el.addEventListener('click', () => changeQty(Number(el.dataset.qtyMinus), -1));
    });
  }

  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  totalEl.textContent = fmtBRL(total);
  if (pixRow && pixEl) {
    pixRow.style.display = total > 0 ? 'flex' : 'none';
    pixEl.textContent = fmtBRL(pixPrice(total));
  }

  if (totalUnits === 0) {
    gamify.innerHTML = '';
  } else if (totalUnits % 2 === 1) {
    gamify.innerHTML = '🎁 Adicione mais 1 óculos e ative a promoção <b>Compre 1, Leve 2</b>';
  } else {
    gamify.innerHTML = '🎉 Promoção <b>Compre 1, Leve 2</b> ativada nesse pedido!';
  }

  const checkoutBtn = document.getElementById('cartCheckout');
  const summary = cart.map((i) => `• ${i.qty || 1}x ${i.name} (${i.color})`).join('\n');
  const text = cart.length
    ? `Olá! Quero fechar pedido na Monster Lupas:\n${summary}\nTotal: ${fmtBRL(total)}\nNo Pix (5% off): ${fmtBRL(pixPrice(total))}`
    : 'Olá! Tenho uma dúvida sobre os óculos da Monster Lupas.';
  checkoutBtn.href = waLink(text);
  checkoutBtn.classList.toggle('is-disabled', cart.length === 0);
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('is-open');
  document.getElementById('overlay').classList.add('is-open');
}
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('is-open');
  document.getElementById('overlay').classList.remove('is-open');
  document.getElementById('mainNav')?.classList.remove('is-open');
}

function initCartUI() {
  document.getElementById('overlay').addEventListener('click', closeCart);
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);

  document.querySelectorAll('[data-whats-cta]').forEach((el) => {
    if (el.id === 'cartCheckout') return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(waLink('Olá! Tenho uma dúvida sobre os óculos da Monster Lupas.'), '_blank');
    });
  });
}
