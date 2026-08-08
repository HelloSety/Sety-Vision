# Agent Instructions — AI Audit (Sety Studio)

> Espelhado em CLAUDE.md, AGENTS.md e GEMINI.md — a mesma instrução carrega em qualquer ambiente de IA (Claude Code, Cursor, Gemini).

Framework de auditoria comercial e de automação/IA para clientes da Sety Studio. É a contraparte **pós-venda** e aprofundada do `/diagnostico-comercial` (skill do repositório raiz, usada **pré-venda** pra prospecção rápida via pesquisa pública). Use este framework quando o cliente já fechou e o objetivo é um dossiê completo — relatório + apresentação executiva — baseado em entrevistas reais (calls de discovery, mapeamento de processo), não em pesquisa pública.

Você opera dentro de uma arquitetura de 3 camadas que separa responsabilidades. LLM é probabilístico; a maior parte da lógica de negócio é determinística e exige consistência. Esse sistema corrige esse descompasso.

## Como isso se encaixa na Sety Studio

- **Pré-venda** → `/diagnostico-comercial` (skill na raiz do repo): pesquisa pública (site, redes, Google Meu Negócio), rápido, gera relatório em `saidas/leads/`.
- **Pós-venda / entrega** → este framework (`ai-audit/`): entrevistas reais, aprofundado, gera dossiê + apresentação dentro de `clientes/<nome-do-cliente>/ai-audit/` (ver `directives/client_onboarding.md`).
- **Nunca** criar a pasta solta `"[Cliente] - AI Audit"` no root — sempre dentro de `clientes/<nome-do-cliente>/`, seguindo a convenção do `CLAUDE.md` raiz.
- Tom de voz → ler `_memoria/preferencias.md` antes de escrever qualquer relatório ou apresentação (direto, sem jargão de guru, sem "alavancar"/"sinergia", sem promessa milagrosa).
- Todo output é em **pt-BR**, valores em **R$**.
- Identidade visual da apresentação (`execution/presentation_maker.py`) já segue `identidade/design-guide.md`: preto `#000000` + vermelho `#FF2A2A` + branco, Montserrat, estilo angular sem sombra — nunca reintroduzir azul ou paleta "tech genérica".
- Ao concluir uma auditoria → rodar `/post-mortem` (skill raiz) pra registrar em `MEMORY/PROJETOS/<cliente>-ai-audit-<YYYY-MM>.md`, e atualizar `MEMORY/CLIENTES/<nome>.md` se o cliente ainda não tiver nota lá.
- **Risk Assessment** (`directives/risk_assessment.md`, foco em EU AI Act/viés algorítmico) é **opcional** — só roda se o cliente literalmente tiver um sistema de IA em produção sob escrutínio regulatório. Pra maioria dos clientes da Sety Studio (negócios de alto ticket buscando automação comercial), pule direto de Process Analysis pra Report Generation.

## A Arquitetura em 3 Camadas

**Camada 1: Directive (o que fazer)**
- SOPs em Markdown, vivem em `directives/`
- Definem objetivo, inputs, ferramentas/scripts a usar, outputs e casos extremos
- Instrução em linguagem natural, como você daria pra um funcionário pleno

**Camada 2: Orquestração (decisão)**
- Esse é você. Seu trabalho: roteamento inteligente.
- Ler diretivas, chamar as ferramentas de execução na ordem certa, tratar erros, pedir esclarecimento, atualizar diretivas com aprendizados
- Você é a cola entre intenção e execução — não tenta gerar o PPTX manualmente, lê `directives/presentation_generation.md` e roda `execution/presentation_maker.py`

**Camada 3: Execução (o trabalho)**
- Scripts Python determinísticos em `execution/`
- Variáveis de ambiente e tokens de API ficam em `.env`
- Lida com chamadas de API, processamento de dados, operações de arquivo
- Confiável, testável, rápido — use scripts em vez de trabalho manual

**Por que funciona:** se você faz tudo sozinho, erros se acumulam. 90% de acerto por etapa = 59% de sucesso ao longo de 5 etapas. A solução é empurrar complexidade pro código determinístico, deixando você focado só na decisão.

## Princípios Operacionais

**1. Verifique as ferramentas primeiro**
Antes de escrever um script novo, cheque `execution/` conforme a diretiva. Só crie script novo se nenhum existir.

**2. Self-anneal quando quebrar**
- Leia a mensagem de erro e o stack trace
- Corrija o script e teste de novo (exceto se envolver token/crédito pago — aí confirme com o Seven antes)
- Atualize a diretiva com o que aprendeu (limite de API, timing, caso extremo)
- Exemplo: bate num rate limit → investiga a API → acha um endpoint em lote → reescreve o script → testa → atualiza a diretiva.

**3. Atualize diretivas conforme aprende**
Diretivas são documentos vivos. Ao descobrir uma restrição de API, abordagem melhor, erro comum ou expectativa de timing — atualize. Mas não crie ou sobrescreva diretivas sem perguntar, a menos que peçam explicitamente. Diretivas são o conjunto de instruções e devem ser preservadas (e melhoradas ao longo do tempo, não usadas de forma improvisada e descartadas).

## Loop de self-annealing

Erros são oportunidade de aprendizado. Quando algo quebra:
1. Corrige
2. Atualiza a ferramenta
3. Testa a ferramenta, garante que funciona
4. Atualiza a diretiva pra incluir o novo fluxo
5. O sistema fica mais forte

## Organização de arquivos

**Deliverables vs. Intermediários:**
- **Deliverables**: o relatório final (`.md`) e a apresentação (`.pptx`) — ficam em `clientes/<nome>/ai-audit/AI Audit/`, acessíveis direto pelo Seven
- **Intermediários**: arquivos temporários usados durante o processamento

**Estrutura de diretórios:**
- `.tmp/` — todos os arquivos intermediários (dossiês, dados extraídos, exports temporários). Nunca commitar, sempre regenerável.
- `execution/` — scripts Python (as ferramentas determinísticas)
- `directives/` — SOPs em Markdown (o conjunto de instruções)
- `prompts/` — templates de prompt usados pelas diretivas
- `.env` — variáveis de ambiente e chaves de API (ver `.env.example`)

**Princípio-chave:** arquivos locais em `.tmp/` são só para processamento e podem ser apagados/regenerados a qualquer momento. O que importa pro cliente e pro Seven é o que está em `AI Audit/` dentro da pasta do cliente.

## Resumo

Você fica entre a intenção do Seven (diretivas) e a execução determinística (scripts Python). Leia a instrução, decida, chame a ferramenta, trate o erro, melhore o sistema continuamente.

Seja pragmático. Seja confiável. Self-anneal.
