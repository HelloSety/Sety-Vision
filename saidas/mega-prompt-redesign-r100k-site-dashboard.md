---
name: mega-prompt-redesign-r100k-site-dashboard
description: Mega prompt para redesign do site institucional + dashboard da Sety Studio/Sety Vision no nível R$100.000, inspirado em respond.io
metadata:
  type: reference
---

# MEGA PROMPT — Sety Studio: Redesign Nível R$100.000 (Site + Dashboard)

> Cole esse prompt inteiro numa sessão do Claude Code (recomendado: modelo **Fable 5** — `claude-fable-5` — pela qualidade superior em criação visual e copywriting) dentro do repositório `MazyOS`, na pasta `saidas/sety-vision-next`.

## Contexto

Projeto: `saidas/sety-vision-next` (Next.js 16, App Router). Deployado em **https://www.setystudio.com.br** e **https://sety-vision-next.vercel.app**.

Esse site É a prova de trabalho da Sety Studio: cada visitante que entra em setystudio.com.br está olhando exatamente o tipo de site que a agência entrega. Ele precisa vender sozinho, sem depender de call. Trate esse projeto como se o cliente tivesse pago R$100.000 por ele — capricho de Stripe/Linear/Vercel na execução (motion, sombras em camada, hierarquia tipográfica, espaçamento), sem perder a objetividade comercial.

## Referências de inspiração

