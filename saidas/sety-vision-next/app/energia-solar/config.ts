import type { NicheConfig, NicheChatLine } from "@/app/components/niche/NicheLanding";
import { WA_MSG } from "@/lib/whatsapp";

const EXEMPLO_CONVERSA: NicheChatLine[] = [
  { role: "ai", text: "Oi! Vi que vocês trabalham com instalação de energia solar 😊 Posso te perguntar uma coisa rápida?" },
  { role: "user", text: "Pode" },
  { role: "ai", text: "Depois que manda um orçamento, vocês costumam fazer follow-up com quem não respondeu, ou geralmente fica por isso mesmo?" },
  { role: "user", text: "Geralmente fica por isso mesmo, não dá tempo" },
  { role: "ai", text: "Isso é super comum — a equipe corre atrás de orçamento novo e acaba esquecendo de quem já pediu 😊" },
  { role: "ai", text: "A gente tem ajudado instaladoras a automatizar esse follow-up, sem perder nenhum orçamento no meio do caminho." },
  { role: "ai", text: "Quer que eu te mostre como funcionaria? São 2 minutinhos 😊" },
];

export const CONFIG: NicheConfig = {
  badgeLabel: "Para instaladoras de energia solar",
  headlineTop: "Quantos orçamentos de solar você mandou",
  headlineHighlight: "que nunca mais te responderam?",
  subheadline:
    "A Sety Vision faz o follow-up que sua equipe não tem tempo de fazer — do primeiro contato até a instalação fechada.",
  ctaMessage: WA_MSG.solarHero,
  ctaText: "Quero parar de perder orçamento fechado",
  trustBadges: ["IA Ativa 24h", "WhatsApp Oficial", "Follow-up de Longo Prazo", "Funis Residencial e Comercial"],
  doresTitle: "O que sua instaladora perde todo mês sem perceber",
  doresPairs: [
    { problem: "Lead pede simulação e esfria em uma semana.", solution: "Follow-up automático de longo prazo, sem perder o timing." },
    { problem: "Vendedor perde tempo com lead sem perfil pra comprar.", solution: "IA qualifica consumo, telhado e urgência antes." },
    { problem: "Funil residencial e comercial misturados numa planilha.", solution: "Múltiplos funis organizados no mesmo CRM." },
  ],
  exemploTitle: "Assim que sua instaladora seria atendida",
  exemploConversa: EXEMPLO_CONVERSA,
  heroImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
  heroImageAlt: "Painéis solares em campo aberto sob céu azul com nuvens",
  localTitle: "Sua instaladora no mapa de quem já quer economizar na conta",
  localSubtitle: "Quem pesquisa \"energia solar perto de mim\" já tá comparando orçamento — quem responde primeiro leva a venda.",
  localBullets: [
    "Lead residencial e comercial qualificado antes de chegar no vendedor.",
    "Follow-up automático de longo prazo, sem depender de planilha.",
    "Funil organizado por região de atendimento no mesmo CRM.",
  ],
  mapQuery: "Instaladoras de energia solar em Campinas, SP",
};
