// Compensa o bug do Kaptar 2.0.0: ele entrega a mensagem (✓✓ no WhatsApp) mas
// marca "falhou" e NÃO grava o número em numero.json -> a trava nativa de
// "não reenviar pro mesmo contato por 90 dias" (podeEnviarPara / CARENCIA_DIAS)
// nunca ativa.
//
// Este script pega os alvos da campanha atual (campanha.json), acha o telefone
// de cada um (leads.json) e grava em numero.json > ultimoEnvio com a data de
// agora. A partir daí o próprio Kaptar pula esses números nas próximas levas
// (campanha manual e fila do autopilot via filaViva).
//
// Também tira esses leadIds da fila do autopilot pra a próxima onda vir limpa.
//
// Rodar com o Kaptar ABERTO é seguro: no 2.0.0 o Kaptar só LÊ numero.json
// (os caminhos que escrevem — anotarEnvio/naoPerturbar — não estão disparando).
// Rodar depois de cada onda (dia e noite).
//
//   node scripts/kaptar-registrar-enviados.mjs
//   node scripts/kaptar-registrar-enviados.mjs --so-atacados   (só os já processados, mantém "espera")

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const DIR = path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'Kaptar', 'leads');
const soAtacados = process.argv.includes('--so-atacados');
const agora = new Date().toISOString();
const ts = agora.replace(/[:.]/g, '-');

function telInternacional(t) {
  const d = String(t ?? '').replace(/\D/g, '').replace(/^0+/, '');
  if (d === '') return '';
  if (d.length >= 12) return d;
  return '55' + d;
}

const leads = JSON.parse(fs.readFileSync(path.join(DIR, 'leads.json'), 'utf8'));
const telDe = new Map(leads.map((l) => [l.id, telInternacional(l.telefone)]));

const campP = path.join(DIR, 'campanha.json');
if (!fs.existsSync(campP)) { console.log('sem campanha.json — nada a registrar.'); process.exit(0); }
const camp = JSON.parse(fs.readFileSync(campP, 'utf8'));

const alvos = camp.alvos.filter((a) => (soAtacados ? a.estado !== 'espera' : true));
const telefones = [...new Set(alvos.map((a) => telDe.get(a.leadId)).filter((t) => t && t.length >= 12))];
const leadIds = new Set(alvos.map((a) => a.leadId));

// ---- numero.json (merge) ----
const numP = path.join(DIR, 'numero.json');
let livro = { diasComEnvio: [], enviosPorDia: {}, ultimoEnvio: {}, naoPerturbe: [] };
if (fs.existsSync(numP)) {
  try {
    const b = JSON.parse(fs.readFileSync(numP, 'utf8'));
    if (Array.isArray(b.diasComEnvio) && Array.isArray(b.naoPerturbe)) livro = { ...livro, ...b };
  } catch { /* recria */ }
  fs.copyFileSync(numP, `${numP}.bak-${ts}`);
}
let novos = 0;
for (const tel of telefones) {
  if (!livro.ultimoEnvio[tel]) novos++;
  livro.ultimoEnvio[tel] = agora;
}
fs.writeFileSync(numP, JSON.stringify(livro), 'utf8');
console.log(`numero.json -> ${telefones.length} numeros da campanha registrados (${novos} novos) | total no historico: ${Object.keys(livro.ultimoEnvio).length}`);

// ---- fila do autopilot ----
const autoP = path.join(DIR, 'automacoes.json');
const autos = JSON.parse(fs.readFileSync(autoP, 'utf8'));
let mexeu = false;
for (const a of autos) {
  if (!Array.isArray(a.fila)) continue;
  const antes = a.fila.length;
  a.fila = a.fila.filter((id) => !leadIds.has(id));
  if (a.fila.length !== antes) { mexeu = true; console.log(`automacoes.json -> "${a.nome}" fila ${antes} -> ${a.fila.length}`); }
}
if (mexeu) {
  fs.copyFileSync(autoP, `${autoP}.bak-${ts}`);
  fs.writeFileSync(autoP, JSON.stringify(autos, null, 2) + '\n', 'utf8');
}
console.log('\nOK. O Kaptar vai pular esses numeros nas proximas levas (90 dias).');
