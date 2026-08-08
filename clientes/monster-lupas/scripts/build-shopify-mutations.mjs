// Lê js/catalog.js do site estático e gera uma mutation GraphQL `productSet` por produto,
// pronta para rodar via `shopify store execute`. Roda em VM isolado (catalog.js é escrito pro browser, sem exports).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const SITE_BASE = 'https://site-pi-six-62.vercel.app';
const catalogSrc = readFileSync(new URL('../site/js/catalog.js', import.meta.url), 'utf8');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(catalogSrc + '\nthis.PRODUCTS = PRODUCTS; this.CATEGORIES = CATEGORIES;', sandbox);

const { PRODUCTS, CATEGORIES } = sandbox;

function resolveImg(p, v) {
  return p.local ? `${SITE_BASE}/assets/produtos/${p.dir}/${v.file}` : v.img;
}

function escapeGql(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function buildProductSetMutation(p) {
  const categoryLabel = CATEGORIES.find((c) => c.id === p.category)?.label || '';
  const variantsGql = p.variants.map((v) => `
      {
        optionValues: [{ optionName: "Cor", name: "${escapeGql(v.name)}" }]
        price: "${p.price.toFixed(2)}"
        compareAtPrice: "${p.oldPrice ? p.oldPrice.toFixed(2) : ''}"
        file: { originalSource: "${resolveImg(p, v)}", contentType: IMAGE }
      }`).join(',');

  const query = `mutation {
  productSet(input: {
    title: "${escapeGql('Óculos ' + p.name)}"
    descriptionHtml: "${escapeGql(p.tagline)}"
    productOptions: [{ name: "Cor", values: [${p.variants.map((v) => `{ name: "${escapeGql(v.name)}" }`).join(', ')}] }]
    tags: ["${escapeGql(categoryLabel)}"]
    variants: [${variantsGql}
    ]
  }) {
    product { id title handle }
    userErrors { field message }
  }
}`;
  return { id: p.id, name: p.name, query };
}

mkdirSync(new URL('./out', import.meta.url), { recursive: true });
const mutations = PRODUCTS.map(buildProductSetMutation);
mutations.forEach((m) => {
  writeFileSync(new URL(`./out/${m.id}.graphql`, import.meta.url), m.query, 'utf8');
});
writeFileSync(new URL('./out/manifest.json', import.meta.url), JSON.stringify(mutations.map((m) => ({ id: m.id, name: m.name })), null, 2));
console.log(`Gerados ${mutations.length} arquivos .graphql em scripts/out/`);
