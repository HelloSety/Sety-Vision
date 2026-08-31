# Kaptar — cópia de continuidade (backup do app) + patch anti-pausa

**O que é:** o Kaptar é um app desktop (Electron) da **Mazzeo IA** (`kaptar.mazzeoia.com.br`)
que a Sety Studio usa pra prospecção B2B: acha negócios no Google Maps / por área,
analisa o site com o Claude Agent SDK da própria máquina e dispara WhatsApp em cadência.

**Por que esta pasta existe:** se o site/servidor da Mazzeo sair do ar, o Seven continua
com uma cópia completa e funcional. Cópia de uso pessoal / continuidade — não redistribuir.

- **Versão arquivada:** `2.0.3` (Windows x64) — 1.9.2 → 2.0.0 → 2.0.3 em ~24h (updater agressivo)
- **Instalado:** `C:\Users\seven\AppData\Local\Programs\Kaptar\`
- **Dados do app (privados, NÃO ficam aqui):** `C:\Users\seven\AppData\Roaming\Kaptar\`

---

## ⚠️ PATCH ANTI-PAUSA + AUTO-UPDATE DESLIGADO (2026-08-31, v2.0.3)

O `app.asar` **em uso** (`C:\...\Programs\Kaptar\resources\app.asar`) foi patchado pra
**campanha nunca pausar** por nenhuma das 3 travas de `motivoParaParar()`:
- N números seguidos sem WhatsApp — `MAX_INVALIDOS_SEGUIDOS`: `3` → `3e9`
- N envios seguidos falhados — `MAX_FALHAS_SEGUIDAS`: `2` → `2e9`
- N vezes a página do WhatsApp não carregar — `MAX_CARGAS_SEGUIDAS`: `6` → `6e9`  ← **nova na 2.0.3**

Número/erro → marca o alvo e **pula pro próximo**. A campanha só para sozinha se
**a sessão do WhatsApp cair de verdade** (`s.deslogado`, confirmada com 2ª leitura).

**Auto-update DESLIGADO:** o updater trocou o `app.asar` (e apagou o patch) **3× em ~1 dia**.
`resources/app-update.yml` foi apontado pra um endereço morto (`http://127.0.0.1:0/...`).
Cópias no repo: `app-update.yml.ORIGINAL` (feed real) e `app-update.yml.NEUTRALIZADO` (o em uso).
Reforço opcional: `127.0.0.1 kaptar.mazzeoia.com.br` no `C:\Windows\System32\drivers\etc\hosts`.

### Refazer o patch (só se atualizar de novo na mão)
```bash
node scripts/kaptar-patch-nao-pausar.mjs --bloquear-update    # Kaptar FECHADO
```
Patch = troca binária **in-place** das 3 constantes (` = N;` → `=Ne9;`, mesmo nº de bytes →
header do asar intacto; **não** usar extract+repack, empacota o `claude.exe` de 254 MB e quebra).
Faz backup `app.asar.orig-<ts>`. Se um padrão mudar de forma numa versão futura, avisa
"não achei" — aí ajustar as strings em `PARES` no script.

**Teto diário:** na 2.0.x o contador `enviado` fica bugado (entrega mas marca `falhou`), então
`enviadosNoDia` fica 0 e o teto (`20 + dias×20`) **nunca dispara**. O corte por onda passa a ser
só o `quantidade:100` do disparo. Ver `scripts/kaptar-registrar-enviados.mjs` /
`kaptar-watchdog-100.mjs` pro "não repetir contato" (que também depende do `enviado` e por isso
precisa do apoio manual).

---

## O que tem nesta pasta

