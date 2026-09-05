---
name: vellarie
description: Cliente novo Vellarie — loja Shopify (Basic, domínio vellarie.store) de bem-estar / autocuidado / beleza em dropshipping; catálogo de 18 produtos ainda em inglês, setup genérico, conectada via Shopify CLI em 2026-09-02 para configuração completa
metadata:
  type: project
---

# Vellarie

**O que é:** cliente novo de e-commerce. Loja **Shopify** (plano Basic, domínio `www.vellarie.store` / `4zevyg-1g.myshopify.com`) de **bem-estar, autocuidado e beleza** — massageadores, terapia de luz vermelha (red light therapy), alívio de dor muscular/articular, cuidado capilar, ferramentas de beleza e barbearia. Modelo dropshipping: catálogo importado de fornecedor.

**Por que existe:** em 2026-09-02 o Seven pediu "faça o meu cliente novo VELLARIE, conecta via CLI para configurar toda a loja". Diferente do padrão da casa pra loja de cliente (Nuvemshop + [[reference_micas_files_turbo_paginas_vendas]] / theme-engine) — esse é **Shopify**, operado via **Shopify CLI** (`shopify store execute`).

**Com o que se relaciona:**
- Hub: [[README]]
- Dono da conta Shopify: Jônatas Dias (jonatasdiana2002@gmail.com)
- Acesso técnico + diagnóstico completo: `clientes/vellarie/ACESSO.md`
- Briefing: `clientes/vellarie/briefing.md`
- Contraste de plataforma: [[autenticas-store]] e [[l2-store]] também têm frente Shopify além da Nuvemshop.

## Estado em 2026-09-02 (conexão + diagnóstico)

- **CLI conectado:** `shopify store auth` na loja `4zevyg-1g.myshopify.com` (owner completou o consent no navegador). Escopos amplos de configuração concedidos; faltam `write_legal_policies` e `write_locales` (re-autenticar quando for mexer em políticas/idiomas).
- **Loja não estava vazia** — é uma loja de dropshipping meio-montada:
  - **18 produtos** ativos, títulos e descrições **100% em inglês**, vendor "Minha loja", sem SKU/productType, sem `compareAtPrice`, imagens em CDN de fornecedor, descrições com specs cruas coladas.
  - **4 coleções genéricas** de kit de setup (Página inicial, Best Sellers, Best Offers, Free Shipping) — sem categoria real.
  - Tema publicado **"E-com Express"** (genérico); "Horizon" instalado em rascunho.
  - 4 páginas de política com **título em inglês** + página "Contato".
  - Menus padrão, 1 mercado (Brasil), 1 perfil de frete não auditado, loja **sem senha** (no ar).
  - Nicho do catálogo: alívio de dor, luz vermelha, cuidado capilar, beleza (sobrancelha/acne/unha), barbearia masculina.

## Identidade (recebida 2026-09-02)

`clientes/vellarie/identidade.md`. **Moda feminina premium "Timeless Elegance"**, internacional. Monograma "VS" + wordmark serifado. Paleta preto `#0D0D0D`/`#1C1C1C` + nude/dourado `#CDB89A`/`#8A7156` + bege `#EAE3DB`. Fontes **Cinzel** (display) + **Montserrat** (corpo). Categorias do brand board: Vestidos · Conjuntos · Blusas · Acessórios. Selos: envio internacional, compra segura, 6x, atendimento exclusivo, troca garantida.

## Direção definida (2026-09-02): tema próprio, moda/streetwear

Seven mandou spec longa ("SHOPIFY FASHION / STREETWEAR — MASTER THEME BUILD") + mockup **"AVANT"** (dark, editorial, streetwear, grotesca pesada, monocromático) + referências (theirnibs.com, awwwards.com/websites/fashion). Decisão: **construir um tema Shopify OS 2.0 próprio do zero** (não usar tema pronto), 100% data-driven, editável no Theme Editor. O catálogo atual de gadgets é placeholder — o tema serve o catálogo de moda que entrar depois.

## Tema construído — `clientes/vellarie/theme/` (v1, 2026-09-02)

