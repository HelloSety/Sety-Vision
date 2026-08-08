// Catálogo L2 Store — produtos de EXEMPLO (estimated: true), sem fotos/preços reais ainda.
// Todos os itens precisam ser confirmados/trocados pelo cliente antes de publicar de verdade.
const SIZES_ADULTO = ['P', 'M', 'G', 'GG'];
const SIZES_NUMERICO = ['38', '40', '42', '44', '46'];
const SIZES_UNICO = ['Único'];

const PRODUCTS = [
  { handle: 'camiseta-nike-dri-fit-basic', title: 'Camiseta Nike Dri-Fit Basic', vendor: 'Nike', type: 'camisetas', price: 129.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Camiseta básica Nike Dri-Fit, tecido leve e confortável para o dia a dia.' },
  { handle: 'camiseta-jordan-jumpman', title: 'Camiseta Estampada Jordan Jumpman', vendor: 'Jordan', type: 'camisetas', price: 149.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Camiseta estampada com o logo Jumpman, corte streetwear.' },
  { handle: 'camiseta-tommy-flag', title: 'Camiseta Tommy Hilfiger Flag', vendor: 'Tommy Hilfiger', type: 'camisetas', price: 139.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Camiseta com bordado flag Tommy Hilfiger no peito.' },
  { handle: 'camiseta-adidas-trefoil', title: 'Camiseta Adidas Trefoil', vendor: 'Adidas', type: 'camisetas', price: 119.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Camiseta clássica Adidas com logo Trefoil estampado.' },
  { handle: 'tenis-nike-air-max', title: 'Tênis Nike Air Max', vendor: 'Nike', type: 'tenis', price: 399.90, sizes: SIZES_NUMERICO, estimated: true,
    desc: 'Tênis Nike Air Max, amortecimento visível e conforto pro dia a dia.' },
  { handle: 'tenis-jordan-1-low', title: 'Tênis Jordan 1 Low', vendor: 'Jordan', type: 'tenis', price: 549.90, sizes: SIZES_NUMERICO, estimated: true,
    desc: 'Tênis Jordan 1 Low, clássico atemporal do streetwear.' },
  { handle: 'tenis-adidas-superstar', title: 'Tênis Adidas Superstar', vendor: 'Adidas', type: 'tenis', price: 349.90, sizes: SIZES_NUMERICO, estimated: true,
    desc: 'Tênis Adidas Superstar, shell toe icônico.' },
  { handle: 'calca-cargo-nike-tech', title: 'Calça Cargo Nike Tech', vendor: 'Nike', type: 'calcas', price: 219.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Calça cargo Nike Tech Fleece, bolsos utilitários e caimento reto.' },
  { handle: 'calca-jeans-tommy', title: 'Calça Jeans Reta Tommy', vendor: 'Tommy Hilfiger', type: 'calcas', price: 199.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Calça jeans reta Tommy Hilfiger, lavagem clássica.' },
  { handle: 'calca-moletom-jordan', title: 'Calça Moletom Jordan', vendor: 'Jordan', type: 'calcas', price: 179.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Calça de moletom Jordan, punho elástico e bolsos laterais.' },
  { handle: 'bone-aba-reta-nike', title: 'Boné Aba Reta Nike', vendor: 'Nike', type: 'bones', price: 89.90, sizes: SIZES_UNICO, estimated: true,
    desc: 'Boné aba reta Nike, ajuste snapback.' },
  { handle: 'bone-new-era-classic', title: 'Boné New Era Classic', vendor: 'New Era', type: 'bones', price: 99.90, sizes: SIZES_UNICO, estimated: true,
    desc: 'Boné New Era modelo clássico, aba reta.' },
  { handle: 'bone-adidas-trucker', title: 'Boné Adidas Trucker', vendor: 'Adidas', type: 'bones', price: 79.90, sizes: SIZES_UNICO, estimated: true,
    desc: 'Boné trucker Adidas, tela respirável na parte de trás.' },
  { handle: 'corta-vento-nike-windrunner', title: 'Corta-Vento Nike Windrunner', vendor: 'Nike', type: 'jaquetas', price: 249.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Corta-vento Nike Windrunner, leve e resistente ao vento.' },
  { handle: 'jaqueta-puma-track', title: 'Jaqueta Puma Track', vendor: 'Puma', type: 'jaquetas', price: 229.90, sizes: SIZES_ADULTO, estimated: true,
    desc: 'Jaqueta corta-vento Puma Track, listras laterais clássicas.' },
];

const CATEGORIES = [
  { id: 'camisetas', label: 'Camisetas', img: 'assets/banners/cat-camisetas.svg' },
  { id: 'tenis', label: 'Tênis', img: 'assets/banners/cat-tenis.svg' },
  { id: 'calcas', label: 'Calças', img: 'assets/banners/cat-calcas.svg' },
  { id: 'bones', label: 'Bonés', img: 'assets/banners/cat-bones.svg' },
  { id: 'jaquetas', label: 'Jaquetas', img: 'assets/banners/cat-jaquetas.svg' },
];

const WHATSAPP_NUMBER = '5511985385239';

function fmtBRL(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function whatsLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function productCardHTML(p) {
  const img = `assets/produtos/${p.type}.svg`;
  return `
    <a class="produto-card" href="produto.html?p=${p.handle}">
      <div class="produto-card__imagem">
        ${p.estimated ? '<span class="produto-card__badge">Exemplo</span>' : ''}
        <img src="${img}" alt="${p.title}" loading="lazy">
      </div>
      <span class="produto-card__vendor">${p.vendor}</span>
      <p class="produto-card__nome">${p.title}</p>
      <hr class="produto-card__divisor">
      <p class="produto-card__preco">${fmtBRL(p.price)}</p>
      <span class="produto-card__pix">${fmtBRL(p.price * 0.9)} no Pix (10% OFF)</span>
      <div class="produto-card__cta">
        <span>Ver Produto</span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></span>
      </div>
    </a>`;
}
