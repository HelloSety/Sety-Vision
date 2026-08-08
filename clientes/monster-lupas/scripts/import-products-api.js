// Importa os 31 produtos na Shopify via Admin API (productSet + productCreateMedia + productVariantAppendMedia),
// com SEO otimizado por produto.
// Uso: node import-products-api.js [--only=handle] [--dry-run]
const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');
const { execFileSync } = require('child_process');

const CATALOG_PATH = path.join(__dirname, '..', 'site', 'js', 'catalog.js');
const IMAGE_BASE_URL = 'https://site-pi-six-62.vercel.app';
const SCRATCH = 'C:/Users/seven/AppData/Local/Temp/claude/e--MazyOS/ab823a49-9d62-4fe5-9e2b-4ef06551618c/scratchpad';
const STORE = 'hello-world-uaavn-tjngdsf5.myshopify.com';
const VARS_TMP = path.join(os.tmpdir(), 'ml-vars.json');

const args = process.argv.slice(2);
const onlyHandle = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const dryRun = args.includes('--dry-run');

const code = fs.readFileSync(CATALOG_PATH, 'utf8');
const wrapped = `(function(){\n${code}\nreturn { PRODUCTS: PRODUCTS, CATEGORIES: CATEGORIES };\n})()`;
const { PRODUCTS, CATEGORIES } = vm.runInNewContext(wrapped, {});
const CATEGORY_LABEL = {};
CATEGORIES.forEach((c) => { CATEGORY_LABEL[c.id] = c.label; });

function handleize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function absoluteImageUrl(imgPath) {
  if (imgPath.startsWith('http')) return imgPath.replace('w=600', 'w=1200');
  return `${IMAGE_BASE_URL}/${imgPath}`;
}

function seoTitle(p) {
  const t = `${p.name} — ${CATEGORY_LABEL[p.category] || 'Óculos de Sol'} | Monster Lupas`;
  return t.length > 70 ? `${p.name} — Óculos de Sol | Monster Lupas` : t;
}

function seoDescription(p) {
  const t = `${p.tagline} Proteção UV400, lente polarizada e frete grátis pra todo o Brasil.`;
  return t.length > 160 ? t.slice(0, 157) + '...' : t;
}

function runGraphQL(queryFile, variables) {
  fs.writeFileSync(VARS_TMP, JSON.stringify(variables));
  const out = execFileSync('shopify', [
    'store', 'execute',
    '--store', STORE,
    '--query-file', `${SCRATCH}/${queryFile}`,
    '--variable-file', VARS_TMP,
    '--allow-mutations',
    '--json',
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20, shell: true });
  return JSON.parse(out);
}

let list = PRODUCTS;
if (onlyHandle) list = PRODUCTS.filter((p) => handleize(p.slug || p.id) === onlyHandle);

let ok = 0;
let fail = 0;

list.forEach((p, idx) => {
  const handle = handleize(p.slug || p.id);
  const tags = [`categoria-${handleize(p.category)}`];
  (p.collections || []).forEach((c) => tags.push(`colecao-${handleize(c)}`));

  const variants = p.variants.map((v, i) => ({
    sku: `ML-${handle.toUpperCase()}-${String(i + 1).padStart(2, '0')}`,
    optionValues: [{ optionName: 'Cor', name: v.name }],
    price: p.price.toFixed(2),
    compareAtPrice: p.oldPrice ? p.oldPrice.toFixed(2) : null,
    inventoryPolicy: 'CONTINUE',
  }));

  const productInput = {
    title: p.name,
    handle,
    descriptionHtml: `<p>${p.tagline}</p><p>Óculos ${p.name} com proteção UV400 e lente polarizada. Estoque próprio, envio rápido para todo o Brasil.</p>`,
    vendor: 'Monster Lupas',
    productType: 'Óculos de Sol',
    tags,
    status: 'ACTIVE',
    seo: { title: seoTitle(p), description: seoDescription(p) },
    productOptions: [{ name: 'Cor', values: p.variants.map((v) => ({ name: v.name })) }],
    variants: variants.map(({ sku, ...rest }) => ({ ...rest, sku })),
  };

  console.log(`[${idx + 1}/${list.length}] ${p.name} (${variants.length} variantes)`);

  if (dryRun) {
    console.log(JSON.stringify(productInput, null, 2).slice(0, 600));
    return;
  }

  try {
    // 1) Cria produto + variantes (sem imagem)
    const r1 = runGraphQL('product-set.graphql', { input: productInput });
    const errs1 = r1?.productSet?.userErrors || [];
    if (errs1.length) { console.error('  productSet userErrors:', JSON.stringify(errs1)); fail++; return; }
    const product = r1.productSet.product;
    const productId = product.id;
    const skuToVariantId = {};
    product.variants.nodes.forEach((v) => { skuToVariantId[v.sku] = v.id; });

    // 2) Sobe todas as imagens do produto de uma vez
    const media = p.variants.map((v) => ({
      originalSource: absoluteImageUrl(v.img),
      mediaContentType: 'IMAGE',
      alt: `${p.name} — ${v.name}`,
    }));
    const r2 = runGraphQL('create-media.graphql', { productId, media });
    const errs2 = r2?.productCreateMedia?.mediaUserErrors || [];
    if (errs2.length) { console.error('  productCreateMedia userErrors:', JSON.stringify(errs2)); }
    const altToMediaId = {};
    (r2?.productCreateMedia?.media || []).forEach((m) => { altToMediaId[m.alt] = m.id; });

    // 3) Associa cada mídia à variante correspondente
    const variantMedia = variants
      .map((v, i) => {
        const alt = `${p.name} — ${p.variants[i].name}`;
        const variantId = skuToVariantId[v.sku];
        const mediaId = altToMediaId[alt];
        if (!variantId || !mediaId) return null;
        return { variantId, mediaIds: [mediaId] };
      })
      .filter(Boolean);

    if (variantMedia.length) {
      const r3 = runGraphQL('append-media.graphql', { productId, variantMedia });
      const errs3 = r3?.productVariantAppendMedia?.userErrors || [];
      if (errs3.length) console.error('  productVariantAppendMedia userErrors:', JSON.stringify(errs3));
    }

    console.log('  OK ->', product.handle, `(${variantMedia.length}/${variants.length} imagens associadas)`);
    ok++;
  } catch (e) {
    console.error('  FALHOU:', e.message.slice(0, 800));
    fail++;
  }
});

console.log(`\nConcluído: ${ok} ok, ${fail} falhas de ${list.length}`);
