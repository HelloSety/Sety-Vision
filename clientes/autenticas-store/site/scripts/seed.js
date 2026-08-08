// Popula o banco (Neon) com o catálogo inicial + banners/tema atuais.
// Uso: DATABASE_URL=... node scripts/seed.js
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('Defina DATABASE_URL antes de rodar o seed.');
  process.exit(1);
}
const sql = neon(url);

const DEFAULT_STOCK = 15;

const SIZES_BY_CATEGORY = {
  roupas: ['P', 'M', 'G', 'GG'],
  tenis: ['38', '39', '40', '41', '42', '43'],
  chinelos: ['37/38', '39/40', '41/42', '43/44'],
  acessorios: ['Único (ajustável)'],
};

function ig(file) { return `assets/instagram/${file}`; }
function pd(file) { return `assets/produtos/${file}`; }

const PRODUCTS = [
  { id: 'polo-piquet', category: 'roupas', collections: ['mais-vendidos'], name: 'Polo Piquet Premium', featured: true, price: 99.90, oldPrice: 169.90, installment: '3x de R$ 33,30 sem juros', tagline: 'Piquet 100% algodão, caimento reto e bordado no peito — clássico que nunca sai de moda.', variants: [{ name: 'Azul Marinho', img: ig('post-1.jpg') }, { name: 'Preta', img: ig('post-1.jpg') }, { name: 'Off-White', img: ig('post-1.jpg') }] },
  { id: 'camiseta-losango', category: 'roupas', collections: ['novidades'], name: 'Camiseta Gola Losango', featured: true, price: 79.90, oldPrice: 129.90, installment: '3x de R$ 26,63 sem juros', tagline: 'Estampa argyle exclusiva com bordado no peito — visual clean pra qualquer combinação.', variants: [{ name: 'Preta', img: ig('post-9.jpg') }] },
  { id: 'camiseta-listrada', category: 'roupas', collections: ['novidades', 'mais-vendidos'], name: 'Camiseta Listrada Premium', featured: true, price: 89.90, oldPrice: 149.90, installment: '3x de R$ 29,97 sem juros', tagline: 'Faixa frontal em contraste, tecido encorpado — a peça que mais sai da loja.', variants: [{ name: 'Branca', img: ig('post-11.jpg') }] },
  { id: 'calca-jeans-destroyed', category: 'roupas', collections: ['mais-vendidos'], name: 'Calça Jeans Destroyed', featured: true, price: 139.90, oldPrice: 219.90, installment: '3x de R$ 46,63 sem juros', tagline: 'Lavagem escura com puídos estratégicos — corte reto confortável pro dia a dia.', variants: [{ name: 'Jeans Escuro', img: ig('post-2.jpg') }] },

  { id: 'tenis-mcqueen-preto', category: 'tenis', collections: ['mais-vendidos'], name: 'Tênis Alexander McQueen', featured: true, price: 285.00, oldPrice: 429.90, installment: '6x de R$ 47,50 sem juros', tagline: 'Silhueta oversized em couro premium — o queridinho da coleção, sola alta em branco.', variants: [{ name: 'Preto', img: pd('tenis-mcqueen-preto.jpg') }, { name: 'Branco', img: pd('tenis-mcqueen-branco.jpg') }] },
  { id: 'tenis-zara-velcro', category: 'tenis', collections: ['novidades'], name: 'Tênis Zara Velcro', featured: true, price: 320.00, oldPrice: 469.90, installment: '6x de R$ 53,33 sem juros', tagline: 'Fechamento triplo velcro em couro liso — praticidade com visual premium.', variants: [{ name: 'Preto', img: pd('tenis-zara-velcro.jpg') }] },
  { id: 'tenis-gucci', category: 'tenis', collections: ['mais-vendidos'], name: 'Tênis Gucci Monograma', featured: true, price: 380.00, oldPrice: 549.90, installment: '6x de R$ 63,33 sem juros', tagline: 'Upper em monograma clássico com detalhes em couro liso — statement de closet.', variants: [{ name: 'Preto/Bege', img: pd('tenis-gucci.jpg') }] },
  { id: 'tenis-nike-court-vision', category: 'tenis', collections: ['novidades'], name: 'Nike Court Vision', featured: true, price: 280.00, oldPrice: 419.90, installment: '6x de R$ 46,67 sem juros', tagline: 'Clássico de quadra reinterpretado pro streetwear — leve, versátil, atemporal.', variants: [{ name: 'Preto', img: pd('tenis-nike-court-vision.jpg') }] },
  { id: 'tenis-mizuno-prophecy', category: 'tenis', collections: ['novidades'], name: 'Mizuno Prophecy 13', featured: true, price: 280.00, oldPrice: 419.90, installment: '6x de R$ 46,67 sem juros', tagline: 'Design técnico de performance com visual futurista — pra quem gosta de se diferenciar.', variants: [{ name: 'Preto/Azul', img: pd('tenis-mizuno-prophecy.jpg') }] },
  { id: 'tenis-nike-low', category: 'tenis', collections: ['mais-vendidos'], name: 'Nike Low', featured: true, price: 250.00, oldPrice: 379.90, installment: '6x de R$ 41,67 sem juros', tagline: 'O ícone preto e branco que nunca sai de linha — combina com tudo.', variants: [{ name: 'Preto/Branco', img: pd('tenis-nike-low.jpg') }] },
  { id: 'tenis-nike-twist', category: 'tenis', collections: ['novidades'], name: 'Nike Twist', featured: true, price: 285.00, oldPrice: 429.90, installment: '6x de R$ 47,50 sem juros', tagline: 'Solado chunky e cabedal texturizado — pegada streetwear em tom clean.', variants: [{ name: 'Branco', img: pd('tenis-nike-twist.jpg') }] },

  { id: 'slide-nike', category: 'chinelos', collections: ['mais-vendidos'], name: 'Slide Nike', featured: true, price: 65.00, oldPrice: 99.90, installment: '2x de R$ 32,50 sem juros', tagline: 'Conforto de sola macia com logo emborrachado — o slide mais pedido da loja.', variants: [{ name: 'Preto', img: pd('slide-nike.jpg') }] },
  { id: 'slide-gucci', category: 'chinelos', collections: ['novidades'], name: 'Slide Gucci', featured: true, price: 65.00, oldPrice: 99.90, installment: '2x de R$ 32,50 sem juros', tagline: 'Textura monograma injetada direto na sola — detalhe premium sem perder o conforto.', variants: [{ name: 'Preto', img: pd('slide-gucci.jpg') }] },
  { id: 'slide-hugoboss', category: 'chinelos', collections: ['novidades'], name: 'Slide Hugo Boss', featured: true, price: 65.00, oldPrice: 99.90, installment: '2x de R$ 32,50 sem juros', tagline: 'Logo em relevo sobre base bege — minimalista e confortável.', variants: [{ name: 'Bege', img: pd('slide-hugoboss.jpg') }] },
  { id: 'slide-croco', category: 'chinelos', collections: ['mais-vendidos'], name: 'Slide Croco', featured: true, price: 90.00, oldPrice: 139.90, installment: '2x de R$ 45,00 sem juros', tagline: 'Base bicolor com jacaré bordado — o clássico da linha Croco.', variants: [{ name: 'Branco', img: pd('slide-croco.jpg') }] },
  { id: 'asuna', category: 'chinelos', collections: ['novidades'], name: 'Sandália Asuna', featured: true, price: 185.00, oldPrice: 269.90, installment: '3x de R$ 61,67 sem juros', tagline: 'Fechamento em velcro com sola grossa off-white — o modelo mais exclusivo da linha.', variants: [{ name: 'Preta', img: pd('asuna.jpg') }] },

  { id: 'bone-quicksilver', category: 'acessorios', collections: ['mais-vendidos'], name: 'Boné Quick Silver', featured: true, price: 80.00, oldPrice: 129.90, installment: '2x de R$ 40,00 sem juros', tagline: 'Aba curva e fecho ajustável — leve e confortável pro dia a dia.', variants: [{ name: 'Cinza', img: pd('bone-quicksilver-cinza.jpg') }, { name: 'Preto', img: pd('bone-quicksilver-preto.jpg') }] },
  { id: 'bone-gucci-preto', category: 'acessorios', collections: ['novidades'], name: 'Boné Gucci Preto', featured: true, price: 89.90, oldPrice: 139.90, installment: '2x de R$ 44,95 sem juros', tagline: 'Monograma tom sobre tom com bordado dourado — discreto e elegante.', variants: [{ name: 'Preto', img: pd('bone-gucci-preto.jpg') }] },
  { id: 'bone-gucci-bege', category: 'acessorios', collections: ['mais-vendidos'], name: 'Boné Gucci Monograma', featured: true, price: 89.90, oldPrice: 139.90, installment: '2x de R$ 44,95 sem juros', tagline: 'Estampa monograma clássica com listra verde e vermelha — o mais icônico da grife.', variants: [{ name: 'Bege', img: pd('bone-gucci-bege.jpg') }] },
  { id: 'bone-lacoste-sport', category: 'acessorios', collections: [], name: 'Boné Lacoste Sport', featured: true, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Tecido esportivo respirável com jacaré bordado — pronto pro treino ou pro dia a dia.', variants: [{ name: 'Verde', img: pd('bone-lacoste-sport.jpg') }] },
  { id: 'bone-sport-furo', category: 'acessorios', collections: [], name: 'Boné Sport Furo', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Furos de ventilação e aba curva — pensado pra dias quentes.', variants: [{ name: 'Preto', img: pd('bone-sport-furo.jpg') }] },
  { id: 'bone-lacoste-nylon', category: 'acessorios', collections: ['novidades'], name: 'Boné Lacoste Nylon', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Bicolor em nylon impermeável — resistente e com pegada esportiva.', variants: [{ name: 'Preto/Verde', img: pd('bone-lacoste-nylon.jpg') }] },
  { id: 'bone-osascorte', category: 'acessorios', collections: [], name: 'Boné Osascorte Original', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Aba curva clássica com patch bordado — streetwear puro.', variants: [{ name: 'Branco', img: pd('bone-osascorte.jpg') }] },
  { id: 'bone-nike-nadal', category: 'acessorios', collections: [], name: 'Boné Nike Nadal', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Linha esportiva Nike com logo bordado — leve, ajustável, direto ao ponto.', variants: [{ name: 'Branco', img: pd('bone-nike-nadal.jpg') }, { name: 'Preto', img: pd('bone-nike-nadal.jpg') }] },
  { id: 'bone-brooksfield', category: 'acessorios', collections: [], name: 'Boné Brooksfield', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Corte clássico em algodão com patch bordado — combina com qualquer produção.', variants: [{ name: 'Branco', img: pd('bone-brooksfield.jpg') }] },
  { id: 'bone-tommy', category: 'acessorios', collections: ['novidades'], name: 'Boné Tommy', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Patch bordado colorido sobre base preta — clássico americano.', variants: [{ name: 'Preto', img: pd('bone-tommy.jpg') }] },
  { id: 'bone-polo', category: 'acessorios', collections: [], name: 'Boné Polo Ralph Lauren', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'O bordado do cavaleiro em dourado sobre preto — eterno clássico.', variants: [{ name: 'Preto', img: pd('bone-polo.jpg') }] },
  { id: 'bone-lv', category: 'acessorios', collections: [], name: 'Boné LV', featured: false, price: 89.90, oldPrice: 139.90, installment: '2x de R$ 44,95 sem juros', tagline: 'Estampa monograma clean em tom claro — sofisticação discreta.', variants: [{ name: 'Cinza', img: pd('bone-lv.jpg') }] },
  { id: 'bone-puma', category: 'acessorios', collections: [], name: 'Boné Puma 5-Panel', featured: false, price: 79.90, oldPrice: 119.90, installment: '2x de R$ 39,95 sem juros', tagline: 'Corte 5 painéis com aba reta — pegada skatista despojada.', variants: [{ name: 'Preto', img: pd('bone-puma.jpg') }, { name: 'Branco', img: pd('bone-puma.jpg') }] },
];

async function main() {
  let i = 0;
  for (const p of PRODUCTS) {
    const sizes = SIZES_BY_CATEGORY[p.category] || [];
    const variants = p.variants.map((v) => ({ ...v, stock: DEFAULT_STOCK }));
    await sql`
      insert into products (id, category, name, tagline, price, old_price, installment, featured, active, collections, sizes, variants, sort_order)
      values (
        ${p.id}, ${p.category}, ${p.name}, ${p.tagline}, ${p.price}, ${p.oldPrice || null}, ${p.installment},
        ${!!p.featured}, true, ${p.collections || []}, ${sizes}, ${JSON.stringify(variants)}::jsonb, ${i}
      )
      on conflict (id) do update set
        category = excluded.category, name = excluded.name, tagline = excluded.tagline,
        price = excluded.price, old_price = excluded.old_price, installment = excluded.installment,
        featured = excluded.featured, collections = excluded.collections, sizes = excluded.sizes,
        sort_order = excluded.sort_order
    `;
    console.log(`OK: ${p.id}`);
    i += 1;
  }

  await sql`
    insert into site_settings (key, value) values
      ('hero_banner', ${JSON.stringify({ desktop: 'assets/banners/hero-desktop.jpg', mobile: 'assets/banners/hero-mobile.jpg' })}::jsonb),
      ('promo_banner', ${JSON.stringify({ desktop: 'assets/banners/promo-desktop.jpg', mobile: 'assets/banners/promo-mobile.jpg' })}::jsonb),
      ('accent_color', ${JSON.stringify({ value: '#c9962e' })}::jsonb)
    on conflict (key) do nothing
  `;

  console.log(`Seed concluído: ${PRODUCTS.length} produtos + configurações iniciais.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
