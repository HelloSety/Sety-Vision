"use client";

import { motion, Variants } from "framer-motion";

const VARIANTS: Variants = {
  hidden: { y: "100%" },
  show: { y: "0%" },
};

export default function RevealText({
  text,
  className = "",
  by = "word",
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  by?: "word" | "char";
  delay?: number;
  once?: boolean;
}) {
  const parts = by === "char" ? text.split("") : text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {parts.map((part, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial="hidden"
              whileInView="show"
              viewport={{ once, margin: "-10% 0px" }}
              variants={VARIANTS}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * (by === "char" ? 0.03 : 0.09),
              }}
            >
              {part}
            </motion.span>
          </span>
          {by === "word" && i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
