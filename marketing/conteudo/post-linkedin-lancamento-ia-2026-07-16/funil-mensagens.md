# Funil de mensagens — LinkedIn (Fase 1 passiva + Fase 2 ativa)

Baseado em [[reference_framework_r150k_gratuito_baggio]]. Textos prontos pra copiar/colar — nenhuma automação de DM (não temos MCP do LinkedIn ainda, isso é manual por enquanto).

URLs das páginas de captura (produção): `https://sety-vision-next.vercel.app/material/<slug>`
- `ativo` → post-01 (Aurora)
- `painel` → post-02 (Painel/CRM)
- `calcular` → post-05 (Calculadora)

---

## FASE 1 — Resposta a quem comentar a palavra-chave no post

**Antes de mandar a DM**: confirme que a pessoa está conectada com você (se não estiver, mande o convite de conexão primeiro — só dá pra mandar DM direta pra 1º grau).

### Post 01 (Aurora) — quem comentou "ATIVO"
```
Opa [nome], tudo certo? Segue o material completo sobre a automação que nunca deixa cliente sem resposta 👇

https://sety-vision-next.vercel.app/material/ativo

É rapidinho de acessar, só preencher nome e WhatsApp que libera na hora.
```

### Post 02 (Painel) — quem comentou "PAINEL"
```
Opa [nome], segue o material sobre o painel de Lead Quente 👇

https://sety-vision-next.vercel.app/material/painel

Preenche ali que já libera e te mando uma cópia no WhatsApp também.
```

### Post 05 (Calculadora) — quem comentou "CALCULAR"
```
Opa [nome]! Segue o material sobre quanto dá pra perder por demora no WhatsApp 👇

https://sety-vision-next.vercel.app/material/calcular

Depois volto aqui pra te mostrar o número com os dados reais do seu negócio, se fizer sentido.
```

**Depois de mandar**: volta no comentário do post e responde "Enviado ✅" (mesmo padrão do Victor Baggio) — mostra pra quem mais tá olhando o post que a entrega é real e rápida.

---

## FASE 2 — Warm outreach (~1 a 1,5 semana depois, só quem não converteu)

Rodar só nas pessoas que comentaram mas **não** preencheram o formulário / não agendaram reunião (confirma no Supabase — tabela `leads`, filtrar por `origin` começando com `linkedin-leadmagnet` e `status = novo`).

### Mensagem 1 — imediata (mesmo dia que rodar o scraping)
```
Opa [nome], tudo bem? Não sei se conseguiu acessar o material sobre [tema do post], caso ainda não, segue de novo aqui:

[link do material]

Aproveitando, separei mais um ponto que costuma ajudar bastante em [nicho/segmento da pessoa, se souber] — qualquer coisa, tô à disposição.
```

### Mensagem 2 — 5 dias depois, só se não respondeu
```
[nome], voltando aqui rapidinho — vocês já usam alguma automação no atendimento pelo WhatsApp hoje? Acho que dá pra gente trocar uma ideia sobre isso, sem compromisso.
```

Se não responder essa segunda, encerra o contato — a pessoa reaparece naturalmente no próximo post.

---

## Regra de ouro (do vídeo, vale reforçar)
Nunca mandar o link do material bruto direto — sempre pela página `/material/<slug>`, porque é ela que registra o lead no Supabase e dispara a entrega automática por WhatsApp. Se mandar o conteúdo direto na DM, a pessoa não vira lead rastreável e o funil quebra.
