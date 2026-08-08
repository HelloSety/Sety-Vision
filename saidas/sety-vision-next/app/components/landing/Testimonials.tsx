"use client";

import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";

/* Prints reais de feedback de clientes da Sety Studio — mesma biblioteca
   usada pelo SDR (ver saidas/aurora-ia-crm/src/lib/social-proof-assets.ts).
   Nenhum depoimento é inventado. Copiados para /public/feedback local
   pra não depender do domínio setystudio.com.br, que passou a hospedar
   este próprio site (ver MEMORY/DECISOES/2026-07-06-*-setystudio-dominio.md). */
const FEEDBACKS = [
  "/feedback/feedback-1.jpg",
  "/feedback/feedback-2.jpg",
  "/feedback/feedback-3.jpg",
  "/feedback/feedback-4.jpg",
  "/feedback/feedback-5.jpg",
  "/feedback/feedback-6.jpg",
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-pad" style={{ position: "relative", background: "#FAFAFA", borderTop: "1px solid #ECECEC", overflow: "hidden" }} ref={ref}>
      {/* Glow ambiente atrás do grid */}
      <div aria-hidden style={{
        position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "55%", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        filter: "blur(90px)",
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12" style={{ position: "relative", zIndex: 1 }}>

        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.22)", color: "#16A34A" }}
          >
            <BadgeCheck size={13} /> Prints reais, zero depoimento inventado
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: EASE }}
            style={{ fontSize: "clamp(30px,4.4vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#0A0A0A" }}
          >
            Quem já trabalhou com a gente, fala por si.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, ease: EASE }}
            style={{ fontSize: 15.5, lineHeight: 1.6, color: "#64748B", maxWidth: 480, margin: 0 }}
          >
            Conversas de verdade, direto do WhatsApp de quem contratou.
          </motion.p>
        </div>

        {/* Grid editorial — 3 colunas, coluna central deslocada, glow no hover */}
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, maxWidth: 1080, margin: "0 auto" }}>
          {FEEDBACKS.map((src, i) => (
            <motion.div key={src}
              className={i % 3 === 1 ? "tst-card tst-offset" : "tst-card"}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 + i * 0.08, duration: 0.55, ease: EASE }}
              whileHover={{ y: -8 }}
              style={{
                position: "relative", borderRadius: 24, overflow: "hidden",
                background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 24px 60px rgba(15,23,42,0.08), 0 4px 14px rgba(15,23,42,0.04)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Print real de feedback de cliente da Sety Studio"
                loading="lazy"
                style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: "top", display: "block" }}
              />
              {/* Vinheta sutil na base pro print "assentar" no card */}
              <div aria-hidden style={{
                position: "absolute", left: 0, right: 0, bottom: 0, height: 70, pointerEvents: "none",
                background: "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.10) 100%)",
              }} />
              <div style={{
                position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 4,
                background: "rgba(10,10,10,0.72)", backdropFilter: "blur(6px)",
                padding: "4px 9px", borderRadius: 999,
              }}>
                <BadgeCheck size={11} color="#22C55E" />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>Real</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tst-card { transition: box-shadow 0.35s cubic-bezier(.16,1,.3,1), border-color 0.35s ease; }
        .tst-card:hover {
          box-shadow: 0 32px 80px rgba(15,23,42,0.12), 0 8px 28px rgba(124,58,237,0.16) !important;
          border-color: rgba(124,58,237,0.22) !important;
        }
        @media (min-width: 1025px) { .tst-offset { margin-top: 26px; margin-bottom: -26px; } }
        @media (max-width: 1024px) { .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px)  { .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; } }
      `}</style>
    </section>
  );
}
