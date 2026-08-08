"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }

      const el = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor-label"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    let raf: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-1.5 w-1.5 rounded-full bg-ink"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 flex items-center justify-center rounded-full border transition-[width,height,background,border-color] duration-300 ease-out"
        style={{
          width: hovering ? (label ? 96 : 60) : 30,
          height: hovering ? (label ? 96 : 60) : 30,
          borderColor: hovering ? "rgba(179,18,26,0.7)" : "rgba(10,10,10,0.2)",
          background: hovering ? "rgba(179,18,26,0.08)" : "transparent",
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
