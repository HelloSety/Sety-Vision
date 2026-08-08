/* Autênticas Store — catálogo real (fotos do Instagram @autenticas__store + catálogo de fornecedor, 2026-08-01) */

function ig(file) { return `assets/instagram/${file}`; }
function pd(file) { return `assets/produtos/${file}`; }

const CATEGORIES = [
  { id: 'roupas', label: 'Roupas' },
  { id: 'tenis', label: 'Tênis' },
  { id: 'chinelos', label: 'Chinelos' },
  { id: 'acessorios', label: 'Bonés & Acessórios' },
];

const COLLECTIONS = [
  { id: 'novidades', title: 'Novidades', subtitle: 'Acabou de chegar na loja — direto pra você.' },
  { id: 'mais-vendidos', title: 'Mais Vendidos', subtitle: 'Os queridinhos da Autênticas Store.' },
];

const BRAND = {
  logo: 'assets/logo.png',
  aboutImg: ig('post-7.jpg'),
};

const SIZES_BY_CATEGORY = {
  roupas: ['P', 'M', 'G', 'GG'],
  tenis: ['38', '39', '40', '41', '42', '43'],
  chinelos: ['37/38', '39/40', '41/42', '43/44'],
  acessorios: ['Único (ajustável)'],
};

const MEASURE_TABLES = {
  roupas: {
    headers: ['Tamanho', 'Busto (cm)', 'Comprimento (cm)', 'Manga (cm)'],
    rows: [
      ['P', '96 - 100', '68', '20'],
      ['M', '100 - 104', '70', '21'],
      ['G', '104 - 108', '72', '22'],
      ['GG', '108 - 112', '74', '23'],
    ],
    note: 'Medidas aproximadas, tiradas com a peça deitada. Entre dois tamanhos? Opte pelo maior.',
  },
  tenis: {
    headers: ['Numeração BR', 'Comprimento do pé (cm)'],
    rows: [['38', '24'], ['39', '24,5'], ['40', '25,5'], ['41', '26'], ['42', '27'], ['43', '27,5']],
    note: 'Meça o comprimento do pé do calcanhar até a ponta do dedo maior e compare com a tabela.',
  },
  chinelos: {
    headers: ['Numeração', 'Comprimento do pé (cm)'],
    rows: [['37/38', 'até 24'], ['39/40', '24 a 26'], ['41/42', '26 a 28'], ['43/44', '28 a 30']],
    note: 'Slides e sandálias têm numeração em faixas — se estiver entre duas, prefira a maior.',
  },
  acessorios: {
    headers: ['Tamanho', 'Circunferência'],
    rows: [['Único (ajustável)', '54cm a 62cm']],
    note: 'Ajuste traseiro (fivela ou snapback) — serve na maioria dos tamanhos de cabeça adulta.',
  },
};

/* ---------------- Card de produto (compartilhado entre home e página de produto) ---------------- */
function sizeChipsHTML(p) {
  if (!p.sizes || !p.sizes.length || p.sizes[0].indexOf('Único') === 0) return '';
  const visible = p.sizes.slice(0, 4);
  const extra = p.sizes.length - visible.length;
  return `
    <div class="card-sizes">
      ${visible.map((s) => `<span class="card-size-dot">${s}</span>`).join('')}
      ${extra > 0 ? `<span class="card-size-dot card-size-more">+${extra}</span>` : ''}
    </div>
    <div class="card-divider"></div>`;
}

function productCardHTML(p) {
  return `
    <div class="card" data-name="${p.name.toLowerCase()}" data-cat="${p.category}">
      <a class="card-img" href="produto.html?id=${p.id}">
        ${p.discountPct ? `<span class="badge badge-discount">-${p.discountPct}% OFF</span>` : ''}
        <span class="badge badge-shipping">Frete Grátis</span>
        <img src="${p.cover}" alt="${p.name}" loading="lazy" width="400" height="500">
      </a>
      <div class="card-body">
        <a href="produto.html?id=${p.id}"><h3>${p.name}</h3></a>
        ${p.colorCount > 1 ? `<span class="card-colors">${p.colorCount} cores disponíveis</span>` : ''}
        ${sizeChipsHTML(p)}
        <div class="price-row">
          <span class="price-now">${fmtBRL(p.price)}</span>
        </div>
        <span class="price-install">${p.installment}</span>
        <span class="price-pix">${fmtBRL(pixPrice(p.price))} no Pix (5% OFF)</span>
        <div class="card-cta-row">
          <a class="card-buy-btn" href="produto.html?id=${p.id}">Comprar</a>
          <a class="card-cart-btn" href="produto.html?id=${p.id}" aria-label="Ver produto ${p.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </a>
        </div>
      </div>
    </div>`;
}

