// Importa um CSV de leads para dentro do Kaptar (grava em %APPDATA%/Kaptar/leads/leads.json).
//
// O Kaptar so EXPORTA CSV. Este script faz o caminho de volta: le um CSV
// qualquer (o export do proprio Kaptar, ou uma planilha de prospeccao com
// colunas tipo "Nome Marca / Categoria / Cidade / Telefone / Website / ..."),
// converte cada linha pro formato de lead do Kaptar, tira duplicata (contra o
// que ja esta no app e dentro do proprio CSV) e mescla no leads.json.
//
// As funcoes de score, categoria, telefone e chave de duplicata sao copia fiel
// do main do Kaptar 1.9.2 (out/main/index.js) pra o resultado ficar identico
// ao que o proprio app gravaria.
//
// Uso:
//   node scripts/kaptar-importar-csv.mjs "C:/Users/seven/Downloads/streetwear_leads_3000.csv"
//   node scripts/kaptar-importar-csv.mjs <csv> --fonte local    (default: api)
//   node scripts/kaptar-importar-csv.mjs <csv> --dry            (so mostra, nao grava)

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";

// ---------- args ----------
const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--"));
const dry = args.includes("--dry");
const fonteArg = (args.find((a) => a.startsWith("--fonte=")) || "").split("=")[1]
  || (args.includes("--fonte") ? args[args.indexOf("--fonte") + 1] : "");
const FONTE = fonteArg === "local" ? "local" : "api";

if (!csvPath) {
  console.error('Falta o caminho do CSV.\n  node scripts/kaptar-importar-csv.mjs "<arquivo.csv>" [--fonte api|local] [--dry]');
  process.exit(1);
}
if (!fs.existsSync(csvPath)) {
  console.error("CSV nao encontrado: " + csvPath);
  process.exit(1);
}

const APPDATA = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
const LEADS_FILE = path.join(APPDATA, "Kaptar", "leads", "leads.json");

