---
name: preco-honesto-antes-de-reuniao
description: SDR do aurora-ia-crm passa a responder referência de investimento real antes de conduzir pra reunião, em vez de desviar da pergunta de preço
metadata:
  type: decision
---

# SDR do aurora-ia-crm responde referência de preço honesta antes de conduzir pra reunião (2026-07-14)

## Decisão

Ajustar a 🚨 REGRA DE PRIORIDADE MÁXIMA do `SDR_SYSTEM_PROMPT` (`saidas/aurora-ia-crm/src/lib/sdr-engine.ts`). Não reverte o pivô de 2026-07-12 (venda continua nunca fechando no WhatsApp) — refina o meio-termo: quando o cliente pergunta preço, o bot agora SEMPRE responde com uma faixa/referência real de investimento (nunca o pacote fechado completo) antes de convidar pra reunião, em vez de desviar direto pra "vamos marcar uma reunião" sem responder nada.

Motivado por Seven revisando prints de um atendimento real: a conversa estava indo bem até o cliente perguntar o valor — nesse ponto o bot (seguindo a regra antiga "nunca número") desviou sem responder, o que soou como estar fugindo da pergunta e quebrou a confiança construída até ali.

## O que mudou em `sdr-engine.ts`

- **Sequência nova de resposta a pedido de preço:** validar a pergunta → dar a referência real de investimento (tabela oficial, nunca invenção) → explicar em 1 frase por que não fecha pacote completo ali → convidar pra reunião assumindo que ela vai acontecer (nunca "quer marcar?") → oferecer dois horários fixos.
- Canal de prospecção fria mantém variação: referência mais genérica (sem faixa exata), resto do fluxo igual.
- 🌡️ Termômetro de lead nomeado explicitamente (frio/morno/quente/urgente) — mesma classificação do ⚡ MODO CLOSER, com categoria nova "urgente" (prazo apertado → oferece o primeiro horário disponível).
- Nota documentando que contato já salvo/equipe nunca recebe automação (já garantido no código antes de chamar o modelo).
- Proibição explícita de afirmar dor não confirmada pelo cliente (ex: "você perde vendas" só se ele mesmo disse isso).
- Depois de enviar o link do painel, o bot pergunta a reação do cliente antes de continuar explicando recursos (antes emendava explicação direto, virando monólogo).
- Regra de variar vocabulário do produto — não repetir "CRM"/"IA"/"automação"/"Máquina de Crescimento" mais de 2x seguidas.
- Checklist final ganhou o item: "essa mensagem faz o cliente falar mais, ou só eu falo mais?".

## Por quê

Desviar de uma pergunta direta de preço, mesmo com boa intenção estratégica (levar pra reunião), é percebido pelo cliente como enrolação e derruba conversão mais do que dar uma faixa honesta e transparente. O objetivo de fundo (fechar sempre na reunião, nunca no chat) não mudou.

## Onde foi aplicado

- `saidas/aurora-ia-crm/src/lib/sdr-engine.ts` — `SDR_SYSTEM_PROMPT`, seção 🚨 REGRA DE PRIORIDADE MÁXIMA e blocos relacionados.
- TypeScript validado (`tsc --noEmit`, sem erro).
- **Deploy pendente**: `vercel --prod` foi bloqueado pelo classificador de permissões do Claude Code (produção sem autorização nomeada explicitamente para esse deploy). Mudança está só no working tree, não commitada nem deployada — Seven precisa rodar o deploy manualmente.
- Memória: `project_aurora_maquina_crescimento` (auto-memory do Claude Code) — ver também [[sdr-consultivo-catalogo-completo]] no histórico de decisões desse mesmo motor.
