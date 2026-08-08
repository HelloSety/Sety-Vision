"use client";

import { Topbar } from "@/app/components/dashboard/Topbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CRM_CONVERSATIONS } from "@/lib/demo/segments";

export default function DemoConversasPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CRM_CONVERSATIONS[activeIdx];

  return (
    <>
      <Topbar title="Conversas" subtitle="Modo demonstração" showSegmentSwitcher />

      <main style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Lista de contatos */}
        <div style={{ width: 280, flexShrink: 0, borderRight: "1px solid rgba(0,0,0,0.07)", overflowY: "auto" }}>
          {CRM_CONVERSATIONS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActiveIdx(i)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px",
                background: i === activeIdx ? "#F5F3FF" : "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.05)",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {c.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                  <span style={{ fontSize: 10.5, color: "#9CA3AF", flexShrink: 0 }}>{c.time}</span>
                </div>
                <div style={{ fontSize: 11.5, color: "#6B7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.preview}</div>
              </div>
              {c.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />}
            </button>
          ))}
        </div>

        {/* Thread */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>
              {active.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0A0A0A" }}>{active.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>IA respondendo automaticamente</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 8, background: "#FAFAFA" }}>
            <AnimatePresence>
              {active.messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ display: "flex", justifyContent: m.from === "cliente" ? "flex-start" : "flex-end" }}
                >
                  <div style={{
                    maxWidth: "70%", padding: "9px 14px", borderRadius: m.from === "cliente" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    background: m.from === "cliente" ? "#FFFFFF" : "#7C3AED",
                    color: m.from === "cliente" ? "#111" : "#fff",
                    border: m.from === "cliente" ? "1px solid rgba(0,0,0,0.07)" : "none",
                    fontSize: 13, lineHeight: 1.5,
                  }}>
                    {m.from === "ia" && <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.7, marginBottom: 2 }}>IA</div>}
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ background: "#F3F4F6", borderRadius: 999, padding: "10px 16px", fontSize: 13, color: "#9CA3AF" }}>
              Mensagem enviada automaticamente pela IA...
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
