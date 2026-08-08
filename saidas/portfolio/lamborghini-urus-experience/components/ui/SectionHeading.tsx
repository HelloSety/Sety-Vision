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
        transition={{ duration: 0.6 }}
        className="mb-4 inline-block font-mono text-xs font-bold uppercase tracking-[0.3em] text-lime"
      >
        // {eyebrow}
      </motion.span>
      <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl">
        <RevealText text={title} />
      </h2>
    </div>
  );
}
