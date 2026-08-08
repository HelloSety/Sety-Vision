"use client";

import { motion } from "framer-motion";
import RevealText from "./RevealText";

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-5 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-gold"
      >
        {eyebrow}
      </motion.span>
      <h2 className="font-serif text-5xl italic leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
        <RevealText text={title} />
      </h2>
    </div>
  );
}
