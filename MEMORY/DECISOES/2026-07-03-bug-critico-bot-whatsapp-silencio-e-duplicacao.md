# Incidente: bot do WhatsApp (aurora-ia-crm) ficando em silêncio e duplicando respostas

**Data:** 2026-07-03
**Gatilho:** lead real de prospecção (PaixaoSports, camisas de time) ficou sem resposta várias vezes durante qualificação; depois, respostas quase-duplicadas pra mesma pergunta.

## Descoberta operacional

O webhook ativo do número usado em prospecção **não é o `uazapi-agent`** (Python local) — é o `aurora-ia-crm` (Next.js, sempre ligado no Vercel). Os dois bots existem no repo; qual está realmente no ar depende da instância/token da UAZAPI. **Sempre confirmar com `GET /webhook` na API antes de investigar** (ver `MEMORY/../project_bot_whatsapp_canonico` no sistema de memória do Claude).

## Causa raiz 1 — silêncio (`src/lib/contact-classifier.ts`)

Mensagens sem palavra-chave comercial exata ("camisa de time", "montar uma loja" sem a frase "loja virtual") faziam o classificador cair num fallback de `decision: "ignore"` assim que o contato deixava de ser "novo". Fix: removido o `ignore` por baixa pontuação de intenção — agora qualquer mensagem que passe pelos bloqueios legítimos (grupo, spam, ofensa repetida, tag de exclusão, contato pessoal/família/parceiro/fornecedor, contato salvo no celular) sempre gera `respond`, deixando o Claude interpretar contexto em vez de uma lista fixa de palavras decidir por silêncio.

## Causa raiz 2 — duplicação (`src/app/api/webhook/whatsapp/route.ts`)

Duas mensagens do cliente em sequência rápida chegam como dois eventos de webhook independentes, cada um gerando uma chamada de IA em paralelo sem saber da outra — resultado: duas perguntas parecidas mas diferentes quase no mesmo segundo. Fix: debounce de 4s após salvar a mensagem recebida — antes de gerar resposta, checa se já existe mensagem do cliente mais nova (`hasNewerClientMessage`); se sim, cede a vez pra invocação mais recente processar o lote inteiro com histórico atualizado.

Reforço adicional: guarda de "resposta repetida" evoluiu de comparação de texto idêntico pra similaridade por sobreposição de palavras (Jaccard, limiar 0.6, janela 20s) — pega paráfrases da mesma pergunta, não só duplicata exata.

## O que já existia e funcionava bem (não foi preciso construir)

- Idempotência de webhook por `messageId` — `INSERT` atômico com constraint única (`processed_webhook_events`), sem race condition.
- Notificação humana só para exceções reais (lead quente, conteúdo ofensivo) via `notify_human` / `createCrmNotification`.
- Logs de decisão (campo `reasoning` em cada classificação).

## Explicitamente descartado (over-engineering pro estágio atual)

Não existe N8N, Evolution API, Redis, filas, workers ou máquina de estados formal neste projeto — só Next.js (Vercel serverless) + Supabase + Anthropic. Várias sugestões de "arquitetura enterprise" (watchdog separado, dead letter queue, cadeia de 4 agentes IA, circuit breaker) foram descartadas por não se justificarem no volume atual (uma conta, dezenas de conversas). Revisitar só se o volume real justificar.

## Checklist de observação pros próximos dias (ainda não testado ao vivo)

- [ ] Dois clientes respondendo ao mesmo tempo (concorrência real, não só mensagens rápidas do mesmo lead)
- [ ] Conversa longa (20-30 mensagens) — degradação de contexto
- [ ] Mensagem de áudio
- [ ] Várias mensagens curtas em sequência ("Sim", "Tenho", "Isso")
- [ ] Cliente demora minutos/horas pra responder
- [ ] Mudança de assunto no meio da qualificação (ex: "Quanto custa?" de repente)

## Regra de processo (reforçada, já valia antes)

Não alterar `system_prompt.txt` / `contact-classifier.ts` / `sdr-engine.ts` de novo sem evidência concreta de um novo caso de falha — deixar rodar e observar antes de qualquer novo ajuste.
