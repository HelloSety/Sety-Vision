"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { colors, motion as M } from "@/lib/tokens";

/* ── Marquee rows ────────────────────────────────────────────── */
interface Logo { name: string; slug: string; hex: string }

function LogoItem({ logo }: { logo: Logo }) {
  const [hovered, setHovered] = useState(false);
  const sz = 48;
  const ico = Math.round(sz * 0.52);
  const br = Math.round(sz * 0.24);
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 8, cursor: "default", userSelect: "none", flexShrink: 0,
        transition: "transform 0.22s", transform: hovered ? "scale(1.1)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: sz, height: sz, borderRadius: br,
        background: `#${logo.hex}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.16)" : "0 2px 8px rgba(0,0,0,0.10)",
        transition: "box-shadow 0.22s",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/integrations/${logo.slug}.svg`}
          alt={logo.name} width={ico} height={ico}
          style={{ width: ico, height: ico, filter: "brightness(0) invert(1)" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
        />
      </div>
      <span style={{ fontSize: 10, color: colors.textMuted, whiteSpace: "nowrap", fontWeight: 500, lineHeight: 1 }}>
        {logo.name}
      </span>
    </div>
  );
}

const ROW1: Logo[] = [
  { name: "WhatsApp",   slug: "whatsapp",  hex: "25D366" },
  { name: "OpenAI",     slug: "openai",    hex: "10A37F" },
  { name: "Claude",     slug: "anthropic", hex: "D97757" },
  { name: "Instagram",  slug: "instagram", hex: "E4405F" },
  { name: "Gmail",      slug: "gmail",     hex: "EA4335" },
  { name: "HubSpot",    slug: "hubspot",   hex: "FF7A59" },
  { name: "Meta Ads",   slug: "meta",      hex: "0467DF" },
  { name: "Google Ads", slug: "googleads", hex: "4285F4" },
];

const ROW2: Logo[] = [
  { name: "N8N",          slug: "n8n",         hex: "EA4B71" },
  { name: "Zapier",       slug: "zapier",      hex: "FF4A00" },
  { name: "Stripe",       slug: "stripe",      hex: "635BFF" },
  { name: "Mercado Pago", slug: "mercadopago", hex: "009EE3" },
  { name: "Shopify",      slug: "shopify",     hex: "96BF48" },
  { name: "WooCommerce",  slug: "woocommerce", hex: "96588A" },
  { name: "Calendly",     slug: "calendly",    hex: "006BFF" },
  { name: "Intercom",     slug: "intercom",    hex: "1F8DED" },
];

function MarqueeRow({ items, direction, speed }: { items: Logo[]; direction: "left" | "right"; speed: number }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%", height: 88, display: "flex", alignItems: "center" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: "none",
        background: `linear-gradient(to right, ${colors.background}, transparent)`,
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: "none",
        background: `linear-gradient(to left, ${colors.background}, transparent)`,
      }} />
      <div style={{
        display: "flex", gap: 56, alignItems: "center",
        animation: `intg-marquee ${speed}s linear infinite`,
        animationDirection: direction === "right" ? "reverse" : "normal",
        willChange: "transform",
      }}>
        {tripled.map((logo, i) => <LogoItem key={`${logo.slug}-${i}`} logo={logo} />)}
      </div>
    </div>
  );
}

const CONTAINER = { maxWidth: 1280, margin: "0 auto", padding: "0 32px", width: "100%" } as const;

/* ── Integracoes ─────────────────────────────────────────────── */
export function Integracoes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="integracoes" ref={ref} style={{ background: colors.background, paddingTop: 112, paddingBottom: 0 }}>
      <style>{`
        @keyframes intg-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (max-width: 640px) {
          .intg-container { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <div className="intg-container" style={CONTAINER}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: M.ease }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <h2 style={{
            fontSize: "clamp(30px, 4.2vw, 52px)", fontWeight: 900,
            letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 16, color: colors.text,
          }}>
            Conecte com as ferramentas
            <br />
            <span style={{ color: colors.textMuted }}>que sua empresa já usa.</span>
          </h2>
        </motion.div>
      </div>

      {/* Triple marquee — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 80 }}
      >
        <MarqueeRow items={ROW1} direction="left"  speed={38} />
        <MarqueeRow items={ROW2} direction="right" speed={44} />
      </motion.div>
    </section>
  );
}
