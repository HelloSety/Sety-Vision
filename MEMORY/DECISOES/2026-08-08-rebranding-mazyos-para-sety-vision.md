---
name: decisao_rebranding_mazyos_para_sety_vision
description: "Confirmação: o sistema pessoal do Seven (Claude Code + todas as skills + IA) passa a se chamar oficialmente Sety Vision, não MazyOS — rebranding textual, pasta física e hostname do Windows mantidos"
metadata:
  type: project
---

# Rebranding MazyOS → Sety Vision (2026-08-08)

**Decisão:** o "sistema operacional pessoal" do Seven — Claude Code + todas as skills + IA, mesclado num só ambiente — passa a se chamar oficialmente **Sety Vision** em toda comunicação e documentação. O apelido antigo "MazyOS" deixa de ser usado como nome falado do sistema.

## Por quê

Consolidação, não criação: "Sety Vision" já era usado como marca desde 2026-07-02 (ver `2026-07-02-escada-de-valor-sety-studio-sety-vision.md`) para o produto comercial de automação/IA, e depois também para o kit-curso instalável (`MEMORY/PROJETOS/sety-vision-curso-2026-08.md`, `README.md` da raiz). O Seven pediu hoje para unificar de vez o nome do "PC"/sistema pessoal com essa marca, em vez de manter dois nomes (MazyOS informalmente vs. Sety Vision nos produtos).

## O que foi verificado (escopo real era menor do que parecia)

- **"MazyOS" nunca foi o nome do PC no Windows** — hostname é `DESKTOP-4BD4JFG`, nenhum drive tem esse rótulo. "MazyOS" é só o nome da pasta raiz do projeto (`E:\MazyOS`).
- `CLAUDE.md`, `AGENTS.md` e `README.md` **já usavam "Sety Vision" consistentemente** antes deste pedido — o rebranding textual já estava praticamente pronto, evoluindo desde julho.
- Busca por "MazyOS" em todo o projeto: **103 arquivos**, mas 100 são paths físicos reais hardcoded em scripts de automação (`E:\MazyOS\...` em `.mjs`/`.js`/`.py`/`.netlify` de clientes reais — Monster Lupas, Autênticas Store, Alex Messias, Sparta Tech etc.) — corretos, não devem mudar. Os outros 3 `.md` também estão corretos como estão: 1 é citação a um curso de terceiros que o Seven viu como referência (mudar o texto trocaria o sentido da frase), 2 são paths físicos reais em documentação.
- **Nenhuma menção residual de "MazyOS" como nome do sistema sobrou em nenhum lugar.**

## Escopo decidido (perguntado e confirmado com o Seven)

Ofereci 3 opções — rebranding textual / renomear a pasta física no disco / renomear o hostname do Windows. Seven escolheu **só rebranding textual**. Portanto, por decisão explícita:

- ❌ **Pasta física `E:\MazyOS` não foi renomeada** — renomear quebraria os 100+ paths absolutos hardcoded acima, incluindo automações de clientes reais em produção, e a pasta não é repositório git (sem rede de segurança fácil).
- ❌ **Hostname do Windows não foi alterado** — segue `DESKTOP-4BD4JFG`.
- ✅ Nome falado/de marca do sistema = **Sety Vision**, dora em diante.

## Com o que se relaciona

- [[../DECISOES/2026-07-02-escada-de-valor-sety-studio-sety-vision.md]] — origem da marca Sety Vision (produto de automação/IA)
- [[../DECISOES/2026-07-13-reposicionamento-comunicacao-sety-vision.md]] — regras de comunicação da marca Sety Vision
- [[../PROJETOS/sety-vision-curso-2026-08.md]] — kit-curso "Sety Vision" já usa esse nome desde antes deste pedido

## Se um dia quiser renomear a pasta/hostname de verdade

Fica pendente, não decidido: exigiria plano dedicado para reescrever os 100+ paths hardcoded nos scripts e validar que nenhuma automação de cliente quebra — trabalho grande, oferecido e recusado nesta rodada.
