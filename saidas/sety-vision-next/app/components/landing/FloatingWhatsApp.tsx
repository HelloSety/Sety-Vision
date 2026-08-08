"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={openWhatsApp(WA_MSG.flutuante)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed", right: 24, bottom: 24, zIndex: 60,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 12px 32px rgba(37,211,102,0.4)",
        textDecoration: "none",
      }}
      aria-label="Fale com um especialista no WhatsApp"
    >
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "#25D366", animation: "wa-pulse 2.4s ease-out infinite",
      }} />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ position: "relative", zIndex: 1 }}>
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.26 4.86L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.2h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.19h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.55 3.7-8.24 8.26-8.24 4.55 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.23-8.25 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
      </svg>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
            style={{
              position: "absolute", right: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)",
              background: "#0F172A", color: "#fff", fontSize: 13, fontWeight: 600,
              padding: "8px 14px", borderRadius: 10, whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            💬 Fale com um especialista
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes wa-pulse {
          0%   { opacity: 0.55; transform: scale(1); }
          70%  { opacity: 0; transform: scale(1.7); }
          100% { opacity: 0; transform: scale(1.7); }
        }
      `}</style>
    </motion.a>
  );
}
