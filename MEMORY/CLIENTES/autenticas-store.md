---
name: autenticas-store
description: Cliente Autênticas Store — e-commerce de moda masculina premium (Nova Andradina/MS). Migrado de Shopify pra 100% código próprio: catálogo estático, checkout Mercado Pago só Pix+cartão (sem boleto/Caixa), 2 CTAs por produto (Comprar Agora + WhatsApp, sem carrinho) — publicado em autenticas-store-sety.vercel.app
metadata:
  type: project
---

# Autênticas Store

**O que é:** loja física + Instagram (@autenticas__store, Nova Andradina/MS) de moda masculina premium — roupas, tênis, chinelos e bonés de marcas replicadas (Lacoste, Gucci, Nike, Mizuno, Tommy, Alexander McQueen). Site antigo (`autenticasstore.netlify.app`) era um template genérico vazio, sem produtos nem branding — substituído integralmente.

**Por que existe:** Seven pediu em 2026-08-01 site novo "com o tema da Sety Studio", citando como inspiração os 3 sites-fonte da biblioteca `/theme-engine` (usefist.com.br, luluimports.com.br, loja.underzstore.com) e o Instagram do cliente pra logo/imagens.

## O que foi feito (2026-08-01)

- **Tema-base:** Lulu Imports (fundo branco/preto + 1 cor de destaque disciplinada + FAQ de objeções + fotografia 3:4) — o mais aderente ao nicho de réplica premium.
- **Branding:** dourado `#c9962e` como cor de destaque (remete a "autenticidade"/selo), combinando com a logo real do cliente (monograma "A" preto e branco).
- **Assets reais** (nada fictício): logo + fotos de roupas extraídas do Instagram via Playwright (scraping direto, pois `WebFetch`/`curl` simples são bloqueados por anti-bot do Instagram); fotos de tênis/chinelos/bonés vieram de um catálogo real de fornecedor que o Seven recebeu por WhatsApp (`C:\Users\seven\Downloads\CATALOGO AUTÊNTICAS STORE\`), com preços reais de custo/venda.
- **Catálogo:** 25 produtos reais em 4 categorias (Roupas, Tênis, Chinelos, Bonés & Acessórios) — ver detalhamento completo em `clientes/autenticas-store/CLAUDE.md`.
- **Entrega:** `clientes/autenticas-store/site/index.html` + `produto.html`, testado local (servidor http-server, mobile 390px e desktop 1440px) via Playwright.
- **Publicado:** https://autenticas-store-sety.vercel.app (Vercel, projeto `autenticas-store`). SSO Protection do time bloqueava acesso público por padrão — desativada neste projeto com aprovação do Seven (`vercel project protection disable`).
- **Atualização mesma sessão:** logo upscalada 100×100→4096×4096 (Higgsfield) + favicons reais; página de produto redesenhada em padrão "checkout premium" (seletor de tamanho, bloco Pix, 3 CTAs, pagamento com bandeiras reais) inspirado em mantoprooficial.com.br; todos os emojis trocados por SVG real — ver [[padrao-icones-checkout]].

## Reformulação 2026-08-04 — padrão Manto Pro + Lulu Imports

O [[theme-engine]] mudou pro padrão único Manto Pro + Lulu Imports em 2026-08-02; o site do Autênticas ainda estava na versão anterior (só Lulu Imports, checkout parcial). Seven pediu pra "reformular com o tema Sety Studio" — escopo confirmado com ele antes de mexer (produção real, sem git): **atualizar pro padrão novo mantendo catálogo/preços/Vercel/WhatsApp**, não reconstruir do zero.

- **Página de produto**: abas Descrição/Tabela de Medidas (medidas reais por categoria), banner de cartão de crédito, bloco de selos completos (Compra 100% Segura + Ambiente Criptografado), FAQ em accordion.
- **Home**: cards com nome/preço centralizados, chips de tamanho em miniatura, preço sem "de/por" (desconto já no badge da imagem), CTA "Comprar" + sacola colados, dots de paginação nos carrosséis.
- `productCardHTML` centralizado em `catalog.js` (compartilhado entre home e produto — antes havia versão duplicada e simplificada no card de "relacionados").
- Redeploy exigiu `vercel alias set` manual — `vercel --prod` promoveu alias aleatório em vez do domínio público conhecido, ver [[feedback_vercel_confirmar_alias_apos_deploy]].

## Pendências antes de produção

- WhatsApp real (placeholder em `js/cart.js`)
- Logo em alta resolução (a extraída do Instagram é só 100×100)
- Confirmar se os preços do fornecedor são custo ou venda final
- Domínio próprio

## Migração para Shopify (2026-08-05)

Seven pediu pra subir o site na loja Shopify real do cliente, `wg0tuk-ru.myshopify.com` ("Minha loja 2" — nome de dev store autogerado, mesmo padrão do Monster Lupas), conectando via CLI e configurando produtos + coleções + tema. Segui o playbook já validado em [[project-cliente-monster-lupas]] e [[project_cliente_valadao_surf]]:

- **Tema:** clone fresh do Dawn 15.5.0 em `clientes/autenticas-store/autenticas-store-shopify/` (não reaproveitei a pasta do Monster Lupas — só copiei as 6 sections customizadas genéricas como ponto de partida: `as-marquee`, `as-banner`, `as-sticker-categories`, `as-carousel`, `as-about`, `as-instagram-bar`, renomeadas do prefixo `ml-`). Branding aplicado via `assets/autenticas-store.css` (paleta dourada `#C9962E` sobre preto/branco, Sora+Montserrat via Google Fonts injetado no `layout/theme.liquid`, mesmo mecanismo do Monster Lupas). Página de produto customizada via blocks `custom_liquid` no `main-product` nativo (badge Frete Grátis + Qualidade Premium, Pix 5% off calculado em Liquid, parcelamento 3x, ícones de pagamento, trust list) — sem fork do `main-product.liquid`.
- **Catálogo real:** 29 produtos (não 25 — a contagem antiga desta nota estava desatualizada; são 4 roupas + 7 tênis + 5 chinelos + 13 bonés/acessórios) importados via `clientes/autenticas-store/scripts/import-products-api.js` (adaptado do script do Monster Lupas): `productSet` → `productCreateMedia` → `productVariantAppendMedia`, imagens servidas do site Vercel já publicado (`autenticas-store-sety.vercel.app`, confirmado no ar antes de usar como fonte).
- **6 collections automáticas** por tag via `scripts/create-collections.js`: 4 por categoria (`roupas`, `tenis`, `chinelos`, `bones-acessorios`) + 2 temáticas (`novidades`, `mais-vendidos`) — contagem final bate exato com o catálogo (7 tênis, 5 chinelos, 13 bonés, 12 novidades, 10 mais-vendidos).
- **Logo real** subida via staged upload (`stagedUploadsCreate` → `curl -F` → `fileCreate`), otimizada de 1.4MB→26.6KB (sharp, resize 512×512) antes do upload — referenciada em `config/settings_data.json` como `shopify://shop_images/autenticas-store-logo.png`.
- **Checklist de publicação aplicado de primeira** (lição do Monster Lupas/Valadão Surf): rodei `scripts/publish-all.js` (36 aliases `publishablePublish` numa chamada GraphQL só) publicando os 29 produtos + 6 collections no canal "Loja virtual" logo após criá-los via API — evitou o bug de "produtos somem do site" que aconteceu nas migrações anteriores.
- **Bloqueio de CLI recorrente confirmado de novo:** `shopify theme publish` deu "Looks like you don't have access to this dev store" mesmo com `store auth` funcionando (usado pra `store execute`) — resolvido com `shopify auth logout` + novo login via device-code (mesmo fix do Monster Lupas). Confirma que é padrão da conta/ambiente, não bug pontual — **vale já começar toda migração Shopify futura fazendo esse re-login preventivo antes do `theme publish`.**
- **Tema publicado ao vivo** (`shopify theme publish --force`, id `166462357593`) a pedido explícito do Seven ("suba todo o site dele no ar") — não fiquei em rascunho como fizemos por padrão de cautela em sessões anteriores, pois o pedido já autorizava produção direto.

**Pendência de 1 clique que só o Seven resolve:** a loja nasceu com **Restrição de acesso por senha** ativa (padrão de toda dev store nova do Shopify) — confirmado por `curl` (redirect 302 pra `/password`) e não há mutation na Admin API pra isso (testado, campo inexistente). Desativar em Admin → Configurações → Canais de Vendas → Loja Online → Preferências → desmarcar "Restringir acesso com senha".

## Migração de volta pra 100% código próprio (2026-08-07, EM ANDAMENTO)

Dois dias depois de ir pra Shopify, Seven pediu o caminho inverso: sair da Shopify, checkout 100% em código com Mercado Pago (Checkout Pro) recebendo pagamento direto, admin próprio (CRUD de produtos + visualização de pedidos, "igual Shopify"), tudo no Vercel. Escopo confirmado antes de executar (mudança de arquitetura grande em cliente real, ver [[feedback_confirmar_antes_de_reescrever_producao]]): Shopify será desativada de vez, Checkout Pro (não Transparente), backend completo com banco de dados.

**Construído em `clientes/autenticas-store/site/`:**
- Banco Supabase (`db/schema.sql`: tabelas `products` + `orders`) — catálogo migrado do array estático `js/catalog.js` via `scripts/seed-products.js`; a partir de agora o admin é a fonte de verdade dos produtos.
- API serverless (`api/`): produtos públicos, `checkout/create-preference` (recalcula preço a partir do banco, nunca confia no client), `webhook/mercadopago` (confirma pagamento + baixa estoque por variante), `admin/*` protegido por JWT em cookie (login, CRUD produtos, upload de imagem pro Supabase Storage, pedidos read-only).
- Frontend virou assíncrono: `fetchProducts()` busca da API antes de renderizar home/produto. Carrinho passou a guardar cor e tamanho como campos separados (antes concatenados numa string, o que quebraria o decremento de estoque por variante).
- `checkout.html` novo (dados do cliente + endereço com autopreenchimento por CEP via ViaCEP + resumo do pedido) substituindo o botão "Finalizar no WhatsApp" do carrinho. `retorno.html` trata os 3 status de pagamento.
- `admin/` — painel próprio com login, dashboard de Produtos (CRUD completo, variantes de cor com upload de imagem e estoque) e Pedidos (lista com status de pagamento).
- Banners reais do cliente (pasta `D:\sevendsgn\STREETWEAR\AUTENTICAS STORE\`) comprimidos com sharp (~1.3MB→~70-115KB) e integrados como hero/promo de imagem pura (sem overlay de texto — a arte já tem o texto), substituindo os banners com overlay HTML anteriores.
- SEO: JSON-LD (`ClothingStore` + `Product` por página), OG/Twitter dinâmicos, sitemap.xml gerado dinamicamente do banco (`api/sitemap.js`), robots.txt.

**Pivot: Seven decidiu não usar Supabase** ("configura sem o supabase, só quero 100% comprável via Vercel + Mercado Pago") — removida toda a camada de banco:
- Catálogo voltou a ser array estático em `js/catalog.js` (como era antes da tentativa de banco). Cópia paralela simplificada em `api/_lib/products.js` (CommonJS) usada só pelo backend pra validar preço no checkout sem confiar no client.
- Sem pedido persistido: `create-preference.js` gera um `orderId` (UUID) só pra referência, manda dados do cliente como `metadata` plano (Mercado Pago rejeita objetos aninhados em metadata). Webhook virou só um ack 200.
- **Admin de vendas sem banco**: `api/admin/orders` consulta direto `GET /v1/payments/search` da API do Mercado Pago. Descoberta importante: o Access Token do Seven já tinha histórico de vendas de **outro negócio** dele (peças de moto Yamaha, ferramentas, pesca) — corrigido filtrando só pagamentos com `metadata.customer_name` (só os que passaram pelo checkout da loja), senão o painel misturaria vendas de negócios diferentes.
- Painel perdeu a aba de CRUD de produtos (sem onde persistir edição) — ficou só "Vendas".
- Cada produto ganhou botão **"Comprar Agora"** (checkout direto pro Mercado Pago sem precisar preencher formulário antes — nome/telefone viraram opcionais no backend).

**No ar e validado:** https://autenticas-store-sety.vercel.app — `create-preference` testado com a API real do MP em produção (retorna `init_point` válido), login do admin funcionando, `/api/admin/orders` só lista vendas da própria loja.

**Lição de cache:** primeiro deploy saiu com cache de 24h pra JS/CSS — reduzido pra 5min+stale-while-revalidate, já que o site ainda está em iteração ativa (cache agressivo é pra ativos estabilizados).

**Terceira rodada: pagamento restrito + UI reduzida a 2 CTAs.**
- Excluído boleto (`ticket`) e o método real "Cartão de Débito Virtual CAIXA" (produto do governo/Caixa Tem, não listado em `GET /v1/payment_methods` da conta — precisou excluir o *type* `debit_card` inteiro pra sumir; validado abrindo a tela de pagamento real via Playwright).
- **"Comprar Agora" corrigido pra sempre coletar endereço** antes do Mercado Pago (a v1 pulava isso — sem endereço não dá pra enviar o produto). Item vai por `sessionStorage` até `checkout.html`.
- **Carrinho multi-item removido inteiro**: Seven pediu só 2 botões por produto (Comprar Agora + Comprar pelo WhatsApp), o que tira a razão de existir do "Adicionar à Sacola" — removidos ícone/badge do header, drawer lateral e todas as funções de carrinho em `cart.js` nas 3 páginas. Cada compra agora é de 1 produto por vez.

Credenciais de **produção** do Mercado Pago foram coladas em texto puro no chat pelo Seven — usado só o Access Token (Checkout Pro não precisa do Public Key no client), guardado em `.env` local (gitignored) e nas env vars do Vercel, nunca em código versionado.

## Relacionado

- [[theme-engine-biblioteca]] — tema Lulu Imports usado como base do site estático original
- [[project-cliente-monster-lupas]], [[project_cliente_valadao_surf]] — mesmo playbook de migração Shopify (Dawn + sections customizadas + Admin API)
- Detalhes técnicos completos e lista de pendências: `clientes/autenticas-store/CLAUDE.md`
