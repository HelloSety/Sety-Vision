# Atendimento Consultivo — Manual para Responder Clientes da Sety

Playbook de uso manual: consultar quando Seven pedir ajuda para redigir, revisar ou planejar resposta a um cliente/lead real (WhatsApp, Instagram, e-mail, call). Não é o prompt do bot automatizado — o Aurora (`saidas/aurora-ia-crm/src/lib/sdr-engine.ts`) já roda sua própria versão em produção, com governança própria (ver `MEMORY/PLAYBOOKS/sop-vendas.md`, seção "Regra de governança"). Este documento é para o trabalho manual, lado a lado com Seven.

Origem: análise das próprias conversas de atendimento de Seven (2026-07-13), que identificou o padrão que faz a venda funcionar. Ver memória `feedback_estilo_venda_consultiva` no hub de memória pessoal.

---

## 0. Regra absoluta — prioridade sobre qualquer outro estilo

Este é o padrão oficial de atendimento da Sety, baseado em conversas reais (seção 14). Em qualquer dúvida de como responder — tom, tamanho de mensagem, quando mostrar prova/imagem, quando falar preço, como conduzir objeção, como fechar — vale o que está demonstrado nas conversas reais, não um estilo genérico de "atendimento consultivo" de mercado.

Nunca soar como script decorado, suporte técnico ou vendedor insistente. O cliente precisa sentir que está falando direto com o dono do negócio, não com um sistema. Nunca revelar IA nem parecer robótico — mesmo ajudando a redigir, a resposta final tem que soar como Seven escreveria.

Se este documento e alguma outra instrução de estilo entrarem em conflito, prevalece o padrão descrito aqui.

---

## 1. Princípio central

A venda não é "empurrar serviço". É comportar-se como um sócio que já resolveu esse problema antes, não como um fornecedor tentando fechar contrato.

Isso muda a mecânica de toda resposta:
- Você não pergunta pra preencher formulário — pergunta pra montar a solução certa.
- Você não lista features — mostra o que muda na vida do cliente.
- Você não empurra o pacote mais caro — mostra o caminho e deixa o cliente decidir o tamanho do passo.
- Você não persegue o fechamento — cria a próxima ação óbvia e para de empurrar.

Se uma mensagem soa como "preciso fechar isso", reescreva. Se soa como "deixa eu te ajudar a resolver isso", está no tom certo.

---

## 2. Personalidade e tom de voz

Direto, confiante, sem jargão de guru. Ver `identidade/design-guide.md` e `_memoria/preferencias.md` para a calibração completa da marca — aqui o recorte específico pra conversa de venda:

- Fala como quem já resolveu esse problema para outros negócios parecidos, sem soar arrogante.
- Frases curtas. Sem enrolação, sem "gostaria de mencionar que".
- Nunca usa: "alavancar", "sinergia", "solução completa e inovadora", "revolucionar seu negócio", promessas de resultado garantido.
- Segurança sem exagero: "essa estrutura costuma resolver esse cenário" em vez de "eu acho que talvez funcione".
- Bom humor permitido, brincadeira forçada não. Espelha a energia de quem está do outro lado — se o cliente é seco, você é seco; se é caloroso, você acompanha.
- Nunca se apresenta com cargo/título nem revela IA quando estiver ajudando a redigir para o bot; quando é Seven mandando pessoalmente, isso não se aplica (ele é o dono, pode se identificar como quiser).

**Vocabulário real observado (conversas reais, 2026-07-13):** com cliente informal, Seven usa "irmão", "Brabo/Braboo", "show", "boa", "top", "massa", "fechou", "tranquilo" — e mantém isso mesmo quando o cliente escreve errado ou sem pontuação. Com cliente mais formal/corporativo, o registro sobe (sem gíria, frases mais completas). Calibrar sempre pelo que o cliente mandou antes, nunca aplicar gíria como padrão default.

**Assinatura de emoji real:** ✅ é o confirmador universal (fecha quase toda frase de valor/proposta). 🏆🚀🔥 aparecem pra celebrar fechamento ou destacar resultado forte. Não é uma lista fixa pra rotacionar — é reforço pontual, nunca decoração.

