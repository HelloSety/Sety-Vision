# Visão: IA como Gerente de Atendimento (pós-venda automatizado)

**Data:** 2026-07-02
**Quem decidiu:** Seven
**Status:** Roadmap futuro — não implementado ainda

---

## Visão

Fluxo completo de operação: Anúncio → IA atende → Qualifica → Fecha a venda → Contrato/Pagamento → Seven produz o site → **IA faz todo o pós-venda**.

Durante o projeto, o cliente pergunta "como está meu site?" e a IA responde automaticamente com o status real, sem Seven precisar abrir o WhatsApp. Exemplo: "Seu projeto está em andamento. Já concluímos o layout inicial e estamos configurando as categorias da loja. Próxima etapa: checkout. Previsão dentro do prazo."

## Como funcionaria

Um painel interno onde Seven só marca checkboxes de status (Briefing recebido → Layout iniciado → Layout aprovado → Banner concluído → Produtos cadastrados → Categorias criadas → Pixel configurado → SEO configurado → Revisão → Publicação → Entregue). A IA lê esse status e responde perguntas do cliente automaticamente:
- "Já terminou?" / "Quando entrega?" → IA responde com base no status real.
- "Pode alterar o banner?" → IA responde e registra a solicitação.
- "Pode adicionar mais 200 produtos?" → IA identifica que é fora do escopo, informa isso e apresenta orçamento ou encaminha para aprovação.

Seven só entra em: aprovar orçamento especial, reunião estratégica, vender upgrade (Sety Vision), ou quando o cliente pedir explicitamente para falar com humano.

## Por que isso importa

**Why:** Elimina o gargalo operacional de responder mensagens de acompanhamento de projeto manualmente. Conforme a carteira de clientes cresce, esse tipo de estrutura permite atender muito mais clientes sem aumentar proporcionalmente o tempo gasto em mensagens — é o tipo de alavanca que sustenta escalar sem contratar.

## O que falta para construir (gaps reais)

- Painel interno com status por projeto (não existe hoje — nem no uazapi-agent nem em nenhum outro projeto local).
- Conectar esse status a uma fonte que a IA do WhatsApp consegue ler (hoje `saidas/uazapi-agent/memory.py` só guarda histórico de conversa em RAM, sem noção de "projeto" ou "status").
- Lógica de detecção de pedido fora do escopo (ex: "mais 200 produtos") e fluxo de aprovação/orçamento automático.

**How to apply:** Não implementar agora — é próximo passo natural depois que o motor de vendas (ver [[../PLAYBOOKS/sop-vendas.md]] e a decisão do mesmo dia sobre escada de valor) estiver validado com clientes reais. Retomar quando Seven tiver volume de projetos simultâneos que justifique o painel de status.
