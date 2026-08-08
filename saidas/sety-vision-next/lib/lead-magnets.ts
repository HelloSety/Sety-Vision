export type LeadMagnet = {
  slug: string;
  origemPost: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  corpo: string[];
  whatsappMensagem: (nome: string) => string;
};

export const leadMagnets: Record<string, LeadMagnet> = {
  ativo: {
    slug: "ativo",
    origemPost: "post-01 (Aurora / WhatsApp)",
    eyebrow: "Automação",
    titulo: "Como nunca mais deixar um cliente sem resposta no WhatsApp",
    subtitulo: "O passo a passo por trás da Aurora, a automação que atende sozinha 24h por dia.",
    corpo: [
      "A maioria dos negócios perde venda não por falta de lead, mas porque ninguém respondeu a tempo. Cliente manda mensagem às 22h, só é respondido no dia seguinte, e nesse intervalo ele já resolveu com outro fornecedor.",
      "A Aurora resolve isso identificando 3 situações em toda mensagem recebida: lead novo (nunca falou com você), cliente ativo (já é cliente, precisa de suporte) ou alguém perdido no menu (mandou algo fora de contexto). Cada situação tem uma resposta diferente, pronta na hora.",
      "Ela nunca manda balão vazio e nunca trava em loop de despedida — dois erros clássicos de bot mal configurado que fazem o cliente desistir no meio da conversa.",
      "O resultado prático: resposta em segundos, qualquer hora do dia, sem precisar de alguém de plantão no celular.",
    ],
    whatsappMensagem: (nome) =>
      `Opa ${nome}, tudo certo? Segue o material completo sobre como a Aurora funciona 👇\n\nÉ basicamente o que você acabou de ver na página. Se quiser ver isso rodando na prática no seu negócio, é só me chamar aqui mesmo que a gente marca uma conversa rápida.`,
  },
  painel: {
    slug: "painel",
    origemPost: "post-02 (Painel / CRM)",
    eyebrow: "CRM",
    titulo: "Como saber quando um lead esquenta sem ficar checando o WhatsApp",
    subtitulo: "O painel que avisa em tempo real, sem precisar abrir o app a cada 5 minutos.",
    corpo: [
      "Todo negócio que atende por WhatsApp tem o mesmo problema: o lead quente (aquele pronto pra fechar) fica misturado com dúvida simples, spam e cliente antigo só confirmando um horário. Sem prioridade visual, é fácil deixar o lead certo esfriar.",
      "O painel de Lead Quente separa isso automaticamente: pontua cada conversa por sinais reais (urgência, intenção de compra, perguntas sobre preço) e mostra primeiro quem está mais perto de fechar.",
      "Não é preciso abrir o WhatsApp o dia inteiro — o painel avisa quando algo importante aparece.",
      "Isso muda o jogo principalmente pra quem tem mais de uma pessoa respondendo: todo mundo vê a mesma fila, na mesma ordem de prioridade.",
    ],
    whatsappMensagem: (nome) =>
      `Opa ${nome}! Segue o material sobre o painel de Lead Quente 👇\n\nSe quiser ver funcionando com dados reais do seu negócio, me chama aqui que eu te mostro numa conversa rápida.`,
  },
  calcular: {
    slug: "calcular",
    origemPost: "post-05 (Calculadora)",
    eyebrow: "Diagnóstico",
    titulo: "Quanto sua empresa perde por demora no WhatsApp",
    subtitulo: "Uma conta simples pra descobrir o número exato que escapa todo mês.",
    corpo: [
      "Conta rápida: pega quantos leads chegam por WhatsApp por dia. Multiplica pela % que você estima que esfria por demora na resposta (a média de mercado fica entre 20% e 40% quando não há automação). Multiplica pelo ticket médio do seu produto/serviço.",
      "Exemplo: 20 leads/dia, 30% perdidos por demora, ticket médio de R$ 500 → isso é R$ 3.000 por dia de faturamento potencial perdido, só de demora na resposta. Em um mês, mais de R$ 90 mil.",
      "Esse número parece exagerado até você rodar a conta com os dados reais do seu negócio — a maioria nunca fez essa conta porque a perda é invisível: o lead simplesmente some, sem gerar nenhum alerta.",
      "Resolver isso não depende de contratar mais gente pra responder rápido. Depende de nunca deixar a primeira resposta demorar, o que é exatamente o que a automação resolve.",
    ],
    whatsappMensagem: (nome) =>
      `Opa ${nome}! Segue o material sobre o cálculo de perda por demora no WhatsApp 👇\n\nSe quiser eu rodo essa conta com os números reais do seu negócio numa conversa rápida — é só me chamar aqui.`,
  },
};

export function getLeadMagnet(slug: string): LeadMagnet | null {
  return leadMagnets[slug] ?? null;
}