---

## 3. As 5 etapas da venda consultiva

Toda conversa de venda que funciona segue essa espinha dorsal — nem sempre em mensagens separadas, às vezes comprimida em uma resposta só:

1. **Descobre o problema** — pergunta ou identifica a partir do que o cliente já contou.
2. **Explica por que acontece** — devolve o diagnóstico em uma frase, sem jargão técnico ("isso acontece porque hoje ninguém organiza quem já respondeu e quem ficou esperando").
3. **Mostra que já resolveu isso antes** — autoridade natural, nunca inventando número ou cliente específico sem que seja real.
4. **Mostra provas** — print, dashboard, resultado, ver seção 6.
5. **Oferece a solução** — em transformação, não em lista de recursos.

Nunca pule direto da etapa 1 pra 5. É o erro mais comum: cliente conta o problema, e a resposta já vem com preço e pacote — isso mata a percepção de valor.

---

## 4. Como descobrir a dor

Perguntas de diagnóstico — usar as que fizerem sentido, nunca em bateria:

- Como os clientes chegam até você hoje?
- Quanto você vende por mês (ou quantos atendimentos por dia)?
- O maior gargalo hoje é gerar contato (tráfego) ou fechar quem já chamou (conversão)?
- Quem responde o WhatsApp hoje? Demora quanto tempo?
- Já tentou anúncio, site, CRM antes? O que não funcionou?

Regra: cada pergunta precisa mudar a resposta que você vai dar depois. Se a resposta não muda dependendo do que ele disser, a pergunta é decorativa — corta.

Depois de 1-2 perguntas, já dá pra montar hipótese de diagnóstico. Não é interrogatório — é triagem rápida de um profissional que já viu esse padrão muitas vezes.

**Nunca mate a dor cedo.** Quando o cliente disser "já temos uma ferramenta/CRM rodando", nunca valide isso como se estivesse tudo resolvido ("ah, então já tem uma ferramenta rodando aí, que bom") — isso fecha a porta da descoberta. Reconheça em 1 frase curta e aprofunde na mesma mensagem: "Legal, hoje praticamente toda empresa já usa alguma ferramenta — a diferença costuma aparecer no volume. Nos dias mais corridos, vocês conseguem responder tudo rápido ou ainda depende bastante da equipe?" Sequência: descobrir → confirmar → aprofundar → só então apresentar.

**Pergunta aberta > pergunta fechada.** "Ela dá conta do volume?" só gera "sim/não" e trava a conversa. Prefira o que faz o cliente elaborar: "o que hoje mais toma tempo da equipe no atendimento?", "se pudesse automatizar uma parte hoje, qual seria?", "tem algum ponto do atendimento que vocês ainda gostariam de melhorar?".

**Não converte cedo demais:** depois que o cliente descreve a operação, faça mais 2-3 perguntas de aprofundamento antes de convidar pra demonstração/reunião — só convide quando o próprio cliente já tiver verbalizado onde está a dificuldade. Nesse ponto a apresentação soa continuação natural da conversa, não oferta.

**Personalização por segmento** (usar exemplo do próprio negócio do cliente, nunca genérico):
- Clínica/consultório → consultas, convênio, agenda, confirmação automática.
- Academia → matrícula, aula experimental, renovação.
- Loja/e-commerce → carrinho abandonado, catálogo, checkout, tráfego.
- Espaço de eventos → datas, reserva, sinal, orçamento.
- Serviço B2B → ciclo de vendas mais longo, reunião como etapa central.

**Exceção — ticket pequeno e escopo óbvio:** pra item avulso, rápido e de baixo valor (ex: 1 logo, 1 criativo pontual, ajuste simples), não é preciso o diagnóstico completo — o cliente já sabe o que quer e cotar direto ("Faço por R$100") é o certo. O diagnóstico em etapas serve pra decisão de maior porte (site, loja, CRM, automação, tráfego), onde o valor percebido e o encaixe certo do serviço realmente dependem de entender o cenário.

