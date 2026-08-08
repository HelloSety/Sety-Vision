---
name: sety-studio-live-deploy-2026-07
description: "Site institucional de vendas da Sety Studio publicado na Vercel (sety-studio-live), domínio setystudio.com.br conectado, sem código-fonte React disponível"
metadata:
  type: project
---

# Sety Studio — Deploy do site institucional (2026-07-24)

**Status:** publicado — https://sety-studio-live.vercel.app e https://setystudio.com.br (DNS via nameservers, propagando)

## O que é / por que existe

Site de vendas da própria Sety Studio — landing "Sety Studio — Lojas Esportivas que Vendem", com páginas próprias (`/criacao-de-sites`, `/loja-virtual`, `/shopify`, `/woocommerce`, `/landing-pages`, `/trafego-pago`, `/blog`), portfólio real, VSL, prova social (depoimentos + prints de resultado) e catálogo de camisas (copa2026). Publicado como projeto Vercel `sety-studio-live` (conta `sevendsgnn-7971`, team `sety-studio-s-projects`).

**Importante — não existe código-fonte React local.** O conteúdo publicado veio de `C:\Users\seven\Downloads\deploy-6a3fe502215670262d3f1e24.zip`, um pacote de deploy do **Netlify** (tem `netlify.toml` apontando pra `saidas/sety-studio-web`, mas essa pasta local hoje tem uma estrutura de rotas completamente diferente — `app/cases`, `app/portfolio` — então não é a mesma versão). Ou seja, só existe o HTML/build já compilado, não o projeto Next.js fonte. Qualquer mudança de conteúdo precisa ser feita editando o HTML compilado diretamente ou via script client-side (ver seção "Como mexer no conteúdo" abaixo).

## Bugs corrigidos (2026-07-24)

**Case-sensitivity Windows→Linux:** todas as imagens do hero (mockups "Loja Esportiva"/"Shopify Premium"/"Site Esportivo"), o vídeo VSL e os prints de resultado (`uploads/resultados/`) estavam quebrados (404) em produção porque os arquivos no disco estavam em minúsculo (`sites esportivo/emporio belem/macbook-air-...png`) mas o HTML referenciava com capitalização exata (`SITES ESPORTIVO/EMPORIO BELEM/Macbook-Air-...png`). No Windows (case-insensitive) isso nunca dava erro; no Vercel (Linux, case-sensitive) quebrava tudo. Corrigido renomeando os arquivos/pastas reais pra bater exatamente com o HTML. **Se subir novo conteúdo vindo de pastas preparadas no Windows, sempre validar case-sensitivity antes do deploy** — script de varredura fica em `insert-cards.js`/histórico da sessão, repetir a lógica se acontecer de novo.

## Como mexer no conteúdo (sem fonte React)

Editar o HTML compilado diretamente **não funciona pra elementos novos**: este é um app Next.js com hydration completa — o React reconcilia o `<body>` inteiro no client a partir de um payload RSC embutido (`<script>self.__next_f.push(...)</script>`) e remove qualquer elemento extra que não esteja nesse payload, incluindo `<script>` tags inline recém-inseridas. Testado e confirmado: HTML injetado direto (cards de pricing) aparecia no primeiro paint e sumia ~1-2s depois, na hidratação.

**Workaround que funciona:** injetar um `<script>` com `MutationObserver` que fica de vigia e reinsere o conteúdo sempre que o React tentar removê-lo (ver os 2 cards "LOJA START"/"LOJA ESSENCIAL" abaixo — implementados assim, funcionando em produção). Padrão: `ensure()` insere se não existir, um `MutationObserver` no `document.body` com `{childList:true, subtree:true}` chama `ensure()` a cada mutação. Robusto mas é gambiarra — se precisar de mais mudanças estruturais grandes, vale considerar pedir a fonte real do projeto ao Seven (pode estar em outra ferramenta tipo Lovable/v0/bolt que ele usou originalmente).

## Pacotes de Loja Virtual acessível (adicionados 2026-07-24)

A pedido do Seven, focado na nova diretriz de negócio (lojistas com produto físico, não só nicho esportivo): criados 2 planos novos, inseridos como seção extra logo abaixo dos 3 planos originais (Start R$800 institucional / Profissional R$1.500 loja completa / Personalizado sob consulta):
- **LOJA START — R$ 997** (2x R$500): Nuvemshop/Shopify básico, até 100 produtos, 1 banner, WhatsApp, checkout, treinamento. 5 dias úteis.
- **LOJA ESSENCIAL — R$ 1.197** (3x R$399): Shopify/Nuvemshop completo, até 300 produtos, categorias, banners desktop+mobile, Pixel Meta, SEO básico. 7 dias úteis.

