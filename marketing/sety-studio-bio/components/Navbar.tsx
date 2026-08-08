"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10"
    >
      <span className="font-display text-[13px] font-medium tracking-[0.35em] text-white">
        SETY
      </span>
      <a
        href="#contato"
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-text-soft backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Disponível para novos projetos
      </a>
    </motion.header>
  );
}
