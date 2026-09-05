---
name: shopify-conversion
description: Conversão em tema Shopify — PDP, cart, CTA, trust, sem dark patterns. Use ao construir/revisar página de produto, carrinho, ou elementos de confiança/oferta.
---

# Shopify Conversion

## Prioridade visual
1. Produto  2. Confiança  3. Benefício  4. CTA  5. Checkout. Nada compete com "ADD TO CART".

## PDP
- Desktop: galeria grande esquerda + info sticky direita. Mobile: imagem → título → preço → variantes → CTA → sticky ATC.
- Preço + `compare_at_price` (só se existir de verdade). Variant picker que atualiza preço/URL/disponibilidade/imagem sem reload.
- `buy_buttons` com dynamic checkout ("Buy it now") quando suportado.
- Accordions: shipping / returns / warranty / details (de metafields). Recomendações + complementares.
- Sticky add-to-cart no mobile (IntersectionObserver no form).

## Cart drawer
- Abre ao adicionar. Mostra: produto, qty (stepper), preço, subtotal, checkout, continue shopping.
- Barra de frete grátis **só** se houver regra real configurada (`free_shipping_threshold` != 0). "You're $X away from free shipping".

## Trust
- Faixa minimalista, ícones lineares finos, tipografia forte, muito espaço.
- Só benefícios reais: Free US shipping / 30-day returns / warranty (se oferecidos) / Secure checkout.

## PROIBIDO (dropshipping tells)
- countdown falso · fake scarcity ("Only 2 left" sem lógica) · reviews inventadas · números fictícios ("4.8/5 · 2,400 reviews" sem app) · popup atrás de popup · desconto "de/por" fake · selos exagerados · copy apelativa de guru.

## Social proof honesto
Sem sistema de reviews conectado → seção preparada p/ app block (`@app`) + estado vazio honesto ("reviews on the way"). Nunca preencher com placeholder que pareça fato.

## Newsletter
Nativo Shopify (`{% form 'customer' %}`, `contact[tags]`). Popup opcional: delay/exit-intent, 1x por sessão (sessionStorage), fácil de fechar, off por default.
