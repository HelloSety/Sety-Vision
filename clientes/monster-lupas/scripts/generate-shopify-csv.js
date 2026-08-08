// Gera CSV de import de produtos Shopify a partir do catalog.js do site estático.
// Uso: node generate-shopify-csv.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CATALOG_PATH = path.join(__dirname, '..', 'site', 'js', 'catalog.js');
const IMAGE_BASE_URL = 'https://site-pi-six-62.vercel.app'; // site publicado (Vercel) — Shopify baixa e hospeda no próprio CDN
const OUT_PATH = path.join(__dirname, '..', 'entregas', 'produtos-monster-lupas.csv');

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

function absoluteImageUrl(imgPath) {
  if (imgPath.startsWith('http')) return imgPath.replace('w=600', 'w=1200');
  return `${IMAGE_BASE_URL}/${imgPath}`;
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

PRODUCTS.forEach((p) => {
  const handle = handleize(p.slug || p.id);
  const tags = [];
  tags.push(`categoria-${handleize(p.category)}`);
  (p.collections || []).forEach((c) => tags.push(`colecao-${handleize(c)}`));
  const tagsStr = tags.join(', ');

  const bodyHtml = `<p>${p.tagline}</p><p>Óculos ${p.name} com proteção UV400 e lente polarizada. Estoque próprio, envio rápido para todo o Brasil.</p>`;

  p.variants.forEach((v, idx) => {
    const imageUrl = absoluteImageUrl(v.img);
    const sku = `ML-${handle.toUpperCase()}-${String(idx + 1).padStart(2, '0')}`;

    if (idx === 0) {
      rows.push({
        Handle: handle,
        Title: p.name,
        'Body (HTML)': bodyHtml,
        Vendor: 'Monster Lupas',
        'Product Category': '',
        Type: 'Óculos de Sol',
        Tags: tagsStr,
        Published: 'TRUE',
        'Option1 Name': 'Cor',
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
        'Gift Card': 'FALSE',
        'SEO Title': `${p.name} — Monster Lupas`,
        'SEO Description': p.tagline,
        Status: 'active',
      });
    } else {
      rows.push({
        Handle: handle,
        Title: '',
        'Body (HTML)': '',
        Vendor: '',
        'Product Category': '',
        Type: '',
        Tags: '',
        Published: '',
        'Option1 Name': '',
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
        'Gift Card': '',
        'SEO Title': '',
        'SEO Description': '',
        Status: '',
      });
    }
  });
});

const lines = [HEADERS.join(',')];
rows.forEach((row) => {
  lines.push(HEADERS.map((h) => csvEscape(row[h])).join(','));
});

fs.writeFileSync(OUT_PATH, lines.join('\n'), 'utf8');

console.log(`CSV gerado: ${OUT_PATH}`);
console.log(`Produtos: ${PRODUCTS.length}`);
console.log(`Linhas (variantes): ${rows.length}`);
