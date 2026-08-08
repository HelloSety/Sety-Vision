---
name: dona-bomba
description: Cliente Dona Bomba — loja de material de arte urbana (marca "Spray Nation"), site estático migrado do Netlify pro Vercel
metadata:
  type: project
---

# Dona Bomba (marca: Spray Nation) — Acesso rápido

Cliente: Dona Bomba
Nicho: material de arte urbana/grafite — sprays, canetas, caps, marcadores, fine art, acessórios, vestuário
Nome da marca no site: **Spray Nation**

## Produção

**Site ao vivo:** https://public-delta-lyart-86.vercel.app
Projeto Vercel: `spray-nation` (escopo `sety-studio-s-projects`, projectId `prj_f7Xpa58DsU20DwA7jCCae5kp66Yd`).
Código: `clientes/dona-bomba/site/` — HTML/CSS/JS estático puro, `cleanUrls: true` no `vercel.json` (URLs sem `.html`, ex: `/categoria/sprays`, `/produto/astro-fatcap`).

## Histórico (2026-07-30)

O Seven já tinha publicado um site pro Dona Bomba nesse mesmo projeto Vercel, mas a versão em produção ficou desatualizada/desconfigurada em relação à versão que o cliente aprovou. O Seven mandou a versão correta hospedada no Netlify (`https://dona-bomba-loja.netlify.app`) como fonte de verdade.

Processo: espelhamento completo do site Netlify (crawler Node feito na hora — sitemap.xml tinha 113 páginas: home, 7 categorias, ~104 produtos; 219 assets incluindo 102 fotos de produto) para `clientes/dona-bomba/site/`. Corrigido o domínio hardcoded errado (`spray-nation.vercel.app`, que não existe) em `sitemap.xml`/`robots.txt` para o domínio real de produção. Projeto linkado explicitamente ao Vercel existente (`vercel link --project spray-nation`) antes do deploy — **não criou projeto novo**, para não repetir o [[project_vercel_shared_project_incident]] (risco de linkar sem querer num projeto compartilhado). Deploy `vercel --prod` promovido com sucesso, alias `public-delta-lyart-86.vercel.app` atualizado automaticamente.

**Netlify (`dona-bomba-loja.netlify.app`) não foi desligado** — segue no ar como estava. A partir de agora o Vercel é a fonte de verdade em produção; se alguém continuar editando direto no Netlify, vai ser preciso resincronizar manualmente (não há link automático entre os dois).

## Rodada de ajustes (2026-07-31) — instruções da Pâmela

O Seven repassou uma conversa de Telegram com a Pâmela (quem cuida do catálogo/conteúdo da loja) com uma lista grande de ajustes, mais um pedido de SEO oculto. Tudo aplicado nesse mesmo dia e publicado em produção:

**Dados reais aplicados** (substituíram os placeholders do parágrafo antigo abaixo):
- WhatsApp real: `+55 21 98391-3873` — todos os links `wa.me` fictícios trocados pelo link oficial `api.whatsapp.com/send/?phone=5521983913873...` (cada botão "comprar" leva mensagem pré-preenchida com o nome do produto)
- E-mail: `donabombashop@gmail.com`
- CNPJ real: `41.396.323/0001-23`
- Horário: Seg-Sex 11h-19h / Sáb 11h-16h
- Links "Acompanhar pedidos"/"Login" (que davam 404, site é estático sem backend) agora abrem WhatsApp direto, em vez de link morto

