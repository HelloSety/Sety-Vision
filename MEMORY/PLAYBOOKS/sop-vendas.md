# SOP de Vendas — Sety Studio

Processo padrão do primeiro contato ao contrato assinado.

**Agente de IA (WhatsApp):** o script completo de qualificação, missão em 6 passos, classificação A/B/C e catálogo de cross-sell está implementado em `saidas/uazapi-agent/system_prompt.txt` — mesma lógica replicada em `saidas/aurora-ia-crm/src/lib/sdr-engine.ts` (ver decisão `2026-07-02-escada-de-valor-sety-studio-sety-vision.md`, v1→v5.1, para o histórico). v5 (2026-07-04) reduziu o interrogatório de qualificação: máximo 2 perguntas seguidas, gatilho de parada nos 5 pontos essenciais, pacote antes do preço, urgência leve, WhatsApp como canal padrão (nunca e-mail sem necessidade). v5.1 adicionou priorização por urgência de prazo (🔥 essa semana / 🟡 esse mês / 🔵 1-2 meses / ⚪ sem prazo) e a cadência de follow-up de 5 mensagens pra leads com lançamento futuro (D+7, D+20, D-30, D-15, D-7). Esses arquivos são a fonte canônica do discurso do bot.

**Regra de governança (v4):** o bot nunca ajusta suas próprias regras. Análise de gargalos, métricas e sugestões de melhoria cabem ao Claude Code entre sessões (papel de Diretor de Crescimento/Consultor), que recomenda mudanças com racional e métrica de validação antes de qualquer edição no `system_prompt.txt`.

**Catálogo de cross-sell (serviços complementares, via rede de especialistas):** Motion Design (R$300-2.000+), Identidade Visual (R$600-2.500), Social Media (R$800-2.500/mês), Meta Ads gestão (R$800-2.000/mês), Google Ads gestão (R$900-2.500/mês), SEO (R$1.000-3.000), Design e Edição de Vídeo (orçamento). Oferecer só quando o cliente sinalizar a dor correspondente (ex: "Instagram parado" → Social Media; "não tenho logo" → Identidade Visual).

## Escada de valor (ver decisão `MEMORY/DECISOES/2026-07-02-escada-de-valor-sety-studio-sety-vision.md`)

🟢 **Set Studio** (entrada) → 🔵 **Sety Vision Premium** (automação/CRM) → 👑 **Sety Vision Premium Growth** (operação completa)

**Regra de ordem — nunca quebrar:** 1) Set Studio → 2) Descobrir necessidades → 3) Se houver potencial, apresentar Sety Vision. Nunca abrir o atendimento oferecendo o Premium.

### 🟢 Set Studio (oferta principal)

Porta de entrada: sites institucionais, landing pages, lojas Shopify/Nuvemshop, identidade visual, estrutura inicial.

**START** — R$800
- Landing Page ou Site Institucional
- Design responsivo, WhatsApp, SEO básico, até 50 produtos

**PROFISSIONAL** ⭐ (vender primeiro na maioria dos atendimentos) — R$1.500
- Loja Shopify/Nuvemshop, até 1.000 produtos
- Checkout otimizado, Pixel Meta, Google Analytics, SEO completo
- Categorias, banners, página institucional, WhatsApp integrado

**PERSONALIZADO** — sob consulta (proposta em 24h)
- Catálogos grandes (471+ produtos), integrações ERP, automação WhatsApp, múltiplas plataformas

### Quando apresentar a Sety Vision

NÃO é a oferta inicial. Só entra em cena quando o cliente sinalizar que quer crescer a operação ou precisa de automação completa. Sinais:
- "Quero automatizar meu atendimento."
- "Tenho muito lead."
- "Minha equipe demora responder."
- "Quero CRM." / "Quero IA." / "Quero escalar."
- "Quero uma estrutura profissional."

**Sety Vision Premium** — implementação R$6.900 + R$1.490/mês
- IA no WhatsApp (texto e áudio), CRM, pipeline, dashboard, hospedagem, backups, suporte prioritário
- Ideal para quem já tem site e quer automatizar o processo comercial

**Sety Vision Premium Growth** ⭐ — implementação R$9.900 + R$2.990/mês
- Tudo do Premium + site de alta conversão + gestão Meta Ads + gestão Google Ads + reuniões mensais de performance
- Ideal para quem quer vender do zero com operação completa

---

## ETAPA 1 — Prospecção (dia 1)

**Fonte A — Google Maps (principal)**
1. Scraper Google Maps → nicho + cidade
2. Exportar CSV: nome, telefone, WhatsApp, website
3. Filtrar: nota ≥ 4.0, pelo menos 10 reviews, tem website

**Fonte B — LinkedIn**
1. `/mapeamento-decisores` → encontrar dono/sócio
2. `/linkedin-prospecting-dm` → gerar 6 variações de DM
3. Disparar via Unipile ou manualmente

**Volume diário:** 20–40 contatos por canal

---

## ETAPA 2 — Primeiro Contato

**Regras:**
- Primeiro contato: apresentação + dor + pergunta
- Nunca mandar link ou preço no primeiro contato
- Personalizar com nome da empresa sempre
- Abrir sempre pela oferta Set Studio (site/loja), nunca pela Sety Vision

---

## ETAPA 3 — Call de Descoberta / Diagnóstico (30 min)

**Antes:** Rodar `/call-prep` com nome da empresa + decisor

