---
name: l2-store
description: Cliente L2 Store — loja de streetwear (camisetas, tênis, calças, bonés, jaquetas) originais e primeira linha, site publicado no Vercel no tema oficial Sety Studio (Manto Pro + Lulu Imports)
metadata:
  type: project
---

# L2 Store — Acesso rápido

Cliente: L2 Store
Nicho: moda de rua / streetwear — camisetas, tênis, calças, bonés, jaquetas, produtos originais e de primeira linha
Instagram: https://www.instagram.com/l2_store___/
WhatsApp: (11) 98538-5239
Endereço: Rua Serra dos Parecis, 239

## Produção

**Site ao vivo:** https://l2-store.vercel.app
Projeto Vercel: `l2-store` (escopo `sety-studio-s-projects`, projectId `prj_P2L6JCLp6BHngSYzCqv45UDXpgdv`). Proteção SSO desativada (link é público).
Código: `clientes/l2-store/site/` — HTML/CSS/JS estático puro, catálogo dinâmico via JS (sem backend).

**Arquivos de marca pra enviar ao cliente:**
- Logo (fundo preto, com texto) em alta resolução: https://l2-store.vercel.app/assets/img/l2-store-logo-alta-resolucao.png
- Ícone isolado do leão (sem texto, quadrado — bom pra foto de perfil/redes sociais): https://l2-store.vercel.app/assets/img/l2-store-icone-leao.png
- Favicon já aplicado no site (gerado a partir da logo real, não é mais o placeholder genérico "L2").

## Histórico

**2026-08-04 — v3 (versão atual): reforma completa no tema oficial Sety Studio.** Seven pediu pra reformular o site inteiro aplicando o padrão fixo da agência (Manto Pro + Lulu Imports, skill `/theme-engine`). Como o site já estava em produção e a pasta não tem git, confirmei o escopo antes de reescrever (reconstrução completa foi a opção escolhida) e fiz backup da v2 em `clientes/l2-store/site-backup-20260804-144225/`. Mudanças principais:
- Página de produto virou uma página dedicada (`produto.html?p=handle`), no lugar do modal que a v2 usava — segue o padrão editorial do Manto Pro (galeria, badges, bloco Pix, seletor de tamanho, 2 CTAs de WhatsApp, abas Descrição/Trocas, produtos relacionados, selos de confiança).
- Home reconstruída com barra de anúncio giratória, topbar de contato, categorias clicáveis, carrossel "Mais Vendidos", banner de coleção, catálogo completo com filtro, FAQ, newsletter — tudo com a paleta dourada da L2 (`#ad8a3c`).
- Selo "Feito por Sety Studio" adicionado no footer (obrigatório em todo site no novo padrão), logo em `assets/img/sety-studio-logo.svg`.
- Todos os ícones (WhatsApp, endereço, telefone, pagamento, segurança) viraram SVG real — zero emoji, seguindo o padrão fixo de checkout da agência.
- `products.js` passou a concentrar as funções de card/preço/WhatsApp compartilhadas entre a home e a página de produto.
- **Atenção pra próximos deploys:** o alias curto `l2-store.vercel.app` não segue automaticamente `vercel deploy --prod` quando já existe alias manual — depois de cada deploy, confirmar com `vercel alias ls` e rodar `vercel alias set <deployment> l2-store.vercel.app` se precisar.

**2026-07-30 — v1:** Landing page única (HTML/CSS/JS simples) criada a partir do briefing recebido via WhatsApp, inspirada no artigosdocorre.com.

**2026-07-30 — v2:** Seven pediu explicitamente pra seguir a estrutura de outro projeto da casa — **https://usefist.com.br/** — que já tinha sido portado 1:1 pro cliente Valadão Surf (`clientes/valadao-surf/site/`). Reconstruí o L2 Store inteiro em cima dessa base: header com busca + nav sticky, hero banner, slider de banners promo (autoplay + touch swipe), cards de categoria, catálogo com filtro por categoria, modal de produto (fotos, tamanhos, botão de compra WhatsApp), grid de "mais vendidos", seção de benefícios, sobre, FAQ com acordeão, footer completo, WhatsApp flutuante. Paleta adaptada pro dourado da L2 Store (`--accent: #ad8a3c` sobre fundo claro, mesma estrutura de variáveis CSS do Valadão), tipografia mantida (Anton itálico + Inter, mesma da referência).

**Catálogo:** 15 produtos de **exemplo** (`estimated: true` em todos, badge "Exemplo" visível no card) cobrindo as 5 categorias — Camisetas, Tênis, Calças, Bonés, Jaquetas — com marcas mencionadas pelo cliente (Nike, Jordan, Tommy Hilfiger, Adidas, Puma, New Era) e preços fictícios de referência. Fotos de produto são placeholders SVG (ícone + label por categoria, gerados localmente) — não são fotos reais.

**Favicon/logo:** favicon.png gerado a partir da logo real do cliente (recortada pra isolar só o leão, sem o texto "L2 STORE"), em vez do placeholder genérico da v1. **Tentativa de vetorização (SVG) via potrace não teve qualidade suficiente pra entrega** — o resultado automático saiu com ruído/artefatos e perdeu o efeito metálico da logo original; vetorização de qualidade exigiria retraçar a logo manualmente em Illustrator/Figma (ou uma ferramenta paga tipo Vector Magic), não foi feito. Em vez disso, foi gerada uma versão em PNG de alta resolução (1152×896, comprimida) como arquivo mestre pra uso do cliente.

Otimização de imagem: logo original (1.8MB) e foto do hero (114KB) comprimidas com `sharp` pra 47KB e 85KB respectivamente antes de publicar.

**Nota operacional:** o Playwright MCP ficou indisponível a sessão inteira (browser compartilhado em uso por outra sessão em paralelo) — validação visual feita abrindo o site publicado direto no navegador do Seven, não via screenshot automatizado.

## Pendências reais antes do cliente divulgar o link

1. **Catálogo é 100% de exemplo** — todos os 15 produtos têm preço/nome fictício (badge "Exemplo"). Precisa: fotos reais de produto do cliente, nomes/modelos reais, preços confirmados.
2. **Depoimentos removidos nessa versão** (a v1 tinha uma seção de depoimentos placeholder — a estrutura do usefist/Valadão não tem essa seção, então foi descontinuada). Se o cliente quiser, dá pra readicionar com depoimentos reais.
3. Confirmar se o cliente aceita o modelo "preço + Pix + WhatsApp pra fechar" (mesmo modelo do Valadão Surf) ou prefere sem preço público.
4. Domínio próprio (`l2store.com.br` ou similar) ainda não configurado — hoje só `.vercel.app`.
5. Vetorização real da logo (se o cliente precisar em vetor pra bordado/impressão grande) precisa ser feita manualmente, não pela automação tentada aqui.

## Próximos passos

1. Cliente confirma/envia catálogo real (fotos + preços) pra substituir os 15 produtos de exemplo.
2. Seven envia os arquivos de logo (links acima) pro cliente conferir.
3. Definir domínio próprio.
