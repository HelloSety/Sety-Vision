// Deixa a operacao so com numeros de CELULAR (WhatsApp de verdade):
//  1. leads.json      -> zera o telefone dos leads com fixo (nao-celular) e dos
//                        duplicados exatos (mesmo nome + mesma cidade). Assim o
//                        filtro `exige/obriga: telefone` do Kaptar ja os exclui.
//  2. campanha.json   -> mantem so os alvos cujo lead ficou com celular
//  3. automacoes.json -> fila do autopilot filtrada + sem repetidos (Set)
// Rodar com o Kaptar FECHADO.

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'C:/Users/seven/AppData/Roaming/Kaptar/leads';
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const bak = (f) => { const p = path.join(DIR, f); if (fs.existsSync(p)) { fs.copyFileSync(p, `${p}.bak-${ts}`); console.log('backup ->', f + `.bak-${ts}`); } };

function ehCelular(t) {
  let d = String(t ?? '').replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('55')) d = d.slice(2);
  if (d.length === 11) return d[2] === '9';
  if (d.length === 10) return /[6789]/.test(d[2] ?? '');
  return false;
}
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

bak('leads.json'); bak('campanha.json'); bak('automacoes.json');

// ---- 1) leads.json ----
const leads = JSON.parse(fs.readFileSync(path.join(DIR, 'leads.json'), 'utf8'));
let zeradoFixo = 0, zeradoDup = 0;
const vistoNomeCidade = new Set();
for (const l of leads) {
  const temTel = (l.telefone || '').trim() !== '';
  if (temTel && !ehCelular(l.telefone)) {
    l.telefone = ''; l.temWhatsapp = false; zeradoFixo++;
    continue;
  }
  if (temTel && ehCelular(l.telefone)) {
    const k = norm(l.nome) + '||' + norm(l.cidade);
    if (vistoNomeCidade.has(k)) { l.telefone = ''; l.temWhatsapp = false; zeradoDup++; }
    else vistoNomeCidade.add(k);
  }
}
const idsComCelular = new Set(leads.filter((l) => ehCelular(l.telefone)).map((l) => l.id));
fs.writeFileSync(path.join(DIR, 'leads.json'), JSON.stringify(leads), 'utf8');
console.log(`\nleads.json -> ${leads.length} leads | telefone zerado: ${zeradoFixo} fixos + ${zeradoDup} duplicados (nome+cidade)`);
console.log(`           -> ${idsComCelular.size} leads com celular valido (unicos)`);

// ---- 2) campanha.json ----
const campP = path.join(DIR, 'campanha.json');
if (fs.existsSync(campP)) {
  const c = JSON.parse(fs.readFileSync(campP, 'utf8'));
  const antes = c.alvos.length;
  const seen = new Set();
  c.alvos = c.alvos.filter((a) => {
    if (!idsComCelular.has(a.leadId)) return false;
    if (seen.has(a.leadId)) return false;
    seen.add(a.leadId); return true;
  });
  c.situacao = 'rodando'; c.motivo = '';
  fs.writeFileSync(campP, JSON.stringify(c), 'utf8');
  const est = c.alvos.reduce((m, a) => (m[a.estado] = (m[a.estado] || 0) + 1, m), {});
  console.log(`\ncampanha.json -> ${antes} -> ${c.alvos.length} alvos (so celular, sem repetido) | estados ${JSON.stringify(est)} | situacao=rodando`);
}

// ---- 3) automacoes.json (fila do autopilot) ----
const autoP = path.join(DIR, 'automacoes.json');
const autos = JSON.parse(fs.readFileSync(autoP, 'utf8'));
for (const a of autos) {
  if (!Array.isArray(a.fila)) continue;
  const antes = a.fila.length;
  a.fila = [...new Set(a.fila.filter((id) => idsComCelular.has(id)))];
  console.log(`automacoes.json -> "${a.nome}" fila ${antes} -> ${a.fila.length}`);
}
fs.writeFileSync(autoP, JSON.stringify(autos, null, 2) + '\n', 'utf8');

console.log('\nOK. Reabra o Kaptar.');