---

## 5. Como apresentar a solução

**Frase de abertura de valor (automação WhatsApp — foco principal, ver seção 9):** "Eu recupero seus leads e clientes parados pelo WhatsApp e instalo um processo pra sua equipe não perder mais vendas." Usar quando apresentar o que a Sety faz, antes de entrar em diagnóstico — é a versão curta e direta da dor central (seção "A grande ideia" do `sdr-engine.ts`).

**Estatística de autoridade:** "Cerca de 80% das vendas são perdidas quando a resposta no WhatsApp demora mais de 5 minutos." Usar pra justificar a urgência de automatizar/organizar o atendimento — não é alegação vazia, é o motivo concreto por trás da dor. Emplacar depois que o cliente confirmar que demora pra responder, nunca como abertura fria sem contexto.

**ROI antes do preço.** Nunca abra com valor — abra com o que o investimento devolve:
> Errado: "Esse pacote custa R$900."
> Certo: "Se isso trouxer só 8 pedidos a mais no mês, o sistema já se paga sozinho — aí a gente fala de valor."

**Transformação, não tecnologia.** O cliente não compra CRM, compra parar de perder venda. Traduza toda feature em efeito prático:
| Feature (nunca diga assim sozinho) | Diga assim |
|---|---|
| "Tem CRM" | "Você acompanha cada cliente sem perder oportunidade" |
| "Tem follow-up automático" | "Quem parou de responder volta sozinho pro seu funil" |
| "Integra Google Calendar" | "Sua agenda se organiza sozinha, você nunca mais perde horário" |
| "Tem Pixel/Analytics" | "Você sabe de onde vem cada venda e investe só no que traz resultado" |
| "Automação WhatsApp" | "Responde na hora, de madrugada ou no fim de semana, sem depender de ninguém lembrar" |

**Ordem sempre:** problema → consequência → solução. Nunca lista de recursos solta.

**Horizonte (agora vs depois):** quando mais de um serviço faz sentido, separe o que resolve agora do que é próximo passo natural. Nunca despeje tudo de uma vez como se fosse pra contratar junto.

Preço/tabela de referência: ver `MEMORY/PLAYBOOKS/sop-vendas.md` (escada de valor, planos, valores) — não duplicar números aqui, esse arquivo é a fonte e muda com frequência.

---

## 6. Como e quando usar provas reais

**Regra padrão: sempre que uma imagem ajudar a mostrar em vez de só descrever, mandar.** Não é um recurso reservado pra momento de objeção — é prática constante do atendimento, do jeito que Seven realmente faz na prática (ver exemplos reais na seção 14): manda print de criativo quando fala de criativo, print de dashboard quando fala de CRM, print de resultado de anúncio quando fala de tráfego, exemplo de site quando fala de site. Imagem > texto descrevendo a mesma coisa, sempre que ela existir e fizer sentido no que está sendo dito naquele momento.

Além disso, usar especificamente quando:
- O cliente demonstrar ceticismo ("isso funciona mesmo?", "já vi gente prometer isso").
- For a primeira vez que um serviço específico é mencionado com interesse real.
- A conversa estiver esfriando e precisar de um empurrão concreto.

**O que mandar:**
- Print de CRM/dashboard organizando leads.
- Print de conversa de WhatsApp respondida pela IA, ou de notificação "Lead Quente" do CRM em ação.
- Antes/depois de site ou loja.
- Resultado de campanha (sem inventar número — só o que for real e autorizado).
- Portfólio (só quando o segmento bate — loja pra e-commerce, site pra prestador de serviço; nunca portfólio de loja pra quem não vende produto).
- Criativo/exemplo de peça quando o assunto for design/criativo.

**Quantidade:** no máximo 2 imagens por vez — mais que isso bombardeia e derruba a percepção de exclusividade da prova.

**Onde estão os arquivos reais:** ver memória pessoal `reference_provas_reais_locais` — pastas com resultados de venda, portfólio esportivo, portfólio dos nichos alto-ticket (solar/advocacia/dental), dashboard real e resultado de tráfego pago. Usar esse material real em vez de genérico ou inventado. Essas pastas são só pra uso manual (Seven anexa direto no WhatsApp) — nunca publicar automaticamente em site/bot sem confirmação explícita.

