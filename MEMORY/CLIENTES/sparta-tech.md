---
name: sparta-tech
description: Cliente Sparta Tech — e-commerce de acessórios para celular/eletrônicos, tema Sety Studio (Manto Pro + Lulu Imports), paleta azul/cinza/preto, catálogo de exemplo (11 produtos)
metadata:
  type: project
---

# Sparta Tech

**O que é:** e-commerce novo (cliente criado em 2026-08-04) de acessórios para celular e eletrônicos — capas, películas, cabos, fones, pulseiras de smartwatch, power bank, suportes. Paleta de marca: azul, cinza e preto.

**Por que existe:** Seven pediu site novo com o tema padrão da Sety Studio, usando `gorilashield.com.br` (loja multimarcas real de acessórios) como referência de estrutura/catálogo. Antes de raspar o concorrente, alinhei o risco de copiar catálogo+preços+fotos 1:1 de um negócio ativo (direitos autorais das imagens + concorrência desleal) — Seven confirmou a via conservadora: estrutura própria, catálogo genérico do nicho, nada extraído diretamente do site de referência. Ver [[feedback_nao_clonar_catalogo_concorrente]].

## O que foi feito (2026-08-04)

- **Tema-base:** `/theme-engine` (Manto Pro + Lulu Imports), componentes `home-ecommerce.html` + `pagina-produto-checkout.html` como ponto de partida, reescritos com paleta própria (`--sety-accent: #2E6BFF` azul, `--sety-dark: #0B0E14`).
- **Fotos de produto 100% geradas por IA** (Higgsfield, modelo `z_image`, still de estúdio fundo branco) — evita qualquer risco de direitos autorais de terceiros e não depende de fornecedor real ainda não definido. 11 fotos de produto + 1 hero banner, otimizadas em WebP (14-50KB cada) via `scripts/otimizar-imagens-sparta.mjs`.
- **Logo próprio**: ícone de capacete espartano geométrico (SVG) + wordmark "SPARTA TECH", `imagens/logo-sparta-tech.svg`.
- **Catálogo:** 11 produtos fictícios de exemplo (nome/preço/foto) em 7 categorias — Capas, Películas, Cabos, Fones, Smartwatch, Carregadores, Suportes. Dados centralizados em `js/catalog.js` (compartilhado entre home, catálogo e produto, mesmo padrão do Autênticas Store/L2 Store).
- **Páginas:** `index.html` (home), `catalogo.html` (grid completo com filtro por categoria via querystring `?categoria=`), `produto.html?p=<handle>` (checkout premium: seletor de modelo, Pix, 3 CTAs, abas Descrição/Especificações, FAQ accordion, relacionados).
- **Testado** desktop (1440px) + mobile (390px) + interatividade completa (menu mobile, seletor de modelo, abas, FAQ, filtro de categoria, carrossel) via Playwright — zero erros de console.
- **Publicado:** https://sparta-tech.vercel.app (projeto Vercel `sparta-tech`, renomeado de `site` via `vercel project rename`; SSO Protection desabilitada via `vercel project protection disable sparta-tech --sso`).

## Atualização 2026-08-05 — catálogo expandido pra 42 produtos reais

Seven insistiu três vezes pra clonar produto+preço+foto direto do concorrente Gorila Shield, incluindo pedir "150 produtos, copia e cola, sem IA". Mantive o limite de nunca reproduzir as fotos do concorrente (a maioria do catálogo deles — fones, carregadores — é linha de marca própria "Gshield": Atomic, Symetric, Survivor, Orbit, Energy Cube, Powerfit, TankSafe, Hydra, Powerstation), mas resolvi as duas partes legítimas do pedido: (1) nomes e preços reais — são fatos de mercado, sem restrição de copyright, extraídos direto do site; (2) fotos sem IA — busquei em banco de imagem de licença comercial livre (Pexels), curando manualmente cada uma pra excluir logo/marca de terceiro visível (Apple, Samsung, Google Maps, Ford, Garmin, Anker apareceram nas buscas genéricas e foram descartadas).

Resultado: catálogo de **42 produtos** com nomes/preços reais em 7 categorias, 10 fotos-tipo reais (sem IA, sem marca) reaproveitadas entre produtos do mesmo tipo. Ver [[feedback_nao_clonar_catalogo_concorrente]].

## Atualização 2026-08-05 (rodada 3) — 129 produtos, 6 agentes paralelos

Seven pediu "vários agentes para copiar os produtos, sem duplicados, site organizado". Descobri que o site é SSR com preço limpo em `data-sell-price="X.XX"` — escrevi um script de extração por regex 100% determinístico (sem browser, sem LLM resumindo preço) e distribuí pronto pra 6 Agent subagents em paralelo, um por categoria. Consolidei os 87 produtos novos retornados, dedupe por nome contra os 42 já existentes (zero duplicata), criei categoria nova "Acessórios". **Catálogo final: 129 produtos reais em 8 categorias**, publicado em produção. Ver [[feedback_extracao_deterministica_paralela]] e [[feedback_nao_clonar_catalogo_concorrente]].

## Pendências antes de produção real

- Catálogo com fotos do fornecedor real da Sparta Tech (hoje são fotos de banco genérico, não do fornecedor específico)
- WhatsApp real (placeholder `5591999999999` em todos os CTAs)
- Telefone/e-mail reais (placeholders no header/footer)
- Perfis de Instagram/TikTok reais
- Checkout funcional (hoje "Adicionar à Sacola" não tem carrinho real; só os links de WhatsApp funcionam de fato)

## Relacionado

- [[theme-engine-biblioteca]] — base Manto Pro + Lulu Imports usada
- [[feedback_nao_clonar_catalogo_concorrente]]
- Detalhes técnicos completos: `clientes/sparta-tech/ACESSO.md`
