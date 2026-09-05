---
name: seo-checklist-sety
description: Checklist operacional de SEO da setystudio.com.br — o que validar antes e depois de cada deploy, com o critério "só marca [x] se viu no navegador".
metadata:
  type: playbook
---

# SEO Checklist — Sety Studio

Complemento operacional de [[seo-sety-master]]. Regra de ouro do Seven:
**só marca `[x]` quando: (1) código implementado, (2) build/serve ok, (3) local mostra, (4) produção mostra, (5) validado visualmente.** Caso contrário `[ ] PENDENTE` ou `[!] BLOQUEADO`.

## Técnico
- [ ] `<title>` único e comercial
- [ ] `<meta name="description">` 140–160 car., com serviço + benefício
- [ ] `<link rel="canonical">` = `https://www.setystudio.com.br/` (nunca Vercel)
- [ ] `<meta name="robots">` = `index,follow` na home / `noindex` em `/seo`
- [ ] `/robots.txt` acessível + aponta o sitemap
- [ ] `/sitemap.xml` acessível, `<loc>` no domínio oficial, `lastmod` atual
- [ ] HTTPS + HSTS + headers de segurança (vercel.json)
- [ ] URLs limpas (`/seo`, não `/seo.html`)
- [ ] sem cadeia de redirect (apex → www direto)

## Dados estruturados (validar no Rich Results Test)
- [ ] `Organization` + `ProfessionalService` (logo, founders, areaServed, contactPoint, makesOffer, knowsAbout, sameAs)
- [ ] `WebSite`
- [ ] `FAQPage` — texto idêntico ao FAQ visível (`js/config.js → window.FAQ`)
- [ ] sem erro / sem warning crítico

## On-page
- [ ] 1 `<h1>`
- [ ] 1 `<h2>` por seção, hierarquia sem pular nível
- [ ] `alt` em toda imagem com conteúdo (decorativa = `alt=""`)
- [ ] keywords dos 6 clusters presentes em copy real (hero, serviços, marquee, FAQ, rodapé) — **sem lista visível**
- [ ] internal links: nav âncora + coluna "Navegar" do rodapé

## Social
- [ ] `og:title/description/url/image` (1200×630) + `twitter:card=summary_large_image`
- [ ] preview ok no compartilhamento (WhatsApp/LinkedIn)

## Conteúdo semântico por serviço
- [ ] Nuvemshop — citado em FAQ + schema + marquee
- [ ] Shopify — idem
- [ ] E-commerce / loja virtual — idem
- [ ] Tráfego pago / Meta Ads / Google Ads / TikTok Ads — idem
- [ ] Branding / identidade visual — idem

## Analytics
- [ ] `TRACKING_CONFIG` preenchido (GA4 / GTM / Meta Pixel) — hoje **[!] BLOQUEADO: sem ID**
- [ ] eventos no dataLayer: `page_view`, `scroll_depth`, `click_whatsapp`, `click_primary_cta`, `view_*`, `resultado_open`, `faq_open`
- [ ] Search Console: domínio verificado + sitemap enviado — **[!] BLOQUEADO: sem acesso**
- [ ] conversões definidas = `click_whatsapp` + `click_primary_cta`

## Performance (lab, viewport 1440, cache frio)
- [ ] LCP < 2,5 s   - [ ] CLS < 0,1   - [ ] FCP < 1,8 s   - [ ] TTFB < 0,8 s
- [ ] hero com preload + `fetchpriority=high`
- [ ] imagens webp + lazy + width/height
- [ ] zero JS de terceiros enquanto não houver analytics

## Responsividade (screenshot real em cada largura)
- [ ] 320 360 375 390 414 (mobile)   - [ ] 768 834 1024 (tablet)
- [ ] 1280 1366 1440 1920 2560 (desktop)
- [ ] sem scroll horizontal   - [ ] hero: texto não invade as figuras   - [ ] CTA visível   - [ ] sem espaço preto exagerado no mobile

## Deploy
- [ ] `git status` / `git diff` revisados
- [ ] commit + push na branch de produção (`finalizacao-sety-pagina-venda`)
- [ ] `vercel --prod`
- [ ] `curl -sI https://www.setystudio.com.br/` → `Etag`/`Last-Modified` mudaram
- [ ] home aberta no navegador (hard refresh) mostra a alteração
- [ ] `sety-pagina-venda.vercel.app` == produção (é o mesmo deployment)
