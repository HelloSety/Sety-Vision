---
name: site-conceito-esportivo-hype
description: Template de site conceito "hype" para atletas/clubes (dark cinematográfico + cursor-spotlight + mask-reveal + tilt 3D) usado como peça de portfólio pra gravação de vídeo e prospecção
metadata:
  type: project
---

# Template: Site Conceito Esportivo "Hype"

## Manifesto de direção criativa (2026-07-18 — vale pra todo site-conceito daqui pra frente)

Seven mandou um "master system prompt" formal estabelecendo o patamar de exigência pra qualquer site-conceito futuro (não só esportivo) — não era pedido de build, era diretriz permanente de processo e padrão. Resumo pra aplicar ANTES de codar:

**Postura:** agir como Diretor Criativo (Active Theory / Resn / Dogstudio / Cuberto / Studio Freight como referência), não como dev de front-end. Antes de criar seções, pensar: que emoção o visitante deve sentir, qual a história, qual o ritmo visual, onde tem surpresa, onde tem silêncio, onde o movimento para, onde o usuário respira.

**Processo de ideação obrigatório antes de codar:** não gerar a primeira solução. Gerar 10 conceitos internamente, comparar, ficar só com o mais forte, iterar mais 3 vezes nele, só então escrever código. Desafiar cada decisão de design — se uma seção parecer genérica/template, redesenhar do zero. Cada tela precisa ter identidade visual própria; nunca repetir layout entre seções.

**Nunca criar:** Hero+Features+CTA+Footer genérico, cards por toda parte, gradiente genérico, layout estilo Bootstrap/SaaS, ícones aleatórios, botões genéricos, dashboards falsos, seções "sem graça".

**Sempre criar:** narrativa visual — cada scroll é uma cena, cada seção tem propósito, cada transição conta parte da história (a página dirigida como um filme).

**3D com propósito, nunca decorativo:** câmera se move, luz evolui, o objeto interage com o scroll E com o texto, o objeto vira navegação/transição — não só um objeto flutuando bonito (ver [[feedback_r3f_camera_bounding_box]] e a lição de rotação livre em [[project_portfolio_sites_conceito_esportivo]] v4 — já é prática comum aqui, só reforça o padrão).

**Checklist antes de finalizar:** isso ganharia Site of the Day? A Apple publicaria? A Nike usaria? A Porsche aprovaria? Eu colocaria isso no meu portfólio? Se não, redesenhar.

**Stack "obrigatória" que ele listou** (a maior parte já é o que a v2/v3/v4 usam): Next.js + React + TypeScript + Tailwind + GSAP + Framer Motion + Lenis + Three.js + React Three Fiber + Drei + React Postprocessing + shaders GLSL + Lottie + Theatre.js + Spline (quando fizer sentido) + Motion One. **Novidades que ainda não usei em nenhum site-conceito**: Theatre.js (sequenciador de animação visual), Lottie (animações vetoriais), Motion One (lib de animação mais leve que Framer Motion) — avaliar caso a caso, não adicionar por obrigação se não servir ao conceito.

**Como aplicar:** todo PRÓXIMO site-conceito (esportivo ou não) parte desse patamar por padrão, não só quando ele reforçar o pedido. Não interromper pra perguntar "quer nesse nível?" — já é o nível esperado. Só perguntar o tema/objeto quando não for óbvio pelo contexto.

## O que é

Site estático (HTML/CSS/JS puro + GSAP via CDN) estilo "hype page" de atleta/clube, pensado como **peça de portfólio pra gravação de vídeo** (screen recording) e prospecção de leads — não é site de cliente real.

Primeiro exemplo construído: **Lamine Yamal** — `saidas/portfolio/esportivo-lamine-yamal/` (index.html + styles.css + script.js).

## Por que existe

Seven pediu um site "FODA" de R$10.000 de percepção de valor pra gravar e mostrar pra leads do estúdio, com cores fortes. Durante a conversa (2026-07-17) ele mandou 3 referências do Instagram (@marina_uiux) mostrando sites com fundo escuro cinematográfico, spotlight que segue o cursor, mask-reveal de texto/imagem no scroll e tilt 3D em cards — pediu "sites nesse nível" e "vou fazer + sites pra gerar engajamento", ou seja, isso vira um formato repetido.

## Como é feito (decisões técnicas)

