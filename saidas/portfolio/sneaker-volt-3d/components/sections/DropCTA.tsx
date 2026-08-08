"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../ui/Reveal";

function useCountdown() {
  const [target] = useState(() => Date.now() + (4 * 24 + 12) * 3600 * 1000);
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setLeft({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}

export default function DropCTA() {
  const { d, h, m, s } = useCountdown();
  const [joined, setJoined] = useState(false);

  const UNITS = [
    { label: "Dias", value: d },
    { label: "Horas", value: h },
    { label: "Min", value: m },
    { label: "Seg", value: s },
  ];

  return (
    <section id="drop" className="relative overflow-hidden bg-ink px-6 py-32 text-center sm:px-10">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[160px]" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-pink">
            // Próximo drop
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-black leading-[0.95] tracking-tight text-5xl sm:text-6xl">
            Entre antes <span className="text-gradient-lime">de todo mundo.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center gap-4 sm:gap-6">
            {UNITS.map((u) => (
              <div key={u.label} className="glass w-18 rounded-2xl py-4 sm:w-24">
                <div className="font-mono text-2xl font-black tabular-nums sm:text-3xl">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mist">
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <AnimatePresence mode="wait">
            {!joined ? (
              <motion.button
                key="cta"
                data-cursor
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setJoined(true)}
                className="group relative overflow-hidden rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.15em]"
              >
                <span className="absolute inset-0 bg-linear-to-r from-pink via-violet to-cyan bg-[length:200%_100%] transition-[background-position] duration-500 group-hover:bg-right" />
                <span className="relative">Entrar na waitlist</span>
              </motion.button>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-lime"
              >
                Você tá dentro da lista.
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
