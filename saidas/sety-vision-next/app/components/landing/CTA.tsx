"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion as M } from "@/lib/tokens";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";

/* CTA final — seção cheia, escura, com o produto real desfocado ao
   fundo, glow e headline gigante. Botão verde = WhatsApp real. */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cn)'/%3E%3C/svg%3E\")";

const BULLETS = ["Sem contrato longo", "Resultado em 15 dias", "Suporte em português"];

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-140px" });

  return (
    <section ref={ref} style={{
      position: "relative", overflow: "hidden", background: "#08080D",
      minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "140px 24px",
    }}>
      {/* produto real, desfocado, ao fundo */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dashboard/demo-showcase.webp"
          alt=""
          style={{
            position: "absolute", left: "50%", top: "56%", transform: "translate(-50%,-50%) rotateX(18deg) scale(1.12)",
            width: "88%", maxWidth: 1200, borderRadius: 24,
            opacity: 0.14, filter: "blur(7px) saturate(0.9)",
            maskImage: "radial-gradient(70% 70% at 50% 40%, black 30%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, black 30%, transparent 78%)",
          }}
        />
        <div style={{
          position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
          width: "90%", height: "80%",
          background: "radial-gradient(48% 52% at 50% 45%, rgba(124,58,237,0.30) 0%, rgba(124,58,237,0.08) 50%, transparent 74%)",
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)",
          width: "70%", height: "60%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37,211,102,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE, opacity: 0.05, mixBlendMode: "overlay" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 920, margin: "0 auto", textAlign: "center" }}>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: M.ease }}
          style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(196,181,253,0.9)", margin: "0 0 26px" }}>
          Diagnóstico gratuito · resposta em minutos
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: M.ease }}
          style={{ fontSize: "clamp(40px, 6.4vw, 88px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.02, margin: "0 0 26px", color: "#FAFAFA" }}>
          Pare de perder venda<br />por demora na resposta.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: M.ease }}
          style={{ fontSize: 17.5, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.6, color: "rgba(255,255,255,0.60)" }}>
          Fale com um especialista, receba o diagnóstico da sua operação
          e veja a IA respondendo pelos seus leads em 15 dias.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: M.ease }}
          className="cta-btns"
          style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
          <motion.a
            href={openWhatsApp(WA_MSG.especialista)} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "19px 42px", borderRadius: 999, fontSize: 16.5, fontWeight: 700, textDecoration: "none",
              background: "#25D366", color: "#052E16",
              boxShadow: "0 1px 0 0 rgba(255,255,255,0.35) inset, 0 20px 56px rgba(37,211,102,0.35)",
            }}
            whileHover={{ scale: 1.03, y: -2 } as never}
            whileTap={{ scale: 0.97 }}>
            <MessageCircle size={18} />
            Chamar no WhatsApp
          </motion.a>
          <motion.a
            href="/demo"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
              padding: "19px 34px", borderRadius: 999, fontSize: 16.5, fontWeight: 600, textDecoration: "none",
              background: "#FFFFFF", color: "#0B0B10",
              boxShadow: "0 16px 44px rgba(255,255,255,0.10)",
            }}
            whileHover={{ scale: 1.03, y: -2 } as never}
            whileTap={{ scale: 0.97 }}>
            Ver demonstração
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.48, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
          {BULLETS.map((item, i) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              {i > 0 && <span aria-hidden>·</span>}
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cta-btns { flex-direction: column; align-items: stretch; }
          .cta-btns a { width: 100%; }
        }
      `}</style>
    </section>
  );
}
