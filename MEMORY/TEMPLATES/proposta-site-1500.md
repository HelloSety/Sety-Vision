---
name: proposta-site-1500
description: Template de proposta comercial em PDF (3 páginas) para o serviço de Site institucional a R$1.500
metadata:
  type: reference
---

Template pronto para gerar proposta comercial rápida de Site institucional, valor fechado R$1.500.

**Fonte:** `propostas/site-1500-2026-08-09.html` (e seu `.pdf` gerado)

**Estilo:** fundo branco, documento clean e profissional (não segue o design-guide preto/vermelho padrão da marca — decisão explícita do Seven pra esse tipo de peça: proposta comercial pede visual mais sóbrio que carrossel/post). Sem cards, sem ícones, sem emoji — listas numeradas simples e bastante espaço em branco.

**Estrutura (3 páginas, mínimo de informação):**
1. Resumo do serviço — headline + lista numerada de 5 itens do escopo
2. Investimento — preço em destaque (R$1.500) + condições de pagamento (50% início / 50% entrega)
3. Condições — só prazo de entrega e validade da proposta + CTA WhatsApp

Versão anterior (mais longa, fundo preto, com cards/ícones/fluxo de 5 passos) foi descartada a pedido do Seven — manter esse padrão enxuto como referência.

**Como reusar para um cliente novo:**
1. Copiar o HTML para `propostas/<cliente>-<data>.html`
2. Trocar a pill do slide 1 (`Proposta Comercial` → nome do cliente) e ajustar textos se o escopo mudar
3. Gerar PDF via Playwright (script inline usado, equivalente a `scripts/gerar-proposta-pdf.js` mas apontando pro arquivo certo)
4. Entregar o PDF (Downloads local ou direto pro cliente)

Segue a identidade visual padrão (`[[identidade/design-guide.md]]`: preto/vermelho/branco, Montserrat) e o tom de voz direto sem hype da marca.

**Relacionado:** propostas anteriores no mesmo padrão visual — `strategi-capital-2026-07-16.html`, `geovana-stiehl-2026-07-14.html`.
