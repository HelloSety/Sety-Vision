---
name: shopify-ux
description: UX de e-commerce Shopify — navegação, hierarquia, ritmo de seções, mobile-first, microinterações com propósito. Use ao desenhar/revisar a experiência de uma loja (home, PDP, collection, cart) para parecer marca premium e não template.
---

# Shopify UX — padrão premium

## Ritmo da home (o que funciona)
Hero (arte de campanha, sem texto HTML duplicado) → faixa de valor curta → prova de catálogo (best sellers, 4-8) → navegação editorial (category index numerado, sem imagem) → storytelling (image+text) → mais catálogo (new arrivals) → 2ª editorial → prova social (reviews reais ou nada) → promo → footer.
- Alternar dark/light de propósito. `.color-dark + .color-dark` sem gap duplo.
- `section_spacing` ~96-104px desktop / ~52-60 mobile. Mais que isso vira "vazio de protótipo".
- `section-head` margin-bottom ~1.5-2.25rem, não 3rem+.

## Hero
- Se a arte já tem headline/CTA embutidos → **não** sobrepor `<h1>` HTML. Banner inteiro é 1 link + `<h1 class="visually-hidden">` p/ SEO.
- Altura por `aspect-ratio` que casa com a imagem (banner 3:1 → `aspect-ratio: 3/1`, `max-height` ~720px). Nunca `min-height: 100svh` fixo → gera faixa branca / crop.
- `<picture>` desktop/mobile. Ken-burns 1.06→1 no load. Parallax só desktop, `translate3d` ±16px, off em `prefers-reduced-motion`.

## Header
- Overlay transparente sobre hero escuro (logo light) → sólido no scroll (logo dark, altura -14px, blur+shadow leve).
- Desktop: grid `1fr auto 1fr` (nav esq / logo centro / ações dir). Toggle hamburger `display:none` ≥990.
- Mobile: drawer lateral, targets ≥44px.

## Product card
- `aspect-ratio` consistente (1:1 p/ devices). `object-fit: cover` p/ fotos de marketing (crop tira callouts das bordas); `contain` só p/ pack shot em fundo branco.
- Border 1px sutil > sombra pesada. Hover: swap 2ª imagem + quick-add fade-up (sem layout shift).
- Quick add real: 1 variante → AJAX add + cart drawer; 1 opção multi-variante → popover de variante; 2+ opções → PDP.

## Category index editorial (sem imagem)
`01 / LABEL grande / sub-label / →`. Hover: padding-left desliza, arrow translada, label pega accent. Borda entre linhas. Fundo sólido (dark). Sensação de menu de marca, não grid de fotos.

## Regra de ouro
Cada elemento responde: aumenta percepção de valor / confiança / clareza / conversão? Se não → remove. Movimento existe pra qualidade percebida, não pra distrair.
