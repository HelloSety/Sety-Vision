"use client";

import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

/* Faixa editorial de métricas — SÓ capacidade real do produto
   (claims que já existem no site: resposta em segundos, 24/7,
   CRM registra tudo, go-live em 15 dias). Zero tração fabricada. */

type Stat = {
  value: number;
  format: (n: number) => string;
  label: string;
};

const STATS: Stat[] = [
  { value: 5,   format: (n) => `${n}s`,    label: "pra primeira resposta ao lead" },
  { value: 24,  format: (n) => `${n}/7`,   label: "IA no ar — sem pausa, sem feriado" },
  { value: 100, format: (n) => `${n}%`,    label: "das conversas registradas no CRM" },
  { value: 15,  format: (n) => `${n} dias`, label: "pra estrutura completa no ar" },
];

function StatItem({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, stat.value, {
      duration: 1.6,
      delay: 0.15 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 + index * 0.1, ease: EASE }}
      className="mtr-item"
      style={{ textAlign: "center", padding: "8px 20px" }}>
      <div style={{
        fontSize: "clamp(40px, 4.6vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em",
        lineHeight: 1, color: "#0B0B10", fontVariantNumeric: "tabular-nums",
      }}>
        {stat.format(n)}
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#71717A", marginTop: 12, lineHeight: 1.45, maxWidth: 200, marginLeft: "auto", marginRight: "auto" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <section ref={ref} style={{ background: "#FFFFFF", borderTop: "1px solid #F0F0F2", padding: "84px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="mtr-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", alignItems: "start" }}>
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        .mtr-item { position: relative; }
        .mtr-item + .mtr-item::before {
          content: "";
          position: absolute;
          left: 0; top: 12%; bottom: 12%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(15,23,42,0.10), transparent);
        }
        @media (max-width: 860px) {
          .mtr-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 44px; }
          .mtr-item:nth-child(3)::before { display: none; }
        }
        @media (max-width: 480px) {
          .mtr-grid { grid-template-columns: 1fr !important; row-gap: 40px; }
          .mtr-item + .mtr-item::before { display: none; }
        }
      `}</style>
    </section>
  );
}
