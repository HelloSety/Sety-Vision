# Pablo — LGD Records

**Segmento:** Streetwear/moda urbana (marca "Legado") — cultura, música e rua
**Status:** Loja Shopify ("Legacy Company", domínio ldgrecords.com.br) já existe e está com tema em Draft; catálogo real tem 14+ produtos. Protótipo estático de preview atualizado e no ar em **https://legacy-company-lgd.vercel.app** (projeto Vercel dedicado, ver `clientes/pablo-lgd-records/ACESSO.md`)
**Contato do cliente:** WhatsApp (85) 8167-0451

## Incidente 2026-07-05: projeto Vercel compartilhado com outro cliente

`clientes/pablo-lgd-records/site/.vercel/project.json` estava linkado ao MESMO projectId (`prj_P2L6JCLp6BHngSYzCqv45UDXpgdv`, nome "site") que `clientes/natalia-silveira/site/.vercel/project.json`. Ao rodar `vercel deploy --prod` nesta pasta, sobrescrevi a alias de produção `site-one-beta-91.vercel.app` (documentada em memória como o preview da Natália). Revertido com `vercel rollback` (precisou de `--scope sety-studio-s-projects` explícito) e criado um projeto Vercel **novo e isolado** (`legacy-company-lgd`) só para este cliente, com deploy em `https://legacy-company-lgd.vercel.app`.

**Aprendizado crítico:** antes de rodar `vercel deploy --prod` em qualquer pasta `clientes/*/site/`, checar `.vercel/project.json` e conferir se o `projectId` não é compartilhado com outro cliente (`grep -r projectId clientes/*/site/.vercel/project.json` ou similar). Múltiplas pastas literalmente chamadas `site/` facilitam esse tipo de colisão porque o Vercel CLI infere nome de projeto pelo nome da pasta. **`clientes/natalia-silveira/site/.vercel/project.json` continua apontando pro projeto compartilhado "site" — não corrigido ainda, precisa de atenção antes do próximo deploy dela.**

---

## Referência de design/UX: loja "RARI" (Rariorg)

O usuário usa uma loja Shopify real, de outra marca ("RARI"/Rariorg, `rariorgcontato@gmail.com`), como referência de **funcionalidade e UX** — não de produto. Dela vieram os padrões que faltavam no tema da LGD: seletor de tamanho com até 5 opções (P/M/G/GG/XG, já suportado nativamente pois lê `product.options_with_values`), seletor de cor com miniatura de foto no swatch (implementado em `main-product.liquid` via `where: opt_key, value` pra achar a imagem da variante), aviso "Frete grátis a partir de R$X" (novo setting `free_shipping_threshold`), e banner de aceite de cookies/LGPD (`snippets/cookie-consent.liquid`, aparece com atraso e lembra via localStorage). **Os nomes de produto que aparecem na RARI (Se não fosse talento, Fenômeno, Cultura em Movimento etc.) NÃO são produtos da LGD** — são só o catálogo de exemplo da loja de referência. Confirmado explicitamente pelo usuário em 2026-07-04.

## Fonte de verdade do catálogo (IMPORTANTE — várias pastas conflitam)

Existem múltiplas versões do "site LGD" espalhadas pelo projeto e pelo Downloads do Seven, com preços diferentes entre si. **A fonte correta é `clientes/pablo-lgd-records/site/shop.html`** (idêntico ao conteúdo de `Downloads/lgd-final/shop.html` e `Downloads/lgd-store/`), que bate exatamente com os prints que o usuário mostrou como referência. **Não confiar em `saidas/lgd-records/`** — essa pasta é uma redesign posterior que perdeu 9 produtos reais e os substituiu por itens fake de demonstração (nomes tipo "Se não fosse talento", "Fenômeno", preços no padrão X7,70 — nunca existiram de verdade).

## Catálogo real completo (14 produtos)

