# 2026-07-06 — Rebrand institucional: Sety Studio como empresa de Sistemas Comerciais Inteligentes com IA

## O que mudou

O site institucional (landing pública em `saidas/sety-vision-next`, rota `/`) foi reescrito por completo a partir de um briefing de UX/produto. Reverte o posicionamento de e-commerce esportivo (decisão de [[2026-07-03-sety-vision-ecommerce-esportivo-carrinho-abandonado]]) para o posicionamento "empresa de tecnologia que implanta Sistemas Comerciais Inteligentes com IA" — alinhado ao [[project_coo_framework]] já registrado.

**Marca:** Navbar/Footer/CTA trocados de "Sety Vision" para "Sety Studio" — a landing pública vende como Sety Studio (a empresa), não como o produto. Sety Vision continua sendo o nome do sistema/produto entregue por dentro (dashboard interno em `/painel`, `/crm` etc. não foi tocado).

**Cor:** roxo principal trocado de `#7C3AED` para `#6C4BFF` (hex e rgba) em todos os componentes de `app/components/landing/*` e em `lib/tokens.ts` / `app/globals.css`. As páginas internas do dashboard (`/painel`, `/crm`, `/whatsapp` etc.) **não foram alteradas** — ficaram no roxo antigo, fora do escopo do pedido.

**Seções reescritas/criadas:**
- `Hero.tsx` — headline/subheadline/CTA exatos do briefing ("Transformamos seu WhatsApp em um vendedor disponível 24 horas por dia"), badges (IA Ativa / WhatsApp Oficial / CRM Integrado / Follow-up Inteligente / Atendimento 24h), script do chat mockup trocado de "camisa de time" para atendimento genérico.
- `Problema.tsx` — dores generalizadas (removido "carrinho abandonado" específico de e-commerce).
- `HowItWorks.tsx` — virou o fluxo "Solução" de 7 etapas (mensagem → IA → qualifica → agenda → CRM → follow-up → dashboard), como pedido no briefing.
- `Funcionalidades.tsx` (novo) — grid com as 15 funcionalidades exatas do briefing (IA Humanizada, CRM, Agendamento, Dashboard, Integrações, Relatórios, Histórico, Múltiplos atendentes, Áudios, Mensagens inteligentes, Follow-up automático, Google Agenda, Instagram, Email, API).
- `Pricing.tsx` — 3 planos exatos do briefing: START (R$1.490 implantação + R$297/mês), GROWTH (R$2.490 + R$497/mês), SCALE (R$4.990 + R$997/mês). Plano Enterprise removido (não estava no briefing).
- `Testimonials.tsx` — **os depoimentos anteriores eram inventados** (nomes fictícios como "Carlos Mendes", "Amanda Torres" com métricas de tração como "+2.400 empresas" e "ROI 18x", que nunca existiram — Sety Vision como produto tem 0 clientes pagantes). Trocado por galeria de prints reais de feedback hospedados em `setystudio.com.br/uploads/feedback/feedback-1.jpg` a `feedback-6.jpg` — a mesma biblioteca de prova social real usada pelo SDR bot em `saidas/aurora-ia-crm/src/lib/social-proof-assets.ts` (comentário no código: "verificado ao vivo em 2026-07-06, todas as URLs retornam 200 — nunca inventar case, depoimento ou resultado que não esteja aqui").
- Stats fabricados no Hero ("300+ lojas esportivas", "12.000+ carrinhos recuperados") também removidos — trocados por stats de capacidade do produto (tempo de resposta, disponibilidade, módulos), não de tração/clientes.
- `layout.tsx` — SEO completo adicionado: meta tags, OpenGraph, Twitter card, JSON-LD Organization schema.

## Conflito de preço identificado (não resolvido, flagar antes de divulgar)

O briefing trouxe valores novos (Start R$297/mês, Growth R$497/mês, Scale R$997/mês, implantação R$1.490/2.490/4.990) que **conflitam** com a tabela já validada em [[project_sety_vision_pricing]] (Sety Vision Premium R$6.900+R$1.490/mês) e com a hierarquia de dois níveis em [[project_sety_studio_pacotes]] (entrada = pacotes Sety Studio R$800+, upsell = Sety Vision). Usei os números do briefing por serem a instrução mais recente e explícita, mas **isso precisa de confirmação do Seven antes de virar preço público** — pode ser um novo pacote de entrada (abaixo do Sety Vision Premium) em vez de substituição da tabela validada.

## Why

Briefing explícito do Seven pedindo transformação completa do site, com especificação de identidade, cores, seções, planos e regra explícita de não inventar depoimento.

## How to apply

Antes de publicar a página em produção (`vercel --prod`), confirmar com o Seven: (1) se os novos valores de plano substituem ou complementam a tabela validada existente; (2) se os prints de feedback reais fazem sentido como "Resultados" ou se prefere omitir a seção até ter depoimento de cliente Sety Studio (não Sety Vision) validado.
