// Central de WhatsApp da landing — número único, mensagem contextual por botão.
// Nenhum componente deve montar o link na mão: sempre usar openWhatsApp(WA_MSG.x).
export const WA_NUMBER = "5519988090110";

export function openWhatsApp(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_MSG = {
  hero: "Olá! Acabei de conhecer a Sety Studio através do site.\n\nGostaria de agendar uma demonstração da plataforma e entender como ela pode ajudar minha empresa.",
  agendar: "Olá! Gostaria de agendar uma demonstração da plataforma Sety Vision.\n\nPodemos conversar?",
  especialista: "Olá! Gostaria de falar com um especialista da Sety Studio para entender qual solução é ideal para minha empresa.",
  footer: "Olá! Conheci a Sety Studio através do site e gostaria de mais informações.",
  start: "Olá! Gostaria de solicitar um orçamento do plano Start da Sety Studio.\n\nQuero entender melhor como funciona pra minha empresa.",
  growth: "Olá! Gostaria de solicitar um orçamento do plano Growth da Sety Studio.\n\nTenho interesse em site, automação e tráfego pago funcionando juntos.",
  scale: "Olá! Gostaria de solicitar uma proposta do plano Scale (pacote completo) da Sety Studio.\n\nQuero a estrutura toda: site, automação e tráfego pago gerenciado.",
  verDashboard: "Olá! Acabei de ver o Dashboard da Sety Vision e gostaria de solicitar uma demonstração completa da plataforma.",
  verPlataforma: "Olá! Gostaria de conhecer melhor a plataforma da Sety Vision e entender como funciona na prática.",
  orcamento: "Olá! Gostaria de solicitar um orçamento da Sety Studio para automatizar minha empresa.",
  comecarAgora: "Olá! Tenho interesse em começar a utilizar a plataforma da Sety Vision.\n\nGostaria de conversar sobre os próximos passos.",
  flutuante: "Olá! Gostaria de conversar com um especialista da Sety Studio.",
  clinicaHero: "Olá! Vi a página da Sety Studio para clínicas e quero parar de perder paciente por demora no WhatsApp.\n\nPodemos conversar sobre como funciona pra minha clínica?",
  advocaciaHero: "Olá! Vi a página da Sety Studio para escritórios de advocacia e quero qualificar e responder meus leads mais rápido.\n\nPodemos conversar sobre como funciona pro meu escritório?",
  solarHero: "Olá! Vi a página da Sety Studio para energia solar e quero parar de perder orçamento por falta de follow-up.\n\nPodemos conversar sobre como funciona pra minha instaladora?",
  imobiliariaHero: "Olá! Vi a página da Sety Studio para imobiliárias e quero parar de perder cliente por demora no atendimento.\n\nPodemos conversar sobre como funciona pra minha imobiliária?",
  clinicaOdontoHero: "Olá! Vi a página da Sety Studio para clínicas odontológicas e quero parar de perder paciente por demora no WhatsApp.\n\nPodemos conversar sobre como funciona pra minha clínica?",
} as const;
