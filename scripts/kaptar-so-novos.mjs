// "Enviar só pros novos": trava TODO contato que já apareceu em qualquer
// campanha (atual + backups) — não só os "enviado", porque o Kaptar 2.0.x
// marca entregue como "falhou". Depois filtra a campanha atual e a fila do
// autopilot pra sobrar só quem nunca entrou numa leva.
//
// Rodar com o Kaptar aberto é OK (2.0.x só LÊ numero.json).
//   node scripts/kaptar-so-novos.mjs
//   node scripts/kaptar-so-novos.mjs --dry

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const DIR = path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'Kaptar', 'leads');
const dry = process.argv.includes('--dry');
const agora = new Date().toISOString();
const ts = agora.replace(/[:.]/g, '-');

const tint = (t) => {
  let d = String(t ?? '').replace(/\D/g, '').replace(/^0+/, '');
  if (d === '') return ''; if (d.length >= 12) return d; return '55' + d;
};

const leads = JSON.parse(fs.readFileSync(path.join(DIR, 'leads.json'), 'utf8'));
const telDe = new Map(leads.map((l) => [l.id, tint(l.telefone)]));

// ---- 1) junta todo leadId que já entrou em campanha (atual + backups) ----
const jaContatado = new Set();
const arqs = fs.readdirSync(DIR).filter((f) => f === 'campanha.json' || f.startsWith('campanha.json.bak-'));
for (const f of arqs) {
  try {
    const c = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
    for (const a of c.alvos || []) {
      // da campanha ATUAL, só conta quem já foi tentado (deixa os "espera" pra enviar)
      if (f === 'campanha.json' && a.estado === 'espera') continue;
      jaContatado.add(a.leadId);
    }
  } catch { /* ignora backup ilegível */ }
}
// + o que já está no numero.json (por telefone -> acha os leadIds)
const numP = path.join(DIR, 'numero.json');
let livro = { diasComEnvio: [], enviosPorDia: {}, ultimoEnvio: {}, naoPerturbe: [] };
if (fs.existsSync(numP)) { try { const b = JSON.parse(fs.readFileSync(numP, 'utf8')); if (Array.isArray(b.diasComEnvio) && Array.isArray(b.naoPerturbe)) livro = { ...livro, ...b }; } catch {} }
const telsContatados = new Set(Object.keys(livro.ultimoEnvio));
for (const id of jaContatado) { const t = telDe.get(id); if (t) telsContatados.add(t); }

console.log(`leadIds já em campanha: ${jaContatado.size} | telefones travados (com numero.json): ${telsContatados.size}`);

// ---- 2) numero.json: grava todos esses telefones ----
let novos = 0;
for (const t of telsContatados) { if (t.length >= 12 && !livro.ultimoEnvio[t]) { novos++; } if (t.length >= 12) livro.ultimoEnvio[t] = livro.ultimoEnvio[t] || agora; }
if (!dry) { if (fs.existsSync(numP)) fs.copyFileSync(numP, `${numP}.bak-${ts}`); fs.writeFileSync(numP, JSON.stringify(livro), 'utf8'); }
console.log(`numero.json -> +${novos} números (total ${Object.keys(livro.ultimoEnvio).length})`);

// ---- 3) campanha.json atual: só alvos novos ----
const campP = path.join(DIR, 'campanha.json');
if (fs.existsSync(campP)) {
  const c = JSON.parse(fs.readFileSync(campP, 'utf8'));
  const antes = c.alvos.length;
  c.alvos = c.alvos.filter((a) => {
    if (a.estado !== 'espera') return true;               // já processado, deixa como está
    const t = telDe.get(a.leadId);
    return t && t.length >= 12 && !telsContatados.has(t); // novo de verdade
  });
  const proc = c.alvos.filter((a) => a.estado !== 'espera').length;
  const novosAlvos = c.alvos.length - proc;
  if (novosAlvos === 0 && proc >= 0) { c.situacao = 'terminada'; c.motivo = 'sem alvos novos — capte antes'; }
  if (!dry) { fs.copyFileSync(campP, `${campP}.bak-${ts}`); fs.writeFileSync(campP, JSON.stringify(c), 'utf8'); }
  console.log(`campanha.json -> ${antes} -> ${c.alvos.length} alvos (${novosAlvos} novos + ${proc} já processados) | situacao=${c.situacao}`);
}

// ---- 4) fila do autopilot: tira os já contatados ----
const autoP = path.join(DIR, 'automacoes.json');
const autos = JSON.parse(fs.readFileSync(autoP, 'utf8'));
let mexeu = false;
for (const a of autos) {
  if (!Array.isArray(a.fila)) continue;
  const antes = a.fila.length;
  a.fila = a.fila.filter((id) => { const t = telDe.get(id); return !(t && telsContatados.has(t)); });
  if (a.fila.length !== antes) { mexeu = true; console.log(`fila "${a.nome}": ${antes} -> ${a.fila.length}`); }
}
if (mexeu && !dry) { fs.copyFileSync(autoP, `${autoP}.bak-${ts}`); fs.writeFileSync(autoP, JSON.stringify(autos, null, 2) + '\n', 'utf8'); }

console.log(dry ? '\n--dry: nada gravado.' : '\nOK. As próximas levas só pegam leads que nunca entraram numa campanha.');
