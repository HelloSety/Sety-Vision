# Bot aurora-ia-crm duplicava respostas — tabela de dedup nunca foi migrada

## Contexto

Seven reportou que o bot voltou a duplicar mensagens (print do WhatsApp: mesma pergunta reformulada enviada 2x, em 20:37, 20:38 e 20:50 do mesmo dia).

## Diagnóstico

1. `GET /webhook` na UAZAPI (token `d53bec2d-...`) confirmou webhook ativo = `https://aurora-ia-crm.vercel.app/api/webhook/whatsapp` — bot canônico é o aurora-ia-crm, não o uazapi-agent (ver [[project_bot_whatsapp_canonico]]).
2. `route.ts` já tem defesas anti-duplicação completas: `tryClaimMessage` (insert com unique constraint em `processed_webhook_events.external_message_id`), debounce de 4s com `hasNewerClientMessage`, e guarda de similaridade (>=0.6) contra a última resposta em <20s.
3. `npx vercel logs <deployment-url>` no horário exato (20:50:03.86) mostrou o erro real: `Erro ao reivindicar messageId (seguindo sem dedup): Could not find the table 'public.processed_webhook_events' in the schema cache` — disparado 2x no mesmo milissegundo, para a mesma mensagem.
4. Causa raiz: a tabela `processed_webhook_events` existe em `saidas/aurora-ia-crm/supabase/schema.sql` (linha 261+) mas **nunca foi de fato criada no Supabase de produção** — `tryClaimMessage` tenta o INSERT, falha com erro genérico (não é `23505` unique_violation), cai no fallback `console.error(...); return true;` e segue processando SEM proteção. Toda vez que a UAZAPI (ou a rede) entrega o evento em duplicata, as duas execuções passam batido e cada uma gera uma resposta diferente da IA (não-determinística) pro mesmo turno.

## Fix

SQL do próprio `schema.sql` colado no SQL Editor do Supabase (dashboard, projeto `skbadhdvziaclxzjskto`) — não tinha token/connection string pra rodar via CLI/Management API, então a migração ficou pro Seven colar manualmente. `CREATE TABLE IF NOT EXISTS` idempotente, sem risco.

## Regra permanente

**Antes de assumir que uma proteção "já está implementada e funcionando" só porque o código existe**, checar os logs de runtime do Vercel (`npx vercel ls` → `npx vercel logs <url> --json`) no horário exato do incidente. O projeto está linkado (`.vercel/project.json` presente) e os deploys são feitos via `vercel --prod` direto do CLI, não por push no GitHub — então **código local pode estar rodando em produção sem nunca ter sido commitado** (`git status` mostrava `route.ts`, `lead-memory.ts`, `sdr-engine.ts` como modificados/não commitados enquanto já estavam ao vivo). Sempre que uma migração de schema.sql é criada, verificar se ela foi de fato aplicada no banco real — schema.sql desatualizado em relação ao banco é uma classe de bug recorrente aqui.

Ver também [[project_bot_whatsapp_canonico]], [[feedback_motor_vendas_sem_autoajuste]].
