# Bot do WhatsApp duplicado — uazapi-agent é o canônico, não aurora-ia-crm

## Contexto

Existem dois motores de atendimento de WhatsApp no repositório, ambos configurados pro mesmo número (`UAZAPI_BASE_URL=https://setystudio.uazapi.com`):

- **`saidas/uazapi-agent/`** (Python/Flask/Gemini 2.5 Flash) — **é o bot que está de fato respondendo no WhatsApp da Sety hoje.** Confirmado com o Seven em 2026-07-03. A SOP (`MEMORY/PLAYBOOKS/sop-vendas.md`) já apontava `system_prompt.txt` como "fonte canônica do discurso do bot".
- **`saidas/aurora-ia-crm/`** (Next.js/TypeScript/Claude + Supabase) — painel de CRM completo com motor de SDR próprio (`src/lib/sdr-engine.ts`), mas **não é o webhook ativo agora**. Commit mais recente de 2026-07-01, enquanto o `uazapi-agent` foi editado no mesmo dia desta decisão.

## Por que importa

Uma sessão de correção de bug (repetição de pergunta — "qual o segmento?" depois do cliente já ter dito "camisas de time") quase foi aplicada só no `aurora-ia-crm`, que não estava em produção. Antes de editar qualquer motor de vendas, **confirmar qual está registrado como webhook ativo na UAZAPI** — não assumir pelo nome do projeto mais "bonito" ou mais recente no CRM.

## O que foi corrigido no `uazapi-agent` (bot real)

1. **Bug crítico de infraestrutura** — `memory.py` guardava o histórico de conversa só em RAM (dict Python). Qualquer restart do processo (deploy, crash, sleep de free-tier) apagava a memória de todas as conversas ativas — provável causa raiz do esquecimento relatado. Corrigido: histórico agora persiste em `conversations.json` (write-through, load no boot). Arquivo está no `.gitignore` do projeto (contém dados de clientes).
2. **Reforço no `system_prompt.txt`**: checklist explícito de releitura do histórico antes de responder, confirmar escopo antes de cotar preço, reconhecer o que o cliente disse antes de emendar a próxima pergunta, sempre fechar a resposta com um próximo passo concreto.

## Também ajustado no `aurora-ia-crm/src/lib/sdr-engine.ts` (mesmo que não seja o bot ativo agora)

Extração de fatos estruturados (segmento, plataforma, serviço, quantidade, orçamento) gravados em `lead.notes` como JSON e injetados como "DADOS JÁ CONFIRMADOS" no prompt, remoção do corte duplo de histórico (`.slice(-6)` sobre um array já limitado a 10), status do funil que nunca regride. Vale a pena manter atualizado caso esse projeto volte a ser o webhook ativo no futuro, mas não é prioridade enquanto o `uazapi-agent` for o canônico.

## Rodadas seguintes de refinamento (mesmo dia)

O Seven trouxe mais 3 rodadas de "prompts gigantes" gerados por outra IA analisando prints do atendimento. Padrão que se repetiu: 80% do conteúdo já estava coberto pelas rodadas anteriores, e cada rodada trazia 1-3 itens genuinamente novos misturados com 1-2 itens que contrariavam decisões já tomadas (sugestão de responder por áudio — rejeitada 3x, `uazapi.py` só tem `send_text`; gírias tipo "Show!"/"Ficou top." — contraria o tom calibrado pra ticket alto). Itens novos aplicados: responder à intenção por trás da pergunta (não só a mensagem literal), parar de qualificar quando o cliente sinaliza que quer fechar, nunca mais que 2 mensagens seguidas por resposta (fix em `app.py::split_reply`, capped em `MAX_MESSAGES = 2`).

Item rejeitado por não fazer sentido como texto de prompt: "autoavaliação de 0-10 em 8 critérios, reescrever se nota <9" — sem um loop de código real (gerar → criticar → regenerar), isso não força nada, só infla o prompt. Se quiser esse tipo de gate de qualidade de verdade, precisa ser implementado em código (custa 2-3x mais chamadas de API por mensagem).

Ideia registrada mas não implementada: "aprendizado contínuo" a partir de correções manuais do Seven — feature nova (não prompt tweak), precisa de mecanismo pra capturar as correções e um banco de exemplos aprovados injetados como few-shot. Escopar em sessão própria se for adiante.

## Regra permanente

Antes de investigar bug de comportamento do "bot do WhatsApp da Sety", sempre confirmar primeiro qual arquivo é o webhook ativo (perguntar ou checar a config da UAZAPI) — não assumir pelo projeto mais recente ou mais completo.
