# Sety Vision — Reposicionamento para E-commerce Esportivo (carrinho abandonado como dor-âncora)

**Data:** 2026-07-03

## Decisão

A landing da Sety Vision (`saidas/sety-vision-next`) deixou de vender "IA que automatiza WhatsApp, CRM e vendas" (mensagem genérica, tecnologia como produto) e passou a vender **recuperação de faturamento perdido em e-commerce esportivo no Shopify/Nuvemshop/dropshipping**, com o carrinho abandonado como dor-âncora do headline.

## Referências usadas

- **DataCrazy** (datacrazy.io) — CRM comercial com planos mensais recorrentes escalonados por volume (Starter/Essential/Pro/Business), WhatsApp API oficial, IA de qualificação. Usado como modelo de estrutura de pricing em 3 tiers com "cobrança mensal recorrente".
- **Cakto** (cakto.com.br) — checkout de infoprodutos com upsell/order bump/recorrência/afiliados. Usado como inspiração de features de monetização pós-compra (upsell automatizado), não como modelo de cobrança (Cakto cobra por transação; Sety Vision mantém implementação + mensalidade).

## O que mudou no produto/copy

- **Hero:** headline agora pergunta "Quantos carrinhos abandonados sua loja perde por semana?" em vez de descrever a tecnologia. Subcopy foca em recuperação de carrinho + resposta de estoque/tamanho em segundos + recompra automática.
- **Chat demo (dashboard mockup):** trocado de "clínica agendando paciente" para "cliente perguntando tamanho de camisa de time e fechando pedido com frete".
- **Pricing:** de 2 para 3 planos —
  - **Vitrine Ativa** (novo, entrada): implementação R$2.900 + R$590/mês — loja começando no Shopify/Nuvemshop.
  - **Premium** (mantido): R$6.900 + R$1.490/mês — adicionou follow-up automático (1/3/7/15/30 dias), memória do cliente, recuperação de carrinho, rastreio automático.
  - **Premium Growth** (mantido): R$9.900 + R$2.990/mês — adicionou recompra automática programada, coleta automática de avaliações, upsell pós-compra, compatibilidade WooCommerce.
- **Testimonials/FAQ:** depoimentos de clínica trocados por lojas de artigos esportivos/e-commerce; FAQ "funciona pra qualquer negócio" virou "funciona com Shopify/Nuvemshop/dropshipping".

## Why

Feedback do Seven (colado de uma análise de mercado): quem vende IA/chatbot como produto principal compete em commodity. Quem vende "resolver a dor que custa dinheiro todo dia" (carrinho abandonado, atendimento lento, sem follow-up, sem recompra) vende sistema, não tecnologia — e justifica ticket mais alto. Isso alinha com [[project_coo_framework]] (venda-first) porque reposiciona a oferta existente sem exigir nova infra.

## How to apply

- Qualquer novo material de tráfego pago ou conteúdo pra Sety Vision deve liderar com uma dor quantificável (carrinho abandonado, tempo de resposta, recompra) — nunca com "temos IA" como gancho principal.
- Próximas features a priorizar (citadas na análise mas não implementadas ainda): IA que entende intenção do cliente (objeção de preço → cupom, "vou pensar" → agenda follow-up), captura de lead via Instagram Direct, campanha automática pra clientes inativos.
- Deploy já subiu em produção: https://sety-vision-next.vercel.app

## Atualização (mesmo dia, segunda rodada) — pricing revisado pra modelo SaaS de volume

O pricing "Vitrine Ativa/Premium/Premium Growth" acima durou poucas horas. Segundo feedback do Seven: implementação de R$6,9-9,9K é barreira alta demais pra um SaaS que quer crescer via tráfego pago — precisa de ticket de entrada baixo tipo DataCrazy/Stripe.

Pricing final do dia (ver [[project_sety_vision_pricing]] pro detalhe atualizado):
- **START** R$197/mês + R$497 implementação
- **GROWTH** (popular) R$497/mês + R$997 implementação
- **SCALE** R$997/mês + R$1.490 implementação
- **ENTERPRISE** sob consulta

Layout do Pricing.tsx também mudou de 2-3 cards largos (bloco de preço "Implementação + Mensalidade" empilhado) pra 4 cards mais enxutos em grid, com mensalidade em destaque e implementação como nota pequena — visual mais parecido com SaaS self-service, mesmo a venda ainda sendo fechada por WhatsApp/call (não há checkout self-service real ainda).

**Pendência em aberto (não resolvida, escopo grande demais pra uma resposta):** o Seven pediu também um rebrand visual completo (clean tipo Apple/Stripe/Linear/Shopify, menos roxo/gradiente, mais branco/verde/azul) e um conjunto de páginas novas de SEO (/shopify, /nuvemshop, /woocommerce, /dropshipping, /moda, /cosmeticos, /marketplace, /precos, /cases, /blog, /api) com conteúdo otimizado. Isso é trabalho de dias (toca tokens.ts, todas as páginas do dashboard, Navbar, e cria ~10 páginas novas). Perguntado qual priorizar → Seven escolheu **rebrand visual primeiro**.

## Atualização (mesmo dia, terceira rodada) — rebrand visual (fase 1: landing)

Investigação mostrou que Navbar/Footer/CTA/Integracoes já seguiam um padrão bem próximo do pedido (branco, cards com borda fina, CTA preto) — o "excesso de roxo" estava concentrado em 3 pontos específicos, não espalhado pelo site inteiro:

