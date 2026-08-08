"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, X, Check, ArrowDown, ChevronRight, ChevronDown, MessageCircle, MapPin } from "lucide-react";
import { colors, radius, shadow } from "@/lib/tokens";
import { EASE } from "@/lib/motion";
import { openWhatsApp } from "@/lib/whatsapp";
import { Testimonials } from "@/app/components/landing/Testimonials";
import { Pricing } from "@/app/components/landing/Pricing";
import { FAQ } from "@/app/components/landing/FAQ";
import { CTA } from "@/app/components/landing/CTA";
import { Footer } from "@/app/components/landing/Footer";
import { FloatingWhatsApp } from "@/app/components/landing/FloatingWhatsApp";

export type NichePair = { problem: string; solution: string };
export type NicheChatLine = { role: "ai" | "user"; text: string };

export type NicheConfig = {
  badgeLabel: string;
  headlineTop: string;
  headlineHighlight: string;
  subheadline: string;
  ctaMessage: string;
  ctaText: string;
  trustBadges: string[];
  doresTitle: string;
  doresPairs: NichePair[];
  exemploTitle: string;
  exemploConversa: NicheChatLine[];
  /** Foto real do nicho, exibida em destaque logo abaixo do hero. */
  heroImage?: string;
  heroImageAlt?: string;
  /** Seção opcional de presença local com mapa embutido (Google Maps, sem API key). */
  localTitle?: string;
  localSubtitle?: string;
  localBullets?: string[];
  mapQuery?: string;
};

/* ── Header simples — sem âncoras de seção, foco 100% em conversão ── */
function NicheHeader({ ctaMessage }: { ctaMessage: string }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, height: 64,
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" aria-label="Sety Vision" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: colors.purple, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.3px", color: colors.text }}>Sety Vision</span>
        </a>

        <motion.a href={openWhatsApp(ctaMessage)} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 5,
          background: colors.purple, color: colors.white,
          padding: "8px 16px", borderRadius: radius.full,
          fontSize: 12.5, fontWeight: 700, textDecoration: "none",
          boxShadow: shadow.purple,
        }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        >
          Diagnóstico grátis <ChevronRight size={11} />
        </motion.a>
      </div>
    </header>
  );
}

