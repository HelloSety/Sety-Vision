# Vellarie

> Projeto criado em 2026-09-02. Pasta dedicada — instruções aqui sobrescrevem as da raiz quando relevantes.

## Sobre

Cliente novo de e-commerce. Loja **Shopify** de bem-estar / autocuidado / beleza (massageadores, terapia de luz vermelha, alívio de dor, cuidado capilar, ferramentas de beleza e barbearia). Catálogo importado de fornecedor (dropshipping). Objetivo: configurar a loja inteira — catálogo em PT-BR, coleções, navegação, políticas, frete, branding no tema — deixando pronta pra vender.

## Tipo

Cliente novo.

## Entregas previstas

- Configuração completa da loja Shopify (`4zevyg-1g.myshopify.com` / `vellarie.store`)
- Localização PT-BR do catálogo (18 produtos)
- Coleções por categoria + navegação
- Políticas PT-BR
- Frete configurado
- Branding aplicado no tema publicado
- SEO básico (loja + coleções)

## Onde salvar o que

- Acesso, credenciais e diagnóstico da loja: `ACESSO.md` nesta pasta
- Briefing do cliente: `briefing.md` nesta pasta
- Nota-mãe no Second Brain: `MEMORY/CLIENTES/vellarie.md`
- Assets de marca (logo, favicon, banners): `assets/` nesta pasta
- Scripts pontuais de configuração da loja: `scripts/` nesta pasta

## Contexto que herda da raiz

Herda tom de voz, marca da agência e contexto do negócio de `_memoria/` e `identidade/` da raiz. Não duplicar aqui.

## Específico desse projeto

- **Plataforma: Shopify** (não é Nuvemshop — o padrão da casa pra outros clientes de loja). Toda operação na loja é via **Shopify CLI** (`shopify store execute --store 4zevyg-1g.myshopify.com ...`), ver `ACESSO.md`.
- **Não é o `/theme-engine`** (Manto Pro + Lulu Imports é HTML estático). Aqui o tema é do ecossistema Shopify (tema "E-com Express" publicado; "Horizon" em rascunho).
- Loja **está no ar** (sem senha) — mudanças em massa nos 18 produtos são visíveis pro público na hora. Confirmar com Seven antes de rodar mutation em lote que altere títulos/preços de produto ativo.
- Toda copy de produto, coleção, política e menu em **PT-BR**.
