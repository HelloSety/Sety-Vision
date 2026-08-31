// Prospecção B2B (prompt ICP Sety Studio) -> direto pro Kaptar, sem CSV manual.
//
// Roda o pipeline de scripts/prospeccao/ (Google Places API + enriquecimento de
// site + curadoria de marcas) e joga o resultado dentro do leads.json do Kaptar
// pelo scripts/kaptar-importar-csv.mjs. O CSV continua sendo gerado como passo
// intermediário em saidas/prospeccao/ — o Seven não precisa tocar nele.
//
// A coleta é RESUMÍVEL: a chave Google tem ~100 buscas/dia, então cada execução
// avança um pedaço da matriz de 432 consultas (12 keywords x 36 cidades) e para
// no 429. Rodar todo dia até o "FIM" da coleta, depois é só a automação do
// Kaptar (AUTOPILOT STREETWEAR) mantendo o fluxo.
//
// Uso:
//   node scripts/prospeccao-kaptar.mjs
//   node scripts/prospeccao-kaptar.mjs --sem-coleta   (pula a API, só re-CSV + import)

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const semColeta = process.argv.includes('--sem-coleta');
const CSV = 'saidas/prospeccao/prospecting_leads_sety_studio.csv';

const run = (args, label) => {
  console.log(`\n─── ${label} ───`);
  try {
    execFileSync('node', args, { stdio: 'inherit' });
  } catch (e) {
    console.error(`(${label} terminou com erro — seguindo mesmo assim)`);
  }
};

const antes = fs.existsSync(CSV) ? fs.readFileSync(CSV, 'utf8').split(/\r?\n/).length : 0;

if (!semColeta) {
  run(['scripts/prospeccao/1-coleta.mjs'], '1/4 coleta Google Places (resumível, para no limite diário)');
  run(['scripts/prospeccao/2-enriquecer.mjs'], '2/4 enriquecendo sites (plataforma + redes + WhatsApp)');
  run(['scripts/prospeccao/4-marcas.mjs'], '3/4 curadoria de marcas online-only');
}
run(['scripts/prospeccao/3-csv.mjs'], '4/4 score ICP + dedup + CSV');

const depois = fs.existsSync(CSV) ? fs.readFileSync(CSV, 'utf8').split(/\r?\n/).length : 0;
console.log(`\nCSV: ${antes} -> ${depois} linhas`);

run(['scripts/kaptar-importar-csv.mjs', CSV], 'importando pro Kaptar (leads.json, com dedupe)');

console.log('\nPronto. Feche e reabra o Kaptar pra ver os leads novos.');
