---
name: tema-esportivo
description: Design system extraído de Vancir Sports e Manto Pro Oficial (camisas de futebol, Shopify) — tema Esportivo/Futebol da biblioteca Theme Engine da Sety Studio
metadata:
  type: project
---

# Tema: Esportivo (Futebol)

Referências de mercado (não são clientes da Sety): https://lojavancirsports.com.br/ e https://mantoprooficial.com.br/ — nicho camisas de futebol (nacionais, internacionais, retrô, seleções).

Um dos 4 temas-mestre replicáveis da biblioteca. Ver hub em [[theme-engine-biblioteca]].

## Achado-chave: os dois rodam a mesma família de tema Shopify BR

Mesmas CSS vars (`--pix-envio-*`, `--wpp_cor*`, `--label-desconto`, `.block-swatch`, `.product-facet`, `.cart-notification`) — Vancir usa `schema_name: "Convert+ Digital Focal"`, MantoPro usa `schema_name: "Tema Vision Nichada"` (origem `aurasports.com.br`). Ambos vêm com PIX nativo, calculadora de frete, WhatsApp e app de tabela de medidas plugados via config de tema — **não é código customizado**. Vale considerar comprar um tema Shopify dessa família pronto (nicho futebol/streetwear BR) como base em vez de codar do zero.

## Vancir Sports — cores exatas

| Uso | Valor |
|---|---|
| Header bg / texto | `#000000` / `#FFFFFF` (borda `#262626`) |
| Botão primário (Adicionar ao carrinho) | `#34B376` (verde institucional), texto branco |
| Botão secundário | `#000000`, texto branco |
| Badge de desconto | fundo `#000000`, texto `#FFFFFF`, uppercase |
| Preço riscado | `#A5A5A5` |
| Social proof ("vendidos") | `#A7A5A5` |
| Sold out | `#DE2B2B` |
| Hover de menu | `#F10808` |
| Fundo geral / seções alternadas | `#FFFFFF` / `#F5F5F5` / `#F1F1F1` |

## Manto Pro — cores exatas

| Uso | Valor |
|---|---|
| Header bg / texto | `#000000` / `#FFFFFF` (mesma base) |
| Botão primário e secundário | `#12FD20` (**verde neon**, mais ousado que Vancir), texto branco |
| Badge de desconto | fundo `#12FD20`, texto `#201F1F`, uppercase |
| On-sale accent | `#333333` |
| Sold out | `#6F719B` |
| Fundo geral | `#FFFFFF` / `#F5F5F5` / `#F1F1F1` |

## Tipografia (ambos)

- `Poppins, sans-serif` para heading **e** body (idêntico nos dois — confirma mesma base de tema).
- Headings de coleção: ~30px desktop / 24px mobile.
- Nav: 13px desktop / 14px mobile.
- Badges: uppercase forçado via CSS.

## Estrutura da home — Vancir Sports

1. Header (**não sticky** — `--enable-sticky-header:0`)
2. Carrossel hero full-width (4 slides)
3. "Lançamentos" — abas Nacionais/Internacionais + carrossel
4. 3 banners de categoria (Times Brasileiros / Internacionais / Seleções)
5. Seção Copa 2026 — banner + carrossel
6. Brasileirão — carrossel de escudos + grid de produtos
7. "Outras Coleções" — 7 tiles
8. Retrô — banner + carrossel de camisas históricas
9. Banner CTA WhatsApp
10. Footer

## Estrutura da home — Manto Pro

1. Barra de anúncio: "10% de Desconto Comprando no Pix"
2. Header (também não-sticky)
3. Hero temático ("BRASILEIRÃO — CAMPEÃO DE TUDO EM 2025!")
4. Carrossel de time em destaque (badges -40% a -60%)
5. "ENCONTRE SEU TIME" — grid de 7 tiles de coleção
6. "VERSÃO JOGADOR" — carrossel
7. "EUROPEU" — carrossel de seleções
8. "SELEÇÕES" — carrossel
9. "MODELOS INFANTIL" — carrossel
10. Barra de benefícios (frete grátis / suporte / cupom 1ª compra / compra segura)
11. **FAQ (6 perguntas)** — Vancir não tem isso
12. **Seção institucional "O que é a Loja"** — Vancir não tem isso
13. Footer