Preços definidos por mim (Claude) seguindo a lógica de posicionamento entre Start (800) e Profissional (1.500) — **não validados formalmente com o Seven**, só implementados porque ele pediu "2 pacotes acessíveis" sem especificar valores. Se ele quiser ajustar, é editar o array `features`/`preco` dentro do script injetor (procurar `cardLojaStart`/`cardLojaEssencial` no histórico ou recriar).

## SEO (auditado 2026-07-24)

On-page já estava muito bem feito antes de eu mexer: title/description únicos por página, JSON-LD (Organization/LocalBusiness/FAQPage/OfferCatalog), H1 único, H2s estruturados, alt text em todas as imagens, meta robots correto. Único ajuste feito: `sitemap.xml` tinha `lastmod` parado em 2026-06-22, atualizado pra 2026-07-24.

**Lacunas que exigem ação do Seven (não dá pra resolver só no código):**
- Sem Google Search Console verificado (nenhuma `google-site-verification` meta tag)
- Sem Google Analytics/GTM instalado (só existe um script de tracking de clique em `wa.me` que empurra pro `dataLayer`, mas não há container GTM nem GA4 property configurados)
- Sem Meta Pixel instalado (o mesmo script chama `fbq('track','Contact')` mas não há `fbq('init', ...)` em lugar nenhum — os eventos não vão pra lugar nenhum sem isso)

## Domínio (ver também [[sety-studio-link-bio-2026-07]])

**Correção importante:** a nota anterior dizia que `sety-vision-next` estava em outro team da Vercel, inacessível pela conta `sevendsgnn-7971`. Isso estava **errado** — na verdade `sety-vision-next` está no mesmo team (`sety-studio-s-projects`), só que `vercel domains inspect` mostra informação de atribuição desatualizada/cacheada (mostrava "sety-vision-next" como dono do domínio mesmo depois de eu mover). A fonte de verdade real é `vercel alias ls`, que confirmou o alias de produção apontando corretamente pro `sety-studio-live`.

Fluxo usado pra mover o domínio de um projeto pro outro dentro do mesmo team: `vercel domains rm <dominio> --yes` (linkado ao projeto antigo) remove a posse inteira da conta, depois `vercel domains add <dominio>` (linkado ao projeto novo) readiciona já associado ao projeto certo.

Seven optou por trocar os **nameservers** do domínio pra `ns1.vercel-dns.com`/`ns2.vercel-dns.com` (opção B que a Vercel ofereceu) em vez de só configurar um registro A `76.76.21.21` no registro.br — delega o DNS inteiro pra Vercel, mais robusto, mas propaga mais devagar (pode levar horas).

## Atualização 2026-07-31 — VSL novo, reposicionamento genérico, bug crítico de alias

**Pedido do Seven:** trocar o VSL por um novo (`C:\Users\seven\Downloads\CRIATIVO\VSL.mp4`), atualizar os mockups do hero com os projetos reais (Fist Street/Underz Store/Lulu Imports), reescrever o hero (mais curto, CTA forte, título **genérico** — "não é pra nichar em nenhum nicho, é pra criação de site e lojista"), hierarquia visual mais limpa, e "otimiza + SEO + rápido pra todos os dispositivos". Autorizou deploy direto em produção sem revisão prévia (foi dormir no meio da sessão).

**Processo (sem fonte React local, ver acima):** antes de editar qualquer coisa, baixei via script Node todos os 36 assets referenciados no `index.html` a partir do domínio ao vivo (`https://setystudio.com.br/...`) pra reconstruir uma cópia local **fiel e completa** em `saidas/sety-studio-live/` — sem isso, um novo deploy da pasta local (incompleta) teria apagado imagens/vídeos que já funcionavam em produção. **Nunca usar Bash/Git Bash puro pra isso** — MSYS faz path-mangling e converte `/portfolio/...` em `C:/Program Files/Git/portfolio/...`, criando pastas erradas. Usar Node (`https.get` + `path.join` com path absoluto Windows) evita o problema.

**VSL:** vídeo novo era 1920x1080, 97s, 369MB (H.264 sem compressão, ~30Mbps — export cru do Premiere). Comprimido com ffmpeg (`winget install Gyan.FFmpeg` — não vinha instalado) pra 1280p, CRF 25, AAC 128k → **16.4MB** (95% menor), mesmo path/nome (`/vsl/VSL PÁGINA.mp4`) pra não precisar mexer em referências. Também gerei um `poster.jpg` (frame extraído com ffmpeg) e apliquei via JS — antes o vídeo não tinha poster, só um fundo cinza até carregar.

**Portfolio já estava pronto, só faltava o asset:** o `premium.js` (função `fixPortfolioCards` + array `PORT_SITES`) **já tinha** Fist Street/Underz Store/Lulu Imports mapeados pra `/portfolio/screenshots/*.png` — de uma sessão anterior. Os screenshots já existiam em produção (baixei pra cópia local). Só faltava trocar o mockup flutuante do Hero (ao redor do VSL), que ainda mostrava "Loja Esportiva" (Empório Norte Belém) — troquei pelo screenshot do Fist Street (tirado ao vivo de `usefist.com.br` via Playwright, já que não existia ainda).

