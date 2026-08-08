"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { dash } from "@/lib/tokens";

type EmptyStateProps = {
  Icon: React.ElementType;
  title: string;
  hint?: string;
  action?: { label: string; onClick?: () => void; href?: string };
  /** Cor do glow/ícone (default roxo da marca). */
  color?: string;
  /** Compacto (py menor) pra usar dentro de cards/tabelas. */
  compact?: boolean;
};

export function EmptyState({ Icon, title, hint, action, color = dash.purple, compact }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: compact ? "36px 24px" : "64px 24px", gap: 4,
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 16, marginBottom: 10,
        background: `${color}10`, border: `1px solid ${color}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 0 6px ${color}06`,
      }}>
        <Icon size={22} color={color} strokeWidth={1.8} />
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: dash.ink }}>{title}</div>
      {hint && <div style={{ fontSize: 12, color: dash.textMuted, maxWidth: 340, lineHeight: 1.55 }}>{hint}</div>}
      {action && (
        action.href ? (
          <a href={action.href} style={{
            marginTop: 12, fontSize: 12, fontWeight: 600, color: "#FFFFFF", textDecoration: "none",
            background: dash.purple, padding: "8px 16px", borderRadius: 12,
          }}>{action.label}</a>
        ) : (
          <button onClick={action.onClick} style={{
            marginTop: 12, fontSize: 12, fontWeight: 600, color: "#FFFFFF", cursor: "pointer",
            background: dash.purple, border: "none", padding: "8px 16px", borderRadius: 12,
          }}>{action.label}</button>
        )
      )}
    </motion.div>
  );
}
