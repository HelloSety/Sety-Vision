---
name: 2026-08-01-theme-engine-biblioteca-temas-premium
description: Decisão de criar biblioteca interna de 4 temas-mestre de e-commerce (Theme Engine) pra parar de criar sites do zero e acelerar entrega de clientes novos
metadata:
  type: project
---

# Decisão: Theme Engine — biblioteca de 4 temas premium replicáveis

**Data**: 2026-08-01 (madrugada, sessão iniciada 2026-07-31)

## O que foi decidido

O Seven pediu pra parar de criar e-commerces do zero pra cada cliente novo e, em vez disso, montar uma biblioteca interna de temas-mestre — extraídos de sites reais de mercado — pra reaplicar rapidamente trocando só branding/produto. Objetivo declarado: "para eu finalizar mais rápido".

O pedido original (colado como um "master prompt" de ~9 sites + 5 temas genéricos + 7 "agentes" fictícios + estrutura de pastas paralela `/Sety-Vision-OS`) foi adaptado durante a sessão: a estrutura de pastas paralela foi descartada (duplicaria `MEMORY/` e `identidade/` já existentes) e o escopo de sites foi convergindo, em tempo real via mensagens curtas do Seven, até fechar em **4 temas** a partir de **5 sites reais**:

1. **Lulu Imports** (luluimports.com.br) — declarado "top 1 pra copiar e colar", é o default da biblioteca.
2. **Underz Store** (loja.underzstore.com)
3. **Fist Street** (usefist.com.br) — cliente real da Sety, não referência externa.
4. **Esportivo** = Vancir Sports (lojavancirsports.com.br) + Manto Pro (mantoprooficial.com.br) combinados num tema só (nicho futebol).

Outros sites cotados no meio do processo (Karmaloop, Haven Shop, END Clothing, Sport King, BigGT, Mantos Sports LEM) foram descartados quando o Seven reduziu o escopo pra "só 3 temas... foco total" e depois adicionou o 4º (esportivo).

## Por quê

- Meta de entrega do Seven é landing page em 1 dia / site completo em 3 dias (ver `CLAUDE.md` pessoal) — recriar estrutura/design do zero a cada cliente não bate essa meta.
- Regra de ouro do Seven: "nunca me peça pra fazer o que você pode fazer" — a biblioteca existe pra eu decidir sozinho qual tema usar em vez de perguntar a cada cliente novo.

## Como aplicar

- Skill `/theme-engine` (`.claude/skills/theme-engine/SKILL.md`) formaliza o processo de 8 passos e é o gatilho padrão sempre que o Seven disser "faça o site de [cliente] com o tema Sety Studio".
- Os 4 temas estão documentados em `MEMORY/TEMPLATES/tema-lulu-imports.md`, `tema-underz-store.md`, `tema-fist-street.md`, `tema-esportivo.md` — cada um com paleta em hex exato, tipografia confirmada via CSS computado, estrutura de seções, componentes de produto/carrinho/checkout.
- **Regra fixa nova**: todo site construído a partir de qualquer tema leva selo "Feito por Sety Studio" com logotipo (`saidas/sety-studio-live/logo.svg`) no footer — decisão do Seven, aplicar sempre sem perguntar de novo.
- Lulu Imports é o default; os outros 3 entram por contexto (marca sem identidade → Underz; marca agressiva/streetwear → Fist Street; camisas de futebol → Esportivo).

## Decisão técnica importante (não descrita no pedido original, mas necessária)

"Copiar os códigos" foi interpretado como: extrair tudo que é publicamente observável (HTML renderizado, CSS computado, estrutura, fluxo de produto/carrinho) e usar isso pra **construir tema próprio da Sety com código escrito do zero** — não baixar/reutilizar arquivo-fonte literal de outra empresa (tecnicamente inviável na maioria dos e-commerces modernos com JS bundled, e problemático como entregável pago). O resultado prático pro Seven é o mesmo: visual e estrutura idênticos, pronto pra reaplicar. Ele foi avisado disso em tempo real na sessão e não contestou o limite.

## Observação operacional (pra próxima sessão)

`scripts/sync-memory.js` **não varre subpastas** de `MEMORY/TEMPLATES/` — os 4 arquivos de tema foram inicialmente criados em `MEMORY/TEMPLATES/THEMES/` e tiveram que ser movidos pra `MEMORY/TEMPLATES/` direto (sem subpasta) porque o hook de sync reescreve o índice do zero a cada turn e ignoraria qualquer coisa em subpasta. **Não criar subpastas dentro de `MEMORY/TEMPLATES/`, `MEMORY/CLIENTES/` etc. — o script só lê o nível raiz de cada pasta monitorada.**

## Relacionado

- [[project_cliente_fist_street]]
- Playbook geral: `MEMORY/PLAYBOOKS/entrega-site.md`