**Reposicionamento genérico:** o site inteiro (hero, footer, nav, heading do portfolio, meta tags) só falava de "Lojas Esportivas". Generalizei pra "Sites e Lojas Virtuais" em: `<title>`/meta description/og/twitter (editados direto no HTML — **não sofrem reversão de hydration**, diferente do `<body>`), e no body via uma função `ensureGenericPositioning()` no `premium.js` que percorre nós de texto (TreeWalker) e troca frases-chave — mais robusto que mapear seletor por seletor. Rodei só 5x num intervalo de 500ms após o load (não dentro do MutationObserver contínuo — um TreeWalker do body inteiro a cada mutação seria pesado/ruim pra performance). **Não mexi** nas descrições de cases individuais que citam "esportivo" (Empório Belém, MantoPro etc.) — são factualmente corretas sobre aqueles clientes específicos, só o posicionamento geral da agência precisava generalizar.

**Gotcha real (perdi um botão CTA por causa disso):** existe uma função `removeDeadLinks()` no `premium.js` que remove qualquer `<a>`/`<button>` cujo texto contenha a substring `"orçamento grát"` (limpeza de CTAs redundantes espalhados pela página). Escrevi um novo CTA "Quero orçamento grátis agora" e ele **sumiu da página** — caiu no próprio filtro de limpeza que já existia. Lição: antes de escrever novo copy de botão, `grep` a lista `REMOVE_BTN_TEXTS` no `premium.js`.

**Bug de hierarquia visual (mobile):** Seven reclamou de espaço vazio grande entre header e o texto no mobile. Causa raiz: um wrapper interno tinha `pt-28` (112px) que **somava** com um padding que eu mesma adicionei na section externa — 200px de espaço vazio total. Só achei inspecionando via `mcp__playwright__browser_evaluate` (`getBoundingClientRect` + `getComputedStyle`) — **não dá pra diagnosticar espaçamento só lendo o HTML estático quando há múltiplos paddings aninhados**, sempre medir ao vivo.

**Removida a seção "Loja Virtual Acessível" (LOJA START/ESSENCIAL):** Seven pediu pra tirar do ar. Essa seção **não estava no `premium.js`** — era um `<script id="sety-extra-planos">` inline separado, direto no fim do `index.html`, com o mesmo padrão `ensure()` + `MutationObserver` insere um `<div id="sety-loja-acessivel">` logo após `#planos .grid`. Removida a tag `<script>` inteira (12KB) — como a inserção só acontece se o script rodar, apagar a tag basta, não precisa de lógica de remoção via JS. Os 3 planos originais (START R$800/PROFISSIONAL R$1.500/PERSONALIZADO) não foram tocados.

**Bug crítico — domínio servindo o projeto errado:** depois do primeiro `vercel deploy --prod`, o `setystudio.com.br` continuou servindo conteúdo **completamente diferente** (title "Criação de Loja Virtual Profissional | E-commerce que Vende" — nem existe no código local, provavelmente vem do `sety-vision-next`). `vercel domains inspect setystudio.com.br` mostrou o domínio linkado a **dois projetos ao mesmo tempo** (`sety-studio-live` E `sety-vision-next`) — confirma o problema já registrado em [[sety-studio-link-bio-2026-07]]. Resolvido **sem** precisar do fluxo destrutivo `domains rm` + `domains add` (que remove a posse inteira da conta): `vercel alias set <deployment-url> setystudio.com.br` aponta o alias direto pro deployment certo, cirúrgico e sem downtime. Tive que rodar pra `setystudio.com.br` E `www.setystudio.com.br` separadamente (os dois tinham o mesmo problema). **Sempre confirmar com `curl` após qualquer deploy** (checar `<title>` e tamanho de um asset que mudou) — o "Success" do `vercel deploy` não garante que o domínio de produção real está servindo aquele deployment.

## Atualização 2026-08-01 — Reposicionamento dos planos pra Loja Virtual + bug de alias recorrente

**Pedido do Seven:** trocar os 3 cards de `#planos` (antes: START/site institucional R$800, PROFISSIONAL/loja R$1.500, PERSONALIZADO/Sob Consulta) pra um posicionamento 100% loja virtual Shopify/Nuvemshop, com preço antigo riscado + preço promocional + economia em destaque:
- **LOJA ESSENCIAL** — R$600 (de R$800, -25%, economia R$200) — 7 dias úteis
- **LOJA PROFISSIONAL + SEO** — R$1.500 (de R$2.000, -25%, economia R$500) — mantém badge "⭐ MAIS ESCOLHIDO" — 10 a 15 dias úteis
- **TRÁFEGO PAGO** — R$900/mês, gestão recorrente — início em até 5 dias úteis

