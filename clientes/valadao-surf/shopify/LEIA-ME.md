# Valadão Surf — Tema Shopify

Tema completo (Liquid/JSON), pronto para upload manual. Réplica fiel do design de referência (usefist.com.br) já adaptado para o catálogo real da Valadão Surf, rodando no motor de produtos/variantes/carrinho/checkout **nativo do Shopify** — diferente do protótipo em `clientes/valadao-surf/site/` (HTML estático sem backend), aqui o carrinho, os tamanhos e o checkout são funcionais de verdade.

## 1. Subir o tema

1. Use [`valadao-surf-theme-v1.zip`](valadao-surf-theme-v1.zip) (arquivos na raiz do zip, sem pasta extra por cima — pronto pra Shopify aceitar direto).
2. Shopify Admin → **Loja Online → Temas → Adicionar tema → Carregar arquivo ZIP**.
3. Publique quando revisar no preview (Temas → ⋮ → Publicar).

Se editar qualquer arquivo em `theme/`, gere um zip novo antes de subir de novo (o zip antigo não atualiza sozinho). **Nunca use `Compress-Archive` do PowerShell** — grava os caminhos internos com `\` e a Shopify rejeita o zip com erro `missing template "layout/theme.liquid"`. Use `[System.IO.Compression.ZipArchive]`, criando cada entrada manualmente com o caminho relativo convertido pra `/`.

## 2. Importar os produtos

1. Shopify Admin → **Produtos → Importar** → suba [`produtos/products.csv`](produtos/products.csv). Isso cria os **31 produtos** com preço, tipo e **variantes de tamanho reais** (não é "tamanho único fictício" — cada produto já vem com a grade de tamanho certa: P/M/G/GG para moletons e jaquetas adultas, 38 a 50 para bermudas/calças, tamanhos por idade para a linha infantil, Único para boné/chinelo). Sem imagem — foto é sempre upload manual, ver passo 2.
2. Para cada produto, abra-o no Admin e arraste as fotos da pasta correspondente em [`produtos/imagens/<handle>/`](produtos/imagens/) — os 31 handles têm pasta própria com as fotos reais que o próprio cliente mandou (3 a 5 fotos por produto).
3. **Criar as 6 coleções de categoria** (Admin → Coleções → Criar coleção → tipo "Automática", condição "A tag do produto é igual a..."):

   | Coleção (título exato) | Condição | Handle esperado |
   |---|---|---|
   | Moletons | Tag é igual a `moletons` | `moletons` |
   | Jaquetas | Tag é igual a `jaquetas` | `jaquetas` |
   | Bermudas & Calças | Tag é igual a `bermudas-calcas` | `bermudas-calcas` |
   | Bonés | Tag é igual a `bones` | `bones` |
   | Chinelos | Tag é igual a `chinelos` | `chinelos` |
   | Infantil | Tag é igual a `infantil` | `infantil` |

   **Importante:** os cards de categoria da home e o menu principal referenciam a coleção pelo **handle** (gerado automaticamente a partir do título). Depois de criar cada coleção, confira em Admin → Coleções → (a coleção) → SEO → "Editar site URL" se o handle bate exatamente com a coluna acima — principalmente "Bermudas & Calças", que pode virar algo diferente de `bermudas-calcas` dependendo de como o Shopify trata o "&". Se vier diferente, edite o handle manualmente.
   
   Todas as tags já vêm certas no `products.csv` — a coleção só precisa existir com o handle certo pra aparecer nos cards da home e nos filtros.

4. Em **Personalizar → Header**, adicione as 6 coleções ao menu de navegação (`main-menu`).

## 3. Fotos e banners institucionais (hero, categorias, "sobre a loja")

Diferente das fotos de produto (que precisam de upload manual, ver passo 2), os banners institucionais **já vêm embutidos no tema** (`assets/banner-*.jpg`, `assets/cat-*.jpg`, `assets/about-model.jpg`) e aparecem automaticamente assim que o tema é publicado — nenhuma ação extra necessária. **Só que hoje são os placeholders genéricos herdados do design de referência (usefist.com.br), não fotos reais da loja/produtos do Valadão Surf.** Pra trocar por uma foto real, abra **Personalizar** na seção (Hero, Cards de Categoria, Sobre a Loja, Slider de Banners) e use o `image_picker` correspondente — o placeholder continua como fallback automático em qualquer campo que ficar vazio.

## 4. Configurar no Editor de Tema (Personalizar → Configurações do tema)

- **Identidade da loja:** logo (hoje sem arquivo — o header usa `logo-white.png`/`logo-black.png` de fallback, que também são placeholders do tema de referência), favicon, link do Instagram (já vem preenchido com `https://www.instagram.com/surf_valadao/`, o Instagram real do cliente).
- **Contato e WhatsApp:** número do WhatsApp — **hoje está com o placeholder `5591999999999`** (mesmo usado no protótipo estático). Trocar pelo número real antes de publicar, senão o botão flutuante e os links de "comprar pelo WhatsApp" da página de produto não funcionam.
- **Barra de topo / Cores:** já vêm com os valores usados no protótipo aprovado (fundo branco, destaque azul-marinho `#16324f`) — mexer aqui só se quiser mudar a identidade visual.

## 5. O que já vem pronto e funcional (nativo do tema, sem precisar de app extra)

- **Carrinho em drawer (AJAX)** — adicionar, remover, ajustar quantidade, sem sair da página (`assets/theme.js`, usa a Cart API nativa do Shopify: `/cart/add.js`, `/cart/change.js`, `/cart.js`).
- **Seleção de tamanho na página de produto** — grade de tamanho real por produto (`main-product.liquid`), tamanho esgotado aparece desabilitado/riscado automaticamente com base no estoque de cada variante.
- **Checkout nativo do Shopify** — Pix, cartão, boleto conforme os métodos de pagamento habilitados na loja (Admin → Configurações → Pagamentos). Isso não existia no protótipo estático (lá era só "comprar pelo WhatsApp").
- Botão "Prefere comprar direto pelo WhatsApp?" continua disponível em cada produto, com mensagem pré-preenchida (nome do produto).
- FAQ accordion, slider de banners com autoplay/swipe, benefícios, seção institucional, footer completo com selos e formas de pagamento.

## 6. O que só dá pra verificar com a loja publicada de verdade

Checkout completo ponta a ponta, cálculo de frete real, emissão de nota, contas de cliente, busca funcional, sitemap.xml/robots.txt, velocidade de carregamento real — tudo isso é nativo da plataforma Shopify e só existe depois que a loja está publicada com produtos reais e configuração de frete/pagamento feita no Admin. Não dá pra simular isso a partir dos arquivos do tema.

## Pendências reais antes de publicar de verdade

- **Número de WhatsApp real** (placeholder ativo hoje, ver seção 4).
- **Logo real** — hoje é só o placeholder do tema de referência.
- **Banners/fotos institucionais reais** (hero, categorias, sobre) — ver seção 3.
- **2 produtos com preço estimado** (mesma ressalva do protótipo estático): "Bermuda Farad Monkey" e "Calça Jeans Bad Nocturnal Shadows" — têm foto real mas o preço não estava confirmado nas fontes disponíveis (tag `preco-a-confirmar` no CSV).
- **Confirmar se já existe loja Shopify criada** (`xxx.myshopify.com`) — sem isso, este tema/CSV ficam prontos mas não há onde publicar. Ver playbook interno `MEMORY/PLAYBOOKS/shopify-instalacao-tema.md`, seção 0, para o passo a passo de gerar um token de Admin API caso quiram que a Sety Studio suba tudo diretamente (imagem + tema + coleções) em vez de manual.
