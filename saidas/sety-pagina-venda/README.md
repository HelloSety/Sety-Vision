# Sety Studio — Página de vendas (tráfego + sites)

Página de venda estática, fiel ao Figma **"PÁGINA SETY STUDIO"**. HTML/CSS/JS puro — **sem build, sem framework, sem dependências**.
No ar: **https://sety-pagina-venda.vercel.app**

Estrutura: `TRÁFEGO → SITE → CONVERSÃO`. Fluxo: perda de vendas → problema → solução → serviços → como funciona → portfólio → prova (vídeo) → quem faz → CTA.

---

## Rodar local
```bash
python -m http.server 8899      # qualquer servidor estático serve
# http://127.0.0.1:8899
```
Não há `npm install` / `build` / `lint` — é HTML/CSS/JS servido direto.

## Publicar
```bash
cd saidas/sety-pagina-venda
vercel deploy --prod --yes --archive=tgz
```
Projeto Vercel: **`sety-pagina-venda`** (team `sety-studio-s-projects`). **Isolado** — não compartilha nada com `setystudio.com.br` (projeto `sety-studio-live`).

### Domínio próprio
1. `vercel domains add pagina.setystudio.com.br` (ou subdomínio escolhido) no projeto `sety-pagina-venda`
2. em `js/config.js` → `SITE_CONFIG.baseUrl`
3. em `index.html` → `<link rel="canonical">`, `og:url`, `twitter:image`, `og:image`, o `url`/`logo` do JSON-LD
4. em `robots.txt` e `sitemap.xml` → a URL

---

## Onde editar cada coisa — **tudo em `js/config.js`**

| Quero mudar… | Objeto / campo |
|---|---|
| WhatsApp, e-mail, Instagram, Behance, mensagem pré-preenchida do WhatsApp, `baseUrl` | `SITE_CONFIG` |
| IDs de GA4 / GTM / Meta Pixel | `TRACKING_CONFIG` (vazio = nada carrega) |
| Seven / Gabriel — nome, cargo, bio, foto, instagram | `TEAM_MEMBERS` |
| Cards de serviço (título, texto HTML, ícone) | `SERVICES` — ícones válidos: `target`, `layers`, `route` |
| Projetos do portfólio (nome, categoria, imagem, URL do site) | `PORTFOLIO_ITEMS` |
| Depoimentos em vídeo (mp4 + poster + alt) | `TESTIMONIALS` — arquivos em `assets/depoimentos/` |
| Quebra de objeções | `OBJECTIONS` |
| Títulos e copy longa das seções (hero, problema, etc.) | direto no `index.html`, cada dobra tem comentário `<!-- DOBRA N -->` |
| Cores, fontes, radius, sombras, **motion tokens**, breakpoints | `css/styles.css` → bloco `:root` |

### Adicionar um projeto ao portfólio
1. Coloque a imagem em `assets/portfolio/<slug>.webp` (proporção ~414:303, ex 900×659).
2. Em `PORTFOLIO_ITEMS` adicione `{ title, category, image: "assets/portfolio/<slug>.webp", url }`.

### Adicionar / trocar um vídeo de depoimento
1. Comprima: `ffmpeg -i entrada.mp4 -vf "scale=720:-2" -c:v libx264 -crf 27 -preset veryfast -movflags +faststart -c:a aac -b:a 96k assets/depoimentos/tN.mp4`
2. Poster: `ffmpeg -ss 1 -i entrada.mp4 -vframes 1 -q:v 4 assets/depoimentos/tN.jpg`
3. Em `TESTIMONIALS` adicione `{ video, poster, alt }`. `preload="none"` já garante que só baixa ao tocar.

### Trocar uma imagem
Substitua o arquivo em `assets/` mantendo o nome, **ou** aponte outro caminho no `config.js` / `index.html`.

---

## Tracking

`window.trackEvent(nome, props)` centraliza tudo (`js/main.js`). Empurra pro `dataLayer`, pro `fbq` e pro `gtag` quando existirem.

**Como ativar:** cole o ID em `TRACKING_CONFIG` (`js/config.js`). O `main.js` injeta sozinho o script certo (GTM, GA4 gtag ou Meta Pixel). Sem ID = nenhum script de terceiro carrega.

**Como testar:** abra o site com `?` no console — em `localhost` cada evento é logado (`[track] nome`). Em produção, use o Meta Pixel Helper / GA DebugView / preview do GTM.

**Eventos disparados:**
`click_primary_cta` · `click_whatsapp` · `click_behance` · `click_instagram` · `click_projeto` ·
`nav_servicos` / `nav_portfolio` / `nav_depoimentos` / `nav_quem_faz` ·
`view_services` · `view_portfolio` · `view_testimonials` · `video_play`.

Ver `.env.example` para o checklist de IDs/URLs pendentes.

---

## Assets (`assets/`)
> **Cache-busting:** todos os refs de asset + css/js usam `?v=N`. Ao trocar qualquer asset,
> CSS ou JS, **bumpar o N** em `index.html`, `css/styles.css` e `js/config.js` (hoje `v=9`).

| Arquivo | Uso | Origem |
|---|---|---|
| `hero.webp` (2560×826) | fundo do hero desktop | `LANDING PAGE/1.png` |
| `hero-mobile.webp` (1080×1350) | fundo do hero mobile | `CELULAR.png` |
| `og.jpg` (1200×630) | Open Graph / Twitter | recorte do `1.png` |
| `notebook.webp` (1600×965, alpha) | mockup na dobra "Problema" | `LANDING PAGE/NOTEBOOK.png` |
| `bg-mecanismo.webp` (1800w) | fundo da D4 (círculo + blades) | `LANDING PAGE/BG.png` |
| `equipe.webp` | recorte transparente do Gabriel, dobra laranja | `EQUIPE.png` |
| `portfolio/*.webp` (8) | cards de projeto | screenshots ao vivo dos sites |
| `depoimentos/t1..t6.mp4` + `.jpg` | vídeos de resultado + poster (+ caption real em `TESTIMONIALS`) | pasta `GESTÃO` |

Ícones e o logo/estrela são **SVG inline** no `index.html` (nada rasterizado).

---

## Motion
Tokens em `:root`: `--motion-fast/normal/slow`, `--ease-standard/enter/exit`.
Reveal on scroll via `IntersectionObserver` + salvaguarda (revela tudo se o observer falhar). Parallax leve só no fundo do hero (desktop). Blades/glows com movimento lento (14s). **`prefers-reduced-motion: reduce`** mata parallax, loops e reveals — conteúdo continua visível.

## Acessibilidade
HTML semântico, 1×`<h1>`, `<h2>` por seção, `<h3>` nos cards. `alt` em todas as imagens (decorativas com `alt=""`). `focus-visible` em todos os interativos. Menu mobile fecha com Esc / clique fora / clique no item. CTAs têm `href` real (funcionam sem JS).

## Estrutura de pastas
```
sety-pagina-venda/
├── index.html          — marcação, 1 comentário por dobra
├── css/styles.css      — tokens (:root) + componentes + responsivo + reduced-motion
├── js/
│   ├── config.js       — TODA a configuração editável
│   └── main.js          — render (portfólio/depoimentos/objeções/time), nav, menu, reveal, vídeo, tracking
├── assets/             — imagens (webp) + vídeos (mp4) + posters
├── robots.txt · sitemap.xml · vercel.json · .env.example
```
