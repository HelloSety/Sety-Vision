"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, MessageCircle, Megaphone, Check, ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/Footer";
import { FloatingWhatsApp } from "../components/landing/FloatingWhatsApp";
import { CTA } from "../components/landing/CTA";

type ServiceBlock = {
  icon: typeof Globe;
  color: string;
  title: string;
  desc: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
};

const SERVICES: ServiceBlock[] = [
  {
    icon: Globe, color: "#7C3AED", title: "Site",
    desc: "Landing pages, institucionais e e-commerce pensados pra converter, não só pra existir.",
    items: ["Landing Pages", "Institucionais", "E-commerce", "SEO", "Performance", "Conversão"],
    ctaLabel: "Ver exemplo", ctaHref: "/portfolio",
  },
  {
    icon: MessageCircle, color: "#22C55E", title: "WhatsApp IA",
    desc: "Atendimento automático que qualifica, agenda e nunca deixa um lead esperando.",
    items: ["IA", "Atendimento 24h", "CRM", "Agendamentos", "Follow-up", "Dashboard"],
    ctaLabel: "Ver a plataforma", ctaHref: "/plataforma",
  },
  {
    icon: Megaphone, color: "#F59E0B", title: "Tráfego Pago",
    desc: "Campanhas que geram conversa qualificada, com custo controlado e escala previsível.",
    items: ["Meta Ads", "Google Ads", "Remarketing", "Criativos", "Escala", "Relatórios"],
    ctaLabel: "Ver resultados", ctaHref: "/resultados",
  },
];

function ServiceCard({ s, inView, i }: { s: ServiceBlock; inView: boolean; i: number }) {
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: EASE }}
      className="card-base"
      style={{ padding: "40px 36px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <Icon size={22} style={{ color: s.color }} />
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0F172A", margin: "0 0 12px" }}>{s.title}</h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#64748B", margin: "0 0 24px" }}>{s.desc}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
        {s.items.map((it) => (
          <div key={it} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${s.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Check size={10} style={{ color: s.color }} />
            </div>
            <span style={{ fontSize: 13.5, color: "#374151" }}>{it}</span>
          </div>
        ))}
      </div>

      <a href={s.ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: s.color, textDecoration: "none" }}>
        {s.ctaLabel} <ArrowUpRight size={14} />
      </a>
    </motion.div>
  );
}

export default function ServicosClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "168px 32px 64px", background: "#FAFAFA", textAlign: "center" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge-pill" style={{ marginBottom: 22 }}>Serviços</span>
              <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0F172A", margin: "0 0 18px" }}>
                Três frentes. Um resultado.
              </h1>
              <p style={{ fontSize: 17, color: "#64748B", maxWidth: 520, margin: "0 auto" }}>
                Site pra atrair, tráfego pra escalar, IA pra converter — tudo conectado, nada solto.
              </p>
            </motion.div>
          </div>
        </section>

        <section ref={ref} className="section-pad" style={{ paddingTop: 32, background: "#FAFAFA" }}>
          <div className="container-1280">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="svc-grid">
              {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} inView={inView} i={i} />)}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        @media (max-width: 1024px) { .svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
