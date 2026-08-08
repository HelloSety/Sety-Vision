---
name: monster-lupas
description: Cliente Monster Lupas — e-commerce de óculos, catálogo de 31 modelos com categorias e coleções, tema Lulu Imports (theme-engine Sety Studio)
metadata:
  type: project
---

# Monster Lupas

**O que é:** cliente de e-commerce de óculos de sol (réplicas premium de modelos Oakley — catálogo expandido em 2026-08-01 de 7 para 31 modelos, todos R$ 179,90 de R$ 297,90, mesmo segmento de concorrentes como Just Have Fun e MBP Conceito).

**Por que existe:** em 2026-07-30 o Seven pediu uma base de site profissional para enviar ao cliente aprovar. Primeira versão clonava a estrutura/UX de https://justhavefun.com.br/. Em 2026-07-31, pedido explícito de "o tema do Sety Studio" (gatilho da skill `/theme-engine`) levou à reconstrução sobre o tema-mestre **Lulu Imports** (padrão #1 da biblioteca, `MEMORY/TEMPLATES/tema-lulu-imports.md`), mantendo o catálogo real de https://monsterlupas.com.br/.

## Entrega atual (2026-08-01)

- **Link para enviar ao cliente:** https://site-pi-six-62.vercel.app (atualizado 2026-08-03 — migrou de Netlify pra Vercel, ver seção "Redesign monocromático" abaixo)
- **Tema-base:** Lulu Imports (theme-engine) — validado por comparação direta com o site real (luluimports.com.br) via Playwright: header preto, top bar de confiança, "compre por modelo" em stickers rotacionados, carrossel "produtos em destaque" com cards foto+preço+botão duplo.
- **Branding aplicado:** cor de destaque vermelha `#e8331c` (marca real Monster Lupas) no lugar do amarelo genérico do tema de referência; tipografia Sora (títulos) + Montserrat (corpo), conforme documentado no tema; cards de produto 3:4.
- **Código:** `clientes/monster-lupas/site/`
  - `index.html` + `css/style.css` — home completa (hero, benefícios, compre por modelo, mais vendidos, banner "Compre 1 Leve 2", seções por modelo, FAQ com perguntas de objeção, footer com selo Sety Studio).
  - `produto.html` + `js/product.js` — **página de produto individual**, pedida pelo Seven para que os cards fossem clicáveis "pra acessar por dentro". Galeria com thumbnails laterais no desktop (estilo premium/editorial, referência tema Esportivo/Manto Pro), thumbnails embaixo no mobile. Troca de cor atualiza a imagem e a URL (`?id=X&color=Y`). Trust list, seção "Outros Modelos".
  - `js/cart.js` — carrinho compartilhado entre `index.html` e `produto.html` (extraído de `main.js` para evitar duplicação).
  - `js/catalog.js` — dados reais dos 7 modelos + variantes de cor (inalterado desde 2026-07-30).
- Imagens de produto e banners: hotlink direto para o CDN da própria Monster Lupas — assets do próprio cliente, não copiados de terceiros.
- **Publicação:** Netlify (`monster-lupas-sety`, `siteId: a4caa1bc-8a10-476e-8a13-24d6b3135263`) — Vercel do time segue bloqueado por SSO Protection compartilhada, não reavaliado nesta rodada.

## Melhoria do checkout/carrinho (2026-08-01, madrugada)

Seven pediu "melhora esse checkout" mostrando a página de produto (não o carrinho em si) — não existe checkout com gateway de pagamento real nesse site ainda (pendência conhecida, ver abaixo); o "checkout" hoje é o drawer lateral de carrinho que resume o pedido e manda pro WhatsApp. Investiguei o drawer real (estava básico: item sem controle de quantidade, sem desconto Pix visível, footer genérico) e apliquei melhorias de UX/visual sem mexer no fluxo de fundo (ainda finaliza via WhatsApp):

