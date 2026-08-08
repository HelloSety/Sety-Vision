"use client";

import { dash } from "@/lib/tokens";

/** Bloco shimmer básico — mesma linguagem visual em todas as rotas. */
export function Skeleton({ width = "100%", height = 12, radius = 8, style }: {
  width?: number | string; height?: number | string; radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        width, height, borderRadius: radius, flexShrink: 0,
        background: "linear-gradient(90deg, rgba(15,23,42,0.05) 25%, rgba(15,23,42,0.09) 50%, rgba(15,23,42,0.05) 75%)",
        backgroundSize: "200% 100%",
        animation: "dash-shimmer 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

/** Linhas de skeleton no formato das tabelas do dashboard (avatar + textos + badge). */
export function SkeletonRows({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
          borderBottom: i < rows - 1 ? `1px solid ${dash.borderSoft}` : "none",
          opacity: 1 - i * 0.12,
        }}>
          <Skeleton width={36} height={36} radius={12} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
            <Skeleton width={`${46 - i * 4}%`} height={11} />
            <Skeleton width={`${28 - i * 2}%`} height={9} />
          </div>
          <Skeleton width={72} height={20} radius={20} />
        </div>
      ))}
      <style>{`@keyframes dash-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}
