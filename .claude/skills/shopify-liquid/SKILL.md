---
name: shopify-liquid
description: Liquid para temas Shopify — objetos, filtros, tags, schema JSON, snippets, gotchas comuns. Use ao escrever/depurar código Liquid, resolver erros de theme check, ou revisar sections/snippets.
---

# Shopify Liquid — referência rápida

## Objetos-chave
- `product` — `.variants`, `.options_with_values`, `.selected_or_first_available_variant`, `.featured_media`, `.media`, `.available`, `.compare_at_price`, `.metafields.custom.x`
- `collection` — `.products`, `.url`, `.featured_image`, `.all_products_count`
- `cart`, `customer`, `shop` (`.money_format`, `.enabled_payment_types`), `localization`, `routes` (`.cart_add_url`, `.predictive_search_url`, `.all_products_collection_url`), `settings`, `section.settings`, `section.blocks`, `block.settings`, `block.shopify_attributes`

## Filtros úteis
`| image_url: width: 800` · `| image_tag` · `| asset_url` · `| asset_img_url: '800x'` · `| money` · `| t` · `| default:` · `| where: 'type', 'x'` · `| color_to_rgb` · `| payment_type_svg_tag` · `| placeholder_svg_tag`

## Gotchas (que já mordveram)
- `.grid--products` (ou qualquer classe utilitária de grid) precisa de `display: grid` no CSS — se a section usa `class="grid--products"` sem `.grid`, e `.grid--products` só define `grid-template-columns`, **vira coluna única**. Sempre conferir `display`.
- Regra CSS não-media DEPOIS de um `@media` com mesma especificidade **vence** — ex.: `.header-menu-toggle { display: inline-flex }` na linha 265 anula o `@media (min-width:990px){ .header-menu-toggle{display:none} }` da linha 230. Ordem importa.
- `{% render 'x' %}` exige `snippets/x.liquid` existir (theme check acusa). `{% render block %}` (variável) é válido p/ app blocks.
- `| t` com key inexistente retorna `"translation missing: ..."` (truthy) → `| default:` NÃO cobre. Para textos de loja US, hardcode em inglês ou adicionar a key.
- `where` com string vazia/`@app` é frágil — preferir `section.blocks.size` + `case block.type`.
- `image_url` em asset do tema → não funciona. Asset do tema = `asset_url` cru, sem transform/srcset.
- `forloop.index | prepend: '0' | slice: -2, 2` → "01".."99" (número com zero à esquerda).
- Variáveis Liquid têm escopo de arquivo da section, não de bloco — `assign` no topo fica visível no resto do arquivo.

## Schema
- JSON válido dentro de `{% schema %}...{% endschema %}`. Validar com `node -e "JSON.parse(...)"`.
- `settings` types: text, textarea, richtext, url, image_picker, color, range, select, checkbox, collection, link_list, font_picker, header, paragraph.
- `blocks` + `max_blocks` + `presets` (com `blocks` e `settings` default).
