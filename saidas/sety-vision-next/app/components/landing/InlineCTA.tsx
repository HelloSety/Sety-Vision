"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export function InlineCTA({ text, button, message }: { text: string; button: string; message: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ padding: "0 32px" }}>
      <motion.a
        href={openWhatsApp(message)} target="_blank" rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -2 }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          maxWidth: 1280, margin: "0 auto", textDecoration: "none",
          borderRadius: 20, padding: "20px 28px",
          background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{text}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "#7C3AED" }}>
          {button} <ArrowRight size={15} />
        </span>
      </motion.a>
    </div>
  );
}
