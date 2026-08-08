"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

const CASE = {
  name: "GreenSeg NRS",
  href: "https://greensegnrs.com.br/",
  img: "/portfolio-greenseg.png",
};

export function Sobre() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9A9AA0", marginBottom: 20 }}>
          Sobre
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          style={{ fontSize: "clamp(30px, 4.6vw, 60px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.12, color: "#0A0A0A", maxWidth: 900, marginBottom: 56 }}>
          Uma empresa de tecnologia dedicada a construir operações{" "}
          <span style={{ color: "#7C3AED" }}>mais inteligentes</span>
          {" "}e{" "}
          <span style={{ color: "#9A9AA0" }}>mais rápidas.</span>
        </motion.h2>

        {/* Case real em destaque */}
        <motion.a href={CASE.href} target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          style={{ borderRadius: 24, overflow: "hidden", position: "relative", border: "1px solid rgba(0,0,0,0.07)", display: "block", textDecoration: "none", marginBottom: 16 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CASE.img} alt={`Site real entregue — ${CASE.name}`} style={{ width: "100%", height: "auto", display: "block" }} />
          <div style={{ position: "absolute", left: 20, bottom: 18, display: "flex", alignItems: "center", gap: 8, background: "rgba(10,10,10,0.72)", backdropFilter: "blur(8px)", padding: "8px 14px", borderRadius: 999 }}>
            <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 600 }}>{CASE.name} — projeto real</span>
            <ArrowUpRight size={13} color="#fff" />
          </div>
        </motion.a>

        {/* Stats */}
        <div className="sobre-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
            style={{ borderRadius: 24, padding: 28, background: "#0A0A0A", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 160 }}>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Atendimento</span>
            <div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>24h</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8 }}>Contínuo, todos os dias da semana.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.38, ease: EASE }}
            style={{ borderRadius: 24, padding: 28, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.16)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 160 }}>
            <span style={{ fontSize: 12.5, color: "#7C3AED", fontWeight: 600 }}>Resposta da IA</span>
            <div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#0A0A0A", letterSpacing: "-0.03em", lineHeight: 1 }}>&lt;4s</div>
              <p style={{ fontSize: 13, color: "#6E6E73", marginTop: 8 }}>Tempo médio até a primeira resposta.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .sobre-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