**Catálogo reorganizado:**
- Excluído de vez: Cap Transversal (sem cores definidas)
- "SEO-ghost" (saem da vitrine/navegação mas a página continua existindo e indexável, com um parágrafo de texto mencionando a marca na categoria de origem) — aplicado em: Spray Art Cans, Spray Paris 68, TekBond (2 produtos), Montana Cans Ultra Wide, toda a linha HUBIK® (10 produtos em Marcadores), o catálogo antigo de Canetas (19 STA Acrylic Paint + 2 kits), e os 2 produtos de Vestuário
- Movidos de categoria: 4 caps que estavam em Sprays → Caps; Máscara 3M → Acessórios; 9 produtos Posca/Uni Paint que estavam em Marcadores → Canetas (a nova Canetas)
- Categoria nova criada: **Squeezer** (squeezer metal tip, ponta dripper mop, caneta squeezer MTN Street Dabber, marcador squeezer Torpe — este último criado a partir das referências que ela mandou de torpetintas.com.br/oddgraffiti, preço "Consulte" pois ela ainda não informou o valor real) — adicionada no menu e footer de todo o site
- NOU Colors 400ml: cartela de cores trocada pelas **142 cores reais** extraídas do catálogo oficial da Colorart (baixei o PDF `nou_colors_2018.pdf`, renderizei em imagem e extraí o hex de cada uma das 144 células programaticamente com `sharp`) — antes tinha cores aproximadas/erradas. "Verniz Fosco" e "Fosforescente" saíram da cartela e viraram produtos individuais novos (`nou-verniz-fosco-400ml`, `nou-fosforescente-400ml`, preço "Consulte" — pendente de preço real).
- MTN 94 e MTN Hardcore ganharam uma seção "ficha técnica" (texto à esquerda, foto à direita — invertido de propósito em relação ao site de referência que ela mandou, pra não parecer cópia) com specs e 2 links "Ficha técnica do fabricante" / "Ficha de segurança (FISPQ)". Esse mesmo par de links foi adicionado em todas as páginas de produto da categoria Sprays — **hoje apontam pra `#` (placeholder)**, precisam do link real quando o fabricante disponibilizar.

**Design/institucional:**
- Hero da home trocado do SVG genérico por uma foto real (grafiteira pintando com spray) vinda da pasta do Drive que o Seven mandou
- Seção nova "Sobre a loja" na home com foto da loja física + texto institucional
- Ícones sociais do rodapé trocados de texto (IG/WA/TT) pra SVG de verdade, mais visíveis — WhatsApp já linka pro número real; **Instagram e TikTok ainda apontam pra `#`, faltam os links reais**
- Bloco de SEO de ~200 palavras adicionado na home, visualmente oculto (técnica `sr-only`/clip — texto some da tela mas continua no HTML pra ser lido pelo Google, prática padrão de SEO, não é cloaking)

**Bugs encontrados e corrigidos no processo:**
- O crawler original (migração do dia anterior) tinha gerado ~112 arquivos duplicados sem extensão `.html` (ex: `produto/astro-fatcap` além de `produto/astro-fatcap.html`), cópias obsoletas do conteúdo pré-edição — todos deletados
- O botão "Comprar pelo WhatsApp" de ~99 páginas de produto tinha a URL quebrada (dois `?` na query string, um bug que a própria substituição do WhatsApp introduziu) — corrigido, agora abre certo com a mensagem do produto

## Rebrand real (2026-07-31, mesmo dia)

Descoberta importante: o nome comercial real da cliente é **Dona Bomba** (Instagram verificado `@donabomba__`, 4,4k seguidores, "Gestão Feminina", horário Seg-Sex 11h-19h/Sáb 11h-16h — bate com os dados já usados). "Spray Nation" era só um nome genérico herdado da criação inicial do site, nunca foi a marca real.

Aplicado em todo o site:
- Nome trocado de "Spray Nation" para "Dona Bomba" em todas as 116 páginas (header, footer, títulos, meta tags)
- Logo real da marca (baixado do Instagram, círculo preto com "DONA BOMBA" em grafite tag-style) aplicado no header e footer — `assets/img/marca/logo.png`
- Foto do mural da mascote "Dona" (personagem oficial pintada na fachada da loja, achada no Instagram) usada na seção "Sobre a loja" da home — `assets/img/marca/mascote-dona.jpg`, bem mais forte que a foto genérica anterior
- Link real do Instagram (`instagram.com/donabomba__`) aplicado no rodapé de todo o site
- Redesign visual inspirado no site da Montana Colors (referência que o Seven passou): hero virou full-bleed (foto ocupando 100% da largura com texto grande sobreposto, no estilo editorial de marca de tinta profissional), tipografia de títulos aumentada em toda parte, tiles de categoria e cards de produto com mais respiro e sombra mais elegante

**TikTok ainda não tem link real** (só achamos Instagram) — se o Seven achar o perfil, é só mandar.

## Confusão de URL com a Pâmela (2026-07-31)

A Pâmela conferiu o trabalho usando os mesmos links que ela mesma tinha mandado originalmente — que são do site **Netlify antigo** (`dona-bomba-loja.netlify.app`), que nunca foi alterado (só serviu de referência/fonte pra migração, ver histórico acima). Ela concluiu "não foi feito" porque o Netlify segue mostrando o catálogo velho. **O trabalho está todo no site novo, `public-delta-lyart-86.vercel.app`** — o Seven precisa avisar a ela pra conferir nesse link, não no Netlify. Reforçar isso pra não gerar mais esse mal-entendido.

