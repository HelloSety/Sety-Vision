---
name: die-landfrau-negocio-proprio-2026-07
description: "Die Landfrau — influenciadora virtual 100% sintética pro TikTok Alemanha, negócio próprio do Seven (fora Sety Studio), monetiza via TikTok Shop em EUR"
metadata:
  type: project
---

# Die Landfrau — Negócio Próprio (2026-07-31)

**Status:** estrutura e playbook montados, produção real ainda não iniciada. Bloqueio ativo: TikTok Shop Alemanha exige registro empresarial alemão (ver pendências).

## O que é / por que existe

Negócio próprio do Seven, separado dos clientes da Sety Studio — ver [[project_tiktok_shop_internacional]]. Ideia: criar uma influenciadora virtual (persona 100% sintética, sem rosto de pessoa real) no nicho "vida no campo/Landleben" pro TikTok da Alemanha, gerar audiência com conteúdo orgânico e vender produtos via TikTok Shop, recebendo em EUR. É o primeiro mercado de um plano maior de replicar o modelo em outros países/moedas (GBP, USD).

Ponto de partida sensível: o Seven mandou uma foto de uma pessoa real e identificável como referência inicial de rosto. Foi barrado explicitamente — perguntado a origem, e a decisão final foi usar rosto 100% sintético gerado por IA, sem vínculo com pessoa real (risco de imagem/GDPR/Recht am eigenen Bild na Alemanha).

## Com o que se relaciona

- [[project_tiktok_shop_internacional]] — a iniciativa guarda-chuva (EUR/GBP/USD)
- Pasta do projeto: `negocios-proprios/die-landfrau/` (fora de `clientes/`, porque não é cliente da Sety Studio)

## O que foi construído

Playbook operacional completo em `negocios-proprios/die-landfrau/`:

- `personagem/persona.md` — ficha da persona (nome Mareike, 34 anos, Münsterland/NRW, diretriz visual pra manter consistência em toda geração de IA, texto de disclosure obrigatório na bio por causa do AI Act Art. 50 da UE)
- `prompts/01` a `08` — system prompts prontos pra colar em nós de LLM no N8N: Viral Strategist, Hook Master, Storytelling Engineer, Copywriter de Venda, Produto Winner Finder, Video Director, Retention Analyst, Community Manager
- `roteiros/estrutura-roteiro.md` — estrutura fixa (hook 0-3s → curiosidade → história → resultado → CTA) + 5 exemplos completos em alemão+PT, um por tipo de vídeo da produção diária
- `produtos/framework-produto-winner.md` — critérios de produto (faixa €15-45, categorias prioritárias: beleza natural, casa rústica, jardim, organização, pet)
- `automacao/arquitetura-n8n.md` — fluxo end-to-end: tendência → ideia → gancho → roteiro → imagem (Higgsfield) → vídeo (Higgsfield) → voz (Higgsfield) → legenda → publicação (`tiktok_publish`) → análise → realimenta o ciclo
- `tiktok-shop/checklist-alemanha.md` — passo a passo de abertura de loja
- `plano-escala.md` — fases 30/90/180 dias (validar formato → crescer audiência → escalar produto), com regra explícita de não multiplicar personas/contas antes da primeira provar retenção+conversão

Produção diária desenhada: 5 vídeos/dia = 150/mês (história emocional, rotina, curiosidade, produto, teste de tendência). Escalar pra 7/dia (210/mês) só depois que a Fase 1 validar retenção.

## Pesquisa de mercado (2026-07-31, achados que sustentam as decisões acima)

- TikTok Shop Alemanha está ativo desde 31/03/2025 (não é "em breve")
- Comissão de 9% sobre vendas (7% eletrônicos) desde 08/01/2026
- Beleza domina o GMV alemão (~24-35%); faixa de preço ideal €15-45 pra compra por impulso
- Criadores de referência no nicho: Paulas_landleben (~567k), Landwirt_kyf (~170k) — padrão comum é baixa produção, alta autenticidade

## Caminho documental pra receber em EUR (fechado em 2026-07-31)

Einzelunternehmen (autônomo) está fora — exige residência/visto alemão. Caminho viável: **UG (haftungsbeschränkt)**, sócio/diretor pode ser não-residente. Sequência: (1) constituir UG via formation agent tipo Firma.de — 2-4 semanas, ~€1.000-1.500, notário por videoconferência; (2) assim que sair o Handelsregisterauszug, abrir **Wise Business** (IBAN EUR em nome da UG — N26 Business e Payoneer NÃO servem pra esse caso); (3) registrar USt-IdNr no Finanzamt/BZSt; (4) cadastrar no TikTok Shop Seller Center com os 3 documentos. Carga tributária recorrente da UG: ~30-33% sobre o lucro (Körperschaftsteuer 15% + Soli 5,5% + Gewerbesteuer municipal ~14-17%). Detalhe completo, com serviços de formação remota e rota alternativa (fornecer via parceiro já estabelecido), em `negocios-proprios/die-landfrau/tiktok-shop/checklist-alemanha.md`.

## Pendências

- **Ação que só o Seven executa:** nada disso automatiza — constituir a UG e abrir a Wise Business exige assinatura/identidade real dele. O caminho está mapeado, falta ele decidir e executar (ou contratar quem execute).
- Conta TikTok da persona ainda não foi criada/conectada (`tiktok_connect` precisa de ação do Seven, é fluxo OAuth)
- Geração real de imagem/vídeo/voz (Higgsfield) ainda não rodou — o playbook está pronto, falta executar o primeiro ciclo manual antes de automatizar o volume total
- Nome da persona ("Die Landfrau") veio do próprio Seven; nome próprio "Mareike" e região "Münsterland" foram decisão minha (Claude) como placeholder — pode trocar sem custo se ele preferir outro nome/região
