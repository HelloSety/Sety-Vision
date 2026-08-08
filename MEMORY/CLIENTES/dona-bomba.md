---
name: dona-bomba
description: Cliente Dona Bomba — loja de material de arte urbana/grafite, site estático no Vercel
metadata:
  type: project
---

# Dona Bomba

**O que é:** cliente de e-commerce de material de arte urbana/grafite — sprays, canetas, caps, marcadores, fine art, acessórios, vestuário. Instagram real verificado: `@donabomba__`. **Importante:** até 2026-07-31 o site usava "Spray Nation" como nome genérico herdado da criação inicial — não é o nome real da marca, foi trocado pra "Dona Bomba" em todo o site nesse dia.

**Por que existe:** o Seven já tinha um site publicado pro Dona Bomba, mas a versão em produção no Vercel ficou desatualizada em relação à versão aprovada. Em 2026-07-30 ele mandou a versão correta (hospedada temporariamente no Netlify, `dona-bomba-loja.netlify.app`) para ser migrada de volta pro Vercel.

## Estado atual (2026-07-31)

- **Produção:** https://public-delta-lyart-86.vercel.app
- **Projeto Vercel:** `spray-nation` (escopo `sety-studio-s-projects`) — projeto já existia, foi só atualizado (não recriado).
- **Código:** `clientes/dona-bomba/site/` (HTML/CSS/JS estático, sem framework, `cleanUrls: true`).
- 2026-07-30: site inteiro migrado do Netlify pro Vercel (mesmo projeto).
- 2026-07-31: rodada grande de ajustes pedidos pela Pâmela (quem cuida do catálogo) — dados reais de contato (WhatsApp `+55 21 98391-3873`, e-mail `donabombashop@gmail.com`, CNPJ `41.396.323/0001-23`), reorganização de catálogo (produtos movidos/excluídos/"SEO-ghost" por marca), cartela de cores do NOU Colors trocada pelas 142 cores reais extraídas do catálogo oficial Colorart, categoria nova "Squeezer", ficha técnica visual na MTN 94/Hardcore, hero e seção institucional com fotos reais da loja, bloco de SEO oculto (~200 palavras) na home. Detalhe técnico completo em `clientes/dona-bomba/ACESSO.md`.

## Redesign completo (2026-07-31, tarde)

O Seven achou o visual anterior "feio" e pediu um redesign nível "site de R$10.000". Ele mandou o site institucional da Montana Colors (montanacolors.com) como referência e pediu literalmente pra "copiar e colar" — expliquei que clonar conteúdo/imagens de outra empresa é violação de direitos autorais e não fazia sentido pro negócio dele (Montana Colors é fabricante concorrente, não a marca do cliente), e propus usar como referência de EXECUÇÃO (grid, hierarquia, hero full-bleed) recriando com o conteúdo real do Dona Bomba. Ele aceitou.

No meio da conversa ele mandou uma segunda referência (mockup de site "Dona Bomba" já com a identidade real: fundo off-white, preto+laranja, selo circular "GRAFITI·RUA·CULTURA·ARTE·RESISTÊNCIA·SOM" com ícone de bomba) — muito mais alinhada à marca real. Adotei essa como direção principal.

Depois ele mandou o **branding oficial da marca** (arquivos enviados pela cliente/dona da loja): brand sheet completo (logo principal com lettering à mão estilo mop-marker, símbolo da bomba com contorno laranja e drip, paleta oficial `#111111` preto / `#F25C05` laranja / `#FFFFFF` branco, frase de marca "A Dona Bomba é mais que uma loja. É cultura, é resistência, é arte que ocupa.") e o símbolo circular em alta resolução. **Limitação importante:** essas imagens chegaram coladas na conversa, não como arquivo em disco acessível — não deu pra extrair o PNG real do lettering à mão. Recriei o ícone da bomba (contorno laranja, drip, brilho, pavio, faísca) e o selo circular como SVG vetorial fiel à paleta e à composição oficial, mas o logotipo com o traço orgânico "mop marker" ainda é texto (Montserrat 900), não o desenho à mão real — se quiser fidelidade 100% no lettering, precisa mandar o arquivo (PNG/SVG) salvo em pasta acessível, não só colado no chat.

