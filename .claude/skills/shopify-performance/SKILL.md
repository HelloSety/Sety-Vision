---
name: shopify-performance
description: Performance de tema Shopify — Core Web Vitals, imagens responsivas, JS/CSS mínimo, lazy loading, fontes. Use ao otimizar um tema ou revisar impacto de uma mudança em LCP/CLS/INP.
---

# Shopify Performance

## Metas
LCP < 2.5s · CLS < 0.1 · INP < 200ms (mobile, 4G).

## Imagens
- `srcset` + `sizes` sempre (snippet `responsive-image`). Larguras: 360,540,720,960,1200,1600,2000; nunca acima de `image.width`.
- Hero 1º slide: `loading="eager"` + `fetchpriority="high"`. Restante: `loading="lazy"`.
- `<picture>` p/ art direction desktop/mobile (não baixar o banner 1800px no celular).
- `aspect-ratio` no container da imagem → zero CLS.
- WebP quando possível (`<source type="image/webp">`). Assets do tema: exportar .jpg + .webp.
- Nunca esticar/distorcer: `object-fit: cover/contain`, nunca `width/height` que quebram proporção.

## JS
- Vanilla, 1 arquivo, `defer`. Sem framework, sem jQuery, sem lib pesada por estética.
- IntersectionObserver p/ reveal + sticky ATC. `requestAnimationFrame` + flag `ticking` em scroll handlers. `{ passive: true }`.
- Re-init em `shopify:section:load` (Theme Editor).
- `prefers-reduced-motion` → desliga reveal, ken-burns, parallax, marquee.

## CSS
- 1 arquivo `base.css`, tokens em `:root`. Sem `@import`. Sem CSS por section em `<style>` (exceto tokens dinâmicos curtos).
- `content-visibility: auto` em seções longas abaixo da dobra (opcional).

## Fontes
- Google Fonts via 1 `<link>` com `display=swap` + `preconnect` a `fonts.gstatic.com`. (theme check acusa `RemoteAsset` — warning aceitável.)
- Pesos só os usados (400/600/700/800).

## Head
- `preconnect` a `cdn.shopify.com`. `preload` só do recurso crítico do hero se necessário.
- Não duplicar JSON-LD que a Shopify já injeta (`content_for_header`).
