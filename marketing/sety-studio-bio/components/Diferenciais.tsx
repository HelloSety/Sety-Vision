"use client";

import { motion } from "framer-motion";
import {
  FiLayout,
  FiFeather,
  FiGrid,
  FiSquare,
  FiZap,
  FiSearch,
  FiFilm,
  FiCompass,
} from "react-icons/fi";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  { icon: FiLayout, label: "Sites Premium" },
  { icon: FiFeather, label: "Branding" },
  { icon: FiSquare, label: "UI Design" },
  { icon: FiGrid, label: "Landing Pages" },
  { icon: FiZap, label: "Performance" },
  { icon: FiSearch, label: "SEO" },
  { icon: FiFilm, label: "Motion" },
  { icon: FiCompass, label: "Experiência Digital" },
];

export default function Diferenciais() {
  return (
    <section id="servicos" className="relative border-t border-white/6 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 max-w-lg"
        >
          <span className="text-[12px] uppercase tracking-[0.3em] text-text-faint">Diferenciais</span>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Tudo o que uma marca de alto nível precisa
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="group flex flex-col gap-4 bg-bg p-7 transition-colors hover:bg-surface"
            >
              <item.icon className="h-5 w-5 text-text-faint transition-colors group-hover:text-accent" />
              <span className="text-[14px] text-text-soft transition-colors group-hover:text-white">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