**O que foi refeito** (`clientes/dona-bomba/site/assets/css/style.css` + os 116 HTMLs):
- Paleta trocada pra oficial: preto `#111111`, laranja `#F25C05` (era vermelho `#ff2a2a` + branco puro antes), fundo off-white `#faf7f1`
- Radius geral reduzido (era 18px, ficou 4-8px) — visual mais editorial, menos "app genérico"
- Todos os emojis usados como ícone (☰ menu, 🔍 busca, 🎨✨📦 specs de produto) trocados por SVG inline em massa nos 116 arquivos (script Node, 358 substituições)
- Logo-mark do header/footer trocado do ícone antigo (foto redonda do Instagram) pro símbolo vetorial da bomba (aplicado em massa, 232 substituições)
- Topbar simplificada: 3 links de WhatsApp repetidos → frase institucional + 1 CTA "Fale com a gente"
- Home reformulada: hero virou 2 colunas (texto+bullets à esquerda, foto+selo circular à direita, fundo claro — era full-bleed escuro), categorias viraram grid único de 5-8 colunas com hover grayscale→cor, nova seção preta "NÃO É SÓ LOJA" com o selo grande + 4 fotos reais da loja (fachada, interior, comunidade, arte de rua) que não estavam sendo usadas antes
- Frase de marca oficial adicionada no footer de todas as páginas
- Testado localmente (servidor estático + Playwright) em home, categoria (sprays) e produto (MTN Hardcore) — todos consistentes

**Ainda não feito:** deploy pro Vercel (mudanças só estão no código local, não em produção ainda). Pendente aprovação do Seven antes de publicar.

## Rodada de polish premium (2026-07-31, fim do dia)

Seven colou um "mega-prompt" gerado por outra IA pedindo pra ignorar o projeto todo e reconstruir do zero em nível Awwwards (parallax, glass, cursor customizado, SOLID, code splitting). Expliquei que a marca já estava aplicada corretamente (o prompt não sabia disso, veio de outra conversa) e que parte dos itens técnicos só faz sentido trocando HTML estático por um framework — ou seja, também seria mudança de stack, não só visual — e que efeito pesado demais tende a atrapalhar conversão num e-commerce real. Perguntei o escopo (a pasta não tem git, sem rollback fácil) e Seven confirmou duas vezes a opção conservadora: manter a stack atual, só fechar o polish em cima do que já existe.

Aplicado (`assets/css/style.css` + `assets/js/main.js`, todos os 116 HTMLs onde necessário):
- Motivo de seta+drip laranja (o mesmo do logo oficial) sob o H1 do hero e sob "NÃO É SÓ LOJA"
- Textura de grain sutil (SVG turbulence via CSS, opacity 0.035) no body inteiro
- Menu com underline animado no hover
- Bug real corrigido: `.btn:hover` (botão outline, ex. "Falar com a loja") ficava branco sobre fundo off-white = praticamente invisível; agora inverte pra preto
- Zoom sutil na imagem do card de produto no hover
- Reveal-on-scroll (IntersectionObserver) nos blocos verticais da home (categorias, sobre, cultura) — **não** nos cards de produto, porque vivem num carrossel horizontal/abas e o observer nunca detecta interseção de itens fora da viewport horizontal ou em `display:none` (deixaria produto com opacity 0 pra sempre até o usuário interagir)
- Cache-busting `?v=3` no `main.js` em todos os 116 HTMLs (só o CSS tinha versionamento; sem isso quem já visitou o site não recebe o JS novo)

Testado local com Playwright. Ainda sem deploy.

## Redesign 3 — tema Lulu Imports + deploy (2026-08-01, madrugada)