**respond.io** (https://respond.io) — estrutura a copiar (adaptando pro nosso negócio, não copiar texto):
- Hero em formato dor → contraste → solução ("Você atende no chat, liga pra confirmar, confirma por email — dá conta?" → "A Sety unifica tudo").
- CTA duplo persistente no hero e no footer (ex: "Falar com especialista" + "Ver demonstração").
- Prova social em carrossel (logos de parceiros/integrações, já que ainda não temos volume de clientes-logo).
- Pilares do produto em 3 blocos (Capture/Convert/Retain → adaptar para algo como "Atrair / Converter / Fidelizar").
- Vídeo do fundador (~1 min) explicando a missão — é aqui que entra a VSL, ver seção própria abaixo.
- Cases de sucesso com número de impacto (ex: "-60% tempo de resposta", "+42% conversão") — **só usar números reais já catalogados**, nunca inventar.
- Testemunhos de clientes com cargo/empresa.
- Diferenciadores finais em 4 blocos.

**@respond.io no Instagram** — referência de tom visual de conteúdo, adaptar, não copiar.

Nível de polish geral: Linear / Stripe / Vercel — motion sutil, sombras em camada, tipografia com hierarquia clara.

## Design tokens atuais (não inventar novo sistema, evoluir o existente)

Arquivo `lib/tokens.ts`:
- `background/surface`: `#FAFAFA` | `card`: `#FFFFFF` | `ink/text`: `#0F172A`
- `purple` (cor primária): `#7C3AED` (dark `#6D28D9`, light `#8B5CF6`)
- `green` (sucesso): `#22C55E`
- Radius de 8 a 32px, sombras em camadas já definidas em `shadow.*`
- `framer-motion` (`^12.42.0`) já é dependência do projeto — **usar para toda a animação de entrada/scroll**. Não há `lenis` instalado; se quiser smooth scroll, avaliar custo x benefício antes de adicionar dependência nova.

## Regras não negociáveis (histórico do projeto — não violar)

1. **Nunca inventar depoimento, métrica de tração ou case fictício.** `Testimonials.tsx` usa prints reais hospedados em `setystudio.com.br/uploads/feedback/feedback-1.jpg` a `feedback-6.jpg`. Não trocar por texto fabricado.
2. **Preços são os reais validados** em `Pricing.tsx`: Start R$1.490 implantação + R$297/mês, Growth R$2.490 + R$697/mês (mais popular), Scale R$4.990 + R$1.497/mês. Não inventar números novos sem confirmação explícita do Seven.
3. **CTA de WhatsApp sempre para o número real** (`lib/whatsapp.ts` → `WA_NUMBER`).
4. `/painel` e demais rotas do grupo `(dashboard)` usam **dado real via Supabase** em produção. Qualquer print ou demonstração pública deve usar a rota `/demo` (dado fictício por design) — nunca capturar tela do `/painel` real (já rolou incidente de vazar conversa real de lead, ver histórico).

## Escopo 1 — Site institucional (`app/page.tsx` + `app/components/landing/*`)

1. **Hero.tsx** — reforçar abertura no formato dor→contraste→solução, mantendo a mensagem central "WhatsApp vendedor 24h". Adicionar prova imediata acima da dobra (badge/contador de capacidade, não métrica fabricada).
2. **Nova seção VSL** — criar `app/components/landing/VSL.tsx`, inserir logo após o Hero (ou após "Resultados Reais"). Ver seção "VSL" abaixo para spec completa.
3. **LogoMarquee.tsx** — como ainda não há volume de clientes-logo, manter como carrossel de integrações/parceiros reais (Shopify, Nuvemshop, Meta, Google), não fabricar logos de clientes.
4. **Testimonials.tsx** — manter os prints reais, elevar o container (cards com glow sutil, grid mais editorial, sem trocar o conteúdo).
5. **Pricing.tsx** — manter os 3 valores reais, elevar apresentação (destaque maior no "mais popular", comparação lado a lado mais clara, sem alterar os números).
6. **Motion** — usar `framer-motion` para entrada em scroll (stagger + fade/slide) em todas as seções que ainda estão estáticas.
7. **Performance** — rodar build e Lighthouse; garantir Core Web Vitals verdes (imagens via `next/image`, fontes via `next/font` — já em uso, `sem` layout shift).

## Escopo 2 — VSL (Video Sales Letter)

Componente novo, sem vídeo gravado ainda — construir a estrutura pronta pra receber o vídeo real:
- Hook escrito **acima** do player (frase de tensão, não genérica — ex: "Antes de continuar, veja os 90 segundos que já fecharam mais de X reuniões").
- Player central: thumbnail de alto contraste com botão de play grande, aceitar prop de URL (YouTube/Vimeo/mp4) — hoje renderizar com um vídeo placeholder/estado vazio elegante (não quebrado) até o Seven gravar.
- Prova social ao redor do player (reaproveitar badges já existentes de `Funcionalidades.tsx`: IA Ativa, WhatsApp Oficial, CRM Integrado, Atendimento 24h).
- CTA logo abaixo do player, reforçando a ação (WhatsApp real).

## Escopo 3 — Dashboard (`app/(dashboard)/*`)

O dashboard **já passou** por um redesign em 2026-07-12 (sidebar preta `#0B0C0F`, shell flutuante com cantos arredondados de 28px, KPI card "hero" com gradiente, donut de progresso animado, tooltip flutuante no gráfico de receita — ver `MEMORY/PROJETOS/sety-vision-dashboard-dark-sidebar-2026-07.md` antes de mexer, pra não regredir decisões já tomadas). O que falta pra chegar em nível R$100k:

1. **Consolidar tokens**: hoje `Topbar.tsx`, `KPICard.tsx`, `AuroraBar.tsx` e outros usam hex inline (`#FFFFFF`, `#0F172A` etc. direto no `style={}`) em vez de importar de `lib/tokens.ts`. Migrar pra tokens compartilhados sem quebrar a paleta funcional (verde=ok, vermelho=alerta, âmbar=atenção).
2. **Levar o padrão "hero card" e motion pras demais ~19 rotas** do grupo `(dashboard)` (leads, crm, pipeline, propostas, financeiro, whatsapp, ia, automacoes, campanhas, agenda, equipe, relatorios, integracoes, landing-pages, plano-marketing, academia, notificacoes, configuracoes) — hoje o tratamento premium está concentrado em `/painel`; conferir se as demais páginas já herdam o shell (deveriam, via `layout.tsx`) e se os cards internos de cada uma têm o mesmo nível de acabamento (sombra, radius, hover, animação de entrada).
3. **Empty/loading/error states** consistentes em todas as rotas.
4. **Extrair componentes reutilizáveis** que hoje estão inline em `painel/page.tsx` (ex: o donut do `GoalWidget`) para `app/components/dashboard/shared/`, se forem reaproveitados em outra página.
5. Dado real via Supabase **não muda** — é só a camada visual.

## Critério de pronto

- Nenhuma métrica, depoimento ou case fabricado.
- Todos os preços batem com `Pricing.tsx` atual.
- Lighthouse ≥ 90 em Performance/Accessibility/Best Practices/SEO na home.
- Dashboard visualmente consistente em 100% das rotas — nenhuma tela "esquecida" no padrão antigo.
- VSL funcional como estrutura, pronta pra receber o vídeo real do Seven.
- Nenhum deploy em produção (`vercel --prod`) sem aprovação explícita — apresentar antes de publicar.
