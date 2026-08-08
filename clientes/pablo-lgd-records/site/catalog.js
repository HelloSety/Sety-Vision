// Configuração — troque aqui quando o número oficial mudar
const WHATSAPP_NUMBER = '558581670451';

const CATEGORY_LABELS = {
  novidades: 'Novidades',
  camisas: 'Camisas',
  antigas: 'Camisas Antigas',
  americanas: 'Camisas Americanas',
  compressao: 'Compressão',
  regatas: 'Regatas',
  cuecas: 'Cuecas',
  promocoes: 'Promoções',
};

let PRODUCTS = {};

async function loadProducts(){
  const r = await fetch('/api/products');
  const list = await r.json();
  const map = {};
  list.filter(p => p.active !== false).forEach(p => {
    map[p.id] = {
      name: p.name,
      category: p.category,
      price: Number(p.price),
      promoPrice: p.promo_price != null ? Number(p.promo_price) : undefined,
      imgs: p.images && p.images.length ? p.images : undefined,
      variants: p.variants && p.variants.length ? p.variants : undefined,
      desc: p.description,
      tags: p.tags || [],
    };
  });
  PRODUCTS = map;
}

function imgSrc(name) { return /^https?:\/\//.test(name) ? name : 'assets/' + name; }

async function loadSettings(){
  const r = await fetch('/api/settings');
  return r.json();
}
function imgsOf(p, variantIndex) { return p.variants ? p.variants[variantIndex || 0].imgs : p.imgs; }
function priceOf(p) { return p.promoPrice ?? p.price; }
function fmtBRL(v) { return 'R$' + v.toFixed(2).replace('.', ','); }
function pixOf(p) { return priceOf(p) * 0.95; }
function installOf(p) { return priceOf(p) / 2; }

function waLink(id, extra) {
  const p = PRODUCTS[id];
  const msg = `Olá! Tenho interesse neste produto:\n*${p.name}*\nValor: ${fmtBRL(priceOf(p))}${extra || ''}\nPode me enviar mais informações?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function matchesCat(p, cat) {
  if (cat === 'todos') return true;
  if (cat === 'novidades') return (p.tags || []).includes('novidade');
  if (cat === 'promocoes') return !!p.promoPrice;
  return p.category === cat;
}
