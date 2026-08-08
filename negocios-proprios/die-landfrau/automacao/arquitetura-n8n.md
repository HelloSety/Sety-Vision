---
name: arquitetura_automacao_die_landfrau
description: Arquitetura N8N end-to-end da produção diária de vídeos e publicação automatizada
metadata:
  type: project
---

# Arquitetura de Automação — N8N

O que é: o fluxo completo que liga os 8 agentes numa esteira de produção diária, da tendência até a análise. Por que existe: 5-7 vídeos/dia manual não escala — isso só funciona automatizado.

Relacionado: [[project_die_landfrau]] · prompts de cada nó em `prompts/`

## Fluxo

```
[Cron diário — dispara N vezes/dia]
        ↓
[01] Trend Research (Agente 01 · Viral Strategist)
   → busca performance dos últimos vídeos + hashtags de referência
   → gera lote de ideias do dia
        ↓
[02] Hook Generator (Agente 02 · Hook Master)
   → recebe ideia + tipo de vídeo → gera gancho
        ↓
[03] Script Generator (Agente 03 · Storytelling Engineer)
   → recebe ideia + gancho → roteiro completo (DE + PT)
        ↓
   (se tipo = "produto viral") → [04] Sales Copywriter roda em paralelo, injeta script de venda
        ↓
[06a] Image Prompt (Agente 06 · Video Director)
   → roteiro → prompt de imagem-base consistente com a ficha visual
        ↓
[Higgsfield generate_image] → imagem-base da cena
        ↓
[06b] Video Prompt (Agente 06)
   → imagem-base + roteiro → prompt de vídeo (movimento, duração)
        ↓
[Higgsfield generate_video] → clipe gerado
        ↓
[Higgsfield generate_audio] → narração em alemão (voz consistente da persona)
        ↓
[Legenda/Caption Generator]
   → roteiro → legenda TikTok (alemão) + hashtags de `personagem/persona.md`
        ↓
[Higgsfield tiktok_prepare_publish → tiktok_publish]
   → publica no horário programado
        ↓
[07] Retention Analyst (roda em cron separado, ex. 24h depois)
   → puxa métricas do vídeo publicado → relatório → realimenta [01]
        ↓
[08] Community Manager (roda em cron curto, ex. a cada 2h)
   → puxa comentários novos → gera respostas → fila de aprovação ou auto-post
```

## Ferramentas por etapa

| Etapa | Ferramenta |
|---|---|
| Geração de ideia/roteiro/copy | LLM via API (Claude) — nós de LLM no N8N |
| Imagem | Higgsfield `generate_image` |
| Vídeo | Higgsfield `generate_video` |
| Voz alemã | Higgsfield `generate_audio` |
| Publicação TikTok | Higgsfield `tiktok_connect` (uma vez) → `tiktok_prepare_publish` → `tiktok_publish` |
| Métricas | Higgsfield `tiktok_publish_status` / analytics nativo do TikTok |

Usar Higgsfield como fornecedor único de imagem+vídeo+voz+publicação evita orquestrar 4 ferramentas separadas (Midjourney/Kling/ElevenLabs) — mais simples de manter e já está disponível nesta conta.

## Estrutura de pastas do projeto (espelha o fluxo)

```
/personagem   → ficha fixa da persona (fonte de verdade visual/tom)
/prompts      → system prompt de cada agente
/roteiros     → roteiros gerados + estrutura de referência
/videos       → outputs de imagem/vídeo/áudio gerados
/produtos     → framework + ranking de produtos vencedores
/analytics    → relatórios do Agente 07
/automacao    → esta arquitetura + configs do N8N
/tiktok-shop  → checklist e status da loja
```

## Pré-requisito antes de ligar a automação de ponta a ponta

1. Conta TikTok da persona criada e conectada (`tiktok_connect` — precisa de ação sua, é OAuth)
2. Bio com disclosure de IA já publicada (ver `personagem/persona.md`)
3. Pelo menos 1 ciclo manual completo rodado (ideia → roteiro → vídeo → publicação) pra validar qualidade antes de automatizar o volume total
