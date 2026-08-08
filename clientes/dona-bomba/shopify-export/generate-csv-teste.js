const fs = require("fs");
const path = require("path");

const allProducts = require("./products.json");
const BASE_URL = "https://public-delta-lyart-86.vercel.app";

const HANDLES_TESTE = ["airbrush-cap", "colorgin-arte-urbana-400ml"];
const products = allProducts.filter((p) => HANDLES_TESTE.includes(p.handle));

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
  "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
  "Option1 Name", "Option1 Value", "Variant SKU", "Variant Grams",
  "Variant Inventory Tracker", "Variant Inventory Qty", "Variant Inventory Policy",
  "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price",
  "Variant Requires Shipping", "Variant Taxable", "Image Src", "Image Position",
  "Image Alt Text", "Gift Card", "SEO Title", "SEO Description", "Variant Weight Unit", "Status",
];

const rows = [COLUMNS];

for (const p of products) {
  const brand = detectBrand(p.title);
  const imageSrc = p.image ? `${BASE_URL}/${p.image}` : "";
  const specsLines = p.specs.map((s) => `<li>${s.label}: ${s.value}</li>`).join("");
  const bodyHtml = `<p>${p.description}</p>${specsLines ? `<ul>${specsLines}</ul>` : ""}`;
  const seoDesc = p.description.length > 160 ? p.description.slice(0, 157) + "..." : p.description;
  const price = p.price || "0.00";
  const tags = p.category;

  let variants = p.hasSwatches ? p.swatches : [null];
  if (variants.length > 100) variants = variants.slice(0, 100);

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
fs.writeFileSync(path.join(__dirname, "products-teste-2produtos.csv"), csv, "utf8");
console.log(`CSV de teste gerado: ${rows.length - 1} linhas para ${products.length} produtos (${HANDLES_TESTE.join(", ")}).`);
