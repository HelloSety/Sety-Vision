"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { BrandLogo } from "../ui/BrandLogo";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";
import { CalButton } from "./CalButton";

const BG = "#050505";
const BORDER = "rgba(255,255,255,0.10)";
const TEXT = "#FFFFFF";
const TEXT_SEC = "#B3B3B3";
const ACCENT = "#2563EB";

const GLASS: CSSProperties = {
  background: "rgba(255,255,255,0.045)",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  border: `1px solid ${BORDER}`,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 12px 32px rgba(0,0,0,0.35)",
};

const STAR_PATH =
  "M32 10L37.29 24.72L52.92 25.2L40.56 34.78L44.93 49.8L32 41L19.07 49.8L23.44 34.78L11.08 25.2L26.71 24.72Z";

function StarMark({ size = 22, color = ACCENT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d={STAR_PATH} fill={color} />
    </svg>
  );
}

function ArrowIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PillButton({ children, variant = "solid", wrap = false }: { children: ReactNode; variant?: "solid" | "outline"; wrap?: boolean }) {
  const solid: CSSProperties = { background: ACCENT, color: "#fff", border: `1px solid ${ACCENT}` };
  const outline: CSSProperties = { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", color: "#fff", border: `1px solid rgba(255,255,255,0.18)` };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: "0.01em",
        padding: "10px 16px",
        borderRadius: 999,
        whiteSpace: wrap ? "normal" : "nowrap",
        lineHeight: 1.3,
        ...(variant === "solid" ? solid : outline),
      }}
    >
      {children}
      <ArrowIcon />
    </span>
  );
}

function Tilt({
  children,
  style,
  href,
  external,
}: {
  children: ReactNode;
  style?: CSSProperties;
  href?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -4, y: px * 4 });
  }
  function handleLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const card = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        position: "relative",
        borderRadius: 24,
        transformStyle: "preserve-3d",
        cursor: "pointer",
        overflow: "hidden",
        minWidth: 0,
        width: "100%",
        boxSizing: "border-box",
        ...GLASS,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{ textDecoration: "none", display: "block", minWidth: 0 }}>
        {card}
      </a>
    );
  }
  return card;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const LINKEDIN_URL = "https://www.linkedin.com/in/david-teles-552301294/?skipRedirect=true";
const INSTAGRAM_URL = "https://www.instagram.com/sety.studio/";
const BEHANCE_URL = "https://www.behance.net/setystudio";

function BigCard({
  title,
  highlight,
  cta,
  href,
  external,
  icon,
}: {
  title: string;
  highlight: string;
  cta: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
}) {
  return (
    <Tilt href={href} external={external} style={{ minHeight: 172 }}>
      <div style={{ padding: "30px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
          }}
        >
          {icon}
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.22, fontWeight: 500, color: TEXT, letterSpacing: "-0.01em" }}>
          {title}
          <br />
          <span style={{ fontWeight: 700, color: ACCENT }}>{highlight}</span>
        </div>
        <div>
          <PillButton variant="solid" wrap>{cta}</PillButton>
        </div>
      </div>
    </Tilt>
  );
}

function FeatureCard({
  eyebrow,
  title,
  highlight,
  cta,
  icon,
  href,
  external,
}: {
  eyebrow: ReactNode;
  title: string;
  highlight: string;
  cta: string;
  icon: ReactNode;
  href?: string;
  external?: boolean;
}) {
  return (
    <Tilt href={href} external={external} style={{ minHeight: 172 }}>
      <div style={{ position: "relative", zIndex: 1, padding: "26px 22px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          {icon}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: TEXT_SEC, textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ fontSize: 18, lineHeight: 1.22, fontWeight: 500, color: TEXT, letterSpacing: "-0.01em" }}>
          {title} <span style={{ fontWeight: 700, color: ACCENT }}>{highlight}</span>
        </div>
        <div>
          <PillButton variant="solid">{cta}</PillButton>
        </div>
      </div>
    </Tilt>
  );
}

/** Mostra a disponibilidade real da agenda (via Cal.com) em vez de escassez fabricada. */
function AgendaEyebrow() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/cal-slots")
      .then((r) => r.json())
      .then((d) => setTotal(typeof d.total === "number" ? d.total : null))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) return <>30 min · sem custo</>;
  if (total <= 6) return <>Agenda concorrida · só {total} horários essa semana</>;
  return <>{total} horários livres essa semana</>;
}

