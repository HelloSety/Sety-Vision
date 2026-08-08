import type { Metadata } from "next";
import { NicheLanding, type NicheConfig } from "@/app/components/niche/NicheLanding";
import type { NicheChatLine } from "@/app/components/niche/NicheLanding";
import { WA_MSG } from "@/lib/whatsapp";

const TITLE = "IA no WhatsApp para Advocacia — Responda e qualifique casos em segundos | Sety Vision";
const DESCRIPTION = "Automação com IA para escritórios de advocacia: responde e qualifica leads urgentes no WhatsApp em segundos, organiza o funil de casos no CRM. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://sety-vision-next.vercel.app/advocacia" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const EXEMPLO_CONVERSA: NicheChatLine[] = [
  { role: "ai", text: "Oi! Vi que vocês atuam com Direito Trabalhista 😊 Posso te perguntar uma coisa rápida?" },
  { role: "user", text: "Claro" },
  { role: "ai", text: "Quando chega uma mensagem de um cliente urgente fora do horário, alguém consegue responder na hora ou só no dia seguinte?" },
  { role: "user", text: "Só no dia seguinte geralmente" },
  { role: "ai", text: "Entendi, isso é bem comum no setor 😊" },
  { role: "ai", text: "O problema é que quem responde primeiro geralmente fecha o caso." },
  { role: "ai", text: "A gente tem ajudado escritórios a ter uma IA que responde e já qualifica o caso 24h, sem perder esse timing." },
  { role: "ai", text: "Quer ver como funcionaria pro seu escritório? São só 2 minutinhos 😊" },
];

const CONFIG: NicheConfig = {
  badgeLabel: "Para escritórios de advocacia",
  headlineTop: "Quem responde em 2 minutos fecha o caso.",
  headlineHighlight: "Não quem tem mais anúncio.",
  subheadline:
    "A Sety Vision qualifica o caso, organiza o funil por área de atuação e nunca deixa um cliente urgente esperando resposta.",
  ctaMessage: WA_MSG.advocaciaHero,
  ctaText: "Quero nunca mais perder um caso por demora",
  trustBadges: ["IA Ativa 24h", "WhatsApp Oficial", "Qualificação Automática", "CRM por Caso"],
  doresTitle: "O que seu escritório perde todo mês sem perceber",
  doresPairs: [
    { problem: "Lead urgente manda mensagem e espera até o fim do expediente.", solution: "IA responde e qualifica na hora, 24 horas por dia." },
    { problem: "Advogado perde tempo triando caso que não é viável.", solution: "Qualificação automática antes de chegar até você." },
    { problem: "Casos se perdem em conversas soltas no WhatsApp.", solution: "CRM com funil organizado por área e por caso." },
  ],
  exemploTitle: "Assim que seu escritório seria atendido",
  exemploConversa: EXEMPLO_CONVERSA,
};

export default function AdvocaciaPage() {
  return <NicheLanding config={CONFIG} />;
}
