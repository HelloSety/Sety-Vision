"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { Lock, ArrowRight, MessageCircle } from "lucide-react";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";

function useCountUp(to: number, dur = 1400, inView: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, dur]);
  return v;
}

const KPIS = [
  { label: "Leads no mês",       to: 47,  suffix: "",  color: "#7C3AED" },
  { label: "Conversão",          to: 94,  suffix: "%", color: "#22C55E" },
  { label: "Resposta da IA",     to: 4,   suffix: "s", color: "#3B82F6" },
  { label: "Mensagens/dia",      to: 312, suffix: "",  color: "#F59E0B" },
];

const CHART_PTS = "0,58 14,52 28,55 42,40 56,44 70,26 84,30 100,10";

function KpiTile({ k, inView, i }: { k: typeof KPIS[number]; inView: boolean; i: number }) {
  const v = useCountUp(k.to, 1300 + i * 100, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EASE }}
      style={{ padding: "20px 22px", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
    >
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#9A9AA0", marginBottom: 8 }}>{k.label}</div>
      <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.03em", color: "#0A0A0A" }}>
        {v}{k.suffix}
      </div>
      <div style={{ width: 28, height: 3, borderRadius: 2, background: k.color, marginTop: 10 }} />
    </motion.div>
  );
}

export function LiveResults() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resultados" ref={ref} className="section-pad" style={{ background: "#FAFAFA" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-14">
          <h2 style={{ fontSize: "clamp(30px,4.4vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08, color: "#0A0A0A", marginBottom: 16 }}>
            A operação, em tempo real.
          </h2>
          <p style={{ fontSize: 16, color: "#6E6E73", maxWidth: 460, margin: "0 auto" }}>
            Cada mensagem, lead e venda atualizada automaticamente no seu painel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ borderRadius: 24, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.06)" }}
        >
          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="live-kpi-grid">
            {KPIS.map((k, i) => <KpiTile key={k.label} k={k} inView={inView} i={i} />)}
          </div>

          {/* Chart — desfocado, é apenas preview */}
          <div style={{ position: "relative", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "28px 28px 20px" }}>
            <div style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0A0A0A" }}>Receita gerada</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#16A34A" }}>+37% este mês</span>
              </div>
              <svg viewBox="0 0 100 60" width="100%" height="120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lr-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.polyline
                  points={CHART_PTS} fill="none" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                />
                <polygon points={`${CHART_PTS} 100,60 0,60`} fill="url(#lr-grad)" />
              </svg>
            </div>

            {/* Selo de preview */}
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 100%)",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999,
                background: "#0F172A", boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              }}>
                <Lock size={13} color="#fff" />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#fff" }}>Este é apenas um preview da plataforma</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA abaixo do preview */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <motion.a
            href={openWhatsApp(WA_MSG.verDashboard)} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -2 } as never}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
              background: "#7C3AED", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 700,
            }}
          >
            Agendar demonstração completa <ArrowRight size={14} />
          </motion.a>
          <motion.a
            href={openWhatsApp(WA_MSG.especialista)} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -2 } as never}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
              background: "#fff", color: "#0F172A", border: "1px solid rgba(15,23,42,0.12)", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600,
            }}
          >
            <MessageCircle size={14} /> Falar no WhatsApp
          </motion.a>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .live-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
