// Publica todos os produtos + collections no canal "Loja virtual" (productSet/collectionCreate
// não publicam automaticamente em nenhum canal de vendas — lição já documentada no Monster Lupas).
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');

const STORE = 'wg0tuk-ru.myshopify.com';
const PUBLICATION_ID = 'gid://shopify/Publication/227678945369'; // Loja virtual
const VARS_TMP = os.tmpdir() + '/as-publish-vars.json';
const QUERY_TMP = os.tmpdir() + '/as-publish-query.graphql';

function runGraphQL(query, variables) {
  fs.writeFileSync(QUERY_TMP, query);
  if (variables) fs.writeFileSync(VARS_TMP, JSON.stringify(variables));
  const args = ['store', 'execute', '--store', STORE, '--query-file', QUERY_TMP, '--allow-mutations', '--json'];
  if (variables) args.push('--variable-file', VARS_TMP);
  const out = execFileSync('shopify', args, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20, shell: true });
  return JSON.parse(out);
}

const r1 = runGraphQL('query { products(first: 100) { nodes { id } } collections(first: 20) { nodes { id } } }');
const ids = [
  ...r1.products.nodes.map((n) => n.id),
  ...r1.collections.nodes.map((n) => n.id),
];

console.log(`Publicando ${ids.length} recursos (produtos + collections) no canal Loja virtual...`);

const aliases = ids.map((id, i) => `p${i}: publishablePublish(id: "${id}", input: [{publicationId: "${PUBLICATION_ID}"}]) { userErrors { field message } }`);
const mutation = `mutation { ${aliases.join('\n')} }`;

const result = runGraphQL(mutation);
let errCount = 0;
Object.keys(result).forEach((key) => {
  const errs = result[key]?.userErrors || [];
  if (errs.length) { errCount++; console.error(key, JSON.stringify(errs)); }
});
console.log(`Concluído: ${ids.length - errCount} ok, ${errCount} com erro.`);