// ---------- helpers copiados do Kaptar ----------
function dobrar(s) {
  return (s ?? "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}
function formatarTelefone(digitos) {
  let d = (digitos ?? "").replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
}
function ehCelular(telefone) {
  let d = String(telefone ?? "").replace(/\D/g, "");
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  if (d.length === 11) return d[2] === "9";
  if (d.length === 10) return /[6789]/.test(d[2] ?? "");
  return false;
}
function telefoneInternacional(telefone, ddi = "55") {
  const d = String(telefone ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (d === "") return "";
  if (d.length >= 12) return d;
  return `${ddi}${d}`;
}
function normalizarInstagram(bruto) {
  const s = (bruto ?? "").toString().trim();
  if (s === "") return "";
  const user = /instagram\.com\/@?([A-Za-z0-9._]{1,30})/.exec(s)?.[1] ?? /^@?([A-Za-z0-9._]{1,30})$/.exec(s)?.[1];
  if (user === undefined || user === "" || user === ".") return "";
  return `https://instagram.com/${user.replace(/\.+$/, "")}`;
}
function ajustePorPorte(lead) {
  const nv = Number(lead.numAvaliacoes ?? 0) || 0;
  const av = Number(lead.avaliacao ?? 0) || 0;
  let n2 = 6 - Math.min(12, Math.log10(nv + 1) * 5);
  if (av > 0) n2 += (3.8 - av) * 2.2;
  return n2;
}
function calcularScore(lead) {
  if (lead.siteScan !== null && lead.siteScan !== undefined) return lead.siteScan;
  const av = Number(lead.avaliacao ?? 0) || 0;
  let base;
  if (lead.temSite !== true && lead.temInstagram !== true) base = 90;
  else if (lead.temSite !== true) base = 76;
  else base = 50 - (av > 0 ? (av - 3.6) * 12 : 0);
  return Math.round(Math.max(6, Math.min(100, base + ajustePorPorte(lead))));
}
function categoriaDoLead(lead) {
  if (lead.temSite !== true && lead.temInstagram !== true) return "sem_presenca";
  if (lead.temSite !== true) return "sem_site";
  const s = lead.siteScan;
  if (s !== null && s !== undefined && s >= 65) return "site_ruim";
  if (s !== null && s !== undefined && s >= 40) return "site_medio";
  return "ativo";
}
function chavesDoLead(l) {
  const ks = [];
  if (l.id !== undefined && l.id !== "") ks.push(`id:${l.id}`);
  const t = telefoneInternacional(l.telefone ?? "");
  if (t !== "") ks.push(`t:${t}`);
  const nm = dobrar(l.nome ?? "");
  const cid = dobrar(l.cidade ?? "");
  const temLugar = (l.lat ?? 0) !== 0 && (l.lng ?? 0) !== 0;
  if (nm !== "" && cid !== "" && !temLugar) ks.push(`n:${nm}|${cid}`);
  const lat = l.lat ?? 0;
  const lng = l.lng ?? 0;
  if (nm !== "" && lat !== 0 && lng !== 0) ks.push(`g:${nm}|${lat.toFixed(3)}|${lng.toFixed(3)}`);
  if (ks.length === 0) ks.push("anon:vazio");
  return ks;
}
function chavesDe(leads) {
  const vistos = new Set();
  for (const l of leads) for (const k of chavesDoLead(l)) vistos.add(k);
  return vistos;
}
function separarCom(vistos, novos) {
  const entram = [];
  let repetidos = 0;
  for (const l of novos) {
    const chaves = chavesDoLead(l);
    if (chaves.some((k) => vistos.has(k))) { repetidos++; continue; }
    for (const k of chaves) vistos.add(k);
    entram.push(l);
  }
  return { entram, repetidos };
}

// ---------- CSV ----------
function parseCSV(text, delim) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
      continue;
    }
    if (c === '"') inQ = true;
    else if (c === delim) { row.push(field); field = ""; }
    else if (c === "\r") { /* skip */ }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

const raw = fs.readFileSync(csvPath, "utf8");
const firstLine = raw.replace(/^\uFEFF/, "").split(/\r?\n/)[0] || "";
const semi = (firstLine.match(/;/g) || []).length;
const comma = (firstLine.match(/,/g) || []).length;
const delim = semi >= comma && semi > 0 ? ";" : ",";

const grid = parseCSV(raw, delim);
if (grid.length < 2) { console.error("CSV sem linhas de dados."); process.exit(1); }

const header = grid[0].map((h) => dobrar(h));
const idx = (aliases) => {
  for (const a of aliases) {
    const i = header.indexOf(a);
    if (i !== -1) return i;
  }
  return -1;
};
const COL = {
  nome: idx(["nome marca", "nome da empresa", "nome_empresa", "nome empresa", "empresa", "nome", "marca", "razao social", "razao_social"]),
  nicho: idx(["categoria", "nicho", "segmento", "ramo", "tipo"]),
  cidade: idx(["cidade", "municipio"]),
  estado: idx(["estado", "uf"]),
  telefone: idx(["telefone", "tel", "fone", "celular"]),
  whatsapp: idx(["whatsapp", "whatsapp provavel", "zap"]),
  site: idx(["website", "site", "url", "url site"]),
  temSite: idx(["tem site"]),
  instagram: idx(["instagram", "insta", "perfil instagram"]),
  email: idx(["e-mail", "email"]),
  facebook: idx(["facebook"]),
  responsavel: idx(["responsavel", "dono", "contato"]),
  resumo: idx(["resumo"]),
  numAvaliacoes: idx(["avaliacoes", "n avaliacoes", "no avaliacoes", "numero de avaliacoes", "reviews", "qtd avaliacoes"]),
  avaliacao: idx(["nota google", "avaliacao", "nota", "rating", "estrelas"]),
  mapsUrl: idx(["google maps url", "google maps", "google_maps", "maps", "url google maps", "link maps"]),
  problema: idx(["problema encontrado", "problemas encontrados", "problema", "dor", "motivo_qualificacao", "motivo qualificacao", "motivo"]),
  oferta: idx(["oferta recomendada", "oportunidade sety studio", "oferta", "oportunidade"]),
  fonte: idx(["fonte"]),
};
if (COL.nome === -1) {
  console.error("Nao achei a coluna de nome. Cabecalho lido:\n  " + grid[0].join(" | "));
  process.exit(1);
}

const get = (r, k) => (COL[k] === -1 ? "" : (r[COL[k]] ?? "").toString().trim());
const num = (v) => {
  const m = String(v).replace(/\./g, "").replace(",", ".").match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : 0;
};
const notaNum = (v) => {
  const m = String(v).replace(",", ".").match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : 0;
};
const ehSiteDeVerdade = (s) => {
  const t = s.replace(/^https?:\/\//i, "").replace(/^www\./i, "").trim();
  if (t === "") return false;
  return !/^(google\.|maps\.google|goo\.gl|g\.page|business\.site|instagram\.com|facebook\.com|wa\.me|api\.whatsapp|linktr\.ee)/i.test(t);
};
function idDoLead(mapsUrl, nome, cidade, tel) {
  const cid = /[?&]cid=(\d+)/.exec(mapsUrl || "")?.[1];
  if (cid) return `gl_cid${cid}`;
  const h = crypto.createHash("sha1")
    .update(`${dobrar(nome)}|${dobrar(cidade)}|${telefoneInternacional(tel)}`)
    .digest("hex").slice(0, 16);
  return `imp_${h}`;
}

const agora = new Date().toISOString();
const brutos = grid.slice(1).map((r) => {
  const nome = get(r, "nome");
  if (nome === "") return null;
  const cidade = get(r, "cidade");
  const telBruto = get(r, "telefone") || get(r, "whatsapp");
  const telefone = telBruto ? formatarTelefone(telBruto) : "";
  const siteRaw = get(r, "site");
  const site = ehSiteDeVerdade(siteRaw) ? siteRaw.trim() : "";
  const instagram = normalizarInstagram(get(r, "instagram"));
  const temSiteCol = get(r, "temSite").toLowerCase();
  const temSite = temSiteCol ? /^s|^sim|^yes|^true|1/.test(temSiteCol) : site !== "";
  const temInstagram = instagram !== "";
  const avaliacao = notaNum(get(r, "avaliacao"));
  const numAvaliacoes = Math.round(num(get(r, "numAvaliacoes")));
  const problema = get(r, "problema");
  const oferta = get(r, "oferta");
  const resumo = (get(r, "resumo") || [problema, oferta].filter(Boolean).join(" -> ")).slice(0, 700);
  const waCol = get(r, "whatsapp");
  const base = { siteScan: null, temSite, temInstagram, avaliacao, numAvaliacoes };
  return {
    id: idDoLead(get(r, "mapsUrl"), nome, cidade, telefone),
    nome,
    nicho: get(r, "nicho"),
    telefone,
    site,
    temSite,
    temInstagram,
    siteScan: null,
    analise: null,
    avaliacao,
    numAvaliacoes,
    temWhatsapp: /wa\.me|whatsapp|api\.whatsapp/i.test(waCol) || ehCelular(telefone),
    cidade,
    estado: get(r, "estado").toUpperCase().slice(0, 2),
    lat: 0,
    lng: 0,
    mapsUrl: get(r, "mapsUrl"),
    fonte: get(r, "fonte").toLowerCase() === "local" ? "local" : FONTE,
    email: get(r, "email"),
    facebook: get(r, "facebook"),
    responsavel: get(r, "responsavel"),
    resumo,
    instagram,
    enriquecido: [],
    abordagem: "",
    score: calcularScore(base),
    categoria: categoriaDoLead(base),
    criadoEm: agora,
  };
}).filter(Boolean);

// ---------- merge ----------
let atuais = [];
try {
  const j = JSON.parse(fs.readFileSync(LEADS_FILE, "utf8"));
  if (Array.isArray(j)) atuais = j;
} catch { /* arquivo ainda nao existe */ }

const { entram, repetidos } = separarCom(chavesDe(atuais), brutos);
const final = [...atuais, ...entram].slice(-50000);

const porCategoria = entram.reduce((acc, l) => { acc[l.categoria] = (acc[l.categoria] || 0) + 1; return acc; }, {});

console.log("CSV .............. " + path.basename(csvPath));
console.log("delimitador ...... " + (delim === ";" ? "; (ponto-e-virgula)" : ", (virgula)"));
console.log("linhas lidas ..... " + brutos.length);
console.log("ja no Kaptar ..... " + atuais.length);
console.log("novos ............ " + entram.length);
console.log("repetidos (pulei)  " + repetidos);
console.log("por categoria .... " + JSON.stringify(porCategoria));
console.log("total apos import  " + final.length);

if (dry) {
  console.log("\namostra (2 primeiros convertidos):");
  console.log(JSON.stringify(brutos.slice(0, 2), null, 2));
  console.log("\n--dry: nada foi gravado.");
  process.exit(0);
}
if (entram.length === 0) { console.log("\nNada novo pra gravar."); process.exit(0); }

fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
if (fs.existsSync(LEADS_FILE)) {
  const bak = LEADS_FILE + ".bak-" + agora.replace(/[:.]/g, "-");
  fs.copyFileSync(LEADS_FILE, bak);
  console.log("\nbackup ........... " + bak);
}
const tmp = LEADS_FILE + ".tmp-" + crypto.randomUUID();
fs.writeFileSync(tmp, JSON.stringify(final), { mode: 0o600 });
fs.renameSync(tmp, LEADS_FILE);
console.log("gravado .......... " + LEADS_FILE);
console.log("\nFeche e reabra o Kaptar pra ver os leads.");
