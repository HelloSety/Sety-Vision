"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { EASE } from "@/lib/motion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/Footer";
import { FloatingWhatsApp } from "../components/landing/FloatingWhatsApp";
import { CTA } from "../components/landing/CTA";

function PortfolioCard({ item, inView, i }: { item: PortfolioItem; inView: boolean; i: number }) {
  const Wrapper = item.url ? motion.a : motion.div;
  const wrapperProps = item.url ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...wrapperProps}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
      whileHover={item.url ? { y: -6 } : undefined}
      className="card-base"
      style={{
        display: "block", textDecoration: "none", overflow: "hidden", cursor: item.url ? "pointer" : "default",
      }}
    >
      <div style={{
        height: 260, position: "relative", overflow: "hidden",
        background: item.image ? "#0F172A" : `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
      }}>
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={`Preview do site ${item.name}`} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
              {item.name}
            </span>
          </div>
        )}
        {!item.url && (
          <div style={{
            position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 5,
            padding: "5px 10px", borderRadius: 999, background: "rgba(0,0,0,0.32)", color: "#fff", fontSize: 11, fontWeight: 700,
          }}>
            <Clock size={11} /> Em breve
          </div>
        )}
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
          {item.category}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.5, color: "#64748B", margin: "0 0 16px", minHeight: 42 }}>
          {item.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: item.url ? "#0F172A" : "#CBD5E1" }}>
          Visualizar Projeto {item.url && <ArrowUpRight size={14} />}
        </div>
      </div>
    </Wrapper>
  );
}

export default function PortfolioClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "168px 32px 64px", background: "#FAFAFA", textAlign: "center" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge-pill" style={{ marginBottom: 22 }}>Portfólio</span>
              <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0F172A", margin: "0 0 18px" }}>
                Um site pra cada negócio.
              </h1>
              <p style={{ fontSize: 17, color: "#64748B", maxWidth: 520, margin: "0 auto" }}>
                Projetos completos, com identidade própria — cada um publicado e no ar.
              </p>
            </motion.div>
          </div>
        </section>

        <section ref={ref} className="section-pad" style={{ paddingTop: 32, background: "#FAFAFA" }}>
          <div className="container-1280">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="pf-grid">
              {PORTFOLIO_ITEMS.map((item, i) => <PortfolioCard key={item.id} item={item} inView={inView} i={i} />)}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        @media (max-width: 1024px) { .pf-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .pf-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
