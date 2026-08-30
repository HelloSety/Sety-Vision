---
name: kaptar-importar-csv
description: Operar o app Kaptar por fora — importar CSV de leads, editar molde/automação nos JSON, resetar QR travado. Tudo via arquivos em %APPDATA%\Kaptar\leads, sem tocar no .exe.
metadata:
  type: project
---

# Operar o Kaptar por arquivo (sem patch no .exe)

Tudo do Kaptar mora em `%APPDATA%\Kaptar\` (= `C:\Users\seven\AppData\Roaming\Kaptar`). A raiz de dados do "scrapper" é a subpasta `leads\`:

| Arquivo | O que é |
|---|---|
| `leads\leads.json` | todos os leads (array). Kaptar recalcula score/categoria ao ler. |
| `leads\molde.json` | campanha manual: nome + até 5 `variacoes` de mensagem `{id,texto,ativa}` (texto ≤700). Vars: `{{nome}}`, `{{cidade}}`, `{{nicho}}`, `{{telefone}}` — **linha com var vazia é apagada inteira** no envio. |
| `leads\automacoes.json` | array de automações (schema `AutomacaoSchema`). |
| `leads\numero.json` | "livro do número": teto do dia, não-perturbe. Sobrevive a apagar leads. |
| `Partitions\kaptar-zap\` | sessão do WhatsApp Web (QR/login). |
| `secrets.v1.bin` | chave Google + login Claude (cifrado). |

## Backup do app + patch anti-pausa (cópia de continuidade)

Código completo do Kaptar arquivado no repo em **`ferramentas/kaptar/`** (2026-08-30): `app.asar` (patchado) + `app.asar.orig-v2.0.0` (pristino) + `source/` legível + `config-snapshot/` + `README.md`. Instalador (`Kaptar-2.0.0-instalador.exe`, 154 MB) e `kaptar-full-program-v2.0.0.zip` (623 MB, roda sem instalar) ficam **fora do git** — backup manual em HD/nuvem. Dados (`%APPDATA%\Kaptar\`) nunca versionados.

- **2026-08-30 — Kaptar auto-atualizou 1.9.2 → 2.0.0** no meio da sessão (updater `generic`, feed `https://kaptar.mazzeoia.com.br/app/`). O update troca `resources/app.asar` mas não toca em `%APPDATA%\Kaptar` (leads/molde/automacoes/campanha sobrevivem). **Fuses do Electron:** `embedded_asar_integrity_validation` e `only_load_app_from_asar` = DISABLE → dá pra patchar o `app.asar` que ele carrega.
- **PATCH ANTI-PAUSA aplicado** (`scripts/kaptar-patch-nao-pausar.mjs`): `motivoParaParar()` no `index.js` para a campanha se `s.invalidosSeguidos >= MAX_INVALIDOS_SEGUIDOS (3)` OU `s.falhasSeguidas >= MAX_FALHAS_SEGUIDAS (2)`. Patch = troca binária **in-place, mesmo tamanho de bytes** (` = 3;`→`=3e9;`, ` = 2;`→`=2e9;` — mantém o header do asar válido; extract+repack NÃO serve, empacota o `claude.exe` de 254 MB dentro do asar e quebra). Efeito: número sem WhatsApp → marca `sem-whatsapp` e **pula pro próximo**, campanha nunca mais para por isso. **Fica** só o stop por `s.deslogado` (sessão do WhatsApp caiu de verdade, confirmada com 2ª leitura). **Não mexido:** teto diário do número (`20 + dias×20`, máx 200 — anti-ban); ao bater, para pro dia e volta amanhã (é limite, não bug).
- **O auto-update apaga o patch.** Refazer `node scripts/kaptar-patch-nao-pausar.mjs` (Kaptar fechado) após cada versão nova; o script faz backup `app.asar.orig-v<ver>-<ts>` e avisa se os padrões mudarem. Pra travar de vez: `127.0.0.1 kaptar.mazzeoia.com.br` no hosts.
- **Filtro "só celular"** (`scripts/kaptar-so-celular.mjs`): dos 1770 leads, 540 tinham telefone **fixo** (`ehCelular()` false — 10-11 díg. sem começar em 9). O Kaptar enfileira qualquer telefone (`exige/obriga: "telefone"` só checa `l.telefone !== ""`, **não existe requisito de WhatsApp/celular**), tenta mandar, WhatsApp responde "número inválido" → `sem-whatsapp` → (antes do patch) 3 seguidos = para. Fix: zera `telefone` + `temWhatsapp:false` nos fixos e nos duplicados exatos (mesmo nome+cidade) do `leads.json` → o `exige` já os exclui de captações/filas futuras. Também filtra `campanha.json` e a `fila` do autopilot pra só celular. Rodar de novo depois de captações novas (fixos voltam a entrar).
- **Não reenviar pro mesmo contato = nativo, MAS quebrado na 2.0.0.** Antes de cada envio o motor roda `podeEnviarPara(livro, telefone)`: se está em `numero.json > naoPerturbe` ou recebeu msg nos últimos **90 dias** (`CARENCIA_DIAS`), **pula** (não para). Vale campanha manual e `filaViva` do autopilot. **PORÉM** — na 2.0.0 o Kaptar entrega a mensagem (aparece ✓✓ no WhatsApp) mas a verificação pós-envio (`sondar(SCRIPT_ESTADO)`) quebrou → marca `falhou` (erro vazio) → `anotarEnvio` **só roda em `r.tipo === "enviado"`**, então o número **nunca entra no `numero.json`** e a trava de não-repetir não ativa sozinha. Contorno: `scripts/kaptar-registrar-enviados.mjs` (e o watchdog abaixo) gravam os números da campanha em `numero.json > ultimoEnvio` na marra. Rodar depois de CADA onda. Efeito colateral bom: como `enviado` fica em 0, o **teto diário nunca dispara** (`enviadosNoDia` sai de `enviosPorDia[hoje]`, que também só cresce em `anotarEnvio`) — o corte real por onda passa a ser só o `quantidade:100` do disparo (`fila.slice(0, quantidade)` no `motor.iniciar`).

