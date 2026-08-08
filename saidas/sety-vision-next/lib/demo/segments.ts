// Dados fictícios do modo demonstração — por segmento de negócio.
// Usado só nas telas do dashboard interno (/painel etc.) pra apresentação comercial.
// Nunca misturar com dados reais de clientes.

export type Segment = {
  id: string;
  label: string;
  agendaLabel: string;   // "Consultas", "Festas", "Aulas"...
  crmLabel: string;      // "Pacientes", "Aniversariantes", "Alunos"...
  greeting: string;      // benefício do dia, não métrica crua
  kpis: {
    leads: number;
    leadsSub: string;
    revenue: number;
    conversas: number;
    conversasSub: string;
    conversao: number;
  };
  horasEconomizadas: number;
  revenue: number[];
  aurora: string[];
  actions: { text: string; color: string }[];
};

export const SEGMENTS: Segment[] = [
  {
    id: "clinica",
    label: "Clínica",
    agendaLabel: "Consultas",
    crmLabel: "Pacientes",
    greeting: "Hoje sua clínica já confirmou 12 consultas automaticamente.",
    kpis: {
      leads: 38, leadsSub: "novos pacientes interessados · +24% esta semana",
      revenue: 42300,
      conversas: 214, conversasSub: "pacientes atendidos automaticamente",
      conversao: 91,
    },
    horasEconomizadas: 18,
    revenue: [21400, 24800, 26100, 31900, 36200, 42300],
    aurora: [
      "3 pacientes confirmaram consulta pra amanhã.",
      "Ana Clara está online há 1 minuto.",
      "Recomendo enviar lembrete de retorno pro Sr. Paulo.",
      "1 paciente perguntou sobre convênio há pouco.",
      "Consulta das 14h foi remarcada automaticamente.",
    ],
    actions: [
      { text: "2 pacientes aguardando confirmação", color: "#EF4444" },
      { text: "1 exame pronto pra retirada", color: "#F59E0B" },
      { text: "3 retornos agendados pra hoje", color: "#3B82F6" },
      { text: "1 paciente pediu orçamento de procedimento", color: "#7C3AED" },
    ],
  },
  {
    id: "eventos",
    label: "Eventos",
    agendaLabel: "Festas",
    crmLabel: "Clientes",
    greeting: "Hoje sua empresa já respondeu 31 orçamentos automaticamente.",
    kpis: {
      leads: 24, leadsSub: "novos orçamentos solicitados · +19% esta semana",
      revenue: 68500,
      conversas: 156, conversasSub: "clientes atendidos automaticamente",
      conversao: 87,
    },
    horasEconomizadas: 22,
    revenue: [32000, 38500, 41200, 52800, 59900, 68500],
    aurora: [
      "Orçamento da festa de 15 anos foi aberto de novo.",
      "Fernanda perguntou sobre disponibilidade em dezembro.",
      "Recomendo oferecer o pacote completo pro casamento de julho.",
      "1 cliente confirmou o buffet pra 80 convidados.",
      "Visita ao espaço marcada pra sexta-feira.",
    ],
    actions: [
      { text: "1 orçamento de casamento aguardando resposta", color: "#EF4444" },
      { text: "2 visitas ao espaço agendadas essa semana", color: "#3B82F6" },
      { text: "1 sinal de pagamento pendente", color: "#F59E0B" },
      { text: "1 cliente pediu cardápio personalizado", color: "#7C3AED" },
    ],
  },
  {
    id: "academia",
    label: "Academia",
    agendaLabel: "Aulas",
    crmLabel: "Alunos",
    greeting: "Hoje sua academia já confirmou 18 matrículas automaticamente.",
    kpis: {
      leads: 52, leadsSub: "novos alunos interessados · +31% esta semana",
      revenue: 28900,
      conversas: 302, conversasSub: "alunos atendidos automaticamente",
      conversao: 78,
    },
    horasEconomizadas: 26,
    revenue: [19800, 21400, 23100, 25600, 27200, 28900],
    aurora: [
      "5 alunos renovaram o plano essa semana.",
      "Lucas perguntou sobre o plano trimestral.",
      "Recomendo oferecer aula experimental de muay thai.",
      "1 aluno está prestes a vencer o plano.",
      "Turma das 19h está com 2 vagas abertas.",
    ],
    actions: [
      { text: "3 planos vencendo essa semana", color: "#EF4444" },
      { text: "2 alunos pediram aula experimental", color: "#3B82F6" },
      { text: "1 pagamento em atraso", color: "#F59E0B" },
      { text: "1 lead perguntou sobre personal trainer", color: "#7C3AED" },
    ],
  },
  {
    id: "professor",
    label: "Professor",
    agendaLabel: "Aulas",
    crmLabel: "Alunos",
    greeting: "Hoje seus alunos já receberam automaticamente os lembretes das aulas.",
    kpis: {
      leads: 16, leadsSub: "novos alunos interessados · +12% esta semana",
      revenue: 9800,
      conversas: 94, conversasSub: "alunos atendidos automaticamente",
      conversao: 85,
    },
    horasEconomizadas: 9,
    revenue: [5200, 6100, 6800, 7900, 8900, 9800],
    aurora: [
      "Mariana confirmou a aula de quinta às 18h.",
      "1 aluno novo perguntou sobre pacote mensal.",
      "Recomendo remarcar a aula de sexta com o Pedro.",
      "Mensalidade de 3 alunos vence essa semana.",
      "1 pai perguntou sobre aulas de reforço no sábado.",
    ],
    actions: [
      { text: "2 mensalidades vencendo essa semana", color: "#EF4444" },
      { text: "1 aula pra confirmar amanhã", color: "#3B82F6" },
      { text: "1 aluno pediu reposição de aula", color: "#F59E0B" },
      { text: "1 lead novo pediu aula experimental", color: "#7C3AED" },
    ],
  },
  {
    id: "restaurante",
    label: "Restaurante",
    agendaLabel: "Reservas",
    crmLabel: "Clientes",
    greeting: "Hoje seu restaurante já confirmou 27 reservas automaticamente.",
    kpis: {
      leads: 61, leadsSub: "novos clientes interessados · +28% esta semana",
      revenue: 51200,
      conversas: 388, conversasSub: "clientes atendidos automaticamente",
      conversao: 82,
    },
    horasEconomizadas: 24,
    revenue: [28900, 33100, 36700, 42800, 47100, 51200],
    aurora: [
      "Mesa pra 6 pessoas reservada pro sábado às 20h.",
      "1 cliente perguntou se aceita reserva pra hoje.",
      "Recomendo oferecer o menu degustação pro grupo de amanhã.",
      "Reserva das 21h foi confirmada automaticamente.",
      "1 cliente pediu cardápio para evento corporativo.",
    ],
    actions: [
      { text: "3 reservas aguardando confirmação", color: "#EF4444" },
      { text: "1 pedido de evento corporativo", color: "#7C3AED" },
      { text: "2 mesas pra reorganizar hoje à noite", color: "#3B82F6" },
      { text: "1 cliente pediu cardápio sem glúten", color: "#F59E0B" },
    ],
  },
  {
    id: "imobiliaria",
    label: "Imobiliária",
    agendaLabel: "Visitas",
    crmLabel: "Clientes",
    greeting: "Hoje sua imobiliária já agendou 6 visitas automaticamente.",
    kpis: {
      leads: 29, leadsSub: "novos clientes interessados · +15% esta semana",
      revenue: 184000,
      conversas: 176, conversasSub: "clientes atendidos automaticamente",
      conversao: 68,
    },
    horasEconomizadas: 20,
    revenue: [98000, 112000, 121000, 145000, 163000, 184000],
    aurora: [
      "Visita ao apartamento da Rua das Flores confirmada.",
      "1 cliente perguntou sobre financiamento.",
      "Recomendo enviar novas opções pro casal Andrade.",
      "Proposta pro imóvel do Centro foi enviada.",
      "1 cliente pediu vídeo do imóvel na Zona Sul.",
    ],
    actions: [
      { text: "2 visitas aguardando confirmação", color: "#EF4444" },
      { text: "1 proposta aguardando resposta", color: "#7C3AED" },
      { text: "1 cliente pediu segunda visita", color: "#3B82F6" },
      { text: "1 lead pediu simulação de financiamento", color: "#F59E0B" },
    ],
  },
  {
    id: "advogado",
    label: "Advogado",
    agendaLabel: "Consultas",
    crmLabel: "Clientes",
    greeting: "Hoje seu escritório já confirmou 5 consultas automaticamente.",
    kpis: {
      leads: 14, leadsSub: "novos clientes interessados · +9% esta semana",
      revenue: 39500,
      conversas: 82, conversasSub: "clientes atendidos automaticamente",
      conversao: 89,
    },
    horasEconomizadas: 11,
    revenue: [18900, 22100, 24800, 29900, 34200, 39500],
    aurora: [
      "1 cliente confirmou consulta pra quinta-feira.",
      "Processo do Sr. Ricardo teve movimentação.",
      "Recomendo enviar retorno pro caso trabalhista.",
      "1 cliente pediu atualização sobre o processo.",
      "Consulta inicial gratuita marcada pra amanhã.",
    ],
    actions: [
      { text: "2 consultas aguardando confirmação", color: "#EF4444" },
      { text: "1 cliente pediu atualização de processo", color: "#3B82F6" },
      { text: "1 contrato aguardando assinatura", color: "#F59E0B" },
      { text: "1 lead pediu consulta sobre direito de família", color: "#7C3AED" },
    ],
  },
  {
    id: "veterinaria",
    label: "Veterinária",
    agendaLabel: "Consultas",
    crmLabel: "Tutores",
    greeting: "Hoje sua veterinária já confirmou 9 consultas automaticamente.",
    kpis: {
      leads: 33, leadsSub: "novos tutores interessados · +21% esta semana",
      revenue: 26800,
      conversas: 198, conversasSub: "tutores atendidos automaticamente",
      conversao: 90,
    },
    horasEconomizadas: 15,
    revenue: [14200, 16800, 18900, 21700, 24100, 26800],
    aurora: [
      "Consulta do Rex confirmada pra amanhã às 10h.",
      "1 tutor perguntou sobre vacina antirrábica.",
      "Recomendo lembrar o retorno da Mel essa semana.",
      "1 tutor pediu orçamento de castração.",
      "Banho e tosa da Luna confirmado pra sexta.",
    ],
    actions: [
      { text: "3 vacinas vencendo esse mês", color: "#EF4444" },
      { text: "1 retorno pra confirmar essa semana", color: "#3B82F6" },
      { text: "1 tutor pediu orçamento de cirurgia", color: "#F59E0B" },
      { text: "1 lead novo perguntou sobre plano de saúde pet", color: "#7C3AED" },
    ],
  },
];

