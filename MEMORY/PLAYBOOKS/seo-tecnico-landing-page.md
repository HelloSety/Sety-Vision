---
name: seo-tecnico-landing-page
description: Checklist técnico de SEO para landing pages/sites da Sety Studio (metadata, schema, semântica, anti-spam) + mapa de keywords por frente de serviço, validado na página de vendas
metadata:
  type: reference
---

# Playbook: SEO técnico para landing page

Processo e checklist usados na página de vendas ([[project_sety_pagina_venda]]) — reutilizar em qualquer site novo da Sety Studio antes de criar algo do zero.

## Regra de ouro (sempre)

SEO entra na **estrutura** (metadata, schema, headings, alt text, copy real já existente), nunca como bloco de texto extra visível só pra keyword, e nunca escondido (cloaking). Ver [[feedback_seo_sem_cloaking]].

- Home continua limpa — sem "parede de texto SEO", sem lista de keywords visível.
- Sem `display:none`, `opacity:0`, `font-size:0`, texto fora da viewport pra manipular ranking.
- Não inventar: números, clientes, faturamento, avaliações, prêmios, endereço, certificação.
- Não prometer ranking, tráfego ou faturamento.

## Checklist técnico (rodar em todo projeto novo)

- [ ] `<title>` único, comercial, 50-60 caracteres, marca no fim
- [ ] `meta description` 140-160 caracteres, sem stuffing
- [ ] `<link rel="canonical">` apontando pro domínio oficial (nunca pro domínio de dev/preview)
- [ ] 1 único `<h1>`; `<h2>` por seção principal; `<h3>` em subitens/cards — nunca heading só por estilo
- [ ] `robots.txt` com `Allow: /` + `Sitemap:` apontando pro domínio oficial
- [ ] `sitemap.xml` só com URLs reais (nunca URL fantasma pra "encher")
- [ ] Open Graph completo (`og:title/description/image/url/type/site_name/locale`) com URLs absolutas do domínio oficial
- [ ] Twitter Card (`summary_large_image` + title/description/image)
- [ ] JSON-LD `Organization` (+ `ProfessionalService` como segundo `@type` no mesmo array quando fizer sentido) com `sameAs` só de perfis reais
- [ ] Todo `<img>` com `alt` descritivo e contextual; decorativo = `alt=""`
- [ ] Nenhuma referência ao domínio de desenvolvimento (`*.vercel.app` etc.) sobrando em canonical/OG/schema/sitemap depois do domínio oficial estar no ar

## Cache-busting (armadilha comum)

Todo asset versionado por query string (`?v=NN`) — CSS, JS, config — **precisa ter o número bumpado a cada edição de conteúdo**, senão o navegador serve a versão cacheada antiga e o teste local mente (já aconteceu: editei `config.js` e o navegador continuou mostrando a versão de antes até eu subir `?v=21`).

## Mapa de keywords por frente (Sety Studio)

Usar como referência de vocabulário a distribuir **naturalmente** dentro da copy real — nunca como lista visível, nunca repetido mecanicamente.

**Sites / web design** (frente principal, sempre pode reivindicar com confiança):
sites institucionais, landing pages, site profissional, criação de sites, web design, site que converte, landing page de alta conversão

**Tráfego pago** (frente principal, confirmada — só Meta Ads e Google Ads têm evidência real; **não** afirmar TikTok Ads/Pinterest Ads sem prova):
tráfego pago, gestão de tráfego pago, Meta Ads, Google Ads, geração de leads, conversão, aquisição de clientes

**E-commerce / lojas virtuais** (confirmado pelo portfólio + stack real da agência):
loja virtual, e-commerce, Nuvemshop, Shopify, criação de loja virtual — ver [[nuvemshop-instalacao]] e [[shopify-instalacao-tema]] pra profundidade técnica real da agência nessas duas plataformas

**Branding / identidade visual** — complementar, não frente principal desta landing page específica (ver [[decisao_posicionamento_estudio_criativo]]). Mencionar só se o projeto tiver prova concreta (peça de branding no portfólio); não criar seção/card dedicado numa página cujo portfólio é só sites/lojas.

## Onde uma keyword nova pode entrar sem virar stuffing

Ordem de prioridade pra encaixar um termo novo:
1. Resposta de FAQ já existente ou uma FAQ nova genuinamente útil (melhor lugar — é conteúdo que o usuário já quer ler)
2. Descrição de um card de serviço já existente
3. `meta description` / JSON-LD `description`
4. Nunca: um parágrafo novo só pra "cobrir" o termo

## Arquitetura de conteúdo futuro (não criar agora)

Só criar página nova quando houver conteúdo real por trás (nunca página vazia "pra rankear"). Candidatas com intenção comercial, se algum dia fizer sentido:
`/servicos/`, `/servicos/nuvemshop/`, `/servicos/shopify/`, `/servicos/trafego-pago/`. Artigos com intenção comercial/investigativa (ex.: "Nuvemshop ou Shopify pra minha empresa?", "quanto custa criar uma loja virtual") são melhores candidatos a conteúdo do que páginas de keyword solta.

## O que ficou de fora conscientemente

- Keyword research com volume/CPC/dificuldade real: precisa de acesso a Google Keyword Planner/Search Console/DataForSEO — sem credencial, não inventar número.
- Plugins/skills de terceiros do GitHub para SEO/CRO/analytics: avaliados e **não instalados** — funcionalidade duplicada do que já se faz direto, ou exige credencial de Ads/API que não estava disponível. Reavaliar só se surgir uma necessidade concreta que o processo manual não cubra.

## Relacionado
[[project_sety_pagina_venda]] · [[decisao_posicionamento_estudio_criativo]] · [[nuvemshop-instalacao]] · [[shopify-instalacao-tema]]