| Produto | Preço | Variantes | Confirmação |
|---|---|---|---|
| Cueca LGD | R$140 | 4 tamanhos × 5 cores | WhatsApp direto do Pablo (2026-07-03) |
| Camisa de Compressão LGD | R$70 | 4 tamanhos × 2 cores (branco/preto) | WhatsApp direto |
| Regata LGD | R$60 | 4 tamanhos | WhatsApp direto |
| Camisa Americana LGD | R$70 | 4 tamanhos | WhatsApp direto |
| Camisa Cotton LGD | R$50 | 4 tamanhos (estampa "Legado") | WhatsApp direto |
| Camiseta "Legado Exclusivo" Roxa | R$119,90 | 4 tamanhos | Só protótipo (`site/shop.html`) — não confirmado por Pablo |
| Camiseta "Legado Exclusivo" Verde | R$119,90 | 4 tamanhos | Só protótipo |
| Camiseta "Legado Circle" Preta | R$99,90 | 4 tamanhos | Só protótipo |
| Camiseta "Legado" Azul Tiffany | R$99,90 | 4 tamanhos | Só protótipo |
| Camiseta "Legado Chrome" Marrom | R$109,90 | 4 tamanhos | Só protótipo |
| Camiseta "Legado" Branca | R$99,90 | 4 tamanhos | Só protótipo |
| Camiseta "Judas Morreu" Marrom | R$109,90 | 4 tamanhos | Só protótipo |
| Short "LGD" Vermelho | R$79,90 | 4 tamanhos | Só protótipo |
| Short "LGD" Azul | R$79,90 | 4 tamanhos | Só protótipo |

**Pendência real:** Pablo disse "as camisas antigas vou colocar barato" — os 9 produtos acima (Legado Exclusivo/Circle/Chrome/Branca/Azul Tiffany/Judas Morreu/Shorts) são exatamente essas "camisas antigas", mas os preços do protótipo (R$99,90–R$119,90) NÃO são baratos comparado ao resto (R$50–R$140). Confirmar com ele se o preço muda antes de publicar a loja de vez.

## O que existe

1. **Protótipo estático simplificado** — `saidas/lgd-records/` (só 5 produtos + fake demo). Publicado no Netlify: https://legendary-tapioca-ea7cd5.netlify.app/ — **as URLs desse deploy retornam 404 pros assets, não confiar nelas pra hotlink de imagem em CSV.**
2. **Protótipo estático completo (fonte real)** — `clientes/pablo-lgd-records/site/` (14 produtos, preços reais).
3. **Loja Shopify real** — "Legacy Company", domínio `ldgrecords.com.br`, tema `lgd-records-theme` em Draft/password protected.
4. **Tema Shopify entregue** — `clientes/pablo-lgd-records/shopify/`:
   - `theme/` — Liquid completo (SEO on-page, tracking nativo GA4/Meta Pixel/GSC, carrinho AJAX drawer, WhatsApp CTA, seção Lookbook, newsletter nativa, section groups header/footer, cor de destaque configurável)
   - `lgd-records-theme.zip` — zip pronto (gerado via .NET ZipArchive, não Compress-Archive)
   - `products.csv` — agora com **14 produtos** (29 colunas, validado linha a linha). Sem Image Src (aprendemos que hotlink pro Netlify quebra) — toda foto é upload manual.
   - `product-images/<handle>/` — pasta por produto, incluindo os 9 novos
   - `banner/hero-capa-lgd.jpg` — banner do hero (a colagem preta "Qual legado você vai deixar...")
   - `LEIA-ME.md` — passo a passo, incluindo aviso sobre a correção do CSV

## Bugs corrigidos (2026-07-04)

- **Zip do tema rejeitado pelo Shopify** ("missing template layout/theme.liquid"): `Compress-Archive` do PowerShell grava os caminhos internos com `\` em vez de `/`. Corrigido via `[System.IO.Compression.ZipFile]` do .NET forçando `/`. **Nunca usar `Compress-Archive` puro pra zip de tema Shopify.**
- **CSV rejeitado** ("Any value after quoted field isn't allowed"): `\"Legado\"` (escape inválido) em vez de `""Legado""` (aspas dobradas, forma correta em CSV).
- **Imagens quebradas nos produtos já importados**: hotlink pras URLs do Netlify (`legendary-tapioca-ea7cd5.netlify.app/assets/products/...`) retorna 404 — nunca testei a URL antes de colocar no CSV. Corrigido: CSV não usa mais Image Src, upload é sempre manual via `product-images/<handle>/`.
- **Upload de tema via zip não "atualiza"**: subir um zip novo em Admin → Temas cria um tema NOVO, não substitui o existente. Sempre orientar o cliente a apagar o tema antigo/duplicado depois de subir um novo.
- **Página Lookbook estava faltando**: adicionada como section `lookbook.liquid` + template `page.lookbook.json`.
- **Catálogo incompleto**: eu tinha construído tema+CSV baseado só nos 5 produtos de `saidas/lgd-records/`, mas o catálogo real (confirmado pelos prints originais do usuário) tem 14 produtos — a fonte certa era `clientes/pablo-lgd-records/site/shop.html`, que eu não tinha lido a fundo antes.

## Aprendizados

