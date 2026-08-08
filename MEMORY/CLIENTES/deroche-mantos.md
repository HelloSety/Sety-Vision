---
name: deroche-mantos
description: Cliente Italo Miguel — loja de camisas de futebol/basquete (mantos), protótipo Shopify em construção
metadata:
  type: project
---

# Deroche Mantos — Italo Miguel

**O que é:** cliente novo (card Trello adicionado 11/07/2026, ticket R$1.400). Loja de camisas de futebol e basquete ("mantos" — mesmo nicho de mantoprooficial.com.br, lojavancirsports.com.br, loja.underzstore.com, luluimports.com.br, que o Seven citou como referência de entregas anteriores da Sety). Contato: WhatsApp +55 69 8100-4739.

**Por que existe:** checklist do Trello pede Site Virtual, Domínio, Produtos, Tráfego Pago e Design. Fluxo de entrega: protótipo estático → aprovação → migração para tema Shopify (mesmo padrão validado com [[project_pablo_lgd_records]]/LGD Records).

## Estado atual (2026-07-16)

- **Preview ao vivo:** https://deroche-mantos.vercel.app — projeto Vercel dedicado e isolado (`deroche-mantos`, escopo `sety-studio-s-projects`, projectId `prj_Mm7MdnMCrYX9JH1MbmYf8JIEiUnR`).
- **Código:** `clientes/deroche-mantos/site/` (protótipo estático HTML/CSS/JS puro, sem backend) + `clientes/deroche-mantos/ACESSO.md`.
- **Design v2** (nível "MantoPro" a pedido do Seven, depois que a v1 foi considerada "amadora"): header com busca, hero com foto de jogador, carrossel de coleções circular, cards grandes de categoria com overlay, banner de frete grátis, benefícios com ícones, FAQ accordion, seção institucional, footer completo (pagamento, selos). Paleta preto/laranja/branco (identidade do logo do cliente).
- **Catálogo:** 19 produtos em `catalog.js` — Brasileirão, Clubes Internacionais, Seleções, NBA, Retrô, Infantil, Versão Jogador. **Fictício/placeholder**, baseado no padrão de mercado das lojas de referência — ainda não confirmado pelo Italo.

## Pendências reais antes de produção

- **Logo**: o Italo mandou só um print no chat (bola de basquete laranja/preto, "DEROCHE MANTOS"). Recriei um placeholder em SVG (`site/assets/logo.svg`) — precisa do arquivo original em alta resolução.
- **Fotos de produto**: todas as ~30 imagens em `site/assets/produtos/` são placeholders de banco de imagem (Pexels, uso comercial livre) buscados por pedido explícito do Seven ("procura no Google") — não são fotos reais dos produtos que o Italo vende, nem têm escudos oficiais de time visíveis na maioria.
- **Catálogo real**: times/produtos/preços precisam ser confirmados com o cliente antes de publicar de verdade.
- **Loja Shopify**: ainda não sabemos se o Italo já tem loja criada (`xxx.myshopify.com`) ou token de Admin API — perguntar antes de montar o tema (ver [[feedback_shopify_instalacao_tema]]).

## Incidente 2026-07-16: deploy acidental no projeto Vercel compartilhado

Primeiro `vercel deploy --prod` nesta pasta (nova, nunca linkada) auto-linkou no MESMO projeto compartilhado (`prj_P2L6JCLp6BHngSYzCqv45UDXpgdv`, nome "site") que `clientes/natalia-silveira/site/` usa — só porque a pasta local também se chama `site/` e não havia `.vercel/project.json` ainda. Sobrescreveu o alias de produção dela por ~2min. Corrigido com autorização do Seven: `vercel alias set <deployment-antigo> <alias>` (rollback normal deu 402, exige plano Pro), depois `.vercel/` apagado e projeto novo criado via `vercel link --project deroche-mantos` ANTES do deploy real. Detalhe técnico completo em [[project_vercel_shared_project_incident]] — regra permanente: sempre `vercel link --project <nome-cliente>` explícito antes do primeiro deploy de qualquer cliente novo.

