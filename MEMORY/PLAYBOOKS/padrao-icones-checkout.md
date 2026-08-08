---
name: padrao-icones-checkout
description: Regra fixa "nunca emoji, sempre ícone real" + especificação de página de produto e carrossel de produto no nível Manto Pro / Lulu Imports — padrão de qualidade Sety Studio para todo e-commerce entregue
metadata:
  type: project
---

# Padrão Sety Studio: ícones reais + página de produto/checkout premium

Decisão do Seven em 2026-08-01, a partir de referência visual de https://mantoprooficial.com.br/ (página de produto) e https://luluimports.com.br/ (carrossel de produtos). Vira padrão obrigatório em qualquer site de e-commerce novo ou existente da Sety Studio — não é exclusivo de um tema, se aplica aos 4 temas da [[theme-engine-biblioteca]].

## Regra de ouro: nunca emoji em site de cliente

Nenhum emoji — nem Unicode (🔒 📦 💳 ✅ 🛒), nem Apple emoji — em nenhuma peça de e-commerce (site, checkout, e-mail transacional, página de produto). Sempre ícone SVG real: da marca (bandeira de cartão, WhatsApp, redes sociais) ou de função (cadeado, caminhão, sacola, régua) desenhado como ícone de interface, nunca como emoji decorativo.

**Por quê**: emoji quebra a percepção de loja profissional — sinaliza "site amador"/Canva. Ícone SVG consistente com o resto da UI é o que diferencia um checkout que parece confiável (Manto Pro) de um que parece improvisado.

**Onde baixar/copiar**: `templates/componentes/icones-reais.html` — sprite pronto com todos os SVGs inline (pagamento: Visa/Mastercard/Elo/Hipercard/Amex/Discover/Pix/Boleto; WhatsApp; frete; segurança; sacola; busca; usuário; setas de carrossel; quantidade +/-; redes sociais). Copiar o `<svg>` inline direto no HTML do cliente — nunca linkar CDN externo (evita layout shift e dependência de terceiro fora do ar).

## Componente 1 — Página de produto premium (referência: Manto Pro)

**Pronto pra copiar e colar**: [`templates/componentes/pagina-produto-checkout.html`](../../templates/componentes/pagina-produto-checkout.html) — HTML/CSS/JS standalone extraído com fidelidade (estilos computados reais via Playwright) da página de produto do mantoprooficial.com.br em 2026-08-02. Cobre a página **inteira**, não só o bloco de compra: galeria + bloco de compra, abas Descrição/Tabela de medidas, ícones de confiança (Rastreio/Parcele sua compra/Suporte), banner de cartão de crédito, selos completos (formas de pagamento + Compra 100% Segura + Ambiente Criptografado), carrossel "Você também vai gostar", "Vistos recentemente", FAQ em accordion e footer completo (menu, atendimento com WhatsApp, pagamento, selos de loja verificada). Testado desktop + mobile + toda a interatividade (seletor de tamanho, toggle personalizar, quantidade, abas, accordion FAQ). Basta copiar pro tema do cliente, trocar a variável CSS `--sety-accent` pela cor de marca, os placeholders `{{ nome_do_produto }}`/`{{ preco_atual }}`/etc. pelos dados reais, e o número de WhatsApp nos links de CTA.

**Nota de fidelidade**: o banner de cartão de crédito e o bloco "Compra 100% Segura / Ambiente Criptografado" não estavam mais presentes no HTML ao vivo do site no momento da extração (2026-08-02) — foram recriados a partir da screenshot que o Seven enviou, mantendo o texto exato, mas com ícones SVG reais no lugar dos emojis (✅🔒) que aparecem no site de referência — ver regra em [[feedback_icones_reais_nunca_emoji]].

Nível de acabamento a replicar em qualquer página de produto de e-commerce esportivo/streetwear da Sety Studio:

