# Decisão: Escada de Valor Set Studio → Sety Vision

**Data:** 2026-07-02
**Quem decidiu:** Seven
**Status:** Ativo — substitui a "oferta única" do SOP de vendas anterior

---

## Decisão

A oferta comercial deixa de ser uma proposta única ("Sistema Comercial Inteligente") e passa a ser uma escada de valor em dois estágios, com marcas separadas:

1. **Set Studio** (entrada) — sites, landing pages, lojas Shopify/Nuvemshop, identidade visual, estrutura inicial.
2. **Sety Vision** (upsell) — automação, CRM, IA no WhatsApp, gestão de tráfego. Só aparece se o cliente sinalizar que quer crescer/automatizar.

## Por quê

Vender direto o Sety Vision (setup R$6,9-9,9K) assusta quem só quer um site. Vender primeiro a estrutura (R$800-1.500) reduz a barreira de entrada, gera caixa rápido e cria trilha natural para o upsell quando o cliente já confia na entrega.

## Pacotes

**Set Studio**
- START — R$800: landing page/site institucional, design responsivo, WhatsApp, SEO básico, até 50 produtos
- PROFISSIONAL ⭐ (vender primeiro na maioria dos atendimentos) — R$1.500: loja Shopify/Nuvemshop, até 1.000 produtos, checkout otimizado, pixel Meta, GA, SEO completo, categorias, banners, página institucional, WhatsApp
- PERSONALIZADO segue disponível como opção sob consulta para catálogos grandes/integrações avançadas (não repetido nesta decisão, mas não foi removido)

**Sety Vision** — só apresentar quando o cliente disser algo como "quero automatizar", "tenho muito lead", "minha equipe demora responder", "quero CRM/IA", "quero escalar"
- Premium — implementação R$6.900 + R$1.490/mês: IA no WhatsApp (texto/áudio), CRM, pipeline, dashboard, hospedagem, backups, suporte prioritário
- Premium Growth ⭐ — implementação R$9.900 + R$2.990/mês: tudo do Premium + site de alta conversão + gestão Meta/Google Ads + reuniões mensais

## Regra de ordem (nunca quebrar)

1. Set Studio → 2. Descobrir necessidades → 3. Se houver potencial, apresentar Sety Vision.
Nunca abrir atendimento oferecendo o Premium.

## Proposta comercial automática

Quando o cliente demonstrar interesse em Sety Vision, gerar proposta personalizada (nome da empresa, responsável, solução indicada, objetivos identificados na conversa, plano recomendado, valores, escopo, cronograma, próximos passos, condições comerciais) em `propostas/<cliente>-<data>.html`, com aparência de documento profissional Sety Vision, pronta para PDF/WhatsApp.

## Atualização v3 (mesmo dia) — motor de qualificação antes do upsell

Refinamento: a IA nunca inicia tentando empurrar a Sety Vision. Primeiro conduz uma qualificação natural (empresa, se já tem site, como vende hoje, faturamento, volume de atendimento, uso de WhatsApp, equipe, se já anuncia, maior problema) e só decide qual produto oferecer depois disso. Sety Studio continua sendo sempre a primeira oferta; a Sety Vision só entra quando sinais de potencial aparecem (já anuncia, tem equipe, recebe muitas mensagens, reclama de atendimento/perda de clientes, quer crescer/automatizar, fatura alto, tem orçamento).

Regras adicionais do motor de vendas (agente de IA):
- Nunca revelar que é IA no início — só depois de gerar confiança e interesse, com frase pronta que transforma a revelação em prova social do produto.
- Framing de exclusividade ao apresentar Sety Vision para lead de alto potencial: implementação é personalizada, não atende centenas de empresas ao mesmo tempo (gera percepção de valor sem falsa urgência).
- Ritmo de atendimento: mensagens curtas, pausa maior em explicações longas, para parecer humano.
- Sempre mostrar e explicar prints da plataforma quando disponíveis, nunca enviar sem contexto.

## Atualização v3.1 (mesmo dia) — catálogo completo / cross-sell

A IA passa a representar todo o ecossistema Sety, não só os 2 produtos principais. Identifica oportunidades de cross-sell e upsell com os serviços complementares abaixo, entregues via "rede de especialistas" da Sety (nunca dizer que terceiriza — sempre "gerenciamos toda a execução, único ponto de contato").

