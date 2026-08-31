// Watchdog: garante o corte em 100 mensagens por onda.
//
// O Kaptar 2.0.0 tem bug no contador "enviado" (fica em 0 mesmo entregando).
// Este watchdog conta os alvos JÁ PROCESSADOS (enviado + falhou + sem-whatsapp)
// da campanha.json. Quando >= LIMITE, força situacao:"terminada" (para a onda).
// Não mexe no autopilot — a onda da noite (16:00) roda normal.
//
// Também dobra como registrador de "não reenviar": ao parar (ou ao ver a
// campanha terminada), joga os números da leva em numero.json > ultimoEnvio.
//
//   node scripts/kaptar-watchdog-100.mjs            # roda em loop (30s)
//   node scripts/kaptar-watchdog-100.mjs --limite 100 --intervalo 30

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
const LIMITE = Number(arg('--limite', 100));
const INTERVALO = Number(arg('--intervalo', 30)) * 1000;
const DIR = path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'Kaptar', 'leads');

function telInternacional(t) {
  const d = String(t ?? '').replace(/\D/g, '').replace(/^0+/, '');
  if (d === '') return ''; if (d.length >= 12) return d; return '55' + d;
}
const log = (m) => console.log(`[${new Date().toLocaleTimeString()}] ${m}`);

function registrarNumeros(alvos) {
  let leads; try { leads = JSON.parse(fs.readFileSync(path.join(DIR, 'leads.json'), 'utf8')); } catch { return 0; }
  const telDe = new Map(leads.map((l) => [l.id, telInternacional(l.telefone)]));
  const tels = [...new Set(alvos.map((a) => telDe.get(a.leadId)).filter((t) => t && t.length >= 12))];
  const numP = path.join(DIR, 'numero.json');
  let livro = { diasComEnvio: [], enviosPorDia: {}, ultimoEnvio: {}, naoPerturbe: [] };
  if (fs.existsSync(numP)) { try { const b = JSON.parse(fs.readFileSync(numP, 'utf8')); if (Array.isArray(b.diasComEnvio) && Array.isArray(b.naoPerturbe)) livro = { ...livro, ...b }; } catch {} }
  const agora = new Date().toISOString();
  let novos = 0;
  for (const t of tels) { if (!livro.ultimoEnvio[t]) novos++; livro.ultimoEnvio[t] = agora; }
  fs.writeFileSync(numP, JSON.stringify(livro), 'utf8');
  return novos;
}

let ultimoId = null;
let jaParou = false;

function tick() {
  const campP = path.join(DIR, 'campanha.json');
  if (!fs.existsSync(campP)) return;
  let c; try { c = JSON.parse(fs.readFileSync(campP, 'utf8')); } catch { return; }

  if (c.id !== ultimoId) { ultimoId = c.id; jaParou = false; log(`nova campanha ${String(c.id).slice(0, 8)} · ${c.alvos.length} alvos`); }

  const processados = c.alvos.filter((a) => a.estado !== 'espera');
  const proc = processados.length;

  // grava TODO alvo já tocado a cada tick (idempotente) — assim, mesmo se a
  // campanha for substituída no meio, quem já recebeu não volta pra próxima leva
  if (proc > 0) { const n = registrarNumeros(processados); if (n > 0) log(`+${n} números no não-repetir (${proc} processados)`); }

  if (c.situacao === 'terminada' || c.situacao === 'parada') {
    if (!jaParou) { jaParou = true; log(`campanha ${c.situacao} · ${proc} processados`); }
    return;
  }

  if (proc >= LIMITE && !jaParou) {
    c.situacao = 'terminada';
    c.motivo = `limite de ${LIMITE} mensagens desta onda atingido (watchdog)`;
    fs.writeFileSync(campP, JSON.stringify(c), 'utf8');
    jaParou = true;
    log(`>>> PAROU: ${proc}/${LIMITE} processados · próxima onda no horário do autopilot`);
  } else if (!jaParou) {
    log(`onda em andamento: ${proc}/${LIMITE}`);
  }
}

log(`watchdog on · limite ${LIMITE}/onda · check a cada ${INTERVALO / 1000}s · pasta ${DIR}`);
tick();
setInterval(tick, INTERVALO);
