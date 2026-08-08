# Autênticas Store

E-commerce de moda masculina premium (roupas, tênis, chinelos, bonés — réplicas de grife: Lacoste, Gucci, Nike, Mizuno, Tommy, Alexander McQueen, entre outras). Loja física em Nova Andradina/MS (Rua Yutaka Hashinukuti, 428), vende também pelo Instagram (@autenticas__store, ~1060 seguidores) com envio pra todo o Brasil.

**Site atual do cliente:** https://autenticasstore.netlify.app/ — template genérico de loja (builder tipo "app-builder"), sem produtos nem branding configurados. Substituído integralmente pelo site novo.

**Tema-base (2026-08-01):** Lulu Imports (biblioteca `/theme-engine` da Sety Studio, ver `MEMORY/TEMPLATES/tema-lulu-imports.md`) — escolhido por bater com o nicho (produto "de marca"/réplica premium, mesma tática de FAQ de objeções "é confiável? fotos são reais?"). Cliente pediu inspiração nos 3 temas da biblioteca (usefist.com.br = Fist Street, luluimports.com.br = Lulu Imports, loja.underzstore.com = Underz Store); Lulu foi o mais aderente ao nicho e ao catálogo real.

**Branding:** cor de destaque dourada (`#c9962e`), fundo branco/preto neutro, tipografia Sora + Montserrat — combina com a logo real do cliente (monograma "A" preto e branco, estilo selo/emblema) extraída do Instagram.

**Entrega:** `site/index.html` (home) + `site/produto.html` (produto individual com galeria de variantes e seletor de cor).

**Link publicado (2026-08-01):** https://autenticas-store-sety.vercel.app — projeto Vercel `autenticas-store` (time `sety-studio-s-projects`). SSO Protection do time estava ativa por padrão e bloqueava acesso público (mesmo problema do Monster Lupas) — desativada especificamente neste projeto com `vercel project protection disable autenticas-store --sso`, mediante aprovação do Seven.

**Atualização (2026-08-01, mesma sessão):**
- Logo em alta resolução: original do Instagram (100×100) upscalada via Higgsfield/bytedance para 4096×4096, salva em `assets/logo-hd.png`; a partir dela geradas `assets/logo.png` (512×512, usada no site) e favicons `favicon-32.png`/`favicon-180.png`/`favicon-512.png`.
- Grid "Compre por Categoria" centralizada (`justify-content: center` em `.sticker-row`, com fallback left-align só em telas ≤560px pra manter scroll utilizável).
- Página de produto redesenhada no padrão "checkout premium Sety Studio" (ver [[padrao-icones-checkout]]): seletor de tamanho (pills retangulares, tamanhos por categoria em `SIZES_BY_CATEGORY` no catalog.js), bloco Pix destacado (fundo verde + ícone real + badge "Envio Prioritário"), badges duplos (categoria + "Qualidade Premium"), 3 CTAs (Adicionar à Sacola / Comprar pelo WhatsApp preto / Comprar pelo WhatsApp outline verde), formas de pagamento com SVGs reais de bandeira, bloco de frete grátis com ícone de caminhão — inspirado em mantoprooficial.com.br a pedido do Seven.
- Todos os emojis (💬🛍️🔒✓🚚) substituídos por SVG inline real, conforme regra fixa da Sety Studio (nunca emoji em site de cliente).
- Redeploy feito e alias `autenticas-store-sety.vercel.app` reapontado pro novo deployment.