| Serviço | Valor de referência |
|---|---|
| Motion Design | Simples R$300-600 · Premium R$800-2.000+ · Comercial sob orçamento |
| Identidade Visual | R$600-2.500 |
| Social Media | R$800-2.500/mês |
| Meta Ads (gestão) | R$800-2.000/mês (verba à parte) |
| Google Ads (gestão) | R$900-2.500/mês |
| SEO | R$1.000-3.000 |
| Design (banners, catálogo, criativos) | Orçamento personalizado |
| Edição de Vídeo | Orçamento personalizado |

Regra de cross-sell pós-fechamento: site fechado → Pixel/SEO/Ads; loja fechada → Sety Vision; Sety Vision fechada → tráfego/SEO/criativos; Social Media fechado → Motion; logo pedido → identidade visual completa.

**Fonte canônica do script completo (v3 + v3.1):** `saidas/uazapi-agent/system_prompt.txt` — é o system prompt real carregado pelo agente de WhatsApp (`saidas/uazapi-agent/app.py`).

## Atualização v4 (mesmo dia) — Sistema Operacional Comercial (duas camadas)

Ajuste de conceito: em vez de um prompt que "se autoaperfeiçoa" sozinho (comportamento imprevisível), a operação passa a ter duas camadas separadas:

**Camada tática (executa)** — `saidas/uazapi-agent/system_prompt.txt`, o script real do agente de WhatsApp. Reescrito nesta atualização com: identidade das duas empresas, missão em 6 passos com ordem fixa (nunca inverter), diagnóstico completo (empresa, equipe, marketing, site/loja, ticket, problema/objetivo, volume de atendimento, CRM), classificação interna A/B/C (nunca revelada ao cliente) para guiar a recomendação, catálogo completo com cross-sell, comportamento consultivo, revelação tardia da IA, framing de exclusividade, follow-up.

**Camada estratégica (analisa e recomenda, nunca aplica sozinha)** — Claude Code, entre sessões, usando os skills já existentes (`/executive-report`, `/traffic-commander`, `/crm-forecasting`, `/ceo-advisor`). Papéis do briefing v4 que **não** cabem no bot tático porque exigem dados reais que ele não tem (ROI, CAC, LTV, taxa de conversão histórica, receita) ou porque um LLM sem estado não deve alterar suas próprias regras:
- "Diretor de Crescimento" / "Consultor da Empresa" (responder "como está a operação?", identificar gargalos, sugerir melhorias) = papel do Claude Code, puxando dados reais do CRM/ads quando Seven perguntar.
- Qualquer sugestão de mudança no `system_prompt.txt` deve vir com racional, impacto esperado e métrica para validar — e ser **apresentada a Seven antes de aplicar**, nunca aplicada automaticamente pelo próprio bot ou silenciosamente pelo Claude Code.

**Gaps de infraestrutura identificados (não implementados nesta rodada, ficam pendentes):**
- "Memória de cliente" persistente entre conversas (nome, empresa, orçamento, status, próximo follow-up) — hoje `memory.py` só guarda histórico em RAM por sessão, perdido a cada restart do processo. "Nunca perguntar duas vezes" só é garantido dentro da mesma conversa.
- Métricas de funil (leads, conversão, reuniões, fechamentos) não são coletadas automaticamente pelo agente — não há logging estruturado nem conexão com o CRM ainda.
- Timing de mensagens (pausas entre 2-12s) é controlado por código em `app.py` (`time.sleep(1 + len(chunk)/200)`), não pelo prompt — o texto do prompt sobre ritmo é só reforço de tom, não altera o comportamento real de timing.

**Escalabilidade confirmada:** a arquitetura já é modular — para replicar para outra empresa, só é preciso trocar `system_prompt.txt` (nome, serviços, preços, público) e variáveis do `.env`. O núcleo (`app.py`, `llm.py`, `memory.py`, `buffer.py`, `uazapi.py`) não depende de nada exclusivo da Sety.

## Atualização v5 (2026-07-04) — redução do interrogatório de qualificação

Análise de uma conversa real apontou nota 8,8/10, mas com gargalo: o cliente respondia mais de 20 mensagens de diagnóstico antes de ver qualquer proposta, com perguntas encadeadas sem venda intercalada. Seven trouxe o racional e o texto exato da correção; aplicado nos dois system prompts (`saidas/uazapi-agent/system_prompt.txt` e `saidas/aurora-ia-crm/src/lib/sdr-engine.ts`) para manter os dois consistentes, já que qualquer um pode estar ativo (ver [[project_bot_whatsapp_canonico]]).

