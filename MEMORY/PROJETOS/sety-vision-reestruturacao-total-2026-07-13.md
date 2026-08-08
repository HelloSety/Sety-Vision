# Sety Vision — Reestruturação total + portfólio de nichos (2026-07-13)

**Status:** concluído e em produção — https://www.setystudio.com.br e https://sety-vision-next.vercel.app

**Contexto:** Seven pediu (via mega prompt + várias mensagens de refinamento ao vivo) uma reestruturação completa do site institucional — menos texto, mais visual, nível Stripe/Linear — mais um portfólio de sites fictícios por nicho pra demonstrar capacidade de entrega.

## O que foi feito

**Home (`app/page.tsx`) reestruturada na ordem final:** Hero → Serviços (3 cards de 1 linha) → Resultados Reais (+500 projetos/+100 empresas/+7 anos) → Portfólio (grid com print real) → Como Funciona (4 etapas: Diagnóstico→Planejamento→Desenvolvimento→Entrega) → Planos → Fale com um Especialista (WhatsApp) → FAQ (5 perguntas). Passou por 3 iterações de estrutura na mesma sessão antes de fechar nessa — ver histórico de mensagens se precisar entender o porquê de versões anteriores (dashboard em destaque foi cogitado e depois removido da Home, mas o componente `DashboardShowcase.tsx` continua no código, só não é mais importado em lugar nenhum).

**Páginas novas:** `/servicos`, `/portfolio`, `/resultados`, `/plataforma`, `/contato` — todas com Navbar/Footer atualizados pra nav de 5 itens (Home/Serviços/Portfólio/Resultados/Contato).

**Pricing (`Pricing.tsx`) trocado para os números REAIS já validados no bot Aurora** ([[project_aurora_maquina_crescimento]]): Start R$1.490+R$297/mês (Automação+CRM), Growth R$2.490+R$697/mês (+ Site + Tráfego, "mais popular"), Scale R$4.990+R$1.497/mês (pacote completo). Cada card mostra Implantação e Mensalidade separados, não um preço único — pedido explícito do Seven pra deixar claro que é implantação + recorrência. **Antes de fechar nesses números, passei por uma versão intermediária "Essencial R$900/Profissional R$1.500/Premium Sob Consulta" que o Seven chegou a confirmar como real via pergunta direta — mas depois pediu pra reformular de novo com valores separados por serviço + mensalidade, e nesse momento usei os números do Aurora em vez de inventar novos, pra não repetir o incidente de preço divergente site-vs-bot já registrado em [[project_bot_whatsapp_canonico]]/histórico. Se um dia esses dois pricings (site institucional vs bot Aurora) divergirem de novo, essa é a memória a atualizar.**

**Portfólio (`/portfolio` + `lib/portfolio.ts`):** conceito novo — 10 sites fictícios por nicho (dental, estética, imóveis, solar, advocacia, fitness, restaurante, auto, construtora, seguros), cada um pra ser um projeto standalone (HTML/CSS/JS puro) com deploy Vercel próprio. Por limite de sessão/token, só 3 foram efetivamente publicados nesta sessão — os outros 7 têm os arquivos prontos em `saidas/portfolio/<nicho>/` mas não foram deployados nem aparecem no site (removidos do array `PORTFOLIO_ITEMS`, não ficam como "Em breve" — Seven pediu pra tirar quem não tem site no ar).

**3 sites de portfólio publicados** (projeto Vercel dedicado cada, scope `sety-studio-s-projects`):
- **Sety Dental** (odontologia, azul `#2563EB`) → https://sety-dental.vercel.app — pasta `saidas/portfolio/dental/`
- **Sety Law** (advocacia, preto+dourado) → https://sety-law.vercel.app — pasta `saidas/portfolio/advocacia/`
- **Sety Solar** (energia solar, âmbar+azul-céu) → https://sety-solar.vercel.app — pasta `saidas/portfolio/solar/`

Todos com CTA de WhatsApp indo direto pro número real da Sety Studio (`5519988090110`) — proposital: quem clicar num site-demonstração vira lead real. Cards do portfólio (Home + `/portfolio`) usam **screenshot real** (Playwright) da home de cada site como thumbnail, não bloco de cor — pedido explícito do Seven.

