---
name: tema-lulu-imports
description: Design system extraído do Lulu Imports (tênis importados, Tiendanube/Nuvemshop) — tema PADRÃO PRINCIPAL ("top 1") da biblioteca Theme Engine da Sety Studio
metadata:
  type: project
---

# Tema: Lulu Imports (PADRÃO #1 — top prioridade)

Referência de mercado (não é cliente da Sety), site: https://luluimports.com.br/ — **Plataforma: Tiendanube/Nuvemshop** (tema "Flex", mesmo tema base do Underz Store — ver [[tema-underz-store]]). Nicho: tênis importados/réplicas (Nike, Mizuno, New Balance).

**Este é o tema-mestre principal da biblioteca — o Seven definiu explicitamente como "top 1 pra copiar e colar".** Ver hub em [[theme-engine-biblioteca]].

## Cores (hex exatos, via `getComputedStyle`)

| Uso | Hex |
|---|---|
| Background | `#FFFFFF` |
| Texto | `#000000` |
| **Destaque/CTA (cor de marca)** | `#FED146` (amarelo-ouro) — aplicado com disciplina total: todo botão "Comprar", badge "Frete grátis", em 100% do funil |
| Secundária (header overlay, footer, badge "Esgotado") | `#000000`, texto branco |

## Tipografia

- **Corpo e título de produto**: Montserrat (peso 400/500).
- **Títulos de seção** (ex: "COMPRE POR MODELOS"): Sora 700, uppercase.
- Mistura de 2 sans-serif geométricas, sem serifada. Base 15px.

## Estrutura da home (ordem)

1. Barra de confiança (estoque pronto / envio Brasil / compra segura)
2. Header transparente sobre o hero (`position: absolute`, **não sticky**)
3. Hero em carrossel
4. 4 blocos de diferenciais (envio rápido, PIX, suporte, compra segura)
5. "Compre por modelos" — carrossel de categorias por tênis/marca
6. "Produtos em destaque" — carrossel de cards
7. **FAQ de objeções** ("Lulu Imports é confiável?", "As fotos são reais?")
8. Footer preto com newsletter + 6 colunas de sitemap

## Componentes

- **Cards de produto**: imagem proporção 3:4 (317×422px reais).
- **Seletor de tamanho**: pílulas, `border-radius: 30px`.
- **CTA "Comprar"**: amarelo `#FED146`, uppercase, `border-radius: 6px`.
- **Header**: mega-menu por marca (Nike → Air Max TN/DN/95/97, Vapormax, Jordan; Mizuno → Wave Prophecy 1-15).
- **Ao adicionar ao carrinho**: toast "Adicionado ao carrinho!" com link "Ver carrinho" → abre **modal fullscreen** (não drawer lateral — diferente do padrão Underz/Fist Street).
- **Urgência**: badge "Esgotado", sem contador regressivo.

## O que faz parecer caro/profissional

1. **Uma única cor de destaque aplicada com disciplina total** em todo o funil (CTA, badges, links) — cria hierarquia visual imediata, nada compete com o amarelo.
2. **FAQ de objeções direto na home** ("é confiável?", "fotos são reais?") — antecipa a dúvida nº1 de quem compra importado sem soar defensivo. Tática de conversão de alto valor pro nicho.
3. **Fotografia de produto com proporção 3:4 consistente** em todo o catálogo — dá ar de catálogo profissional/editorial.

## Carrossel de produtos (padrão Sety Studio, nível clean)

Especificação completa em [[padrao-icones-checkout]] — componente 2. Resumo: setas circulares reais nas laterais, cards com sombra sutil, foto em ambiente real (não still de estúdio), nome centralizado em 2 linhas, seletor de tamanho em círculos numerados + badge "+N", linha divisória fina, preço centralizado, CTA "Comprar" dividido em bloco amarelo + quadrado preto com ícone real de sacola, dots de paginação. Este é o padrão de carrossel a replicar em qualquer home/categoria que use este tema.

## Cuidado ao clonar (bug de plataforma, não de design)

- O tema Tiendanube "Flex" usa `object-fit: fill` nas imagens de produto — **estica a imagem** em vez de recortar. Ao replicar, trocar para `object-fit: cover` (com a mesma proporção 3:4) evita distorção quando a foto não vem exatamente no aspect ratio.
- Header `position: absolute` (não sticky) numa página longa (+10.000px) obriga rolar até o topo pra navegar — trocar para sticky ao clonar é uma melhoria, não uma fidelidade que vale manter.

## Quando usar este tema

**Uso padrão/default pra qualquer cliente novo de e-commerce esportivo/streetwear**, salvo pedido explícito de outro tema. A combinação "1 cor de destaque disciplinada + FAQ de objeções + fotografia 3:4 consistente" é a fórmula mais replicável e vendedora da biblioteca.

## Componente de home pronto

`templates/componentes/home-ecommerce.html` — home completa (estrutura Lulu Imports + toques Manto Pro, ver [[2026-08-02-padrao-fixo-unico-mantopro-luluimports]]) pronta pra copiar/colar: barra de anúncio, topbar, header, hero, diferenciais, categorias, carrossel de produtos (padrão descrito acima), banner de coleção, FAQ de objeções, depoimentos, newsletter, footer. Testado desktop + mobile.

## Fonte

Extraído por agente via Playwright (`getComputedStyle`) em 2026-07-31/2026-08-01/2026-08-02.
