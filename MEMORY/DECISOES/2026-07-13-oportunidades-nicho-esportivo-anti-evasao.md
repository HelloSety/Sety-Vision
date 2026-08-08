# Oportunidades de Serviço — Nicho Esportivo (Academias, Studios, Assessorias, Escolinhas)

**Data:** 2026-07-13
**Quem decidiu:** Seven (análise solicitada, escolha do "atacar primeiro" segue recomendação abaixo — validar execução)
**Status:** Proposto — plano de 7 dias ainda não iniciado

## Decisão

Identificadas 5 oportunidades de serviço pro nicho esportivo (lojas, academias, personal trainers, assessorias de corrida, escolinhas, studios), priorizando reuso total da infra já construída (Aurora/Máquina de Crescimento) em vez de produto novo.

**Insight central:** os segmentos de serviço recorrente (academia, personal, assessoria, escolinha, studio) sangram dinheiro em **evasão de aluno**, não em lead perdido — dor diferente da que a Máquina de Crescimento ataca hoje (carrinho abandonado/venda nova, foco e-commerce). Ninguém no nicho vende "anti-evasão" como produto.

## As 5 oportunidades

1. **Alarme Anti-Evasão** (academias/studios) — detecta aluno inativo (7/14/30d), reativa automático, alerta dono de risco de cancelamento. Setup R$1.490 + R$697/mês.
2. **Máquina de Crescimento e-commerce** (lojas esportivas) — já pronta, carrinho abandonado/dúvida de tamanho. Setup R$2.490 + R$697/mês.
3. **Piloto de Renovação** (assessorias de corrida/personal) — entrega treino, cobra renovação, avisa quando aluno sumiu. Setup R$990 + R$297-497/mês.
4. **Secretária Digital** (escolinhas/studios infantis) — FAQ pra pais + cobrança automática de mensalidade atrasada. Setup R$1.490 + R$297/mês.
5. **Presença Digital Local** (porta de entrada, Set Studio) — site + GMB + Meta Ads local. Site R$500 + R$790/mês gestão.

## Priorização: atacar #1 primeiro

Motivos: reuso 100% (zero engenharia nova), dor quantificável e conhecida pelo próprio dono, decisor único (ciclo de venda curto), ticket recorrente saudável, e nicho ainda não explorado por esse ângulo.

## Oferta desenhada

**"Alarme Anti-Evasão"** — Setup R$990 (fundação, 3 vagas) + R$697/mês. Garantia: recupera 5 alunos em 30 dias ou setup de volta.

## Why

Segue a regra de ouro do GTM (`2026-07-11-estrategia-goto-market-r30k.md`): nunca sacrificar mensalidade por desconto — desconto sempre no setup. Reaproveita infra Aurora já validada em vez de criar produto do zero, alinhado com [[project_coo_framework]] (venda-first, tech só quando serve entrega).

## Tensão identificada (não resolvida, decisão do Seven)

O GTM ativo (`2026-07-11-estrategia-goto-market-r30k.md`) foca prospecção ativa em 3 nichos (clínicas, advocacia, energia solar) rumo a R$30K/mês. Esportivo é recomendado como **frente paralela**, não substituição — Seven já tem autoridade/rede no nicho (Empório Norte Belém, Sports Agent), o que reduz custo de prospecção, mas não deve tirar foco dos 3 nichos em tração.

## Bloqueio ativo que precisa resolver antes de qualquer piloto

Aurora está sem responder no automático por falta de crédito na Anthropic API (ver [[project_aurora_deploy_creditos]]) — sem resolver isso, nenhuma das 5 ofertas funciona de verdade em produção.

## How to apply

Se Seven decidir executar, plano de 7 dias está detalhado na conversa de 2026-07-13 (resolver crédito → reconfigurar prompt Aurora versão anti-evasão → prospecção ativa 30 academias região → calls de diagnóstico → fechar 1-3 fundação → setup + case study).
