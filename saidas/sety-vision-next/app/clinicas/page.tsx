import type { Metadata } from "next";
import { NicheLanding, type NicheConfig } from "@/app/components/niche/NicheLanding";
import type { NicheChatLine } from "@/app/components/niche/NicheLanding";
import { WA_MSG } from "@/lib/whatsapp";

const TITLE = "IA no WhatsApp para Clínicas — Nunca mais perca um paciente | Sety Vision";
const DESCRIPTION = "Automação com IA para clínicas de estética e odontologia: responde no WhatsApp em segundos, agenda sozinha e reativa paciente antigo automaticamente. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://sety-vision-next.vercel.app/clinicas" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const EXEMPLO_CONVERSA: NicheChatLine[] = [
  { role: "ai", text: "Oi! Vi que vocês são uma clínica odontológica 😊 Posso te fazer uma pergunta rápida?" },
  { role: "user", text: "Pode" },
  { role: "ai", text: "Hoje quem responde as mensagens do WhatsApp, a recepção ou o dentista acaba ajudando também?" },
  { role: "user", text: "A recepção" },
  { role: "ai", text: "Entendi 😊 E hoje consegue responder tudo rapidinho ou às vezes acumula um pouco?" },
  { role: "user", text: "Às vezes acumula" },
  { role: "ai", text: "Faz sentido, isso é super comum por aqui." },
  { role: "ai", text: "A gente tem ajudado clínicas a automatizar esse primeiro atendimento — a IA responde na hora, agenda sozinha e ainda lembra o paciente de voltar pro retorno." },
  { role: "ai", text: "Quer que eu te mostre como funcionaria na prática? São 2 minutinhos 😊" },
];

const CONFIG: NicheConfig = {
  badgeLabel: "Para clínicas de estética e odontologia",
  headlineTop: "Sua clínica perde paciente toda semana —",
  headlineHighlight: "e você nem sabe.",
  subheadline:
    "A Sety Vision responde no WhatsApp em segundos, agenda sozinha e reativa quem não voltou pro retorno. Sua agenda cheia, sem sua equipe correndo atrás.",
  ctaMessage: WA_MSG.clinicaHero,
  ctaText: "Quero parar de perder paciente",
  trustBadges: ["IA Ativa 24h", "WhatsApp Oficial", "Agenda Automática", "Reativação de Paciente"],
  doresTitle: "O que sua clínica perde todo mês sem perceber",
  doresPairs: [
    { problem: "Paciente manda mensagem e espera horas por resposta.", solution: "IA responde em segundos, 24 horas por dia." },
    { problem: "Ninguém liga pra lembrar da limpeza ou do retorno.", solution: "Reativação automática do paciente antigo." },
    { problem: "Agenda com furo e falta de última hora.", solution: "Confirmação e lembrete automático antes da consulta." },
  ],
  exemploTitle: "Assim que sua clínica seria atendida",
  exemploConversa: EXEMPLO_CONVERSA,
};

export default function ClinicasPage() {
  return <NicheLanding config={CONFIG} />;
}