- **Sem foto real do atleta** — em vez de imagem, usa tipografia extrema (fonte Anton) + gradiente + números gigantes como elemento gráfico principal. Evita qualquer questão de direito de imagem e funciona melhor pro estilo "hype site" (tipo Nike/Jordan drop page).
- **Paleta**: fundo navy/preto quase puro como canvas + vermelho/dourado da Espanha como luz de destaque (glow, gradiente de texto) — fica mais "caro" que bloco de cor chapada.
- **Interações**: cursor customizado (dot + ring com lerp), spotlight radial que segue o mouse no hero, mask-reveal de texto (linha por linha, `overflow:hidden` + `translateY`), scroll reveal via `IntersectionObserver`, contadores animados, tilt 3D nos cards da galeria (`rotateX/rotateY` via mousemove), marquee infinito em CSS.
- **Bug corrigido nessa build**: ao combinar duas animações CSS na mesma classe (`.line` tem `animation: lineReveal`, `.line-accent` tinha `animation: shine` isolado) o shorthand `animation` da classe mais específica **sobrescreve inteiro** o da menos específica — a segunda linha do título sumia. Fix: declarar as duas animações juntas, separadas por vírgula, na mesma regra.
- **Nano Banana (Gemini image gen)**: Seven quer usar pra gerar as imagens dos próximos sites — não há acesso a essa ferramenta no ambiente do Claude Code, então o site foi estruturado com fallback 100% gráfico/tipográfico (funciona sozinho) e pode receber imagens geradas depois (basta trocar os blocos de gradiente do hero/galeria por `<img>`).

## Como reaproveitar pra outro atleta/clube

1. Duplicar a pasta `saidas/portfolio/esportivo-lamine-yamal/` com o nome do novo tema.
2. Trocar nome, número, clube, seleção, cores (variáveis `:root` no topo do `styles.css`).
3. Reescrever bio/timeline/stats com fatos verificáveis (evitar números exatos arriscados — preferir superlativos amplamente noticiados).
4. Manter o disclaimer no footer ("site conceito, não afiliado a X") — reduz risco de mal-entendido de endosso.
5. Validar com screenshot (Playwright já instalado no projeto) antes de gravar o vídeo.

## Relacionado

- [[project_carrossel_azul_premium]] — outra exceção ao design-guide padrão preto/vermelho da Sety, mesma lógica de "linha visual dedicada por peça"
- Portfólio geral: `PORTFOLIOS/esportivo/` e `saidas/portfolio/` (nichos não-esportivos já existentes: fitness, dental, imoveis etc.)

## Próximos passos

- Gerar imagens reais no Nano Banana pro hero/galeria quando Seven tiver acesso.
- Se a fórmula funcionar bem na gravação, formalizar como skill (`/site-conceito-esportivo`) pra gerar variações rápido.

## v2 — versão Next.js/Awwwards (mesmo dia, 2026-07-17)

Seven escalou o pedido no mesmo dia com um brief muito mais detalhado (referência Nike/Apple/Porsche/F1/Awwwards, paleta preto profundo `#050505` + laranja + vermelho + azul neon `#3B82F6`, não mais cores da Espanha). Construído como projeto separado, não substituindo o v1:

- **Local**: `saidas/portfolio/lamine-yamal-2030/` — Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + GSAP/ScrollTrigger + Lenis (smooth scroll).
- **No ar**: https://lamine-yamal-2030.vercel.app (projeto Vercel `sety-studio-s-projects/lamine-yamal-2030`, isolado do v1 e do resto).
- **Estrutura**: loading screen com progresso, cursor customizado global, navbar glass, Hero (mesh gradient animado + spotlight que segue cursor + parallax + reveal de texto mascarado), Journey (timeline com linha de progresso via GSAP ScrollTrigger scrub), Stats (contadores animados + radar chart SVG + progress rings, com aviso "dashboard ilustrativo" pra não passar dado real como oficial), Highlights + Gallery (cards com tilt 3D e hover cinematográfico, sem foto real — mesma lógica do v1), Future/HUD (seção sci-fi com telemetria falsa tickando, bracket de canto, scanline), Legacy (frase gigante full-bleed), Footer com disclaimer.
- **Stack de animação padrão pra próximas versões**: Framer Motion pra reveals/hover/spring, GSAP+ScrollTrigger só pro que precisa de scrub genuíno (linha de progresso), Lenis pro smooth scroll global — não misturar Framer Motion `whileInView` com CSS puro no mesmo componente (ver bug abaixo).
- **Bug crítico + falso positivo**: depois de uma correção real no código (ver [[feedback_stale_bg_server_restart]] no auto-memory), os testes continuaram "falhando" porque o processo de servidor local antigo continuou rodando na mesma porta (restart em background falhou silencioso com EADDRINUSE) — sempre confirmar que o processo novo realmente subiu antes de re-testar.
- **Bug real do Framer Motion encontrado**: um `RevealText` que usava `initial={{ y: "110%" }}` + `whileInView={{ y: "0%" }}` (objetos inline) nunca disparava a animação — texto ficava invisível fora da área `overflow-hidden`. Trocar para o padrão `variants` (`initial="hidden"` / `whileInView="show"` + objeto `variants`) resolveu — esse é o padrão a seguir daqui pra frente em qualquer reveal de texto com Framer Motion neste projeto.

