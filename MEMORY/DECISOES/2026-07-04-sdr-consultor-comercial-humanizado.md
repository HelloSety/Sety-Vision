# Mudança de filosofia do SDR — de "atendente" para "consultor comercial humanizado"

**Data:** 2026-07-04
**Bot afetado:** `saidas/aurora-ia-crm` (confirmado via GET /webhook na UAZAPI como o bot ativo hoje — não confundir com `saidas/uazapi-agent`, que existe no disco mas está dormente)

## Decisão

O agente deixa de operar como um atendente que faz pergunta → pergunta → pergunta, e passa a operar como consultor comercial: reagir antes de perguntar, validar o que o cliente falou, compartilhar opinião/observação real, alternar entre qualificar/educar/gerar confiança, e só fechar quando o lead sinalizar prontidão. **O objetivo não é fingir ser humano — é prestar um atendimento tão útil e natural que a tecnologia por trás vira irrelevante.** Isso é regra permanente: qualquer prompt ou regra futura deve complementar essa personalidade, nunca substituí-la por um estilo mais robótico/formulário.

## O que foi implementado (código, em `saidas/aurora-ia-crm`)

1. **Detecção determinística de pedido de humano** (`contact-classifier.ts`: `HUMAN_HANDOFF_KEYWORDS`, `wantsHumanHandoff()`) — antes só existia transferência por *intenção de compra alta*, nunca por pedido explícito de atendimento humano. Agora é checada antes de qualquer chamada à IA (`sdr-engine.ts`), com resposta determinística fixa (não depende do LLM obedecer).
2. **Pausa real da automação** (`HUMAN_TAKEOVER_TAG = "aguardando humano"`) — quando o cliente pede humano, a tag é aplicada ao lead e `contact-classifier.ts` passa a retornar `ignore` pra esse lead até o Seven remover a tag manualmente pelo CRM. Antes, `shouldNotifyHuman` só notificava o Seven mas o bot continuava respondendo em paralelo.
3. **Delay de digitação escalonado** (`route.ts`, função `typingDelayRange`) — antes era fixo em 1.5-4s (limitado de propósito pelo timeout padrão da função serverless da Vercel). Agora: texto curto 2-5s, médio 5-8s, longo 8-12s, muito longo 10-16s, áudio recebido 15-25s, imagem recebida 12-20s, sempre com jitter aleatório ±2s. Precisou adicionar `export const maxDuration = 60` na rota pra caber esse delay + processamento real.
4. **Score de urgência** (`contact-classifier.ts`: `URGENCY_KEYWORDS`) — "urgente", "pra ontem", "com urgência" etc. agora somam pontos de intenção, o que não acontecia antes.
5. **Sinalização de "modo fechamento"** (`sdr-engine.ts`) — quando `intentScore >= 70`, o contexto passado à IA agora inclui explicitamente `MODO FECHAMENTO: SIM`, em vez de depender do modelo inferir isso só pelo número cru.
6. **Regras novas no prompt**: "um objetivo por resposta" (nunca misturar qualificar + educar + preço na mesma mensagem), leitura emocional (calibrar tom por ansiedade/empolgação/insegurança/frustração), e a "regra de ouro" de reagir/validar/opinar antes de perguntar (a IA agora tem instrução explícita pra comentar e ter opinião, não só responder).

## Bug real encontrado e corrigido (não relacionado ao pedido, mas bloqueava tudo)