**Antes de enviar:** confirmar que a prova é de um cliente que autorizou uso (ver memória `feedback_pii_terceiros_conteudo_publico` — nunca expor nome/telefone real sem consentimento, mesmo mascarado). Se não tiver prova daquele segmento específico, usar autoridade textual em vez de forçar imagem que não bate ("esse tipo de operação é bem comum pra gente, já implementamos fluxo parecido").

**Criar expectativa antes de mandar:** uma frase de setup ("quero te mostrar uma coisa que acho que vai destravar sua operação") segurando a atenção antes do print — não manda a imagem seca sem contexto.

---

## 7. Como analisar mídia que o cliente manda (imagem, vídeo, áudio)

Quando o cliente envia print de Instagram, site, Meta Ads, WhatsApp ou criativo pedindo opinião/diagnóstico, o objetivo é usar a imagem como munição pro diagnóstico, não fazer uma auditoria técnica fria.

**Instagram/rede social:** olhar bio (tem link? tem CTA claro?), grid (identidade visual consistente?), stories em destaque, frequência aparente, se tem prova social visível.
**Site:** primeira impressão em 3 segundos, CTA visível, velocidade percebida, mobile-first, se tem WhatsApp integrado, se conversa com o público certo.
**Meta Ads (print de gerenciador):** CTR, CPM, frequência, criativo (estático vs vídeo), copy do anúncio, se o público bate com o produto.
**Criativo/peça de design:** hierarquia visual, contraste, legibilidade em 2 segundos, se o CTA é óbvio.
**Print de conversa WhatsApp:** tempo de resposta aparente, se qualificou antes de vender, se perdeu oportunidade por demora.

**Como devolver o diagnóstico:** sempre 1 observação específica do que está na imagem antes de qualquer solução — isso é o que faz soar consultoria personalizada, não script. Nunca inventar que viu algo que não está visível na imagem. Se a imagem não permitir conclusão clara, seja honesto ("não dá pra saber pela imagem, mas me conta X que eu já te falo").

**Imagem:** eu leio direto (Claude tem visão) — Seven só precisa passar o arquivo ou o caminho.

**Vídeo e áudio:** eu não processo nativamente nesta conversa. Fluxo: Seven roda o arquivo no ChatGPT ou Gemini (transcrição/descrição) e cola o resultado aqui, ou usa a transcrição que o próprio Aurora já gera via Gemini quando é o bot atendendo (ver `project_aurora_link_audio_intake`). A partir do texto/resumo, eu interpreto o que o cliente precisa e escrevo a resposta no mesmo estilo deste playbook. Nunca inventar ou presumir conteúdo de áudio/vídeo sem essa transcrição — nem "parece que ele está dizendo".

---

## 8. Como vender cada serviço

Referência rápida de gatilho → serviço (critério, não script fixo — usar só quando bater com o que o cliente contou). Catálogo completo e ganchos de upsell por contexto já estão detalhados em `sdr-engine.ts` (linhas ~34-86) e replicados conceitualmente aqui:

- **Loja virtual (Shopify/Nuvemshop)** → vende hoje só por Instagram/WhatsApp manual, quer carrinho e checkout.
- **Site institucional** → prestador de serviço/clínica/escritório que precisa de credibilidade, não necessariamente carrinho.
- **Automação WhatsApp + CRM** → recebe muita mensagem, demora a responder, perde lead, equipe sobrecarregada.
- **Tráfego pago (Meta/Google)** → já tem onde converter, precisa de volume de lead, tem orçamento de mídia.
- **Branding/identidade visual** → empresa nova, logo amador, reposicionamento.
- **Design/criativos avulsos** → peça pontual, já tem ou não marca definida.
- **Motion design** → vídeo, Reels, lançamento, anúncio em vídeo.

**Regra de foco:** resolver primeiro o que o cliente pediu. Cross-sell é exceção pontual (uma frase, só quando o gancho for óbvio pelo que ele mesmo contou), nunca hábito de abertura.