/* ── Hero — headline de dor específica do nicho ── */
function NicheHero({ config }: { config: NicheConfig }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "88px 24px 72px", background: "#FAFAFA" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "70%", height: "70%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 26,
            padding: "6px 14px", borderRadius: radius.full,
            background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)",
          }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.purple }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: colors.purpleDark }}>{config.badgeLabel}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: "#0F172A", margin: "0 0 22px" }}>
          {config.headlineTop}{" "}
          <span style={{ color: colors.purple }}>{config.headlineHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ fontSize: 17, lineHeight: 1.6, color: "#64748B", maxWidth: 560, margin: "0 auto 36px" }}>
          {config.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
          <motion.a href={openWhatsApp(config.ctaMessage)} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.purple, color: "#fff", padding: "16px 30px", borderRadius: radius.full, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 12px 32px rgba(124,58,237,0.28)" }}
            whileHover={{ scale: 1.03 } as never}
            whileTap={{ scale: 0.97 }}>
            {config.ctaText}
            <ArrowRight size={15} />
          </motion.a>
          <a href="#planos"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0F172A", padding: "16px 26px", borderRadius: radius.full, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(15,23,42,0.12)" }}>
            Ver planos
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap", marginBottom: 44 }}>
          {config.trustBadges.map((label) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 500, color: "#64748B" }}>
              <span style={{ color: "#22C55E", fontWeight: 800 }}>✔</span> {label}
            </span>
          ))}
        </motion.div>

        {config.heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            style={{
              maxWidth: 920, margin: "0 auto", borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(15,23,42,0.08)", boxShadow: shadow.xl, aspectRatio: "16/7",
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={config.heroImage} alt={config.heroImageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ── Dores — problema → solução, específico do nicho ── */
function NicheDores({ title, pairs }: { title: string; pairs: NichePair[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-16">
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0F172A", maxWidth: 720, margin: "0 auto" }}>
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pairs.map((p, i) => (
            <motion.div key={p.problem}
              initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              style={{ borderRadius: 24, padding: "32px 28px", background: "#FAFAFA", border: "1px solid rgba(15,23,42,0.06)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <X size={15} color="#EF4444" />
                </div>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: "#64748B", lineHeight: 1.4, marginTop: 4 }}>{p.problem}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <ArrowDown size={16} color="#CBD5E1" />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(124,58,237,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={15} color={colors.purple} />
                </div>
                <p style={{ fontSize: 16.5, fontWeight: 700, color: "#0F172A", lineHeight: 1.4, marginTop: 4 }}>{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Exemplo de conversa — prova viva, clicável (expande a conversa completa) ── */
function NicheExemplo({ title, conversa, ctaMessage }: { title: string; conversa: NicheChatLine[]; ctaMessage: string }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const PREVIEW_COUNT = 3;
  const visible = expanded ? conversa : conversa.slice(0, PREVIEW_COUNT);
  const hasMore = conversa.length > PREVIEW_COUNT;

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FAFAFA", borderTop: "1px solid #ECECEC" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.24)", color: "#16A34A" }}>
            <MessageCircle size={12} /> Exemplo real de atendimento
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0F172A", maxWidth: 640, margin: "0 auto" }}>
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{ maxWidth: 420, margin: "0 auto", borderRadius: 24, overflow: "hidden", background: "#fff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: shadow.lg }}
        >
          <div style={{ background: "#1F2C34", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: colors.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>Sety Vision IA</p>
              <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)", margin: 0 }}>online agora</p>
            </div>
          </div>

          <div style={{ background: "#ECE5DD", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 8, minHeight: 200 }}>
            {visible.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%", padding: "8px 12px", fontSize: 13, lineHeight: 1.45,
                  background: m.role === "user" ? "#D9FDD3" : "#FFFFFF",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)", color: "#111",
                }}>{m.text}</div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "13px 16px", background: "#fff", border: "none", borderTop: "1px solid rgba(0,0,0,0.06)",
                fontSize: 13, fontWeight: 700, color: colors.purple, cursor: "pointer",
              }}
            >
              {expanded ? "Ver menos" : "Ver conversa completa"}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} style={{ display: "flex" }}>
                <ChevronDown size={14} />
              </motion.span>
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ textAlign: "center", marginTop: 32 }}
        >
          <a href={openWhatsApp(ctaMessage)} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px 26px", borderRadius: radius.full, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            <MessageCircle size={16} /> Testar no meu WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Presença local — mapa embutido, reforça confiança regional ── */
function NicheLocalPresence({ title, subtitle, bullets, mapQuery }: { title: string; subtitle: string; bullets: string[]; mapQuery: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=12&output=embed`;

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: colors.purpleDark }}>
              <MapPin size={12} /> Presença local
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.6vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0F172A", marginBottom: 16 }}>
              {title}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#64748B", marginBottom: 24 }}>{subtitle}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {bullets.map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(124,58,237,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={12} color={colors.purple} />
                  </div>
                  <span style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(15,23,42,0.08)", boxShadow: shadow.lg, height: 340 }}
          >
            <iframe
              title="Mapa de área de atendimento"
              src={mapSrc}
              width="100%" height="100%"
              style={{ border: 0, filter: "grayscale(0.15)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function NicheLanding({ config }: { config: NicheConfig }) {
  return (
    <>
      <NicheHeader ctaMessage={config.ctaMessage} />
      <main>
        <NicheHero config={config} />
        <NicheDores title={config.doresTitle} pairs={config.doresPairs} />
        <NicheExemplo title={config.exemploTitle} conversa={config.exemploConversa} ctaMessage={config.ctaMessage} />
        {config.mapQuery && (
          <NicheLocalPresence
            title={config.localTitle ?? "Sua presença local também gera confiança"}
            subtitle={config.localSubtitle ?? "Quem pesquisa no Google já chega decidindo — e a Sety Vision garante que ninguém fica esperando resposta."}
            bullets={config.localBullets ?? []}
            mapQuery={config.mapQuery}
          />
        )}
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
