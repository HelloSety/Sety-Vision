"use client";

import { monoPath } from "@/lib/dashboard/bezier";

export function Spark({ data, color, id }: { data: number[]; color: string; id: string }) {
  const mn = Math.min(...data); const mx = Math.max(...data); const rng = mx - mn || 1;
  const W = 56; const H = 26;
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - 3 - ((v - mn) / rng) * (H - 6),
  ]);
  const line = monoPath(pts);
  return (
    <svg width={W} height={H} style={{ overflow: "visible", flexShrink: 0 }}>
      <defs>
        <linearGradient id={`sp-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${W},${H} L0,${H}Z`} fill={`url(#sp-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.2" fill={color} />
    </svg>
  );
}
