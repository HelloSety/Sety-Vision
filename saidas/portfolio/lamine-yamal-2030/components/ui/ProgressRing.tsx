"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

export default function ProgressRing({
  value,
  label,
  size = 132,
  stroke = 7,
  color = "#ff5a1f",
}: {
  value: number;
  label: string;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg ref={ref} width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-black text-2xl">
          <AnimatedCounter value={value} suffix="%" />
        </div>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">{label}</div>
    </div>
  );
}