## Fontes dos assets (tudo real, nada fictício)
- **Logo**: extraída do Instagram (`site/assets/logo.jpg`, 100×100 — baixa resolução, pedir arquivo em alta ao cliente antes de produção).
- **Fotos de roupas** (polo, camisetas, calça jeans): extraídas de posts do Instagram @autenticas__store em `site/assets/instagram/`.
- **Fotos de tênis, chinelos e bonés**: vieram de um catálogo real que o Seven recebeu do fornecedor (Kelven) via WhatsApp em 2026-07-31, com preços reais — extraídas de `C:\Users\seven\Downloads\CATALOGO AUTÊNTICAS STORE\` e copiadas pra `site/assets/produtos/`.

## Catálogo (25 produtos, preços reais do fornecedor)
- **Roupas** (4): Polo Piquet R$99,90, Camiseta Gola Losango R$79,90, Camiseta Listrada R$89,90, Calça Jeans Destroyed R$139,90
- **Tênis** (7): Alexander McQueen R$285, Zara Velcro R$320, Gucci Monograma R$380, Nike Court Vision R$280, Mizuno Prophecy 13 R$280, Nike Low R$250, Nike Twist R$285
- **Chinelos** (5): Slide Nike/Gucci/Hugo Boss R$65, Slide Croco R$90, Sandália Asuna R$185
- **Bonés & acessórios** (13): Quick Silver, Gucci (preto e bege), Lacoste (Sport e Nylon), Tommy, Polo, LV, Brooksfield, Nike Nadal, Osascorte, Sport Furo, Puma — R$79,90–89,90

Preço "de/por" (`oldPrice`) é estimado (~140-160% do preço real) pra dar senso de desconto — ajustar se o cliente já tiver margem definida.

## Reformulação 2026-08-04 — padrão Manto Pro + Lulu Imports

Padrão da Sety Studio mudou em 2026-08-02 pra combo único Manto Pro (checkout) + Lulu Imports (home/carrossel). Seven pediu pra reformular o site pra bater com o padrão novo — escopo confirmado antes de mexer (produção real sem git): manter catálogo/preços/Vercel/WhatsApp, só fechar os gaps de padrão.

**Página de produto (`produto.html` + `js/product.js`):**
- Abas **Descrição** / **Tabela de Medidas** — tabela real por categoria (`MEASURE_TABLES` em `catalog.js`: roupas P-GG, tênis 38-43 em cm, chinelos por faixa, bonés ajustável).
- Banner de cartão de crédito ("compras no cartão são processadas mais rápido").
- Bloco de selos completos: ícones de pagamento + "Compra 100% Segura" + "Ambiente Criptografado".
- FAQ em accordion (`#productFaq` em `produto.html`, wiring em `initProductFaq()`).

**Home (`index.html` + `js/main.js` + `js/catalog.js`):**
- `productCardHTML` e `sizeChipsHTML` movidos de `main.js` pra `catalog.js` (compartilhado com `produto.html`, que antes tinha um card de "relacionados" duplicado e mais simples).
- Card: nome/preço centralizados, chips de tamanho em miniatura + divisória fina antes do preço, preço sem "de/por" (desconto comunicado só pelo badge `-X% OFF` na imagem), CTA "Comprar" + botão de sacola preto colado (sem gap).
- Dots de paginação (`initRowDots()` em `catalog.js`) abaixo de cada carrossel de produtos (Novidades, Mais Vendidos, Relacionados) — computa páginas por largura visível, sincroniza com scroll.

**Deploy:** `vercel --prod` promoveu um alias aleatório (`site-five-blue-46.vercel.app`) em vez de atualizar `autenticas-store-sety.vercel.app`. Corrigido com `vercel alias set <deployment-url> autenticas-store-sety.vercel.app` — ver [[feedback_vercel_confirmar_alias_apos_deploy]] no auto-memory, é padrão recorrente da conta, não bug deste projeto.

## Pendências para fechar com o cliente antes de ir pra produção
- Número de WhatsApp real (site usa placeholder `55XXXXXXXXXXX` em `js/cart.js`)
- Confirmar preços de venda reais (os valores do catálogo do fornecedor podem ser preço de custo, não de varejo — checar com o cliente)
- E-mail de contato confirmado: uso `contato@autenticasstore.com.br` como placeholder
- CNPJ (compliance, se aplicável)
- Gateway de checkout (padrão Sety Studio: CartPanda) — **substituído pelo checkout nativo Shopify na versão Shopify (ver abaixo)**
- Domínio próprio (hoje só o `.vercel.app` / `.myshopify.com`)

## Migração para Shopify (2026-08-05)

Loja real: `wg0tuk-ru.myshopify.com` ("Minha loja 2" — nome de dev store autogerado). Projeto em `autenticas-store-shopify/` (clone fresh do tema Dawn 15.5.0, não reaproveitado do Monster Lupas — só as 6 sections customizadas foram portadas como ponto de partida).

