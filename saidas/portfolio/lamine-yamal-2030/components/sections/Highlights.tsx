"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const ITEMS = [
  { title: "O Drible", tag: "Skill", from: "from-orange", to: "to-red" },
  { title: "O Gol", tag: "Finishing", from: "from-red", to: "to-blue" },
  { title: "A Assistência", tag: "Vision", from: "from-blue", to: "to-orange" },
];

export default function Highlights() {
  return (
    <section id="highlights" className="relative bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Highlights" title="Momentos que pararam o jogo" />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} variant="scale" delay={i * 0.1}>
              <motion.div
                data-cursor
                data-cursor-label="Play"
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative aspect-4/5 overflow-hidden rounded-3xl border border-line"
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-0 bg-linear-to-br ${item.from} ${item.to} opacity-80`}
                />
                <div className="noise absolute inset-0" />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />

                <motion.div
                  variants={{ rest: { scale: 0.6, opacity: 0 }, hover: { scale: 1, opacity: 1 } }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {item.tag}
                  </div>
                  <div className="mt-1 font-black text-2xl">{item.title}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
