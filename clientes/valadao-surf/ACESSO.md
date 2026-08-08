# Valadão Surf — Acesso rápido

Cliente: Valadão Surf (contato salvo no WhatsApp como "Valadao Surf")
Nicho: streetwear/moda urbana multimarcas — moletons, jaquetas, bermudas/calças, bonés, chinelos e infantil (marcas: MCD, Lost, Quiksilver, Chronic, Monkey, Brothas & Cash, Gangster, Kenner, Jordan/Nike, Máquina 62, Grenich, Multimarcas)
Instagram: https://www.instagram.com/surf_valadao/
Origem: fotos e preços de produto enviados pelo cliente via WhatsApp (prints), catálogo CSV e fotos de produto organizadas pelo Seven

## Referência de design

**Atualizado em 2026-08-03**: tema trocado de usefist.com.br para o padrão fixo Sety Studio (Manto Pro + Lulu Imports, ver skill `/theme-engine`), a pedido do Seven ("faça 100% igual a luluimports.com.br"). Paleta trocada pra preto + amarelo `#FED146` (bate com os banners reais do cliente). Estrutura da home: barra de anúncio giratória, header sticky, hero com banner real do cliente, carrossel circular "Compre por Modelo", carrossel "Mais Vendidos" + 2 carrosséis de coleção (Moletons, Bermudas & Calças) — só 3 coleções na home a pedido do Seven ("tem muito produto na home, deixa organizado"), catálogo completo (44 produtos) movido pra página própria `catalogo.html` com filtros por categoria (suporta `?filtro=categoria` vindo de qualquer link). Página de produto/modal segue nível Manto Pro (checkout completo). Referência original usefist.com.br arquivada (ver `MEMORY/TEMPLATES/tema-fist-street.md`).

## Etapa atual

Duas entregas em paralelo, mesmo catálogo/design, propósitos diferentes:

1. **Protótipo estático** (HTML/CSS/JS puro, sem backend) — publicado em produção.
   **Preview ao vivo:** https://valadao-surf.vercel.app
   Projeto Vercel dedicado (`valadao-surf`, escopo `sety-studio-s-projects`) — não compartilha infraestrutura com nenhum outro cliente.
   Sem carrinho/checkout real — cada produto tem CTA "Comprar pelo WhatsApp" com mensagem pré-preenchida (nome + preço).

2. **Tema Shopify funcional** (`shopify/`) — mesmo design, mas com carrinho AJAX, seleção de tamanho com estoque por variante e checkout nativo do Shopify (Pix/cartão/boleto). Zip pronto pra upload em `shopify/valadao-surf-theme-v1.zip`, CSV de produtos com tamanhos reais em `shopify/produtos/products.csv`, fotos organizadas por handle em `shopify/produtos/imagens/`. Passo a passo completo em `shopify/LEIA-ME.md`. **Ainda não sabemos se o cliente já tem loja Shopify criada** — sem isso não há onde publicar.

**Catálogo (protótipo estático `site/`):** 44 produtos com fotos reais do cliente, preços confirmados via CSV + prints de conversa. Categorias: Moletons (18), Jaquetas (1), Bermudas & Calças (11), Bonés (5), Chinelos (5), Infantil (4). Em 2026-08-03, a pedido do Seven, separados em produtos individuais os itens que misturavam vários modelos/cores numa entrada só: chinelo Kenner (1→5), bermuda basquete Jordan (1→5, 3 Lakers + 2 Jordan Jumpman), bombojaco infantil Gangster (1→2, marrom + azul-marinho). `moletom-canguru-quiksilver-3-cabos` ficou como está — as fotos são still-life de grupo, sem enquadramento individual por cor, não dava pra separar com qualidade sem foto nova. **O tema Shopify (`shopify/`) não foi atualizado nessa rodada** — ainda reflete o catálogo de 31 produtos e o tema antigo; sincronizar se for pra produção.

## Pendências reais para produção

- **Número de WhatsApp**: placeholder (`5591999999999`) em `site/assets/js/site.js` E em `shopify/theme/config/settings_data.json` — trocar pelo número real nos dois lugares antes de publicar de verdade.
- **Logo oficial**: o cliente mandou o logo (tubarão + "Valadão Street Wear") só colado no chat, nunca como arquivo salvo em disco — imagem colada no chat não vira arquivo acessível (ver [[feedback_imagens_coladas_no_chat_sem_arquivo]]), então não dá pra extrair com fidelidade de pixel. Enquanto isso, o header usa wordmark em texto. Pendente: Seven salvar o PNG/SVG original (fundo transparente, ideal duas versões — traço preto sobre claro e traço branco sobre escuro) numa pasta e passar o caminho.
- **Banners e categorias reais aplicados** (2026-08-03): hero "Sejam Muito Bem Vindos", banner de coleção "Bonés Premium" e as 6 artes de categoria (moletons/jaquetas/bermudas/bonés/chinelos/infantil, com título+CTA embutidos) — todos vieram de `D:\sevendsgn\STREETWEAR\SURF VALADAO\`, já no padrão preto/amarelo Lulu Imports com o logo do cliente aplicado. Resta sem banner real: seção "Sobre" (`about-model.jpg` ainda placeholder).
- **Carrinho de compras**: implementado via localStorage (`assets/js/site.js`), sem backend — acumula produtos e fecha tudo numa única mensagem de WhatsApp. Ícone no header (`#cart-open-btn`) + drawer (`#cart-drawer`).
- **Logos de pagamento reais**: `assets/pagamento/{visa,mastercard,elo,pix}.svg` (baixados do Wikimedia Commons, fonte oficial de marca).
- **3 produtos com preço estimado** (badge "Confirmar"): "Bermuda Farad Monkey", "Calça Jeans Bad Nocturnal Shadows", "Bermuda Balão Pixa In" — têm foto real mas preço não confirmado nas fontes disponíveis.
- Confirmar domínio próprio (hoje só `.vercel.app`) e se já existe loja Shopify criada.

## Estrutura de arquivos

```
clientes/valadao-surf/
├── ACESSO.md
├── site/                    (protótipo estático — sem backend)
│   ├── index.html (home, 3 coleções) + catalogo.html (grid completo + filtros) + style.css, vercel.json
│   └── assets/js/products.js (catálogo, 44 produtos) + site.js (WHATSAPP_NUMBER aqui)
└── shopify/                 (tema funcional — carrinho/checkout nativo)
    ├── LEIA-ME.md            (passo a passo de instalação)
    ├── valadao-surf-theme-v1.zip
    ├── theme/                (fonte do tema, Liquid/JSON)
    └── produtos/
        ├── products.csv      (31 produtos, variantes de tamanho reais)
        └── imagens/<handle>/ (fotos reais por produto)
```