/* ── CRM: leads de exemplo por estágio (só segmento Clínica, fase 1) ── */
export type DemoLead = { name: string; ref: string; value: string; avatar: string };
export type DemoStage = { id: string; label: string; color: string; leads: DemoLead[] };

export const CRM_STAGES: DemoStage[] = [
  { id: "novo", label: "Novo Lead", color: "#6B7280", leads: [
    { name: "Beatriz Lopes", ref: "Avaliação estética", value: "R$ 890", avatar: "B" },
    { name: "Rafael Nunes",  ref: "Consulta cardiologia", value: "R$ 450", avatar: "R" },
  ]},
  { id: "contato", label: "Em Contato", color: "#3B82F6", leads: [
    { name: "Juliana Prado", ref: "Retorno pós-cirúrgico", value: "R$ 320", avatar: "J" },
  ]},
  { id: "qualificado", label: "Qualificado", color: "#A78BFA", leads: [
    { name: "Marcos Vieira", ref: "Check-up completo", value: "R$ 1.200", avatar: "M" },
    { name: "Patrícia Alves", ref: "Exame de imagem", value: "R$ 680", avatar: "P" },
  ]},
  { id: "proposta", label: "Proposta Enviada", color: "#F59E0B", leads: [
    { name: "Sr. Paulo Ferreira", ref: "Tratamento contínuo", value: "R$ 2.400", avatar: "P" },
  ]},
  { id: "fechado", label: "Fechado ✓", color: "#22C55E", leads: [
    { name: "Ana Clara Souza", ref: "Pacote de fisioterapia", value: "R$ 1.800", avatar: "A" },
  ]},
];

