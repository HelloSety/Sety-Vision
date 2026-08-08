---
name: sety-studio-link-bio-2026-07
description: "Link in Bio premium da Sety Studio — substituiu a home de vendas em setystudio.com.br, glass dark + agendamento Cal.com integrado"
metadata:
  type: project
---

# Sety Studio — Link in Bio (2026-07-20)

**Status:** publicado em produção — https://www.setystudio.com.br

## O que é / por que existe

Substituiu a home de vendas completa (`Hero`/`VSL`/`Pricing`/`Testimonials`/`FAQ`) do [[project_sety_vision|Sety Vision]] por uma landing "link in bio" premium, pra usar como link da bio do Instagram (@sety.studio). Decisão explícita do Seven: trocar tudo, sabendo que a home antiga tinha funil de vendas completo e landing pages por nicho via `getActiveNiche()` — perde esse funil na raiz, mas os componentes da landing antiga continuam intactos no código (só não são mais importados por `app/page.tsx`), reversível fácil pelo Git se precisar voltar.

Referência visual: link in bio da Giulia Muniz (screenshot enviado pelo Seven) — estrutura de cards grande/médio/grande adaptada, paleta trocada pra preto/azul/cinza (`#050505` bg, glass `rgba(255,255,255,0.045)` + `backdrop-filter: blur(24px)`, accent `#2563EB`) em vez do rosa dela.

## Com o que se relaciona

- [[project_sety_vision]] — mesmo projeto Next.js (`saidas/sety-vision-next`), mesmo domínio Vercel.
- [[project_vercel_shared_project_incident]] — não se aplica aqui: confirmado que `setystudio.com.br` está no mesmo `projectId` que `sety-vision-next`, sem risco de projeto cruzado.

## O que foi construído

- `app/components/bio/LinkInBio.tsx` — página principal: hero (título + subtítulo + 2 botões), 3 cards de prioridade (Orçamento WhatsApp, Portfólio interno `/portfolio`, Agendar reunião), linha de redes sociais (Instagram/LinkedIn/Behance), card final "algo diferente".
- `app/components/bio/CalButton.tsx` — embed popup oficial do Cal.com (vanilla snippet adaptado a React), abre modal de agendamento sem sair da página.
- `app/api/cal-slots/route.ts` — rota server-side que consulta a API v2 do Cal.com (`GET /v2/slots`) e retorna quantos horários estão livres nos próximos 7 dias pro evento de 30min. Usada pra mostrar disponibilidade **real** da agenda no card ("80 horários livres essa semana" / "Agenda concorrida" se ≤6) — decisão deliberada de não fabricar escassez falsa quando o Seven pediu pra "parecer que a agenda tá lotada": só mostra dado real vindo da API.
- Ícones de marca novos em `app/components/ui/BrandLogo.tsx`: Instagram (gradiente oficial), LinkedIn, Behance — seguem o mesmo padrão dos ícones existentes (Meta, WhatsApp, etc.).
- Favicon (`app/icon.svg`) trocado pra estrela azul `#2563EB` (era hexágono roxo).

## Credenciais e config

- `CAL_API_KEY` (API v1 foi descontinuada, tudo em v2 com `Authorization: Bearer`) salva em `.env.local` **e** nas env vars de produção da Vercel (`vercel env add ... production`) — sem isso a rota `/api/cal-slots` quebra em produção silenciosamente.
- Conta Cal.com: username `sety-studio-morc5w`, evento usado `30min` (id `6373901`). Existem também `15min` e um `secret` oculto — não usados aqui.
- LinkedIn linkado: `https://www.linkedin.com/in/david-teles-552301294/`.

## Pendências

- **Foto real do fundador nunca chegou** — o Seven colou a imagem direto na conversa, mas não existe caminho de arquivo acessível por ferramenta de shell/Read a partir desse tipo de cole; sem isso, os cards usam ícones/glass em vez de foto. Se pedir pra "adicionar a foto", **primeiro peça o caminho do arquivo em disco** (ele precisa salvar/arrastar o arquivo), colar na conversa não é suficiente.
- Redes sociais (Instagram/LinkedIn/Behance) viraram cards secundários pequenos por pedido explícito do Seven ("foco principal é portfólio e agenda + whatsapp") — não promover de volta a destaque sem pedido novo.

## Gotcha técnico (reaproveitar se repetir)

Grade CSS com `gridTemplateColumns: "1fr 1fr 1fr"` sem `minmax(0, ...)` estourou a viewport em ~95px porque um `<button>` nativo dentro de um card não encolhia — sempre usar `minmax(0, 1fr)` em grids com botões/cards dentro. Também: `whileInView` do Framer Motion em cards abaixo da dobra ficou com opacidade 0 no screenshot fullPage (timing do IntersectionObserver); trocado pra `animate` direto (dispara no mount) porque a página é curta e não precisa de scroll-reveal.
