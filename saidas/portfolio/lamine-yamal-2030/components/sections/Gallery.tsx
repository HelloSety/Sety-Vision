"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const TILES = [
  { label: "Camp Nou", span: "lg:col-span-2 lg:row-span-2", from: "from-orange", to: "to-red" },
  { label: "Seleção Espanhola", span: "", from: "from-blue", to: "to-ink" },
  { label: "La Masia", span: "", from: "from-red", to: "to-orange" },
  { label: "Euro 2024", span: "lg:col-span-2", from: "from-ink", to: "to-blue" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="Instantes que marcam época" />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-55 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal key={t.label} variant="scale" delay={i * 0.08} className={t.span}>
              <motion.div
                data-cursor
                data-cursor-label="View"
                whileHover="hover"
                initial="rest"
                className="group relative h-full min-h-55 overflow-hidden rounded-3xl border border-line"
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-0 bg-linear-to-br ${t.from} ${t.to}`}
                />
                <div className="noise absolute inset-0" />
                <motion.div
                  variants={{ rest: { opacity: 0.55, y: 4 }, hover: { opacity: 0.9, y: 0 } }}
                  className="glass absolute inset-x-3 bottom-3 rounded-2xl px-4 py-3"
                >
                  <span className="font-bold text-sm">{t.label}</span>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
