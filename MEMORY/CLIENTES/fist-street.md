---
name: fist-street
description: Cliente Fist Street — e-commerce de moda/streetwear em Shopify (usefist.com.br), tema conectado localmente via Shopify CLI
metadata:
  type: project
---

# Fist Street

**O que é:** cliente com e-commerce já ativo em produção na plataforma **Shopify**, site publicado em https://usefist.com.br/.

**Por que existe:** Seven pediu em 2026-07-31 pra conectar via CLI ao Shopify da loja pra viabilizar alterações futuras no tema.

## Estado atual (2026-07-31)

- Loja/admin: https://admin.shopify.com/store/fist-street (`fist-street.myshopify.com`)
- Tema live: "Fist Street" (id `150185050294`) — puxado com Shopify CLI para `clientes/fist-street/site/`
- CLI já estava autenticado nesta máquina, sem necessidade de login novo
- Loja tem outros 4 temas não publicados (Horizon, ela-4-0, warehouse-3d, "Fist Street - banners novos")
- **Redesign publicado no tema live (mesmo dia, várias rodadas):** cards de produto quadrados (sem `border-radius`) com badge "% OFF", ícone de favoritar (wishlist em localStorage), preço atual + riscado na mesma linha, botão "Comprar" cheio; categorias em círculo grandes e centralizadas com scroll lateral (reaproveitando seção `collections-row.liquid` que já existia); fileiras de produto por categoria com scroll horizontal na home (Bermudas + Conjuntos, as únicas coleções com estoque real) com setas de navegação; galeria da página de produto reorganizada com miniaturas em coluna vertical à esquerda da foto principal; botão "Comprar" em degradê verde neon (cor da marca — testamos azul a pedido do cliente e voltamos pro verde). **Bug real encontrado e corrigido:** `.card-img` (uma tag `<a>`) estava sem `display:block`, o que quebrava `aspect-ratio` e fazia a imagem do produto não ficar quadrada/cortar preço e botão da área visível — causa raiz de várias reclamações de "produto estranho" ao longo da sessão. Cada mudança validada com `shopify theme check` antes do push.
- **Pendências reais que dependem do cliente:** nenhum produto tem preço promocional configurado (badges "% OFF" não aparecem até ele configurar "comparar a preço"); Camisetas/Calças/Sneakers com 0 produtos cadastrados; seletor de cor e calculadora de frete por CEP (vistos em prints de referência de concorrente) não implementados — exigem remodelagem de produto e integração externa, respectivamente.

## Estado atual (2026-08-03)

- **Checkout migrado para Yampi**, conectado via app no admin Shopify (não aparece em nenhum arquivo do tema — interceptação server-side). Rota `/checkout` do tema (carrinho e drawer) continua igual, a Yampi assume a partir daí.
- **Bug corrigido:** botão "Comprar" (quick-add) dos cards da vitrine não dava feedback e no mobile virava um botão vazio confuso. Corrigido em `assets/theme.js` — ícone de carrinho fixo no botão de confirmar + abertura automática do carrinho lateral após adicionar com sucesso. Publicado no tema live, validado via `theme check` e conferido no CDN.
- Ajustes de configuração/aparência do checkout em si (não do carrinho) ficam no painel da Yampi, fora do alcance do tema Shopify.

## Próximos passos

1. Seven/Igor decidirem sobre as pendências reais acima.
2. Sempre `theme pull` antes de editar e confirmar com o Seven antes de `theme push` no tema live.

Ver `clientes/fist-street/ACESSO.md` para comandos completos do CLI e detalhes técnicos.
