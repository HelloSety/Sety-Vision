---
name: sety-vision-curso-2026-08
description: "Curso Sety Vision (R$47) — ensina a criar site/e-commerce e design com IA + mentoria de captação de cliente; kit instalável via GitHub curado a partir das skills reais da Sety Studio"
metadata:
  type: project
---

# Curso Sety Vision (2026-08-08)

**Status:** kit técnico e material de estudo prontos. Falta: repositório GitHub publicado (bloqueado por permissão de token), gravação dos vídeos, configuração da plataforma de venda.

## O que é / por que existe

Produto novo da Sety Studio: mini-curso de entrada (R$47) inspirado no formato de curso "MazyOS" que o Seven viu como referência (módulos curtos, acesso + instalação, criação de site, mentoria). Ensina o método real que a agência usa — instalar e operar o Sety Vision (sistema de skills no Claude Code), criar site/e-commerce com `/theme-engine`, produzir design com `/design-commander` e `/web-design-commander`, e captar o primeiro cliente pagante (prospecção, tráfego pago, proposta, follow-up, upsell).

Curadoria deliberada: o kit público **não inclui** CRM/HubSpot, prospecção LinkedIn, automação de WhatsApp, `ai-audit` nem `diagnostico-comercial` — isso continua exclusivo da operação da Sety Studio. Decisão do Seven: "não passa todo o ouro" no kit técnico, mas o módulo de mentoria (conteúdo em vídeo) pode ensinar a estratégia comercial completa sem cortar.

## Achado importante durante a execução

O repositório público existente `HelloSety/Sety-Studio` no GitHub é push direto da pasta de trabalho da agência — expõe `clientes/` (Alex Messias, Deroche Mantos, Natália Silveira e outros) e `MEMORY/CLIENTES` publicamente, aparentemente proposital pra hospedar imagens de produto via `raw.githubusercontent.com` (usado no import Shopify da Deroche Mantos). Decisão do Seven: deixar como está por enquanto, não mexer — o kit do curso foi construído do zero, isolado, em `E:\Sety-Vision-Kit`, sem nenhum dado de cliente.

## O que foi entregue

1. **Kit técnico** em `E:\Sety-Vision-Kit` (fora da pasta da agência, sem dados de cliente), com git inicializado e commit feito:
   - Núcleo: `/instalar`, `/abrir`, `/salvar` (com aviso novo sobre não commitar dados de cliente em repo público), `/atualizar`, `/novo-projeto`
   - `/theme-engine` com os 3 componentes reais (`home-ecommerce.html`, `pagina-produto-checkout.html`, `icones-reais.html`) — adaptado pra não referenciar paths internos (`MEMORY/DECISOES/...`) que não existem no kit do aluno
   - `/web-design-commander` e `/design-commander` generalizados (sem menção específica à Sety Studio)
   - `templates/perfis/` (4 perfis) + placeholders limpos de `_memoria/` e `identidade/design-guide.md`
   - README com instrução de clone + `/instalar`, corrigindo o bug de URL quebrada que existia no README do Sety-Studio original
2. **PDF de estudo** em `saidas/sety-vision-curso-plano.html` + `.pdf` (8 páginas, identidade preto+vermelho, gerado via Playwright): visão geral do produto, os 3 módulos com aulas detalhadas, estratégia de faturamento (Hotmart/Kiwify, por que R$47 funciona, funil), plano de criação de conteúdo de divulgação, e checklist de próximos passos.

## Pendências

- **Publicar `HelloSety/sety-vision` no GitHub**: bloqueado — o token fine-grained do `gh` CLI (conta HelloSety) não tem permissão de criar repositório novo (só opera em repos já selecionados no escopo do token). Seven optou por criar o repo manualmente em github.com/new; assim que existir, fazer `git remote add origin` + push do commit já pronto em `E:\Sety-Vision-Kit`.
- Gravar os vídeos dos 3 módulos (roteiro está no PDF)
- Escolher e configurar plataforma de venda (Hotmart ou Kiwify)
- Montar página de vendas
- Separar turma beta antes do lançamento público

## Com o que se relaciona

- [[feedback_icones_reais_nunca_emoji]] — regra replicada no `/theme-engine` do kit
- [[feedback_vercel_sempre_desabilitar_sso]] — relevante quando alunos fizerem deploy dos próprios sites
- MEMORY/DECISOES/2026-08-02-padrao-fixo-unico-mantopro-luluimports.md — origem do design system usado no `/theme-engine` (fonte interna, não replicada no kit público)
