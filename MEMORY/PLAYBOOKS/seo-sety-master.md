---
name: seo-sety-master
description: Estratégia-mestra de SEO da setystudio.com.br — posicionamento, keywords (Nuvemshop, Shopify, e-commerce, tráfego, branding), technical SEO, CRO, analytics e workflow de deploy.
metadata:
  type: playbook
---

# SEO Master — Sety Studio (setystudio.com.br)

O que é: fonte da verdade da estratégia de SEO da home da Sety Studio.
Por que existe: o Seven pediu SEO real e reutilizável, não checklist marcado no vento.
Com o que se relaciona: [[seo-checklist-sety]], painel interno em `/seo` (arquivo `saidas/sety-pagina-venda/seo.html`), [[padrao-pagina-de-vendas-micas-turbo]], DECISÃO `2026-09-01-sety-studio-posicionamento-estudio-criativo`.

## 1. Posicionamento (dita todo o SEO)
Sety Studio = **estúdio criativo digital**. Quatro pilares: **estratégia + design + aquisição + conversão**.
Não é "só tráfego", não é "só esporte". Oferta principal: **sites + gestão de tráfego pago**; complementos: loja virtual (Nuvemshop/Shopify), branding/identidade visual.
Domínio oficial e canonical: `https://www.setystudio.com.br/` — **nunca** a URL da Vercel.

## 2. Mapa de keywords (uso interno — nunca lista visível na home)
Alimenta: metadata, JSON-LD (`knowsAbout`, `makesOffer`), FAQ, marquee de serviços, futuras páginas de serviço, internal linking.

| Cluster | Núcleo comercial | Long-tail / suporte |
|---|---|---|
| **Nuvemshop** | criação de loja Nuvemshop · loja Nuvemshop profissional | criar/personalizar loja Nuvemshop, site Nuvemshop, e-commerce Nuvemshop, designer/agência/especialista Nuvemshop, layout/customização Nuvemshop |
| **Shopify** | criação de loja Shopify · loja Shopify profissional | criar/personalizar loja Shopify, site/e-commerce Shopify, tema Shopify, designer/agência/especialista Shopify, customização Shopify |
| **E-commerce** | criação de loja virtual · agência de e-commerce | loja virtual, e-commerce profissional, desenvolvimento/design de e-commerce, marketing/tráfego/Meta Ads/Google Ads para e-commerce, conversão em e-commerce, vendas online |
| **Sites** | criação de sites · site que converte | criação de site profissional, site para empresa/institucional/vendas, web design, landing page, criação de landing page, site responsivo |
| **Tráfego** | agência de tráfego pago · gestão de tráfego pago | gestor de tráfego, Meta Ads, Facebook Ads, Instagram Ads, Google Ads, TikTok Ads, Pinterest Ads, geração de leads, marketing/performance digital |
| **Branding** | identidade visual · criação de logotipo | branding, agência de branding, criação de identidade visual, logo profissional, design/posicionamento/identidade de marca |

Regra: distribuir **1 cluster por página** quando as páginas de serviço existirem. Sem keyword stuffing.

## 3. Technical SEO — estado (2026-09-05)
- ✔ Title, meta description, canonical, `robots` meta, `og:*`, `twitter:*` — em `index.html`
- ✔ `robots.txt` + `sitemap.xml` (home, prioridade 1.0) na raiz
- ✔ HTTPS forçado + HSTS + headers de segurança (`vercel.json`)
- ✔ `cleanUrls:true`, `trailingSlash:false` → `/seo` sem `.html`
- ✔ JSON-LD: `Organization`+`ProfessionalService` (makesOffer 6 serviços, knowsAbout 27 termos, contactPoint WhatsApp), `WebSite`, `FAQPage` (12 Q&As)
- ✔ 1 `<h1>`, 1 `<h2>` por seção, `<header>/<main>/<section>/<article>/<footer>/<nav>` semânticos
- ✔ Painel interno `/seo` com `noindex,nofollow` (não polui a home, fora do sitemap)
- ⛔ Enviar sitemap no Search Console + verificar domínio — sem acesso ao GSC
- ⏳ `og.jpg` definitiva 1200×630
- n/a BreadcrumbList — site de página única

## 4. Conteúdo / intenção
- Transacional/comercial: coberto pela home (hero, serviços, FAQ, prova, CTA WhatsApp).
- Informacional: **pendente** — pede `/blog` + páginas de serviço (`/loja-nuvemshop`, `/loja-shopify`, `/trafego-pago`, `/criacao-de-sites`, `/branding`).
- Internal linking: nav âncora + coluna "Navegar" no rodapé (inclui `/seo`) + CTA em toda seção.

## 5. CRO (já aplicado na home)
Hero com 1 promessa + 2 CTAs · prova real (vídeos + prints da pasta RESULTADOS, sem número inventado) · FAQ que quebra objeção · CTA WhatsApp fixo no mobile · "fale direto com quem executa".

## 6. Analytics
Base pronta em `js/main.js` (`dataLayer` + `trackEvent()`): `page_view`, `scroll_depth` (25/50/75/100), `view_services/portfolio/testimonials`, `click_primary_cta`, `click_whatsapp`, `click_projeto`, `resultado_open`, `faq_open`, nav_*.
UTM preservada na querystring. **⛔ Nada dispara pra plataforma até preencher `js/config.js → TRACKING_CONFIG`** (GA4 / GTM / Meta Pixel vazios). Conversões = `click_whatsapp` + `click_primary_cta`.

## 7. Performance (lab 2026-09-05)
LCP ~0,5–0,7 s · FCP ~0,5–0,7 s · CLS ~0,03 · TTFB ~0,17 s (CDN Vercel HIT). INP não medível em lab. Peso crítico ~360 KB.
Otimizações: webp + lazy + width/height, preload do hero por breakpoint + `fetchpriority`, fontes `display=swap`, vídeos só carregam ao abrir o lightbox, zero JS de terceiros.

## 8. Workflow de deploy (site estático — NÃO tem `npm run build`)
```
# editar em saidas/sety-pagina-venda/  → bump ?v= em index.html quando mexer em css/js
cd "saidas/sety-pagina-venda"
python -m http.server 8765          # testar local
node E:/_setywork/shot.mjs ...      # sweep responsivo 320→2560 (script fora do repo)
git add saidas/sety-pagina-venda ; git commit ; git push
vercel --prod                       # deploy (CLI já logado como sevendsgnn-7971)
# validar: curl -sI https://www.setystudio.com.br/  → conferir Etag mudou
```
Produção e `sety-pagina-venda.vercel.app` são **o mesmo deployment** (aliases). Se as duas parecem diferentes → cache do navegador do Seven (não há service worker). Hard refresh resolve.

## Próximos passos
- [ ] preencher TRACKING_CONFIG + verificar GSC + enviar sitemap
- [ ] criar páginas de serviço (1 cluster cada) + `/blog`
- [ ] `og.jpg` 1200×630 definitiva
- [ ] quando houver Keyword Planner/DataForSEO: volume+CPC+concorrência, priorizar long-tail