## 2026-08-30 — limite 100/onda + follow-up (pedido do Seven)

Seven quer, **automático todo dia**: prospectar + mandar **100 de dia (09:00) + 100 de noite (16:00)** + follow-up, "somente 100 por onda pra não bloquear o WhatsApp", pausar ao bater 100 e retomar na próxima onda.

- **Limite 100/onda**: já é garantido pelo `quantidade:100` de cada disparo do `automacoes.json` (o `motor.iniciar` faz `fila.slice(0,100)`; a campanha nasce com ≤100 alvos e vira `terminada` sozinha ao processar todos). `scripts/kaptar-watchdog-100.mjs` é o seguro extra: roda em loop, conta alvos processados (estado ≠ `espera`), força `situacao:"terminada"` em >=100 e grava os números no `numero.json`. **Não** mexe no autopilot — a onda das 16:00 roda normal. Rodar com `node scripts/kaptar-watchdog-100.mjs` (precisa ficar de pé; Task Scheduler foi bloqueado pelo classificador, então é `--%` manual ou skill `/loop`).
- **Estados vistos**: Seven pausou a campanha na mão (`situacao:"parada"`, motivo "você parou a campanha"), 25/100 processados. `parada` **não** é "ocupada" → o autopilot volta a rodar na próxima janela (quando o Kaptar estiver aberto). Kaptar fechado = nada roda (automação não é serviço).
- **FOLLOW-UP — não montado, precisa de decisão.** Kaptar é single-touch por design e o `CARENCIA_DIAS=90` **impede** re-contato. Pra ter follow-up mensal precisa de um dos dois: (a) patch `const CARENCIA_DIAS = 90;` → `30` no `app.asar` (mesmo esquema in-place; afeta também o frio — re-aborda em 30 dias) + 2ª automação `FOLLOW-UP STREETWEAR` (`ativa:false`, `horasCaptacao:[]`, `fila` preenchida por script) com copy de follow-up; ou (b) script mensal que tira do `numero.json > ultimoEnvio` quem tem 30-60 dias, joga numa fila de follow-up, dispara, e re-registra. **Os 2 dividem o orçamento de 200/dia com o frio** — decisão pendente do Seven: qual o split (ex: 70 frio + 30 follow-up por onda?) e como agendar o script mensal. Não deixei rodando: follow-up mal configurado rodando sozinho = risco de ban, que é o que ele quer evitar.

## Limites cravados no código (Kaptar 1.9.2) — não dá pra passar sem patchar

