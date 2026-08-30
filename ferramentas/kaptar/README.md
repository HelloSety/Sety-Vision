# Kaptar — cópia de continuidade (backup do app)

**O que é:** o Kaptar é um app desktop (Electron) da **Mazzeo IA** (`kaptar.mazzeoia.com.br`)
que a Sety Studio usa pra prospecção B2B: acha negócios no Google Maps / por área,
analisa o site com o Claude Agent SDK da própria máquina e dispara WhatsApp em cadência.

**Por que esta pasta existe:** se o site/servidor da Mazzeo sair do ar (updater, download,
licença), o Seven continua com uma cópia **completa e funcional** da versão que roda hoje.
Cópia de uso pessoal / continuidade — não redistribuir.

- **Versão arquivada:** `1.9.2`
- **Plataforma:** Windows x64
- **Data do snapshot:** 2026-08-30
- **Instalado (na máquina do Seven):** `C:\Users\seven\AppData\Local\Programs\Kaptar\`
- **Dados do app (NÃO ficam aqui — ver seção "Dados"):** `C:\Users\seven\AppData\Roaming\Kaptar\`

---

## O que tem nesta pasta

| Arquivo | Vai pro GitHub? | O que é |
|---|---|---|
| `app.asar` | ✅ sim (11 MB) | **Todo o código do app empacotado** (formato asar do Electron). Fonte da verdade — dá pra reempacotar/rodar a partir dele. |
| `source/` | ✅ sim (~12 MB) | Mesmo código, **extraído e legível**. `source/app/main/index.js` = todo o backend (captação, cadência, teto, janela, automações). `source/app/renderer/` = a interface. `source/app/preload/app.cjs` = ponte IPC. `source/node_modules/` = dependências de runtime (electron-updater, zod, js-yaml, claude-agent-sdk em JS…). Obs.: a pasta interna original `out/` foi renomeada pra `app/` só pra escapar do `.gitignore` global. |
| `config-snapshot/` | ✅ sim | `molde.json` + `automacoes.json` do Seven no dia do snapshot (campanha PROSPECÇÃO STREETWEAR + automação AUTOPILOT STREETWEAR). **Sem** leads, **sem** segredos. |
| `app-update.yml` / `icon.png` | ✅ sim | Config do auto-updater e ícone, como vêm no `resources/` do app. |
| `Kaptar-1.9.2-instalador.exe` | ❌ **só local** (154 MB) | **Instalador oficial completo.** É o caminho mais fácil de restaurar. GitHub não aceita arquivo > 100 MB → **faça backup dele em HD externo / Google Drive.** |
| `kaptar-full-program-v1.9.2.zip` | ❌ **só local** (612 MB) | A pasta `Programs\Kaptar\` inteira, zipada. Roda **sem instalar nada**. Também precisa de backup externo. |

> ⚠️ **Os 2 arquivos grandes (.exe e .zip) estão no `.gitignore`** — eles NÃO sobem no `/salvar`.
> Copie os dois pra um HD externo e/ou nuvem. Sem eles, ainda dá pra restaurar pelo `source/` + `app.asar` (ver opção C).

---

## Como restaurar / usar o Kaptar

### Opção A — Reinstalar (mais simples)
1. Rode `Kaptar-1.9.2-instalador.exe`.
2. Abra o Kaptar. Os dados antigos (leads, campanha, automações, login) são lidos de
   `%APPDATA%\Kaptar\` automaticamente — se essa pasta ainda existir, volta tudo.

### Opção B — Rodar sem instalar
1. Extraia `kaptar-full-program-v1.9.2.zip` pra qualquer lugar (ex.: `C:\Kaptar\`).
2. Execute `Kaptar\Kaptar.exe`. Pronto — é portátil.
3. (Opcional) criar atalho na área de trabalho apontando pro `Kaptar.exe`.

### Opção C — Reconstruir a partir do código (se não tiver .exe nem .zip)
Precisa de Node.js + um Electron da mesma major (o app é Electron; a 1.9.2 usa Electron ~31 — confira em `source/node_modules/electron*/package.json` se houver, ou use a versão estável da época).
```bash
npm i -g @electron/asar electron
# reempacotar o código legível de volta num asar (renomeie 'app' -> 'out' antes):
cd ferramentas/kaptar/source && mv app out
asar pack . ../app-rebuilt.asar
# rodar: coloque o asar em <electron>/resources/app.asar e execute o electron.exe
```
Ou simplesmente use o `app.asar` que já está aqui: `<electron>/resources/app.asar` + `electron.exe`.
O binário `claude.exe` do Claude Agent SDK (~254 MB) **foi removido do `source/`** de propósito
(é o CLI do Claude Code, não é código do Kaptar). Recupere com
`npm i @anthropic-ai/claude-agent-sdk` ou aponte o app pro Claude Code que você já tem.

---

## Dados (ficam FORA daqui — são privados)

Tudo que é **seu** mora em `C:\Users\seven\AppData\Roaming\Kaptar\` e **não entra no repo**:

| Arquivo | O que é | Sensível? |
|---|---|---|
| `leads\leads.json` | todos os leads capturados (nome, telefone, site…) | sim — dados de terceiros |
| `leads\molde.json` | campanha manual (variações de mensagem) | não muito (tem cópia em `config-snapshot/`) |
| `leads\automacoes.json` | automações (AUTOPILOT STREETWEAR) | não muito (idem) |
| `leads\numero.json` | "livro do número": teto do dia, não-perturbe | — |
| `secrets.v1.bin` | chave da Google API + login do Claude, **cifrado** | **sim — nunca commitar** |
| `Partitions\kaptar-zap\` | sessão do WhatsApp Web (o QR já escaneado) | **sim** |

**Backup dos dados:** copie a pasta `Roaming\Kaptar\` inteira pra um HD externo de vez em quando.
Pra migrar de máquina: instale o Kaptar na nova e cole `Roaming\Kaptar\` por cima antes de abrir.

---

## Auto-updater

`app-update.yml` → `provider: generic`, `url: https://kaptar.mazzeoia.com.br/app/`, `channel: latest`.
O app checa esse endereço e troca o `app.asar` sozinho quando sai versão nova
(os dados em `%APPDATA%\Kaptar` **sobrevivem** ao update; qualquer patch no código do app, não).
Se a Mazzeo sumir, o update só vai falhar silenciosamente — o app continua rodando na 1.9.2.
Pra travar de vez numa versão, é só bloquear esse domínio no firewall/hosts.

