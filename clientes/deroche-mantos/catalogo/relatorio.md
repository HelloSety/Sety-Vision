# Relatório de Importação — Catálogo Deroche Mantos

Gerado em 2026-07-16 a partir de `Catálogo.pdf` (70 páginas, fornecido pelo Seven).

## Resumo geral

| Métrica | Valor |
|---|---|
| Produtos extraídos do PDF | 208 |
| Linhas totais no CSV (produto + variantes) | 320 |
| Produtos com variantes de tamanho | 92 |
| Produtos sem variante (peça única) | 116 |
| Produtos com imagem real extraída | 198 |
| Produtos sem imagem no catálogo original | 10 |
| Produtos com estoque > 0 | 208 |
| Produtos sem estoque (zerado) | 0 |
| Total de unidades em estoque (soma de todas as variantes) | 1088 |
| Produtos duplicados (handle colidiu, corrigido automaticamente) | 0 |
| SEO Title + SEO Description criados | 208 (100%) |
| Handle criado (SEO friendly) | 208 (100%) |
| Descrição HTML criada | 208 (100%) |
| Tags criadas | 208 (100%) |
| Google Shopping (categoria/gênero/idade/condição/disponibilidade) | 208 (100%) |

## Produtos por categoria

| Categoria | Qtd. |
|---|---|
| Perfumes | 55 |
| Camisas Futebol | 46 |
| Streetwear | 36 |
| Óculos | 25 |
| Eletrônicos | 9 |
| Academia | 8 |
| Calçados | 8 |
| Acessórios | 7 |
| Bolas | 4 |
| Mochilas | 4 |
| NBA | 3 |
| Infantil | 2 |
| Bonés | 1 |

## Produtos sem imagem (10)

O PDF original não tinha foto anexada para estes itens — usa um ícone genérico de "sem imagem disponível" no lugar. Esse ícone **não foi copiado** para `/catalogo/imagens/` (seria enganoso apresentá-lo como foto do produto). Ação recomendada: tirar foto real desses itens antes de publicar.

- Amostra Asad Tradicional (`amostra-asad-tradicional`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Amostra Fakhar Gold (`amostra-fakhar-gold`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Amostra Jorge Di Profumo (`amostra-jorge-di-profumo`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Amostra Le Falconé Elegant (`amostra-le-falcone-elegant`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Bayern De Munique Tradicional 2026 (`bayern-de-munique-tradicional-2026`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Camisa Berzerk NFL Marrom (`camisa-berzerk-nfl-marrom`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Camisa Berzerk Urso (`camisa-berzerk-urso`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Corinthians Preta e Laranja (`corinthians-preta-e-laranja`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Perfume Eclaire (`perfume-eclaire`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)
- Portugal Vermelha 2026 (`portugal-vermelha-2026`) — sem foto no catálogo original (PDF usa ícone genérico de "sem imagem" para este item)

## Como as imagens foram extraídas

O PDF tem exatamente 1 foto embutida por produto (208 fotos para 208 produtos, na mesma ordem em que aparecem no catálogo). Foram extraídas via `pdfimages`, convertidas de PNG para JPG (qualidade 90, fundo branco) e renomeadas para `<handle>.jpg`, salvas em `/catalogo/imagens/`.

**Importante sobre o CSV**: a coluna `Image Src` foi deixada em branco de propósito. O Shopify exige uma **URL pública** nessa coluna para importar imagem via CSV — não um caminho de arquivo local. Já tivemos um caso anterior (cliente LGD Records) em que um hotlink para um deploy externo quebrou silenciosamente e os produtos foram importados sem foto. Para evitar isso: depois de importar o CSV (sem imagem), abra cada produto no Admin do Shopify e arraste a foto correspondente de `/catalogo/imagens/<handle>.jpg` — o nome do arquivo já bate com o `Handle` de cada produto, então é rápido de conferir qual foto vai em qual produto. Alternativa mais rápida: se você tiver um token de Admin API da loja, dá para automatizar esse upload também (avisa que eu faço).

## Enriquecimento aplicado (o que não veio pronto do PDF)

O PDF só tinha: nome, referência (usada como SKU), estoque por tamanho e preço. Todo o resto foi **reconstruído**, não copiado:

- **Categoria/Subcategoria/Vendor**: classificados por regras a partir do nome (ex: "Oakley ..." → Óculos/Oakley; "Perfume ..." → Perfumes; nomes de time/seleção → Camisas Futebol)
- **Clube/País, Ano, Cor principal, Gênero**: extraídos do nome por reconhecimento de padrões (clubes/seleções conhecidos, regex de ano, lista de cores, "Feminina"/"Infantil" no nome)
- **Descrição HTML, SEO Title, SEO Description, Tags**: geradas por template específico por categoria (camisa de futebol, streetwear, perfume, óculos, mochila, calçado, acessório de academia, eletrônico, infantil, bola) — não são texto genérico repetido, cada categoria tem sua própria estrutura de diferenciais
- **Handle**: slug SEO-friendly gerado a partir do nome (acentos removidos, minúsculo, hífens)
- **Google Shopping**: categoria mapeada por tipo de produto, gênero/idade inferidos, condição sempre "new", disponibilidade calculada a partir do estoque real

## Limitações conhecidas

- **Preço e estoque são os reais do PDF** — não foram alterados nem estimados.
- **Nomes de clube/seleção nas camisas (ex: "Al-Hilal", "Bayern De Munique", nomes de jogador como "#Neymar Jr.") foram mantidos como estão no catálogo original** — são réplicas não-oficiais, mesmo padrão de nomenclatura usado pelas lojas de referência do nicho (Manto Pro, Vancir Sports).
- **Gênero "Masculino" foi usado como padrão** para itens sem indicação explícita de "Feminina"/"Infantil" no nome — perfumes em especial costumam ser unissex, vale revisar manualmente se for importante para filtros da loja.
- **Peso (Variant Grams)** foi estimado por categoria (não vem do PDF) — ajustar se afetar cálculo de frete.

## Arquivos entregues

```
clientes/deroche-mantos/catalogo/
├── csv/catalogo_shopify.csv       (320 linhas, 30 colunas, pronto para Shopify → Produtos → Importar)
├── json/catalogo.json             (208 produtos, estrutura completa)
├── imagens/<handle>.jpg           (198 fotos reais extraídas do PDF)
├── log/                           (esta pasta — reservada para logs de execução)
└── relatorio.md                   (este arquivo)
```
