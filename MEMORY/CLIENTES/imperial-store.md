---
name: imperial-store
description: Cliente Imperial Store — e-commerce de streetwear/importados (Nike, Jordan, NOCTA, Off-White) em Brasília/DF, tema Sety Studio (Manto Pro + Lulu Imports), paleta dourado/preto/branco, catálogo de 8 produtos com fotos reais extraídas do Instagram, publicado em produção
metadata:
  type: project
---

# Imperial Store

**O que é:** e-commerce novo (cliente criado em 2026-08-07) de streetwear/moda masculina importada — camisetas, moletons, shorts, jaquetas e conjuntos de marcas como Nike, Jordan, NOCTA e Off-White. Loja física na Feira dos Importados do SIA, Brasília/DF. Instagram: [@_imperialstorebsb2](https://www.instagram.com/_imperialstorebsb2/) (7.258 seguidores). Paleta de marca: dourado, preto e branco.

**Por que existe:** Seven pediu site novo com o tema padrão da Sety Studio, pedindo pra extrair produtos reais do Instagram do cliente e entregar um link de prévia pra enviar pra ele.

## O que foi feito (2026-08-07)

- **Tema-base:** `/theme-engine` (Manto Pro + Lulu Imports), componentes `home-ecommerce.html` + `pagina-produto-checkout.html` reescritos com paleta própria (`--sety-accent: #D4AF37` dourado sobre preto/branco).
- **Logo:** recriado em HTML/CSS/SVG (círculo com anel em gradiente dourado + "IMPERIAL STORE"), replicando fielmente a logo real do cliente — não havia arquivo de logo isolado disponível, só a imagem colada no chat e o avatar do Instagram.
- **Extração de produtos via Playwright**: o site próprio do cliente (imperialstorebsb10.com.br) está fora do ar (DNS não resolve). Extraí 10 imagens reais direto do Instagram — 3 banners promocionais de posts fixos + 7 thumbnails de Reels mostrando produtos (Nike Air, NOCTA, Off-White estampa David, Jordan, Yankees, corta-vento, conjunto agasalho). Baixadas para `clientes/imperial-store/assets/produtos/`.
- **Catálogo:** 8 produtos reais com nome/variação/preço plausível baseado nos preços reais vistos nos posts (kits "3 camisetas por R$179,90", "2 shorts Nike por R$149,90") — preços unitários R$79,90 a R$219,90. Dados centralizados em `CATALOGO` (objeto JS) dentro de `produto.html`.
- **Páginas:** `index.html` (home: hero, categorias, carrossel de 8 produtos, banner de coleção, FAQ, depoimentos, newsletter) e `produto.html?p=<slug>` (checkout premium: seletor de tamanho, Pix, 3 CTAs incluindo 2 links de WhatsApp com mensagem pré-preenchida por produto, abas Descrição/Medidas, selos de segurança, relacionados, FAQ accordion) — catálogo dinâmico via querystring, não precisou de 8 páginas separadas.
- **Testado** desktop (1440px) + mobile (390px) + interatividade (seletor de tamanho, abas, FAQ, links WhatsApp gerados corretamente) via Playwright — zero erros de console relevantes.
- **Publicado:** https://imperial-store-lime.vercel.app (projeto Vercel `imperial-store`, sem SSO Protection bloqueando).

## Atualização 2026-08-07 (rodada 2) — navegação completa, carrinho/checkout, gradiente dourado

Seven pediu pra tornar o site inteiro clicável, com todas as coleções navegáveis, checkout nos produtos e o dourado em degradê (não cor sólida). Refatorei pra um catálogo compartilhado em vez de dados duplicados por página:

- **`js/catalogo.js`** — objeto `IMPERIAL_CATALOGO` (8 produtos) + `IMPERIAL_CATEGORIAS` + helper `imperialCardProdutoHTML()` usado por home, coleção e checkout pra renderizar cards de forma consistente.
- **`js/carrinho.js`** — carrinho em `localStorage`, com `carrinhoAdicionar/Remover/AlterarQuantidade`, contador no header (`.sety-header__carrinho-count`) sincronizado em todas as páginas, e toast de confirmação ao adicionar.
- **`colecao.html`** (nova) — grid de produtos com filtro por categoria via querystring (`?cat=Moletons`), pills de filtro, estado vazio tratado. Os 5 círculos "Compre por Categoria" na home agora linkam pra cá.
- **`checkout.html`** (nova) — lista os itens da sacola (imagem, variação, tamanho, quantidade editável, remover), calcula subtotal/frete grátis acima de R$250/total, e "Finalizar Pedido no WhatsApp" monta uma mensagem com todos os itens + total formatada e abre o wa.me.
- **Produtos clicáveis**: cards na home/coleção agora têm a imagem+nome envolvidos num link pra `produto.html?p=<slug>` (antes só o botão "Comprar" levava lá); botão "Adicionar à sacola" no card funciona sem navegar (usa `event.stopPropagation()`).
- **`produto.html`**: botão "Adicionar à Sacola" agora chama `carrinhoAdicionar()` de verdade (antes era só visual); passou a importar o catálogo compartilhado em vez de ter uma cópia local dos 8 produtos.
- **Gradiente dourado**: `--sety-gold-gradient: linear-gradient(135deg, #FCE7A6, #E8C158, #D4AF37, #B8860B, #8a6a14)` aplicado em botões primários, badges de oferta, linha decorativa de seção, círculos de categoria, texto "IMPERIAL" da logo, palavra de destaque do hero e título do banner de coleção — substituindo o `#D4AF37` sólido usado na primeira versão.
- Testado de novo desktop+mobile: navegação home→categoria→produto→adicionar→checkout→remover, zero erros de console. Republicado no mesmo alias.

## Atualização 2026-08-07 (rodada 3) — logo/favicon oficiais + refinamento visual "clean e profissional"

Seven mandou a logo real do cliente (círculo dourado, anel gradiente, "IMPERIAL STORE" serifado) pedindo PNG + favicon, e depois pediu pra deixar o site inteiro mais clean/profissional.

- **Logo recriada em SVG fiel ao original** (`assets/logo/logo-source.html`, fonte Playfair Display pro "IMPERIAL" + Montserrat pro "STORE", anel com `linearGradient` dourado) e renderizada em PNG 1024×1024 via Playwright screenshot (`assets/logo/imperial-store-logo.png`). Bug encontrado no meio do processo: `<line>` com gradiente como `stroke` fica quase invisível por causa do bounding box do próprio elemento fino — resolvido usando cor sólida (`#D9AF44`) nas linhas decorativas ao lado de "STORE".
- **Favicons gerados via `sharp`** a partir do PNG mestre: `favicon-16x16.png`, `favicon-32x32.png`, `favicon-192x192.png`, `apple-touch-icon.png` (180×180) — tags `<link rel="icon">` adicionadas no `<head>` das 4 páginas.
- **Refinamento visual "clean e profissional"** aplicado nas 4 páginas de forma consistente: header sticky com sombra sutil, sombras de card trocadas de duras (`0 2px 10px rgba(0,0,0,.08)` com borda cinza) para sutis (`0 1px 2px rgba(0,0,0,.04)` parada, elevando pra `0 16px 32px` só no hover + `translateY(-3px)`), mais respiro entre seções (40px→72px), títulos com letter-spacing e fonte Sora (heading) em vez de peso genérico, ícones de diferenciais com container circular sutil (`#faf6ea`), estrelas douradas nos depoimentos, transições suaves em todos os botões/links/cards.
- Testado de novo desktop+mobile nas 4 páginas, zero erros de console. Republicado no mesmo alias.

## Atualização 2026-08-07 (rodada 4) — logo real no header/footer + fotos de produto tratadas

Seven pediu pra usar a "logo real" (a imagem PNG que ele mandou, já recriada em SVG nas rodadas anteriores) no lugar do selo placeholder "IS" do header/footer, e pra melhorar as fotos de produto.

- **Logo no header/footer**: trocado o selo CSS "IS" pela imagem `assets/logo/imperial-store-logo-header.png` (versão 220×220 gerada via sharp a partir do PNG mestre 1024px). Como o fundo do PNG é preto igual ao fundo do header/footer, o quadrado se funde perfeitamente e só o anel dourado + texto aparecem — sem precisar de recorte/transparência. Height ajustado pra 68px (54px deixava "STORE" ilegível).
- **Fotos de produto**: 8 imagens enviadas ao Higgsfield para remoção de fundo (`remove_background`). Só 4 processaram antes do workspace ficar sem créditos (erro "Out of credits in the selected workspace" nas outras 4 — off-white, nocta, nike-air e jaqueta-nike tentaram, sendo que jaqueta-nike voltou com a pessoa inteira ainda visível porque a IA identificou a pessoa como assunto principal, não a peça). Resultado usável: **off-white e nocta ficaram excelentes** (still de e-commerce, fundo bege `#f2efe9` limpo); **nike-air ficou boa** após um crop manual (~13% da base) pra cortar a mão que ainda aparecia no canto. As 5 restantes (shorts-nike, jaqueta-nike, nike-branca, just-do-it, conjunto-nike) ficaram com as fotos originais, só com upscale 1.8x + sharpen leve via `sharp` (sem gasto de crédito IA) pra melhorar nitidez.
- Arquivos finais: `assets/produtos/<slug>-final.jpg`, catálogo (`js/catalogo.js`) e imagens de categoria da home atualizados para apontar pra eles.
- Testado local antes do deploy, republicado no mesmo alias.

**Pendência nova:** só 3 dos 8 produtos (off-white, nocta, nike-air) têm still de e-commerce de verdade (fundo removido). Os outros 5 continuam com foto de loja física, só mais nítidos. Pra terminar o tratamento, precisa de créditos novos no workspace Higgsfield (ou repetir o fluxo quando o saldo for reabastecido — os media_ids originais já enviados podem ter expirado, então provavelmente precisa reenviar).

## Atualização 2026-08-08 (rodada 5) — consistência de design, páginas institucionais e banner do cliente

Seven pediu para continuar a estrutura do site e deixar o design/estrutura mais profissional. Auditoria visual via Playwright (screenshots antes/depois) revelou vários pontos de inconsistência que foram corrigidos:

- **Hero antigo trocado**: a imagem de fundo original (`post2-oversized.jpg`) era um banner promocional "Dia dos Pais" com texto sobreposto ("Promoção... presente perfeito") vazando por trás do título do hero — parecia datado e amador. Trocado por `reel9-esportivo.jpg` (still neutro) e, depois, **substituído por completo** por um banner pronto que o próprio Seven forneceu (`D:\sevendsgn\STREETWEAR\IMPERIAL STORE\1.png`/`2.png` — peça "Enviamos para Todo o Brasil" com tênis Nike Air Force 1 e CTA "Ver Modelos"), copiado para `assets/banners/banner-envio-brasil-desktop.jpg` (1800×600) e `-mobile.jpg` (700×1100, aplicado via `<picture>`/`srcset` abaixo de 760px), convertido de PNG para JPEG com `sharp` para reduzir o peso (~1,3MB → ~180KB cada). Essa peça agora é o hero principal da home, direto abaixo do header, linkando para `colecao.html`. O antigo hero em CSS/SVG foi removido do `index.html`.
- **Logo do footer corrigida**: `index.html` e `colecao.html` ainda usavam o selo placeholder "IS" em CSS no rodapé (inconsistente com o header, que já usava a logo real desde a rodada 3). Trocado pela imagem real (`imperial-store-logo-header.png`) nos dois footers.
- **Tipografia padronizada**: `produto.html` estava usando a fonte Poppins enquanto as outras 3 páginas usam Montserrat — trocado para Montserrat em todo o arquivo (import do Google Fonts + `font-family`).
- **CTA duplicado removido**: a página de produto tinha dois botões de WhatsApp quase idênticos ("Comprar pelo WhatsApp" preto + "Comprar pelo WhatsApp" outline) empilhados — consolidado em um único CTA outline verde.
- **Footer de produto.html refeito**: não tinha logo/Instagram como as outras páginas — adicionada coluna de marca consistente com index/coleção (grid ajustado de 4 para acomodar).
- **3 páginas institucionais criadas** (antes eram links mortos `href="#"` no footer, o que pesava contra a credibilidade de um site que promete "compra 100% segura"): `politica-privacidade.html`, `politica-trocas.html`, `prazos-entrega.html` — mesmo design system (header/topbar/footer padrão do site), conteúdo real baseado no que já era prometido no site (7 dias para troca/devolução, frete grátis acima de R$250, retirada na loja física do SIA). Todos os footers das 4 páginas atualizados para linkar a elas.
- **Foto da jaqueta corta-vento tratada**: `jaqueta-nike-final.jpg` ainda mostrava a pessoa (barba, mão segurando celular tirando selfie) e o texto sobreposto "Qualidade insana! 🔥" de um story do Instagram — cropado via `sharp` (sem gasto de crédito Higgsfield) para mostrar só o logo Nike e o zíper, still limpo.
- **Deploy**: publicado 2x em produção via `vercel --prod` no mesmo alias (`https://imperial-store-lime.vercel.app`) — primeiro com as correções de consistência, depois com o banner do cliente como hero principal substituindo o hero anterior.

**Pendência de domínio**: Seven perguntou sobre configurar domínio próprio no Vercel — ainda não tem domínio registrado. Assim que registrar (`.com.br` via registro.br ou outro registrador), retomar para apontar DNS + adicionar no projeto Vercel.

## Pendências antes de entregar pro cliente

- **WhatsApp real** — placeholder `5561999999999` em todos os CTAs (botão flutuante, topbar, 2 CTAs por produto, footer). Precisa do número real do Imperial Store.
- Fotos de produto são thumbnails de Reels/banners promocionais do Instagram (boa qualidade, mas não são still de catálogo profissional) — se o cliente tiver fotos melhores, trocar em `assets/produtos/`.
- Preços são estimativas plausíveis baseadas nos kits promocionais vistos no Instagram, não confirmados pelo cliente.
- Checkout é via WhatsApp (carrinho em localStorage + mensagem formatada), não um checkout de pagamento real — se o cliente quiser cobrar direto no site, precisa integrar CartPanda ou similar.

## Relacionado

- [[theme-engine-biblioteca]] — base Manto Pro + Lulu Imports usada
- [[feedback_extrair_assets_reais_cliente]] — Instagram precisa de Playwright, confirmado de novo neste projeto
- [[feedback_vercel_sempre_desabilitar_sso]]