1. **Hero.tsx** — removidos os 6 ícones flutuantes coloridos (WhatsApp/OpenAI/HubSpot/Stripe/N8N/Anthropic, `FLOAT_ICONS`/`FloatingIcon`) que davam uma vibe de "agência de automação" em vez de SaaS sério. Os 3 blobs de glow (roxo/azul/rosa, opacidade 0.28/0.22/0.12) viraram 2 blobs bem mais sutis em verde/azul (opacidade 0.10/0.12). Pill badge e gradiente do headline trocados de roxo pra verde/azul.
2. **CTA.tsx** — gradiente do headline e botão principal eram roxo saturado (`colors.purple` + `shadow.purple`); viraram preto (`colors.text`) com leve gradiente pro verde, consistente com o resto do site.
3. **Pricing.tsx** — o card "Growth" (featured) tinha fundo com banho roxo (`linear-gradient(160deg, #FAF5FF...)`) e botão/checks roxos; virou contorno preto sólido (padrão Linear pra plano em destaque: contraste por borda, não por cor de fundo), checks e ícone do plano em verde.

**O que ficou de propósito sem mexer:** o mockup de dashboard dentro da Hero (tema escuro, mix de roxo/verde/azul/âmbar nos KPIs, avatar/logo em gradiente roxo→azul) — isso é a identidade de marca dentro do produto em si, e um mockup escuro sobre fundo branco é um padrão bem estabelecido em SaaS premium (Linear.app faz exatamente isso). Reduzir a cor ali seria remover identidade visual sem necessidade.

**Pendência real (fase 2, ainda maior):** o dashboard de verdade (`app/(dashboard)/*`, Sidebar, Topbar, 21 páginas) é 100% tema escuro (`bg-[#050505]`, sidebar `#060609`) com roxo como accent primário em todo lugar — isso é um produto interno inteiro, não só 3 arquivos de landing. Reskinar isso pro padrão claro/Stripe/Linear pedido é um projeto à parte (dezenas de arquivos, dashboard inteiro).

## Atualização (mesmo dia, quarta rodada) — rebrand visual fase 2: dashboard inteiro + Centro de Operações

Seven pediu explicitamente pra completar a fase 2 ("Faça o dashboard completo em tema branco") e, no meio do trabalho, mandou uma visão de produto maior: a IA deveria parecer "um funcionário/gerente comercial" (barra de narração ao vivo tipo "Aurora", cards de lead com score/probabilidade, funil CRM, tela dedicada de IA) em vez de só mandar notificação passiva — ideia de "Centro de Operações" / "Command Center".

**O que foi feito nesta rodada:**
- **Chrome compartilhado** (`layout.tsx`, `Sidebar.tsx`, `Topbar.tsx`, `Modal.tsx`) migrado de dark (`bg-[#050505]`/`#060609`/`#111114`, texto branco, bordas `rgba(255,255,255,0.0X)`) pra claro (`#FAFAFA`/branco, texto `#0A0A0A`, bordas `rgba(0,0,0,0.0X)`, accent verde `#16A34A` no lugar de roxo puro nos indicadores de ativo).
- **`/painel` reconstruído** (não só recolorido) incorporando a visão de Centro de Operações: barra **AuroraBar** (IA narrando insights rotativos tipo "Aroldo está online há 2 minutos"), **StatusRow** (pills de IA/WhatsApp/Shopify/Nuvemshop/Meta/Google Ads online), **ActionsNeeded** (lista de ações — lead aguardando resposta, carrinho abandonado, follow-ups, orçamento pendente), KPIs renomeados pra operação de e-commerce (Vendas hoje, Pedidos, Conversas ativas, Leads quentes com badge de urgência), hot leads com probabilidade de fechamento. Mantidos: gráfico de receita, feed de atividade ao vivo, mini-pipeline, meta mensal.
- **Todas as outras 20 páginas** (`whatsapp`, `crm`, `pipeline`, `leads`, `relatorios`, `integracoes`, `automacoes`, `agenda`, `equipe`, `financeiro`, `campanhas`, `ia`, `propostas`, `landing-pages`, `configuracoes`, `notificacoes`, `academia`, `plano-marketing` + `ideias` + `calendario`) reskinadas (paleta apenas, conteúdo/lógica preservados 1:1). `/whatsapp` teve cuidado extra nas bolhas de mensagem (contato/bot/usuário com cores de texto condicionais por papel, já que antes todas usavam texto cinza-claro fixo).
- **`/configuracoes`** — corrigido o mockup da seção "Aparência" que mostrava "Escuro" como tema selecionado (ficaria contraditório com o app agora sendo claro); virou "Claro" selecionado, "Escuro" como opção alternativa.

**Método usado:** como são ~7.700 linhas em 23 arquivos com o mesmo vocabulário de tokens dark (`#0C0C10`/`#111114`/`white/[0.0X]`/`rgba(255,255,255,0.0X)`/`text-white`), cada arquivo foi lido, convertido via `sed` em lote pros padrões seguros (bg/border/muted-text), depois com `grep` pra achar e corrigir manualmente os `text-white` que sobraram — distinguindo os que ficam brancos porque estão sobre fundo colorido (avatares gradiente, botões roxo/verde sólidos) dos que precisavam virar texto escuro (headers/valores em cards agora brancos). Build (`npm run build`) rodado após cada arquivo pra travar erros cedo; deploy em checkpoints a cada 3-5 páginas, não só no final.

**Não implementado nesta rodada (fica pra decisão futura do Seven):** a barra "Aurora" só existe no `/painel`, não é um componente global cross-page; não há funcionalidade real de "IA pensando" com progress bar, timeline de eventos do lead, ou tela dedicada de estatísticas de IA — essas partes da visão de Centro de Operações eram features novas de produto (não cabem em um reskin) e ficaram fora de escopo desta sessão.

**Deploy final:** https://sety-vision-next.vercel.app — build limpo, todas as 21 páginas do dashboard + 3 componentes compartilhados migrados.
