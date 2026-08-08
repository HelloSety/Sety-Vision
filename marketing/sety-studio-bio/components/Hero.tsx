"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingPanel({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay, ease }}
      className={`glass absolute rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="grain relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20 sm:px-10">
      {/* glow de fundo */}
      <div
        className="pointer-events-none absolute -right-[20%] top-[10%] h-[600px] w-[600px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mb-6 inline-block text-[12px] uppercase tracking-[0.3em] text-text-faint"
          >
            Branding · Sites Premium · Experiências Digitais
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="font-display text-balance text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
          >
            Sety
            <br />
            Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-8 max-w-md text-[17px] leading-relaxed text-text-soft"
          >
            Criamos experiências digitais que fazem empresas parecerem gigantes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#portfolio"
              className="rounded-full bg-white px-7 py-3.5 text-[14px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Ver Portfólio
            </MagneticButton>
            <MagneticButton
              href="#contato"
              className="rounded-full border border-white/12 px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:border-white/25"
            >
              Solicitar Orçamento
            </MagneticButton>
          </motion.div>
        </div>

        {/* composição visual abstrata — sem foto real disponível, então em vez
            de placeholder genérico, monta uma cena de "produto digital" com
            painéis de vidro flutuantes (mockup de site/app/dashboard) */}
        <div className="relative hidden h-[520px] lg:block">
          <FloatingPanel className="left-[8%] top-[6%] h-56 w-72 p-5" delay={0.5}>
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-white/15" />
                <div className="h-2 w-1/2 rounded-full bg-white/10" />
              </div>
              <div className="h-16 rounded-lg bg-gradient-to-br from-accent/25 to-transparent" />
            </div>
          </FloatingPanel>

          <FloatingPanel className="right-[4%] top-[22%] h-64 w-52 p-5" delay={0.7}>
            <div className="flex h-full flex-col gap-3">
              <div className="h-8 w-8 rounded-full bg-accent/30" />
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
              <div className="mt-auto grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-md bg-white/[0.06]" />
                <div className="aspect-square rounded-md bg-white/[0.06]" />
                <div className="aspect-square rounded-md bg-accent/20" />
              </div>
            </div>
          </FloatingPanel>

          <FloatingPanel className="bottom-[8%] left-[20%] h-40 w-64 p-5" delay={0.9}>
            <div className="flex h-full flex-col justify-between">
              <div className="text-[11px] uppercase tracking-[0.2em] text-text-faint">Performance</div>
              <div className="flex items-end gap-1.5">
                {[40, 65, 45, 80, 60, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-sm bg-gradient-to-t from-accent/40 to-accent/10"
                    style={{ height: `${h * 0.5}px` }}
                  />
                ))}
              </div>
            </div>
          </FloatingPanel>

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)" }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-faint">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
