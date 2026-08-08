---
name: l2-store
description: Cliente L2 Store — loja de streetwear (camisetas, tênis, calças, bonés, jaquetas) originais e primeira linha, site publicado no Vercel no tema oficial Sety Studio (Manto Pro + Lulu Imports)
metadata:
  type: project
---

# L2 Store

**O que é:** cliente novo de moda de rua/streetwear — camisetas, tênis, calças, bonés e jaquetas originais e de primeira linha. Loja física com endereço fixo, atendimento via WhatsApp.

**Por que existe:** briefing recebido via WhatsApp em 2026-07-30 (nome, Instagram, produtos, endereço, telefone). Pediu inicialmente um site igual ao artigosdocorre.com, depois pediu explicitamente pra seguir a estrutura do **usefist.com.br** — projeto anterior da Sety Studio já portado 1:1 pro cliente Valadão Surf — o que virou a versão final do site.

## Dados de contato

- Instagram: https://www.instagram.com/l2_store___/
- WhatsApp: (11) 98538-5239
- Endereço: Rua Serra dos Parecis, 239

## Estado atual (2026-08-04 — v3, tema Sety Studio)

- **Site ao vivo:** https://l2-store.vercel.app (projeto Vercel `l2-store`, escopo `sety-studio-s-projects`)
- **Reforma completa (2026-08-04):** Seven pediu explicitamente pra reformular o site inteiro com o tema oficial da Sety Studio (gatilho da skill [[theme-engine]] — Manto Pro + Lulu Imports). Como era projeto real em produção sem git, confirmei o escopo antes ([[feedback_confirmar_antes_de_reescrever_producao]]) — Seven escolheu reconstrução completa. Backup da v2 salvo em `clientes/l2-store/site-backup-20260804-144225/` (sem git na pasta, esse é o único rollback disponível).
- **Código:** `clientes/l2-store/site/` — reescrito do zero em cima dos componentes prontos `templates/componentes/home-ecommerce.html` + `templates/componentes/pagina-produto-checkout.html`. Mudança estrutural: página de produto dedicada (`produto.html?p=handle`) substituindo o modal da v2 — mais fiel ao padrão Manto Pro (galeria lateral, 3→2 CTAs de WhatsApp, abas descrição/trocas, produtos relacionados, selos de confiança). Home com barra de anúncio giratória, topbar, categorias clicáveis, carrossel "Mais Vendidos", banner de coleção, catálogo completo com filtro, FAQ, newsletter. Paleta dourada da L2 mantida (`--accent: #ad8a3c`). Selo "Feito por Sety Studio" no footer (logo copiado de `saidas/sety-studio-live/logo.svg`). Zero emoji — todos os ícones (WhatsApp, endereço, pagamento, segurança) são SVG real.
- Catálogo continua com os mesmos 15 produtos de **exemplo** (preços/fotos fictícios, badge "Exemplo") — não migrado ainda pro catálogo real do cliente.
- `products.js` agora concentra as funções compartilhadas (`productCardHTML`, `fmtBRL`, `whatsLink`) usadas tanto pela home quanto pela página de produto, pra manter os cards visualmente idênticos nos dois contextos.
- **Pegadinha de deploy:** o alias curto `l2-store.vercel.app` não é atualizado automaticamente por `vercel deploy --prod` quando já existe um alias manual apontando pra um deployment antigo — precisou de `vercel alias set <deployment-novo> l2-store.vercel.app` explícito depois do deploy pra parar de servir a v2. Checar sempre com `vercel alias ls` depois de um deploy em projeto que já tem alias customizado.
- Validação visual via Playwright não foi possível (browser MCP ocupado por outra sessão em paralelo, mesma limitação já vista na v2) — validação foi estática (servidor local, IDs JS↔HTML, assets referenciados, sintaxe JS, zero emoji) + smoke test via curl no domínio de produção depois do deploy.
- Favicon gerado a partir da logo real (recortada); vetorização automática da logo (SVG) não teve qualidade suficiente e não foi entregue — só o PNG em alta resolução. Links dos arquivos de marca em `clientes/l2-store/ACESSO.md`.

## Próximos passos

1. Cliente envia catálogo real (fotos + preços) pra substituir os 15 produtos de exemplo.
2. Definir domínio próprio.
3. Validar visualmente no navegador (desktop + mobile) quando o Playwright MCP estiver livre, ou pedir pro Seven conferir direto no link publicado.
4. Se precisar da logo em vetor de verdade (bordado, impressão grande), vai precisar de retraçado manual — a tentativa automática não ficou boa.

Ver `clientes/l2-store/ACESSO.md` para o histórico técnico completo e links diretos dos arquivos de logo.
