# Changelog — Aurora IA (motor de vendas)

Histórico de mudanças em `src/lib/sdr-engine.ts` (o script/prompt de vendas do bot) e na infraestrutura de atendimento (`src/app/api/webhook/whatsapp/route.ts`, `src/lib/lead-memory.ts`). Todo ajuste no motor comercial deve vir com data e racional — não só o "o que", mas o "por quê".

## 2026-07-03

- **Fix crítico:** tabela `processed_webhook_events` não existia no Supabase de produção, fazendo a proteção anti-duplicação falhar silenciosamente. Bot respondia 2x pro mesmo turno sempre que a UAZAPI entregava o evento em duplicata. Corrigido criando a tabela via SQL Editor.
- Adicionada mensalidade de plataforma (Nuvemshop/Shopify) ao script — só mencionar se o cliente demonstrar interesse real.
- Confirmações curtas ("ok", "sim", "beleza") não encerram mais a conversa sozinhas — o bot continua conduzindo até fechamento, recusa clara ou silêncio do cliente.
- Pagamento mudou de Pix integral para 50% na aprovação + 50% na entrega final.
- Canais oficiais (portfólio) passam a ser escolhidos por intenção do cliente (Behance pra design, site pra empresa, Instagram pra trabalhos recentes) em vez de sempre mandar os três.
- Follow-up ganhou orientação de tom por tempo de silêncio (retomar → gerar valor → tratar objeção → reativar), mas o disparo continua manual — não existe cron/scheduler ainda.
- Áudio: tratamento de falha unificado (download, Gemini, timeout, transcrição vazia, exceção) sempre responde com fallback pedindo texto, nunca mais fica em silêncio. Timeouts explícitos (15s download, 20s transcrição). Fallback varia de texto se falhar 2x consecutivas com o mesmo lead.
- Saudação por horário (Bom dia/Boa tarde/Boa noite/Olá) — só na 1ª mensagem ou após 12h+ de silêncio, nunca repetida. Exige horário real (America/Sao_Paulo) injetado no contexto do lead, já que o modelo não tem noção de tempo por conta própria.
- Oferta: recomendar só 1 plano por vez (o mais adequado ao contexto), não despejar START+PROFISSIONAL+PERSONALIZADO juntos.
- Objeções expandidas: "vou falar com meu sócio", "vou pesquisar mais", "tenho outro orçamento", "agora não", etc. — mesmo tratamento (entender motivo, respeitar, não insistir).
- Pagamento: nunca fica só na explicação do Pix — sempre fecha com pergunta de continuidade ("posso já reservar sua vaga?").
- Qualificação: reforçado pular pergunta se o cliente já entregou a informação espontaneamente; exceção estreita à regra de 1 pergunta por vez pra perguntas que formam uma única informação natural (ex: nome da empresa + cidade).
- Loja virtual: padrão passa a ser recomendar PROFISSIONAL (START só se o projeto for bem simples).
- Google Ads ganhou a mesma nota "(verba à parte)" que o Meta Ads já tinha.
- SEO: nunca prometer primeira posição no Google nem garantir resultado — é serviço de médio/longo prazo.
- Serviços sob orçamento (Motion premium, Design, Vídeo, Personalizado, integrações): nunca prometer prazo fixo antes de entender a complexidade real.
- Linguagem de valor: preferir "estrutura/estratégia/performance/conversão/resultado", evitar "barato/simples/básico/fácil/rapidinho".
- Autocheck antes de enviar (REGRA 10): confere se respondeu à pergunta real, resolveu o problema, parece consultor e conduz pro próximo passo.
- Rejeitado: prova social com número inventado ("500 projetos") e múltiplos emojis por mensagem — ambos contrariam regras já validadas (nunca inventar resultado; máximo 1 emoji).
