"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useGSAP } from "@/lib/useGSAP";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";
import type { VariantName } from "../scene/Sneaker";

const SneakerScene = dynamic(() => import("../scene/SneakerScene"), {
  ssr: false,
  loading: () => null,
});

const VARIANTS: { id: VariantName; label: string; dot: string }[] = [
  { id: "midnight", label: "01 · Noir", dot: "#f5f5f5" },
  { id: "street", label: "02 · Street", dot: "#ff2e9a" },
  { id: "beach", label: "03 · Solar", dot: "#d4ff00" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const dragYawRef = useRef(0);
  const dragState = useRef({ dragging: false, lastX: 0 });
  const [variant, setVariant] = useState<VariantName>("street");
  const [canvasActive, setCanvasActive] = useState(false);

  useGSAP(containerRef, progressRef);
  useCanvasVisibility(containerRef, setCanvasActive);
  useExitBlur(progressRef, canvasWrapRef);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current.dragging = true;
    dragState.current.lastX = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.lastX;
    dragYawRef.current += delta * 0.008;
    dragState.current.lastX = e.clientX;
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  return (
    <section id="hero" ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={canvasWrapRef}
          className="absolute inset-0"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <SneakerScene
            variant={variant}
            progressRef={progressRef}
            dragYawRef={dragYawRef}
            active={canvasActive}
          />
        </div>

        <div className="noise grid-overlay pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />

        <div className="pointer-events-none relative flex h-full flex-col justify-between px-6 py-28 sm:px-10 lg:py-32">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-pink"
            >
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-pink" />
              Next drop · VOLT°
            </motion.span>

            <h1 className="font-black leading-[0.92] tracking-tight text-5xl sm:text-7xl lg:text-8xl">
              <RevealText text="STEP INTO" className="block" delay={0.1} />
              <RevealText text="VOLTAGE." className="text-gradient block" delay={0.25} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-6 max-w-md text-base text-mist sm:text-lg"
            >
              Cores que gritam, objeto 3D que você gira com a própria mão. Um site conceito da Sety
              Studio pra mostrar até onde o hype pode chegar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="drop">Entrar na waitlist</MagneticButton>
              <MagneticButton href="specs" variant="ghost">
                Ver detalhes
              </MagneticButton>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="pointer-events-auto flex items-center gap-3"
            >
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  data-cursor
                  onClick={() => setVariant(v.id)}
                  className={`glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all ${
                    variant === v.id ? "text-white opacity-100" : "text-mist opacity-60 hover:opacity-90"
                  }`}
                  style={{ borderColor: variant === v.id ? v.dot : undefined }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: v.dot }} />
                  {v.label}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist"
            >
              Arraste pra girar · role pra explorar
            </motion.div>
          </div>
        </div>
      </div>
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
// enquanto o tênis está em quadro, sempre nítido.
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
