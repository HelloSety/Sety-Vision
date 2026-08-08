"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import {
  LayoutDashboard, Users, MessageCircle, Workflow, Sparkles,
  Wallet, Target, CalendarClock, Zap, Megaphone, Search, ArrowRight,
} from "lucide-react";
import { colors, radius, shadow } from "@/lib/tokens";
import { EASE } from "@/lib/motion";

const MODULES = [
  { icon: LayoutDashboard, title: "Dashboard",   desc: "Todos os indicadores em um só lugar.",          color: "#7C3AED" },
  { icon: Users,           title: "CRM",          desc: "Organize todas as oportunidades.",               color: "#3B82F6" },
  { icon: MessageCircle,   title: "WhatsApp IA",  desc: "Atenda automaticamente 24 horas.",               color: "#22C55E" },
  { icon: Target,          title: "Leads",        desc: "Nunca perca um potencial cliente.",              color: "#EF4444" },
  { icon: Workflow,        title: "Pipeline",     desc: "Acompanhe todas as negociações.",                color: "#F59E0B" },
  { icon: CalendarClock,   title: "Agenda",       desc: "Gerencie compromissos automaticamente.",         color: "#EC4899" },
  { icon: Zap,             title: "Automações",   desc: "Fluxos inteligentes funcionando sozinhos.",      color: "#A78BFA" },
  { icon: Wallet,          title: "Financeiro",   desc: "Receita e pedidos em tempo real.",               color: "#16A34A" },
  { icon: Megaphone,       title: "Meta Ads",     desc: "Campanhas visíveis no mesmo painel.",            color: "#3B82F6" },
  { icon: Search,          title: "Google Ads",   desc: "Métricas de busca sem trocar de tela.",          color: "#F59E0B" },
  { icon: Sparkles,        title: "IA",           desc: "Aprende e sugere a próxima ação sozinha.",       color: "#7C3AED" },
];

export function DashboardShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -3, y: px * 4 });
  };

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
      {/* Glow de fundo */}
      <div aria-hidden style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "60%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />

      <div className="container-1280" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}
        >
          <span className="badge-pill" style={{ marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.green }} />
            A plataforma por dentro
          </span>
          <h2 style={{ fontSize: "clamp(30px, 4.2vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: "#0F172A", margin: "0 0 16px" }}>
            Controle toda sua empresa em um único painel.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#64748B" }}>
            Vendas, conversas, leads e receita — atualizados em tempo real, sem planilha e sem sistema solto.
          </p>
        </motion.div>

        {/* Imagem grande do dashboard */}
        <motion.div
          ref={imgRef}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          style={{ position: "relative", maxWidth: 1120, margin: "0 auto", perspective: 1600 }}
        >
          <div aria-hidden style={{
            position: "absolute", inset: -40, borderRadius: 40,
            background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 68%)",
            filter: "blur(50px)", zIndex: 0,
          }} />

          <motion.div
            style={{
              position: "relative", zIndex: 1, y: parallaxY,
              rotateX: tilt.x, rotateY: tilt.y, transformStyle: "preserve-3d",
              borderRadius: 20, overflow: "hidden",
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 40px 100px rgba(15,23,42,0.16), 0 8px 24px rgba(124,58,237,0.10)",
              background: "#fff",
            }}
          >
            {/* Barra de navegador */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#F6F7F9", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dashboard/demo-showcase.webp"
              alt="Dashboard da Sety Vision — visão em tempo real de vendas, conversas e leads"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </motion.div>

          {/* Badge flutuante — status */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", top: -18, right: 24, zIndex: 2,
              display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999,
              background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)", boxShadow: shadow.lg,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.green }} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A" }}>Atualizado em tempo real</span>
          </motion.div>
        </motion.div>

        {/* Grade de módulos */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12,
          maxWidth: 1120, margin: "64px auto 0",
        }} className="dash-modules-grid">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div key={m.title}
                initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: EASE }}
                className="card-base"
                style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: 8 }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${m.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} style={{ color: m.color }} />
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>{m.title}</div>
                <div style={{ fontSize: 12, lineHeight: 1.45, color: "#64748B" }}>{m.desc}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <a href="/plataforma" className="btn-secondary" style={{ padding: "14px 28px", fontSize: 14.5, textDecoration: "none" }}>
            Ver a plataforma completa <ArrowRight size={15} style={{ marginLeft: 2 }} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .dash-modules-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 560px) { .dash-modules-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
