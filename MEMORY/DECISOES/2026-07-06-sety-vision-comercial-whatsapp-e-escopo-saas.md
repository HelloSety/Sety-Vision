# 2026-07-06 — Virada comercial da landing (WhatsApp) + escopo do SaaS multi-tenant adiado

## O que mudou na landing (`saidas/sety-vision-next`)

- **WhatsApp único e centralizado**: `+55 19 98809-0110`. Toda mensagem contextual passa por `lib/whatsapp.ts` (`openWhatsApp(message)` + `WA_MSG.*`) — nenhum link de WhatsApp deve ficar hardcoded em componente.
- Botão flutuante de WhatsApp (`FloatingWhatsApp.tsx`) e 2 CTAs inline estratégicos (`InlineCTA.tsx`) adicionados ao longo da página.
- Seção de dashboard (`LiveResults.tsx`) virou preview de verdade: números com blur + selo "🔒 preview" + botões — não mostra dashboard fake completo.
- Case do "Sobre": **GreenSeg NRS** (https://greensegnrs.com.br/) é o case único em destaque, com screenshot real da home (capturado via Playwright local, salvo em `public/portfolio-greenseg.png`). Empório Belém foi removido a pedido do Seven.
- Integrações (`Integracoes.tsx` e `LogoMarquee.tsx`) curadas para mostrar só ferramentas reais/relevantes ao cliente final (WhatsApp, OpenAI, Claude, Instagram, HubSpot, Shopify, Slack, Stripe, N8N, Zapier, Meta/Google Ads, WooCommerce, Mercado Pago, Calendly, Gmail) — removidos logos de infraestrutura de dev (GitHub, Docker, Vercel, Cloudflare, Figma, Discord, Railway, Trello, Airtable, Typeform) que não fazem sentido pro dono de negócio que é o cliente real.
- Planos mantidos como **Start / Growth / Scale** (não renomeado para Start/Pro/Business) — confirmado explicitamente pelo Seven porque duas mensagens diferentes detalharam valores/recursos com esses nomes; só uma citou Pro/Business de passagem.
- Linguagem técnica (API, n8n, Supabase, webhook) mantida **apenas como logo** na seção de integrações (prova visual) — não deve aparecer como jargão explicativo no texto corrido (headline, cards, "como funciona").

## Decisões adiadas (não executadas)

- **Deploy no Netlify**: o Seven colou um token pessoal (`nfp_...`) em texto puro no chat pedindo deploy automático em `sety-studio-web`. Decisão: **rotacionar o token** (invalidar e gerar um novo) antes de qualquer deploy — não usei o token colado. Vercel (`sety-vision-next.vercel.app`) continua sendo o único ambiente de produção real.
- **Plataforma SaaS multi-tenant completa** (login/RLS/roles, CRM kanban, WhatsApp via Evolution API, financeiro, automações visuais, realtime): pedido pelo Seven na mesma sessão, mas é um projeto de várias semanas — decisão explícita dele de tratar como **projeto separado, com plano de arquitetura aprovado antes de codar**. Nada disso foi iniciado; só o tratamento de "preview" na landing (acima) foi implementado, que já resolve a parte "a home não deve mostrar dashboard completo".
- **QA de responsividade exaustivo** (17+ breakpoints, dispositivos físicos nomeados, Lighthouse 90+): não foi feita verificação device-by-device (sem capacidade de testar em hardware real neste ambiente) — o código já usa Tailwind responsivo (`sm:`/`md:`/`lg:`) na maioria dos componentes, mas não houve auditoria dedicada linha a linha.

## Why

Sessão com volume muito alto de briefings sobrepostos/conflitantes chegando em sequência rápida — resolvido priorizando o que era landing-page-scoped (CTAs de WhatsApp, curadoria de integrações, case real) e explicitamente adiando o que exigia decisão do Seven ou escopo de projeto maior.

## How to apply

Antes de prosseguir com qualquer trabalho de backend/SaaS para Sety Vision, iniciar uma conversa dedicada de planejamento de arquitetura (schema multi-tenant, RLS, auth) em vez de tentar encaixar dentro de uma sessão de landing page.
