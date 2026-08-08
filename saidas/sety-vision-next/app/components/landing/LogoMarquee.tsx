"use client";

/* Trust bar logo após o Hero — carrossel infinito de integrações REAIS.
   Só ferramentas que o produto de fato integra (mesmo conjunto validado
   da vitrine completa em Integracoes.tsx). Nunca fabricar logo de cliente. */

const TRUST_LOGOS: { slug: string; name: string }[] = [
  { slug: "whatsapp",  name: "WhatsApp" },
  { slug: "instagram", name: "Instagram" },
  { slug: "meta",      name: "Meta Ads" },
  { slug: "googleads", name: "Google Ads" },
  { slug: "shopify",   name: "Shopify" },
  { slug: "hubspot",   name: "HubSpot" },
  { slug: "n8n",       name: "N8N" },
];

function Track() {
  return (
    <div className="lm-track" aria-hidden={false}>
      {TRUST_LOGOS.map(({ slug, name }) => (
        <span key={slug} className="lm-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/integrations/${slug}.svg`}
            alt={name}
            width={20} height={20}
            loading="lazy"
            style={{ width: 20, height: 20 }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <span className="lm-name">{name}</span>
        </span>
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        padding: "30px 0",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "center", gap: 36,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          color: "#B0B0B6", flexShrink: 0,
        }}>
          Integra com
        </span>

        <div className="lm-viewport">
          {/* Duas cópias da trilha = loop infinito sem emenda */}
          <Track />
          <Track />
        </div>
      </div>

      <style>{`
        .lm-viewport {
          flex: 1;
          min-width: 0;
          display: flex;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .lm-viewport:hover .lm-track { animation-play-state: paused; }
        .lm-track {
          display: flex;
          align-items: center;
          gap: 48px;
          padding-right: 48px;
          flex-shrink: 0;
          animation: lm-scroll 26s linear infinite;
        }
        .lm-item {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
          opacity: 0.42;
          filter: grayscale(1);
          transition: opacity 0.25s ease, filter 0.25s ease;
        }
        .lm-item:hover { opacity: 1; filter: grayscale(0); }
        .lm-name {
          font-size: 13px;
          font-weight: 600;
          color: #64748B;
          white-space: nowrap;
        }
        @keyframes lm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lm-track { animation: none; }
        }
        @media (max-width: 640px) {
          .lm-name { display: none; }
          .lm-track { gap: 32px; padding-right: 32px; animation-duration: 18s; }
        }
      `}</style>
    </div>
  );
}
