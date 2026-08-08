# car-photos — fotos reais dos carros

Esta pasta alimenta as seções `DetailGallery` (galeria de detalhes: farol/rodas/lanterna)
e `InteriorShowcase` (interior) das páginas de configurador. Enquanto os arquivos abaixo
não existirem, o site cai automaticamente pro fallback (thumbnail 3D com crop) — nada quebra
se a pasta ficar vazia.

**IMPORTANTE:** essas fotos precisam ser reais (compradas/licenciadas ou fotografadas por
você) do carro de verdade em que cada "Veltra Type" é baseado. Não gerar/baixar via IA
ou scraping de site de imprensa de marca (BMW Press, Porsche Newsroom, Ferrari Media etc.)
— é material com direitos restritos, não licenciado para uso comercial de terceiros.

## Convenção de nome de arquivo

Formato: `{carId}-{shot}.jpg` — 4 arquivos por carro, todos `.jpg`.

| carId | Carro real | Arquivos esperados |
|---|---|---|
| type-01 | BMW X3 M40i | `type-01-headlight.jpg`, `type-01-wheel.jpg`, `type-01-taillight.jpg`, `type-01-interior.jpg` |
| type-02 | Porsche 911 GT3 RS | `type-02-headlight.jpg`, `type-02-wheel.jpg`, `type-02-taillight.jpg`, `type-02-interior.jpg` |
| type-03 | BMW M4 Competition | `type-03-headlight.jpg`, `type-03-wheel.jpg`, `type-03-taillight.jpg`, `type-03-interior.jpg` |
| type-04 | Mercedes-AMG G63 | `type-04-headlight.jpg`, `type-04-wheel.jpg`, `type-04-taillight.jpg`, `type-04-interior.jpg` |
| type-05 | McLaren Artura Spider | `type-05-headlight.jpg`, `type-05-wheel.jpg`, `type-05-taillight.jpg`, `type-05-interior.jpg` |
| type-06 | Ferrari Roma | `type-06-headlight.jpg`, `type-06-wheel.jpg`, `type-06-taillight.jpg`, `type-06-interior.jpg` |
| type-07 | Ferrari Purosangue | `type-07-headlight.jpg`, `type-07-wheel.jpg`, `type-07-taillight.jpg`, `type-07-interior.jpg` |
| type-08 | Ferrari GTC4 Lusso | `type-08-headlight.jpg`, `type-08-wheel.jpg`, `type-08-taillight.jpg`, `type-08-interior.jpg` |
| type-09 | Porsche 911 | `type-09-headlight.jpg`, `type-09-wheel.jpg`, `type-09-taillight.jpg`, `type-09-interior.jpg` |

## Recomendações técnicas

- **headlight / wheel / taillight**: proporção 4:3, crop já enquadrado no detalhe (o CSS aplica `object-cover`, sem crop automático inteligente).
- **interior**: proporção 3:2.
- Comprimir pra web antes de subir (ex: 1600px de largura, qualidade 75-80% já basta — evita JPGs de 10MB do rolo original).
- Basta colocar o arquivo com o nome certo aqui — nenhuma mudança de código é necessária.
