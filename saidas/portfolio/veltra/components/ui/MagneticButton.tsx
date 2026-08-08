"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
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
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-graphite"
      : "border border-ink/25 text-ink hover:border-ink";

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.button>
  );
}