Rodei uma auditoria com agente cruzando as 21 instruções da Pâmela contra o site publicado: 19/21 já batiam, 2 tinham gap real (não relacionado à confusão de URL) — corrigidos no mesmo dia:
- 6 produtos de Sprays que saíram da vitrine (Art Cans, Paris 68, TekBond x2, Montana Cans, Verniz Acrilfix) estavam sem o campo de link técnico/segurança que ela pediu em "todas as descrições de spray" — adicionado.
- O botão "Adicionar selecionados ao carrinho" da cartela de cores (`assets/js/main.js`) ainda usava o WhatsApp fictício `5500000000000` — trocado pro número real.

## Redesign completo (2026-07-31, tarde) — ainda não publicado

Seven achou o site feio e pediu redesign nível "R$10.000". Pediu pra clonar literalmente o site institucional da Montana Colors (montanacolors.com) — recusei clonar conteúdo/imagens (direitos autorais de outra empresa, além de não fazer sentido pro negócio dele) e propus usar só como referência de execução visual, recriando com o conteúdo real da loja. Ele aceitou.

Depois mandou uma segunda referência (mockup já com a identidade real "Dona Bomba": off-white + preto + laranja + selo circular) e, em seguida, **o branding oficial da marca enviado pela cliente**: brand sheet completo (logo com lettering à mão "mop marker", símbolo da bomba com contorno laranja/drip, paleta oficial `#111111`/`#F25C05`/`#FFFFFF`, frase de marca) e o símbolo circular em alta resolução. Essas imagens vieram coladas na conversa, sem arquivo em disco acessível — não deu pra extrair o PNG real do lettering à mão; recriei o ícone da bomba e o selo circular em SVG vetorial fiel à paleta/composição, mas o nome "DONA BOMBA" no header/footer ainda é texto tipográfico (Montserrat 900), não o desenho à mão oficial.

**Mudanças aplicadas** (`assets/css/style.css` + os 116 HTMLs, via scripts Node de substituição em massa quando o padrão era idêntico entre páginas):
- Paleta: preto `#111111`, laranja `#F25C05` (era vermelho `#ff2a2a`), fundo off-white `#faf7f1` (era branco puro)
- Radius reduzido globalmente (18px → 4-8px), sombras mais sutis, tipografia com mais letter-spacing nos títulos
- Emojis usados como ícone (☰ 🔍 🎨 ✨ 📦) trocados por SVG inline em todos os 116 arquivos
- Logo-mark (ícone circular do header/footer) trocado do antigo (foto do Instagram) pro símbolo vetorial da bomba
- Topbar simplificada (3 links WhatsApp repetidos → 1 frase institucional + 1 CTA)
- Home: hero virou 2 colunas com selo circular sobreposto na foto (era full-bleed escuro), categorias em grid único, nova seção preta "NÃO É SÓ LOJA" com 4 fotos reais da loja que não estavam em uso (fachada, interior, comunidade, arte de rua)
- Frase de marca oficial no footer de todas as páginas

Testado localmente com servidor estático + Playwright (home, categoria sprays, produto MTN Hardcore) — sem deploy ainda, aguardando aprovação do Seven.

## Rodada de polish premium (2026-07-31, fim do dia)

Seven mandou um "mega-prompt" de outra IA pedindo reconstrução total nível Awwwards. Recusei o rebuild literal (a marca já estava aplicada, parte do pedido exigia trocar de stack, e efeito em excesso atrapalha conversão em e-commerce) e confirmei com ele — duas vezes — que o caminho era fechar polish em cima do que já existe. Aplicado em `style.css`/`main.js`: seta+drip laranja (motivo do logo oficial) sob o H1 e sob "NÃO É SÓ LOJA", grain sutil no body, underline animado no menu, zoom no hover do card de produto, reveal-on-scroll nos blocos da home (exceto product-cards — vivem em carrossel/abas e ficariam com opacity 0 permanente). Corrigido bug real: `.btn:hover` genérico ficava branco-sobre-off-white (invisível) em seções claras. Cache-busting `?v=3` adicionado no `main.js` nos 116 HTMLs (só o CSS tinha). Testado local com Playwright.

## Segunda rodada de redesign + deploy (2026-07-31, noite) — Seven achou feio de novo, comparou com mockup de referência