/* ── Conversas: exemplo de atendimento (segmento Clínica, fase 1) ── */
export type DemoConversation = {
  name: string; preview: string; time: string; unread?: boolean;
  messages: { from: "cliente" | "ia"; text: string }[];
};

export const CRM_CONVERSATIONS: DemoConversation[] = [
  {
    name: "Beatriz Lopes", preview: "Perfeito, confirmado!", time: "09:41", unread: true,
    messages: [
      { from: "cliente", text: "Oi! Vocês têm horário essa semana pra avaliação estética?" },
      { from: "ia", text: "Olá, Beatriz! 😊 Temos sim — quinta às 14h ou sexta às 10h. Qual prefere?" },
      { from: "cliente", text: "Quinta às 14h" },
      { from: "ia", text: "Perfeito, confirmado! Você vai receber a confirmação por WhatsApp um dia antes." },
    ],
  },
  {
    name: "Rafael Nunes", preview: "Consulta agendada.", time: "08:15",
    messages: [
      { from: "cliente", text: "Bom dia, preciso marcar uma consulta com cardiologista" },
      { from: "ia", text: "Bom dia, Rafael! Temos disponibilidade na segunda às 9h ou na quarta às 16h." },
      { from: "cliente", text: "Segunda às 9h" },
      { from: "ia", text: "Consulta agendada. Qualquer imprevisto, é só me avisar por aqui." },
    ],
  },
  {
    name: "Juliana Prado", preview: "Combinado, até lá!", time: "ontem",
    messages: [
      { from: "cliente", text: "Oi, fiz a cirurgia semana passada, preciso do retorno" },
      { from: "ia", text: "Olá, Juliana! Vou verificar aqui... temos vaga amanhã às 11h pro seu retorno." },
      { from: "cliente", text: "Combinado, até lá!" },
    ],
  },
];

export const DEFAULT_SEGMENT_ID = "clinica";

export function getSegment(id: string): Segment {
  return SEGMENTS.find((s) => s.id === id) ?? SEGMENTS[0];
}
