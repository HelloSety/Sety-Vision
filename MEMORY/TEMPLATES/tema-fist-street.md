---
name: tema-fist-street
description: Design system extraído do Fist Street (streetwear, Shopify, tema custom próprio) — cliente real da Sety, um dos 4 temas-mestre da biblioteca Theme Engine
metadata:
  type: project
---

# Tema: Fist Street

Site: https://usefist.com.br/ — **cliente real da Sety Studio** (ver [[project_cliente_fist_street]]). Plataforma: **Shopify, tema customizado próprio** (CSS 100% autoral, não é Dawn nem tema de terceiro).

Um dos 4 temas-mestre replicáveis da biblioteca. Ver hub em [[theme-engine-biblioteca]].

## Cores (hex exatos, de `:root` em theme.css)

| Variável | Hex | Uso |
|---|---|---|
| `--preto` | `#0a0a0a` | Background principal |
| `--preto-suave` | `#151515` | Cards, painéis (cart drawer) |
| `--preto-elevado` | `#1e1e1e` | Inputs, hover states |
| `--verde` | `#39ff14` | **Accent/CTA principal** (verde neon) |
| `--verde-escuro` | `#2bcf0f` | Gradiente do botão (início) |
| `--verde-profundo` | `#0a3d16` | Gradiente do botão (fim) |
| `--verde-suave` | `rgba(57,255,20,.1)` | Backgrounds sutis com tint verde |
| `--branco` | `#ffffff` | Texto primário |
| `--cinza` | `#9a9a9a` | Texto secundário, preço riscado |
| `--cinza-claro` | `#cfcfcf` | Texto terciário/menu |
| `--borda` | `#262626` | Bordas/divisores |
| Badge | fundo `--verde`, texto `--preto` | "OFF"/etiqueta |
| WhatsApp float | `#25d366` | Botão flutuante |

## Tipografia (confirmado via `getComputedStyle`)

- **Headings** (h1, h2, h3, `.logo-wordmark`): `Anton, Inter, sans-serif` — itálico, `letter-spacing: 0.5px`, uppercase.
- **Body/preço/botões/menu**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, pesos 400/600/700/800/900.
- H1 produto: 30px, weight 400 (Anton já é bold-ish), uppercase.
- H2 home: 30px, weight 400, itálico, uppercase.
- Body: 16px, weight 400.
- `.btn-primary`: 12px, weight 800, uppercase, letter-spacing 0.3px.
- `.price-now` card: 17px/900; na página de produto: 30px.
- Nome produto no card: 13px, weight 700, **sem uppercase**.
- Nav: 12px, weight 700, uppercase, letter-spacing 0.4px, cor `--cinza-claro`, hover vira `--verde`.

**Contraste tipográfico intencional**: Anton itálico condensado (headings, agressivo/streetwear) vs Inter limpo (corpo/preço) — evita a armadilha de usar fonte "gritante" no texto todo.

## Estrutura da home (ordem)

1. Topbar: "FRETE GRÁTIS acima de R$299"
2. Header sticky com blur (`backdrop-filter: blur(10px)`, background `#0a0a0aeb`)
3. Hero (`aspect-ratio: 3/1`, hover com transform)
4. "Encontre sua Categoria" (6 cards)
5. "Bermudas — OS PRODUTOS MAIS RYPADOS" (grid 4 produtos)
6. 2 banners promocionais (slider com dots/autoplay)
7. "Conjuntos" (grid 4 produtos)
8. Seção de benefícios (4 features)
9. "O que é a Fist Street" (institucional/founder)
10. FAQ
11. Footer

## Componentes

- **Header**: sticky (`position: sticky; top:0; z-index:100`) com blur de fundo, grid 3 colunas (busca | logo | ícones). Busca em pill rounded (`border-radius: 999px`). Badge de carrinho circular verde.
- **Galeria de produto**: imagem principal `aspect-ratio: 4/5` + tira de miniaturas vertical à esquerda (78px, borda verde no ativo). Mobile: horizontal abaixo da imagem. Clique troca `src` via JS, sem zoom.
- **Seletor de tamanho**: grade de botões quadrados 52×52px, `border-radius: 14px`, ativo = fundo verde neon + texto preto, indisponível = riscado/opaco. Sem seletor de cor nos produtos analisados.
- **Botão de compra**: "Comprar", gradiente verde (`linear-gradient(90deg, #0a3d16, #39ff14)`), texto branco, uppercase, `border-radius:10px`, `flex:1` ao lado do stepper.
- **Link WhatsApp**: "Prefere comprar direto pelo WhatsApp?" abaixo do botão, `wa.me` com produto pré-preenchido.
- **Descrição**: texto corrido com h2/h3 + lista de "Diferenciais", sem abas/accordion.
- **Trust list**: checklist com ✓ verde (produto original, envio, troca grátis, pagamento seguro).
- **Relacionados**: "Você também pode **gostar**" (palavra em destaque), grid após o form.
- **Reviews**: não tem.
- **Breadcrumb**: sim.
- **Carrinho**: drawer lateral direito, 420px, `translate(100%)→translate(0)`, overlay `#000000b3`. Item: imagem 64×64, nome, tamanho em verde, stepper, preço, "remover" sublinhado. Footer: Total + "Finalizar Compra". **Sem cupom/frete estimado no drawer**.
- **Checkout**: nativo Shopify (`/checkout`), fora do controle do tema/liquid — customizável só via branding no admin.

## Grid / Container

- `.container { max-width: 1280px; padding: 0 24px }`.
- Grid de produto: 4 colunas desktop.
- `border-radius`: 10–14px (mais arredondado que o Underz).

## O que faz parecer caro/profissional

1. **Verde neon `#39ff14` sobre preto puro `#0a0a0a`** como única cor de destaque — contraste de altíssimo impacto, aplicado só em CTA/preço/hover/badge, nunca em blocos grandes.
2. **Header com glassmorphism** (`backdrop-filter: blur(10px)`) — detalhe que só tema customizado tem, tema padrão não.
3. Tipografia com contraste forte (display condensado vs sans limpo) em vez de uma fonte só pra tudo.

## Quando usar este tema

Marca com personalidade forte/agressiva (streetwear, esporte urbano, público jovem masculino) que quer se diferenciar visualmente — a fórmula "1 cor neon + fundo quase-preto + display font condensada" é fácil de adaptar trocando só o hue da cor de destaque (mantendo neon/saturada) e a família do heading.

## Fonte

Extraído por agente via WebFetch + Playwright (`getComputedStyle`) em 2026-07-31. Cliente real, contato/histórico completo em [[project_cliente_fist_street]].