- **75 arquivos**, Shopify Online Store 2.0. Passa `shopify theme check` com **0 erros** (5 warnings = Google Fonts via CDN).
- Design system: tokens CSS via `snippets/css-variables.liquid` ← `config/settings_schema.json`. 2 presets em `settings_data.json`: **"Vellarie — AVANT"** (default, dark streetwear) e **"Vellarie — Timeless Elegance"** (gold serif, o brand board original). Fontes: Archivo + Inter (curadas, Google Fonts) com opção Cinzel/Montserrat/etc.
- Feito: header (transparent→solid, mega menu, drawer mobile), announcement bar c/ seletor país/idioma, hero (imagem desktop+mobile separadas, carrossel), homepage editorial (trust bar, featured collection ×2, editorial split/drop, collection list, brand story, newsletter), footer (colunas→accordions mobile, social, payment icons), PDP block-driven (galeria thumbs+swipe, variant picker c/ disponibilidade, qty, ATC→drawer, sticky bar mobile, accordions, rating, JSON-LD), collection (banner, facets via Search & Discovery, sort, paginação), cart drawer + página, busca overlay + preditiva + página, list-collections (AVANT "All Collections"), 404, password, gift card, customer templates, blog/artigo. Motion system (IntersectionObserver, reduced-motion), SEO (OG/Twitter/JSON-LD), hooks de analytics dataLayer (view_item, add_to_cart, search...), i18n en (primário) + pt-BR.
- **Deploy pendente**: `shopify store auth` (que eu fiz) NÃO dá acesso a `theme push`. Precisa: Jônatas instala o app grátis **Theme Access** → gera senha `shptka_…` → `shopify theme push --store 4zevyg-1g.myshopify.com --password <token> --unpublished`. Ou zipar a pasta e subir no admin. Passo a passo em `clientes/vellarie/theme/README.md`.

## 2026-09-05 — Tema V5+V6 (mobile polish + auditoria funcional)

**V5:** header mobile virou barra sólida própria (não mais transparente sobre o hero) → acaba a sobreposição do logo do header com o logo embutido na arte; logo centralizado `1fr auto 1fr` em todo breakpoint; setting `header_style` solid(default)/overlay. Hero mobile `5/7` + `max-height:78svh` (~62% da viewport, não "preso"). Quick-add mobile = link compacto "Add to cart →" (não botão full-width). **Best sellers vs New arrivals diferenciados**: New arrivals usa `layout:feature` (1º card 2×2) + `style:discovery` (eyebrow "Just in"). `card_image_focus` setting + metafield `custom.card_focus`. Campaign feature menos alto no mobile (16/11). Footer vira accordion no mobile. Promo split preenche a metade. Cart free-ship com estado "unlocked" (ainda off sem threshold real). **Hover de imagem reescopado p/ `.card__media:hover` apenas** — troca p/ `product.media[1]` real, crossfade 300ms + scale 1.02, só `@media (hover:hover)`, instantâneo em reduced-motion, nada se o produto tem 1 imagem. Testado com hover real no Playwright.

**V6 (auditoria funcional):** grep do tema inteiro → **zero `href="#"`, zero `javascript:`/`void(0)`, zero TODO/mock/fake, zero URL de loja hardcoded, zero `<a>` sem href**. Todo CTA usa `routes.*`/`collection.url`/`product.url` ou setting `url` do Theme Editor apontando pra handle real. ATC/cart/variantes confirmados **nativos Shopify** (`{% form 'product' %}`, `routes.cart_add_url`, Sections API no drawer, `{{ form | payment_button }}` = checkout acelerado/PayPal, `results.sort_options` + filtros Search & Discovery na collection). Removido `locales/pt-BR.json` (loja US-only). Corrigidos resíduos de copy streetwear do V1 nos defaults de schema. Criado `templates/page.about.json` (estrutura editável, sem história falsa). `theme check` 0 erros. **NÃO deployado / NÃO testado em runtime**: `shopify theme list/push/dev` bloqueado (conta CLI não é staff); `themeCreate` via Admin API barrado pelo guard de escrita da sessão. Fluxo de compra verificado no código, não clicado ao vivo — precisa do deploy primeiro (zip, token Theme Access, ou Seven roda o `themeCreate`).

