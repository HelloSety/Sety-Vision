---
name: video-cinematico
description: >
  Cria vídeos e heróis animados cinematográficos com IA generativa (Google Whisk) para hero de site,
  portfolio interativo, Reels e anúncios — sem câmera, ator ou editor de vídeo. Cobre geração de frame
  cinematográfico, animação, conversão pra formato web e integração como scroll-hero no site.
  Use quando o usuário pedir "vídeo de alta qualidade", "hero animado", "vídeo cinematográfico",
  "portfolio interativo", "site nível Awwwards/polidori", "scrollytelling" ou /video-cinematico.
---

# /video-cinematico — Vídeo e Hero Cinematográfico com IA

Workflow pra gerar vídeos/heróis de altíssimo acabamento visual usando só ferramentas gratuitas de IA generativa — sem precisar de câmera, ator ou editor profissional. Serve tanto pro hero de um site (portfolio, landing) quanto pra abertura de Reels/anúncio.

## Contexto que você sempre carrega

Antes de gerar qualquer prompt de estilo, ler:
- `identidade/design-guide.md` (Sety Studio) ou `clientes/<nome>/identidade/` (se for projeto de cliente)
- Se o projeto já tiver identidade própria (ex: portfólio-conceito esportivo), usar a dela, não a da Sety

**Nunca usar a paleta de exemplo abaixo (azul/laranja) direto — é só ilustrativa. Sempre trocar pela cor de destaque real do projeto.**

## Quando usar

- Hero de site/portfolio (efeito cinematográfico ao abrir a página)
- Abertura de Reels/anúncio com impacto (atleta, produto, bastidor)
- Loop de fundo pra seção de destaque

## Fase 1 — Gerar frame + animação (Google Whisk, grátis)

1. Acessar `labs.google/fx/tools/whisk`
2. Upload da foto (atleta, produto, cliente) como subject
3. Prompt de estilo — adaptar `[COR DE DESTAQUE]` pra cor real da marca (Sety Studio = vermelho `#FF2A2A`; nunca laranja/amarelo, é proibido no design-guide):

```
Retrato cinematográfico — iluminação dual-tone de alto contraste, [COR DE DESTAQUE] + preto profundo.
Mood: dramático, premium, moderno. Pensar em pôster de filme/esporte.
Luz principal: forte, na cor de destaque. Luz de preenchimento: sombra fria, lado oposto.
Fundo: preto/cinza escuro no topo, leve toque da cor de destaque na base.
Sujeito: close, olhando pra cima ou pra frente. Câmera em ângulo baixo. Vibe heroica, de superação.
Acabamento: liso, glossy, profissional. Sujeito centralizado com espaço pra texto nas laterais.
```

4. Gerar **4-6 variações** e escolher a mais dramática ANTES de animar — qualidade do frame decide a qualidade do vídeo
5. Selecionar o frame escolhido → botão **Animate** → colar:

```
Transição cinematográfica 3D em parallax — zoom lento, leve variação de luz, partículas sutis.
```

## Fase 2 — Converter pra formato web (ezgif, grátis)

1. `ezgif.com/video-to-webp` — subir o vídeo exportado do Whisk
2. Configurações:

| Parâmetro | Valor |
|---|---|
| Resolution | Original |
| FPS | 15 (ou o mais próximo do nativo) |
| Quality | 85 |

3. Clicar **Split** pra extrair os frames em WebP individuais
4. Baixar o ZIP, extrair, renomear a pasta pra `sequence` (nome que o código da Fase 3 espera)

## Fase 3 — Integrar no site

Duas opções — escolher pela urgência do prazo vs. nível de efeito. Se não for óbvio, perguntar ao Seven.

**Opção A — Scroll-scrubbing em Canvas (nível Awwwards, mais trabalho)**

Peça pra eu gerar os componentes direto aqui (não precisa de outra ferramenta):
- `ScrollyCanvas.tsx` — container `500vh` + `<canvas>` sticky `h-screen`. Preload das imagens de `/sequence` em `useEffect`. Mapeia posição do scroll → índice do frame (Canvas, não `<video>`, porque scrubbing por scroll exige desenhar frame a frame).
- `Overlay.tsx` — texto em parallax sobre o canvas (`z-10`): 0% centro, 30% esquerda, 60% direita conforme a rolagem.
- Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion + HTML5 Canvas.

**Opção B — Técnica já validada no portfólio esportivo (mais rápida, mesmo nível de acabamento)**

Reaproveitar o padrão dark cinematográfico + cursor-spotlight + mask-reveal + tilt 3D já testado e aprovado (portfólio Lamine Yamal). Não precisa de sequência de frames — usa a imagem/vídeo direto com CSS + Framer Motion.

## Fase 4 — Padrão de acabamento "nível polidori.dev"

Referência confirmada por Seven (2026-07-18): layout editorial premium — **não é WebGL/Three.js**, é tipografia grande + dark mode + cards numerados + mockup de interface. Aplicar o princípio, mantendo a identidade Sety (nunca trocar fonte):

- Título de impacto sobre foto/vídeo, com overlay escuro em gradiente
- Peso máximo da marca (Montserrat ExtraBold 900) + line-height apertado, pra simular o impacto do serif editorial sem sair da identidade
- Cards numerados (01, 02, 03...) pra blocos de proposta de valor — reaproveitar o layout "NÚMERO" já usado no `/carrossel`
- Mockup de interface/terminal quando fizer sentido mostrar "processo" (ex: automação, dashboard, demo de produto)
- Sem gradiente colorido, sem paleta pastel — preto + vermelho + branco, sempre

## Regras

- Nunca usar a paleta de exemplo (azul/laranja) — sempre adaptar pra identidade real do projeto
- Sempre gerar 4-6 frames no Whisk antes de escolher — nunca animar o primeiro resultado
- Ferramentas usadas (Whisk, ezgif) são gratuitas, sem custo de API
- Perguntar Opção A vs B na Fase 3 quando prazo/orçamento não deixar óbvio qual usar
- Resultado validado (efeito que funcionou bem em produção) → salvar em `MEMORY/TEMPLATES/hero-cinematico-<projeto>.md`
