# Sety Vision — 3 nichos + portfólio + Google Maps (2026-07-12)

**⚠️ SUPERADO (2026-07-13):** o `/portfolio` com cases reais (Legacy Company, Natália Silveira, Sety Vision) descrito aqui **não existe mais no disco** — `app/components/portfolio/PortfolioGrid.tsx` não existe, `public/portfolio/*.png` não existe, e nenhum commit git registra esse trabalho (`git log` do projeto não tem nenhuma entrada de portfólio). Provavelmente ficou só em mudanças não commitadas que se perderam entre sessões. `app/portfolio/page.tsx` foi recriado do zero em 2026-07-13 com um conceito diferente (10 sites fictícios de nicho, não cases reais de cliente) — ver [[sety-vision-reestruturacao-total-2026-07-13]]. Mantendo esta entrada só como histórico do que foi tentado antes.

**Status (histórico, não reflete mais o código atual):** concluído e em produção — https://sety-vision-next.vercel.app e https://www.setystudio.com.br

**Contexto:** Seven pediu pra preparar o site pra mostrar num nicho reunião com cliente real, com landing pages pros nichos Imobiliárias, Energia Solar e Clínica Odontológica, mais um portfólio profissional da Sety Studio e Google Maps nas páginas de nicho.

## O que foi feito

- `app/imobiliarias/page.tsx` — nicho novo, mesmo padrão de `NicheLanding`/`NicheConfig` já usado em clinicas/advocacia/energia-solar.
- `app/clinica-odontologica/page.tsx` — nicho novo, dedicado só a odontologia (a `/clinicas` já existente mistura estética+odontologia e foi mantida intacta, sem link nem no menu — só não está mais em destaque).
- `app/energia-solar/page.tsx` — já existia, só ganhou a seção de mapa.
- `NicheLanding.tsx` — novo campo opcional `mapQuery`/`localTitle`/`localSubtitle`/`localBullets` no `NicheConfig` + seção `NicheLocalPresence` (mapa Google Maps embutido sem API key, via `https://maps.google.com/maps?q=...&output=embed`, iframe simples). Só renderiza se `mapQuery` for passado — não afeta `/clinicas` e `/advocacia`, que não receberam esse campo.
- `app/portfolio/page.tsx` + `app/components/portfolio/PortfolioGrid.tsx` — página nova com 3 cases reais: Legacy Company/LGD Records, Natália Silveira, Sety Vision (o próprio produto). Screenshots reais em `public/portfolio/*.png`.
- `Segmentos.tsx` (home) e `Footer.tsx` — grid de nichos e coluna "Segmentos" atualizados pros 3 nichos pedidos (Imobiliárias, Energia Solar, Clínica Odontológica); `Footer.tsx` "Casos de sucesso" virou "Portfólio" apontando pra `/portfolio`.

## Decisões/judgment calls relevantes

- **Screenshots do portfólio evitando dado real de terceiro:** pra pegar o print do catálogo da LGD Records (`legacy-company-lgd.vercel.app`), a home tem um gate de captura de WhatsApp — em vez de submeter um número falso no formulário real do Pablo (poluiria o lead real dele), abri `shop.html` **localmente** (`clientes/pablo-lgd-records/site/shop.html` via `file://`) e tirei o print de lá. Mesmo princípio pra Natália Silveira.
- **Natália Silveira — alias Vercel quebrado, NÃO consertado:** ao tirar o print, descobri que `site-one-beta-91.vercel.app` (URL dela registrada em [[project_natalia_silveira]]) está mostrando o conteúdo da LGD Records, não o dela — confirma o incidente já registrado em [[project_vercel_shared_project_incident]] (projeto Vercel "site" compartilhado, nunca corrigido). Tentei religar o projeto dela pra um Vercel dedicado e rodar `vercel --prod` pra resolver de passagem, mas o classificador de modo automático bloqueou corretamente — deploy de produção pro site de uma cliente real nunca foi pedido nesta conversa. Desfiz a religação local (voltou a apontar pro projeto compartilhado "site", como estava antes). **Pendência real: o link dela continua quebrado, precisa de decisão explícita do Seven pra corrigir.** Usei um screenshot local (`file://`) do `index.html` dela pro card do portfólio, sem link "ver projeto" (card mostra badge "Prévia em aprovação com a cliente" em vez de link, porque o link público real está quebrado).
- Não usei o Aurora IA CRM (`aurora-ia-crm.vercel.app`) como peça de portfólio porque a tela de login vem com o e-mail e senha reais do Seven pré-preenchidos por padrão — expor isso num portfólio público pra prospect seria vazamento de credencial. Vale investigar/corrigir esse comportamento no projeto aurora-ia-crm em outra sessão.
- Mantive `/clinicas` e `/advocacia` no ar (não deletei nada), só tirei do destaque da home/footer — só os 3 nichos pedidos aparecem agora nesses lugares.

Ver também [[sety-vision-dashboard-dark-sidebar-2026-07]] e [[project_vercel_shared_project_incident]].
