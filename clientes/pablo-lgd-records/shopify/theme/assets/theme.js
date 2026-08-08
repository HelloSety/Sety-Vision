/* ============================================================
   LGD RECORDS — Theme JS
   ============================================================ */

const LGD = {
  wpp: document.documentElement.dataset.wpp || '',
  variants: [],
  selected: {},

  money(cents) {
    return 'R$ ' + (cents / 100).toFixed(2).replace('.', ',');
  },

  /* ── MOBILE NAV ── */
  initMobileNav() {
    const ham = document.getElementById('hamburger');
    const nav = document.getElementById('mobileNav');
    const close = document.getElementById('mobileNavClose');
    ham?.addEventListener('click', () => { nav?.classList.add('open'); document.body.style.overflow = 'hidden'; });
    close?.addEventListener('click', () => { nav?.classList.remove('open'); document.body.style.overflow = ''; });
  },

  /* ── CART DRAWER ── */
  initCartDrawer() {
    const btn = document.getElementById('cartBtn');
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    const close = document.getElementById('cartClose');
    const open = () => { overlay?.classList.add('open'); drawer?.classList.add('open'); this.refreshCart(); };
    const shut = () => { overlay?.classList.remove('open'); drawer?.classList.remove('open'); };
    btn?.addEventListener('click', open);
    close?.addEventListener('click', shut);
    overlay?.addEventListener('click', shut);
    this.openCartDrawer = open;
  },

  refreshCart() {
    fetch('/cart.js').then(r => r.json()).then(cart => {
      document.getElementById('cartBadge').textContent = cart.item_count;
      document.getElementById('cartDrawerCount').textContent = cart.item_count;
      const body = document.getElementById('cartDrawerBody');
      if (!body) return;
      if (cart.item_count === 0) {
        body.innerHTML = `
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" stroke-width="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p class="cart-empty-label">Seu carrinho está vazio</p>`;
        return;
      }
      body.innerHTML = cart.items.map(item => `
        <div class="drawer-item">
          <img src="${item.image}" alt="${item.product_title}">
          <div>
            <p class="drawer-item-name">${item.product_title}</p>
            <p class="drawer-item-meta">${item.variant_title || ''} · Qtd ${item.quantity}</p>
            <p class="drawer-item-meta">${this.money(item.line_price)}</p>
          </div>
        </div>`).join('');
    }).catch(() => {});
  },

  /* ── ACCORDION ── */
  initAccordion() {
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const acc = document.getElementById(btn.dataset.acc);
        const open = acc?.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  },

  /* ── GALLERY ── */
  initGallery() {
    const mainImg = document.getElementById('galleryMain');
    if (!mainImg) return;
    document.querySelectorAll('.prod-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImg.style.opacity = '0';
        setTimeout(() => { mainImg.src = thumb.dataset.src; mainImg.style.opacity = '1'; }, 150);
        document.querySelectorAll('.prod-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  },

  /* ── QUANTITY ── */
  initQty() {
    const minus = document.getElementById('qtyMinus');
    const plus = document.getElementById('qtyPlus');
    const num = document.getElementById('qtyNum');
    if (!minus || !plus || !num) return;
    minus.addEventListener('click', () => { if (+num.value > 1) { num.value = +num.value - 1; this.updateWpp(); } });
    plus.addEventListener('click', () => { if (+num.value < 10) { num.value = +num.value + 1; this.updateWpp(); } });
  },

  /* ── PRODUCT VARIANTS ── */
  initVariants() {
    const script = document.getElementById('productVariants');
    if (!script) return;
    try { this.variants = JSON.parse(script.textContent); } catch (e) { this.variants = []; }

    document.querySelectorAll('.sz-btn, .color-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.classList.contains('sz-btn') ? '.sz-btn' : '.color-swatch';
        const idx = btn.dataset.optIndex;
        document.querySelectorAll(group).forEach(b => { if (b.dataset.optIndex === idx) b.classList.remove('active'); });
        btn.classList.add('active');
        this.selected['option' + idx] = btn.dataset.optValue;
        if (group === '.color-swatch') {
          const lbl = document.getElementById('colorSelected');
          if (lbl) lbl.textContent = btn.dataset.name;
        }
        this.matchVariant();
      });
    });

    // pre-select first available options
    document.querySelectorAll('.sz-btn').forEach(b => { if (!b.classList.contains('unavailable') && !this.selected['option' + b.dataset.optIndex]) b.click(); });
    document.querySelectorAll('.color-swatch').forEach(b => { if (!this.selected['option' + b.dataset.optIndex]) b.click(); });
  },

  matchVariant() {
    const variant = this.variants.find(v => {
      return Object.keys(this.selected).every(key => {
        const idx = key.replace('option', '');
        return v['option' + idx] === this.selected[key];
      });
    });
    if (!variant) return;
    const input = document.getElementById('variantId');
    if (input) input.value = variant.id;
    const priceEl = document.getElementById('prodPrice');
    if (priceEl) priceEl.textContent = this.money(variant.price);
    const pixEl = document.getElementById('prodPix');
    if (pixEl) pixEl.textContent = this.money(Math.round(variant.price * 0.95)) + ' com Pix';
    const installEl = document.getElementById('prodInstall');
    if (installEl) installEl.textContent = '2 x de ' + this.money(Math.round(variant.price / 2)) + ' sem juros';
    const buyBtn = document.getElementById('btnAddCart');
    if (buyBtn) buyBtn.disabled = !variant.available;
    this.updateWpp(variant);
  },

  updateWpp(variant) {
    const btn = document.getElementById('btnWpp');
    if (!btn) return;
    variant = variant || this.variants.find(v => v.id == document.getElementById('variantId')?.value);
    const title = document.querySelector('.prod-name')?.textContent || '';
    const price = variant ? this.money(variant.price) : '';
    const qty = document.getElementById('qtyNum')?.value || 1;
    const variantTitle = variant && variant.title !== 'Default Title' ? variant.title : '';
    const msg = `Olá! Quero comprar:\n\n*Produto:* ${title}${variantTitle ? '\n*Opção:* ' + variantTitle : ''}\n*Preço:* ${price}\n*Quantidade:* ${qty}\n\nPor favor, me envie mais informações!`;
    btn.href = `https://wa.me/${this.wpp}?text=${encodeURIComponent(msg)}`;
  },

  /* ── ADD TO CART (AJAX) ── */
  initAddToCart() {
    const form = document.getElementById('productForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = document.getElementById('btnAddCart');
      const original = btn.textContent;
      btn.textContent = 'ADICIONANDO...';
      btn.disabled = true;
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: document.getElementById('variantId').value, quantity: document.getElementById('qtyNum').value })
      })
        .then(r => r.json())
        .then(() => { this.openCartDrawer?.(); })
        .catch(() => { window.location.href = '/cart'; })
        .finally(() => { btn.textContent = original; btn.disabled = false; });
    });
  },

  initCookieBar() {
    const bar = document.getElementById('cookieBar');
    if (!bar || localStorage.getItem('lgd_cookies_ok')) return;
    setTimeout(() => bar.classList.add('show'), 800);
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      bar.classList.remove('show');
      localStorage.setItem('lgd_cookies_ok', '1');
    });
  },

  init() {
    this.initMobileNav();
    this.initCartDrawer();
    this.initAccordion();
    this.initGallery();
    this.initQty();
    this.initVariants();
    this.initAddToCart();
    this.initCookieBar();
  }
};

document.addEventListener('DOMContentLoaded', () => LGD.init());
