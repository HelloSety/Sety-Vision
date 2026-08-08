"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14 });
  const springY = useSpring(y, { stiffness: 200, damping: 14 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-white text-ink group-hover:text-white"
      : "glass text-white hover:border-orange/60";

  return (
    <motion.button
      ref={ref}
      data-cursor
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => scrollToId(href)}
      className={`${base} ${styles} ${className}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-orange to-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
