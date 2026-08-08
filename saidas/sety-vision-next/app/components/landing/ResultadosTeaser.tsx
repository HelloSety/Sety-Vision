"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";

function useCountUp(to: number, inView: boolean, dur = 1400) {
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

const STATS = [
  { to: 500, prefix: "+", label: "Projetos Entregues" },
  { to: 100, prefix: "+", label: "Empresas Atendidas" },
  { to: 7,   prefix: "+", label: "Anos de Experiência" },
];

function StatTile({ s, inView, i }: { s: typeof STATS[number]; inView: boolean; i: number }) {
  const v = useCountUp(s.to, inView, 1300 + i * 150);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: EASE }}
      style={{ padding: "8px 4px" }}
    >
      <div style={{ fontSize: "clamp(40px,6vw,64px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>
        {s.prefix}{v}
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8, lineHeight: 1.4 }}>{s.label}</div>
    </motion.div>
  );
}

export function ResultadosTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "#0F0A1F", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "80%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />

      <div className="container-1280" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#fff", margin: "0 0 48px" }}>
            Resultados Reais
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 760, margin: "0 auto 44px" }} className="res-teaser-grid">
          {STATS.map((s, i) => <StatTile key={s.label} s={s} inView={inView} i={i} />)}
        </div>

        <motion.a
          href="/portfolio"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            background: "#fff", color: "#0F172A", padding: "14px 28px", borderRadius: 999, fontSize: 14.5, fontWeight: 700,
          }}
        >
          Ver Portfólio <ArrowRight size={15} />
        </motion.a>
      </div>

      <style>{`
        @media (max-width: 700px) { .res-teaser-grid { grid-template-columns: repeat(1, 1fr) !important; } }
      `}</style>
    </section>
  );
}
