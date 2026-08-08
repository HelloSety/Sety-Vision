---
name: fist-street
description: Cliente Fist Street — e-commerce de moda/streetwear, loja Shopify (fist-street.myshopify.com), site publicado em usefist.com.br. Tema conectado via Shopify CLI local.
metadata:
  type: project
---

# Fist Street — Acesso rápido

Cliente: Fist Street
Plataforma: **Shopify**
Loja (admin): https://admin.shopify.com/store/fist-street
Domínio público: https://usefist.com.br/
Handle da loja: `fist-street.myshopify.com`

## Acesso via CLI

Shopify CLI (v4.5.2) já autenticado nesta máquina — login já estava configurado, sem necessidade de novo `shopify auth login`.

**Tema live puxado localmente:** `clientes/fist-street/site/`
- Tema: "Fist Street" — id `150185050294` — role `live`
- Editor: https://fist-street.myshopify.com/admin/themes/150185050294/editor

**Outros temas na loja (não live):**
| Tema | ID | Role |
|---|---|---|
| Horizon | 150099951798 | unpublished |
| ela-4-0 | 150100115638 | unpublished |
| warehouse-3d | 150100345014 | unpublished |
| Fist Street - banners novos | 150197731510 | unpublished |

## Comandos úteis (rodar dentro de `clientes/fist-street/site/`)

```bash
# Puxar alterações mais recentes da loja (antes de editar, pra não sobrescrever)
shopify theme pull --store=fist-street.myshopify.com --theme=150185050294

# Rodar preview local com hot reload
shopify theme dev --store=fist-street.myshopify.com --theme=150185050294

# Subir alterações locais pro tema live
shopify theme push --store=fist-street.myshopify.com --theme=150185050294
```

**Cuidado:** `theme push` no tema live (150185050294) altera a loja em produção — sempre confirmar com o Seven antes de fazer push, mesmo em alterações pequenas.

## Histórico

**2026-07-31 — Conexão inicial:** Seven pediu para conectar via CLI ao Shopify da loja para viabilizar alterações. Pasta `clientes/fist-street/site/` criada, tema live puxado com sucesso.

**2026-07-31 — Redesign de home e cards (publicado no tema live):** Igor (cliente) mandou uma sequência de prints do WhatsApp com referências de outra loja (concorrente "Imports HL") pedindo pra deixar o site parecido. Implementado e publicado:
- **Card de produto** (`snippets/product-card.liquid`): badge agora mostra "X% OFF" (só aparece se o produto tiver "comparar a preço" configurado no admin — nenhum produto tem isso hoje), ícone de favoritar (♥) no canto superior direito com wishlist salva em localStorage (sem precisar de conta/app extra), preço atual + preço "de" riscado na mesma linha, texto de parcelamento "em até 12x de R$ X".
- **Categorias em círculo com scroll lateral** (`sections/collections-row.liquid`, reaproveitado — já existia pronto no tema, só faltava estar ligado na home): substituiu os cards retangulares estáticos. Editável por bloco no tema (coleção, nome, imagem opcional).
- **Fileiras de produto com scroll horizontal**: nova opção "Scroll horizontal" no schema do `featured-collection.liquid` (default ativado). Home reorganizada em 2 fileiras por categoria: "Bermudas" (coleção Shorts, 4 produtos) e "Conjuntos" (coleção Outros, 4 produtos) — são as duas únicas coleções com estoque real hoje.
- **Botão "Comprar"**: botão principal (`.btn-primary`, usado em Adicionar ao Carrinho / Finalizar Compra) ganhou gradiente e o texto do botão de produto virou "Comprar". Mantive a cor verde neon da marca (identidade visual do site inteiro) em vez do azul do print de referência — copiar a cor azul quebraria a identidade visual, mas o efeito gradiente/destaque do botão foi aplicado.
- Validado com `shopify theme check` (0 erros, só warnings de performance pré-existentes) antes do push. Publicado direto no tema live com aprovação do Seven.

**2026-07-31 — Vários ajustes finos + bug real corrigido:** sessão longa de idas e voltas com o cliente Igor mandando prints de referência (loja concorrente "Imports HL") via WhatsApp. Resumo do que ficou definitivo:
- **Bug real encontrado e corrigido:** `.card-img` é uma tag `<a>` (inline por padrão) e faltava `display:block` — isso fazia o `aspect-ratio` e o `height:100%` da imagem serem ignorados pelo navegador, deixando a foto do produto alta/não recortada e empurrando preço+botão pra fora da área visível em telas menores. Esse era o bug real por trás de várias reclamações de "produto estranho"/"sem preço aparecendo". Corrigido com uma linha de CSS.
- **Botão "Comprar":** depois de alternar entre verde (minha sugestão inicial) e azul (pedido do cliente) mais de uma vez, ficou definido em **degradê verde escuro → verde neon** (cor da marca), texto branco com leve sombra pra legibilidade nas duas pontas do gradiente.
- **Cards de produto:** cantos totalmente retos (sem `border-radius`) — pedido explícito do cliente, "tem que ser quadrado".
- **Setas de navegação das fileiras:** corrigido bug onde ficavam flutuando longe dos cards quando a fileira tinha poucos produtos (só 4) — wrapper agora encolhe pro tamanho real do conteúdo (`width:fit-content`) e as setas somem via JS quando não há overflow pra rolar.
- **Página de produto (PDP):** galeria de miniaturas movida de baixo da foto pra uma coluna vertical à esquerda da imagem principal (`.product-media` virou flex row, `order:-1` nas miniaturas), imagem principal e miniaturas também com cantos retos. Em mobile volta pro empilhado (miniaturas em linha horizontal abaixo da foto).
- Cada mudança validada com `shopify theme check` (0 erros sempre) antes do push, e confirmada direto no CSS/HTML servido via `curl` (bypass de cache) quando havia dúvida sobre se o problema era bug real ou cache do navegador do cliente.