- **Envio WhatsApp: 20/dia no dia 1, +20/dia, teto 200/dia.** Cadência 45–120 s. Janela **9h–19h** fixa. É a trava anti-ban.
- **Captação:** `maxResultados` 1–1000 por rodada (default 60).
- **Google Places:** cota **1000/mês** no app; a chave do Seven ainda tem ~100/**dia** (ver [[prospeccao-places-api]]). Automação com `fonte:"local"` não tem cota (custa token de Claude por card).
- Automação **só roda com o Kaptar aberto** — não é serviço.

## QR code travado (spinner infinito)

Sessão do WhatsApp Web corrompida. Fix (com o Kaptar **fechado**): mover `%APPDATA%\Kaptar\Partitions\kaptar-zap` pra um `.bug-<ts>` e reabrir — o WhatsApp Web reinicia limpo. Não perde leads nem login do Claude; só re-escaneia o QR. Feito em 2026-08-29 (13 processos zumbis → 6).

## Importar CSV de leads no Kaptar

## O que é / por que existe

O **Kaptar** (app desktop da Mazzeo IA, `kaptar.mazzeoia.com.br`, instalado em `%LOCALAPPDATA%\Programs\Kaptar`) acha negócios sem site, analisa com o Claude Agent SDK da máquina e dispara WhatsApp. Ele **exporta** CSV mas **não importa** — esse era "o detalhe que faltava" pro Seven usar nele a lista de streetwear que ele já tinha gerado por fora (ver [[prospeccao-places-api]] / [[mega-operacao-prospeccao]]).

Solução (MODO 1, sem tocar no `.exe`): script que converte o CSV pro formato de lead do Kaptar e mescla no banco dele em disco.

## Como rodar

```bash
node scripts/kaptar-importar-csv.mjs "<caminho do csv>"        # grava
node scripts/kaptar-importar-csv.mjs "<csv>" --dry             # só mostra + amostra
node scripts/kaptar-importar-csv.mjs "<csv>" --fonte local     # default: api
```

- **Fechar o Kaptar antes** — ele reescreve o `leads.json` a cada busca; rodar com o app aberto arrisca o import ser sobrescrito. Reabrir depois pra ver.
- Alvo: `%APPDATA%\Kaptar\leads\leads.json`. Faz backup `leads.json.bak-<timestamp>` antes de gravar.
- **Idempotente**: dedup por `id` / telefone internacional / `nome|cidade` (mesma lógica do `chavesDoLead` do Kaptar 1.9.2). Rodar 2x não duplica.

## Mapeamento CSV → lead

- Auto-detecta delimitador (`;` do export do próprio Kaptar ou `,` de planilha).
- Casa colunas por nome (aliases): `Nome Marca/Empresa/Nome`, `Categoria/Segmento/Nicho`, `Telefone`, `WhatsApp`, `Website/Site`, `Instagram`, `Google Maps URL`, `Avaliações`, `Nota Google`, `Cidade`, `Estado`, `Problema Encontrado`+`Oferta Recomendada` → viram `resumo`.
- `id`: `gl_cid<cid>` extraído da URL do Maps; sem cid → `imp_<sha1(nome|cidade|tel)>`.
- `score` e `categoria` recalculados pela fórmula real do Kaptar (`calcularScore`/`categoriaDoLead`), não pelo score da planilha.
- `lat/lng = 0` (planilha não traz) → dedup cai em telefone + nome|cidade.

## Histórico

- **2026-08-29**: importados 150 leads de `streetwear_leads_3000.csv` (Tier 1 marca própria + Tier 2 revendedor, SP/RJ). O CSV tinha ido pra Lixeira na limpeza do Downloads — recuperado pra `saidas/prospeccao/streetwear_leads_3000.csv`.
- **2026-08-29** (mesma sessão): importada a lista nacional completa `saidas/prospeccao/prospecting_leads_sety_studio.csv` (1125 leads streetwear/moda da operação Places API — ver [[prospeccao-places-api]]). 1104 novos + 21 dedup contra os 150 anteriores. **Kaptar ficou com 1255 leads** (688 `ativo`, 566 `sem presença`, 1 `sem site`; SP 293 / SC 116 / RJ 115 / PR 109 / MG 96 / RS 91…). `motivo_qualificacao` + `oportunidade` viraram o `resumo` de cada lead.

## Limitação conhecida

Update automático do Kaptar (`generic` provider, canal `latest`) troca o `app.asar` mas **não mexe em `%APPDATA%\Kaptar`** — leads, molde e automações sobrevivem. O que não sobrevive a update é qualquer patch no código do app (por isso Seven optou por link de vídeo no texto, não anexo nativo — 2026-08-29).

## Campanha + automação montadas (2026-08-29)

- `molde.json` → **PROSPECÇÃO STREETWEAR**, 4 variações reescritas pro ICP (marca/loja streetwear, loja Nuvemshop, 1 emoji, só `{{nome}}`).
- **2026-08-29 (mesma sessão, depois)**: Seven abandonou o link de vídeo. As 4 variações do `molde.json` **e** os 100 alvos já renderizados do `campanha.json` (campanha estava `parada`) foram reescritos p/ trocar o bloco `🎥 ... >>> LINK DO VÍDEO AQUI <<<` por 2 linhas de prova social + o **Instagram da Sety Studio** (`https://www.instagram.com/sety.studio/`) — objetivo: gerar confiança em vez de pedir clique num vídeo. Cada variação tem um CTA de link próprio ("dá uma olhada nas lojas que a gente já entregou", "os projetos reais que já entregamos", "ver o resultado direto no nosso Instagram", "conhecer o trabalho"). Script: `scratchpad/kaptar-trocar-video-por-instagram.mjs` (Kaptar fechado → backup `.bak-<ts>` de molde+campanha → re-render por variação detectando a antiga linha `🎥` e extraindo `{{nome}}` da saudação → reabre Kaptar). Pra futuras trocas de texto: editar `molde.json` **e** `campanha.json` (os alvos guardam a mensagem já renderizada, não re-leem o molde).
- `automacoes.json` → **AUTOPILOT STREETWEAR** (Seven ligou no toggle → `ativa:true`). `fonte:local` (sem cota Google), 8 nichos (streetwear, roupas, moda masc/fem, calçados, skate, surf, artigos esportivos), 8 capitais, `maxResultados:100`, **todos os dias**, capta 08:00, dispara 10:00 lote 200. `execHoje` pré-preenchido → 1º run no dia seguinte 08:00, sem retroativo.
- **2026-08-30 — o link de vídeo VOLTOU e o porquê**: a automação tem `variacoes` **próprias** dentro do `automacoes.json`, cópia separada do `molde.json`. Todo disparo o autopilot faz `dispararCampanha(alvos, moldeDa(a))` onde `moldeDa(a) = {nome, variacoes: a.variacoes}` — **nunca lê o `molde.json`**. Como o fix de 08-29 só tocou molde+campanha, no dia seguinte às 10:00 o autopilot regerou o `campanha.json` do zero a partir das suas variações antigas (com `🎥 >>> LINK DO VÍDEO AQUI <<<`). Fix definitivo: `automacoes.json[].variacoes` sincronizado com as 4 da campanha (Instagram, sem vídeo) via `scratchpad/kaptar-autopilot-sync-msgs.mjs` (Kaptar fechado → backup molde/automacoes/campanha `.bak-<ts>` → copia `molde.variacoes` pro autopilot → re-renderiza os 43 alvos em `espera` do `campanha.json` → `situacao:"rodando"`, `motivo:""`). **Regra: trocar texto do autopilot = editar 3 arquivos — `molde.json` (campanha manual) + `automacoes.json > variacoes` (fonte real do autopilot) + `campanha.json` (alvos já renderizados da leva corrente).**
- **Estados da `campanha.json` (`campanha.situacao`)**: `"rodando"` | `"pausada"` | `"parada"` | `"terminada"`. Só `rodando`/`pausada` contam como "ocupada" e bloqueiam um disparo novo — `parada` **não** bloqueia: o próximo disparo do autopilot sobrescreve o `campanha.json` inteiro (herda só os contadores `diasDeUso`/`dia`/`enviadosHoje`). `motor.iniciar` exige sessão de WhatsApp viva (`zap.sessao() !== "sem-sessao"`), senão devolve erro sem começar. Auto-parada: `2` envios seguidos falhados (`"a tela do WhatsApp provavelmente mudou"`) ou `3` números seguidos sem WhatsApp. `retomar()` do app só age se `situacao === "rodando"`.
- **2026-08-30 — a leva de hoje estava `parada`** (motivo: 2 envios falharam → WhatsApp Web mudou/caiu). Isso é problema de sessão do zap, não de texto. Depois do sync: reabrir Kaptar; se ainda falhar o envio, aplicar o fix de "QR code travado" (mover `Partitions\kaptar-zap`). O autopilot em si segue `ativa` e reconstrói leva limpa amanhã independente disso.
- **2026-08-30 — config 2 ondas/dia**: Seven pediu "100 de manhã, 100 de noite". Travas do código (`out/main/index.js`): janela de envio **hard-coded 09:00–18:59** (`HORA_INICIO=9`, `HORA_FIM=19`, `dentroDaJanela`) — **não existe envio à noite**. Teto diário do número: `min(200, 20 + diasDeUso*20)` (`TETO_INICIAL=20`, `TETO_PASSO=20`, `TETO_MAXIMO=200`) — dia 1 = 20, dia 10+ = 200, contado no `numero.json` somando **todos** os disparos do dia; estourar = `pararTudo`. Config aplicada em `automacoes.json` via `scratchpad/kaptar-autopilot-2-ondas.mjs`: `horasCaptacao:["07:00","13:00"]`, `disparos:[{"09:00",100},{"16:00",100}]`, `maxResultados:100` (×2 captações = ~200/dia na fila). 16:00 é o disparo "da noite" possível — 100 msgs a 45–120s (~80s méd) drenam em ~2h, terminam ~18:15 dentro da janela; mais tarde que isso o corte das 19:00 come a sobra. Cada disparo **substitui** o `campanha.json` (herda só contadores), então a 2ª onda abandona o que a 1ª não terminou — ok quando o número está aquecido (1ª onda de 100 termina antes das 16:00).
- **TRAVA: autopilot não capta/dispara enquanto há campanha `rodando`/`pausada`.** O tick do agendador (`olhar()`, `TICK_MS=30s`, espera inicial 20s) e o botão manual `rodarAgora` ("buscar leads agora") **os dois** dão `return`/`"há uma campanha em andamento — espere ela terminar"` se `campanhaOcupada()` (= `campanha.situacao` é `rodando` ou `pausada`). Uma leva **travada** (ex.: WhatsApp caiu no meio) fica bloqueando tudo. Fix: setar `campanha.json` → `situacao:"terminada"` (Kaptar fechado, backup antes) — os leads não se perdem, voltam pro pool e a próxima captação/disparo os re-enfileira. Feito em 2026-08-30 pra destravar a captação imediata.
- **Rodar a captação HOJE sem esperar o horário / sem retroativo nos disparos**: em `execHoje.slots` deixar de fora as chaves `c:HH:MM` que se quer rodar (o slot passado vira "devendo" e o tick pega em ≤30s) e **manter** as chaves `d:HH:MM` (disparo não roda retroativo, não troca a campanha corrente). Chave do slot: `c:` captação, `d:` disparo, + `HH:MM`.
- **`quantidade` do disparo NÃO é quantas manda** — é o tamanho do lote que entra na campanha. O envio real é 20/dia (dia 1) +20/dia até 200, com 45–120 s entre cada, 9h–19h. Por isso 30 era ruim (fila crescia, mandava só 30); 200 = alimenta o teto do dia sem sobra.
- Com `maxResultados:100` e teto de envio 200, o gargalo vira a captação: manda ~100/dia no regime. Pra 200/dia sobe a captação.

## Pesquisa de leads pro Kaptar sem CSV (2026-08-29)

`scripts/prospeccao-kaptar.mjs` roda o pipeline de [[prospeccao-places-api]] (`scripts/prospeccao/` 1→2→4→3) e importa o CSV resultante direto no `leads.json` pelo `kaptar-importar-csv.mjs`. Seven não toca no CSV.

- A coleta Google Places é **resumível** e a chave do Seven trava em ~100 buscas/dia. Em 2026-08-29 a matriz de 432 consultas parou em ~117/432 (429). Rodar `node scripts/prospeccao-kaptar.mjs` uma vez por dia até chegar no "FIM. …/432".
- Os 1125 leads dessa 1ª leva já entraram no Kaptar (1104 novos → **1255 leads**). 98 HOT / 237 HIGH / 239 MEDIUM / 551 LOW.
- Depois que a matriz esgotar, o fluxo contínuo é só a automação AUTOPILOT STREETWEAR.
