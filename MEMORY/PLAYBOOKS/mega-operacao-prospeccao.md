# Mega Operação de Prospecção B2B — Sety Studio

Fluxo completo de geração e conversão de leads combinando Google Maps, LinkedIn (scraping + conteúdo) e IA. Motor interno da Sety Studio — não é oferta pra vender a clientes.

## Visão Geral

```
OUTBOUND (frio)                          INBOUND (conteúdo — motor principal)
GOOGLE MAPS SCRAPER                      1 post/dia útil no LinkedIn
       ↓                                 transacional (autoridade/bastidor)
  [CSV Central]  ←—————————————————————  + lead magnet a cada 15-20 dias
       ↓                    |                    ↓
/mapeamento-decisores        |            comentário no post → Lead Shark
  ou Unipile search-from-url |              detecta e manda DM com link
  → Nome Decisor + LinkedIn  |                    ↓
       ↓                     |            Tally (form) → Notion (entrega)
/linkedin-prospecting-dm     |              + e-mail de backup via N8N
  → 6 DMs personalizadas     |                    ↓
       ↓                     |            Cal.com (agendamento direto)
Unipile → envia convite/DM  ←|                    |
  ou publica o post          |            ~1 semana depois: warm outreach
       ↓                     |            (scrape comentários/reações →
       └—————————————————————             enriquece → filtra ICP → cadência
       ↓                                  de prospecção morna) ———————|
/call-prep  →  briefing antes da call  ←——————————————————————————————|
       ↓
/crm-autofill  →  atualiza HubSpot com o resultado
       ↓
/filtro_de_cagada  →  auditoria semanal do funil
       ↓
/crm-forecasting  →  forecast de receita
```

**Ponte outbound↔inbound:** todo lead que comentar/reagir a um post do motor de conteúdo entra no mesmo funil que um lead frio mapeado — mesmo CRM, mesmo `/call-prep`, mesma auditoria semanal. Blueprint completo do funil de conteúdo (lead magnet, entrega automatizada, warm outreach, agendamento com Cal.com, venda em 2 reuniões — testado, R$758k faturados em 2025 pela fonte) em [[reference_framework_funil_linkedin_playbooklab]]. Estratégia de conteúdo específica da Sety Vision (cadência, categorias de post, verba de tráfego) em [[project_sety_vision_estrategia_conteudo_linkedin]].

## O CSV Central

Arquivo: `saidas/prospeccao/template-leads.csv`

| Coluna | Fonte | Skill responsável |
|---|---|---|
| Nome, Categoria, Endereço... | Google Maps Scraper | — |
| Nota Maps, Reviews | Google Maps Scraper | — |
| Website, Nº de Contato | Google Maps Scraper | — |
| Nome Decisor | CNPJ + LinkedIn | `/mapeamento-decisores` |
| LinkedIn | CNPJ + LinkedIn | `/mapeamento-decisores` |
| Email | Enriquecimento web | `/mapeamento-decisores` |

## Etapas da Operação

### Fase 1 — Geração de Lista (Google Maps)
- Ferramenta: Google Maps Scraper (Apify actor ou extensão)
- Input: categoria + cidade/região alvo
- Output: CSV com colunas Nome → Link Maps preenchidas
- Volume sugerido: 50–200 empresas por rodada

### Fase 2 — Enriquecimento de Decisores
- Skill: `/mapeamento-decisores` (via Apify) **ou** Unipile `performed search` com `search_from_url` (cola a URL de uma busca filtrada do LinkedIn — ex: "founder OR CEO, Brasil, setor X" — e recebe todos os resultados paginados)
- Enriquecimento por pessoa: Unipile scrape de perfil completo (headline, cargo, bio, histórico, e-mail — usar `*` nos parâmetros pra trazer tudo) + scrape dos últimos posts da pessoa (personalizar a abordagem com base no que ela postou)
- Enriquecimento por empresa: Unipile scrape do perfil da empresa (headcount, descrição, site) — filtro de ICP por tamanho
- Input: nome da empresa (coluna "Nome" do CSV) ou URL de busca do LinkedIn
- Output: Nome Decisor + URL do LinkedIn + email + bio + headcount da empresa
- Fazer em lotes de 10–20 empresas por vez
- Detalhe técnico completo (endpoints, exemplo de fluxo N8N) em [[reference_unipile_api_linkedin]]