Mudanças de regra:
- **Diagnóstico dividido em essencial (5 pontos: segmento, plataforma/como vende, porte do pedido, prazo, identidade visual pronta) vs. opcional** (equipe, marketing, ticket médio, volume de atendimento, CRM) — opcional nunca bloqueia a proposta.
- **Máximo 2 perguntas seguidas** antes de resumir e inserir uma frase de valor/autoridade (ex: "a Shopify é excelente aqui porque você cresce sem trocar de plataforma depois" em vez de "Shopify é boa").
- **Gatilho de parada:** assim que os 5 pontos essenciais forem confirmados, resumir e ir direto pra proposta — nunca continuar qualificando só porque há mais o que saber.
- **Pacote antes do preço:** lista curta do que está incluso (checklist com ✅) sempre antes de citar valor ou pedir e-mail/contato.
- **Urgência leve pós-proposta**, só quando o cliente já demonstrou interesse real (nunca na abertura).
- **Canal padrão é o WhatsApp, nunca o e-mail:** proposta e negociação acontecem direto na conversa. E-mail só quando o cliente precisa encaminhar pra sócio/decisor, o orçamento é alto (a partir de R$3.000) ou o próprio cliente pede por e-mail. Se a proposta acabou indo por e-mail, nunca reforçar "olha seu e-mail" — puxar o foco de volta pra decisão, nunca só confirmar que foi enviado. Motivo: no caso analisado (lead Murilo), o cliente já estava engajado e respondendo rápido no WhatsApp — tirar a negociação dali pra esperar e-mail esfria a conversa à toa.

Impacto esperado: reduzir o atendimento de ~25-30 mensagens para ~10-15 sem perder qualidade de qualificação, porque o lead sente valor mais cedo em vez de preencher formulário. Métrica de validação: acompanhar número médio de mensagens até a proposta e taxa de resposta/conversão nas próximas conversas via CRM.

## Atualização v5.1 (2026-07-04, mesmo dia) — priorização por urgência de prazo + cadência de follow-up

Continuação da análise do lead Murilo: ele tinha todos os 5 pontos essenciais fechados (marca, logo, Shopify, categorias, prazo) mas só pretendia lançar em 1-2 meses — e a conversa consumiu 35 minutos de qualificação profunda, tempo desproporcional pra quem já avisou que decide daqui a meses.

Regra adicionada (mesmos dois arquivos, `system_prompt.txt` e `sdr-engine.ts`) — **priorização por urgência de prazo**, calibrando o quanto aprofundar a conversa agora:
- 🔥 Quer começar essa semana → prioridade máxima, qualificação completa, conduzir direto pro fechamento.
- 🟡 Quer começar esse mês → qualificar normalmente e tentar fechar.
- 🔵 Quer começar em 1-2 meses (ainda produzindo/organizando) → qualificar só o essencial, registrar (`proxima_acao`) e não forçar proposta detalhada nem negociação de valor agora — mostrar que já preparou algo, sem pressionar. Fechar com uma mensagem de baixa pressão e retomar perto da data.
- ⚪ Sem prazo definido/resposta vaga → não insistir, registrar interesse, não investir mais tempo até intenção mais concreta.

**Cadência de follow-up pra leads 🔵 (30-90 dias até lançamento)**, documentada como referência nos dois prompts e detalhada em `[[project_sety_vision_follow_up_automation]]` (memória auto, ainda sem automação de disparo construída — hoje é manual):
D+7 (como está o desenvolvimento) → D+20 (novidade no cronograma) → D-30 antes do lançamento informado (retomar com calma) → D-15 (se estiver caminhando, iniciar agora) → D-7 (último lembrete). Nunca mais de 1 mensagem/semana, sempre contextualizada, parar a sequência se o cliente responder ou disser que ainda não é o momento.

Isso não deprioriza o relacionamento com leads de prazo longo — só evita gastar o mesmo tempo/energia de um lead pronto pra fechar agora.

## O que isso substitui

- SOP antigo (`MEMORY/PLAYBOOKS/sop-vendas.md`) tinha "Oferta única: Sistema Comercial Inteligente, setup R$3.500-5.000 + R$1.500-2.500/mês" — descontinuado.
- Ver também [[../PLAYBOOKS/sop-vendas.md]] (reescrito nesta data) e a decisão de nicho esportivo em `2026-06-24-retorno-nicho-esportivo.md` (continua válida — Set Studio mantém foco esportivo como nicho de entrada).
