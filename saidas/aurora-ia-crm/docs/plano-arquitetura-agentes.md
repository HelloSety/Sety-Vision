# Plano técnico — Aurora IA v2 (motor de vendas com estado, score e follow-up)

Adaptação pro stack real (Next.js serverless na Vercel + Supabase + UAZAPI), não uma arquitetura de microsserviços genérica. Os "agentes" abaixo são módulos TypeScript chamados em sequência dentro do mesmo request do webhook — não serviços separados nem fila de eventos entre eles. Isso é apropriado pro volume atual; revisar se o volume de leads/dia crescer 10-20x.

## 1. Arquitetura geral

```
UAZAPI → POST /api/webhook/whatsapp (já existe)
  → classify (já existe: contact-classifier.ts)
  → lead-state.ts   (NOVO: calcula/valida a próxima etapa)
  → lead-score.ts   (NOVO: calcula pontuação a partir dos fatos já salvos em lead.notes)
  → sdr-engine.ts   (já existe: gera a resposta)
  → uazapi send     (já existe)
  → log em follow_ups se aplicável

Vercel Cron → GET /api/cron/follow-up (NOVO, roda a cada 6h)
  → busca leads elegíveis (stage != FECHADO/PERDIDO, sem resposta há X)
  → gera follow-up (sdr-engine.ts, tema por tempo de silêncio já adicionado hoje)
  → envia via UAZAPI
  → grava em follow_ups (evita duplicar)
```

Nenhum serviço novo, nenhuma fila externa (Upstash/QStash só se o cron sozinho não bastar — não é o caso agora).

## 2. Fases de implementação

- **Fase 1 — Schema:** colunas novas em `leads` (stage, score, last_client_message_at) + tabela `follow_ups`.
- **Fase 2 — Máquina de estados:** `lib/lead-state.ts`, puramente funções, sem infra nova.
- **Fase 3 — Lead score:** `lib/lead-score.ts`, cálculo determinístico a partir do JSON já salvo em `lead.notes` (não precisa de nova coleta de dados).
- **Fase 4 — Follow-up automático:** rota de cron + entrada em `vercel.json`. Única fase que precisa de infra nova de fato.
- **Fase 5 — Proposal engine:** função de template (determinística) que monta o resumo do projeto + valor + pagamento a partir dos fatos do lead — não precisa de outro agente de IA, é string building com os dados que já existem.
- **Fase 6 — Dashboard:** estender as páginas que já existem em `src/app/(dashboard)/` com score/stage/follow-ups pendentes.

Ordem sugerida: 1 → 2 → 3 → 4 → 5 → 6 (cada fase é utilizável isoladamente, não precisa esperar todas prontas).

## 3. Estrutura de banco (Supabase, extensão do `schema.sql` atual)

```sql
alter table public.leads add column if not exists stage text not null default 'NOVO_LEAD'
  check (stage in ('NOVO_LEAD','QUALIFICANDO','NEGOCIANDO','PROPOSTA_ENVIADA','PAGAMENTO_PENDENTE','FECHADO','PERDIDO'));
alter table public.leads add column if not exists score integer not null default 0;
alter table public.leads add column if not exists last_client_message_at timestamptz;

create table if not exists public.follow_ups (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references public.leads(id),
  tier text not null,              -- '24h' | '72h' | '5d' | '7d' | '10d' | '15d' | '21d' | '30d'
  sent_at timestamptz default now(),
  message text not null,
  unique (lead_id, tier)           -- garante que nunca duplica o mesmo tier pro mesmo lead
);
```

## 4. Fluxo de comunicação entre módulos

Chamada de função direta, síncrona, dentro do mesmo request — não há barramento de eventos. `route.ts` já orquestra isso hoje (classify → save → generate → send); os módulos novos entram como mais um passo na mesma sequência.

## 5. Serviços, Workers e Cron Jobs necessários

Só um: `vercel.json`
```json
{ "crons": [{ "path": "/api/cron/follow-up", "schedule": "0 */6 * * *" }] }
```
Nenhum worker separado, nenhuma fila externa.

## 6. APIs e eventos internos

Uma rota nova: `GET /api/cron/follow-up` (protegida por header de cron secret da Vercel). Sem eventos internos — é chamada de função, não pub/sub.

## 7. Máquina de estados completa

`NOVO_LEAD → QUALIFICANDO → NEGOCIANDO → PROPOSTA_ENVIADA → PAGAMENTO_PENDENTE → FECHADO`, com saída pra `PERDIDO` de qualquer etapa. Regra: nunca regride (se já está em NEGOCIANDO, uma resposta não pode voltar pra QUALIFICANDO). Transição calculada a partir de `classification.decision` + se já houve cotação de preço + palavra-chave de confirmação de pagamento — sem chamada extra de IA só pra decidir o estado.

## 8. Critérios de prioridade entre módulos

Não há arbitragem entre agentes concorrentes — é pipeline fixa e determinística (classify → state → score → generate → send). Ordem sempre a mesma, sem decisão de prioridade em runtime.

## 9. Plano de testes

- Replays de conversas reais salvas (ex: a do Juliano) contra `lead-state.ts` pra confirmar que o estado nunca regride.
- Casos de score conhecidos (ex: os pesos do exemplo que você mandou) com resultado esperado fixo.
- Teste do cron: inserir lead de teste com `last_client_message_at` antigo, rodar a rota manualmente, confirmar 1 envio e não duplicar na segunda chamada (unique constraint em `follow_ups`).

## 10. Estimativa de complexidade e ordem

| Fase | Complexidade | Motivo |
|---|---|---|
| 1. Schema | Baixa | SQL direto, sem lógica |
| 2. Máquina de estados | Baixa-média | Funções puras, fácil de testar |
| 3. Lead score | Baixa | Soma de pesos sobre dados já existentes |
| 4. Follow-up cron | Média | Única peça de infra nova (cron + idempotência) |
| 5. Proposal engine | Baixa-média | Template string, reaproveita catálogo já validado |
| 6. Dashboard | Média | Depende de quanto já existe pronto no CRM atual |

Nenhuma fase individual é grande — o motivo de não ter feito "tudo de uma vez" hoje é que cada uma merece sua própria sessão de revisão, já que toca em dado real de lead ativo.