function SocialCard({ brand, label, href }: { brand: string; label: string; href: string }) {
  return (
    <Tilt href={href} external style={{ padding: "18px 8px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BrandLogo brand={brand} size={24} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: TEXT, marginTop: 9 }}>{label}</div>
    </Tilt>
  );
}

export function LinkInBio() {
  return (
    <div style={{ background: BG, minHeight: "100vh", width: "100%", overflowX: "hidden", position: "relative" }}>
      {/* Glow fixo — dá profundidade real ao glass (o vidro precisa de algo colorido pra desfocar) */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 640, height: 420, background: "radial-gradient(closest-side, rgba(37,99,235,0.32), transparent)" }} />
        <div style={{ position: "absolute", top: "38%", left: "-10%", width: 420, height: 420, background: "radial-gradient(closest-side, rgba(124,58,237,0.14), transparent)" }} />
        <div style={{ position: "absolute", top: "68%", right: "-10%", width: 420, height: 420, background: "radial-gradient(closest-side, rgba(37,99,235,0.14), transparent)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", padding: "72px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <StarMark size={28} />
          <span style={{ fontSize: 28, fontWeight: 600, color: TEXT, letterSpacing: "-0.02em" }}>Sety Studio</span>
        </motion.div>

        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }} style={{ fontSize: 15, color: TEXT_SEC, textAlign: "center", margin: 0, letterSpacing: "0.01em", fontWeight: 400 }}>
          Sites Premium · Branding · Experiências Digitais
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={openWhatsApp(WA_MSG.orcamento)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-flex", alignItems: "center", fontSize: 13.5, fontWeight: 600, padding: "12px 22px", borderRadius: 999, background: ACCENT, color: "#fff" }}>
              Solicitar Projeto
            </span>
          </a>
          <Link href="/portfolio" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-flex", alignItems: "center", fontSize: 13.5, fontWeight: 600, padding: "12px 22px", borderRadius: 999, color: "#fff", ...GLASS }}>
              Ver Portfólio
            </span>
          </Link>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.16 }} style={{ marginTop: 18, borderRadius: 999, padding: "9px 20px", fontSize: 13.5, fontWeight: 500, color: TEXT, ...GLASS }}>
          Bem-vindo(a)!
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} style={{ fontSize: 13, color: TEXT_SEC }}>
          Links úteis
        </motion.div>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", padding: "32px 20px 64px", display: "flex", flexDirection: "column", gap: 14, width: "100%", boxSizing: "border-box" }}>
        {/* Prioridade 1 — Orçamento */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <BigCard title="Precisa de um" highlight="site premium?" cta="Solicite seu orçamento" href={openWhatsApp(WA_MSG.orcamento)} external icon="💬" />
        </motion.div>

        {/* Prioridade 2 — Portfólio */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.06 }}>
          <Link href="/portfolio" style={{ textDecoration: "none", display: "block" }}>
            <FeatureCard eyebrow="Projetos entregues" title="Conheça nosso" highlight="portfólio" cta="Ver projetos" icon="🗂️" />
          </Link>
        </motion.div>

        {/* Prioridade 3 — Agenda */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.12 }}>
          <CalButton style={{ display: "block", width: "100%", textAlign: "left" }}>
            <FeatureCard eyebrow={<AgendaEyebrow />} title="Agende uma" highlight="reunião" cta="Escolher horário" icon="📅" />
          </CalButton>
        </motion.div>

        {/* Redes sociais — secundário */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.18 }} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <SocialCard brand="instagram" label="Instagram" href={INSTAGRAM_URL} />
          <SocialCard brand="linkedin" label="LinkedIn" href={LINKEDIN_URL} />
          <SocialCard brand="behance" label="Behance" href={BEHANCE_URL} />
        </motion.div>

        {/* Card final — algo diferente */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.24 }}>
          <BigCard title="Precisa de" highlight="algo diferente?" cta="Vamos criar juntos" href={openWhatsApp(WA_MSG.especialista)} external icon="✨" />
        </motion.div>
      </div>

      <div style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${BORDER}`, padding: "28px 20px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: TEXT_SEC }}>Desenvolvido por</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StarMark size={16} />
          <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Sety Studio</span>
        </div>
      </div>
    </div>
  );
}