1. **Barra de anúncio giratória** no topo (preta, texto branco centralizado, setas ‹ › reais nas laterais) — ex: "10% OFF comprando no Pix". Rotaciona 2-3 mensagens.
2. **Badges duplos acima do título**: um badge de oferta (ex: "LEVE 5 PAGUE 4", verde) + um badge de qualidade (ex: "QUALIDADE PREMIUM", preto) — nunca só um.
3. **Preço**: de/por lado a lado + badge de % desconto (verde) + linha de parcelamento ("em até 12x de R$X,XX") + link expansível "+ Formas de Pagamento".
4. **Bloco PIX destacado**: fundo verde-claro, ícone real do Pix + texto "X% OFF no pix" + badge "Envio Prioritário" — visualmente separado do resto (chama atenção pro meio de pagamento mais barato pro lojista).
5. **Seletor de tamanho**: pills retangulares com borda (não círculo), tamanho selecionado com borda mais grossa.
6. **Toggle de personalização** ("Não Personalizar" / "Personalizar") quando o produto permite nome/número — com ícone de régua abrindo tabela de medidas ao lado.
7. **Seletor de quantidade**: `− [1] +` com ícones de traço/soma reais, não texto "-"/"+" cru sem estilo.
8. **Hierarquia de 3 CTAs**, nessa ordem e nesse padrão visual:
   - Botão primário grande (cor de destaque da marca) — "Adicionar à Sacola"
   - Botão secundário preto sólido — "Comprar pelo WhatsApp"
   - Botão terciário outline (cor da marca) com ícone real do WhatsApp — "Comprar pelo WhatsApp"
9. **Bloco de formas de pagamento**: ícones reais de bandeira (nunca texto "Aceitamos cartões") — mínimo Visa/Mastercard/Elo + Pix + boleto.
10. **Selo de segurança** com ícone de escudo real + texto "Pagamentos e informações estão seguros" + link "todos os direitos reservados".
11. **Bloco de frete grátis** com ícone de caminhão real + regra clara ("Frete grátis acima de R$X") + prazo via Correios/transportadora nomeada.
12. **Botão WhatsApp flutuante** (círculo verde, ícone oficial, canto inferior direito, fixo em toda navegação — não só na página de produto).

## Componente 2 — Carrossel de produtos clean (referência: Lulu Imports)

Nível de acabamento a replicar em qualquer carrossel de produtos (home, categoria, "relacionados"):

1. **Setas de navegação circulares** brancas com sombra sutil, sobre a lateral do carrossel (não abaixo, não escondidas) — ícone de seta real, nunca `< >` de texto.
2. **Cards com fundo branco**, sombra leve, cantos levemente arredondados — sem borda dura.
3. **Foto de produto em ambiente real** (não fundo branco de estúdio genérico) quando o cliente tiver esse tipo de material — dá autenticidade "produto de verdade em mãos", mais vendedor que still de catálogo para esse nicho.
4. **Nome do produto centralizado**, 2 linhas, negrito, variação/cor como segunda linha entre aspas.
5. **Seletor de tamanho em miniatura**: círculos pequenos numerados (não pills grandes como na página de produto — aqui é prévia rápida) + badge "+N" quando sobram tamanhos.
6. **Linha divisória fina** separando seletor de tamanho do preço.
7. **Preço centralizado**, negrito, sem "de/por" no card (isso fica só na página de produto).
8. **CTA "Comprar" dividido em dois blocos**: retângulo amarelo (cor de destaque) com o texto "COMPRAR" + quadrado preto colado com ícone real de sacola branco — não um botão único genérico.
9. **Dots de paginação** abaixo do carrossel (preto ativo, cinza inativo) quando houver mais de uma "página" de cards.

## Quando aplicar

- **Todo cliente novo**: aplicar os dois componentes desde a primeira entrega, junto com o tema-base escolhido (Lulu/Underz/Fist Street/Esportivo).
- **Cliente ativo existente**: não é retrofit automático — só atualizar página de produto/carrossel de clientes já publicados quando o Seven pedir explicitamente (MODO 1: resolver o que foi pedido, não sair reformando produção sem pedido).

## Relacionado

- [[theme-engine-biblioteca]] — hub dos 4 temas-mestre, este padrão se aplica a todos
- `MEMORY/TEMPLATES/tema-esportivo.md` — página de produto detalhada aqui vira a seção "Checkout padrão Sety Studio" desse tema
- `MEMORY/TEMPLATES/tema-lulu-imports.md` — carrossel detalhado aqui vira a seção "Carrossel de produtos" desse tema
- `templates/componentes/icones-reais.html` — sprite de ícones prontos pra copiar
- `templates/componentes/pagina-produto-checkout.html` — componente completo de página de produto pronto pra copiar/colar (componente 1 acima)
- `MEMORY/PLAYBOOKS/entrega-site.md` — checklist geral de entrega, item de ícones reais adicionado lá
