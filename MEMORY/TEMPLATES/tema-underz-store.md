---
name: tema-underz-store
description: Design system extraído do Underz Store (streetwear, Tiendanube/Nuvemshop) — um dos 4 temas-mestre da biblioteca Theme Engine da Sety Studio
metadata:
  type: project
---

# Tema: Underz Store

Referência de mercado (não é cliente da Sety), site: https://loja.underzstore.com/ — **Plataforma: Tiendanube/Nuvemshop** (tema "Flex/Dart").

Um dos 4 temas-mestre replicáveis da biblioteca. Ver hub em [[theme-engine-biblioteca]].

## Cores (hex exatos, extraídos de `:root` no CSS)

| Uso | Hex |
|---|---|
| Background principal | `#ffffff` |
| Texto principal | `#151515` |
| Primary/Secondary | `#151515` / `#000000` |
| Accent (badges, overlay banner) | `#e74c3c` (vermelho) |
| Botão CTA background/texto | `#000000` / `#ffffff` |
| Header desktop background/texto | `#000000` / `#ffffff` |
| **Cor de destaque real da marca** (nav hover, adbar, footer ícones) | `#f1c40f` (amarelo-dourado) |
| Label/etiqueta background | `#f39c12` (laranja) |
| Sale/badge OFF | fundo `#eeeeee`, texto `#181818` |
| Newsletter background/botão | fundo `#000000`, botão `#f1c40f` |
| Footer background/texto | `#000000` / `#ffffff` |
| Success / Danger / Warning | `#4bb98c` / `#dd7774` / `#dc8f38` |
| Search box background | `#f5f5f5` |

## Tipografia (confirmado via `getComputedStyle`)

- **Família única em todo o site**: `Sora, sans-serif` (Google Fonts, pesos 400/700) — headings, body, botões, preço usam a mesma fonte, variando só peso/tamanho.
- H1/produto: 28px, weight 500.
- H2: 28px, weight 700 (`--h2: 1.75rem`).
- Body: 15px, weight 400, cor `#151515`.
- Preço produto: ~28.8px, weight 700.
- Botão: 14px, weight 400, **sem uppercase** (`text-transform: none`).
- Escala por variável CSS: `--h1: 1.75rem`, `--h1-huge-md: 2.5rem`, steps de 11px a 48px.

## Estrutura da home (ordem)

1. Topbar/anúncio: "10% Descontos no PIX | Frete Grátis em compras R$150 | Parcele em até 12x"
2. Header (logo + menu horizontal + busca + carrinho)
3. Hero/carrossel de banners
4. "Os mais desejados" (grid de produtos)
5. "Coleção Streetwear" (grid)
6. "Promoções" (grid com desconto)
7. Footer (redes sociais + newsletter)

## Componentes

- **Header**: fixo, background preto `#000000` dedicado (diferente do resto do site), menu horizontal por categoria, busca com background `#f5f5f5`, ícone de carrinho com contador "(0 produtos) R$0,00".
- **Galeria de produto**: carrossel Swiper principal + tira de miniaturas verticais à esquerda (desktop), proporção 2:3 retrato (`padding-bottom:150%`). Sem zoom.
- **Seletor de tamanho**: pills/bullets redondos (`.btn-variant.bullet-variation`), não é dropdown.
- **Botão de compra**: "Comprar", full-width, preto/branco, stepper de quantidade ao lado.
- **Preço**: "de" riscado + "por" em destaque + parcelamento 12x + desconto Pix calculado.
- **Descrição**: bloco simples, sem abas/accordion (só a calculadora de frete usa accordion).
- **Calculadora de frete por CEP**: accordion "Meios de envio" na própria página de produto — recurso nativo Tiendanube.
- **Relacionados**: seção "produtos relacionados", 3 itens em slider, no fim da página.
- **Reviews**: não tem.
- **Breadcrumb**: sim (Início > Categoria > Produto).
- **Carrinho**: painel lateral direito (drawer, `modal-right modal-docked-md transition-slide`). Mostra: itens, barra de progresso de frete grátis ("Faltam R$X para ganhar frete grátis!"), subtotal, calculadora de frete por CEP embutida, botão "Finalizar Compra". Sem campo de cupom no drawer.
- **Checkout**: nativo Tiendanube (`/comprar/`), mesmo domínio da loja, fora do controle do tema.

## Grid / Container

- `--container-width: 1200px`, `--container-width-max: 1300px`.
- Grid de produtos: `--column-custom: 20%` → 5 colunas desktop.
- `border-radius: 6px` padrão nos componentes; imagem de produto `border-radius-item-image: 14px`.

## O que faz parecer caro/profissional

1. Calculadora de frete por CEP embutida na página de produto E no carrinho — reduz fricção, parece loja grande.
2. Barra de progresso de frete grátis no carrinho — gamificação de ticket médio, detalhe que loja amadora não implementa.
3. Paleta disciplinada: 1 única cor de destaque (`#f1c40f`) usada com moderação (ícones/hover/CTA newsletter) — evita poluição visual.

## Complemento (2ª extração, cross-check com Lulu Imports)

- Mesmo tema-base Tiendanube "Flex" do [[tema-lulu-imports]] — confirma ser tema popular no nicho streetwear BR. Herda o mesmo bug de `object-fit: fill` nas imagens de produto (ver nota no tema Lulu — trocar para `cover` ao clonar).
- Pré-header extra acima da topbar: contatos diretos (WhatsApp, telefone, e-mail).
- Navegação por categoria bem granular no menu: Bonés, Camisetas, Bermudas, Calças, Moletom/Jaquetas, Tênis, Bags, Carteiras, Regatas, Meias, Cintos, Toucas, Buckets.
- Marcas desejadas (Supreme, Patagonia, Anth Co.) exibidas como "coleções" — reforça aspiracionalidade sem precisar declarar "somos revenda/réplica".
- Grid de produto mais denso que o Lulu: 4 colunas desktop (vs. carrossel ~5 do Lulu), card 216×288px — imagem menor prejudica um pouco a percepção de qualidade da peça.

## Quando usar este tema

Nicho streetwear/moda urbana geral, quando o cliente não tem uma identidade de marca muito forte pré-definida — a paleta neutra (preto/branco + 1 accent) se adapta fácil a qualquer cor de marca trocando só a variável de accent.

## Fonte

Extraído por agente via WebFetch + Playwright (`getComputedStyle`) em 2026-07-31.
