/* Autênticas Store — utilitários compartilhados entre index.html, produto.html e checkout.html
   ATENÇÃO: número de WhatsApp abaixo é placeholder. Trocar por número real antes de publicar. */
const WHATS_NUMBER = '55XXXXXXXXXXX';

/* ---------------- Marquee (compartilhado entre todas as páginas) ---------------- */
function renderMarquee() {
  const items = [
    'Envio para todo o Brasil', 'Compra Segura', 'Qualidade Máxima e Preço Justo',
    'Pague com Pix e ganhe 5% OFF', 'Estoque à Pronta-Entrega',
  ];
  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>';
  const oneSet = items.map((t) => `<span class="marquee__item">${icon}${t}</span>`).join('');
  document.getElementById('marqueeTrack').innerHTML = oneSet + oneSet;
}

const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pixPrice = (n) => n * 0.95;

function waLink(text) {
  return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ---------------- Comprar Agora — vai direto pro checkout.html com este item
   (sempre passa pelo formulário de dados/endereço antes do Mercado Pago,
   pra sabermos pra onde enviar o produto). ---------------- */
const BUYNOW_KEY = 'as_buynow';
function buyNow(id, color, size, img, qty = 1) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  sessionStorage.setItem(BUYNOW_KEY, JSON.stringify([{ id, name: product.name, color, size, price: product.price, img, qty }]));
  window.location.href = 'checkout.html';
}

/* ---------------- Ícones de pagamento (logos oficiais reais, não desenhos aproximados) ---------------- */
const PAYMENT_ICONS_HTML = `
  <img src="assets/pagamento/pix.svg" alt="Pix" height="27" loading="lazy">
  <img src="assets/pagamento/visa.svg" alt="Visa" height="27" loading="lazy">
  <img src="assets/pagamento/mastercard.svg" alt="Mastercard" height="27" loading="lazy">
  <img src="assets/pagamento/elo.svg" alt="Elo" height="27" loading="lazy">
  <img src="assets/pagamento/amex.svg" alt="American Express" height="27" loading="lazy">
  <img src="assets/pagamento/hipercard.svg" alt="Hipercard" height="27" loading="lazy">
`;

function renderPaymentIcons() {
  document.querySelectorAll('.payment-icons').forEach((el) => { el.innerHTML = PAYMENT_ICONS_HTML; });
}

/* ---------------- CTA genérico de WhatsApp (header, footer, botão flutuante) ---------------- */
function initWhatsCTA() {
  document.querySelectorAll('[data-whats-cta]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(waLink('Olá! Tenho uma dúvida sobre os produtos da Autênticas Store.'), '_blank');
    });
  });
}