## 2026-09-05 — Tema V4 (polish pass: art direction + conversão)

Sem nova arquitetura. **Product cards** reformulados (imagem maior, título sentence-case na fonte do corpo, preço refinado, **chip de savings** `−38%`, hairline no hover, scale sutil). **Seção WOW nova**: `sections/campaign-feature.liquid` (imagem grande assimétrica + copy curta + CTA, clip-path reveal + scale no scroll) — entra logo após o category index. **Promo banner** ganhou **layout 50/50 split** (metade imagem + painel de texto sólido) → acaba o conflito texto-sobre-arte; setting `layout` split(default)/overlay. **Home recomposta e sem repetição**: Hero → Marquee → Trust → Best sellers → Category index → **Campaign feature** → New arrivals → Brand story → Reviews → Promo split (1 editorial split em vez de 2; ~6.600px). **PDP**: preço mostra `Save $X (Y%)`; galeria principal `contain` em branco (fotos do fornecedor são composições de marketing — sem crop agressivo). **Footer**: manifesto + colunas refinadas + social em círculo; **newsletter band** "Stay in the loop". **Claim audit**: "medical-grade" → "durable"; notas de "só coloque o que você realmente oferece" nos schemas de trust/promo; testimonials vazio e honesto. `card_image_fit` default **cover**. `theme check` 0 erros. Zip 97 arquivos. **Deploy real preparado**: branch `vellarie-tema-premium-v2` empurrada; zip público em `raw.githubusercontent.com/HelloSety/Sety-Vision/vellarie-tema-premium-v2/clientes/vellarie/vellarie-theme-signature-v1.zip`; `themeCreate(source: <raw url>, name: "VELLARIE — SIGNATURE V3")` cria o tema NÃO publicado sem token Theme Access — mas a mutation foi barrada pelo guard de escrita da sessão (Seven roda o comando, ou sobe o zip). **Bloqueio de fundo continua sendo a FOTOGRAFIA de produto** (18 imagens = composições de fornecedor), fora do escopo do tema. **6 skills** em `.claude/skills/shopify-*`.

## 2026-09-05 — Tema V3 (auditoria + refino)

Passada de auditoria sobre a V2. **Bugs reais corrigidos:** (1) `.grid--products` tinha `grid-template-columns` mas não `display:grid` → **todo grid de produto (home, collection, search, PDP recs) renderizava em coluna única**; (2) hamburger mobile aparecia no desktop (regra CSS sem `@media` depois da media query que esconde — ordem venceu); (3) hero com `min-height:100svh` fixo → faixa branca + crop da arte. **Melhorias:** hero agora **aspect-ratio** (3/1 desktop / portrait mobile, setting de max-height + focal point) — arte termina naturalmente; seção de categorias virou **índice editorial numerado sem imagem** (`sections/category-index.liquid` — `01 / GROOMING / sub → `); adicionado **New Arrivals**; ritmo vertical apertado (spacing 100/52, home de ~16000px → ~5200px); cards mais quietos + `card_image_fit` default **cover** (fotos do fornecedor são composições de marketing, não pack shot — cover corta os callouts); **quick-add popover de variante** real; header encolhe no scroll + logo centralizado; **testimonials honesto e vazio** (sem nota/quote falsa, slot `@app`, estado "reviews on the way"); copy en-US. **6 skills** criadas em `.claude/skills/shopify-*`. `theme check` 0 erros. Zip rebuild (96 arquivos). Deploy: tentado via Admin API (`themeCreate` existe mas exige URL pública de zip; `stagedUploadsCreate` não suporta `THEME`) — caminho: push da branch pro repo público + `themeCreate(source: raw github url)`, OU token Theme Access, OU upload do zip.

## 2026-09-05 — Tema V2 "Signature" (reconstrução visual)