| Arquivo | GitHub? | O que é |
|---|---|---|
| `app.asar` | ✅ (11 MB) | código empacotado **com o patch anti-pausa** — é o que roda hoje |
| `app.asar.orig-v2.0.0` | ✅ (11 MB) | mesmo asar **sem o patch** (pristino) — pra re-patchar limpo ou reverter |
| `source/` | ✅ (~13 MB) | código v2.0.0 **pristino, extraído e legível**. `source/app/main/index.js` = todo o backend; `source/app/renderer/` = a interface; `source/app/preload/app.cjs` = ponte IPC; `source/node_modules/` = deps de runtime. (`out/` interno renomeado pra `app/` pra escapar do `.gitignore` global. `claude.exe` de 254 MB removido — é o CLI do Claude Code, recupere com `npm i @anthropic-ai/claude-agent-sdk`.) |
| `config-snapshot/` | ✅ | `molde.json` + `automacoes.json` do Seven no snapshot. Sem leads, sem segredos. |
| `app-update.yml` / `icon.png` | ✅ | config do updater e ícone |
| `Kaptar-2.0.0-instalador.exe` | ❌ local (154 MB) | instalador oficial completo. **Backup manual em HD/nuvem.** |
| `kaptar-full-program-v2.0.0.zip` | ❌ local (~612 MB) | a pasta `Programs\Kaptar\` inteira (com o patch), roda **sem instalar**. Backup manual. |

> Os 2 grandes (.exe e .zip) estão no `.gitignore` — não sobem no `/salvar`. Copie pra HD externo / Drive.

---

## Como restaurar / usar o Kaptar

### A — Reinstalar (mais simples)
1. Rode `Kaptar-2.0.0-instalador.exe`. 2. Abra o Kaptar (dados de `%APPDATA%\Kaptar\` voltam sozinhos).
3. **Refaça o patch anti-pausa** (`node scripts/kaptar-patch-nao-pausar.mjs`, Kaptar fechado).

### B — Rodar sem instalar
1. Extraia `kaptar-full-program-v2.0.0.zip` (ex.: `C:\Kaptar\`). 2. Rode `Kaptar\Kaptar.exe`.
Esse zip **já tem o patch** — não precisa refazer (até o próximo update).

### C — Reconstruir do código (sem .exe nem .zip)
Use o `app.asar` daqui (já patchado) ou o `app.asar.orig-v2.0.0`: coloque em
`<electron>/resources/app.asar` + um `electron.exe` da major certa e rode. Detalhe no
histórico do `git log` desta pasta.

---

## Dados (ficam FORA daqui — privados)

Tudo seu mora em `C:\Users\seven\AppData\Roaming\Kaptar\` e **não entra no repo**:

| Arquivo | O que é | Sensível? |
|---|---|---|
| `leads\leads.json` | leads capturados (nome, telefone, site…) | dados de terceiros |
| `leads\molde.json` / `leads\automacoes.json` | campanha manual / automações | cópia em `config-snapshot/` |
| `leads\campanha.json` | a leva em envio no momento | — |
| `leads\numero.json` | "livro do número": teto do dia + **não-perturbe / últimos envios** (é o que impede reenviar pro mesmo contato por 90 dias) | — |
| `secrets.v1.bin` | chave Google + login Claude, **cifrado** | **sim — nunca commitar** |
| `Partitions\kaptar-zap\` | sessão do WhatsApp Web (QR já lido) | **sim** |

**Backup:** copie `Roaming\Kaptar\` inteiro pra HD externo de vez em quando. Migrar de máquina:
instala o Kaptar na nova, cola `Roaming\Kaptar\` por cima antes de abrir, refaz o patch.

---

## Não reenviar pro mesmo contato (nativo)

O Kaptar já garante: antes de cada envio roda `podeEnviarPara(livro, telefone)` que checa
`numero.json` — se o número está em `naoPerturbe` ou recebeu mensagem nos últimos **90 dias**
(`CARENCIA_DIAS`), **pula** (não para a campanha). Vale tanto pra campanha manual quanto pra
fila do autopilot (`filaViva`). O `numero.json` é criado no primeiro envio bem-sucedido.
Reforço aplicado nos leads: duplicados exatos (mesmo nome + mesma cidade) tiveram o telefone
zerado — ver `scripts/kaptar-so-celular.mjs`.

---

## Scripts de manutenção (no repo, em `scripts/`)

| Script | O que faz |
|---|---|
| `kaptar-patch-nao-pausar.mjs` | reaplica o patch anti-pausa no `app.asar` (rodar após cada update) |
| `kaptar-so-celular.mjs` | zera telefone de fixos + duplicados nos `leads.json`, filtra `campanha.json` e a `fila` do autopilot pra só celular |
| `kaptar-importar-csv.mjs` | importa CSV de leads pro `leads.json` do Kaptar |
| `prospeccao-kaptar.mjs` | roda o pipeline Places API e joga o resultado no Kaptar |

Ver também `MEMORY/PLAYBOOKS/kaptar-importar-csv.md`.
