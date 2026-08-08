"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";

const TILES = [
  { label: "Noir", tag: "01 · Blackout total", from: "from-panel", to: "to-black", span: "lg:col-span-2 lg:row-span-2" },
  { label: "Street", tag: "02 · Energia urbana", from: "from-pink", to: "to-violet", span: "" },
  { label: "Solar", tag: "03 · Contraste ácido", from: "from-lime", to: "to-cyan", span: "" },
  { label: "VOLT Lab", tag: "Próximo drop em produção", from: "from-violet", to: "to-pink", span: "lg:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Colorways" title="Escolha o seu lado" />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-55 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal key={t.label} variant="scale" delay={i * 0.08} className={t.span}>
              <TiltCard className="h-full min-h-55">
                <motion.div
                  data-cursor
                  data-cursor-label="Drop"
                  whileHover="hover"
                  initial="rest"
                  className="group relative h-full min-h-55 overflow-hidden rounded-3xl border border-line"
                >
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute inset-0 bg-linear-to-br ${t.from} ${t.to} opacity-80`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_15%,rgba(255,255,255,0.16),transparent_55%)]" />
                  <div className="noise absolute inset-0" />
                  <motion.div
                    variants={{ rest: { opacity: 0.6, y: 4 }, hover: { opacity: 0.95, y: 0 } }}
                    className="glass absolute inset-x-3 bottom-3 rounded-2xl px-4 py-3"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {t.tag}
                    </div>
                    <span className="font-black text-lg">{t.label}</span>
                  </motion.div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
