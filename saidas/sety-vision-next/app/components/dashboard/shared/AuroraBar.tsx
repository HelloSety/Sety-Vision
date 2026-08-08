"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { dash } from "@/lib/tokens";

export function AuroraBar({ messages, accent = dash.purple }: { messages: string[]; accent?: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
    const id = setInterval(() => setIdx((v) => (v + 1) % messages.length), 4500);
    return () => clearInterval(id);
  }, [messages]);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
      background: `linear-gradient(90deg, ${accent}0F, rgba(59,130,246,0.05))`,
      border: `1px solid ${accent}29`, borderRadius: 12,
    }}>
      <div style={{ width: 26, height: 26, borderRadius: 8, background: `${accent}24`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Sparkles size={13} color={accent} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: accent, flexShrink: 0 }}>Aurora</span>
      <div style={{ width: 1, height: 14, background: dash.border, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden", position: "relative", height: 16 }}>
        <AnimatePresence mode="wait">
          <motion.span key={idx}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            style={{ position: "absolute", fontSize: 12.5, color: dash.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
            {messages[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