/* ---------------- Dots de paginação de fileiras (home + produto) ---------------- */
function initRowDots() {
  document.querySelectorAll('.products-row-wrap').forEach((wrap) => {
    const row = wrap.querySelector('.products-row');
    if (!row) return;
    let dotsHost = wrap.nextElementSibling;
    if (!dotsHost || !dotsHost.classList.contains('row-dots')) {
      dotsHost = document.createElement('div');
      dotsHost.className = 'row-dots';
      wrap.insertAdjacentElement('afterend', dotsHost);
    }
    function metrics() {
      const cardEl = row.querySelector('.card');
      const cardWidth = (cardEl?.offsetWidth || 220) + 16;
      const perView = Math.max(1, Math.round(row.clientWidth / cardWidth));
      const pages = Math.max(1, Math.ceil(row.children.length / perView));
      return { cardWidth, perView, pages };
    }
    function build() {
      const { cardWidth, perView, pages } = metrics();
      if (pages <= 1) { dotsHost.innerHTML = ''; return; }
      dotsHost.innerHTML = Array.from({ length: pages }).map((_, i) =>
        `<button type="button" class="row-dot${i === 0 ? ' is-active' : ''}" data-page="${i}" aria-label="Página ${i + 1}"></button>`
      ).join('');
      dotsHost.querySelectorAll('.row-dot').forEach((dot) => {
        dot.addEventListener('click', () => {
          const { cardWidth: cw, perView: pv } = metrics();
          row.scrollTo({ left: Number(dot.dataset.page) * cw * pv, behavior: 'smooth' });
        });
      });
    }
    build();
    let ticking = false;
    row.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { cardWidth, perView } = metrics();
        const page = Math.round(row.scrollLeft / (cardWidth * perView));
        dotsHost.querySelectorAll('.row-dot').forEach((d, i) => d.classList.toggle('is-active', i === page));
        ticking = false;
      });
    }, { passive: true });
    window.addEventListener('resize', build);
  });
}

function withMeta(list) {
  list.forEach((p) => {
    p.collections = p.collections || [];
    p.cover = p.variants[0].img;
    p.colorCount = p.variants.length;
    p.discountPct = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    p.sizes = p.sizes || SIZES_BY_CATEGORY[p.category] || [];
  });
  return list;
}


/* ---------------- Produtos e configurações do site: vêm da API (banco), gerenciados pelo admin ---------------- */
let PRODUCTS = [];
let SETTINGS = {};

function fromApiProduct(row) {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    tagline: row.tagline || '',
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    installment: row.installment || '',
    featured: !!row.featured,
    collections: row.collections || [],
    sizes: row.sizes || [],
    variants: (row.variants || []).map((v) => ({ name: v.name, img: v.img })),
  };
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Falha ao carregar produtos');
    const data = await res.json();
    PRODUCTS = withMeta(data.map(fromApiProduct));
  } catch (err) {
    console.error(err);
    PRODUCTS = [];
  }
  return PRODUCTS;
}

async function fetchSettings() {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Falha ao carregar configurações');
    SETTINGS = await res.json();
  } catch (err) {
    console.error(err);
    SETTINGS = {};
  }
  applySettings();
  return SETTINGS;
}

function applyBannerOverride(selector, banner) {
  if (!banner?.desktop && !banner?.mobile) return;
  const picture = document.querySelector(`${selector} picture`);
  if (!picture) return;
  const img = picture.querySelector('img');

  // Substitui a estrutura inteira por algo simples (1 source mobile + img desktop) —
  // banners enviados pelo admin não têm variante WebP pré-otimizada, então não faz
  // sentido tentar preservar os <source type="image/webp"> originais do deploy.
  picture.querySelectorAll('source').forEach((s) => s.remove());
  if (banner.mobile) {
    const source = document.createElement('source');
    source.media = '(max-width: 767px)';
    source.srcset = banner.mobile;
    picture.insertBefore(source, img);
  }
  if (banner.desktop) img.src = banner.desktop;
}

function applySettings() {
  const accent = SETTINGS.accent_color?.value;
  if (accent) document.documentElement.style.setProperty('--gold', accent);

  applyBannerOverride('.hero-banner', SETTINGS.hero_banner);
  applyBannerOverride('.promo-banner', SETTINGS.promo_banner);
}
