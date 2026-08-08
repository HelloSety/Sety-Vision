---
name: valadao-surf
description: Cliente Valadão Street Wear — loja multimarcas de streetwear, site estático no tema padrão Sety Studio (Manto Pro + Lulu Imports), catálogo com 44 produtos individuais
metadata:
  type: project
---

# Valadão Surf

**O que é:** cliente novo — loja multimarcas de streetwear/moda urbana (contato salvo no WhatsApp como "Valadao Surf", Instagram [@surf_valadao](https://www.instagram.com/surf_valadao/)). Vende peças de marcas como MCD, Lost, Quiksilver, Chronic, Monkey, Brothas & Cash, Gangster, Kenner, Jordan/Nike, Máquina 62 e Grenich — moletons, jaquetas, bermudas/calças, bonés, chinelos e linha infantil. Apesar do nome "Surf", não é loja de prancha/artigos de praia — é streetwear urbano, confirmado pelos prints de catálogo que o cliente manda pelo próprio WhatsApp (nome, foto, preço por peça).

**Por que existe:** Seven pediu site novo usando como referência visual [usefist.com.br](https://usefist.com.br/) — projeto anterior da Sety Studio que "bugou e saiu do ar". Em vez de reconstruir do zero olhando o site ao vivo, o design foi extraído diretamente do tema Shopify (Liquid) que o Seven já tinha salvo localmente em `C:\Users\seven\Downloads\Surf-Valadao-Tema-Shopify.zip` — esse zip já vinha com copy/textos adaptados pro Valadão Surf (não era mais o tema genérico do Fist Street), só faltavam produtos e fotos reais.

## Estado atual (2026-07-30)

- **Site ao vivo:** https://valadao-surf.vercel.app — projeto Vercel dedicado (`valadao-surf`, escopo `sety-studio-s-projects`), criado do zero sem reaproveitar projeto de outro cliente.
- **Código:** `clientes/valadao-surf/site/` (HTML/CSS/JS puro, sem backend/Shopify real) + `clientes/valadao-surf/ACESSO.md`.
- **Design:** portado 1:1 do tema Liquid de referência — paleta clara (fundo branco/creme `#f7f6f3`, destaque azul-marinho `#16324f`), tipografia Anton itálico (headings) + Inter (corpo), cards com `border-radius: 22px`, mesma estrutura de seções (topbar frete grátis, header com busca, hero, slider de banners, cards de categoria, carrossel de coleções, grid de produtos, benefícios, sobre, FAQ accordion, footer com pagamento/selos, botão WhatsApp flutuante).
- **Catálogo:** 30 produtos reais com 126 fotos do próprio cliente (extraídas de 32 zips de export do WhatsApp em `Downloads/CATALOGO SURF VALADAO/` + `Surf-Valadao-Fotos-Produtos.zip`), preços cruzados entre `Surf-Valadao-Produtos.csv` (formato de import Shopify) e os prints de conversa que o Seven mandou no chat. 2 produtos ("Bermuda Farad Monkey", "Calça Jeans Bad Nocturnal Shadows") têm foto mas preço estimado por falta de confirmação — marcados com badge "Confirmar" no site.
- **Sem carrinho/checkout real** — decisão deliberada para entregar rápido (padrão Sety: HTML/CSS/JS estático). Cada produto abre um modal com galeria de fotos e botão "Comprar pelo WhatsApp" com mensagem pré-preenchida (nome + preço).

## Pendências reais antes de enviar como definitivo

- **Número de WhatsApp real** — hoje é placeholder (`5591999999999`) em `site/assets/js/site.js` (protótipo) e em `shopify/theme/config/settings_data.json` (tema Shopify). Sem isso os botões de compra não funcionam.
- **Logo real** — hoje é só wordmark em texto ("VALADÃO SURF") no protótipo / placeholder do tema de referência no Shopify, sem arte.
- **Banners** (hero, slider, categorias, "sobre") — ainda são os placeholders genéricos herdados do tema de referência, não fotos reais da loja/produtos do cliente.
- Confirmar preço dos 3 produtos estimados (ver seção seguinte).
- Domínio próprio (hoje só `.vercel.app`).

## Tema Shopify entregue (2026-07-30, mesmo dia)

Seven pediu depois "loja funcional, com tamanhos e organização, clean e profissional, tema pra Shopify" — o protótipo estático (`site/`) foi complementado com um **tema Shopify completo e funcional de verdade** em `clientes/valadao-surf/shopify/`, seguindo `MEMORY/PLAYBOOKS/shopify-instalacao-tema.md`:

- **Tema** (`shopify/theme/`, zipado em `shopify/valadao-surf-theme-v1.zip`): mesmo design do protótipo (paleta, tipografia, seções), mas rodando no motor nativo de produtos/variantes/carrinho/checkout do Shopify em vez de HTML estático. Cart drawer AJAX, seleção de tamanho real com estoque por variante, checkout nativo (Pix/cartão/boleto). JSONs validados (removidos os comentários de bloco `/* ... */` que o Shopify só usa em arquivos que ELE MESMO gera — em tema escrito do zero é mais seguro deixar JSON puro) e tags Liquid balanceadas antes de empacotar. Zip empacotado via `System.IO.Compression.ZipArchive` (nunca `Compress-Archive` do PowerShell — grava `\` no caminho interno e a Shopify rejeita).
- **CSV de produtos** (`shopify/produtos/products.csv`): 31 produtos, 138 linhas de variante, com **grade de tamanho real por categoria** (P/M/G/GG para moletons/jaquetas adultas, 38-50 para bermudas/calças, tamanhos por idade pra linha infantil, Único pra boné/chinelo) — gerado por script a partir dos mesmos dados do protótipo, não digitado à mão.
- **Fotos** (`shopify/produtos/imagens/<handle>/`): mesmas 126+ fotos reais do cliente, reorganizadas para upload manual no Admin (Image Src fica vazio no CSV de propósito — sem token de Admin API não tem como subir pro CDN da loja via import).
- **Coleções**: não vêm no CSV (limitação real do formato Shopify) — 6 coleções automáticas por tag (`moletons`, `jaquetas`, `bermudas-calcas`, `bones`, `chinelos`, `infantil`) precisam ser criadas manualmente no Admin, passo a passo no `LEIA-ME.md`.

**Produto descoberto faltando durante a montagem do CSV:** comparando as pastas de fotos reais (31) com o catálogo que eu tinha montado (30), sobrou uma pasta sem produto: `bermuda-pixa-in` — tinha foto real mas não tinha entrada no catálogo. Adicionado como 31º produto (preço R$220 vindo do print "Bermudas balão PIXA IN e BROTAS CASH — 220,00", marcado como estimado) nos dois lugares (protótipo `site/assets/js/products.js` e CSV do tema), e o protótipo estático foi republicado no Vercel pra refletir. **Lição:** sempre cruzar a contagem de pastas de foto vs. itens do catálogo antes de considerar o catálogo "completo" — é fácil um item ficar de fora silenciosamente numa extração manual de 30+ produtos.

**3 produtos com preço estimado** (badge/tag `preco-a-confirmar`): Bermuda Farad Monkey, Calça Jeans Bad Nocturnal Shadows, Bermuda Balão Pixa In.

**Ainda não perguntado/confirmado:** se o cliente já tem loja Shopify criada (`xxx.myshopify.com`) ou token de Admin API — sem isso, tema e CSV ficam prontos pra upload manual mas ninguém confirmou onde publicar de fato.

## Decisão: fica 100% no Vercel por enquanto

Seven confirmou que a operação real vai ficar no protótipo estático (Vercel), não no Shopify — o tema Shopify continua entregue e pronto em `shopify/` para quando for necessário, mas não é o caminho ativo agora. Como consequência, adicionei **seleção de tamanho real no protótipo estático** (que só existia no CSV/tema Shopify até então): cada produto no modal agora mostra a grade de tamanho certa (P/M/G/GG, numérico 38-50, ou por idade na linha infantil) e o tamanho escolhido entra automaticamente na mensagem do WhatsApp ao clicar "Comprar". Alterações em `site/assets/js/products.js` (campo `sizes` por produto) e `site/assets/js/site.js` (render + estado do tamanho selecionado no modal), republicado em produção.

## Reforma completa de tema (2026-08-03)

Seven pediu pra refazer o site inteiro igual a [luluimports.com.br](https://luluimports.com.br/) ("faça 100% igual, nem que troque o tema") — trocado o tema de referência de usefist.com.br para o padrão fixo Sety Studio (Manto Pro + Lulu Imports, ver [[theme-engine-biblioteca]] e a skill `/theme-engine`). Também virou o nome de exibição da marca: o logo real do cliente (tubarão + wordmark) diz **"Valadão Street Wear"**, não "Valadão Surf" — trocado em todo o site (título, header, footer), mantendo `valadao-surf` só como slug/pasta interna.

- **Paleta**: preto + amarelo `#FED146` (troca do azul-marinho `#16324f` anterior) — bateu direto com os banners reais que o cliente/Seven mandou, sem precisar inventar cor.
- **Banners reais aplicados**: 4 arquivos vindos de `D:\sevendsgn\STREETWEAR\SURF VALADAO\` (1-4.png) — hero "Sejam Muito Bem Vindos" e banner de coleção "Bonés Premium", já prontos no estilo Lulu Imports (grafite amarelo, still de produto) com o logo do cliente aplicado pelo designer. Confirma que o pipeline de design já roda fora do Claude Code (Photoshop) e os PSDs (`1.psd`, `2.psd`, 65-73MB) ficam como fonte editável.
- **Estrutura nova da home**: barra de anúncio giratória, header sticky, hero, carrossel circular "Compre por Modelo" (Lulu real usa isso em vez de cards grandes de categoria), carrossel "Mais Vendidos", banner de coleção, mais 2 carrosséis (Moletons, Bermudas & Calças), newsletter, footer.
- **Home dividida do catálogo**: a pedido do Seven ("tem muito produto na home, deixa organizado") — o catálogo completo (44 produtos com filtro) saiu da home e virou página própria `catalogo.html`, que aceita `?filtro=categoria` na URL vindo de qualquer link (nav, footer, carrossel "Compre por Modelo", banners de coleção). A home ficou só com 3 coleções em carrossel + CTA "Ver Catálogo Completo".
- **Produtos separados por modelo/cor** (a pedido do Seven, "não é pra misturar modelo diferente num produto só"): 3 produtos que empacotavam várias cores/modelos numa entrada só (cada foto = um modelo diferente, não ângulos do mesmo produto — confirmado abrindo as fotos reais uma a uma) foram quebrados em produtos individuais: chinelo Kenner (1→5 cores), bermuda basquete Jordan (1→5: 3 Lakers + 2 Jordan Jumpman), bombojaco infantil Gangster (1→2: marrom + azul-marinho). Catálogo foi de 31 para 44 produtos. `moletom-canguru-quiksilver-3-cabos` ficou como estava — as 4 fotos são still-life de grupo (várias peças na mesma cena), sem enquadramento individual por cor, não dava pra separar com qualidade sem foto nova do cliente.
- **Detalhes finos ajustados contra prints reais do Lulu Imports** que o Seven mandou: ícones dos 4 blocos de benefício viraram amarelos (estavam pretos), cards do carrossel de produto ganharam os círculos de tamanho acima do preço (fieldade ao card real do Lulu).
- **Pendência ainda aberta — logo oficial**: o cliente mandou o logo (tubarão + "Valadão Street Wear", preto sobre branco) só colado direto no chat, nunca como arquivo salvo em disco — confirmado que não existe em nenhuma pasta relacionada (nem em `D:\sevendsgn\STREETWEAR\SURF VALADAO\`, só aparece embutido dentro dos banners já renderizados). Ver [[feedback_imagens_coladas_no_chat_sem_arquivo]]. Seven confirmou que vai salvar o arquivo original e passar o caminho — até lá, o header/footer usam wordmark em texto estilizado, e um crop aproximado (`assets/logo/logo-white-placeholder.png`, extraído de dentro do banner) existe como referência mas não é o asset final.
- **Tema Shopify não foi tocado nessa rodada** — `shopify/` continua no catálogo de 31 produtos e tema antigo; precisa sincronizar antes de virar canal ativo de novo (hoje o ativo é só o protótipo estático no Vercel).

## Rodada 2 da reforma: categorias reais, carrinho e polimento de design (2026-08-03, mesmo dia)

Seguindo a reforma de tema, o Seven mandou mais uma leva de assets prontos e pediu funcionalidades novas na mesma sessão:

- **6 artes de categoria reais** (`D:\...\CATEGORIAS\1-6.png`, 620×715, uma por categoria: moletons/jaquetas/bermudas/bonés/chinelos/infantil) — cada uma já vem com logo, título e CTA "Ver Modelos" embutidos pelo designer. Substituíram os círculos genéricos do carrossel "Compre por Modelo" por cards retangulares com a arte completa (mudança de círculo pra card retangular, já que a arte não precisa mais de label de texto separado).
- **Carrinho de compras** (a pedido explícito: "fazer vários produtos juntos pra acumular e poder comprar bastante produto") — localStorage puro (`CART_KEY = 'valadao_cart'`), ícone no header com badge de contador, drawer lateral com itens/qtd/subtotal, botão "Adicionar ao Carrinho" no modal do produto (mantendo o "Comprar direto" como atalho pra 1 item só), e "Finalizar Pedido no WhatsApp" que monta uma única mensagem com todos os itens acumulados. Continua sem backend real — o "checkout" ainda termina em WhatsApp, só que agora agrega o pedido inteiro antes de enviar.
- **Badge de desconto visual** ("-10% NO PIX", preto/amarelo) no canto das fotos de produto (grid + carrossel) — antes o desconto só aparecia como texto pequeno abaixo do preço.
- **Logos reais de pagamento**: baixados do Wikimedia Commons (Visa, Mastercard, Elo, Pix — fontes oficiais/domínio público de marca, uso legítimo pra indicar meios de pagamento aceitos) e aplicados em `assets/pagamento/*.svg`, substituindo os SVGs desenhados à mão que existiam antes. Boleto continua como badge de texto (não existe uma "marca boleto" única no Brasil).
- **Revisão de design via `/web-design-commander`** contra os templates de referência (`tema-lulu-imports.md`, `tema-esportivo.md`): padronizado aspect-ratio de foto de produto para 3:4 (era 4:5/0.85, inconsistente) em todo o site (grid, carrossel, modal), badge "Mais Vendido" reforçando a seção que já tinha esse nome. Gaps identificados que **dependem do Seven/cliente pra fechar** (não dá pra resolver sem informação real): número de WhatsApp ainda placeholder, logo oficial ainda pendente de arquivo, e falta prova social real (depoimentos/números verdadeiros — deliberadamente não inventei métricas falsas tipo "+5000 clientes", isso seria propaganda enganosa).
- Espaçamento entre seções da home corrigido: todas as seções tinham `padding-top:0` inline sistemático (herdado da reforma anterior), deixando tudo colado sem respiro — removido, voltou ao padding padrão de 68px do `.section`.

## Loja Shopify colocada no ar (2026-08-05)

Seven pediu pra subir o site na Shopify "igual ao Vercel" (tema + produtos + coleções + banners), avisando que ia deixar o Chrome aberto pra autenticação. Ao investigar, a loja **`v1aqmx-ym.myshopify.com`** ("Valadão Street Wear") já existia com o tema Liquid (`clientes/valadao-surf/shopify/theme/`, atualizado nos arquivos locais em 2026-08-05 pela manhã) publicado como tema principal, os 44 produtos reais e as 6 coleções (moletons/jaquetas/bermudas-calcas/bones/chinelos/infantil) já criados via Admin API com fotos anexadas — trabalho de uma sessão anterior não capturada neste arquivo nem sincronizada via `sync-memory.js`. O site ao vivo, porém, mostrava carrosséis vazios e os 6 cards de "Compre por Modelo" repetindo a mesma arte "Infantil".

**Causa raiz (mesmo padrão já visto em [[project_cliente_monster_lupas]]):** produtos e coleções criados via `productSet`/`collectionCreate` nunca tinham sido publicados no canal "Loja virtual" (`publishablePublish` não é automático nessas mutations). Sem publicação, o objeto global `collections` do Liquid não enxerga a coleção — `category-cards.liquid` cai no `case`/`else` (arte "infantil" pra todos os 6 cards) e `featured-collection.liquid` renderiza 0 produtos.

**Correção:** autenticado o CLI (`shopify store auth --store v1aqmx-ym.myshopify.com`, token já existia de sessão anterior válido até 2026-08-06 — só precisou merge de escopos novos `read/write_themes`, `read/write_publications`, `read/write_online_store_pages/navigation`; um 1º retry bateu em "porta 13387 em uso" por processo travado, resolvido esperando liberar). Rodada uma mutation em lote (50 aliases `publishablePublish` numa única chamada, produto+coleção, `Publication` "Loja virtual" `gid://shopify/Publication/197230559385`) via `shopify store execute --allow-mutations --query-file`. Validado por `curl` direto no storefront público: os 6 cards agora mostram cada arte de categoria certa (`cat-moletons`, `cat-jaquetas`, `cat-bermudas-calcas`, `cat-bones`, `cat-chinelos`, `cat-infantil` — 1 ocorrência cada), "Coleção Moletons"/"Coleção Bermudas & Calças" com produtos reais, hero e banner de coleção com as artes reais (`banner-welcome-*`, `banner-catalogo-*`), menu com link pras 6 coleções. 44 produtos confirmados sem duplicata (bate com a contagem de `site/assets/js/products.js`).

**Padrão a repetir sempre que "o tema/produtos existem mas a home aparece vazia/com placeholder" numa loja Shopify:** antes de suspeitar de bug no Liquid ou reconstruir algo, checar primeiro se produto/coleção foi publicado no canal certo (`resourcePublicationsV2` ou tentar `publishablePublish` direto) — é a causa mais comum e mais rápida de corrigir, e já aconteceu 2x (Monster Lupas e Valadão).

**Pendências reais que só o Seven resolve (inalteradas, confirmadas nos settings ao vivo):**
- WhatsApp: `whatsapp_number` no `settings_data.json` do tema ainda é o placeholder `5591999999999`.
- Logo real: ainda não existe arquivo (mesma pendência de sempre, ver [[feedback_imagens_coladas_no_chat_sem_arquivo]]) — header usa wordmark em texto.
- Pagamentos (Mercado Pago/Pix/cartão) e sair do modo "preview"/lançar o plano da loja — configuração manual no Admin, fora do que a Admin API cobre.
- Seção "Sobre" ainda com `about-model.jpg` genérico (não é dos banners reais aplicados nas outras seções).

## Lição para outras extrações de catálogo por WhatsApp

Quando o cliente manda catálogo por print/zip de conversa do WhatsApp, os nomes de arquivo exportado (`Surf-Valadao-Produtos.csv`, `Surf-Valadao-Fotos-Produtos.zip`) podem indicar produto errado à primeira vista — aqui os nomes de produto (MCD, Lost, Apocalipse etc.) pareciam de outro projeto (streetwear "Fist Street") até cruzar com os prints reais da conversa "Valadao Surf" e confirmar que era o catálogo certo. Vale sempre cruzar a fonte estruturada (CSV/zip) com uma prova visual direta (print, foto) antes de assumir erro ou seguir cego.
