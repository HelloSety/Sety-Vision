// Repara produtos cujas variantes ficaram sem imagem associada (mídia não estava READY na 1ª tentativa).
// Uso: node fix-variant-media.js <handle1> <handle2> ...
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const STORE = 'hello-world-uaavn-tjngdsf5.myshopify.com';
const SCRATCH = 'C:/Users/seven/AppData/Local/Temp/claude/e--MazyOS/ab823a49-9d62-4fe5-9e2b-4ef06551618c/scratchpad';
const VARS_TMP = path.join(os.tmpdir(), 'ml-fix-vars.json');

const handles = process.argv.slice(2);

function runGraphQL(queryFile, variables) {
  fs.writeFileSync(VARS_TMP, JSON.stringify(variables));
  const out = execFileSync('shopify', [
    'store', 'execute', '--store', STORE,
    '--query-file', `${SCRATCH}/${queryFile}`,
    '--variable-file', VARS_TMP,
    '--allow-mutations', '--json',
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20, shell: true });
  return JSON.parse(out);
}

const QUERY_TMP = path.join(os.tmpdir(), 'ml-fix-query.graphql');
function runQuery(query) {
  fs.writeFileSync(QUERY_TMP, query);
  const out = execFileSync('shopify', [
    'store', 'execute', '--store', STORE, '--query-file', QUERY_TMP, '--json',
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20, shell: true });
  return JSON.parse(out);
}

handles.forEach((handle) => {
  console.log(`Reparando ${handle}...`);
  const data = runQuery(`query { productByHandle(handle: "${handle}") { id title variants(first: 30) { nodes { id image { url } selectedOptions { name value } } } media(first: 30) { nodes { id alt } } } }`);
  const product = data.productByHandle;
  if (!product) { console.log('  produto não encontrado'); return; }

  const altToMediaId = {};
  product.media.nodes.forEach((m) => { altToMediaId[m.alt] = m.id; });

  const variantMedia = product.variants.nodes
    .filter((v) => !v.image)
    .map((v) => {
      const cor = (v.selectedOptions.find((o) => o.name === 'Cor') || {}).value;
      const alt = `${product.title} — ${cor}`;
      const mediaId = altToMediaId[alt];
      if (!mediaId) { console.log(`  sem match pra "${alt}"`); return null; }
      return { variantId: v.id, mediaIds: [mediaId] };
    })
    .filter(Boolean);

  if (!variantMedia.length) { console.log('  nada a reparar'); return; }

  const r = runGraphQL('append-media.graphql', { productId: product.id, variantMedia });
  const errs = r?.productVariantAppendMedia?.userErrors || [];
  if (errs.length) console.log('  ainda com erro:', JSON.stringify(errs));
  else console.log(`  OK -> ${variantMedia.length} imagens associadas`);
});
