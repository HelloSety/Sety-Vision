# UPLOAD_SHOPIFY

Imagens organizadas e renomeadas para upload manual no Admin da Shopify (sem token de API configurado nesta máquina, upload automático não é possível — ver LEIA-ME.md principal).

## Estrutura

- **Produtos/** — uma imagem por arquivo, nome `produto-<slug>-<numero>.jpg`. O `<slug>` corresponde ao handle do produto no `products.csv` (ex: `produto-cueca-lgd-01.jpg` → produto `cueca-lgd`). Suba na aba de imagens de cada produto no Admin.
- **Hero/** — imagem de fundo da section Hero da home.
- **Banners/** — banner editorial usado entre seções da home.
- **Colecoes/** — uma imagem por categoria, para a seção de tiles/coleções.
- **Logo/** — logo em SVG e PNG.
- **Footer/** — reservada para logo/ícones do rodapé (vazia por enquanto — o footer atual usa a mesma logo de Logo/).
- **Senha/** — imagem de fundo da Página de Senha (pré-lançamento). Suba em Personalizar → Configurações do tema → "Página de Senha (Pré-lançamento)" → Imagem de fundo.

## Sobre conversão para WebP

Não converti as imagens para WebP nesta pasta — não há ferramenta de conversão de imagem instalada neste ambiente (sem ImageMagick/cwebp/sharp). Isso não é um problema prático pro Shopify: o CDN de imagens da Shopify (`image_url`) já reencoda e serve automaticamente em WebP pros navegadores que suportam, não importa o formato original do arquivo enviado. Pré-converter manualmente teria baixo retorno aqui.

## Nomenclatura

Todos os arquivos seguem `tipo-descricao-numero.extensao`, sem nomes genéricos (IMG_xxxx, Screenshot, photo).
