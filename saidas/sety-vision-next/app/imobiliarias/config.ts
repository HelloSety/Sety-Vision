import type { NicheConfig, NicheChatLine } from "@/app/components/niche/NicheLanding";
import { WA_MSG } from "@/lib/whatsapp";

const EXEMPLO_CONVERSA: NicheChatLine[] = [
  { role: "ai", text: "Oi! Vi que vocês são uma imobiliária 😊 Posso te fazer uma pergunta rápida?" },
  { role: "user", text: "Pode" },
  { role: "ai", text: "Quando cai um lead de um portal (OLX, ZAP, Viva Real) fora do horário comercial, alguém responde na hora ou só no outro dia?" },
  { role: "user", text: "Só no outro dia, geralmente" },
  { role: "ai", text: "Entendi 😊 Isso é bem comum — e é justamente aí que o cliente já foi falar com outro corretor." },
  { role: "ai", text: "A gente tem ajudado imobiliárias a ter uma IA que responde na hora, qualifica o interesse (comprar/alugar, região, faixa de preço) e já agenda a visita com o corretor certo." },
  { role: "ai", text: "Quer que eu te mostre como funcionaria na prática? São 2 minutinhos 😊" },
];

export const CONFIG: NicheConfig = {
  badgeLabel: "Para imobiliárias e corretores",
  headlineTop: "Todo lead que espera resposta",
  headlineHighlight: "já está falando com o corretor concorrente.",
  subheadline:
    "A Sety Vision responde no WhatsApp em segundos, qualifica o interesse do cliente e organiza visitas e propostas — sem sua equipe correndo atrás de planilha.",
  ctaMessage: WA_MSG.imobiliariaHero,
  ctaText: "Quero parar de perder cliente pra demora",
  trustBadges: ["IA Ativa 24h", "WhatsApp Oficial", "Qualificação Automática", "Agenda de Visitas"],
  doresTitle: "O que sua imobiliária perde todo mês sem perceber",
  doresPairs: [
    { problem: "Lead de portal manda mensagem e espera horas por resposta.", solution: "IA responde em segundos, 24 horas por dia." },
    { problem: "Corretor perde tempo com lead que só queria \"cotar\".", solution: "Qualificação automática — interesse, região e orçamento antes de repassar." },
    { problem: "Visitas e propostas se perdem em conversas soltas.", solution: "CRM organizado por imóvel, corretor e etapa do funil." },
  ],
  exemploTitle: "Assim que sua imobiliária seria atendida",
  exemploConversa: EXEMPLO_CONVERSA,
  heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
  heroImageAlt: "Chaveiro em formato de casa sobre mesa de madeira, representando o setor imobiliário",
  localTitle: "Sua imobiliária no mapa de quem já está decidido a fechar",
  localSubtitle: "Quem pesquisa \"imobiliária perto de mim\" já está pronto pra agendar visita — e não pode esperar até o dia seguinte pra receber resposta.",
  localBullets: [
    "Leads locais chegam prontos pra visitar — a IA responde antes do concorrente.",
    "Qualificação automática evita corretor perdendo tempo com curioso.",
    "Todo histórico de conversa e visita fica registrado no CRM.",
  ],
  mapQuery: "Imobiliárias em São Paulo, SP",
};
