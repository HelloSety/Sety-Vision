---
name: shopify-qa
description: QA de tema Shopify — theme check, validação JSON/Liquid, responsividade, console, checklist de páginas. Use antes de considerar um tema pronto para preview/publicação.
---

# Shopify QA

## Automatizado
```bash
# roda local, SEM auth:
shopify theme check --output json           # meta: 0 errors (RemoteAsset warning de Google Fonts = ok)

# JSON + blocos {% schema %} de todos os arquivos:
node -e '<walk .json com JSON.parse + regex {% schema %}...{% endschema %}>'

# refs de snippet/section:
# todo {% render "x" %} → snippets/x.liquid existe? todo {% section "x" %} → sections/x.liquid existe?
```

## Preview visual (sem publicar)
- Servir a pasta via `python -m http.server` + HTML estático que dá `<link>` no `base.css` real + tokens do preset em `:root`. Renderizar com Playwright a **1440** e **390**.
- Checar via `browser_evaluate`: `getComputedStyle(grid).gridTemplateColumns`, `.getBoundingClientRect()`, `document.documentElement.scrollWidth > clientWidth` (overflow horizontal).
- Slice de screenshots full-page em bandas p/ leitura.

## Checklist de páginas
Home · Product · Collection · Cart · Search · 404 · mobile menu · desktop menu · quick add · variant selector · cart drawer · newsletter · footer.

## Procurar
- coluna única onde deveria ser grid (classe util sem `display:grid`)
- hamburger visível no desktop (ordem de regra CSS vs media query)
- faixa branca / crop no hero (`min-height` fixo vs `aspect-ratio`)
- overflow horizontal em 375/390/430
- layout shift (imagem sem `aspect-ratio`/dimensões)
- imagens quebradas / assets faltando
- `translation missing:` em labels
- console: 0 erros JS (ignorar `favicon.ico 404` do server local)
- elementos de debug/demo/placeholder/"static visual proof" no output final → remover

## Responsivo — breakpoints a testar
375 · 390 · 430 · 768 · 1024 · 1440 · 1920
