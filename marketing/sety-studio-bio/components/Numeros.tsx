"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 100, suffix: "+", label: "Projetos entregues" },
  { value: 50, suffix: "+", label: "Clientes ativos" },
  { value: 4, suffix: " anos", label: "De experiência" },
];

export default function Numeros() {
  return (
    <section className="relative border-t border-white/6 px-6 py-28 sm:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            className="text-center sm:text-left"
          >
            <div className="font-display text-6xl font-medium tracking-tight sm:text-7xl">
              <Counter to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-3 text-[13px] uppercase tracking-[0.2em] text-text-faint">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
