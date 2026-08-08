"use client";

import { motion } from "framer-motion";
import { dash } from "@/lib/tokens";

/**
 * Anel/donut de progresso animado — extraído do GoalWidget do /painel
 * (padrão dos prints de referência do redesign 2026-07-12).
 */
export function ProgressRing({
  pct,
  size = 128,
  strokeWidth = 11,
  from = dash.greenText,
  to = "#4ADE80",
  trackColor = "rgba(0,0,0,0.06)",
  delay = 0.4,
  centerLabel,
  centerSub = "concluído",
  id = "ring",
}: {
  pct: number;
  size?: number;
  strokeWidth?: number;
  from?: string;
  to?: string;
  trackColor?: string;
  delay?: number;
  /** Texto central (default: `{pct}%`). */
  centerLabel?: React.ReactNode;
  centerSub?: string;
  /** id único quando houver mais de um anel na mesma página (gradiente SVG). */
  id?: string;
}) {
  const R = 50;
  const CIRC = 2 * Math.PI * R;
  const gradId = `ringGrad-${id}`;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <motion.circle
          cx="60" cy="60" r={R} fill="none" stroke={`url(#${gradId})`} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: CIRC * (1 - pct / 100) }}
          transition={{ duration: 1.3, ease: "easeOut", delay }}
          style={{ filter: `drop-shadow(0 0 6px ${from}59)` }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size * 0.2, fontWeight: 900, color: dash.ink, letterSpacing: "-1px", lineHeight: 1 }}>
          {centerLabel ?? `${pct}%`}
        </div>
        {centerSub && <div style={{ fontSize: 9.5, color: dash.textMuted, marginTop: 3 }}>{centerSub}</div>}
      </div>
    </div>
  );
}