**Roteiro:**
1. (5 min) Quebra-gelo
2. (10 min) Descoberta — site/loja atual, como chegam os leads, tem CRM, equipe demora responder?
3. (10 min) Apresentação — pacote Set Studio adequado (START ou PROFISSIONAL)
4. (5 min) Descobrir se há sinal de escada de valor (ver lista de sinais acima). Se houver, mencionar que existe um upgrade de automação/CRM para quando fizer sentido — sem empurrar ainda.

**Sinais de compra Set Studio:** "quanto custa?", "como funciona?", "quando começa?"
**Sinais de upgrade Sety Vision:** ver lista da seção "Quando apresentar a Sety Vision"

---

## ETAPA 4 — Proposta (enviar em até 24h após a call)

**Proposta Set Studio:** `propostas/<cliente>-<YYYY-MM-DD>.html` — 1 capa + 1 escopo + 1 investimento (regra fixa, nunca mais que 3 páginas).

**Proposta Sety Vision (gerar automaticamente quando o cliente demonstrar interesse):**
Documento com aparência profissional Sety Vision, pronto para PDF/WhatsApp, em `propostas/<cliente>-<YYYY-MM-DD>.html`, contendo:
- Nome da empresa e do responsável
- Solução indicada
- Objetivos identificados durante a conversa
- Plano recomendado (Premium ou Premium Growth) com justificativa
- Valores (implementação + mensalidade)
- O que está incluso
- Cronograma de implementação
- Próximos passos
- Condições comerciais

**Prazo de decisão:** 3 dias úteis (não deixar em aberto)

---

## ETAPA 5 — Follow-up

| Dia | Ação |
|---|---|
| D+0 | Enviar proposta por email + WhatsApp |
| D+2 | "Conseguiu ver a proposta? Alguma dúvida?" |
| D+5 | "Só confirmando o interesse — posso manter essa proposta aberta até sexta?" |
| D+10 | "Vou encerrar essa proposta — quer reagendar uma conversa antes?" |
| D+15 | Mover para "perdido" no CRM. Reativar em 30 dias. |

**Cadência alternativa — lead qualificado com lançamento futuro (30-90 dias, ex: aguardando produção das peças):** não seguir a tabela acima, que pressupõe decisão iminente. Usar em vez disso: D+7 (como está o desenvolvimento), D+20 (novidade no cronograma), D-30 antes da data de lançamento informada pelo cliente (retomar o projeto com calma), D-15 (se estiver caminhando, sugerir iniciar agora pra entregar no prazo), D-7 (último lembrete). Nunca mais de 1 mensagem/semana, sempre contextualizada ao projeto do cliente, nunca genérica. Parar a sequência imediatamente se o cliente responder ou disser que ainda não é o momento. Hoje enviado manualmente por Seven — automação ainda não construída (ver memória auto `project_sety_vision_follow_up_automation`).

---

## ETAPA 5.5 — Upsell Pacote Presença Digital (pós-fechamento do site)

Depois que o cliente fecha (ou está muito próximo de fechar) o site/loja Set Studio, oferecer o combo de presença digital — script completo em `saidas/uazapi-agent/system_prompt.txt`. Nunca oferecer no início do atendimento.

| Item | Valor |
|---|---|
| Google Meu Negócio ⭐ | R$350 à vista ou 2x R$190 |
| SEO Inicial | R$400 |
| Search Console + Analytics | R$250 |
| Integração WhatsApp | R$250 |
| Pixel Meta + Google Ads | R$300 |
| **Combo Presença Digital** | **R$990** (de R$1.550) |

Exemplo de ticket: PROFISSIONAL (R$1.500) + Combo (R$990) = R$2.490 por projeto, e prepara terreno para upsell futuro da Sety Vision.

## ETAPA 6 — Fechamento

1. Cliente aceita → enviar contrato simples (Google Docs) + boleto/Pix
2. Pagamento confirmado → iniciar onboarding (ver `entrega-site.md` para Set Studio)
3. Criar pasta `clientes/<Nome>/`
4. Registrar no HubSpot/CRM como Won
5. Agendar kick-off em 48h
6. Se fechou Set Studio primeiro: marcar follow-up de upsell Sety Vision para 30-60 dias após entrega

---

## ETAPA 7 — Pós-venda (case + upsell)

1. Após 30 dias de entrega → coletar depoimento
2. Documentar resultado (leads gerados, tempo economizado, conversão)
3. Transformar em: carrossel, post, estudo de caso
4. Adicionar ao portfólio
5. Se cliente é só Set Studio: avaliar sinais de upsell para Sety Vision (volume de leads, reclamação de demora no atendimento, pedido de CRM)

---

## Métricas semanais

| Métrica | Meta/semana |
|---|---|
| Contatos feitos (WhatsApp + LinkedIn) | 40–80 |
| Respostas recebidas | 8–16 (10–20%) |
| Calls realizadas | 3–6 |
| Propostas Set Studio enviadas | 2–5 |
| Propostas Sety Vision enviadas | 1–2 |
| Fechamentos Set Studio | 1–2/semana |
| Fechamentos/upsells Sety Vision | 1 a cada 2 semanas |

---

## CRM (HubSpot + Commander)

Etapas do pipeline:
1. Prospectando
2. Contato feito
3. Call agendada
4. Proposta enviada (Set Studio ou Sety Vision)
5. Negociação
6. Fechado ✓
7. Perdido (com motivo)

**Regra:** Todo lead com contato entra no pipeline no mesmo dia.
