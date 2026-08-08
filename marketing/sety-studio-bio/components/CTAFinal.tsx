"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTAFinal() {
  return (
    <section id="contato" className="relative px-6 py-24 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/8 bg-surface px-8 py-24 text-center sm:px-16"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15] blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />
        <div className="relative">
          <h2 className="font-display text-balance mx-auto max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Vamos criar algo extraordinário juntos.
          </h2>
          <div className="mt-10">
            <MagneticButton
              href="https://wa.me/5500000000000"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Solicitar Projeto
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
