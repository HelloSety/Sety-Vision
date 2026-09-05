---
name: shopify-theme
description: Arquitetura de tema Shopify Online Store 2.0 — sections, blocks, snippets, JSON templates, section groups, theme settings, settings_data presets. Use quando for criar/editar a estrutura de um tema Shopify, decidir onde uma peça de UI mora, ou revisar a arquitetura de um tema (ex.: tema da Vellarie em clientes/vellarie/theme/).
---

# Shopify Theme — arquitetura OS 2.0

## Estrutura canônica
```
assets/     base.css (1 arquivo de design system), theme.js (1 arquivo, vanilla, defer)
config/     settings_schema.json (controles do Theme Editor) + settings_data.json (valores atuais + presets)
layout/     theme.liquid, password.liquid
locales/    en.default.json + en.default.schema.json (+ pt-BR.json opcional)
sections/   *.liquid (com {% schema %}) + *-group.json (header-group, footer-group)
snippets/   componentes reutilizáveis (css-variables, product-card, price, responsive-image, icon...)
templates/  *.json (OS 2.0) + customers/*.liquid + gift_card.liquid
```

## Regras
- **Nada hard-coded por seção.** Cores/fontes/spacing/radius/motion vêm de `settings.*` → CSS custom properties em `:root` via `snippets/css-variables.liquid`.
- Toda section tem `{% schema %}` com `settings`, `blocks`, `presets`. `name` pode ser string literal ou `t:` key.
- Section groups (`header-group.json`, `footer-group.json`) renderizados por `{% sections 'header-group' %}` no `theme.liquid`.
- Templates JSON referenciam sections por `type` + guardam `settings`/`blocks`/`block_order` + `order`.
- Blocos de app: incluir `{ "type": "@app" }` no array `blocks` da section para o merchant plugar apps (reviews, upsell).
- `settings_data.json`: `current` = estado ativo; `presets` = temas nomeados que o merchant aplica em 1 clique.
- Assets do tema referenciados por `{{ 'x.jpg' | asset_url }}`. `image_url`/`image_tag` só funcionam em imagens do Files/CDN (upload do merchant), não em assets do tema.
- Fallback de imagem: se `settings.logo` blank → usar `{{ 'bundled.png' | asset_url }}`. Deixa o preview "brandado" sem o merchant subir nada.

## Checklist ao adicionar uma section
1. `sections/nome.liquid` com markup + `{% schema %}` + `presets`.
2. CSS no `base.css` (não `<style>` inline por section, exceto tokens dinâmicos via `style="--x:{{ }}"`).
3. JS: adicionar módulo em `theme.js` + chamar no `boot(root)` (re-init em `shopify:section:load`).
4. Strings de UI → `{{ '...' | t }}`; labels de schema → string literal ou `t:` key existente.
5. `shopify theme check` → 0 errors.

## Vellarie
Tema em `clientes/vellarie/theme/`. Preset default `Vellarie — Signature` (dark #0B0B0C + accent #2E9BFF). Deploy: sem staff access → `shopify theme push` bloqueado; usar zip `clientes/vellarie/vellarie-theme-signature-v1.zip` ou token Theme Access.
