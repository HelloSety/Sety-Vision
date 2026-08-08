"use client";

import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef } from "react";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";

/* Pricing — apresentação nível Stripe: muito respiro, plano
   recomendado maior com glow, tipografia dominante nos valores.
   OS NÚMEROS NÃO MUDAM: Start 1.490+297 / Growth 2.490+697 / Scale 4.990+1.497. */

type Plan = {
  id: string;
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  baseline: string | null;
  features: string[];
  featured: boolean;
  cta: string;
  message: string;
};

const PLANS: Plan[] = [
  {
    id: "start",
    name: "Start",
    tagline: "Pra parar de perder lead hoje",
    setup: "R$ 1.490",
    monthly: "297",
    baseline: null,
    features: [
      "IA respondendo no WhatsApp 24h",
      "CRM e dashboard próprios",
      "Agendamento automático",
      "Follow-up automático",
    ],
    featured: false,
    cta: "Começar com o Start",
    message: WA_MSG.start,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Pra atrair e converter todo dia",
    setup: "R$ 2.490",
    monthly: "697",
    baseline: "Tudo do Start, mais",
    features: [
      "Landing page profissional inclusa",
      "Gestão de tráfego pago — Meta + Google",
      "Relatórios de resultado",
      "Integrações com suas ferramentas",
    ],
    featured: true,
    cta: "Quero o Growth",
    message: WA_MSG.growth,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Operação completa, sem limite",
    setup: "R$ 4.990",
    monthly: "1.497",
    baseline: "Tudo do Growth, mais",
    features: [
      "IA personalizada e múltiplos funis",
      "Automações avançadas sob medida",
      "Consultoria estratégica contínua",
      "Otimização mensal de campanhas",
    ],
    featured: false,
    cta: "Quero o Scale",
    message: WA_MSG.scale,
  },
];

function PlanCard({ plan, index, inView }: { plan: Plan; index: number; inView: boolean }) {
  const f = plan.featured;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.09, duration: 0.65, ease: EASE }}
      whileHover={{ y: -6 }}
      className="prc-card"
      style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        borderRadius: 24,
        padding: f ? "40px 36px" : "36px 32px",
        background: "#FFFFFF",
        border: f ? "1px solid transparent" : "1px solid #ECECEE",
        backgroundImage: f
          ? "linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(165deg, #A855F7 0%, #7C3AED 45%, #E9D5FF 100%)"
          : undefined,
        backgroundOrigin: f ? "border-box" : undefined,
        backgroundClip: f ? "padding-box, border-box" : undefined,
        boxShadow: f
          ? "0 40px 100px -20px rgba(124,58,237,0.28), 0 12px 32px rgba(124,58,237,0.08)"
          : "0 2px 10px rgba(15,23,42,0.04)",
        transform: f ? "scale(1.04)" : undefined,
        zIndex: f ? 2 : 1,
      }}>

      {f && (
        <span style={{
          position: "absolute", top: 22, right: 24,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#7C3AED",
        }}>
          Recomendado
        </span>
      )}

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", color: "#0B0B10" }}>{plan.name}</div>
        <div style={{ fontSize: 13.5, color: "#71717A", marginTop: 4 }}>{plan.tagline}</div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#71717A" }}>R$</span>
        <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1, color: "#0B0B10", fontVariantNumeric: "tabular-nums" }}>
          {plan.monthly}
        </span>
        <span style={{ fontSize: 14.5, fontWeight: 500, color: "#71717A" }}>/mês</span>
      </div>
      <div style={{ fontSize: 13, color: "#A1A1AA", marginBottom: 30 }}>
        + implantação única de <b style={{ color: "#52525B", fontWeight: 600 }}>{plan.setup}</b>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02))", marginBottom: 24 }} />

      {plan.baseline && (
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: f ? "#7C3AED" : "#A1A1AA", marginBottom: 14 }}>
          {plan.baseline}
        </div>
      )}

      <ul style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, margin: "0 0 32px", padding: 0, listStyle: "none" }}>
        {plan.features.map((feat) => (
          <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Check size={14} strokeWidth={2.75} style={{ color: f ? "#7C3AED" : "#0B0B10", flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 14, lineHeight: 1.5, color: "#3F3F46" }}>{feat}</span>
          </li>
        ))}
      </ul>

      <motion.a
        href={openWhatsApp(plan.message)} target="_blank" rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "15px 24px", borderRadius: 999, fontSize: 14.5, fontWeight: 600, textDecoration: "none",
          ...(f
            ? { background: "#0B0B10", color: "#FFFFFF", boxShadow: "0 12px 30px rgba(11,11,16,0.22)" }
            : { background: "#FFFFFF", color: "#0B0B10", border: "1px solid rgba(11,11,16,0.14)" }),
        }}
        whileHover={f ? ({ scale: 1.02, y: -1 } as never) : ({ scale: 1.02, y: -1, borderColor: "rgba(11,11,16,0.4)" } as never)}
        whileTap={{ scale: 0.98 }}>
        {plan.cta}
        <ArrowRight size={14} />
      </motion.a>
    </motion.div>
  );
}

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="planos" ref={ref} style={{ position: "relative", background: "#FFFFFF", borderTop: "1px solid #F0F0F2", padding: "130px 24px 120px", overflow: "hidden" }}>
      {/* glow suave atrás do plano central */}
      <div aria-hidden style={{
        position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
        width: 760, height: 520, pointerEvents: "none",
        background: "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.07), transparent 70%)",
        filter: "blur(40px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7C3AED", margin: "0 0 20px" }}>
            Investimento
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            style={{ fontSize: "clamp(34px, 4.8vw, 64px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.03, color: "#0B0B10", margin: "0 0 20px" }}>
            Três formatos.<br />Mesmo padrão de entrega.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
            style={{ fontSize: 16.5, lineHeight: 1.6, color: "#71717A", maxWidth: 480, margin: "0 auto" }}>
            Cada plano soma sobre o anterior. Comece pelo estágio da sua
            operação — e suba quando fizer sentido.
          </motion.p>
        </div>

        <div className="prc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, alignItems: "stretch", maxWidth: 1080, margin: "0 auto" }}>
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", fontSize: 13, color: "#A1A1AA", maxWidth: 620, margin: "44px auto 0", lineHeight: 1.6 }}>
          Implantação: 50% pra iniciar + 50% no go-live. Mensalidade começa no go-live.
          Verba de anúncio (Meta/Google) é sempre à parte, paga direto na plataforma.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 64 }}>
          <p style={{ fontSize: 15, color: "#52525B", margin: 0 }}>Em dúvida sobre qual plano faz sentido pra sua operação?</p>
          <motion.a
            href={openWhatsApp(WA_MSG.especialista)} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "14px 28px", borderRadius: 999, fontSize: 14.5, fontWeight: 600,
              textDecoration: "none", color: "#0B0B10",
              background: "#FFFFFF", border: "1px solid rgba(11,11,16,0.14)",
            }}
            whileHover={{ scale: 1.02, y: -1, borderColor: "#25D366" } as never}
            whileTap={{ scale: 0.98 }}>
            <MessageCircle size={16} style={{ color: "#25D366" }} />
            Falar com um especialista
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .prc-grid { grid-template-columns: 1fr !important; max-width: 460px !important; }
          .prc-card { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
