"use client";

import { motion, Variants } from "framer-motion";

const VARIANTS: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  left: {
    hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  right: {
    hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -3, y: 40, filter: "blur(6px)" },
    show: { opacity: 1, rotate: 0, y: 0, filter: "blur(0px)" },
  },
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.9,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
