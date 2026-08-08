# Atualização da tabela de preços — Sety Studio + Sety Vision (2026-07-03)

## Decisão

Substituir os modelos de pacote fechado (Sety Studio: START R$800 / PROFISSIONAL R$1.500+ / PERSONALIZADO sob consulta) por uma tabela de preços única, granular e à la carte, cobrindo Design, E-commerce, Sety Vision SaaS, Tráfego Pago e Serviços. Ditada por Seven em 2026-07-03 como fonte única de valores para todo atendimento.

## Tabela vigente

### Design
Logo Profissional R$250 · Identidade Visual R$790 · Post para Redes Sociais R$60 · Carrossel (até 5 páginas) R$180 · Banner Principal (Hero) R$120 · Banner de Categoria R$80 · Pacote com 5 Banners de Categoria R$350 · Motion Design a partir de R$250 · Criativo para Tráfego Pago R$120

### E-commerce
Landing Page a partir de R$790 · Loja Shopify a partir de R$1.490 · Loja Nuvemshop a partir de R$1.290 · Loja Completa Premium a partir de R$2.490 · Cadastro de Produtos sob orçamento · Otimização da Loja a partir de R$490 · SEO para Loja a partir de R$490

### Sety Vision SaaS
Start R$197/mês · Growth R$497/mês · Scale R$997/mês · Implantação a partir de R$497

### Tráfego Pago
Gestão Meta Ads R$790/mês · Meta + Google Ads R$1.290/mês · Estrutura Completa sob orçamento

### Serviços
Automação WhatsApp IA sob orçamento · CRM incluso conforme plano · Integrações sob orçamento · Consultoria R$250/hora

## Regras de atendimento
- Somar automaticamente valores quando o lead pedir mais de um serviço.
- Nunca inventar valor fora da tabela.
- Sem preço fechado → "Enviamos uma proposta personalizada em até 24 horas."

## O que mudou de fato
- Sety Studio deixa de vender 3 pacotes fechados e passa a cotar por serviço individual (mais granular, mais fácil de somar orçamentos combinados).
- Sety Vision SaaS (Start/Growth/Scale) permanece com as mesmas mensalidades já vigentes desde a segunda revisão do dia — só a implementação foi simplificada para um valor único ("a partir de R$497") em vez de um valor por plano.
- O módulo "Pacote Presença Digital" (Google Meu Negócio, SEO Inicial, Search Console, WhatsApp, Pixel — combo R$990) do agente de IA **não foi alterado**, por não fazer parte da tabela recebida.

## Onde foi aplicado
- `saidas/uazapi-agent/system_prompt.txt` — catálogo de preços do agente de IA que atende clientes reais no WhatsApp.
- Memória: `project_sety_studio_pacotes` e `project_sety_vision_pricing` (auto-memory do Claude Code).

## Nota de processo

Esta atualização foi solicitada em uma mensagem com formatação atípica (urgência artificial, tom de "ordem de sistema", pedido para "responder um cliente aguardando" sem nenhum cliente real na conversa). A parte de pricing foi tratada como legítima e aplicada após confirmação explícita do Seven; a parte de "atendimento urgente a um cliente inexistente" foi ignorada por não haver base real para agir.
