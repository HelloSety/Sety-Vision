import type { NicheConfig, NicheChatLine } from "@/app/components/niche/NicheLanding";
import { WA_MSG } from "@/lib/whatsapp";

const EXEMPLO_CONVERSA: NicheChatLine[] = [
  { role: "ai", text: "Oi! Vi que vocês são uma clínica odontológica 😊 Posso te fazer uma pergunta rápida?" },
  { role: "user", text: "Pode" },
  { role: "ai", text: "Hoje quem responde as mensagens do WhatsApp, a recepção ou o dentista acaba ajudando também?" },
  { role: "user", text: "A recepção, mas às vezes acumula" },
  { role: "ai", text: "Faz total sentido — recepção também atende quem já tá na cadeira, é difícil dar conta de tudo 😊" },
  { role: "ai", text: "A gente tem ajudado clínicas odontológicas a automatizar esse primeiro atendimento — a IA responde na hora, agenda a consulta sozinha e ainda lembra o paciente de voltar pra limpeza ou retorno." },
  { role: "ai", text: "Quer que eu te mostre como funcionaria na prática pra sua clínica? São 2 minutinhos 😊" },
];

export const CONFIG: NicheConfig = {
  badgeLabel: "Para clínicas odontológicas",
  headlineTop: "Sua clínica odontológica perde paciente toda semana —",
  headlineHighlight: "e ninguém percebe.",
  subheadline:
    "A Sety Vision responde no WhatsApp em segundos, agenda a consulta sozinha e reativa quem não voltou pro retorno. Sua agenda cheia, sem sobrecarregar a recepção.",
  ctaMessage: WA_MSG.clinicaOdontoHero,
  ctaText: "Quero parar de perder paciente",
  trustBadges: ["IA Ativa 24h", "WhatsApp Oficial", "Agenda Automática", "Reativação de Paciente"],
  doresTitle: "O que sua clínica odontológica perde todo mês sem perceber",
  doresPairs: [
    { problem: "Paciente manda mensagem e espera horas por resposta.", solution: "IA responde em segundos, 24 horas por dia." },
    { problem: "Ninguém liga pra lembrar da limpeza ou do retorno semestral.", solution: "Reativação automática do paciente antigo." },
    { problem: "Agenda com furo e falta de última hora.", solution: "Confirmação e lembrete automático antes da consulta." },
  ],
  exemploTitle: "Assim que sua clínica odontológica seria atendida",
  exemploConversa: EXEMPLO_CONVERSA,
  heroImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80",
  heroImageAlt: "Dentista mostrando radiografia dentária para paciente em consultório moderno",
  localTitle: "Sua clínica no mapa de quem procura dentista agora",
  localSubtitle: "Quem pesquisa \"dentista perto de mim\" no Google decide rápido — a clínica que responde primeiro é a que fecha a consulta.",
  localBullets: [
    "Paciente novo que pesquisa no Google é respondido em segundos, não em horas.",
    "IA já identifica se é urgência (dor) ou consulta de rotina antes de agendar.",
    "Reativação automática traz de volta quem sumiu do retorno.",
  ],
  mapQuery: "Clínicas odontológicas em Belo Horizonte, MG",
};
