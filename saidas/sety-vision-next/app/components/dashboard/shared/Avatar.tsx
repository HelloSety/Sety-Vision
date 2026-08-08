"use client";

/**
 * Avatar premium do dashboard — duotone suave derivado por hash do id/nome
 * (em vez de círculo de cor sólida com inicial branca). Anel interno de 1px
 * na cor do texto + dot de status opcional com anel branco.
 * Aparece centenas de vezes na tela — o acabamento aqui carrega o produto.
 */

const PALETTES = [
  { from: "#EDE9FE", to: "#DDD6FE", text: "#6D28D9" }, // violet
  { from: "#DBEAFE", to: "#BFDBFE", text: "#1D4ED8" }, // blue
  { from: "#CCFBF1", to: "#99F6E4", text: "#0F766E" }, // teal
  { from: "#FEF3C7", to: "#FDE68A", text: "#B45309" }, // amber
  { from: "#FFE4E6", to: "#FECDD3", text: "#BE123C" }, // rose
  { from: "#E0E7FF", to: "#C7D2FE", text: "#4338CA" }, // indigo
  { from: "#F1F5F9", to: "#E2E8F0", text: "#475569" }, // slate
] as const;

function hashOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function Avatar({
  name,
  seed,
  size = 36,
  radius,
  hot = false,
  hotColor = "#F59E0B",
}: {
  name: string;
  /** Fonte do hash (id estável). Default: o próprio nome. */
  seed?: string;
  size?: number;
  radius?: number;
  /** Dot de status (lead quente) integrado no canto. */
  hot?: boolean;
  hotColor?: string;
}) {
  const p = PALETTES[hashOf(seed ?? name) % PALETTES.length];
  const r = radius ?? Math.round(size * 0.32);
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  const dotSize = Math.max(9, Math.round(size * 0.28));

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: r,
          background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
          boxShadow: `inset 0 0 0 1px ${p.text}26, inset 0 1px 0 rgba(255,255,255,0.55)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: Math.round(size * 0.38),
          fontWeight: 700,
          color: p.text,
          letterSpacing: "-0.01em",
          userSelect: "none",
        }}
      >
        {initial}
      </div>
      {hot && (
        <span
          style={{
            position: "absolute",
            right: -2,
            bottom: -2,
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: hotColor,
            border: "2px solid #FFFFFF",
            boxShadow: `0 0 6px ${hotColor}66`,
          }}
        />
      )}
    </div>
  );
}
