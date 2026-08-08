const fs = require("fs");
const path = require("path");

const products = require("./products.json");
const BASE_URL = "https://public-delta-lyart-86.vercel.app";

const BRAND_KEYWORDS = [
  ["COLORGIN", "Colorgin"],
  ["NOU", "NOU"],
  ["MTN", "Montana Colors"],
  ["MONTANA", "Montana Colors"],
  ["POSCA", "Posca"],
  ["ACRILEX", "Acrilex"],
  ["HUBIK", "Hubik"],
  ["TEKBOND", "Tekbond"],
  ["3M", "3M"],
  ["SAKURA", "Sakura"],
  ["UNI PAINT", "Uni"],
  ["ART PRIMO", "Art Primo"],
  ["MACLAIM", "Maclaim"],
  ["COLORART", "Colorart"],
  ["STA", "STA"],
  ["GUARANY", "Guarany"],
  ["PLASTCOR", "Plastcor"],
  ["PARIS 68", "Paris 68"],
];

function detectBrand(title) {
  const upper = title.toUpperCase();
  for (const [kw, brand] of BRAND_KEYWORDS) {
    if (upper.includes(kw)) return brand;
  }
  return "Dona Bomba";
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const COLUMNS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Variant Weight Unit",
  "Status",
];

const rows = [COLUMNS];
const warnings = [];

for (const p of products) {
  const brand = detectBrand(p.title);
  const imageSrc = p.image ? `${BASE_URL}/${p.image}` : "";
  const specsLines = p.specs.map((s) => `<li>${s.label}: ${s.value}</li>`).join("");
  const bodyHtml = `<p>${p.description}</p>${specsLines ? `<ul>${specsLines}</ul>` : ""}`;
  const seoDesc = p.description.length > 160 ? p.description.slice(0, 157) + "..." : p.description;

  let price = p.price;
  let tags = p.category;
  if (!price) {
    price = "0.00";
    tags += ", sob-consulta";
    warnings.push(`${p.handle}: sem preço definido (Consulte) — Variant Price = 0.00, precisa ajustar manualmente`);
  }
  if (!p.image) {
    warnings.push(`${p.handle}: sem foto real no catálogo — produto será importado sem imagem`);
  }

  let variants = p.hasSwatches ? p.swatches : [null];
  if (variants.length > 100) {
    warnings.push(
      `${p.handle}: cartela tem ${variants.length} cores, acima do limite de 100 variantes por produto do Shopify — CSV traz só as 100 primeiras, o restante (${variants.length - 100}) ficou de fora`
    );
    variants = variants.slice(0, 100);
  }

  variants.forEach((variant, idx) => {
    const isFirst = idx === 0;
    const optionValue = variant ? `${variant.name}${variant.code ? " " + variant.code : ""}` : "Padrão";
    const sku = variant
      ? `${p.handle}-${variant.code || variant.name.toLowerCase().replace(/\s+/g, "-")}`
      : p.handle;

    rows.push([
      p.handle,
      isFirst ? p.title : "",
      isFirst ? bodyHtml : "",
      isFirst ? brand : "",
      isFirst ? p.category : "",
      isFirst ? tags : "",
      isFirst ? "TRUE" : "",
      isFirst ? "Cor" : "",
      optionValue,
      sku,
      "",
      "shopify",
      "10",
      "deny",
      "manual",
      price,
      "",
      "TRUE",
      "TRUE",
      isFirst ? imageSrc : "",
      isFirst && imageSrc ? "1" : "",
      isFirst ? p.title : "",
      isFirst ? "FALSE" : "",
      isFirst ? `${p.title} | Dona Bomba` : "",
      isFirst ? seoDesc : "",
      isFirst ? "kg" : "",
      isFirst ? "active" : "",
    ]);
  });
}

const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
fs.writeFileSync(path.join(__dirname, "products.csv"), csv, "utf8");

console.log(`CSV gerado: ${rows.length - 1} linhas (produtos + variantes) para ${products.length} produtos.`);
console.log(`\nAvisos (${warnings.length}):`);
warnings.forEach((w) => console.log(" - " + w));
