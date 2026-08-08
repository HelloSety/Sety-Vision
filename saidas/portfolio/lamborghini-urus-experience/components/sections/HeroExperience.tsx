"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { useCinematicScroll } from "@/lib/useCinematicScroll";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";
import type { UrusRefs } from "../scene/UrusModel";
import type { Bounds } from "../scene/LamborghiniScene";

const LamborghiniScene = dynamic(() => import("../scene/LamborghiniScene"), {
  ssr: false,
  loading: () => null,
});

const PAINT_COLORS: { name: string; hex: string }[] = [
  { name: "Giallo Auge", hex: "#e8c400" },
  { name: "Verde Citrea", hex: "#8bd400" },
  { name: "Nero Noctis", hex: "#0a0a0a" },
  { name: "Bianco Monocerus", hex: "#e9e9e6" },
  { name: "Rosso Efesto", hex: "#a3140f" },
];

const STATS = [
  { value: "3,3", unit: "s", label: "Aceleração 0–100 km/h" },
  { value: "666", unit: "cv", label: "Potência combinada" },
  { value: "306", unit: "km/h", label: "Velocidade máxima" },
];

type Phase = "hero" | "design" | "configurator";

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const boundsRef = useRef<Bounds | null>(null);
  const urusRef = useRef<UrusRefs>({ paintMaterial: null });
  const [phase, setPhase] = useState<Phase>("hero");
  const [activeColor, setActiveColor] = useState(0);
  const [canvasActive, setCanvasActive] = useState(false);

  useCinematicScroll(containerRef, progressRef);
  useCinematicScrollPhase(progressRef, setPhase);
  useCanvasVisibility(containerRef, setCanvasActive);
  useExitBlur(progressRef, canvasWrapRef);

  const applyColor = (i: number) => {
    setActiveColor(i);
    const mat = urusRef.current.paintMaterial;
    if (mat) {
      mat.color.set(new THREE.Color(PAINT_COLORS[i].hex));
      mat.needsUpdate = true;
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={canvasWrapRef} className="absolute inset-0">
          <LamborghiniScene
            progressRef={progressRef}
            boundsRef={boundsRef}
            urusRef={urusRef}
            active={canvasActive}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-black italic leading-none tracking-tight text-ink/5 text-[26vw]"
        >
          URUS
        </div>

        <div className="noise vignette pointer-events-none absolute inset-0 opacity-60" />

        <AnimatePresence mode="wait">
          {phase === "hero" && (
            <motion.div
              key="hero-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none relative flex h-full flex-col justify-between px-6 py-28 sm:px-10 lg:py-32"
            >
              <div className="max-w-3xl">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-mist"
                >
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-lime" />
                  Sety Studio — Protótipo privado
                </motion.span>
                <h1 className="font-black italic leading-[0.92] tracking-tight text-ink text-6xl sm:text-7xl lg:text-8xl">
                  <RevealText text="LAMBORGHINI" className="block" delay={0.15} />
                  <RevealText text="URUS" className="block text-gradient" delay={0.32} />
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                  className="mt-6 max-w-md text-mist"
                >
                  Uma experiência cinematográfica, não um configurador comum.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.8 }}
                  className="pointer-events-auto mt-10"
                >
                  <MagneticButton href="configurator">Configure</MagneticButton>
                </motion.div>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
                Role para explorar
              </div>
            </motion.div>
          )}

          {phase === "design" && (
            <motion.div
              key="design-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none relative flex h-full flex-col justify-end px-6 pb-28 sm:px-10"
            >
              <div className="mb-10 max-w-lg">
                <span className="mb-4 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-lime">
                  Performance
                </span>
                <h2 className="font-black italic text-4xl leading-[1.0] tracking-tight text-ink sm:text-5xl">
                  <RevealText text="Cada linha tem propósito." once={false} />
                </h2>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline gap-1 font-black italic leading-none tracking-tight text-ink text-6xl sm:text-7xl">
                      {s.value}
                      <span className="text-xl font-bold not-italic text-mist sm:text-2xl">{s.unit}</span>
                    </div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "configurator" && (
            <motion.div
              key="configurator-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none relative flex h-full flex-col justify-end px-6 pb-28 sm:px-10"
            >
              <div className="max-w-lg">
                <span className="mb-4 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-lime">
                  Configurador
                </span>
                <h2 className="font-black italic text-4xl leading-[1.0] tracking-tight text-ink sm:text-5xl">
                  Escolha sua cor.
                </h2>
              </div>
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">
                {PAINT_COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    data-cursor
                    onClick={() => applyColor(i)}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className="h-10 w-10 rounded-full border-2 shadow-sm transition-transform group-hover:scale-110"
                      style={{
                        background: c.hex,
                        borderColor: activeColor === i ? "var(--color-ink)" : "rgba(10,10,10,0.12)",
                      }}
                    />
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        activeColor === i ? "text-ink" : "text-mist"
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-[18vh] bg-linear-to-b from-transparent to-white" />
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
// enquanto o carro está em quadro, sempre nítido.
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

function useCinematicScrollPhase(
  progressRef: React.RefObject<number>,
  onChange: (phase: Phase) => void
) {
  const lastRef = useRef<Phase>("hero");
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const p = progressRef.current ?? 0;
      const next: Phase = p < 0.38 ? "hero" : p < 0.68 ? "design" : "configurator";
      if (next !== lastRef.current) {
        lastRef.current = next;
        onChangeRef.current(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);
}
