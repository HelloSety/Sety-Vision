---
name: ai-audit-framework
description: Framework instalado em ai-audit/ para auditorias comerciais pós-venda (relatório + PPTX), contraparte profunda do /diagnostico-comercial
metadata:
  type: project
---

# AI Audit Framework — Sety Studio

Framework externo (clonado de `vzbaggio/ai-audit`, 2026-07-16) instalado em `ai-audit/` na raiz do repo, personalizado pra Sety Studio. Gera um dossiê completo de auditoria comercial/automação para um cliente (relatório ~1000+ linhas em pt-BR + apresentação executiva PPTX de 15 slides), a partir de entrevistas reais (calls de discovery, mapeamento de processo) — não de pesquisa pública.

## Onde se encaixa no funil

- **Pré-venda** → [[feedback_estilo_venda_consultiva]] / skill `/diagnostico-comercial` (raiz do repo): pesquisa pública, rápido, gera relatório em `saidas/leads/`.
- **Pós-venda / entrega** → este framework: cliente já fechou, entrevistas reais, output aprofundado.

## Arquitetura

3 camadas (directive → orquestração LLM → execution Python), documentada em `ai-audit/CLAUDE.md` (espelhado em `AGENTS.md`/`GEMINI.md`). Workflow completo em `ai-audit/directives/ai_audit_workflow.md`: Client Onboarding → Data Collection → Process Analysis → (Risk Assessment, opcional) → Report Generation → Presentation Generation.

## Personalização feita (2026-07-16)

- **Estrutura de pastas**: `execution/create_client_structure.py` ganhou `--base-path`; output agora vai em `clientes/<nome-do-cliente>/ai-audit/` (convenção do `CLAUDE.md` raiz), não mais numa pasta solta `"[Cliente] - AI Audit"` no root.
- **Identidade visual do PPTX**: `execution/presentation_maker.py` — paleta trocada de azul/navy genérico para preto `#000000` + vermelho `#FF2A2A` + branco (ver `identidade/design-guide.md`), fonte Calibri → Montserrat, cantos de card de arredondados pra retos (estilo angular da marca). Cores semânticas de status (verde=positivo, vermelho=crítico, âmbar=atenção) mantidas — só o "azul=neutro" virou cinza neutro pra nunca usar azul.
- **CLAUDE.md/AGENTS.md/GEMINI.md**: reescritos — removida a seção de webhooks Modal/Google Sheets/Slack (não usada neste repo, era boilerplate genérico do template original), adicionado contexto Sety Studio (relação com `/diagnostico-comercial`, tom de voz, convenção de pastas, regra de quando pular o Risk Assessment).
- Testado localmente: `create_client_structure.py` gera a árvore correta com `--base-path`, e `presentation_maker.py` gera as 15 slides sem erro com a paleta nova.

## Próximos passos (se for usar de verdade)

- Rodar o workflow completo com um cliente real pra validar o relatório final e a apresentação visualmente.
- Se funcionar bem, considerar empacotar como skill própria (`.claude/skills/ai-audit/SKILL.md`) pra ativar via `/ai-audit <cliente>` em vez de precisar ler as diretivas manualmente.