## Componentes

- **Categoria/listagem**: Vancir usa filtro em **drawer lateral esquerdo** (mobile-first); MantoPro usa **sidebar fixa** (`product-facet__aside`, mais "loja grande"/catálogo desktop). Ambos com paginação numerada + "Ordenar por".
- **Galeria de produto**: Vancir = miniaturas **embaixo** (`product--thumbnails-bottom`); MantoPro = miniaturas **na lateral esquerda** (`product--thumbnails-left`, mais editorial/luxo — padrão tipo Farfetch/SSense).
- **Seletor de variante**: `.block-swatch` (pills) em ambos.
- **Botão de compra sticky**: Vancir = "ADICIONAR AO CARRINHO" (maiúsculo); MantoPro = "Adicionar à sacola" (minúsculo, tom boutique — "sacola" em vez de "carrinho").
- **Ao adicionar**: abre `cart-notification--fixed` (drawer/popup) em ambos, não redireciona.
- **Recomendações**: seção `product-recommendations` nativa Shopify em ambos.
- **Footer**: Vancir = atendimento/redes/pagamento (9 ícones)/selo Google Safe Browsing+SSL. MantoPro = 4 colunas incluindo links legais + pagamento (10 ícones) + **selo Reclame Aqui** (extra que a Vancir não tem) + WhatsApp flutuante com ícone próprio.

## Grid / Container

- `max-width: 1200px`, `--grid-gap: 24px` em ambos.
- Vancir: aspect-ratio de imagem ~0.8 (retrato 4:5, consistente).
- MantoPro: aspect-ratio ~0.8–1.0 (menos padronizado).

## O que faz parecer caro/profissional

1. **Segmentação temática forte por ocasião** (Copa 2026, Retrô com jogador nomeado, Seleções, Brasileirão) — cria motivo de compra além do produto genérico, gatilho natural do nicho.
2. **Galeria com thumbnails laterais** (padrão MantoPro) é mais premium/editorial que embaixo.
3. **FAQ + seção institucional na home** (MantoPro) — ponto de conversão que a Vancir não tem, vale sempre incluir.
4. Selos de confiança abundantes (SSL, Google Safe Browsing, Reclame Aqui) — reduz objeção de compra em nicho com histórico de golpe (camisa falsa).

## Checkout padrão Sety Studio (página de produto, nível Manto Pro)

Especificação completa em [[padrao-icones-checkout]] — componente 1. Resumo: barra de anúncio giratória, badges duplos (oferta + qualidade), bloco PIX destacado, seletor de tamanho em pills, hierarquia de 3 CTAs (Adicionar à Sacola / Comprar pelo WhatsApp sólido / Comprar pelo WhatsApp outline), ícones **reais** de bandeira de pagamento e selos de confiança (nunca emoji — ver regra em [[padrao-icones-checkout]]), botão WhatsApp flutuante fixo. Aplicar em toda página de produto entregue com este tema.

**Componente pronto**: `templates/componentes/pagina-produto-checkout.html` — copiar direto, sem recriar do zero.

## Cuidado ao clonar

- Cor de CTA "verde padrão de tema Shopify sem customizar" é uma armadilha comum (visto também no Vancir com `#34B376`) — sempre trocar pela cor de marca do cliente, nunca deixar o verde genérico do tema.
- Console com erros de JS em produção (visto no Vancir) é sinal de app mal configurado — não replicar isso, é falha de implementação, não de design.

## Quando usar este tema

Nicho futebol/camisas de time — a segmentação temática (por time, por seleção, por evento como Copa do Mundo, por linha retrô) é a fórmula de navegação/categorização específica desse nicho, diferente da estrutura mais genérica dos outros 3 temas (Lulu/Underz/Fist Street, focados em streetwear/tênis geral).

## Fonte

Extraído por agente via Playwright (`getComputedStyle`) em 2026-08-01.