Havia uma crase (`` ` ``) solta dentro de um template literal do `sdr-engine.ts` (texto "campo `proxima_acao`"), sobrando de uma sessão anterior não commitada — isso quebrava a compilação TypeScript inteira. **Isso significa que a seção "PRIORIZAÇÃO POR URGÊNCIA DE PRAZO" (SDR v5, já escrita no prompt antes de hoje) nunca deve ter sido de fato deployada com sucesso**, porque o build teria falhado. Rodar `npx tsc --noEmit` sempre antes de considerar qualquer mudança nesse projeto como "pronta" — o `git diff --stat` mostrou centenas de linhas não commitadas acumuladas de sessões anteriores.

## O que já existia e não foi duplicado

O prompt já tinha bastante coisa da mesma família antes de hoje: máximo 2 perguntas seguidas, confirmar antes de seguir, espelhar tom do cliente, emoji máximo 1, nunca usar travessão/frases de atendimento robótico, "reflita antes de responder" no fim do prompt. Não reescrevi essas partes, só adicionei o que era gap real.

## Segunda rodada — divisão em balões (mesmo dia)

- **Resposta longa dividida em até 3 balões** (`route.ts`: `splitIntoBubbles`) — quando a resposta do Claude vem com parágrafos separados (ex: proposta com checklist), cada parágrafo vira uma mensagem separada, com "digitando..." entre elas. Balão de continuação (2º/3º) usa pausa curta (2-5s), não repete a pausa longa de "pensar" do primeiro — é mais realista (pessoa que já formulou o pensamento só termina de digitar) e mais seguro pro timeout da função.
- **`maxDuration` subiu de 60 para 90s** — o pior caso (áudio + resposta longa em 3 balões) podia passar de 80s somando download+transcrição+debounce+Claude+digitação.
- **Não implementado de propósito:** indicadores de presença customizados tipo "🎤 Ouvindo áudio..." ou "🖼️ Analisando imagem..." — o protocolo de presença do WhatsApp não suporta texto livre, só estados fixos (`composing`, `recording`, `paused`, etc). `recording` existe mas foi deliberadamente evitado durante transcrição de áudio recebido, porque mostraria "gravando áudio" pro cliente, sugerindo que o bot vai responder com áudio — o que contraria a regra explícita do prompt de nunca responder por áudio. Manter só `composing`/`paused`.
- **Confirmado que já existia antes de hoje:** o debounce de 4s + `hasNewerClientMessage` (route.ts) já implementa "esperar o cliente terminar de mandar mensagem em sequência antes de responder" — não precisou de mudança nova, só validação de que já cobria o pedido.

## Terceira rodada — mensagens em vários balões curtos + política de áudio (mesmo dia)

- **Balões viram o padrão, não exceção**: prompt agora instrui escrever por padrão em parágrafos curtos (até 2 linhas cada, até 5 parágrafos), um por mensagem — não só pra propostas longas. Pausa entre balões caiu de 2-5s pra 1-3s, batendo com o que o Seven validou manualmente numa conversa real.
- **Nunca tentar resolver a conversa inteira numa resposta** — regra nova no prompt: mandar só a próxima ideia que move a conversa, não antecipar pergunta+objeção+proposta tudo junto.
- **Política de áudio mudou de "transcrever com Gemini, pedir texto só se falhar" pra "nunca transcrever, sempre pedir texto direto"**. Motivo: um caso real (lead Igor/Leonardo) em que a transcrição virou "Fali" (provavelmente "Falei" cortado) e o bot interpretou como "faliu", perguntando se o cliente tinha falido — resposta errada com confiança total. Mensagem fixa nova: "Opa[, nome]! 😄 Me manda por mensagem, por favor? Fica bem mais fácil pra eu te responder certinho." Removido do código: import do `@google/genai`, client Gemini, função `transcribeAudio`, timeout de transcrição, e o parâmetro `fromAudio` no `sdr-engine.ts` (ficou inalcançável já que áudio nunca mais chega até lá). `GEMINI_API_KEY` continua no `.env.local` e `@google/genai` continua no `package.json` — não removi a dependência do pacote pra não mexer no lockfile sem necessidade, mas está sem uso em `src/`.
- Delay de digitação simplificado de volta pra só `"text" | "image"` (áudio nunca chega no ponto que simula digitação, já responde e retorna antes).

## Deploy — 2026-07-05, madrugada

Commitado e enviado pro GitHub (`80f590d..b82b2ff`, 3 commits):
1. `0655dc9` — feat: SDR vira consultor comercial humanizado (as mudanças todas dessa sessão)
2. `26b8c9a` — fix: reverte rename indevido de `aurora-float.tsx` que entrou junto sem querer (já estava staged de sessão anterior)
3. `b82b2ff` — fix: inclui `lead-memory.ts`/`types/index.ts`/`schema.sql` que eu tinha deixado de fora achando que eram mudança não relacionada — na verdade eram **dependência real** do código já commitado (`tryClaimMessage`, tipo `"inadequado"` etc.) — sem isso o build quebrava por completo

**Quase deployei um build quebrado duas vezes seguidas** — só peguei porque testei `git stash` + `npx tsc --noEmit` contra o estado 100% commitado antes do push, em vez de confiar só no typecheck local (que inclui mudanças não commitadas e mascara esse tipo de erro). **Lição permanente: sempre validar o estado commitado isoladamente (stash das mudanças locais) antes de dar push num repo com muita coisa não commitada acumulada.**

Confirmado antes do commit: a tabela `processed_webhook_events` (dedup de webhook) já existia em produção no Supabase — a migração no `schema.sql` era só documentação, não uma mudança pendente de aplicar.

## Pendências / próximos passos

- Confirmar no painel da Vercel se o deploy automático (push → main) disparou e concluiu com sucesso — não tenho acesso à Vercel pra verificar direto.
- Acompanhar a conversa do Leonardo (+55 15 99722-8999, áudio pendente) pra ver o novo fluxo funcionando ao vivo.
- Fila de refinamentos ainda não implementados (chegaram durante o deploy, tratagainst como próxima iteração, não bloquear deploy de novo por eles): "modo espelho" (calibrar tamanho da resposta pelo tamanho da mensagem do cliente, regra 70/30), comemorar pequenas conquistas do cliente, frases de "erro natural" ("pera aí", "na verdade"), memória de detalhes emocionais (não só dados de negócio).
- Auditor/Diretor Comercial (segunda chamada de IA pra nota+reescrita): explicitamente adiado pelo usuário, não implementar sem novo pedido explícito.
- "Auto-aprendizado contínuo sem prompt novo": não é implementável como pedido (LLM não se reescreve sozinho) — se quiser essa direção, a versão real é um relatório periódico de performance por abordagem, com o Seven revisando e aprovando mudança de prompt.

- **Commitar essas mudanças** — hoje está tudo no working tree, não commitado nem deployado. Sem commit + push, nada disso chega no bot que está rodando na Vercel.
- Validar em conversa real se o handoff determinístico e a pausa por tag funcionam como esperado.
- Considerar mover a lista de keywords de handoff/urgência pra um lugar mais fácil de editar sem mexer em código (hoje é array hardcoded).

Ver também: [[feedback_sdr_qualificacao_v5]], [[project_bot_whatsapp_canonico]]
