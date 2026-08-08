"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { X, Check, ArrowDown } from "lucide-react";

const PAIRS = [
  { problem: "Cliente esperando atendimento.", solution: "IA responde em segundos." },
  { problem: "Equipe esquece follow-up.",       solution: "IA recupera automaticamente." },
  { problem: "Leads espalhados.",               solution: "CRM centralizado." },
];

export function Problemas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: "#7C3AED" }}>
            O problema
          </div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,56px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#0F172A" }}>
            Três coisas que custam clientes<br />
            <span style={{ color: "#6B7280" }}>todo santo dia.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAIRS.map((p, i) => (
            <motion.div key={p.problem}
              initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              style={{ borderRadius: 24, padding: "32px 28px", background: "#FAFAFA", border: "1px solid rgba(15,23,42,0.06)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <X size={15} color="#EF4444" />
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#64748B", lineHeight: 1.4, marginTop: 4 }}>{p.problem}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <ArrowDown size={16} color="#CBD5E1" />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(124,58,237,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={15} color="#7C3AED" />
                </div>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", lineHeight: 1.4, marginTop: 4 }}>{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