- `js/cart.js`: itens duplicados (mesmo produto+cor) agora agregam quantidade em vez de criar linhas separadas; adicionado `changeQty()` com botões +/− por item; total agora mostra subtotal e total no Pix (5% off, usando a função `pixPrice()` que já existia mas não era usada no carrinho); mensagem de WhatsApp inclui quantidade e os dois totais.
- `index.html` / `produto.html`: footer do drawer reestruturado (subtotal → destaque Pix → botão com ícone WhatsApp → nota de confiança); estado vazio agora tem ícone, texto e CTA "Ver coleção" em vez de uma frase solta.
- `css/style.css`: header do drawer em Sora uppercase (consistente com o resto do site), gamificação "Compre 1 Leve 2" com borda de destaque, cards de item com moldura e stepper de quantidade em pill, footer com hierarquia clara (Pix em vermelho/maior que o subtotal).

Testado local (servidor estático + Playwright): item único, incremento de quantidade (gamificação "Compre 1 Leve 2" ativa corretamente em 2 unidades), link de WhatsApp gerado com quantidade e totais corretos. Mudança feita só nos 2 arquivos do site (`index.html`, `produto.html`) — não são 116 páginas como o Dona Bomba, então não precisou de script de find-replace em massa. **Ainda não publicado** (Netlify) — falta decidir com o Seven se sobe agora ou junto de outro ajuste.

## Pendências antes de produção
- WhatsApp real (JS usa placeholder `WHATS_NUMBER = '55XXXXXXXXXXX'` em `js/main.js`)
- Links reais de Instagram/Facebook (footer usa `#`)
- CNPJ e endereço (não incluídos — não inventar dado legal)
- Definir gateway de checkout (padrão Sety Studio: CartPanda)
- Fotos lifestyle por modelo (hoje os banners de cada seção de modelo são texto sobre gradiente, pois a Monster Lupas só tem fotos de produto em fundo neutro)
- Se o Vercel for o destino final, decidir com o Seven se desativa SSO Protection do projeto ou usa domínio próprio (que já bypassa a proteção)

## Redesign monocromático + banners reais + categorias em círculo (2026-08-03)

Seven mandou 2 banners prontos (welcome + "compra fácil") da pasta local `D:\sevendsgn\STREETWEAR\MONSTER LUPAS` pra virarem os banners principais da home (otimizados PNG→webp, 4.6MB→320KB). Na sequência pediu pra replicar a seção de categorias em círculo do concorrente **mbpconceito.com.br** e trocar toda a paleta de vermelho `#e8331c` pra **preto/branco/cinza monocromático**.

- Hero antigo (texto HTML sobreposto a imagem com overlay) virou banner de imagem cheia (`.banner-hero`, picture/srcset desktop+mobile) — os banners novos já têm texto+CTA embutidos na arte.
- Banner "Compra Fácil" ocupa a posição da antiga seção "Compre 1 Leve 2" (removida, `id="promo"` herdado).
- Nova seção "Categorias" com 4 círculos (ícone SVG + contorno na cor de destaque) usando as categorias reais do catálogo (X-Metal/Esportiva/Clássica/Streetwear) — não as categorias fictícias do MBP (Relógios/Acessórios não existem no catálogo).
- Paleta: só 3 variáveis CSS (`--gold`/`--gold-dark`/`--gold-text`) controlam toda a cor de destaque do site — trocadas de vermelho pra `#2b2b2b`/`#000`/`#2b2b2b`, mudança de baixo risco.
- **Publicação mudou de Netlify pra Vercel:** https://site-pi-six-62.vercel.app (projeto `monster-lupas`, alias com nome genérico "site" — herdado, não renomeado). Confirmado com o Seven antes do deploy em produção.

## Refinamento pós-feedback do cliente real + 2ª geração de banners (2026-08-04)

Marcelo (dono da Monster Lupas) testou no celular e reportou por WhatsApp que os badges/ícones ficaram "apagados" após a virada monocromática. Causa: `--gold` virou cinza `#2b2b2b` (quase igual a `--ink`), e mais grave — vários elementos sobre fundo ESCURO (ícone do carrinho, marquee, contact-bar, header ao rolar, newsletter, faixa Instagram) usavam essa mesma variável, ficando pretos sobre preto = invisíveis. Antes era vermelho vibrante (sempre visível); trocar por uma cor neutra quebrou silenciosamente todo uso sobre fundo escuro. Corrigido: `--gold` → preto puro `#000`, e cada uso sobre fundo escuro trocado especificamente pra `#fff`.

