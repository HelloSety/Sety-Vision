"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { EASE } from "@/lib/motion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio";

function TeaserCard({ item, inView, i }: { item: PortfolioItem; inView: boolean; i: number }) {
  const Wrapper = item.url ? motion.a : motion.div;
  const wrapperProps = item.url ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...wrapperProps}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 * i, duration: 0.5, ease: EASE }}
      whileHover={item.url ? { y: -6 } : undefined}
      className="card-base"
      style={{ display: "block", textDecoration: "none", overflow: "hidden", cursor: item.url ? "pointer" : "default" }}
    >
      <div style={{
        height: 230, position: "relative", overflow: "hidden",
        background: item.image ? "#0F172A" : `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
      }}>
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={`Preview do site ${item.name}`} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>{item.name}</span>
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
      <div style={{ padding: "16px 18px" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{item.name}</div>
        <div style={{ fontSize: 12.5, color: "#7C3AED", fontWeight: 600, marginBottom: 10 }}>{item.category}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: item.url ? "#0F172A" : "#CBD5E1" }}>
          Ver Projeto {item.url && <ArrowUpRight size={13} />}
        </div>
      </div>
    </Wrapper>
  );
}

export function PortfolioTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const items = PORTFOLIO_ITEMS.slice(0, 6);

  return (
    <section ref={ref} className="section-pad" style={{ background: "#FAFBFC", borderTop: "1px solid #ECECEC" }}>
      <div className="container-1280">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="badge-pill" style={{ marginBottom: 20 }}>Portfólio</span>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0F172A", margin: "0 0 0" }}>
            Como fica o trabalho.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="pf-teaser-grid">
          {items.map((item, i) => <TeaserCard key={item.id} item={item} inView={inView} i={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{ textAlign: "center", marginTop: 36 }}
        >
          <a href="/portfolio" className="btn-primary" style={{ padding: "15px 30px", fontSize: 14.5, textDecoration: "none", display: "inline-flex" }}>
            Ver Portfólio Completo <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .pf-teaser-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .pf-teaser-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