### Como reaproveitar a v2

1. Duplicar a pasta `lamine-yamal-2030` com o nome do novo tema/atleta.
2. Trocar paleta em `app/globals.css` (`--color-orange`, `--color-red`, `--color-blue`) e textos em cada `components/sections/*.tsx`.
3. Rodar `npm run build` local e validar com Playwright (screenshot desktop + mobile) antes de decidir gravar — o bug do RevealText mostrou que "parece que não fez nada" quase sempre é servidor/cache, não o código.
4. Deploy com `vercel deploy --prod --yes --scope sety-studio-s-projects` de dentro da pasta do projeto (cria projeto Vercel novo automaticamente, isolado).

## v3 — objeto 3D real com WebGL (2026-07-18)

Seven pediu "site pra viralizar + vídeo cinemático + cores fortes e objeto em 3D" — primeira vez que o formato usa um objeto 3D de verdade (WebGL), não só tipografia/gradiente. Escolhido junto com ele (via pergunta rápida): tênis/chuteira. Tema: marca fictícia **VOLT** (drop de sneaker), não atleta/clube.

- **Local**: `saidas/portfolio/sneaker-volt-3d/` — mesma stack da v2 (Next.js 16 + TS + Tailwind v4 + Framer Motion + GSAP/ScrollTrigger + Lenis) **+ `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`** pro objeto 3D.
- **No ar**: https://sneaker-volt-3d.vercel.app (projeto Vercel `sety-studio-s-projects/sneaker-volt-3d`, isolado).
- **Modelo 3D**: "Materials Variants Shoe" da Shopify, Inc. — modelo de amostra oficial do Khronos Group (`glTF-Sample-Assets`), licença **CC BY 4.0** (crédito obrigatório no footer). Baixado direto do GitHub (`raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets`), gratuito, sem risco de direito de imagem. Tem 3 variantes de cor nativas via extensão `KHR_materials_variants` (midnight/beach/street) — cada uma com textura diffuse própria, permitindo troca de cor real (não só tint) com um clique.
- **Troca de variante de cor**: three.js NÃO precisa de plugin extra pra ler `KHR_materials_variants` — o `gltf.userData.gltfExtensions['KHR_materials_variants']` e `mesh.userData.gltfExtensions[...]` já vêm parseados pelo GLTFLoader padrão. Trocar variante = `await gltf.parser.getDependency('material', idx)` + `gltf.parser.assignFinalMaterial(mesh)` (ver exemplo oficial three.js `webgl_loader_gltf_variants.html`, mesmo modelo). Implementado em `components/scene/Sneaker.tsx`.
- **Lição cara — enquadramento de câmera por bounding box, não por "olhômetro"**: a primeira tentativa de câmera (fov 32, radius 3.4) resultou num close-up quebrado (só a gola do tênis, irreconhecível). Causa: o modelo tem um node glTF com escala interna (`0.149`) somada à escala do grupo (`10`) = escala efetiva ~1.49x sobre um mesh que já tem 2 unidades de comprimento → tênis de ~3 unidades no mundo, câmera perto demais/lente fechada demais pra esse tamanho. **Fix**: extrair o bounding box real direto do JSON embutido no `.glb` (accessor `POSITION.min/max`, sem precisar renderizar nada) via script Node de 5 linhas, calcular o raio da bounding sphere e usar `distância ≈ raio / sin(fov/2) × margem` pra escolher radius/fov compatíveis. Depois do fix (fov 38, radius 5–6.2): tênis inteiro em quadro, ângulo 3/4 cinematográfico. **Sempre fazer essa conta ANTES de chutar valores de câmera com um asset novo.**
- **Câmera scroll + drag combinados sem OrbitControls**: pra ter controle total sobre um "dolly cinematográfico" ligado ao scroll (GSAP ScrollTrigger, `scrub:true`, `onUpdate` grava progresso num `ref`) e ainda permitir o usuário arrastar pra girar o objeto, foi mais simples **não usar `<OrbitControls>`** (ele briga com script manual de câmera) — em vez disso, um componente `CameraRig` dentro do Canvas seta `camera.position`/`camera.lookAt` a cada frame via `useFrame`, combinando ângulo-base + progresso de scroll + yaw acumulado de um drag manual (pointer events no container, delta em um `ref`, sem re-render).
- **Bug do RevealText, segunda ocorrência**: multi-word em uma única chamada (`"STEP INTO"`) renderizava sem espaço (`STEPINTO`) — o espaço estava *dentro* do `<span overflow-hidden inline-block>` de cada palavra e o browser colapsa espaço em branco na borda de um inline-block clipado. Fix: mover o espaço pra **fora** do span com `overflow-hidden`, como texto solto entre os wrappers de palavra. **Padrão a seguir em qualquer componente de reveal de texto por palavra daqui pra frente.**
- **Bloom/glow**: `@react-three/postprocessing` (`<EffectComposer><Bloom .../></EffectComposer>`) com `luminanceThreshold` moderado (~0.35) dá o glow nas luzes coloridas (rim lights) sem estourar a cena — reaproveitar em qualquer hero 3D "cores fortes".
- **Validação headless com WebGL**: Playwright + Chromium headless PRECISA das flags `--use-gl=swiftshader --enable-webgl --ignore-gpu-blocklist` pra renderizar WebGL via software (sem GPU real). `waitUntil: 'load'` trava/nunca resolve com Canvas WebGL rodando (a página nunca fica "idle" de verdade) — usar `waitUntil: 'domcontentloaded'` + `waitForTimeout` manual. Sessões muito longas (>60s) com bloom+reflective floor via swiftshader podem derrubar o processo de GPU (`Target crashed`) — preferir scripts curtos e objetivos, um por bloco de telas, a um script único gigante.

