---
name: 2026-08-02-padrao-fixo-unico-mantopro-luluimports
description: Manto Pro + Lulu Imports deixam de ser "um dos 4 temas" e viram o padrão fixo único e obrigatório de e-commerce da Sety Studio, substituindo a escolha por nicho
metadata:
  type: project
---

# Decisão: Manto Pro + Lulu Imports = padrão fixo único (substitui os 4 temas)

**Data**: 2026-08-02

## O que foi decidido

O Seven declarou, depois de ver o componente de página de produto extraído do mantoprooficial.com.br: **"O padrão da Sety Studio vai ser 1000000% esse dois sites aí — mantoprooficial.com.br e luluimports.com.br. Esse vai ser o padrão fixo da Sety Studio em todas as configurações, em tudooooo."**

Isso substitui totalmente a lógica anterior do [[theme-engine]] (ver [[2026-08-01-theme-engine-biblioteca-temas-premium]]), que escolhia entre 4 temas conforme o nicho/personalidade do cliente (Lulu Imports default, Underz Store pra marca sem identidade, Fist Street pra marca agressiva, Esportivo pra futebol). A partir de agora:

- **Manto Pro + Lulu Imports juntos = único ponto de partida**, pra qualquer cliente novo, qualquer nicho — não é mais "qual dos 4 temas encaixa melhor", é sempre esse combo.
- Confirmado explicitamente pelo Seven via pergunta direta: "Substitui totalmente" (não é "novo default com opção de fallback").
- Underz Store e Fist Street ficam como **referência histórica arquivada** (os arquivos continuam em `MEMORY/TEMPLATES/`, não foram apagados), mas não são mais escolha ativa em projeto novo.

## Divisão de papéis entre os dois sites

- **Lulu Imports** (luluimports.com.br) — estrutura geral: home, navegação, carrossel de produtos, listagem/categoria.
- **Manto Pro** (mantoprooficial.com.br) — página de produto completa e checkout: bloco de compra (já coberto em [[padrao-icones-checkout]]) **e** o que vem abaixo dele — abas Descrição/Tabela de medidas, banner de cartão de crédito, selos de segurança extras, relacionados ("Você também vai gostar"), "Vistos recentemente", FAQ em accordion, footer com selos de loja verificada.

## Por quê

O Seven já vinha sinalizando essa direção desde 2026-08-01 (regra "checkout nível Manto Pro + carrossel nível Lulu Imports" como padrão transversal aos 4 temas, em [[padrao-icones-checkout]]). Ver o componente de produto pronto (extraído com fidelidade via Playwright/estilos computados) validou que esse nível de acabamento é o que ele quer em **tudo**, não só numa seção — resolve de vez a ambiguidade "qual tema usar" que existia com 4 opções.

## Como aplicar

- Ao criar site novo de e-commerce pra cliente, não perguntar mais "qual tema encaixa" — usar sempre a estrutura Lulu Imports (geral) + Manto Pro (produto/checkout), adaptando cor de marca (`--sety-accent` no componente) e conteúdo pro nicho do cliente.
- Componente de produto pronto e completo: `templates/componentes/pagina-produto-checkout.html` — cobre a página inteira (bloco de compra + descrição/tabela de medidas + selos + relacionados + FAQ + footer).
- Componente de home pronto: `templates/componentes/home-ecommerce.html` — barra de anúncio, topbar, header, hero, diferenciais, categorias, carrossel de produtos, banner de coleção, FAQ de objeções, depoimentos, newsletter, footer. Ambos testados desktop + mobile + interatividade via Playwright em 2026-08-02.
- `.claude/skills/theme-engine/SKILL.md` atualizado pra refletir esse padrão único.

## Relacionado

- [[2026-08-01-theme-engine-biblioteca-temas-premium]] — decisão anterior que este registro substitui parcialmente (a lógica de escolha por nicho)
- [[padrao-icones-checkout]] — spec do componente de produto/checkout, agora expandida
- [[feedback_icones_reais_nunca_emoji]] — regra que se mantém: nunca emoji, mesmo quando o site de referência usa (Manto Pro usa emoji ✅ em alguns pontos — a Sety Studio substitui por ícone SVG real)
