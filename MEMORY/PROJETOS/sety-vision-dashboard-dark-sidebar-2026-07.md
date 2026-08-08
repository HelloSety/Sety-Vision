# Sety Vision — Dashboard com sidebar preta + card hero (2026-07-12)

**Status:** concluído, testado (Playwright) e em produção — https://sety-vision-next.vercel.app/painel e https://www.setystudio.com.br/painel

## O que foi feito

Pedido do usuário: dashboard (`/painel` e resto do app interno) estava 100% branco, ele mandou 4 prints de referência (dashboards com sidebar preta + conteúdo claro + 1 card "hero" sólido em destaque) e pediu a mesma pegada.

- `Sidebar.tsx` (`saidas/sety-vision-next/app/components/dashboard/Sidebar.tsx`): fundo trocado de branco para `#0B0C0F`, textos/ícones brancos com opacidade (`text-white/40` inativo, `text-white` ativo/hover), logo virou ícone branco sobre fundo escuro. Como é componente de layout compartilhado, o preto se propagou pra todas as páginas do grupo `(dashboard)` automaticamente — não precisou tocar página por página.
- `KPICard.tsx` (`saidas/sety-vision-next/app/components/dashboard/shared/KPICard.tsx`): nova prop opcional `hero?: boolean` — quando true, renderiza fundo preto com gradiente (`#1A1B1F` → `#0B0C0F`) + glow da cor do ícone, texto branco, badges translúcidos. Default `false`, não quebra os outros usos existentes (`demo/page.tsx`, `relatorios/page.tsx`).
- `painel/page.tsx`: primeiro KPI ("Vendas hoje") virou `hero`, os outros 3 continuam brancos — replica o padrão dos prints (1 card sólido escuro quebrando o grid branco, tipo "Total Income"/"Total Likes" das referências).
- Topbar continua branca (só a sidebar + o card hero ficaram pretos) — mantém legibilidade e é o padrão dos prints também (conteúdo majoritariamente claro, só sidebar escura).

## Importante — não confundir com a decisão anterior

Existe uma decisão de 2026-06 ([[sety-vision-rebuild-light-2026-06]]) de deixar o Sety Vision "100% light mode". Essa decisão era sobre a **landing page de marketing** (Hero, Navbar, Pricing, etc.), não sobre o **dashboard interno** (`/painel`, `/crm`, `/leads` etc.). A partir de 2026-07-12, o dashboard interno passou a ter sidebar preta + cards hero pretos de propósito — não é regressão, é pedido explícito do usuário. Se alguém for "corrigir" o dashboard pra 100% branco de novo citando a decisão de light mode, checar esta memória primeiro.

## Como reusar o padrão hero em outras páginas

Basta passar `hero` no `KPICard` desejado (ex: `<KPICard {...k} hero />`) — funciona em qualquer página que já usa `KPICard` (leads, relatórios, crm se vier a usar KPIs lá).

## Round 2 (mesmo dia) — shell flutuante com cantos redondos + corte de nav

Usuário mandou mais 6 prints de referência (Hoo, dashboard CRM estilo lime/preto, X Wallet) — todos com o mesmo padrão: app inteiro dentro de um cartão bem arredondado (~28px) flutuando sobre um fundo cinza neutro, sidebar preta encaixada dentro desse cartão.

- `app/(dashboard)/layout.tsx`: shell inteiro reescrito — fundo `#E7E7ED` fora do cartão, `<div>` com `borderRadius: 28`, `boxShadow` e `transform: translateZ(0)` envolvendo Sidebar + conteúdo. Aplica automaticamente a **todo** o dashboard (todas as ~20 páginas), não só o `/painel`.
- **Importante (pegadinha de CSS):** `transform: translateZ(0)` no wrapper é obrigatório — sem ele, qualquer elemento com `position: fixed` dentro do app (drawer do CRM, `Modal.tsx`) ignora o cartão arredondado e vaza pro viewport verdadeiro, quebrando o visual. Qualquer `transform`/`filter`/`will-change` no ancestral cria um novo *containing block* pra `fixed` — testado e confirmado via screenshot (drawer do CRM respeitando o corte).
- `Sidebar.tsx`: removido o item "Integrações" do nav (pedido explícito: "tira as integrações, foco somente no whatsapp e CRM"). Interpretação conservadora — só tirei o item nomeado, não mexi nos outros 9 itens do menu. Se o usuário quiser reduzir mais (só Dashboard/WhatsApp/CRM), perguntar antes.
- `KPICard.tsx` e os 6 cards inline de `painel/page.tsx`: `borderRadius` subiu de 14 → 20 (visual mais "redondo e bonito" pedido nos prints). Não bumpei o raio dos cards de outras páginas (crm, whatsapp já usavam `rounded-xl`/`rounded-2xl` do Tailwind, ficou consistente o suficiente).

## Pegadinha de deploy — alias `sety-vision-next.vercel.app` não segue `--prod` automaticamente

`vercel --prod` nesse projeto sempre aliasou `www.setystudio.com.br`/`setystudio.com.br` automaticamente, mas **não** atualizou o domínio genérico `sety-vision-next.vercel.app` — ele ficou travado numa deployment de 4 dias atrás mesmo após deploy novo (confirmado com `vercel inspect sety-vision-next.vercel.app`, que resolvia pra uma deployment de 2026-07-08). Corrigido com:

```
vercel alias set <deployment-url-do-prod-mais-recente> sety-vision-next.vercel.app
```

**Como aplicar:** todo próximo deploy de produção deste projeto, depois do `vercel --prod`, checar se `sety-vision-next.vercel.app` também precisa do `alias set` manual — não assumir que ele acompanha o domínio custom automaticamente. Relacionado ao padrão geral descrito em [[project_vercel_shared_project_incident]].

## Round 3 (mesmo dia) — gráficos "iguais aos prints"

Usuário pediu explicitamente pra copiar as configurações de gráfico dos prints (donut/anel de progresso presente em 3 das 4 referências, tooltip flutuante no pico do gráfico como no X Wallet/Coinview).

- `GoalWidget` (card "Meta Mensal", dentro de `painel/page.tsx`): trocou a barra de progresso linear por um anel/donut SVG animado (`motion.circle` com `strokeDasharray`/`strokeDashoffset`), 78% no centro + legenda com bolinhas coloridas (Realizado/Faltam) abaixo — mesmo padrão do "Statistic" (Nikitin) e do ring da Analytics.
- `RevChart`: adicionado tooltip flutuante escuro (`R$ 38,9k`) ancorado no último ponto do gráfico de receita, com setinha apontando pro ponto — mesmo padrão do tooltip "$27,483.00" da X Wallet. Posicionado via % da viewBox (`lp[0]/W`, `lp[1]/H`) sobre um wrapper `position:relative`.
- Não criei componente reutilizável pro donut (ficou inline no `GoalWidget`, único uso até agora) — se precisar de outro anel de progresso em outra página, extrair pra `components/dashboard/shared/`.