## Catálogo real recebido e processado (2026-07-16)

Seven mandou o catálogo real de estoque (`Catálogo.pdf`, 70 páginas, WhatsApp real @Deroche_Mantos 69993806867, suportederoche@outlook.com) — bem mais amplo que o site fictício v1/v2: **208 produtos reais** com foto, referência, estoque por tamanho e preço, cobrindo camisas de futebol (clubes/seleções/réplicas árabes tipo Al-Hilal/Al-Nassr), NBA, streetwear (Berzerk, básicas, cropped, polo), 55 perfumes importados (Lattafa, Afnan, Armaf etc.), 25 óculos Oakley, mochilas, bonés, tênis/chinelos, acessórios de academia, eletrônicos, bolas.

Pipeline completo rodado, entregue em `clientes/deroche-mantos/catalogo/`:
- `csv/catalogo_shopify.csv` — 208 produtos, 320 linhas (produto+variante), 30 colunas oficiais Shopify, pronto pra Admin → Produtos → Importar
- `imagens/<handle>.jpg` — 198 fotos reais extraídas do próprio PDF (via `pdfimages`, poppler instalado via winget) e convertidas PNG→JPG (sharp). 10 produtos não tinham foto no PDF original (ficaram de fora, listados no relatório, não usar o ícone genérico "sem imagem" do PDF como se fosse foto real)
- `json/catalogo.json`, `seo/seo.csv`, `relatorio.md`, `log/` (PDF original + texto extraído + log de validação)

**Decisão técnica**: `Image Src` do CSV ficou vazio de propósito — Shopify exige URL pública pra importar imagem via CSV, path local não funciona (mesmo erro já visto com hotlink quebrado no caso do LGD Records). Upload de foto é manual no Admin, mas o nome do arquivo já bate com o Handle de cada produto pra ser rápido de conferir.

**Enriquecimento aplicado** (nada disso vinha do PDF, só nome/ref/estoque/preço): categoria, subcategoria, vendor, clube/país, ano, cor, gênero — extraídos do nome por regras; descrição HTML, SEO title/description, tags e Google Shopping category — gerados por template específico por categoria. Validação rodada: 0 handles duplicados, 0 preços inválidos, 0 issues.

**Este catálogo substitui os 19-26 produtos fictícios do protótipo Vercel (v1/v2)** — próximo passo natural é atualizar `site/catalog.js` com os produtos reais (ou migrar direto pro tema Shopify usando este CSV) em vez de manter os placeholders.

## Site atualizado com o catálogo real (2026-07-16, mesmo dia)