**5 sites ainda pendentes de deploy** (arquivos prontos, não publicados): estética, fitness, restaurante, auto, construtora, seguros — em `saidas/portfolio/<id>/`. Pra publicar: `vercel link --yes --project sety-<id> --scope sety-studio-s-projects` + `vercel --prod --yes` dentro de cada pasta, depois tirar screenshot da home e adicionar de volta em `PORTFOLIO_ITEMS`.

**4º site publicado (2026-07-13, mesmo dia, sessão separada):** **Sety Imóveis** (imobiliária, verde `#0F766E`) → https://sety-imoveis.vercel.app — pasta `saidas/portfolio/imoveis/`. Motivo: Seven estava prospectando imobiliárias e queria o portfólio pronto antes de continuar. Como ficaram 4 cards (não múltiplo de 3) nesse momento, o grid do teaser na Home (`PortfolioTeaser.tsx`) e da página `/portfolio` completa (`PortfolioClient.tsx`) foi mudado temporariamente de `repeat(3, 1fr)` pra `repeat(2, 1fr)` — pedido explícito do Seven pra ficar "2 em cima, 2 embaixo". Screenshot gerado via Playwright (`page.screenshot` só aceita png/jpeg, não webp — tirei em png e converti com `sharp` local do projeto, rodando o script de dentro da pasta `sety-vision-next` porque resolução de módulo ESM é relativa ao arquivo, não ao cwd).

**5º site publicado (2026-07-13, mesma sessão, minutos depois):** **Sety Consórcio** (consórcio de veículos, vermelho/grafite `#B3122A`) → https://sety-consorcio.vercel.app — pasta nova `saidas/portfolio/consorcio/` (não existia arquivo pronto pra esse nicho, diferente dos outros 4 — foi criado do zero: index.html/styles.css/script.js copiando a estrutura de classes do site de imóveis, só trocando paleta/conteúdo pra "cartas de crédito" de carro/SUV/moto). Existe uma pasta legada `PORTFOLIOS/consorcio/` (sistema antigo `sety-studio-web`, site single-file "Prime Consórcios" navy+dourado) que **não foi usada** — é outro padrão, não o dos 4 cards atuais do Sety Vision. Como agora são 5 itens (ímpar), o grid voltou de 2 colunas pra 3 colunas (fica 3 em cima + 2 embaixo) nas duas páginas — 2 colunas com 5 itens deixaria um card sozinho na última linha.

## Judgment calls relevantes

- **PII real bloqueada antes de publicar:** o plano original era usar um screenshot do `/painel` (dashboard real) como prova visual na Home. O print capturou uma conversa REAL de WhatsApp de um lead real (nome "Gabriel", mensagens pessoais) porque `/painel` puxa dado real do Supabase. Descartei esse print e usei `/demo` (rota já existente no projeto, com dado 100% fictício por design — `lib/demo/segments.ts`) em vez disso. Ver [[feedback_pii_terceiros_conteudo_publico]].
- **Classificador de auto mode bloqueou o primeiro `vercel --prod --yes`** por falta de autorização nomeada na conversa — resolvido perguntando explicitamente ao Seven, que autorizou todos os deploys da sessão (site principal + os 10 de nicho) de uma vez.
- **10 agentes em paralelo bateram limite de sessão duas vezes** (resets 22h e depois 3:10am horário de Brasília) — todos os 7 sites que não deployaram têm os arquivos prontos, só não foram publicados por decisão do Seven de conter uso de token, não por erro técnico.
- **Escolha dos 3 sites a publicar não foi arbitrária:** dental/advocacia/solar foram os únicos com os 3 arquivos completos (html+css+js) no momento em que o Seven pediu pra limitar a 3, e por coincidência batem exatamente com os 3 nichos reais de foco comercial da Sety Studio ([[project_estrategia_gtm_r30k]]: odontologia/estética, advocacia, energia solar).

Ver também [[project_sety_vision]], [[project_sety_vision_pricing]] (desatualizada, precisa sync com os números novos), [[project_aurora_maquina_crescimento]].
