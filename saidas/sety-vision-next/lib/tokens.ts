// Design tokens — Sety Vision landing (redesign premium)
// Single source of truth. No component should hardcode colors.
// Imported via "@/lib/tokens" (alias "@/*" -> project root).

export const colors = {
  background: "#FAFAFA",
  surface: "#FAFAFA",
  surface2: "#F1F1F4",
  card: "#FFFFFF",
  border: "rgba(15,23,42,0.08)",
  borderMid: "rgba(15,23,42,0.12)",
  ink: "#0F172A",
  text: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  purple: "#7C3AED",
  purpleDark: "#6D28D9",
  purpleLight: "#8B5CF6",
  purpleLighter: "#A78BFA",
  green: "#22C55E",
  greenDark: "#16A34A",
  white: "#FFFFFF",
  black: "#0F172A",
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
} as const;

export const shadow = {
  xs: "0 1px 3px rgba(15,23,42,0.06)",
  sm: "0 2px 8px rgba(15,23,42,0.08)",
  md: "0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
  lg: "0 8px 32px rgba(15,23,42,0.10), 0 2px 8px rgba(15,23,42,0.05)",
  xl: "0 20px 60px rgba(15,23,42,0.10), 0 4px 16px rgba(15,23,42,0.05)",
  purple: "0 4px 24px rgba(124,58,237,0.28)",
  purpleLg: "0 8px 48px rgba(124,58,237,0.38)",
} as const;

export const motion = {
  spring: { type: "spring", stiffness: 400, damping: 30 },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  fast: { duration: 0.2 },
  normal: { duration: 0.4 },
  slow: { duration: 0.6 },
} as const;

// Container padrão — USE SEMPRE ESTE E APENAS ESTE
export const container = {
  maxWidth: 1280,
  padding: "0 32px",
} as const;

// Helper: estilo inline do container padrão (1280 / 32px).
// Em mobile o padding cai para 20px via a classe utilitária "landing-container".
export const containerStyle = {
  maxWidth: container.maxWidth,
  margin: "0 auto",
  padding: container.padding,
  width: "100%",
} as const;

// ────────────────────────────────────────────────────────────
// Dashboard (app interno /painel etc.) — tokens do redesign
// sidebar preta + shell flutuante de 2026-07-12. Só ADICIONAR
// chaves aqui; nunca editar/remover as seções acima (a landing
// usa o mesmo arquivo).
// ────────────────────────────────────────────────────────────
export const dash = {
  // Superfícies
  sidebar: "#0B0C0F",
  sidebarHover: "#18181B",
  heroFrom: "#1A1B1F",
  heroTo: "#0B0C0F",
  heroGradient: "linear-gradient(155deg,#1A1B1F 0%,#0B0C0F 100%)",
  shellBg: "#E7E7ED",
  card: "#FFFFFF",
  surface: "#FAFAFA",
  // Bordas
  border: "rgba(0,0,0,0.07)",
  borderSoft: "rgba(0,0,0,0.05)",
  // Texto
  ink: "#0A0A0A",
  text: "#374151",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  textFaint: "#B0B4BB",
  // Paleta funcional (indicadores de status — não trocar semântica)
  green: "#22C55E",
  greenText: "#16A34A",
  blue: "#3B82F6",
  blueText: "#2563EB",
  sky: "#0EA5E9",
  amber: "#F59E0B",
  amberText: "#D97706",
  red: "#EF4444",
  redText: "#DC2626",
  purple: "#7C3AED",
  purpleText: "#6D28D9",
  whatsapp: "#25D366",
} as const;

export const dashRadius = {
  shell: 28,
  card: 20,
} as const;

export const dashShadow = {
  shell: "0 30px 80px rgba(15,15,25,0.16)",
  card: "0 1px 3px rgba(15,23,42,0.04)",
  cardHover: "0 16px 40px rgba(0,0,0,0.08)",
  heroHover: "0 20px 48px rgba(0,0,0,0.38)",
  pop: "0 20px 50px rgba(15,23,42,0.18)",
} as const;

// Estilo base de card do dashboard — mesmo acabamento do /painel.
export const dashCard = {
  background: dash.card,
  border: `1px solid ${dash.border}`,
  borderRadius: dashRadius.card,
  boxShadow: dashShadow.card,
} as const;

// ────────────────────────────────────────────────────────────
// Refino premium 2026-07-14 — APENAS ADIÇÕES (não editar acima).
// Acabamento de tabela/card usado em /crm, /leads, /painel.
// ────────────────────────────────────────────────────────────
export const dashPremium = {
  // Sombra em camadas (difusa + de contato) — padrão Stripe/Linear
  cardShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.035)",
  cardBorder: "rgba(15,23,42,0.06)",
  tableHeadBg: "#FAFAFB",
  tableHeadText: "#94A3B8",
  rowBorder: "rgba(15,23,42,0.045)",
  rowHover: "#FAFAFB",
  hairline: "rgba(15,23,42,0.06)",
  // Segmented control (filtros)
  segBg: "rgba(15,23,42,0.045)",
  segActiveShadow: "0 1px 2px rgba(15,23,42,0.10), 0 0 0 1px rgba(15,23,42,0.04)",
} as const;
