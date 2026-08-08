/* Autênticas Store — página de checkout (checkout.html). Item vem de sessionStorage (buyNow, em js/cart.js). */

function getCheckoutItems() {
  try { return JSON.parse(sessionStorage.getItem(BUYNOW_KEY)) || []; } catch { return []; }
}

function clearCheckoutItems() {
  sessionStorage.removeItem(BUYNOW_KEY);
}

function renderCheckoutItems() {
  const items = getCheckoutItems();
  const itemsEl = document.getElementById('checkoutItems');
  const form = document.getElementById('checkoutForm');
  const emptyEl = document.getElementById('checkoutEmpty');

  if (!items.length) {
    form.style.display = 'none';
    emptyEl.style.display = 'block';
    return false;
  }

  itemsEl.innerHTML = items.map((item) => `
    <div class="checkout-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="checkout-item-info">
        <h4>${item.name}</h4>
        <span>${item.color}${item.size ? ` • Tam. ${item.size}` : ''} — Qtd. ${item.qty || 1}</span>
      </div>
      <span class="checkout-item-price">${fmtBRL(item.price * (item.qty || 1))}</span>
    </div>
  `).join('');

  const total = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  document.getElementById('checkoutSubtotal').textContent = fmtBRL(total);
  document.getElementById('checkoutTotal').textContent = fmtBRL(total);
  return true;
}

function digitsOnly(v) { return (v || '').replace(/\D/g, ''); }

function initCepLookup() {
  const cepInput = document.getElementById('addrCep');
  cepInput.addEventListener('blur', async () => {
    const cep = digitsOnly(cepInput.value);
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) return;
      document.getElementById('addrStreet').value = data.logradouro || '';
      document.getElementById('addrDistrict').value = data.bairro || '';
      document.getElementById('addrCity').value = data.localidade || '';
      document.getElementById('addrState').value = data.uf || '';
      document.getElementById('addrNumber').focus();
    } catch {
      // busca de CEP é só uma conveniência — se falhar, cliente preenche na mão
    }
  });
}

function showError(msg) {
  const el = document.getElementById('checkoutError');
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function initCheckoutSubmit() {
  const form = document.getElementById('checkoutForm');
  const submitBtn = document.getElementById('checkoutSubmit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('checkoutError').style.display = 'none';

    const items = getCheckoutItems();
    if (!items.length) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Processando...';

    const payload = {
      items: items.map((i) => ({ id: i.id, color: i.color, size: i.size, qty: i.qty || 1 })),
      customer: {
        name: document.getElementById('custName').value.trim(),
        phone: document.getElementById('custPhone').value.trim(),
        email: document.getElementById('custEmail').value.trim(),
      },
      shipping: {
        cep: digitsOnly(document.getElementById('addrCep').value),
        street: document.getElementById('addrStreet').value.trim(),
        number: document.getElementById('addrNumber').value.trim(),
        complement: document.getElementById('addrComplement').value.trim(),
        district: document.getElementById('addrDistrict').value.trim(),
        city: document.getElementById('addrCity').value.trim(),
        state: document.getElementById('addrState').value.trim().toUpperCase(),
      },
    };

    try {
      const res = await fetch('/api/checkout/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Não foi possível iniciar o pagamento.');

      clearCheckoutItems();
      window.location.href = data.initPoint;
    } catch (err) {
      showError(err.message || 'Erro ao processar seu pedido. Tente novamente.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Pagar com Mercado Pago';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderMarquee();
  const hasItems = renderCheckoutItems();
  if (hasItems) {
    initCepLookup();
    initCheckoutSubmit();
  }
  renderPaymentIcons();
});