**Foco principal do negócio (confirmado por Seven, 2026-07-13):** quando não há nada específico pedido ainda (prospecção, conversa geral), o produto-carro-chefe é a **automação de WhatsApp** (Sety Vision) — é o que abre a porta na maioria dos atendimentos, com os demais serviços entrando como upsell depois. Isso não contradiz a "escada de upsell observada na prática" da seção 9: aquela escada (Design→Site→Tráfego→WhatsApp→CRM→Automação) é o caminho de quem entrou por um pedido pontual diferente (ex: só queria um logo) e foi crescendo; quando o cliente não pediu nada específico, o ponto de partida certo é a automação, não design/site.

---

## 9. Como aumentar o ticket (upsell natural)

Upsell só acontece quando existe lógica real, nunca por meta de ticket médio isolada:
- Cliente confirma volume de atendimento alto → automação/CRM vira consequência lógica do site, não oferta solta.
- Cliente pede site e já reclama de responder tudo manual → uma frase de gancho, depois volta pro item original.
- Nunca oferecer dois pacotes grandes ao mesmo tempo como se fossem equivalentes — sempre "isso resolve agora, aquilo é o passo de depois".

Frase-modelo: "Pelo que você me contou, eu seguiria assim: isso resolve agora. Mais pra frente, com isso rodando, dá pra escalar com [próximo passo]."

Nunca dizer "temos pacote" — preferir "pelo que entendi do seu negócio, essa estrutura faz mais sentido".

**Escada de upsell observada na prática (cliente já engajado, relação em andamento):** Design/identidade → Site/Loja → Tráfego pago → WhatsApp → CRM → Automação → Escala. É a progressão natural de quem já fechou o primeiro serviço pequeno e vai crescendo com a Sety — diferente da ordem de prioridade do bot em `sdr-engine.ts` (CRM+IA primeiro), que é o critério pra prospecção fria quando NADA foi pedido ainda. Não são contraditórias: uma é "por onde puxar a conversa com quem chegou do zero", a outra é "pra onde a relação cresce depois que o cliente já confia". Em atendimento manual com cliente que já é ou está virando cliente, seguir a escada de crescimento; em prospecção fria sem pedido explícito, seguir a ordem do bot.

---

## 10. Como lidar com objeções

| Objeção | Abordagem |
|---|---|
| "Está caro" | Voltar pro ROI, não descontar automaticamente. "Comparado a perder X vendas por mês por falta disso, o investimento se paga rápido." |
| "Vou pensar" | Descobrir o real motivo antes de aceitar a resposta: "claro — pra eu entender melhor, é questão de orçamento, prioridade ou ainda ficou alguma dúvida sobre como funciona?" |
| "Já tenho uma agência/ferramenta" | Curiosidade genuína, não ataque: "legal, como está funcionando hoje? o que você sente que falta?" — usar a resposta pra mostrar o gap. |
| Ceticismo com IA/automação ("isso não vai soar robótico?") | Mostrar prova concreta (print de conversa real) em vez de argumentar — é a própria conversa que ele está tendo, se for pelo bot, a prova viva. |
| Silêncio após proposta | Ver cadência de follow-up em `sop-vendas.md` ETAPA 5 — nunca cobrar decisão, sempre reabrir com valor novo (novidade, prazo, contexto). |
| "Quero, mas o orçamento não fecha agora" | Nunca perder o cliente por ego de pacote maior. Reduzir escopo pro que cabe no orçamento dele agora ("o orçamento que tiver mais acessível pra você, fechamos") e manter o pacote maior como próximo passo natural depois que o menor já estiver rodando e provando valor. |

Nunca discutir preço fora de contexto de valor — sempre religar objeção de preço a resultado esperado.

---

## 11. Quando parar de vender e só conversar

Sinais de que insistir em venda agora vai queimar o relacionamento:
- Cliente está claramente ocupado/curto (respostas monossilábicas repetidas).
- Pediu explicitamente mais tempo ou disse que "não é o momento".
- Está desabafando um problema pessoal/operacional sem pedir solução ainda.
- Já recebeu proposta e está em processo de decisão interna (não empurrar, só sinalizar disponibilidade).

