"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard, Workflow, CalendarClock,
  Zap, Target, BarChart3, Sparkles, ArrowRight,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/Footer";
import { FloatingWhatsApp } from "../components/landing/FloatingWhatsApp";
import { CTA } from "../components/landing/CTA";

const SHOWCASE = [
  { key: "dashboard",  title: "Dashboard",  desc: "Receita, pedidos, conversas e leads — tudo em tempo real, num único lugar.", img: "/dashboard/demo-showcase.webp" },
  { key: "crm",        title: "CRM",        desc: "Cada oportunidade organizada por etapa, do primeiro contato ao fechamento.",  img: "/dashboard/demo-crm.webp" },
  { key: "conversas",  title: "WhatsApp",   desc: "A IA atende, qualifica e agenda — a conversa fica registrada automaticamente.", img: "/dashboard/demo-conversas.webp" },
];

const MODULES = [
  { icon: Workflow,    title: "Pipeline",    desc: "Acompanhe cada negociação até o fechamento." },
  { icon: CalendarClock, title: "Agenda",    desc: "Compromissos organizados e confirmados sozinhos." },
  { icon: Zap,         title: "Automações",  desc: "Fluxos que rodam sem depender de operador." },
  { icon: Target,      title: "Leads",       desc: "Nenhum potencial cliente esquecido na caixa de entrada." },
  { icon: BarChart3,   title: "Relatórios",  desc: "Métricas prontas, sem planilha manual." },
  { icon: Sparkles,    title: "IA",          desc: "Aprende com cada conversa e sugere o próximo passo." },
];

function ShowcaseRow({ s, i, inView }: { s: typeof SHOWCASE[number]; i: number; inView: boolean }) {
  const reverse = i % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.15, duration: 0.6, ease: EASE }}
      style={{
        display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "center",
        direction: reverse ? "rtl" : "ltr", marginBottom: 88,
      }}
      className="plat-row"
    >
      <div style={{ direction: "ltr" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Módulo {String(i + 1).padStart(2, "0")}
        </div>
        <h3 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0F172A", margin: "0 0 14px" }}>
          {s.title}
        </h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#64748B" }}>{s.desc}</p>
      </div>
      <div style={{
        direction: "ltr", borderRadius: 18, overflow: "hidden",
        border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 30px 70px rgba(15,23,42,0.12)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt={`Módulo ${s.title} da plataforma Sety Vision`} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </motion.div>
  );
}

export default function PlataformaClient() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseInView = useInView(showcaseRef, { once: true, margin: "-120px" });
  const modRef = useRef<HTMLDivElement>(null);
  const modInView = useInView(modRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "168px 32px 64px", background: "#FAFAFA", textAlign: "center" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge-pill" style={{ marginBottom: 22 }}>
                <LayoutDashboard size={12} style={{ marginRight: 2 }} /> A plataforma
              </span>
              <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0F172A", margin: "0 0 18px" }}>
                O software que roda
                <br />
                por trás da sua empresa.
              </h1>
              <p style={{ fontSize: 17, color: "#64748B", maxWidth: 540, margin: "0 auto" }}>
                Dashboard, CRM, WhatsApp e IA num só sistema — sem integrar ferramenta solta, sem perder contexto.
              </p>
            </motion.div>
          </div>
        </section>

        <section ref={showcaseRef} className="section-pad" style={{ paddingTop: 24, background: "#FAFAFA" }}>
          <div className="container-1280">
            {SHOWCASE.map((s, i) => <ShowcaseRow key={s.key} s={s} i={i} inView={showcaseInView} />)}
          </div>
        </section>

        <section ref={modRef} className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={modInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", margin: "0 0 12px" }}>
                E tem muito mais por dentro.
              </h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="plat-mod-grid">
              {MODULES.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div key={m.title}
                    initial={{ opacity: 0, y: 20 }} animate={modInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: EASE }}
                    className="card-base"
                    style={{ padding: "28px 26px" }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(124,58,237,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                      <Icon size={18} style={{ color: "#7C3AED" }} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{m.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#64748B" }}>{m.desc}</div>
                  </motion.div>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
              <a href={openWhatsApp(WA_MSG.verDashboard)} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "15px 30px", fontSize: 14.5, textDecoration: "none", display: "inline-flex" }}>
                Ver a plataforma ao vivo <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        @media (max-width: 860px) {
          .plat-row { grid-template-columns: 1fr !important; direction: ltr !important; }
          .plat-mod-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
