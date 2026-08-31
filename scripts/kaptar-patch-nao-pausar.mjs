// Patch do Kaptar: a campanha NUNCA pausa por
//   - N numeros seguidos sem WhatsApp   (MAX_INVALIDOS_SEGUIDOS)
//   - N envios seguidos falhados         (MAX_FALHAS_SEGUIDAS)
//   - N vezes a pagina do WhatsApp nao carregar (MAX_CARGAS_SEGUIDAS)  [novo na 2.0.3]
// So para se a sessao do WhatsApp cair de verdade (s.deslogado).
//
// Patch = troca binaria IN-PLACE no app.asar, mesmo numero de bytes (` = N;` -> `=Ne9;`),
// entao o header do asar continua valido. Nao usa @electron/asar, so fs.
//
// Uso (com o Kaptar FECHADO):
//   node scripts/kaptar-patch-nao-pausar.mjs
//   node scripts/kaptar-patch-nao-pausar.mjs --bloquear-update   (tambem aponta o feed
//                                                                 de update pra um endereco
//                                                                 morto, pra o patch parar
//                                                                 de ser desfeito)

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const RES = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'Programs', 'Kaptar', 'resources');
const ASAR = path.join(RES, 'app.asar');
const YML = path.join(RES, 'app-update.yml');
const bloquearUpdate = process.argv.includes('--bloquear-update');
const ts = new Date().toISOString().replace(/[:.]/g, '-');

if (!fs.existsSync(ASAR)) {
  console.error('Nao achei o app.asar em:', ASAR);
  console.error('Ajuste o caminho RES no topo do script se o Kaptar estiver noutro lugar.');
  process.exit(1);
}

// ---- 1) patch nas 3 constantes de parada ----
const PARES = [
  ['const MAX_INVALIDOS_SEGUIDOS = 3;', 'const MAX_INVALIDOS_SEGUIDOS=3e9;'],
  ['const MAX_FALHAS_SEGUIDAS = 2;', 'const MAX_FALHAS_SEGUIDAS=2e9;'],
  ['const MAX_CARGAS_SEGUIDAS = 6;', 'const MAX_CARGAS_SEGUIDAS=6e9;'],
];

let buf = fs.readFileSync(ASAR);
const bak = `${ASAR}.orig-${ts}`;
fs.copyFileSync(ASAR, bak);
console.log('backup ->', path.basename(bak));

let feitos = 0, jaOk = 0, faltou = [];
for (const [from, to] of PARES) {
  if (Buffer.byteLength(from) !== Buffer.byteLength(to)) { console.error('BUG no script: tamanhos diferentes p/', from); process.exit(1); }
  if (buf.indexOf(to) !== -1) { jaOk++; console.log('ja aplicado:', to); continue; }
  const i = buf.indexOf(from);
  if (i === -1) { faltou.push(from); continue; }
  buf.write(to, i, 'utf8');
  feitos++;
  console.log(`patch @${i}  ${to}`);
}

if (faltou.length) {
  console.error('\nNao achei estes padroes (o Kaptar deve ter mudado o codigo nesta versao):');
  for (const f of faltou) console.error('  ' + f);
  console.error('Abra o app.asar (npx @electron/asar extract) e procure MAX_*_SEGUIDAS pra ajustar o script.');
  if (feitos === 0) { fs.rmSync(bak); process.exit(1); }
}

fs.writeFileSync(ASAR, buf);
console.log(`\napp.asar: ${feitos} patch(es) novos, ${jaOk} ja estavam. size ${fs.statSync(ASAR).size}`);

// ---- 2) opcional: desligar o auto-update ----
if (bloquearUpdate && fs.existsSync(YML)) {
  fs.copyFileSync(YML, `${YML}.orig-${ts}`);
  fs.writeFileSync(YML,
    'provider: generic\n' +
    'url: http://127.0.0.1:0/kaptar-update-desligado/\n' +
    'channel: latest\n' +
    'updaterCacheDirName: kaptar-updater\n', 'utf8');
  console.log('\napp-update.yml -> feed apontado pra endereco morto (auto-update desligado).');
  console.log('  pra religar: restaure o .orig, ou volte a url pra https://kaptar.mazzeoia.com.br/app/');
  console.log('  reforco: adicione no C:\\Windows\\System32\\drivers\\etc\\hosts (como admin):');
  console.log('    127.0.0.1 kaptar.mazzeoia.com.br');
} else if (bloquearUpdate) {
  console.log('\n(app-update.yml nao encontrado — pulei o bloqueio de update)');
}

console.log('\nPronto. Reabra o Kaptar.');