Seção "Categorias em círculo" (criada na rodada anterior) foi removida a pedido do Seven — limpo sem deixar código morto.

Banners trocados de novo (2ª geração, mesma pasta local, arquivos novos): fundo branco, "Nova Coleção / Estilo que Impõe / Atitude que Marca", CTA vermelho, faixa de benefícios própria embutida na arte. Isso duplicava a seção HTML "Benefícios" do site — movida pra antes do "Sobre" pra não repetir informação logo no topo.

## Expansão do catálogo: 7 → 31 modelos + categorias + coleções (2026-08-01)

Seven mandou a pasta local `C:\Users\seven\Downloads\PRODUTOS` (37 subpastas de modelos réplica, fotos + `descrição.txt` por modelo). Após alinhar escopo (só modelos com fotos limpas nomeadas por cor — não os que só tinham prints de rede social sem nome de cor identificável), processados 24 modelos novos + fotos melhores para Dartboard, Flak 2.0 e Eye Jacket (este último saltou de 2 para 13 cores).

- ~200 imagens (132MB) otimizadas para 4.6MB (`scripts/optimize-produtos.js`, sharp) e organizadas em `assets/produtos/<slug>/`.
- `catalog.js` reescrito com 31 produtos, incluindo `category` (Linha X-Metal / Esportiva / Clássica / Streetwear — tabs filtráveis em "Compre por Modelo") e `collections[]` (Novidades / Edição Colecionador / Linha Performance — 3 carrosséis novos na home).
- Corrigido `.sticker-row` que tinha `flex-wrap:wrap` (empilhava os 31 modelos em várias linhas, "parede de óculos") para rolagem horizontal única com setas — resolve o pedido do Seven de manter a home "clean e organizada".
- Referência usada 3x na sessão: https://www.mbpconceito.com.br/ (concorrente direto, mesmo nicho) — replicados estrutura de categorias, preço "de/por", badges, breadcrumb por categoria na PDP. **Não replicado**: avaliações de clientes, CNPJ, endereço físico, ficha técnica com medidas específicas — dados que pareceriam reais sem ser.

## Migração para Shopify (2026-08-04)

Seven pediu o tema e o catálogo em formato Shopify pra "subir no ar" numa loja real (`hello-world-uaavn-tjngdsf5.myshopify.com`). Projeto novo em `clientes/monster-lupas/monster-lupas-shopify/` (tema Dawn 15.5.0 customizado com a mesma identidade visual preto/branco/cinza do site estático). Catálogo dos 31 produtos convertido para CSV de import padrão Shopify via `scripts/generate-shopify-csv.js` (lê o `catalog.js` do site estático — fonte única de verdade compartilhada entre as duas versões).

Tema publicado ao vivo (`shopify theme publish --force`) no mesmo dia. Depois, tudo que tinha ficado como "1 clique manual pro Seven" foi automatizado via Admin API (`shopify store auth` + `shopify store execute --allow-mutations`, sem token de app custom): logo do header via staged upload real, 7 collections automáticas por tag (3 temáticas + 4 categorias, tabs viraram links reais em vez de filtro JS), e os 31 produtos importados via `productSet`+`productCreateMedia`+`productVariantAppendMedia` (não pelo CSV, que ficou só como plano B).

No meio do processo apareceu um catálogo antigo (17 produtos duplicados de 22/07, de antes desta sessão) que o Seven confundiu com bug do tema novo — era tradução automática do Chrome dele deixando os nomes estranhos. Apagado e reimportado limpo, com o preço corrigido pra R$169,90 (era R$179,90). 4 produtos (Plantaris/Plate/Minute/Juliet) ficaram sem imagem e em rascunho — as URLs de imagem originais do cliente sumiram do CDN dele (404 real), não é algo que dá pra resolver sem fotos novas.

Logo oficial trocada nas duas versões (site estático + tema Shopify) nesta mesma sessão — fundo removido via chroma-key com `sharp` a partir do arquivo real encontrado em Downloads (a versão colada no chat não tinha arquivo utilizável).

Detalhe técnico completo (armadilhas do `image_picker`, staged upload, estrutura das sections customizadas) na memória auto-memory `project_cliente_monster_lupas`.

Ver [[dona-bomba]] para outro cliente ativo de e-commerce da Sety Studio.
