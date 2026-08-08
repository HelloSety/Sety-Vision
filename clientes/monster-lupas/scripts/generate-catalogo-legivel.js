// Gera planilha legível do catálogo (1 linha por produto, não por variante) — pra revisão do cliente.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CATALOG_PATH = path.join(__dirname, '..', 'site', 'js', 'catalog.js');
const IMAGE_BASE_URL = 'https://site-pi-six-62.vercel.app';
const OUT_PATH = path.join(__dirname, '..', 'entregas', 'monster-lupas-catalogo-produtos.csv');

const code = fs.readFileSync(CATALOG_PATH, 'utf8');
const wrapped = `(function(){\n${code}\nreturn { PRODUCTS: PRODUCTS, CATEGORIES: CATEGORIES, COLLECTIONS: COLLECTIONS };\n})()`;
const { PRODUCTS, CATEGORIES, COLLECTIONS } = vm.runInNewContext(wrapped, {});

const CATEGORY_LABEL = {};
CATEGORIES.forEach((c) => { CATEGORY_LABEL[c.id] = c.label; });
const COLLECTION_LABEL = {};
COLLECTIONS.forEach((c) => { COLLECTION_LABEL[c.id] = c.title; });

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[",\n]/.test(str)) return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

function photoUrl(p) {
  if (!p.local) return '(sem foto real — pendente)';
  return `${IMAGE_BASE_URL}/${p.variants[0].img}`;
}

const HEADERS = [
  'Nome', 'Categoria', 'Coleções', 'Preço', 'Preço Antigo', 'Desconto',
  'Qtd Cores', 'Cores Disponíveis', 'Status Foto', 'Link Foto Principal',
];

const rows = PRODUCTS.map((p) => ({
  Nome: p.name,
  Categoria: CATEGORY_LABEL[p.category] || p.category,
  'Coleções': (p.collections || []).map((c) => COLLECTION_LABEL[c] || c).join(' / '),
  'Preço': `R$ ${p.price.toFixed(2)}`,
  'Preço Antigo': p.oldPrice ? `R$ ${p.oldPrice.toFixed(2)}` : '',
  Desconto: p.oldPrice ? `${Math.round((1 - p.price / p.oldPrice) * 100)}%` : '',
  'Qtd Cores': p.variants.length,
  'Cores Disponíveis': p.variants.map((v) => v.name).join(', '),
  'Status Foto': p.local ? 'OK' : 'FALTA FOTO REAL',
  'Link Foto Principal': photoUrl(p),
}));

// Ordena: problemas primeiro (falta foto), depois por categoria/nome
rows.sort((a, b) => {
  if (a['Status Foto'] !== b['Status Foto']) return a['Status Foto'] === 'FALTA FOTO REAL' ? -1 : 1;
  return a.Categoria.localeCompare(b.Categoria) || a.Nome.localeCompare(b.Nome);
});

const lines = [HEADERS.join(',')];
rows.forEach((row) => { lines.push(HEADERS.map((h) => csvEscape(row[h])).join(',')); });

fs.writeFileSync(OUT_PATH, '﻿' + lines.join('\n'), 'utf8'); // BOM pra Excel abrir acentos certo

console.log(`Planilha gerada: ${OUT_PATH}`);
console.log(`Total produtos: ${rows.length} (${rows.filter(r => r['Status Foto'] === 'OK').length} com foto OK, ${rows.filter(r => r['Status Foto'] !== 'OK').length} pendentes)`);
