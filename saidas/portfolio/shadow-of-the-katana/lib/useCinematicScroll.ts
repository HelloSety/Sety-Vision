"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCinematicScroll(
  containerRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<number>,
  explodeRef: RefObject<number>,
  onPhaseChange: (phase: "hero" | "blade") => void
) {
  useEffect(() => {
    if (!containerRef.current) return;
    let currentPhase: "hero" | "blade" = "hero";

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        explodeRef.current = Math.max(0, Math.min(1, (self.progress - 0.6) / 0.35));
        const nextPhase = self.progress < 0.55 ? "hero" : "blade";
        if (nextPhase !== currentPhase) {
          currentPhase = nextPhase;
          onPhaseChange(nextPhase);
        }
      },
    });

    return () => trigger.kill();
  }, [containerRef, progressRef, explodeRef, onPhaseChange]);
}