Nesses casos: reduzir pra modo relacionamento, sem cobrar fechamento, e manter a porta aberta pro follow-up natural depois.

---

## 12. Regras de mensagem no WhatsApp

- 1 balão é o padrão — 1 a 2 linhas. Só quebra em 2 balões quando há um motivo real de conteúdo (validação curta + pergunta que não cabem juntas). 3 balões é teto absoluto, reservado pra proposta/pacote.
- Nunca gastar um balão só com "Boa tarde!" — a saudação vai embutida na primeira frase de conteúdo.
- Espelhar o cliente: se ele manda curto, responda curto; se manda um textão, pode usar 2 balões (o primeiro resumindo o que ele contou).
- Nunca lista numerada tipo menu ("Digite 1 para..."). Conversa natural, sempre.
- Emoji com moderação, só reforçando tom — nunca em excesso (ver preferência geral de marca).
- Sempre fechar com próximo passo concreto, nunca "qualquer dúvida estou à disposição".

---

## 13. Como fechar

Nunca perguntar "fechou?" ou pressionar decisão direta. Em vez disso, criar o próximo passo como algo natural e já em movimento:

> "Se fizer sentido pra você, hoje mesmo já organizo tudo e começamos."
> "Posso já reservar sua implementação pra essa semana?"
> "Quer que eu já prepare o material de início?"

Fechar como parceiro de crescimento, não como fornecedor esperando aprovação.

---

## 14. Exemplos de conversa completa

**Exemplo 1 — Lead frio (Instagram, "quanto custa um site?")**
> Cliente: quanto custa um site?
> Resposta: "Depende do que sua empresa precisa hoje — você já vende ou atende por algum canal, ou seria o primeiro site?"
> Cliente: já atendo só por WhatsApp e Instagram
> Resposta: "Entendi — nesse caso o site vira sua vitrine 24h, mesmo você não estando online. Pra eu te indicar o formato certo (institucional ou já com loja), você já recebe pedido pelo Instagram ou é mais dúvida/orçamento?"

**Exemplo 2 — Lead quente vindo de anúncio ("quero contratar")**
> Cliente: vi o anúncio, quero contratar a automação de WhatsApp
> Resposta: "Perfeito, já entendi o cenário 😊 Isso resolve exatamente quem perde venda por demorar a responder. Hoje quem cuida do seu WhatsApp?"
> Cliente: eu mesmo, e não dou conta
> Resposta: "Faz total sentido — é o caso mais comum que a gente resolve. Posso te mostrar a plataforma funcionando pra você ver como ficaria na sua operação — tenho horário hoje à tarde ou amanhã de manhã, qual fica melhor?"

**Exemplo 3 — Objeção de preço**
> Cliente: achei caro
> Resposta: "Entendo — pensa assim: se isso te trouxer só 5 clientes a mais por mês, o investimento já voltou. Me conta, hoje quantos você estima que perde por demora ou falta de estrutura?"

**Exemplo 4 — Cliente manda print pedindo diagnóstico**
> Cliente: [print do Instagram] o que acha?
> Resposta: "Seu grid está bem organizado, mas não vi link nem CTA na bio — hoje quem quer comprar sabe pra onde ir?"
> Cliente: não, só chama no direct mesmo
> Resposta: "Aí já dá pra destravar bastante só organizando esse caminho. Você já pensou em ter uma página que já filtra e direciona isso pro WhatsApp?"

---

## 15. Checklist antes de mandar qualquer resposta

- Respondi exatamente o que foi perguntado?
- Dá pra dizer mais curto?
- Falei de benefício, não de feature?
- Tem pergunta desnecessária (que não muda a resposta seguinte)?
- Essa mensagem aproxima ou afasta da compra?
- Terminei com um próximo passo concreto?

Se qualquer resposta for "não" (ou "sim" pra pergunta desnecessária), reescrever antes de enviar.
