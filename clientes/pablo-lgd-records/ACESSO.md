# Legacy Company (LGD Records) — Acesso rápido

## Preview ao vivo
**https://legacy-company-lgd.vercel.app**

Projeto Vercel dedicado (`legacy-company-lgd`, escopo `sety-studio-s-projects`) — não compartilha mais infraestrutura com nenhum outro cliente.

- `/` — abertura com captura de WhatsApp (uma vez só, depois nunca mais aparece)
- `/shop.html` — catálogo completo com filtro por categoria, Mais Vendidos e Promoções
- `/produto.html?id=<id>` — página de produto individual

## O que é este protótipo
Site estático (HTML/CSS/JS puro) usado como **preview/demo** para o Pablo aprovar layout e catálogo antes de fechar tudo na loja Shopify real (`clientes/pablo-lgd-records/shopify/`, domínio `ldgrecords.com.br`). Não é a loja que vai para produção — é a referência visual.

## Fonte de verdade dos dados
`clientes/pablo-lgd-records/site/catalog.js` — um único arquivo com todos os produtos, preços, categorias e imagens. `shop.html` e `produto.html` só leem esse arquivo (não há preço duplicado em lugar nenhum).

## Pendências para confirmar com o Pablo
- **Camiseta Estampada Preta** (novo design com caveira/mão, chegou nas fotos do WhatsApp de 03/07): coloquei R$99,90 como placeholder, sem confirmação de preço real.
- **Camisas Antigas** (Legado Exclusivo Roxa/Verde, Circle, Azul Tiffany, Chrome, Branca, Judas Morreu, Shorts): virou coleção "Promoções" com 30% de desconto sobre o preço antigo do protótipo — ele tinha dito "vou colocar barato" mas nunca confirmou um valor exato.

## Número de WhatsApp
Configurado em `catalog.js` → `WHATSAPP_NUMBER = '558581670451'`. Troque só ali — todos os botões (card, produto, flutuante, modal) usam essa mesma constante.
