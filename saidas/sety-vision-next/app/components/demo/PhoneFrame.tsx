"use client";

import { motion } from "framer-motion";

export function PhoneFrame({ src }: { src: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: "24px 0" }}
    >
      <div style={{
        width: 390, height: 844, borderRadius: 48, background: "#0A0A0A", padding: 12,
        boxShadow: "0 40px 90px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)",
        position: "relative", flexShrink: 0,
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
          width: 100, height: 28, background: "#000", borderRadius: 16, zIndex: 10,
        }} />

        <div style={{ width: "100%", height: "100%", borderRadius: 36, overflow: "hidden", background: "#FAFAFA" }}>
          <iframe
            key={src}
            src={src}
            title="Sety Vision — preview mobile"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
      </div>
    </motion.div>
  );
}
