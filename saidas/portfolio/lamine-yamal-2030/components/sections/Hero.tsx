"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";

const PARTICLES = Array.from({ length: 22 }).map((_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.7,
  duration: 6 + (i % 5),
}));

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const bgX = useTransform(sx, (v) => v * 0.015);
  const bgY = useTransform(sy, (v) => v * 0.015);
  const midX = useTransform(sx, (v) => v * -0.03);
  const midY = useTransform(sy, (v) => v * -0.03);
  const fgX = useTransform(sx, (v) => v * 0.04);
  const fgY = useTransform(sy, (v) => v * 0.04);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="noise relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] animate-blob rounded-full bg-orange/30 blur-[120px]" />
        <div
          className="absolute -right-32 top-1/3 h-[460px] w-[460px] animate-blob rounded-full bg-red/25 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[420px] w-[420px] animate-blob rounded-full bg-blue/20 blur-[140px]"
          style={{ animationDelay: "-11s" }}
        />
      </motion.div>

      <div className="grid-overlay absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)]" />

      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute left-1/2 top-[-10%] h-[140%] w-px -translate-x-1/2 rotate-[18deg] bg-linear-to-b from-transparent via-orange/50 to-transparent" />
        <div className="absolute left-1/2 top-[-10%] h-[140%] w-px -translate-x-1/2 rotate-[-14deg] bg-linear-to-b from-transparent via-blue/40 to-transparent" />
      </motion.div>

      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full bg-white/40"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ x: fgX, y: fgY }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist"
        >
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-orange" />
          The future of football · Nº 19
        </motion.span>

        <h1 className="font-black leading-[0.85] tracking-tighter text-[16vw] sm:text-[13vw] lg:text-[9.5vw]">
          <RevealText text="LAMINE" delay={2.45} />
          <br />
          <span className="text-gradient">
            <RevealText text="YAMAL" delay={2.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-8 max-w-xl text-base text-balance text-mist sm:text-lg"
        >
          Velocidade, talento e ousadia redefinindo o que significa ser jovem no futebol de elite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="journey" variant="primary">
            Watch the Journey
          </MagneticButton>
          <MagneticButton href="stats" variant="ghost">
            Explore Stats
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-orange" />
        </span>
      </motion.div>
    </section>
  );
}
