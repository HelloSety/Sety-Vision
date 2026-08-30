// PATCH no app.asar do Kaptar: campanha NAO pausa mais por
//  - N numeros seguidos sem WhatsApp  (MAX_INVALIDOS_SEGUIDOS)
//  - N envios seguidos falhados        (MAX_FALHAS_SEGUIDAS)
// So para se a sessao do WhatsApp cair de verdade (s.deslogado) — esse fica.
// Numero sem contato -> marca "sem-whatsapp" e PULA pro proximo.
//
// Rodar com o Kaptar FECHADO. Refazer depois de cada auto-update.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const RES = 'C:/Users/seven/AppData/Local/Programs/Kaptar/resources';
const ASAR = path.join(RES, 'app.asar');
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const work = path.join(os.tmpdir(), `kaptar-patch-${ts}`);
const BIG = '999999999';

const asarBin = ['npx', ['--yes', '@electron/asar']];
const asar = (...args) => execFileSync('npx', ['--yes', '@electron/asar', ...args], { stdio: ['ignore', 'pipe', 'inherit'] }).toString();

// 1) versao + extrai
fs.mkdirSync(work, { recursive: true });
asar('extract', ASAR, work);
const ver = JSON.parse(fs.readFileSync(path.join(work, 'package.json'), 'utf8')).version;
console.log('versao do Kaptar:', ver);

// 2) patch no index.js
const idxPath = path.join(work, 'out', 'main', 'index.js');
let src = fs.readFileSync(idxPath, 'utf8');
const reps = [
  [/const MAX_INVALIDOS_SEGUIDOS = \d+;/, `const MAX_INVALIDOS_SEGUIDOS = ${BIG};`],
  [/const MAX_FALHAS_SEGUIDAS = \d+;/, `const MAX_FALHAS_SEGUIDAS = ${BIG};`],
];
for (const [re, to] of reps) {
  if (!re.test(src)) { console.error('PADRAO NAO ENCONTRADO:', re); process.exit(1); }
  src = src.replace(re, to);
}
fs.writeFileSync(idxPath, src, 'utf8');
console.log('patched:', reps.map(([, t]) => t).join('  |  '));

// 3) backup do asar original + repack por cima
const orig = `${ASAR}.orig-v${ver}-${ts}`;
fs.copyFileSync(ASAR, orig);
console.log('backup do asar original ->', path.basename(orig));
const out = path.join(os.tmpdir(), `app-patched-${ts}.asar`);
asar('pack', work, out, '--unpack', '*.node');
fs.copyFileSync(out, ASAR);
console.log('app.asar repackado e instalado. tamanho:', fs.statSync(ASAR).size, 'bytes');

// 4) confere
const check = execFileSync('npx', ['--yes', '@electron/asar', 'extract-file', ASAR, 'out/main/index.js']).toString();
console.log('conferindo no asar final:',
  /MAX_INVALIDOS_SEGUIDOS = 999999999/.test(check) && /MAX_FALHAS_SEGUIDAS = 999999999/.test(check)
    ? 'OK — travas removidas' : 'FALHOU a verificacao');
console.log('\nversao=' + ver + '  (guarde pro backup)');