Seven mandou de novo o brand sheet oficial + selo circular + um mockup completo de homepage (as mesmas referências da rodada anterior) e cobrou fidelidade literal ao mockup, "sem mais um dia perdido". Fechado no mesmo dia, deploy publicado.

**Mudado em `style.css` + `index.html` + script Node de propagação nas 116 páginas:**
- Wordmark "DONA BOMBA": trocado de texto Montserrat inline pra fonte "Rubik Wet Paint" (Google Fonts, efeito "tinta molhada"/mop-marker) empilhada em 2 linhas — mais próxima do lettering à mão do brand sheet do que a tipografia genérica anterior. Aplicado no header e footer das 116 páginas via script de substituição em massa.
- Selo circular do hero: adicionado fundo branco sólido + anel fino preto atrás do texto orbital (antes era só o texto flutuando sem disco, ficava ilegível); reposicionado pra sobrepor o canto da foto (como no mockup) em vez de flutuar solto à esquerda.
- Cards de produto: redesenhados pro estilo do mockup — fundo cinza claro, botão de ação virou quadrado preto com seta (posição absoluta sobre a imagem) em vez do botão-pílula full-width. Só CSS, não tocou na estrutura HTML dos cards (evita reeditar as 116 páginas individualmente).
- **Bug real corrigido**: os tiles de categoria da home usavam fotos de still-life de produto (fundo de estúdio) esticadas como `cover`, gerando um gradiente cinza esquisito — Seven apontou isso ao vivo ("essa parte tá muito feia"). Trocado pra fundo preto sólido + produto centralizado com `object-fit: contain` (efeito vitrine). Também reduzida a home de 8 pra 5 categorias (Sprays, Marcadores, Caps, Fine Art, Vestuário, como no mockup) pra fechar o grid sem buracos — as 8 continuam acessíveis pelo menu e footer.
- Seção "NÃO É SÓ LOJA": badge orbital grande trocado por só o símbolo da bomba (pequeno, ao lado do título); botão CTA virou sólido laranja (`btn-red`, nova classe); grid de 4 fotos B&W virou 5 fotos coloridas com label retangular laranja (Bomba Sessions, Ocupações, Eventos, Oficinas, Artistas — usando as fotos reais já existentes, sem inventar imagem nova).
- Footer: nova coluna "Newsletter" (input e-mail + botão) — submit não tem backend de e-mail configurado, então abre o WhatsApp real com o e-mail digitado na mensagem (mesmo padrão dos outros CTAs do site). Coluna "Categorias" separada foi mesclada dentro de "Informações" pra caber em 4 colunas como no mockup (link "Sobre a loja" agora aponta pra `/#sobre`).
- Cache-busting bumpado pra `?v=4` (CSS e JS) nas 116 páginas.

**Decisão consciente que não segue o mockup 100% literal**: o mockup de referência tem um header com nav editorial (Loja/Marcas/Sobre/Bomba Sessions/Blog/Contato) — mantido o nav real de categorias de produto em vez disso, porque criar Blog/Bomba Sessions como páginas novas either ficaria com link morto ou estouraria o prazo do mesmo dia. Se Seven quiser essas páginas de verdade, é escopo novo, não polish visual.

**Deploy**: `vercel --prod` publicado com sucesso, alias `public-delta-lyart-86.vercel.app` atualizado. Confirmado via curl que o CSS novo (`Rubik Wet Paint`) e o HTML novo (`logo-word`) estão live.

## Pendências reais (o que falta pra ficar 100%)

1. Logotipo com lettering à mão oficial — pedir o arquivo real (PNG/SVG/AI) da cliente pra substituir a fonte "Rubik Wet Paint" (aproximação, não é o desenho exato dela)
2. Links reais do Instagram e TikTok no rodapé/social (TikTok ainda usa `#`)
3. Link real de "ficha técnica do fabricante" / "ficha de segurança (FISPQ)" — hoje é só o espaço reservado que a Pâmela pediu
4. Preço real de "NOU Verniz Fosco 400ml" e "NOU Fosforescente 400ml" (hoje "Consulte")
5. Fotos autorais dos produtos MTN 94/Hardcore (a ficha técnica usa placeholder — Pâmela disse que ia tirar fotos na loja)
6. Domínio próprio (`.com.br`) ainda não configurado — hoje é só o subdomínio `.vercel.app`
7. A Pâmela pediu um e-mail Gmail do Seven pra compartilhar mais fotos — combinar isso com ela