O protótipo Vercel (https://deroche-mantos.vercel.app) foi todo reconstruído para usar os 208 produtos reais do catálogo em vez dos ~19-26 fictícios da v1/v2:
- `catalog.js` regerado a partir de `catalogo/produtos-enriquecidos.json` (script `gen-site-catalog.js`, guardado só no scratchpad da sessão — se precisar regenerar de novo, refazer o pipeline a partir do PDF)
- 198 fotos reais copiadas para `site/assets/catalogo/<handle>.jpg`; os 10 produtos sem foto usam um placeholder "Foto em breve" gerado localmente (`sem-foto.jpg`), nunca o ícone feio do PDF original
- Nav/menu, home, `shop.html` (filtros) e `produto.html` trocados das 7 categorias fictícias de futebol para as 13 categorias reais (Futebol, NBA, Streetwear, Perfumes, Óculos, Calçados, Mochilas, Bonés, Academia, Eletrônicos, Bolas, Infantil, Acessórios)
- `produto.html` agora lê tamanhos **dinamicamente** de `sizeVariants` (pode ser `null` — perfume/óculos não mostram seletor de tamanho — ou array de `{size, qty}` real, com tamanho sem estoque aparecendo riscado/desabilitado)
- Preço mostra só o valor real (sem "De/Por" fictício, já que o catálogo não tinha preço promocional)

**Bug corrigido durante o processo**: regex `/^Boné\b/i` falhava por causa do "é" acentuado quebrar o `\b` (word boundary não reconhece acento sem flag unicode) — "Boné Anth Original" caia por engano em "Camisas Futebol". Corrigido para `/^Boné/i` e todo o pipeline (CSV, JSON, site) foi reprocessado do zero. **Lição para outras extrações**: nunca usar `\b` logo após uma vogal acentuada em regex JS sem testar.

## Melhoria de qualidade de imagem (2026-07-16, mesmo dia)

Fotos originais do PDF são só 230×230px (o próprio fornecedor gerou o catálogo já nessa resolução baixa — não tem como "recuperar" detalhe que nunca existiu). Um upscale simples (lanczos3 + sharpen) já tinha sido aplicado, mas o Seven pediu qualidade ainda melhor. Solução: instalado `realesrgan-ncnn-vulkan` (super-resolução por IA, roda em GPU local via Vulkan, não precisa de conta/API paga) e reprocessadas as 198 fotos reais com o modelo `realesrgan-x4plus` (230px → 920px, 4x). Resultado é visivelmente melhor que upscale comum — reconstrói textura de tecido e nitidez de texto em vez de só esticar pixels. Arquivos finais: JPEG qualidade 92 com mozjpeg, ~21MB total para as 198 fotos, em `catalogo/imagens/` e `site/assets/catalogo/`.

**Importante para o Seven entender**: isso é o teto real de qualidade possível a partir da fonte que existe. "4K genuíno" (que tem detalhe real, não interpolado/reconstruído por IA) só é possível se o Italo mandar as fotos originais que tirou (antes de comprimir no PDF) — se ele tiver os arquivos originais no celular/computador, vale pedir.

## Logo real + carrinho de compras completo (2026-07-16, mesmo dia)

- **Logo real** do cliente recebido (`C:\Users\seven\Downloads\Logo Deroche.png` — bola de futebol laranja/preta, "DEROCHE MANTOS", aro/rede cinza). Tinha canal alpha (transparência real) — processado com `flatten()` em duas versões de fundo sólido: `logo-real.png` (fundo branco, header) e `logo-real-dark.png` (fundo preto, footer). Placeholders SVG recriados (v1/v2) foram substituídos.
- **Carrinho de compras completo** implementado (`site/cart.js` + drawer no `style.css`): localStorage, adicionar/remover/ajustar quantidade, contador no ícone do header (`.cart-trigger`) nas 3 páginas. Produtos de futebol/NBA/infantil ganham campo de personalização opcional (nome + número) na página de produto. Finalização gera uma mensagem única de WhatsApp com todos os itens, tamanho, personalização e total — não fecha pagamento real no site (é site estático sem backend), mas resolve o pedido do Seven de "comprar tudo dentro do site" sem precisar negociar item por item no WhatsApp.
- Se no futuro quiser pagamento real (Pix/cartão) processado sem sair do site, precisa de backend (serverless functions + gateway tipo Mercado Pago) — mesmo padrão que foi implementado para o Pablo/LGD Records em `clientes/pablo-lgd-records/site/api/`.

## Próximos passos

1. Seven/Italo revisarem o site atualizado e o `relatorio.md` do catálogo.
2. Confirmar os 10 produtos sem foto (ver lista no relatório) — precisa de foto real antes de publicar de verdade.
3. Logo original em alta resolução ainda pendente (protótipo usa placeholder SVG recriado, agora em preto/branco monocromático).
4. Migrar para tema Shopify em `clientes/deroche-mantos/shopify/` seguindo `MEMORY/PLAYBOOKS/shopify-instalacao-tema.md` — usar `catalogo/csv/catalogo_shopify.csv` (já pronto, 208 produtos/320 variantes) em vez de recriar do zero.
