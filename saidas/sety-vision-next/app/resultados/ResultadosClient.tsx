"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp, Users, DollarSign, Eye } from "lucide-react";
import { EASE } from "@/lib/motion";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/Footer";
import { FloatingWhatsApp } from "../components/landing/FloatingWhatsApp";
import { CTA } from "../components/landing/CTA";

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

type Stat = { to: number; prefix?: string; suffix?: string; decimals?: number; label: string; icon: typeof TrendingUp; color: string };

const HERO_STATS: Stat[] = [
  { to: 250, prefix: "+", label: "Conversas geradas em campanhas ativas", icon: Users, color: "#7C3AED" },
  { to: 246, prefix: "R$", decimals: 2, label: "Menor custo por conversa já registrado", icon: TrendingUp, color: "#22C55E" },
  { to: 3000, prefix: "+R$", label: "Faturados por um cliente em 7 dias", icon: DollarSign, color: "#F59E0B" },
  { to: 181, label: "Visitas ao perfil por apenas R$0,21 cada", icon: Eye, color: "#3B82F6" },
];

const CAMPAIGN_STATS: Stat[] = [
  { to: 102, label: "Conversas em uma única campanha", icon: Users, color: "#7C3AED" },
  { to: 42, label: "Conversas em outra campanha", icon: Users, color: "#3B82F6" },
  { to: 39, label: "Conversas qualificadas geradas", icon: Users, color: "#22C55E" },
  { to: 36, label: "Conversas em campanha de teste", icon: Users, color: "#F59E0B" },
  { to: 26, label: "Conversas em campanha menor", icon: Users, color: "#EC4899" },
];

const CASES = [
  { client: "Loja Virtual", metric: "+R$3.000", detail: "faturados em apenas 7 dias após ativar o atendimento automático." },
  { client: "Campanha de Tráfego", metric: "102", detail: "conversas geradas em uma única campanha ativa." },
  { client: "Campanha de Tráfego", metric: "R$2,46", detail: "custo por conversa — o menor já registrado em uma campanha." },
  { client: "Perfil em Crescimento", metric: "181", detail: "visitas ao perfil pagando apenas R$0,21 por visita." },
];

function StatTile({ s, inView, i }: { s: Stat; inView: boolean; i: number }) {
  const v = useCountUp(s.to, inView, 1300 + i * 120);
  const Icon = s.icon;
  const display = s.decimals ? (v / 100).toFixed(s.decimals).replace(".", ",") : v.toLocaleString("pt-BR");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
      className="card-base"
      style={{ padding: "26px 24px" }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${s.color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Icon size={16} style={{ color: s.color }} />
      </div>
      <div style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A" }}>
        {s.prefix}{display}{s.suffix}
      </div>
      <div style={{ fontSize: 13, color: "#64748B", marginTop: 8, lineHeight: 1.45 }}>{s.label}</div>
    </motion.div>
  );
}

function CaseCard({ c, inView, i }: { c: typeof CASES[number]; inView: boolean; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: EASE }}
      style={{
        borderRadius: 24, padding: "36px 32px", background: "#0F0A1F",
        display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220,
        position: "relative", overflow: "hidden",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)", filter: "blur(30px)",
      }} />
      <div style={{ position: "relative", zIndex: 1, fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {c.client}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", margin: "12px 0 10px" }}>
          {c.metric}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: 0 }}>{c.detail}</p>
      </div>
    </motion.div>
  );
}

export default function ResultadosClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const campRef = useRef<HTMLDivElement>(null);
  const campInView = useInView(campRef, { once: true, margin: "-100px" });
  const caseRef = useRef<HTMLDivElement>(null);
  const caseInView = useInView(caseRef, { once: true, margin: "-100px" });
  const dashRef = useRef<HTMLDivElement>(null);
  const dashInView = useInView(dashRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ padding: "168px 32px 80px", background: "#FAFAFA", textAlign: "center" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge-pill" style={{ marginBottom: 22 }}>Resultados reais</span>
              <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08, color: "#0F172A", margin: "0 0 18px" }}>
                Números de verdade,
                <br />
                não promessa.
              </h1>
              <p style={{ fontSize: 17, color: "#64748B", maxWidth: 520, margin: "0 auto" }}>
                O desempenho real das campanhas e automações da Sety Vision, sem print, sem enfeite.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats grid */}
        <section ref={heroRef} className="section-pad" style={{ paddingTop: 0, background: "#FAFAFA" }}>
          <div className="container-1280">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="res-grid-4">
              {HERO_STATS.map((s, i) => <StatTile key={s.label} s={s} inView={heroInView} i={i} />)}
            </div>
          </div>
        </section>

        {/* Campanhas */}
        <section ref={campRef} className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={campInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 44 }}>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", margin: "0 0 12px" }}>
                Campanha após campanha.
              </h2>
              <p style={{ fontSize: 15, color: "#64748B" }}>Volume consistente de conversas, não um resultado isolado.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="res-grid-5">
              {CAMPAIGN_STATS.map((s, i) => <StatTile key={s.label} s={s} inView={campInView} i={i} />)}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section ref={caseRef} className="section-pad" style={{ background: "#FAFAFA", borderTop: "1px solid #ECECEC" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={caseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 44 }}>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", margin: "0 0 12px" }}>
                Cases que sustentam esses números.
              </h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="res-grid-2">
              {CASES.map((c, i) => <CaseCard key={c.client + i} c={c} inView={caseInView} i={i} />)}
            </div>
          </div>
        </section>

        {/* Dashboard novamente */}
        <section ref={dashRef} className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
          <div className="container-1280" style={{ textAlign: "center" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={dashInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", margin: "0 0 12px" }}>
                Os números aparecem automaticamente no seu Dashboard.
              </h2>
              <p style={{ fontSize: 15, color: "#64748B", maxWidth: 460, margin: "0 auto 40px" }}>
                Receita, pedidos, conversas e leads — sem planilha, sem exportar relatório manual.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={dashInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              style={{
                maxWidth: 980, margin: "0 auto", borderRadius: 20, overflow: "hidden",
                border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 40px 100px rgba(15,23,42,0.14)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dashboard/demo-showcase.webp" alt="Dashboard da Sety Vision com métricas em tempo real" style={{ width: "100%", height: "auto", display: "block" }} />
            </motion.div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        @media (max-width: 1024px) { .res-grid-5 { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px)  { .res-grid-4 { grid-template-columns: repeat(2, 1fr) !important; } .res-grid-2 { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px)  { .res-grid-5 { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </>
  );
}