### Como reaproveitar a v3 (objeto 3D)

1. Escolher o objeto (perguntar ao Seven se não for óbvio — decide toda a modelagem/paleta).
2. Procurar um modelo `.glb` gratuito e com licença clara (Khronos `glTF-Sample-Assets` no GitHub é a fonte mais segura/rápida — vários objetos comuns já prontos, licença por modelo documentada no `README.md` de cada pasta).
3. **Extrair o bounding box real do `.glb` antes de programar a câmera** (script Node lendo o JSON embutido, accessor `POSITION.min/max` + qualquer matrix de node no meio) — nunca chutar fov/radius de olho.
4. Duplicar a estrutura de `sneaker-volt-3d/components/scene/` (`Sneaker.tsx`, `CameraRig.tsx`, `SneakerScene.tsx`) trocando o path do modelo e os nomes das variantes (se o modelo novo tiver `KHR_materials_variants`; se não tiver, cortar a lógica de troca de cor ou trocar por tint simples via `material.color.set()`).
5. Créditar a licença do modelo no footer sempre que não for CC0.

## Relacionado (v3)

Ver [[project_skill_video_cinematico]] (skill `/video-cinematico`, criada na mesma sessão) — essa v3 é a primeira aplicação prática combinando as duas frentes: hero cinematográfico + objeto 3D interativo.

## v4 — objeto 3D procedural, sem modelo externo (2026-07-18, mesma sessão da v3)

Seven pediu, na sequência direta da v3, um site de samurai com "cores vermelhas e marcantes" a partir de um print de referência (wordmark gigante + katana gráfica). No meio da resposta, mandou dois briefings de IA cada vez mais ambiciosos (nomeado "SHADOW OF THE KATANA") pedindo praticamente uma produção de agência de US$300k (forja com metal derretido, Damascus steel shader, Spline, Matter.js, áudio, 8 cenas cinematográficas). Decisão tomada: declarar explicitamente o que entrava e o que não entrava ANTES de continuar (nunca prometer o brief inteiro), e entregar o núcleo de maior impacto reaproveitando a stack da v3.