- **Quando há múltiplas pastas/versões do mesmo site espalhadas (Downloads, clientes/, saidas/), sempre ler o HTML de cada candidata e comparar preços/nomes literalmente com os prints que o usuário mostrou como referência — não assumir que a pasta mais "nova" ou mais bem organizada é a fonte de verdade.** Nesse caso `saidas/lgd-records/` (mais recente, minha própria reorganização) tinha MENOS produtos reais que `clientes/pablo-lgd-records/site/` (mais antiga).
- **Nunca hotlinkar imagem de um deploy externo em CSV do Shopify sem testar a URL primeiro** (`WebFetch` resolve isso em segundos). Um 404 silencioso só aparece depois, com o produto já importado sem foto.
- Fotos que o cliente reenvia pelo WhatsApp geralmente já são as mesmas — sempre comparar visualmente antes de tratar como "produto novo".
- Splash/gate de e-mail ou WhatsApp antes de entrar no site prejudica SEO e CRO — não replicar em loja Shopify real (cadastro de cliente já é nativo em Admin → Clientes).
- GA4/Meta Pixel/Search Console: nunca inventar ID — campo nativo no Theme Settings pro cliente preencher depois.

## Atualização 2026-07-05 — catálogo, categorias e preview

- Criado `clientes/pablo-lgd-records/site/catalog.js`: fonte única de produtos/preços/categorias, consumida por `shop.html` e `produto.html` (preço, Pix e parcelamento agora são calculados, não digitados duas vezes).
- Categorias adicionadas com filtro: Novidades, Camisas, Camisas Antigas, Camisas Americanas, Compressão, Regatas, Cuecas, Promoções.
- Tabela oficial de preços aplicada (já batia com a maioria do protótipo): Cueca kit R$140, Compressão R$70, Regata R$60, Americana R$70, Cotton R$50.
- "Camisas Antigas" (9 peças do protótipo antigo) viraram coleção "Promoções" com badge 🔥 e 30% de desconto sobre o preço listado antigo — **preço final ainda não confirmado pelo Pablo**, ver `ACESSO.md`.
- Novas fotos de 03/07 (`Downloads/WhatsApp Unknown 2026-07-03 at 14.55.50/`) integradas: cores extras de cueca, ângulos novos de compressão preta/branca, regata branca/cinza, uma cor cinza nova pra Camisa Cotton, e uma camiseta estampada preta nova (sem preço confirmado).
- Adicionado modal de boas-vindas capturando WhatsApp do visitante (`localStorage`, aparece uma vez só) — só no protótipo estático, **não** na loja Shopify real (decisão mantida: gate prejudica SEO/CRO lá).
- Cada card de produto agora tem botão "Comprar" + botão WhatsApp com mensagem pré-preenchida (nome + preço do produto).

## Atualização 2026-07-05 (2) — tema Shopify: catálogo completo + página de senha premium

