# Feature: suporte a imagem (visão) + failsafe no bot do WhatsApp (aurora-ia-crm)

**Data:** 2026-07-04
**Gatilho:** Seven pediu análise de imagem no SDR (cliente mandou uma arte/print e o bot ignorava) + camada de resiliência pra nunca deixar o cliente sem resposta em caso de falha técnica.

## O que mudou

- `src/app/api/webhook/whatsapp/route.ts`: filtro de tipo de mensagem passou a aceitar `image` (antes só `text`/`audio`). `downloadMedia` generalizado (aceita mimetype/label como parâmetro, antes era hardcoded pra áudio) e reaproveitado pra baixar imagem via UAZAPI (`/send/download-media`). Falha no download/exceção → nunca propaga erro técnico, envia mensagem de failsafe pedindo reenvio (mesmo padrão que já existia pro áudio) e encerra o evento.
- `src/lib/sdr-engine.ts`: `generateSdrResponse` ganhou parâmetro opcional `image` (`{ base64, mimeType }`). Quando presente, o turno atual vira uma mensagem multimodal pro Claude (bloco de imagem + texto) — **não usa OCR nem Gemini**, o Claude (`claude-haiku-4-5`) já enxerga a imagem nativamente. Histórico de conversas continua só texto (mensagens antigas guardam `"[Imagem] <legenda>"` como placeholder, a imagem em si só vai pro Claude no turno em que chegou).
- Prompt (`SDR_SYSTEM_PROMPT`): acrescentado parágrafo curto de instrução — nunca dizer "não consigo ver imagens", interpretar naturalmente (print, referência, logo, produto), nunca prometer cópia exata de referência, pedir reenvio só se ilegível.

## Por que não implementei o prompt gigante de "Failsafe Mode" que o Seven colou

O padrão de resiliência (nunca expor erro técnico ao cliente, sempre ter fallback, nunca duplicar resposta) **já existia em código** pro áudio (função `requestTextFallback`) — copiei exatamente esse padrão pra imagem em vez de confiar num bloco de prompt gigante pedindo pro LLM "nunca mencionar erro". Código determinístico > instrução de prompt pra esse tipo de garantia. PDF/documento/link citados no pedido do Seven **não foram implementados** — não existe infra de leitura de arquivo/link no projeto hoje; ficaria pra um pedido futuro se ele quiser essa camada.

## Atenção — exceção a uma regra de processo anterior

Havia uma regra registrada em `2026-07-03-bug-critico-bot-whatsapp-silencio-e-duplicacao.md`: não alterar `sdr-engine.ts` de novo sem evidência concreta de falha nova. Essa mudança de hoje é uma **feature nova explicitamente pedida na conversa** (não um ajuste especulativo de heurística de score/classificação), então tratei como exceção válida à regra. Reforça: o próprio Seven já colocou "testar texto, áudio e imagem em produção" como prioridade de amanhã (2026-07-05) — ainda não testado ao vivo.

## Checklist pra amanhã (2026-07-05)

- [ ] Testar envio real de imagem (foto de produto, print de erro, referência de design) em produção
- [ ] Confirmar que o Claude recebe e comenta a imagem corretamente (mimetype normalizado pra jpeg/png/gif/webp)
- [ ] Confirmar failsafe: simular falha de download (ex: token errado temporariamente) e ver se a mensagem de fallback dispara sem expor erro técnico
- [ ] `tsc --noEmit` já rodou limpo nesta sessão — sem erro de tipagem
