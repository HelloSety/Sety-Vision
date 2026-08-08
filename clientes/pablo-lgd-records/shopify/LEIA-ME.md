# LGD Records — Tema Shopify

Tema completo (Liquid/JSON), pronto para upload manual. Réplica fiel do protótipo em `clientes/pablo-lgd-records/site/` (preto/vermelho, Inter, mesmos componentes — essa é a fonte de verdade do catálogo, não `saidas/lgd-records/`), adaptado para o motor de produtos/variantes/checkout nativo do Shopify.

## 1. Subir o tema

1. Use a versão mais recente: [`lgd-records-theme-v5.zip`](lgd-records-theme-v5.zip) (arquivos na raiz do zip, sem pasta extra por cima — pronto pra Shopify aceitar direto). A v3 fica só de histórico/rollback.
2. Shopify Admin → **Loja Online → Temas → Adicionar tema → Carregar arquivo ZIP**.
3. Publique quando revisar no preview.

Se editar qualquer arquivo em `theme/`, gere um zip novo antes de subir de novo (o zip antigo não atualiza sozinho). **Nunca use `Compress-Archive` do PowerShell** — ele grava os caminhos internos com `\` em vez de `/` e a Shopify rejeita o zip. Use `[System.IO.Compression.ZipArchive]` criando cada entrada manualmente com `.Replace('\', '/')` no caminho relativo (é como o v4 foi gerado).

## 2. Importar os produtos

**Correção importante:** a versão anterior deste arquivo dizia que as URLs de imagem no CSV eram baixadas automaticamente pelo Shopify a partir do deploy do Netlify. **Isso estava errado** — testei as URLs depois e elas retornam 404 (o Netlify não serve esses arquivos nesse caminho). Se você já importou o CSV antigo, os 5 primeiros produtos ficaram sem foto por causa disso — é por isso que a loja apareceu com as caixas pretas vazias. A correção agora é: **toda imagem é upload manual**, usando os arquivos em `product-images/<handle>/`. Não confie em nenhuma URL de imagem que eu tiver colocado num CSV antes desta correção.

1. Shopify Admin → **Produtos → Importar** → suba `products.csv` (já está neste mesmo diretório, regerado em 2026-07-05). Isso cria/atualiza os **15 produtos** (preço, variantes e categoria em "Tipo" corretos), mas **sem imagem** — a foto é sempre manual, ver passo 3. Se já tinha importado a versão de 14 produtos, pode reimportar por cima: o handle é o mesmo, o Shopify atualiza em vez de duplicar.

| Produto | Preço | Variantes | Tipo (categoria) |
|---|---|---|---|
| Cueca LGD (Kit 10 unidades) | R$140 | 4 tamanhos × 8 cores | Cuecas |
| Camisa de Compressão LGD | R$70 | 4 tamanhos × 2 cores (branco/preto) | Compressão |
| Regata LGD | R$60 | 4 tamanhos × 2 cores (cinza/branca) | Regatas |
| Camisa Americana LGD | R$70 | 4 tamanhos | Camisas Americanas |
| Camisa Cotton LGD | R$50 | 4 tamanhos × 2 cores (branca/cinza) | Camisas |
| **Camiseta Estampada Preta** (novo design, chegou nas fotos de 03/07) | R$99,90 (placeholder) | 4 tamanhos | Camisas |
| Camiseta "Legado Exclusivo" Roxa | ~~R$119,90~~ R$83,90 | 4 tamanhos | Camisas Antigas |
| Camiseta "Legado Exclusivo" Verde | ~~R$119,90~~ R$83,90 | 4 tamanhos | Camisas Antigas |
| Camiseta "Legado Circle" Preta | ~~R$99,90~~ R$69,90 | 4 tamanhos | Camisas Antigas |
| Camiseta "Legado" Azul Tiffany | ~~R$99,90~~ R$69,90 | 4 tamanhos | Camisas Antigas |
| Camiseta "Legado Chrome" Marrom | ~~R$109,90~~ R$76,90 | 4 tamanhos | Camisas Antigas |
| Camiseta "Legado" Branca | ~~R$99,90~~ R$69,90 | 4 tamanhos | Camisas Antigas |
| Camiseta "Judas Morreu" Marrom | ~~R$109,90~~ R$76,90 | 4 tamanhos | Camisas Antigas |
| Short "LGD" Vermelho | ~~R$79,90~~ R$55,90 | 4 tamanhos | Camisas Antigas |
| Short "LGD" Azul | ~~R$79,90~~ R$55,90 | 4 tamanhos | Camisas Antigas |

**Pendências de preço a confirmar com o Pablo antes de publicar:**
- As 9 "Camisas Antigas" foram marcadas com 30% de desconto (usando o campo nativo "Preço antes do desconto" do Shopify, que já ativa o selo de promoção nos cards automaticamente). Ele disse "as camisas antigas vou colocar barato" mas nunca confirmou um valor exato — 30% foi minha estimativa a partir do que já existia no protótipo. Ajustar em **Admin → Produtos → cada item → Preço / Preço antes do desconto** se ele quiser outro valor.
- **Camiseta Estampada Preta** é um design novo que chegou só em foto no WhatsApp de 03/07 — não tem preço confirmado, usei R$99,90 (mesma faixa da linha "Legado") como placeholder.

2. Para cada produto, abra-o no Admin e arraste as fotos da pasta correspondente em `product-images/<handle>/` (os 15 handles têm pasta própria — a `camisa-estampada-preta/` é nova).
3. **Criar as 8 coleções de categoria** (Admin → Coleções → Criar coleção → tipo "Automática"):

   | Coleção | Condição |
   |---|---|
   | Novidades | Tag é igual a `novidade` |
   | Camisas | Tipo de produto é igual a `Camisas` |
   | Camisas Antigas | Tipo de produto é igual a `Camisas Antigas` |
   | Camisas Americanas | Tipo de produto é igual a `Camisas Americanas` |
   | Compressão | Tipo de produto é igual a `Compressão` |
   | Regatas | Tipo de produto é igual a `Regatas` |
   | Cuecas | Tipo de produto é igual a `Cuecas` |
   | Promoções | Tag é igual a `promocao` |

   Todas as tags/tipos já vêm certos no `products.csv` — a coleção só precisa existir pra aparecer no menu e nos filtros. Depois, em **Personalizar → Header**, adicione essas 8 coleções ao menu de navegação.

### Se você já importou uma versão antiga do CSV

Pode reimportar o `products.csv` novo por cima — os handles são os mesmos, então o Shopify atualiza preço/variantes/tipo em vez de duplicar produto. Só a foto continua manual (passo 2 acima), incluindo pros produtos que já tinham foto antes (nada muda nelas, a menos que você suba fotos novas nas pastas que ganharam imagens extras: `cueca-lgd/`, `camisa-compressao-lgd/`, `regata-lgd/`, `camisa-cotton-lgd/`).

## 3. Criar a página Lookbook

O protótipo tem uma página Lookbook (`saidas/lgd-records/lookbook.html`) com grid de fotos estilo editorial — ela virou uma section própria (`lookbook.liquid`) + template alternativo (`page.lookbook.json`), com as mesmas 12 peças/nomes do protótipo (Legacy Black, Chaos White, Jersey Records, etc.).

1. Shopify Admin → **Páginas → Adicionar página**, título "Lookbook".
2. No campo **Template** (canto direito), escolha `page.lookbook`.
3. Salve. A página já vem com o hero, tira de estatísticas (peças/temporada/drop) e o grid de 12 fotos, igual ao protótipo.
4. Fotos: por padrão usa placeholders (igual o protótipo original, que também usa fotos de banco de imagens genéricas via picsum.photos). Pra trocar por fotos reais do Pablo, abra **Personalizar** na página do Lookbook e clique em cada bloco "Peça do Lookbook" → suba a foto.
5. O link "LOOKBOOK" no menu do topo já aponta para `/pages/lookbook` por padrão (campo configurável em **Personalizar → Header → Link da página Lookbook**, caso o handle da página saia diferente).

## 3.1 Banner do Hero

A section Hero da home não vinha com imagem padrão (o protótipo original também não tinha — só fundo escuro). Agora tem uma arte de capa real: [`banner/hero-capa-lgd.jpg`](banner/hero-capa-lgd.jpg) (a colagem preta com as camisas no fundo de tela vermelha, "Qual legado você vai deixar...").

1. Shopify Admin → **Personalizar** → clique na section **Hero**.
2. Em **Imagem de fundo**, suba o arquivo `banner/hero-capa-lgd.jpg`.

## 4. Configurar no Editor de Tema (Personalizar)

Em **Loja Online → Personalizar → Configurações do tema**:

- **Marca:** logo, favicon, número de WhatsApp (com DDI, só dígitos), Instagram/TikTok
- **SEO:** meta description padrão, código de verificação do Google Search Console
- **Tracking e Conversão:** cole aqui o **GA4 Measurement ID** (G-XXXXXXXXXX) e o **Meta Pixel ID** quando o cliente tiver essas contas — o código já está pronto no tema, só falta o ID

Nenhum desses 3 pontos precisa de código: são campos nativos do tema, editáveis a qualquer momento sem mexer em arquivo.

## 5. Captura de contatos (substituiu o formulário do protótipo estático)

O protótipo em `saidas/lgd-records/` tinha uma splash screen pedindo WhatsApp antes de entrar no site (usava Netlify Forms, porque é um site estático sem backend). **Isso não existe na loja publicada** — e não deveria: gate de conteúdo antes de indexar/converter prejudica SEO e CRO.

No Shopify, todo cliente que compra ou fala pelo WhatsApp já fica registrado nativamente em **Admin → Clientes**, com telefone. Não precisa de mecanismo extra.

**Exceção — a página de senha (ver seção 8):** enquanto a loja estiver em Draft/não publicada, a Shopify já obriga qualquer visitante a passar por uma página de senha antes de ver qualquer coisa — isso é comportamento nativo, não uma decisão nossa, e não afeta SEO porque a loja nem está indexável nesse estado. Como esse muro já existe de qualquer forma, transformei a página de senha padrão (feia, genérica) numa landing de pré-lançamento com captura de WhatsApp — não é um gate novo, é aproveitar um gate que a Shopify já impõe.

## 6. Página de senha premium (pré-lançamento)

Substitui completamente a tela padrão de "Esta loja está protegida por senha" da Shopify por uma landing premium (inspirada na página de senha da Survival Energy que o Pablo mandou de referência — sem copiar identidade, só a ideia de "coming soon" elegante).

**O que ela tem:**
- Logo, imagem de fundo com blur, headline/subheadline configuráveis
- Contagem regressiva (opcional — só aparece se você preencher uma data)
- Campo de senha nativo do Shopify (o "Entrar" realmente desbloqueia a loja — usa `{% form 'storefront_password' %}`, não é decorativo)
- Botão "Falar no WhatsApp" com mensagem automática
- Campo "Digite seu WhatsApp" que salva um Cliente nativo no Admin com a tag `lista-vip-legacy` (Admin → Clientes → filtrar por tag)
- Ícones de Instagram/TikTok e rodapé

**Configurar em Personalizar → Configurações do tema → "Página de Senha (Pré-lançamento)":**
- Imagem de fundo, título, subtítulo
- Data de lançamento (formato `AAAA-MM-DDTHH:mm`, ex: `2026-08-01T00:00`) — deixe em branco pra não mostrar contador
- Mensagem automática do botão WhatsApp

**Verificar depois de publicar:** o campo de WhatsApp usa `contact[phone]` no formulário nativo de cliente — confirme em **Admin → Clientes** se o telefone está sendo salvo corretamente nos primeiros cadastros de teste. Se por algum motivo não salvar, o botão "Falar no WhatsApp" ao lado continua funcionando normalmente (é um link direto, não depende desse formulário).

## 7. O que ficou pronto no código (sem precisar de conta externa)

- SEO on-page: meta title/description por página, Open Graph, Twitter Card, canonical, JSON-LD (Organization, Product, Breadcrumb)
- Performance: lazy loading em imagens de grade/galeria, `fetchpriority="high"` no hero, fontes com `preconnect`, JS com `defer` (vanilla, sem jQuery), CSS/JS enxutos e sem dependências externas. Imagens já saem otimizadas/WebP automaticamente — isso é nativo do CDN de imagens do Shopify (`image_url`), não precisa de nada extra.
- Acessibilidade: skip-link pro conteúdo principal, foco visível em todo elemento navegável por teclado, `aria-expanded` nos accordions, `aria-label` nos ícones/botões do header
- Arquitetura OS 2.0 "Sections Everywhere" de verdade: header e footer são **section groups** (`header-group.json`/`footer-group.json`), não sections fixas — dá pra reordenar ou adicionar blocos acima/abaixo deles direto no Customizer, sem editar código
- Cor de destaque (vermelho do Pix/promoções) configurável em Personalizar → Cores, sem precisar editar CSS
- Newsletter nativa (Shopify Customers, tag "newsletter", sem Mailchimp/terceiros) — já está na home, dá pra mover pra qualquer outro lugar pelo Customizer
- Estrutura: sections/snippets/templates organizados 1 responsabilidade por arquivo, sem arquivo duplicado (o tema de referência da Natália tinha um `templates/product.liquid` morto/duplicado do `product.json` — não repeti esse erro aqui)
- CRO: carrinho em drawer (AJAX, sem sair da página), botão WhatsApp com mensagem pré-preenchida (produto/variante/preço/qtd), acordeão de entrega/trocas/tabela de medidas, produtos relacionados, barra de benefícios (Pix/parcelamento/envio)

## 8. O que só dá pra validar com a loja real no ar

Lighthouse/CLS/LCP reais, indexação no Search Console e eventos de conversão (GA4/Pixel) só existem depois que a loja estiver publicada com domínio próprio — não dá pra auditar isso em arquivos estáticos. Depois do deploy, rode o Lighthouse na URL real e ajuste o que aparecer.