- `products.csv` regerado do zero (script Node, não editado à mão): 15 produtos, 100 linhas de variante, sem `Image Src` (upload continua manual — hotlink já provou ser furada antes). Camisas Antigas usam `Variant Compare At Price` = preço antigo, ativando o selo de promoção nativo do Shopify nos cards.
- Novo produto: Camiseta Estampada Preta (design que só existe em foto, sem preço confirmado — R$99,90 é placeholder).
- `camisa-cotton-lgd` e `regata-lgd` ganharam opção "Cor" (antes só tinham Tamanho) pra caber as cores novas das fotos de 03/07, em vez de virar produto duplicado.
- `product-images/`: pastas existentes ganharam fotos novas (cueca com cores variadas, compressão preta/branca ângulo 2, regata branca), mais a pasta nova `camisa-estampada-preta/`.
- Criada página de senha customizada (substitui a padrão da Shopify): `layout/password.liquid` + `sections/main-password.liquid` + `templates/password.json`. Formulário de senha nativo (`storefront_password`, desbloqueia de verdade), botão WhatsApp, captura de WhatsApp via Customer nativo (tag `lista-vip-legacy`, campo `contact[phone]` — **verificar após publicar se salva certo**), contador regressivo opcional (setting de data em branco = escondido). Referência de estrutura: página de senha da Survival Energy (survivalenergy.com.br) mostrada pelo Seven — UX only, sem copiar identidade.
- Rodei `shopify theme check` (linter oficial) — 0 erros no final. Corrigi de brinde 2 erros de JSON pré-existentes em `settings_schema.json` (URLs vazias no bloco `theme_info`) que não eram meus mas estavam lá.
- Zip novo gerado via `System.IO.Compression.ZipArchive` manual (não `Compress-Archive`, que grava `\` e é rejeitado pela Shopify) → `lgd-records-theme-v4.zip`.
- **Ainda não subi nada pro Shopify de verdade** (sem token de API/CLI autenticada nesta máquina) — só preparei os arquivos pra upload manual, conforme o Seven escolheu. Ver `LEIA-ME.md` atualizado com passo a passo, incluindo criação das 8 coleções por Tipo/Tag.

## Atualização 2026-07-05 (3) — reforço visual premium no protótipo (site/)

O Pablo revisou o link e apontou que o pedido de "experiência premium estilo RARI/Survival Energy" tinha ficado só no catálogo/categorias — a parte visual (hero, cards, navbar, animações) não tinha mudado de verdade. Corrigido em `shop.html`/`produto.html`/`index.html`:
- Hero fullscreen (100vh) com Ken Burns (zoom lento no fundo), entrada em stagger no texto, indicador de scroll animado.
- Navbar transparente sobre o hero, vira sólida com blur ao rolar (`position:fixed` + classe `.scrolled` via JS), sublinhado animado nos links.
- Cards: zoom de imagem + lift no hover, sombra, radius — corrigido de brinde um bug real (produtos com uma imagem só ficavam com o card vazio no hover porque `.front{opacity:0}` não tinha `.back` pra mostrar).
- Scroll reveal com stagger por card via IntersectionObserver, barra de progresso de leitura, botão voltar ao topo.
- Página de produto: zoom na galeria ao passar o mouse, entrada fade-in, mais respiro no layout.
- Abertura (index.html): mesma linguagem (Ken Burns, stagger, benefícios, ícone de Instagram).

**Aprendizado:** quando o pedido é "experiência premium tipo [referência X]", isso é sobre o visual/motion em si (hero, hover, transições) — não só sobre organizar catálogo/categoria/preço. Nas próximas rodadas fazer as duas coisas juntas, não só a parte de dados.

## Atualização 2026-07-05 (4) — arquitetura da página de produto e carrosséis

Pablo mandou prints do site/produto da RARI de novo pedindo "igual". Implementei o padrão estrutural/funcional (não o conteúdo) que faltava:
- `catalog.js`: 3 produtos que eram duplicados por cor (compressão preta/branca, regata cinza/branca, cotton branca/cinza) viraram produtos únicos com `variants: [{color, swatch, imgs}]` — mais correto e abre caminho pro seletor de cor de verdade.
- `produto.html`: miniaturas foram pra lateral esquerda da imagem principal (galeria no padrão comum de e-commerce premium), seletor de cor com miniatura de foto (clicar troca a galeria inteira), "Ver mais detalhes" expansível (revela tabela de medidas), aviso de frete grátis, relacionados viraram carrossel com setas em vez de grid fixo de 4.
- `shop.html`: seção de Promoções virou carrossel horizontal com setas (mesmo padrão do relacionados).
- Ids afetados: `camisa-preta-compressao`+`camisa-compressao-branca` → `camisa-compressao`; `regata-cinza`+`regata-branca` → `regata-lgd`; `camisa-cotton-cinza` foi absorvido em `camisa-cotton`. Se algum link antigo com esses ids específicos foi compartilhado, vai cair no fallback (produto padrão) — sem problema, é só um protótipo de preview.

**Nota:** mantive a política de nunca copiar nome/logo/fotos/textos de referências de mercado (RARI, Survival Energy) — só o padrão de layout e interação, que é comum a qualquer loja de streetwear premium. Isso já estava registrado como decisão do próprio Pablo em 2026-07-04.

## Atualização 2026-07-05 (5) — consolidação do design system + UPLOAD_SHOPIFY

- `product-card.liquid` e `theme.css` estavam com CSS duplicado e desatualizado (grid de 4 colunas, botão Comprar/WhatsApp, selo de promoção) — consolidado num único lugar (`theme.css`), card virou link único clicável, sem botões, sem badge, grid de 3 colunas com mais respiro. Mesmo padrão do protótipo estático.
- Criada `clientes/pablo-lgd-records/shopify/UPLOAD_SHOPIFY/` com 44 imagens organizadas e renomeadas (produto-<slug>-<numero>, hero-banner-01, logo-white, colecao-<categoria>-01) prontas pra upload manual — sem token de API configurado, upload automático continua não sendo possível nesta máquina.
- **Não converti pra WebP** — não há ImageMagick/cwebp/sharp instalado neste ambiente. Não é grande perda: o CDN de imagens da Shopify já reencoda pra WebP automaticamente na entrega, independente do formato enviado.
- Zip novo: `lgd-records-theme-v5.zip`, 0 erros no `shopify theme check`.
- Pedido do Pablo era construir um "tema profissional do zero" — na prática o tema já tinha arquitetura correta (sections/snippets/templates/layout/config/locales, section groups, settings schema) de sessões anteriores; o trabalho real desta rodada foi trazer os componentes pra paridade com o protótipo + limpar duplicação, não uma reconstrução do zero.

## Oportunidades futuras

- Confirmar com Pablo o preço final dos 9 produtos "antigos" antes de publicar a loja.
- Depois do deploy real, rodar Lighthouse na URL de produção e ajustar Core Web Vitals se necessário.
- Considerar aplicar o mesmo tema como base reutilizável para outros clientes de streetwear/moda esportiva.

## Atualização 2026-07-10/11 — protótipo virou loja real: domínio, pagamento, admin

O `clientes/pablo-lgd-records/site/` (protótipo estático) deixou de ser só preview — ganhou domínio próprio, pagamento real e virou a loja em produção de fato, em paralelo à loja Shopify (que segue em Draft).

- **Domínio**: `www.ldgrecords.com.br` conectado ao projeto Vercel `legacy-company-lgd` (`sety-studio-s-projects`).
- **Pagamento**: Mercado Pago real. `api/create-preference.js` (Checkout Pro, redirect) + `api/create-pix-payment.js`/`api/check-payment.js` (Pix direto com QR code inline, sem sair do site, com polling de status). Credenciais em `MP_ACCESS_TOKEN` (env var Vercel, nunca no código). **Pix direto só funciona depois que o Pablo ativar uma chave Pix no painel do Mercado Pago** (Configurações → Pix) — sem isso a API retorna erro "Collector user without key enabled for QR render". O checkout normal (Checkout Pro) funciona independente disso.
- **Admin dashboard**: `www.ldgrecords.com.br/admin` — login por senha única (`ADMIN_PASSWORD` env var, atualmente "Revolução Nordestina", mesma do gate de entrada do site — reuso de senha foi escolha do Seven, não uma boa prática de isolamento, mas foi assim que ele decidiu). CRUD completo de produtos com toggle de publicar/despublicar (`active`), CRM simples de leads (WhatsApp do modal de captura + email do Pix), aba de configurações read-only.
- **Backend de dados**: `Vercel Blob` (não Supabase — decisão explícita do Seven após um quase-incidente, ver abaixo). `api/products.js` e `api/leads.js` leem/escrevem JSON no Blob.
- **Autenticação do admin**: cookie HMAC assinado com `ADMIN_PASSWORD` como secret (`api/_auth.js`), sem framework de auth — suficiente pro escopo (só o Pablo/Seven usam).

### Incidente evitado: Supabase compartilhado com Aurora IA

Tentei inicialmente usar Supabase pro admin/CRM. O usuário colou credenciais de um projeto que **não era novo** — era `HelloSety's Project` (org "Sety Vision"), o banco de produção real da Aurora IA (SDR interno da Sety), com leads reais de outros clientes (incluindo dados do próprio Pablo). Um `CREATE TABLE products` chegou a rodar ali, mas como a segunda instrução (`CREATE TABLE leads`) falhou por colisão de nome, a transação inteira foi revertida — nada ficou de fato salvo, sem dano. **Aprendizado crítico**: sempre confirmar visualmente (nome da org/projeto no dashboard) antes de rodar DDL num banco, mesmo quando o usuário já forneceu URL+key — ele pode ter usado sem querer um projeto existente em vez de criar um novo. Depois disso o Seven pediu pra tirar o Supabase da jogada inteiramente e usar só infraestrutura já conectada (Vercel Blob), sem conta nova em lugar nenhum.

### Bug real do Vercel Blob (corrigido)

Sobrescrever repetidamente o **mesmo pathname** (`catalog.json` fixo, `allowOverwrite: true`) deixa esse URL específico com leitura inconsistente na origem por tempo indefinido (testado: 45s+ de defasagem, mesmo com `cacheControlMaxAge` no mínimo permitido de 60s, mesmo direto na origem sem CDN — `x-vercel-cache: MISS` mas conteúdo velho). **Correção**: nunca reescrever o mesmo nome — cada escrita gera um arquivo novo e imutável (`catalog-<timestamp>.json`), sempre lido via `list()` ordenado por `uploadedAt` (essa listagem se mostrou confiável/atual mesmo quando o conteúdo do pathname fixo não era). Blobs antigos são apagados a cada escrita nova pra não acumular lixo. **Se reaproveitar o padrão "Vercel Blob como mini-banco JSON" em outro projeto, já implementar direto com nomes versionados — não usar pathname fixo com overwrite.**
