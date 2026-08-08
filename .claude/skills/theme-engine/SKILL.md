---
name: theme-engine
description: >
  Padrão fixo único de e-commerce da Sety Studio: Manto Pro + Lulu Imports. Antes de criar
  qualquer site de e-commerce do zero para cliente novo, usar essa base (estrutura + design
  system real, extraído dos dois sites de referência) — não há mais escolha entre temas por nicho.
  Use quando o usuário disser "/theme-engine", "faz o site de [cliente] com o tema Sety Studio",
  "criar site pro cliente X" (e-commerce), "aplicar tema", "novo cliente de loja" ou pedir
  um site de loja virtual novo. Gatilho padrão do Seven: "faça tal site com o tema Sety Studio" —
  sempre que ouvir essa frase, aplicar o processo desta skill sem perguntar de novo qual é o processo.
---

# /theme-engine — Sety Vision Theme Engine

Padrão único de e-commerce da Sety Studio pra acelerar a criação de sites de clientes novos, sem começar do zero. Decisão do Seven em 2026-08-02 ([[2026-08-02-padrao-fixo-unico-mantopro-luluimports]]): **Manto Pro + Lulu Imports substituem totalmente** a antiga biblioteca de 4 temas escolhidos por nicho — agora é sempre esse combo, pra qualquer cliente, qualquer nicho.

**Regra de ouro**: nunca criar um e-commerce novo do zero sem antes checar esta base.

## O padrão fixo: Manto Pro + Lulu Imports

| Referência | Papel | Arquivo |
|---|---|---|
| **Lulu Imports** (luluimports.com.br) | Estrutura geral: home, navegação, carrossel de produtos, listagem/categoria | [`MEMORY/TEMPLATES/tema-lulu-imports.md`](../../../MEMORY/TEMPLATES/tema-lulu-imports.md) |
| **Manto Pro** (mantoprooficial.com.br) | Página de produto completa e checkout: bloco de compra + descrição/tabela de medidas + selos de segurança + relacionados + FAQ + footer | [`MEMORY/TEMPLATES/tema-esportivo.md`](../../../MEMORY/TEMPLATES/tema-esportivo.md) (specs) + [`templates/componentes/pagina-produto-checkout.html`](../../../templates/componentes/pagina-produto-checkout.html) (componente pronto) |

**Componentes prontos pra copiar/colar** (ambos testados desktop + mobile + interatividade):
- [`templates/componentes/home-ecommerce.html`](../../../templates/componentes/home-ecommerce.html) — home completa: barra de anúncio giratória, topbar de contato, header, hero, 4 diferenciais, categorias, carrossel de produtos, banner de coleção, FAQ de objeções, depoimentos, newsletter, footer (com selo Sety Studio já incluso).
- [`templates/componentes/pagina-produto-checkout.html`](../../../templates/componentes/pagina-produto-checkout.html) — página de produto completa (ver linha acima).

Cada arquivo documenta: paleta em hex exato, tipografia (fonte real confirmada via CSS computado), estrutura de seções em ordem, componentes (header, card de produto, galeria, carrinho, checkout), grid/container, e o que especificamente faz o site parecer caro/profissional.

**Temas antigos arquivados** (não são mais escolha ativa, ficam só como referência histórica): Underz Store (`MEMORY/TEMPLATES/tema-underz-store.md`) e Fist Street (`MEMORY/TEMPLATES/tema-fist-street.md`, cliente real — o site dele continua no ar como está, isso não afeta clientes já entregues).

**Padrão transversal obrigatório**: página de produto e carrossel de produtos seguem a especificação de [`MEMORY/PLAYBOOKS/padrao-icones-checkout.md`](../../../MEMORY/PLAYBOOKS/padrao-icones-checkout.md) — checkout nível Manto Pro + carrossel nível Lulu Imports, com ícones SVG reais (nunca emoji, mesmo quando o site de referência usa emoji nativo). Sprite pronto em [`templates/componentes/icones-reais.html`](../../../templates/componentes/icones-reais.html).

## Processo pra cliente novo (7 passos)

1. **Ler os arquivos de referência** (Lulu Imports + Manto Pro/Esportivo) por completo antes de codar, se ainda não tiver a estrutura fresca na memória.
2. **Clonar a estrutura**: seções na mesma ordem, mesmos componentes (header, hero, grid de produto, página de produto completa, footer) — reescritos como código próprio da Sety, não copiado de arquivo-fonte de terceiro.
3. **Aplicar o branding do cliente**: trocar a paleta (manter a lógica "1 cor de destaque sobre neutro", mas com o hue da marca do cliente — variável `--sety-accent` no componente de produto), tipografia se o cliente já tiver uma definida, logo, nome, produtos reais.
4. **Adicionar o selo Sety Studio** (ver regra abaixo) — obrigatório em todo site entregue.
5. **Revisar mobile** — as duas referências são mobile-first, testar sempre.
6. **Testar no navegador** antes de entregar (interatividade: seletor de tamanho, quantidade, personalização, CTAs).
7. **Entregar** seguindo o [Playbook de Entrega de Site](../../../MEMORY/PLAYBOOKS/entrega-site.md).

## Regra fixa: selo Sety Studio em todo site

Todo site construído a partir deste padrão leva um crédito discreto no footer: **"Feito por Sety Studio"** (ou "Site por Sety Studio"), linkando para `setystudio.com.br`, com o logotipo oficial da agência.

- **Logo oficial**: `saidas/sety-studio-live/logo.svg` (versão do site institucional em produção — copiar pra pasta de assets do cliente, não referenciar o path direto).
- **Onde**: última linha do footer, discreto (tamanho pequeno, baixo contraste, não compete com a marca do cliente).
- **Por quê**: cada site entregue funciona como peça de portfólio/prospecção — decisão do Seven, aplicar sempre, sem perguntar de novo.

## Checklist de qualidade antes de entregar

- [ ] Paleta do cliente aplicada (não sobrou nenhuma cor das referências Manto Pro/Lulu Imports)
- [ ] Tipografia legível e consistente (máximo 2 famílias, como nas duas referências)
- [ ] `object-fit: cover` nas imagens de produto (não `fill` — bug comum em temas Tiendanube, ver nota em tema-lulu-imports.md)
- [ ] Mobile testado (breakpoint principal + menor)
- [ ] Selo Sety Studio no footer
- [ ] CTA principal com 1 única cor de destaque em todo o funil (não diluir com várias cores)
- [ ] Zero emoji em qualquer peça (pagamento, WhatsApp, frete, segurança são sempre ícone SVG real — ver [`padrao-icones-checkout.md`](../../../MEMORY/PLAYBOOKS/padrao-icones-checkout.md))
- [ ] Página de produto e carrossel seguem o padrão Manto Pro/Lulu Imports do checklist acima

## Relacionado

- [[2026-08-02-padrao-fixo-unico-mantopro-luluimports]] — decisão que fixou esse padrão único
- [[project_cliente_fist_street]] — Fist Street é cliente real, tema arquivado (não afeta o site já entregue)
- Playbook geral de entrega: `MEMORY/PLAYBOOKS/entrega-site.md`
- Playbook de instalação de tema Shopify: `MEMORY/PLAYBOOKS/shopify-instalacao-tema.md`