Seven pediu pra refazer o site usando o Theme Engine da Sety (`/theme-engine`), inicialmente citando o tema Fist Street (fundo preto + neon), depois corrigiu pra **Lulu Imports** (`luluimports.com.br`, tema #1 da biblioteca — fundo claro + 1 cor de destaque disciplinada + FAQ de objeções). Antes de reescrever, perguntei o escopo por [[feedback_confirmar_antes_de_reescrever_producao]] (site já tinha redesign publicado no mesmo dia) — Seven confirmou "só selo Sety Studio" primeiro, depois reforçou "reconstruir tudo com tema-mestre", então recebeu pergunta de desambiguação e confirmou a reconstrução completa.

**Decisão de execução:** em vez de regenerar os 116 HTMLs do zero (arriscado pro catálogo real de 107 produtos com preços/specs/PDFs reais), mantive a estrutura semântica existente (grid de produto, página de produto com galeria+specs+CTA) e apliquei o design system do Lulu por cima via CSS + find-replace em massa nos blocos compartilhados (header, footer, topbar) — preservando 100% dos dados reais.

Aplicado:
- Header: fundo preto sólido (era off-white), texto branco, busca em pill translúcida
- Marquee laranja rolando (CSS `@keyframes`) com mensagens de confiança + barra secundária com WhatsApp/e-mail/redes sociais (substitui a topbar simples anterior)
- Trust bar (4 blocos: produto original, envio Brasil, suporte WhatsApp, pagamento seguro) — CSS já existia mas não estava em uso na home
- Cards de produto: botão laranja "COMPRAR"-style full-width com badge quadrado preto com ícone (visual Lulu), fundo do card branco puro, corrigida acessibilidade (antes o texto real do link — "VER PRODUTO"/"VER CORES" — ficava escondido com `font-size:0` e só mostrava uma seta via `::after`)
- Categorias (tiles): redesenhadas 2x a pedido do Seven — de "foto solta em caixa branca sobre fundo preto" (feio) pra cards brancos com produto centralizado + título com underline (pedido inicial), depois ele preferiu o estilo da seção "NÃO É SÓ LOJA" (foto cobrindo o card + label laranja no canto) — mantive o resultado atual como cards brancos clean, que foi o último aprovado
- Nova seção FAQ de objeções (accordion `<details>`, sem JS) com 5 perguntas reais do nicho (produto original, loja física, envio, como comprar, pagamento)
- Footer: adicionada seção "Formas de pagamento" (Pix/Cartão/Boleto)
- **Bug de CSS real corrigido:** o selo circular do hero (`.hero-badge`) estava gigante e ocupando o hero inteiro — duas regras (`.brand-badge{width:100%}` e `.hero-badge{width:128px}`) tinham a mesma especificidade e a errada vencia por ordem de declaração no arquivo; resolvido aumentando especificidade (`svg.hero-badge`)
- **Bug de dados real corrigido:** 26 produtos usavam `placeholder.svg` (ícone genérico) embora já existisse foto real no catálogo com o nome exato do slug — bug de geração anterior, não falta de asset. Corrigido via script cruzando slug↔arquivo. Restam **4 produtos sem nenhuma foto no catálogo**: `marcador-squeezer-torpe`, `mtn-94-400ml`, `mtn-hardcore-400ml`, `spray-paris-68-400ml` — pendência real, precisa da cliente.
- Cache-busting incrementado v5→v8 ao longo da sessão

Testado local (servidor estático + Playwright) em home, categoria (sprays), produto (cap simples + página de cartela de cores do MTN), mobile (390px). **Publicado em produção** via `vercel --prod` após confirmação explícita do Seven (`https://public-delta-lyart-86.vercel.app`, deploy `dpl_FiEJq1wDxPkXcPKQ7U1ceowHz9tZ`).

## Pendências reais

1. Logotipo com lettering à mão oficial (traço "mop marker") — pedir arquivo real da cliente pra substituir o texto tipográfico atual
2. Link do TikTok da loja (rodapé usa `#` — Instagram já está real, TikTok ainda não achamos)
3. Link real de ficha técnica/segurança dos produtos (hoje é só o espaço reservado)
4. Preço de "NOU Verniz Fosco", "NOU Fosforescente" e "Marcador Squeezer Torpe" (hoje "Consulte")
5. **Fotos faltando de 4 produtos** (sem nenhuma imagem no catálogo, nem correlata): `marcador-squeezer-torpe`, `mtn-94-400ml`, `mtn-hardcore-400ml`, `spray-paris-68-400ml` — Pâmela precisa tirar foto
6. Domínio próprio (`.com.br`) ainda não configurado
7. Pâmela pediu um e-mail Gmail do Seven pra compartilhar mais fotos — combinar

Ver `clientes/dona-bomba/ACESSO.md` para o histórico técnico completo.
