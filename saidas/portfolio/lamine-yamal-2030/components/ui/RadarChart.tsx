"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Axis {
  label: string;
  value: number;
}

export default function RadarChart({
  axes,
  size = 300,
}: {
  axes: Axis[];
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const center = size / 2;
  const radius = size / 2 - 52;
  const levels = 4;
  const angleStep = (Math.PI * 2) / axes.length;

  const point = (value: number, i: number) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  const dataPath = axes.map((a, i) => point(a.value, i).join(",")).join(" ");

  return (
    <svg ref={ref} width={size} height={size} className="overflow-visible">
      <defs>
        <radialGradient id="radarFill">
          <stop offset="0%" stopColor="#ff5a1f" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#ff2a3d" stopOpacity={0.04} />
        </radialGradient>
      </defs>

      {Array.from({ length: levels }).map((_, li) => {
        const levelRadius = (radius / levels) * (li + 1);
        const pts = axes
          .map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
          })
          .join(" ");
        return (
          <polygon key={li} points={pts} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        );
      })}

      {axes.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        );
      })}

      <motion.polygon
        points={dataPath}
        fill="url(#radarFill)"
        stroke="#ff5a1f"
        strokeWidth={2}
        strokeLinejoin="round"
        style={{ transformOrigin: `${center}px ${center}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      {axes.map((a, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const lx = center + (radius + 30) * Math.cos(angle);
        const ly = center + (radius + 30) * Math.sin(angle);
        return (
          <text
            key={a.label}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9a9aa8"
            fontFamily="var(--font-mono)"
            fontSize={10}
            letterSpacing={1.2}
            className="uppercase"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}