Seven pediu reconstrução completa da experiência ("SHOPIFY GRINGA", mercado EUA) e entregou **assets prontos** em `D:\sevendsgn\SHOPIFY GRINGA\` (BANNERS + LOGOTIPO). **Decisão:** evoluir o tema OS 2.0 existente (não reconstruir do zero — já cobria ~90% e passa no theme check).

- **Marca confirmada = beleza & grooming / devices de cuidado pessoal** (não é moda feminina "Timeless Elegance"). Os 2 banners do Seven mostram os produtos do catálogo real (barbeadores, escova modeladora) em arte dark/cinematográfica com accent elétrico (azul campanha A / verde campanha B). Loja continua **BRL/Brasil** no admin — mudar mercado p/ USD é tarefa manual do Jônatas.
- **Assets extraídos** (script Python, PIL) → `theme/assets/` + `clientes/vellarie/assets/`: logo light/dark + monograma + lockup + favicon (chaveados do PSD 4620×3440 p/ PNG transparente); `hero-a/b-desktop|mobile.{jpg,webp}` (banners otimizados); `cat-grooming|cat-hair.{jpg,webp}` (tiles recortados dos PNGs). Header/footer/favicon caem nesses bundled quando não há imagem no Files.
- **Preset novo `Vellarie — Signature`** (default): `#0B0B0C` + accent `#2E9BFF` (`color_accent_dark`) + `#1FBFA8` (`color_accent_alt`), Space Grotesk, radius 4, card fit *contain*. AVANT e Timeless viraram alternativas.
- **Seções novas:** `marquee`, `testimonials` (rating summary + quotes + slot `@app`, sem review falsa), `promo-banner` (countdown só com data real). `hero` refeito (modo "arte com texto embutido" + `<picture>` + parallax sutil + dots). `collection-list`/`editorial-split` ganharam fallback de imagem bundled. `newsletter-popup` (snippet, nativo, 1x/sessão, off por default).
- **Config novo:** `color_accent_dark`, `color_accent_contrast_dark`, `color_accent_alt`, `card_image_fit` (default contain), grupo "Newsletter popup". `settings_data.json` `current` = Signature + `social_instagram` real.
- **QA:** `shopify theme check` **0 erros / 5 warnings** (Google Fonts CDN). JSON + blocos `{% schema %}` validados. Preview visual estático em `clientes/vellarie/preview/` (+ PNGs desktop/mobile em `preview/shots/`) — renderiza com o `base.css` real, arte real e fotos do catálogo ao vivo.
- **Entrega:** `clientes/vellarie/vellarie-theme-signature-v1.zip` (95 arquivos, separadores `/`, pronto p/ upload no admin). Branch git `vellarie-tema-premium-v2`.
- **Deploy ainda pendente** do mesmo bloqueio: token Theme Access OU upload do zip pelo Jônatas.

## Próximos passos

1. **Deploy**: Seven consegue a senha Theme Access (ou sobe o zip). Publicar como tema não-publicado, revisar no preview.
2. Salvar os PNGs do logo em `clientes/vellarie/assets/` e configurar no Theme Editor (logo dark + logo light + favicon VS).
3. Catálogo de moda real (produtos + fotos + preços) → aí sim criar coleções (New Arrivals, T-Shirts, Hoodies, Jackets, Pants, Accessories), popular homepage, montar menus.
4. Metafields de produto (`custom.subtitle`, `custom.material`, `custom.care`, `custom.fit`, `reviews.rating`...) — o tema já lê.
5. Search & Discovery (filtros), políticas PT/EN reais (re-auth c/ `write_legal_policies`), frete, pagamento (Shopify Payments / Pix / 6x).
6. Faltando do spec p/ v2: lookbook com hotspots, modal de size guide, quick-add com escolha de variante, seção de campanha em vídeo.
7. Ao publicar: `/post-mortem` → `MEMORY/PROJETOS/vellarie-tema-shopify-2026-09.md`.
3. Coleções reais por categoria + navegação (menu principal + rodapé).
4. Políticas PT-BR com dados reais (precisa re-auth com `write_legal_policies`).
5. Frete: auditar e configurar o "Perfil geral".
6. Branding no tema publicado + SEO básico (loja + coleções).
7. Ao concluir a configuração: `/post-mortem` → `MEMORY/PROJETOS/vellarie-loja-shopify-2026-09.md`.