**Tema:** identidade aplicada via `assets/autenticas-store.css` (paleta dourada `#C9962E` sobre preto/branco/cinza, Sora+Montserrat via Google Fonts injetadas em `layout/theme.liquid`, mesmo mecanismo do Monster Lupas — `image_picker` nativo não aceita asset do tema, só Shop Image Library). Sections customizadas: `as-marquee` (faixa de benefícios), `as-banner` (banners hero via `asset_url`), `as-sticker-categories` (compre por categoria, tabs = link real de coleção), `as-carousel` (carrossel de coleção reutilizável), `as-about`, `as-instagram-bar`. Produto customizado via blocks `custom_liquid` no `main-product` nativo (badge Frete Grátis + Qualidade Premium, Pix 5% off, parcelamento 3x, ícones de pagamento, trust list) — sem fork do `main-product.liquid`.

**Catálogo:** 29 produtos reais (4 roupas + 7 tênis + 5 chinelos + 13 bonés/acessórios — a contagem de "25" em notas antigas estava errada). `scripts/import-products-api.js` lê `site/js/catalog.js` (fonte única, `vm.runInNewContext`) e importa via Admin API: `productSet` (produto+variantes) → `productCreateMedia` (imagens em lote, casadas por `alt` text) → `productVariantAppendMedia` (associa mídia à variante). Imagens servidas do site Vercel já publicado (`https://autenticas-store-sety.vercel.app/assets/...`) — Shopify baixa e re-hospeda no próprio CDN. `scripts/create-collections.js` cria 6 collections por tag (`categoria-roupas/tenis/chinelos/acessorios` + `colecao-novidades/mais-vendidos`).

**Checklist de publicação (aplicado de primeira, lição do Monster Lupas/Valadão Surf):** `productSet`/`collectionCreate` via Admin API NÃO publicam automaticamente em nenhum canal de vendas. Rodei `scripts/publish-all.js` (`publishablePublish` em lote, 36 aliases numa chamada GraphQL: 29 produtos + 6 collections) publicando tudo no canal "Loja virtual" logo após criar — evitou o bug de "produtos somem do site" que já aconteceu 2x em migrações anteriores.

**Logo:** subida via staged upload real (`stagedUploadsCreate` → `curl -F` multipart pro Google Cloud Storage → `fileCreate`), otimizada de 1.4MB→26.6KB (sharp, resize 512×512) antes do upload. Referenciada em `config/settings_data.json` como `shopify://shop_images/autenticas-store-logo.png`.

**Bloqueio de CLI confirmado pela 3ª vez (padrão da conta, não bug pontual):** `shopify theme push` funciona direto com o token de `store auth`, mas `shopify theme publish` dá erro "Looks like you don't have access to this dev store" mesmo autenticado. Resolvido com `shopify auth logout` + novo login via device-code (comando pede confirmação no browser — usuário já estava com o Chrome aberto). **Vale já fazer esse re-login preventivo antes de qualquer `theme publish` em migrações futuras**, sem esperar o erro acontecer.

**Deploy:** `shopify theme push --theme "Autênticas Store - Sety Studio"` criou o tema como rascunho (id `166462357593`) — 1º push falhou por causa de `products_to_show: 25` fora do step válido (min 8, max 60, step 2) no schema da section `as-sticker-categories`, corrigido pra `26`. Publicado ao vivo (`theme publish --force`) no mesmo dia, a pedido explícito do Seven ("suba todo o site dele no ar") — não ficou em rascunho como em sessões mais cautelosas anteriores.

**Pendência de 1 clique que só o Seven resolve:** a loja nasceu com **Restrição de acesso por senha** ativa (padrão de toda dev store nova do Shopify, confirmado via `curl` → redirect 302 pra `/password`). Não existe mutation na Admin API pra isso (testado, `undefinedField` no schema) — desativar manualmente em Admin → Configurações → Canais de Vendas → Loja Online → Preferências → desmarcar "Restringir acesso com senha".

Scripts em `scripts/`: `import-products-api.js` (import de produtos), `create-collections.js` (6 collections), `publish-all.js` (publicação em massa no canal Loja virtual).