---

## Como o app funciona (resumo — detalhe no playbook)

Ver `MEMORY/PLAYBOOKS/kaptar-importar-csv.md` no repo. Pontos que estão **cravados no código**
(`source/app/main/index.js`) e não dá pra mudar pela interface:

- **Envio WhatsApp:** janela fixa **09:00–18:59**; teto diário `min(200, 20 + dias×20)`
  (dia 1 = 20, dia 10+ = 200); cadência aleatória 45–120 s; para sozinho após 2 falhas seguidas.
- **`quantidade` do disparo** = tamanho do lote que entra na fila da campanha, não "envios garantidos".
- **Automação só roda com o Kaptar aberto** (não é serviço).
- Enquanto existe campanha `rodando`/`pausada`, a automação **não capta nem dispara**.
- Google Places: cota 1000/mês no app. Automação `fonte:"local"` não usa cota (gasta token do Claude).

---

## Reproduzir este snapshot no futuro

```bash
# do repo, com o Kaptar instalado:
KDIR="C:/Users/seven/AppData/Local/Programs/Kaptar"
cp "$KDIR/resources/app.asar" ferramentas/kaptar/app.asar
npx @electron/asar extract "$KDIR/resources/app.asar" ferramentas/kaptar/_x
mv ferramentas/kaptar/_x/out ferramentas/kaptar/_x/app
rm -rf ferramentas/kaptar/source && mv ferramentas/kaptar/_x ferramentas/kaptar/source
rm -rf ferramentas/kaptar/source/node_modules/@anthropic-ai/claude-agent-sdk-win32-x64  # tira o claude.exe (254 MB)
tar -a -c -f ferramentas/kaptar/kaptar-full-program-vX.Y.Z.zip -C "C:/Users/seven/AppData/Local/Programs" Kaptar
```