- **Local**: `saidas/portfolio/shadow-of-the-katana/` — mesma stack (Next.js 16 + TS + Tailwind v4 + Framer Motion + GSAP/ScrollTrigger + Lenis + R3F/drei/postprocessing).
- **No ar**: https://shadow-of-the-katana.vercel.app (projeto Vercel isolado).
- **Katana 100% procedural, sem asset externo**: ao contrário da v3 (glb baixado do Khronos), aqui a katana inteira foi construída com geometria primitiva do three.js — lâmina via `THREE.Shape` (perfil 2D curvo com `quadraticCurveTo`, tsuba/guarda curvada mais que o fio, imitando o *sori*) + `ExtrudeGeometry` com bevel fino; linha *hamon* como um `TubeGeometry` fino seguindo uma `CatmullRomCurve3` com leve wobble, material emissivo pulsante (`emissiveIntensity` animado via seno) simulando o brilho; tsuba (disco dourado), cabo (cilindro escuro + anéis de toro vermelho/preto simulando o enrolado tradicional) e pomo (esfera dourada). **Vantagem sobre carregar um modelo pronto**: controle total sobre partes separadas desde o início — a "vista explodida" é só animar `position.x` de cada grupo (lâmina/tsuba/cabo/pomo) por um fator de 0 a 1, sem precisar de nenhuma lógica de variantes glTF.
- **Bug real e a lição**: rotação livre e contínua em torno do eixo Y (`rotation.y = t*0.1 + ...`) fazia a lâmina — muito fina, extrudada com profundidade de só 0.028 — ficar de perfil pra câmera em certos ângulos e sumir completamente da tela (aconteceu bem no frame inicial, antes de qualquer scroll). **Fix**: trocar rotação livre por oscilação limitada (`Math.sin(t*0.18) * 0.16`) e casar os valores iniciais da câmera (posição/fov) com o ângulo que já tinha se mostrado bom visualmente, em vez de adivinhar de novo — reaproveita a lição de [[feedback_r3f_camera_bounding_box]] mas mostra um caso novo: mesmo controlando 100% a geometria, ainda dá pra errar o enquadramento por causa de rotação livre + objeto fino. **Sempre testar o frame ANTES de qualquer scroll**, não só o frame já rolado.
- **Paleta corrigida ao vivo**: o brief pedia "nunca cores saturadas, tudo carmesim/dourado discreto" — mas Seven mandou uma imagem de referência (still de "Miss The Rage" do Trippie Redd) com vermelho **chapado e saturado** + estouro de fogo laranja/amarelo. Troquei a paleta inteira (bg de quase-preto pra vermelho vibrante `#e4001b` com gradiente radial pra um vermelho mais profundo nas bordas, partículas de "poeira" viraram faíscas laranja/douradas) name-do-meio da implementação, sem redo estrutural — só trocar tokens de cor no `globals.css` e alguns componentes. **Prova de que vale desenhar a paleta em variáveis CSS centralizadas desde o início** — a troca de conceito visual completo levou poucos minutos.
- **Scroll-story contínuo em um Canvas só**: em vez de várias seções cada uma com seu próprio `<Canvas>` (caro, múltiplos contextos WebGL), o hero + "A Lâmina" (vista explodida) dividem UM canvas só, sticky por `340vh`, com duas camadas de overlay de texto (`phase: "hero" | "blade"`) que trocam de opacidade via `AnimatePresence` quando o progresso de scroll cruza um limiar (0.55) — o estado de fase só re-renderiza React quando muda de fase (não a cada frame), enquanto a posição da câmera e o fator de explosão são refs mutáveis lidos direto no `useFrame` (zero re-render). Ver `lib/useCinematicScroll.ts`.

### Como reaproveitar a v4 (katana ou qualquer objeto 3D sem asset pronto)

1. Desenhar a silhueta 2D do objeto com `THREE.Shape` + curvas (`quadraticCurveTo`/`bezierCurveTo`) e extrudar — funciona bem pra qualquer objeto "fino e alongado" (espada, faca, lâmina, pena, folha).
2. Construir cada peça destacável como seu próprio `<group>` com posição relativa a zero — a "vista explodida" sai de graça, é só multiplicar essa posição por um fator 0→1.
3. Testar o frame ANTES de scrollar qualquer coisa — se o objeto for fino, checar se a rotação livre pode deixá-lo de perfil.
4. Se Seven mandar uma imagem de referência de estilo depois que o código já começou, tratar como correção de arte-direção prioritária — trocar as variáveis de cor centralizadas é rápido, vale interromper e aplicar na hora.
5. Se o brief pedir uma produção multi-cena gigante (efeitos de forja, paisagens fotorreais, áudio, física), declarar explicitamente o que entra/sai ANTES de codar — não tentar prometer tudo silenciosamente e entregar menos.