**Nota operacional:** Playwright MCP ficou indisponível a sessão inteira (browser compartilhado em uso pela sessão do Seven) — toda verificação de "será que publicou certo" foi feita via `curl` direto no HTML/CSS servido, não por screenshot. Funciona bem pra confirmar que o código está correto no servidor, mas não substitui ver a página renderizada — pedir pro Seven confirmar visualmente após um hard refresh (Ctrl+Shift+R) quando houver dúvida.

**2026-08-01 — Categorias: círculo → quadrado com canto arredondado:** Seven pediu pra tirar o formato totalmente redondo das categorias da home. `.collection-circle` (`assets/theme.css`) alterado de `border-radius:50%` para `border-radius:22px` (mesmo raio usado nos `.cat-card`, pra manter consistência visual). Validado com `shopify theme check` (0 erros) e confirmado via `curl` direto no CSS servido em produção antes de fechar. Push feito com `--allow-live` (CLI pede confirmação interativa por padrão nesse tema, que não funciona em sessão não-interativa).

## Pendências reais (dependem de dado/decisão do cliente, não é só código)

1. **Nenhum produto tem preço "de/por" configurado** — os badges "% OFF" só vão aparecer quando o Igor configurar "Comparar a preço" em algum produto no admin Shopify.
2. **Camisetas, Calças e Sneakers estão com 0 produtos** — só existem 4 Bermudas (coleção Shorts) e 4 Conjuntos Syna (coleção Outros) cadastrados hoje. O pedido de "4 camisa, 4 shorts" na home não dá pra fazer com Camisetas até ter produto real cadastrado — a seção de "Grid de Coleção" já está pronta pra apontar pra Camisetas assim que existir estoque (é só trocar a coleção no editor de temas).
3. **Seletor de cor** (visto no print de referência do produto) não foi implementado — os produtos da Fist Street não usam "Cor" como variante (cada cor é um produto separado, ex: "Conjunto Syna Calor Vermelho/Verde/Preto/Azul"), diferente da loja de referência. Implementar um seletor de cor de verdade exigiria remodelar os produtos (unificar em um produto só com variante de cor), que é uma mudança estrutural maior — não foi feita.
4. **Calculadora de frete por CEP** (vista no print de referência) não foi implementada — o Shopify já calcula frete real automaticamente no carrinho/checkout nativo; montar uma calculadora solta na página de produto exigiria integração própria com API dos Correios ou Shopify Shipping, que é um projeto à parte.

**2026-08-03 — Checkout migrado para Yampi + bug do quick-add corrigido:** loja passou a usar checkout da Yampi (conectado via app instalado no admin Shopify — não aparece em nenhum arquivo do tema, é injeção/interceptação server-side no app). Rota `/checkout` do tema continua apontando pra lá normalmente (form do carrinho e link do drawer não precisaram mudar). Bug real relatado pelo Igor: botão "Comprar" dos cards da vitrine (quick-add) não dava feedback nenhum ao adicionar — no mobile o botão de confirmar ficava um "pill" verde vazio (CSS escondia o texto sem ícone de reserva) e depois de clicar nada abria, parecia travado. Corrigido em `assets/theme.js`: botão de confirmar do quick-add ganhou ícone de carrinho fixo (visível em qualquer largura) e, após adicionar com sucesso (`/cart/add.js`), o carrinho lateral (`openCart()`) abre automaticamente — mesmo padrão do resto do site. Fluxo da página de produto (toast "Adicionado ao carrinho") não foi mexido, já funcionava. Validado com `shopify theme check` (0 erros) e confirmado direto no CDN via `curl` do `theme.js` publicado antes de fechar.

## Próximos passos

1. Seven/Igor decidirem se querem seguir com as pendências acima (preços promocionais reais, cadastro de camisetas, seletor de cor, frete por CEP).
2. Sempre `theme pull` antes de editar (evitar sobrescrever mudanças feitas direto no admin) e confirmar com o Seven antes de `theme push` no tema live.
3. Checkout é Yampi (app no admin) — qualquer ajuste de configuração/aparência do checkout em si (não do carrinho/tema) tem que ser feito no painel da Yampi, não dá pra editar por aqui.
