// Gera CSV de import simplificado (2 variações por produto, só produtos com foto real local)
// pra entrega manual ao cliente — evita os erros da importação anterior (fotos quebradas, muitas variantes).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CATALOG_PATH = path.join(__dirname, '..', 'site', 'js', 'catalog.js');
const IMAGE_BASE_URL = 'https://site-pi-six-62.vercel.app';
const OUT_PATH = path.join(__dirname, '..', 'entregas', 'produtos-monster-lupas-cliente.csv');
const MAX_VARIANTS = 2;

const code = fs.readFileSync(CATALOG_PATH, 'utf8');
const wrapped = `(function(){\n${code}\nreturn { PRODUCTS: PRODUCTS, CATEGORIES: CATEGORIES };\n})()`;
const { PRODUCTS, CATEGORIES } = vm.runInNewContext(wrapped, {});

const CATEGORY_LABEL = {};
CATEGORIES.forEach((c) => { CATEGORY_LABEL[c.id] = c.label; });

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[",\n]/.test(str)) return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

function handleize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const HEADERS = [
  'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags', 'Published',
  'Option1 Name', 'Option1 Value',
  'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker', 'Variant Inventory Qty',
  'Variant Inventory Policy', 'Variant Fulfillment Service', 'Variant Price', 'Variant Compare At Price',
  'Variant Requires Shipping', 'Variant Taxable', 'Variant Barcode',
  'Image Src', 'Image Position', 'Image Alt Text', 'Variant Image',
  'Gift Card', 'SEO Title', 'SEO Description', 'Status',
];

const rows = [];
let skipped = 0;

PRODUCTS.filter((p) => p.local === true).forEach((p) => {
  const handle = handleize(p.slug || p.id);
  const tags = [];
  tags.push(`categoria-${handleize(p.category)}`);
  (p.collections || []).forEach((c) => tags.push(`colecao-${handleize(c)}`));
  const tagsStr = tags.join(', ');

  const bodyHtml = `<p>${p.tagline}</p><p>Óculos ${p.name} com proteção UV400 e lente polarizada. Estoque próprio, envio rápido para todo o Brasil.</p>`;

  const variants = p.variants.slice(0, MAX_VARIANTS);

  variants.forEach((v, idx) => {
    const imageUrl = `${IMAGE_BASE_URL}/${v.img}`;
    const sku = `ML-${handle.toUpperCase()}-${String(idx + 1).padStart(2, '0')}`;

    rows.push({
      Handle: handle,
      Title: idx === 0 ? p.name : '',
      'Body (HTML)': idx === 0 ? bodyHtml : '',
      Vendor: idx === 0 ? 'Monster Lupas' : '',
      'Product Category': '',
      Type: idx === 0 ? 'Óculos de Sol' : '',
      Tags: idx === 0 ? tagsStr : '',
      Published: idx === 0 ? 'TRUE' : '',
      'Option1 Name': idx === 0 ? 'Cor' : '',
      'Option1 Value': v.name,
      'Variant SKU': sku,
      'Variant Grams': 120,
      'Variant Inventory Tracker': '',
      'Variant Inventory Qty': '',
      'Variant Inventory Policy': 'continue',
      'Variant Fulfillment Service': 'manual',
      'Variant Price': p.price.toFixed(2),
      'Variant Compare At Price': p.oldPrice ? p.oldPrice.toFixed(2) : '',
      'Variant Requires Shipping': 'TRUE',
      'Variant Taxable': 'TRUE',
      'Variant Barcode': '',
      'Image Src': imageUrl,
      'Image Position': idx + 1,
      'Image Alt Text': `${p.name} — ${v.name}`,
      'Variant Image': imageUrl,
      'Gift Card': idx === 0 ? 'FALSE' : '',
      'SEO Title': idx === 0 ? `${p.name} — Monster Lupas` : '',
      'SEO Description': idx === 0 ? p.tagline : '',
      Status: idx === 0 ? 'active' : '',
    });
  });
});

skipped = PRODUCTS.length - PRODUCTS.filter((p) => p.local === true).length;

const lines = [HEADERS.join(',')];
rows.forEach((row) => {
  lines.push(HEADERS.map((h) => csvEscape(row[h])).join(','));
});

fs.writeFileSync(OUT_PATH, lines.join('\n'), 'utf8');

console.log(`CSV gerado: ${OUT_PATH}`);
console.log(`Produtos incluídos: ${PRODUCTS.filter((p) => p.local === true).length} (${skipped} pulados por falta de foto real)`);
console.log(`Linhas (variantes, máx ${MAX_VARIANTS} por produto): ${rows.length}`);
