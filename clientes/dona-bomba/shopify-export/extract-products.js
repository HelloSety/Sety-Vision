const fs = require("fs");
const path = require("path");

const PRODUTO_DIR = path.join(__dirname, "..", "site", "produto");
const SITE_DIR = path.join(__dirname, "..", "site");
const OUT_JSON = path.join(__dirname, "products.json");

const CATEGORY_MAP = {
  sprays: "Sprays",
  canetas: "Canetas",
  caps: "Caps",
  marcadores: "Marcadores",
  squeezer: "Squeezer",
  "fine-art": "Fine Art",
  acessorios: "Acessórios",
  vestuario: "Vestuário",
};

const CATEGORY_OVERRIDE_BY_HANDLE = {
  "dripper-hubik-60ml": "Squeezer",
  "refil-hubik-200-ml": "Squeezer",
};

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function parsePrice(str) {
  if (!str) return null;
  const m = str.match(/R\$\s*([\d.,]+)/);
  if (!m) return null;
  return m[1].replace(/\./g, "").replace(",", ".");
}

function resolveImage(src) {
  if (!src) return null;
  if (src.includes("placeholder")) return null;
  return src.replace(/^\.\.\//, "");
}

const files = fs.readdirSync(PRODUTO_DIR).filter((f) => f.endsWith(".html"));
const products = [];

for (const file of files) {
  const handle = file.replace(/\.html$/, "");
  const html = fs.readFileSync(path.join(PRODUTO_DIR, file), "utf8");

  const titleMatch = html.match(/<h1>([^<]+)<\/h1>/);
  const title = titleMatch ? decodeEntities(titleMatch[1]) : handle;

  const breadcrumbMatch = html.match(/categoria\/([a-z0-9-]+)'>([^<]+)<\/a>\s*\/\s*[^<]+<\/div>/);
  const categorySlug = breadcrumbMatch ? breadcrumbMatch[1] : null;
  let category = categorySlug ? CATEGORY_MAP[categorySlug] || breadcrumbMatch[2] : null;
  if (!category) category = CATEGORY_OVERRIDE_BY_HANDLE[handle] || "Sem categoria";

  const descMatch = html.match(/<p class="desc">([^<]+)<\/p>/);
  const description = descMatch ? decodeEntities(descMatch[1]) : "";

  const priceMatch = html.match(/<div class="product-price">([^<]+)<\/div>/);
  const priceRaw = priceMatch ? priceMatch[1].trim() : null;
  const price = parsePrice(priceRaw);

  const galleryMatch = html.match(/<div class="gallery-main">\s*<img src="([^"]+)"/);
  const image = galleryMatch ? resolveImage(galleryMatch[1]) : null;

  const specs = [];
  const specRegex = /<span class="spec-label">([^<]+)<\/span><span class="spec-value">([^<]+)<\/span>/g;
  let sm;
  while ((sm = specRegex.exec(html))) {
    specs.push({ label: decodeEntities(sm[1]), value: decodeEntities(sm[2]) });
  }

  const swatches = [];
  const swatchRegex = /<div class="swatch-card" data-name="([^"]+)" data-code="([^"]*)">\s*<div class="swatch-preview" style="background:([^"]+)"><\/div>/g;
  let wm;
  while ((wm = swatchRegex.exec(html))) {
    swatches.push({ name: decodeEntities(wm[1]), code: wm[2], hex: wm[3] });
  }

  products.push({
    handle,
    title,
    category,
    categorySlug,
    description,
    priceRaw,
    price,
    image,
    specs,
    swatches,
    hasSwatches: swatches.length > 0,
  });
}

fs.writeFileSync(OUT_JSON, JSON.stringify(products, null, 2), "utf8");

console.log(`Total produtos: ${products.length}`);
console.log(`Com cartela de cores: ${products.filter((p) => p.hasSwatches).length}`);
console.log(`Sem preço (Consulte): ${products.filter((p) => !p.price).length}`);
console.log(`Sem imagem real (placeholder): ${products.filter((p) => !p.image).length}`);
const byCategory = {};
products.forEach((p) => { byCategory[p.category] = (byCategory[p.category] || 0) + 1; });
console.log("Por categoria:", byCategory);