### Fase 3 — Abordagem LinkedIn
- Skill: `/linkedin-prospecting-dm`
- Input: URL do LinkedIn do decisor
- Output: 6 variações de DM personalizada
- Envio: Unipile (novo chat = primeira mensagem fria; mensagem em chat existente = follow-up ou resposta de agente de IA) — **ainda não contratado**, mínimo 10 assentos ~$50-550/mês, decisão de compra em aberto
- Limite: ~80–100 convites/dia (conta paga), ~15/semana (gratuita)

### Fase 4 — Leads Quentes / Warm Outreach (bônus, outbound + inbound)
- Skill: `/linkedin-post-engagers`
- Input: posts de nicho relevante (ex: posts sobre "patrocínio esportivo", "camisas de time") **ou** os próprios posts do motor de conteúdo da Sety Studio (ver [[project_sety_vision_estrategia_conteudo_linkedin]])
- Timing: esperar ~1 semana após o post antes de fazer o scrape — dá tempo do engajamento se acumular
- Output: lista de pessoas que já engajaram, filtrada por ICP (segmento, porte da empresa, cargo — corta analista/estagiário) → cadência de prospecção morna (não fria), maior taxa de resposta que outbound tradicional
- Resultado real reportado pela fonte: um único post gerou 39 reuniões agendadas direto + 8 reuniões extras via warm outreach sobre os mesmos comentários — ver [[reference_framework_funil_linkedin_playbooklab]]
- **Rota gratuita (prioritária enquanto a decisão "100% gratuito" estiver vigente — ver [[project_coo_framework]])**: **Data Miner** (extensão Chrome, grátis) faz o scrape de comentários (nome+URL+texto) sem precisar de Unipile. Qualificação de ICP pode rodar via prompt de IA (Relevance AI no vídeo original, ou substituível por processamento manual/Claude) — ver passo a passo completo em [[reference_framework_r150k_gratuito_baggio]]
- Unipile também cobre isso nativamente (pago): scrape de comentários de um post e scrape de reações/likes

### Fase 5 — Pré-call
- Skill: `/call-prep`
- Input: nome da empresa + nome do decisor
- Output: briefing completo + roteiro de descoberta

### Fase 6 — CRM
- Skill: `/crm-autofill` → atualiza HubSpot após cada interação
- Skill: `/filtro_de_cagada` → toda segunda-feira, audita o funil
- Skill: `/executive-report` → toda sexta, relatório de performance

## Nichos Prioritários para Sety Studio

Por ordem de potencial:
1. **Clubes esportivos** (futebol, vôlei, basquete) → patrocinadores, parceiros, fornecedores
2. **Marcas esportivas regionais** → precisam de site, tráfego, identidade
3. **Academia e fitness** → alta concentração no Maps, decisor fácil de achar
4. **Fornecedores de uniformes/equipamentos** → B2B com ticket médio alto

## Métricas de Controle

| Métrica | Meta semanal |
|---|---|
| Empresas scrapeadas | 100–200 |
| Decisores mapeados | 50–100 |
| DMs enviadas | 50–80 |
| Taxa de resposta esperada | 10–20% |
| Calls agendadas | 5–15 |

## Dependências Técnicas

| Ferramenta | Status | Para que serve |
|---|---|---|
| Google Maps Scraper | — | Fase 1 |
| Apify | Precisará de conta | Fases 2, 4 (alternativa à Unipile) |
| Unipile (API paga, não é MCP nativo — consumida via N8N/HTTP) | Especificada, **não contratada** — mínimo 10 assentos, ~$50-550/mês. Ver [[reference_unipile_api_linkedin]] | Fases 2 (scraping busca/perfil/empresa), 3 (envio DM/convite), 4 (scraping de comentários/reações), motor de conteúdo (publicar post automaticamente) |
| HubSpot MCP | Pendente | Fase 6 |
