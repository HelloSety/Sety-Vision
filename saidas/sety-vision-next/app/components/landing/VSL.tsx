"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Bot, BadgeCheck, Users, Clock3 } from "lucide-react";
import { EASE } from "@/lib/motion";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";

/* Video Sales Letter — vídeo real do fundador em loop automático, sempre mudo. */

const BADGES = [
  { icon: Bot,        label: "IA Ativa" },
  { icon: BadgeCheck, label: "WhatsApp Oficial" },
  { icon: Users,      label: "CRM Integrado" },
  { icon: Clock3,     label: "Atendimento 24h" },
];

export function VSL({ src = "/videos/vsl.mp4" }: { src?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad" style={{ position: "relative", background: "#FFFFFF", borderTop: "1px solid #ECECEC", overflow: "hidden" }}>
      {/* Glow ambiente atrás do player */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "60%", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {/* Hook */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22,
              padding: "6px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600,
              background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: "#6D28D9",
            }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3AED" }} />
            Assista — 1 minuto
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#0F172A", margin: "0 0 18px" }}>
            Toda empresa diz que atende bem.<br />
            <span style={{ color: "#64748B" }}>Quase nenhuma responde o lead das 22h47.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
            style={{ fontSize: 16.5, lineHeight: 1.6, color: "#64748B", maxWidth: 560, margin: "0 auto" }}>
            Em 1 minuto, o fundador da Sety mostra o que acontece com esse lead — e como ele vira reunião agendada no dia seguinte.
          </motion.p>
        </div>

        {/* Prova social ao redor do player */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <span key={b.label} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "8px 15px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: "#0F172A",
                background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
              }}>
                <Icon size={13} style={{ color: "#7C3AED" }} />
                {b.label}
              </span>
            );
          })}
        </motion.div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          style={{
            position: "relative", borderRadius: 24, overflow: "hidden", background: "#0F0A1F",
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 32px 80px rgba(15,23,42,0.14), 0 8px 24px rgba(124,58,237,0.10), 0 2px 8px rgba(15,23,42,0.06)",
          }}>
          <video
            src={src}
            poster="/videos/vsl-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover", background: "#0F0A1F" }}
          />
        </motion.div>

        {/* CTA logo abaixo do player */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
          <motion.a
            href={openWhatsApp(WA_MSG.especialista)} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#7C3AED", color: "#fff", padding: "16px 32px", borderRadius: 999,
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 1px 0 0 rgba(255,255,255,0.18) inset, 0 12px 32px rgba(124,58,237,0.28)",
            }}
            whileHover={{ scale: 1.03, backgroundColor: "#8B5CF6" } as never}
            whileTap={{ scale: 0.97 }}>
            Falar com especialista
            <ArrowRight size={15} />
          </motion.a>
          <motion.a
            href="/demo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#0F172A", padding: "16px 26px", borderRadius: 999,
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              border: "1.5px solid rgba(15,23,42,0.12)", boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
            }}
            whileHover={{ scale: 1.03, borderColor: "#7C3AED", color: "#7C3AED" } as never}
            whileTap={{ scale: 0.97 }}>
            Ver demonstração ao vivo
            <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
