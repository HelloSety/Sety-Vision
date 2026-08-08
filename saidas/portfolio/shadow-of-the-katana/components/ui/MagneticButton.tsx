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
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-9 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "border border-gold/50 text-white group-hover:text-ink"
      : "glass text-white hover:border-crimson/60";

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
        <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-linear-to-r from-fire-yellow to-fire transition-transform duration-500 ease-out group-hover:scale-x-100" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