Implementado reescrevendo `fixPlanCards()` inteira em `premium.js` (título, subtítulo, bloco de preço com riscado+badge de desconto, prazo e itens dos 3 cards — antes a função só trocava descrição+itens, não título/preço). Também atualizados os hrefs de WhatsApp (`WA.site`/`WA.seo`) e as respostas do chatbot (`CHAT_OPTIONS` 'preco'/'prazo'/'orcamento') pra bater com os novos nomes/valores. CTA "👉 Solicitar orçamento" já era o texto usado nos 3 botões (`fixPackageButtons()`), não precisou mudar.

**Nota:** o pedido original veio ambíguo (Seven reclamou "você mudou os valores, mantenha os que estavam" e colou, na mesma mensagem, um texto com uma proposta de reestruturação completamente nova e com preços diferentes dos que estavam no ar). Perguntei antes de agir — ele confirmou que queria aplicar a estrutura nova com os preços novos, não só reverter.

**O bug de alias em dois projetos (`sety-studio-live` + `sety-vision-next`) simultâneos no mesmo domínio voltou a acontecer** mesmo depois do fix de 2026-07-31 — `vercel deploy --prod` sozinho não bastou, o domínio continuou servindo o deployment antigo (confirmado via `curl setystudio.com.br/premium.js`, sem o texto novo, com `X-Vercel-Cache: HIT` e `Age` de +28h). Resolvido de novo com `vercel alias set <deployment-url> setystudio.com.br` + `www.setystudio.com.br`. **Conclusão: isso não foi um evento único — é um comportamento recorrente deste projeto.** Depois de qualquer `vercel deploy --prod` aqui, sempre rodar `vercel domains inspect setystudio.com.br` pra checar se ainda aparecem 2 projetos, e se sim, `vercel alias set` direto pra pular a etapa de diagnóstico.

**Deploy foi bloqueado pelo classificador de auto mode do Claude Code** (ação que afeta site de produção/domínio real) — pedi confirmação explícita ao Seven antes de rodar `vercel deploy --prod`, ele autorizou, segui.

## Atualização 2026-08-01 (2) — Espaçamento inconsistente entre seções

**Pedido do Seven:** "várias partes do site têm espaçamento grande, deixa tudo alinhado e junto de forma profissional" — em desktop e mobile.

**Causa raiz:** o espaçamento vertical das seções vem de duas fontes diferentes que nunca foram sincronizadas. A classe global `.section` (Next.js, `_next/static/chunks/3aa6bx03qq9ry.css`) definia `padding:112px 0` desktop / `72px 0` mobile — usada por `#cases` (Prova Social), FAQ e Orçamento. Mas `director.css` tinha uma regra `!important` (comentário original: "ESPAÇAMENTO DE SEÇÕES — MAIS RESPIRO", de sessão anterior) fixando só `#portfolio`, `#diferenciais`, `#planos` e `#cta` em `80px`, **sem media query** — ou seja, essas 4 seções já tinham sido compactadas antes, mas nunca em mobile, e as outras 3 (`#cases`/FAQ/Orçamento) nunca receberam o mesmo tratamento. Resultado: metade do site em 112px/72px, a outra metade travada em 80px fixo mesmo no mobile — exatamente a inconsistência que o Seven via.

**Fix:** unifiquei as duas fontes em 80px desktop / 56px mobile — editei a regra `.section` no CSS compilado do Next.js E adicionei `@media (max-width:768px)` aos overrides do `director.css` (que não tinha nenhum breakpoint antes). Também removi um bloco de CTA órfão ("Gostou do que viu? / Veja nossos planos e valores") entre Prova Social e Planos: o botão dele já caía no filtro `REMOVE_BTN_TEXTS` de `removeDeadLinks()` no `premium.js` (rodava havia sessões, ninguém percebeu), mas o texto (`<p>`+`<h3>`) ficava sozinho, sem CTA, só ocupando ~110px de vazio redundante com o header que `#planos` já tem. Adicionei `removeOrphanPlanosCTA()` no `premium.js`, que remove o wrapper inteiro (mesmo padrão `querySelectorAll` + `.remove()` já usado no arquivo).

**Se mexer em espaçamento de seção de novo:** checar as DUAS fontes (chunk CSS do Next `.section{...}` E overrides `#id{padding...!important}` do `director.css`) — editar só uma quebra a consistência de novo.

Testado ao vivo via Playwright em 1440px e 390px antes do deploy (medição de `getComputedStyle` confirmando os mesmos 80px/56px em todas as seções, não só inspeção visual). Deploy com o mesmo bug de alias recorrente (ver acima) — resolvido com `vercel alias set` de novo, sem precisar re-diagnosticar.
