"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Sobre() {
  return (
    <section className="relative border-t border-white/6 px-6 py-32 sm:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[0.6fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-[12px] uppercase tracking-[0.3em] text-text-faint">Sobre</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="font-display text-balance text-3xl font-light leading-[1.3] tracking-tight text-white/90 sm:text-4xl"
        >
          A Sety Studio nasceu para provar que{" "}
          <span className="text-white">design de verdade</span> muda a forma como uma
          empresa é percebida. Trabalhamos com marcas que não aceitam o comum — e
          entregamos experiências digitais que{" "}
          <span className="text-white">soam caras, parecem internacionais</span> e
          convertem de verdade.
        </motion.p>
      </div>
    </section>
  );
}
