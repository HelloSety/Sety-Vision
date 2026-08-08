"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import { dash, dashRadius, dashShadow, dashPremium } from "@/lib/tokens";
import { Spark } from "./Spark";

export type KPICardProps = {
  label: string;
  Icon: React.ElementType;
  to: number;
  fmt: (v: number) => string;
  color: string;
  delay?: number;
  /** Texto único abaixo do valor, enquadrado como benefício (modo demonstração) — substitui badge/spark. */
  benefit?: string;
  /** Legenda curta abaixo do badge de variação (painel real, ex: "vs ontem"). */
  sub?: string;
  change?: string;
  up?: boolean;
  /** Sparkline de tendência (painel real). */
  spark?: number[];
  urgent?: boolean;
  /** Card sólido preto (destaque), pra quebrar o grid 100% branco — usar em no máx. 1 card por seção. */
  hero?: boolean;
};

export function KPICard({ label, Icon, to, fmt, color, delay = 0, benefit, sub, change, up, spark, urgent, hero }: KPICardProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = Date.now(); const dur = 1300;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: EASE, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: hero ? dashShadow.heroHover : `${dashShadow.cardHover}, 0 0 0 1px ${color}28` } as never}
      style={{
        background: hero ? dash.heroGradient : dash.card,
        border: hero ? "1px solid rgba(255,255,255,0.08)" : `1px solid ${dashPremium.cardBorder}`,
        borderRadius: dashRadius.card, padding: 18, position: "relative", overflow: "hidden",
        boxShadow: hero ? "0 12px 32px rgba(10,10,12,0.22), inset 0 1px 0 rgba(255,255,255,0.07)" : dashPremium.cardShadow,
      }}
    >
      {!hero && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}8C, ${color}00 72%)`, borderRadius: `${dashRadius.card}px ${dashRadius.card}px 0 0` }} />}
      {spark && <div aria-hidden style={{ position: "absolute", bottom: -12, right: -12, width: 56, height: 56, borderRadius: "50%", background: hero ? "#FFFFFF" : color, opacity: hero ? 0.06 : 0.07, filter: "blur(18px)" }} />}
      {hero && <div aria-hidden style={{ position: "absolute", top: -30, right: -20, width: 130, height: 130, borderRadius: "50%", background: color, opacity: 0.22, filter: "blur(42px)" }} />}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: hero ? "rgba(255,255,255,0.55)" : "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: hero ? "rgba(255,255,255,0.1)" : `linear-gradient(135deg, ${color}1F, ${color}0A)`, border: hero ? "1px solid rgba(255,255,255,0.14)" : `1px solid ${color}2E`, boxShadow: hero ? undefined : `inset 0 1px 0 rgba(255,255,255,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={13.5} color={hero ? "#FFFFFF" : color} strokeWidth={2.1} />
        </div>
      </div>

      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1.2px", lineHeight: 1, color: hero ? "#FFFFFF" : dash.ink, marginBottom: 10, fontVariantNumeric: "tabular-nums" }}>
        {fmt(count)}
      </div>

      {benefit !== undefined ? (
        <div style={{ fontSize: 11.5, color: hero ? "rgba(255,255,255,0.6)" : dash.textSub, lineHeight: 1.4 }}>{benefit}</div>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {urgent ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 700, padding: "2.5px 8px", borderRadius: 7, background: hero ? "rgba(255,255,255,0.12)" : "rgba(239,68,68,0.09)", border: hero ? "none" : "1px solid rgba(239,68,68,0.18)", color: hero ? "#F87171" : "#B91C1C" }}>
                ● ação necessária
              </span>
            ) : change ? (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                fontSize: 10.5, fontWeight: 700, padding: "2.5px 8px", borderRadius: 7,
                background: hero ? "rgba(255,255,255,0.12)" : up ? "rgba(34,197,94,0.09)" : "rgba(239,68,68,0.09)",
                border: hero ? "none" : up ? "1px solid rgba(34,197,94,0.18)" : "1px solid rgba(239,68,68,0.18)",
                color: hero ? (up ? "#4ADE80" : "#F87171") : up ? "#15803D" : "#B91C1C",
              }}>{up ? "▲" : "▼"} {change}</span>
            ) : null}
            {sub && <span style={{ fontSize: 10, color: hero ? "rgba(255,255,255,0.4)" : dash.textFaint }}>{sub}</span>}
          </div>
          {spark && <Spark data={spark} color={hero ? "#FFFFFF" : color} id={label} />}
        </div>
      )}
    </motion.div>
  );
}
