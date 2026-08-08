"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useCinematicScroll } from "@/lib/useCinematicScroll";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";

const KatanaScene = dynamic(() => import("../scene/KatanaScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroBlade() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const explodeRef = useRef(0);
  const [phase, setPhase] = useState<"hero" | "blade">("hero");
  const [canvasActive, setCanvasActive] = useState(false);

  const handlePhaseChange = useCallback((p: "hero" | "blade") => setPhase(p), []);
  useCinematicScroll(containerRef, progressRef, explodeRef, handlePhaseChange);
  useCanvasVisibility(containerRef, setCanvasActive);
  useExitBlur(progressRef, canvasWrapRef);

  return (
    <section id="hero" ref={containerRef} className="relative h-[318vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={canvasWrapRef}
          className="absolute inset-0"
          data-cursor
          data-cursor-label={phase === "hero" ? "Desembainhar" : "Girar"}
        >
          <KatanaScene
            explodeRef={explodeRef}
            progressRef={progressRef}
            showLabels={phase === "blade"}
            active={canvasActive}
          />
        </div>
        <div className="noise vignette pointer-events-none absolute inset-0 opacity-70" />

        <AnimatePresence mode="wait">
          {phase === "hero" ? (
            <motion.div
              key="hero-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none relative flex h-full flex-col justify-between px-6 py-28 sm:px-10 lg:py-32"
            >
              <div className="max-w-4xl">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white/80"
                >
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-fire-yellow" />
                  Shadow of the Katana
                </motion.span>

                <h1 className="font-serif italic leading-[0.98] tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                  <RevealText text="THE WAY OF" className="block" delay={0.15} />
                  <RevealText text="THE SAMURAI" className="block text-gradient" delay={0.32} />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                  className="mt-7 font-mono text-xs uppercase tracking-[0.35em] text-white/85"
                >
                  Discipline &middot; Honor &middot; Precision
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.8 }}
                  className="pointer-events-auto mt-10"
                >
                  <MagneticButton href="bushido">Enter the Path</MagneticButton>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/70"
              >
                Role para desembainhar
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="blade-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none relative flex h-full flex-col justify-between px-6 py-28 sm:px-10 lg:py-32"
            >
              <div className="max-w-xl">
                <span className="mb-6 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-fire-yellow">
                  A Lâmina
                </span>
                <h2 className="font-serif italic leading-[1.0] tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl">
                  <RevealText text="Cada peça carrega um propósito." once={false} />
                </h2>
                <p className="mt-6 max-w-md text-white/85">
                  Lâmina, guarda e cabo — forjados em separado, unidos por disciplina. Continue rolando
                  pra ver a katana se desmontar diante dos seus olhos.
                </p>
              </div>

              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                Arraste pra girar cada peça
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-[22vh] bg-linear-to-b from-field-deep via-ink/80 to-ink" />
    </section>
  );
}

// O Canvas 3D só renderiza enquanto está perto da viewport — economiza
// GPU/bateria quando o usuário rola pra longe dessa seção.
function useCanvasVisibility(containerRef: React.RefObject<HTMLElement | null>, onChange: (v: boolean) => void) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => onChange(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, onChange]);
}

// Desfoque só na transição de saída da cena (final do scroll da seção) —
// enquanto a katana está em quadro, sempre nítida.
function useExitBlur(progressRef: React.RefObject<number>, wrapRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let raf: number;
    const EXIT_START = 0.94;
    const MAX_BLUR_PX = 10;
    const tick = () => {
      const p = progressRef.current ?? 0;
      const t = Math.max(0, Math.min(1, (p - EXIT_START) / (1 - EXIT_START)));
      const eased = t * t;
      if (wrapRef.current) {
        wrapRef.current.style.filter = eased > 0.01 ? `blur(${(eased * MAX_BLUR_PX).toFixed(2)}px)` : "";
        wrapRef.current.style.transform = eased > 0.01 ? `scale(${1 + eased * 0.03})` : "";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef, wrapRef]);
}
