---
name: sparta-tech-acesso
description: "Acesso técnico e pendências do cliente Sparta Tech — e-commerce de acessórios tech, tema Sety Studio"
metadata:
  type: project
---

# Sparta Tech — Acesso técnico

## O que é

E-commerce de acessórios para celular/eletrônicos (capas, películas, cabos, fones, smartwatch, carregadores, suportes). Cliente novo da Sety Studio, criado em 2026-08-04, tema padrão da agência (Manto Pro + Lulu Imports via `/theme-engine`), paleta azul/cinza/preto.

## Onde está

- **Código**: `E:\MazyOS\clientes\sparta-tech\site\` (HTML/CSS/JS puro — `index.html`, `catalogo.html`, `produto.html?p=<handle>`, `css/style.css`, `js/catalog.js` + `js/main.js`).
- **Publicado**: https://sparta-tech.vercel.app (projeto Vercel `sparta-tech`, time `sety-studio-s-projects`). SSO Protection desabilitada.

## Por que existe

Seven pediu site novo pro cliente Sparta Tech, com referência de estrutura/catálogo em `gorilashield.com.br` (concorrente real, loja multimarcas de acessórios pra celular). Antes de raspar o site do concorrente, alinhei com ele que copiar catálogo+preços+fotos 1:1 de um concorrente ativo é risco de direitos autorais/concorrência desleal — ele confirmou a opção conservadora: estrutura própria, catálogo genérico do nicho, sem puxar nada direto do site de referência. Ver [[feedback_nao_clonar_catalogo_concorrente]].

## Como foi montado

- Fotos de produto **100% geradas por IA** (Higgsfield/`z_image`, still de estúdio fundo branco) — zero risco de direitos autorais de terceiros, zero dependência de fornecedor real ainda não definido. Otimizadas pra WebP (14-50KB cada, hero 21KB) via `scripts/otimizar-imagens-sparta.mjs`.
- 11 produtos fictícios (preço/nome/categoria de exemplo) cobrindo 7 categorias: Capas, Películas, Cabos, Fones, Smartwatch, Carregadores, Suportes.
- Logo próprio criado (ícone de capacete espartano geométrico + wordmark "SPARTA TECH", SVG em `imagens/logo-sparta-tech.svg`).
- Selo "Feito por Sety Studio" no footer (logo copiado de `saidas/sety-studio-live/logo.svg`).
- Testado desktop (1440px) + mobile (390px) + interatividade (menu mobile, seletor de modelo, abas descrição/especificações, FAQ accordion, filtro de categoria no catálogo, carrossel) via Playwright — zero erros de console.

## Pendências que só o Seven resolve

- **Catálogo real**: todos os 11 produtos são fictícios (nome/preço/foto de exemplo) — precisa do catálogo real do fornecedor da Sparta Tech (fotos + preços reais) pra substituir.
- **WhatsApp real**: placeholder `5591999999999` em todos os links (header, footer, botão flutuante, CTAs de produto).
- **Contato real**: telefone `(91) 99999-9999` e e-mail `contato@spartatech.com.br` são placeholder.
- **Redes sociais**: Instagram/TikTok do rodapé apontam pra `#` (sem perfil ainda).
- **Checkout**: hoje os CTAs "Adicionar à Sacola"/"Comprar" não têm checkout real conectado (nem CartPanda nem carrinho funcional) — só os links de WhatsApp funcionam de fato.

## Relacionado

- [[project_cliente_sparta_tech]] — memória auto-recall
- `MEMORY/CLIENTES/sparta-tech.md`
- [[feedback_nao_clonar_catalogo_concorrente]]
