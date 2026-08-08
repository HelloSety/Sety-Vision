"use client";

/**
 * Score de qualificação — 5 segmentos discretos + número tabular,
 * no lugar da barra fina cinza/verde de admin template.
 */

const tone = (s: number) =>
  s >= 80
    ? { fill: "#16A34A", text: "#15803D" }
    : s >= 50
      ? { fill: "#F59E0B", text: "#B45309" }
      : { fill: "#EF4444", text: "#B91C1C" };

export function ScoreMeter({ score, width = 64 }: { score: number; width?: number }) {
  const t = tone(score);
  const filled = Math.max(0, Math.min(5, Math.round(score / 20)));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 3, width, flexShrink: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i < filled ? t.fill : "rgba(15,23,42,0.08)",
              boxShadow: i < filled ? `0 0 4px ${t.fill}40` : undefined,
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: t.text,
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
          minWidth: 18,
        }}
      >
        {score}
      </span>
    </div>
  );
}
