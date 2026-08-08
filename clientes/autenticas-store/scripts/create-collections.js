// Cria as 6 collections automáticas da Autênticas Store (4 categorias + 2 temáticas) por tag.
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');

const SCRATCH = 'C:/Users/seven/AppData/Local/Temp/claude/e--MazyOS/ca59e7c3-03bc-41c4-98e4-0bad24b79c09/scratchpad';
const STORE = 'wg0tuk-ru.myshopify.com';
const VARS_TMP = os.tmpdir() + '/as-collection-vars.json';

const COLLECTIONS = [
  { handle: 'roupas', title: 'Roupas', tag: 'categoria-roupas' },
  { handle: 'tenis', title: 'Tênis', tag: 'categoria-tenis' },
  { handle: 'chinelos', title: 'Chinelos', tag: 'categoria-chinelos' },
  { handle: 'bones-acessorios', title: 'Bonés & Acessórios', tag: 'categoria-acessorios' },
  { handle: 'novidades', title: 'Novidades', tag: 'colecao-novidades' },
  { handle: 'mais-vendidos', title: 'Mais Vendidos', tag: 'colecao-mais-vendidos' },
];

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

COLLECTIONS.forEach((c) => {
  const input = {
    handle: c.handle,
    title: c.title,
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: c.tag }],
    },
  };
  try {
    const r = runGraphQL('collection-create.graphql', { input });
    const errs = r?.collectionCreate?.userErrors || [];
    if (errs.length) {
      console.error(`${c.handle}: ERROS`, JSON.stringify(errs));
    } else {
      console.log(`${c.handle}: OK ->`, r.collectionCreate.collection.id);
    }
  } catch (e) {
    console.error(`${c.handle}: FALHOU`, e.message.slice(0, 400));
  }
});
