// Corrige produtos cujas imagens hotlink (monsterlupas.com.br) falharam ao ser baixadas pelo Shopify.
// Baixa localmente e sobe via staged upload (mais confiável que URL externa).
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const CATALOG_PATH = path.join(__dirname, '..', 'site', 'js', 'catalog.js');
const STORE = 'hello-world-uaavn-tjngdsf5.myshopify.com';
const SCRATCH = 'C:/Users/seven/AppData/Local/Temp/claude/e--MazyOS/ab823a49-9d62-4fe5-9e2b-4ef06551618c/scratchpad';
const TMPDIR = path.join(os.tmpdir(), 'ml-hotlink-fix');
fs.mkdirSync(TMPDIR, { recursive: true });

const HANDLES = process.argv.slice(2);

const code = fs.readFileSync(CATALOG_PATH, 'utf8');
const wrapped = `(function(){\n${code}\nreturn { PRODUCTS: PRODUCTS };\n})()`;
const { PRODUCTS } = vm.runInNewContext(wrapped, {});

function handleize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function runGraphQL(queryFile, variables) {
  const varsFile = path.join(os.tmpdir(), 'ml-hotlink-vars.json');
  fs.writeFileSync(varsFile, JSON.stringify(variables));
  const out = execFileSync('shopify', [
    'store', 'execute', '--store', STORE,
    '--query-file', `${SCRATCH}/${queryFile}`,
    '--variable-file', varsFile,
    '--allow-mutations', '--json',
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20, shell: true });
  return JSON.parse(out);
}

function runQuery(query) {
  const queryFile = path.join(os.tmpdir(), 'ml-hotlink-query.graphql');
  fs.writeFileSync(queryFile, query);
  const out = execFileSync('shopify', [
    'store', 'execute', '--store', STORE, '--query-file', queryFile, '--json',
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20, shell: true });
  return JSON.parse(out);
}

function sleep(ms) { execFileSync('node', ['-e', `setTimeout(()=>{}, ${ms})`]); }

HANDLES.forEach((handle) => {
  const p = PRODUCTS.find((pr) => handleize(pr.slug || pr.id) === handle);
  if (!p) { console.log(`Produto ${handle} não encontrado no catalog.js`); return; }
  console.log(`\n== ${p.name} (${handle}) — ${p.variants.length} variantes ==`);

  const data = runQuery(`query { productByHandle(handle: "${handle}") { id variants(first: 30) { nodes { id image { url } selectedOptions { name value } } } media(first: 30) { nodes { id } } } }`);
  const product = data.productByHandle;
  if (!product) { console.log('  produto não existe na loja'); return; }

  // 1) Remove mídia FAILED existente
  const oldMediaIds = product.media.nodes.map((m) => m.id);
  if (oldMediaIds.length) {
    runGraphQL('delete-media.graphql', { productId: product.id, mediaIds: oldMediaIds });
    console.log(`  removidas ${oldMediaIds.length} mídias antigas`);
  }

  const variantByColor = {};
  product.variants.nodes.forEach((v) => {
    const cor = (v.selectedOptions.find((o) => o.name === 'Cor') || {}).value;
    variantByColor[cor] = v.id;
  });

  // 2) Baixa cada imagem localmente e sobe via staged upload
  const mediaIdByColor = {};
  p.variants.forEach((v, i) => {
    const localFile = path.join(TMPDIR, `${handle}-${i}${path.extname(v.file) || '.jpg'}`);
    execFileSync('curl', ['-s', '-o', localFile, v.img]);
    const size = fs.statSync(localFile).size;
    if (size < 1000) { console.log(`  [${v.name}] download falhou (${size} bytes)`); return; }

    const staged = runGraphQL('staged-upload.graphql', {
      input: [{ resource: 'FILE', filename: path.basename(localFile), mimeType: 'image/jpeg', httpMethod: 'POST' }],
    });
    const target = staged.stagedUploadsCreate.stagedTargets[0];

    const discardFile = path.join(os.tmpdir(), 'ml-curl-discard.txt');
    const curlArgs = ['-s', '-o', discardFile, '-w', '%{http_code}'];
    target.parameters.forEach((param) => { curlArgs.push('-F', `${param.name}=${param.value}`); });
    curlArgs.push('-F', `file=@${localFile}`, target.url);
    const status = execFileSync('curl', curlArgs, { encoding: 'utf8' });

    if (!status.startsWith('201') && !status.startsWith('200')) {
      console.log(`  [${v.name}] upload falhou (status ${status})`);
      return;
    }

    const created = runGraphQL('create-media.graphql', {
      productId: product.id,
      media: [{ originalSource: target.resourceUrl, mediaContentType: 'IMAGE', alt: `${p.name} — ${v.name}` }],
    });

    const fileId = created?.productCreateMedia?.media?.[0]?.id;
    if (!fileId) { console.log(`  [${v.name}] fileCreate falhou`, JSON.stringify(created)); return; }
    mediaIdByColor[v.name] = fileId;
    console.log(`  [${v.name}] OK -> ${fileId}`);
  });

  // 3) Espera processar
  console.log('  aguardando processamento...');
  execFileSync('node', ['-e', 'setTimeout(()=>{}, 8000)']);

  // 4) Associa
  const variantMedia = Object.entries(mediaIdByColor)
    .map(([cor, mediaId]) => {
      const variantId = variantByColor[cor];
      if (!variantId) return null;
      return { variantId, mediaIds: [mediaId] };
    })
    .filter(Boolean);

  if (variantMedia.length) {
    const r = runGraphQL('append-media.graphql', { productId: product.id, variantMedia });
    const errs = r?.productVariantAppendMedia?.userErrors || [];
    if (errs.length) console.log('  append ainda com erro:', JSON.stringify(errs));
    else console.log(`  associadas ${variantMedia.length}/${p.variants.length} imagens`);
  }
});
