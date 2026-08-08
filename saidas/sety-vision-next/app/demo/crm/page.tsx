"use client";

import { Topbar } from "@/app/components/dashboard/Topbar";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useDemoSegment } from "@/lib/demo/context";
import { CRM_STAGES } from "@/lib/demo/segments";

export default function DemoCrmPage() {
  const { segment } = useDemoSegment();

  return (
    <>
      <Topbar title={segment.crmLabel} subtitle="Modo demonstração" showSegmentSwitcher />

      <main style={{ flex: 1, overflowX: "auto", overflowY: "hidden", padding: "20px 24px 32px" }}>
        <div style={{ display: "flex", gap: 14, height: "100%", minWidth: "max-content" }}>
          {CRM_STAGES.map((stage, ci) => (
            <div key={stage.id} style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: stage.color }} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0A0A0A" }}>{stage.label}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: "auto" }}>{stage.leads.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stage.leads.map((lead, li) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.06 + li * 0.04, ease: EASE, duration: 0.35 }}
                    whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(0,0,0,0.08)" } as never}
                    style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: 14, cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${stage.color}, #7C3AED)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                        {lead.avatar}
                      </div>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0A0A0A" }}>{lead.name}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#6B7280", marginBottom: 8 }}>{lead.ref}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#0A0A0A" }}>{lead.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
