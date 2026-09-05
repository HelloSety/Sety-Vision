---
name: vellarie-tema-shopify-signature-2026-09
description: Reconstrução visual do tema Shopify da Vellarie (V2 "Signature") — dark premium beauty-tech, OS 2.0, com os banners e o logo produzidos pelo Seven; theme check 0 erros; deploy pendente de token Theme Access
metadata:
  type: project
---

# Vellarie — Tema Shopify "Signature" (V2) · 2026-09

**Cliente:** [[vellarie]] · loja Shopify `4zevyg-1g.myshopify.com` / `vellarie.store` · mercado EUA · dropshipping de beleza & grooming (devices de cuidado pessoal).

## O que era o pedido

Seven: reconstruir por completo a experiência visual da loja ("SHOPIFY GRINGA"), premium, internacional, editorial, orientada à conversão — sem cara de Shopify básico / dropshipping genérico. Entregou assets prontos em `D:\sevendsgn\SHOPIFY GRINGA\` (2 campanhas de banner desktop+mobile + prancha de logo PSD).

## Decisão-chave

**Evoluir o tema OS 2.0 que já existia** (`clientes/vellarie/theme/`, 75 arquivos, construído 2026-09-02, nunca publicado) em vez de reconstruir do zero. Ele já era o "tema premium do zero" pedido antes e passava no theme check; faltava alinhá-lo à marca real + preencher lacunas + embutir os assets. Regra da casa: checar template pronto antes de criar do zero; caminho mais rápido de entregar.

Correção de marca: a identidade real é **beleza & grooming / devices**, não "moda feminina Timeless Elegance" (os banners do Seven mostram os produtos do catálogo real). Linguagem visual dos banners = dark, cinematográfico, accent elétrico (azul / verde), headline condensada.

## O que foi entregue

- **Assets** (`theme/assets/` + `clientes/vellarie/assets/`, gerados via Python/PIL): logo light/dark, monograma light/dark, lockup light, favicon (chaveados do PSD 4620×3440 → PNG transparente); `hero-a/b-desktop|mobile.{jpg,webp}`; `cat-grooming|cat-hair.{jpg,webp}`. Header/footer/favicon usam esses bundled como fallback.
- **Preset `Vellarie — Signature`** (default em `settings_data.json`): `#0B0B0C` + accent `#2E9BFF` (`color_accent_dark`) + `#1FBFA8` (`color_accent_alt`), Space Grotesk, radius 4, card fit contain. AVANT e Timeless Elegance mantidos como alternativas.
- **Seções novas:** `marquee`, `testimonials` (rating summary + quotes + slot `@app`; nenhuma review inventada), `promo-banner` (countdown só com data real, some quando expira). **`hero` refeito**: modo "arte com texto embutido" (banner inteiro vira 1 link + `<h1>` oculto p/ SEO), `<picture>` desktop/mobile, Ken-Burns no load + micro-parallax (off no mobile/reduced-motion), dots. `collection-list` e `editorial-split` ganharam fallback de imagem bundled. **`newsletter-popup`** (snippet nativo Shopify, 1x/sessão, delay ou exit-intent, off por default).
- **Config novo em `settings_schema.json`:** `color_accent_dark`, `color_accent_contrast_dark`, `color_accent_alt`, `card_image_fit` (default contain — fotos dropship têm fundo branco), grupo "Newsletter popup". `theme.liquid` ganhou fallback de favicon + classe `fit-contain` + settings do popup no JS. `base.css` +~180 linhas (camada 21 "Signature"). `theme.js` +5 módulos (parallax, skeleton, popup, countdown, dots do hero).
- **Homepage (`templates/index.json`)** recomposta en-US: Hero (2 slides campanha A/B) → Marquee → Trust bar → Best sellers → Category tiles → Brand story → Trending → Editorial → Testimonials → Promo. Blocos de coleção apontam p/ `best-sellers` / `best-offers` reais.

## QA

- `shopify theme check` (roda local, sem auth): **0 erros**, 5 warnings (Google Fonts via CDN — esperado).
- JSON de todos os templates/config/locales + blocos `{% schema %}` validados por script.
- **Preview visual estático** em `clientes/vellarie/preview/index.html` (+ `preview/shots/home-desktop.png` e `home-mobile.png`) — usa o `base.css` real, os banners reais e imagens do catálogo ao vivo. Renderizado a 1440px e 390px.
- Não foi possível preview no Shopify (mesmo bloqueio de sempre — sem token Theme Access).

## Entrega / deploy

- **ZIP pronto:** `clientes/vellarie/vellarie-theme-signature-v1.zip` (95 arquivos, separadores `/`). Upload em *Loja virtual → Temas → Adicionar tema → Upload zip* → entra não publicado.
- OU token Theme Access (`shptka_…`) do Jônatas → `shopify theme push --store 4zevyg-1g.myshopify.com --password <token> --unpublished`.
- Branch git: `vellarie-tema-premium-v2`.

## Pendências (admin, não são do tema)

1. Token Theme Access **ou** upload do zip.
2. Mercado/moeda **USD** (Settings → Markets) — loja está BRL/Brasil.
3. Coleções reais por categoria (Shave & Grooming, Hair & Styling, Skin & Body, Recovery) + menus.
4. `compare_at_price` nos produtos (p/ o "de/por" aparecer).
5. Políticas EN reais + frete (re-auth c/ `write_legal_policies`).
6. Reviews app (Judge.me/Loox) → app block dentro da seção `testimonials`.

## Lacunas conhecidas p/ V3

Size-guide modal, quick-add com escolha de variante (popover), lookbook com hotspots, seção de campanha em vídeo, image zoom/lightbox na PDP, produtos complementares.

Relaciona: [[vellarie]] · [[project_vellarie_shopify_cli]] · [[feedback_referencia_dita_composicao_marca_dita_identidade]]
