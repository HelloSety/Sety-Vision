"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";

const SERVICES = [
  { emoji: "🌐", title: "Sites Profissionais", line: "Shopify, Nuvemshop e Institucional." },
  { emoji: "🤖", title: "Automação WhatsApp", line: "IA, CRM e atendimento automático." },
  { emoji: "📈", title: "Tráfego Pago", line: "Meta Ads e Google Ads focados em geração de clientes." },
];

export function ServicosTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
      <div className="container-1280">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="svc-teaser-grid">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: EASE }}
              className="card-base"
              style={{ padding: "32px 28px" }}
            >
              <div style={{ fontSize: 30, marginBottom: 16 }}>{s.emoji}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: "#64748B" }}>{s.line}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{ textAlign: "center", marginTop: 32 }}
        >
          <a href="/servicos" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "#7C3AED", textDecoration: "none" }}>
            Ver todos os serviços <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .svc-teaser-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
