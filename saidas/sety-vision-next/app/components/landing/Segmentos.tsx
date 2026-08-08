"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { colors } from "@/lib/tokens";

const SEGMENTOS = [
  { emoji: "🏠", title: "Imobiliárias", desc: "Nunca mais perca cliente pra demora — responda e agende visitas na hora.", href: "/imobiliarias" },
  { emoji: "☀️", title: "Energia Solar", desc: "Follow-up automático de longo prazo — do orçamento até a instalação fechada.", href: "/energia-solar" },
  { emoji: "🦷", title: "Clínica Odontológica", desc: "Nunca mais perca paciente por demora — agenda e reativação automáticas.", href: "/clinica-odontologica" },
];

export function Segmentos() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FAFAFA", borderTop: "1px solid #ECECEC" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: colors.purple }}>
            Soluções por segmento
          </div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,52px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#0F172A" }}>
            Feito sob medida pro seu negócio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SEGMENTOS.map((s, i) => (
            <motion.a key={s.href} href={s.href}
              initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              style={{
                borderRadius: 24, padding: "32px 28px", background: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.07)", textDecoration: "none", display: "block",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 32 }}>{s.emoji}</span>
                <ArrowUpRight size={16} color="#9CA3AF" />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "#64748B" }}>{s.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
