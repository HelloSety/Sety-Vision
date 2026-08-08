"use client";

import { Topbar } from "@/app/components/dashboard/Topbar";
import { KPICard } from "@/app/components/dashboard/shared/KPICard";
import { AuroraBar } from "@/app/components/dashboard/shared/AuroraBar";
import { monoPath } from "@/lib/dashboard/bezier";
import { motion } from "framer-motion";
import { useDemoSegment } from "@/lib/demo/context";
import {
  DollarSign, Users, MessageSquare, ChevronRight, Flame, Clock,
} from "lucide-react";

/* ── Revenue chart ───────────────────────────────────────── */
function RevChart({ data }: { data: number[] }) {
  const W = 400, H = 140;
  const min = Math.min(...data) * 0.88, max = Math.max(...data) * 1.06;
  const sx = (i: number) => (i / (data.length - 1)) * W;
  const sy = (v: number) => H - ((v - min) / (max - min)) * H;
  const pts: [number, number][] = data.map((v, i) => [sx(i), sy(v)]);
  const line = monoPath(pts);
  const area = `${line} L${W},${H} L0,${H}Z`;
  const last = data[data.length - 1];

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: 20, minHeight: 260 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A" }}>Receita mensal</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>Evolução dos últimos 6 meses</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#0A0A0A" }}>R$ {(last / 1000).toFixed(1)}k</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
        <defs>
          <linearGradient id="demoRevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path key={line} d={area} fill="url(#demoRevGrad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <motion.path key={line + "s"} d={line} fill="none" stroke="#7C3AED" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeOut" }} />
      </svg>
    </div>
  );
}

/* ── Ações necessárias ───────────────────────────────────── */
function ActionsNeeded({ actions }: { actions: { text: string; color: string }[] }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 12.5, fontWeight: 700, color: "#0A0A0A", display: "flex", alignItems: "center", gap: 6 }}>
        <Flame size={13} color="#EF4444" /> Ações necessárias
      </div>
      <div>
        {actions.map((a, i) => (
          <div key={a.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", borderBottom: i < actions.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: `${a.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.color }} />
            </div>
            <span style={{ flex: 1, fontSize: 12.5, color: "#374151", fontWeight: 500 }}>{a.text}</span>
            <ChevronRight size={13} color="#D1D5DB" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function DemoPage() {
  const { segment } = useDemoSegment();

  return (
    <>
      <Topbar title="Dashboard — Modo Demonstração" subtitle={`Segmento: ${segment.label}`} showSegmentSwitcher />

      <main style={{ flex: 1, overflowY: "auto", padding: "20px 24px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Saudação — benefício do dia, não métrica crua */}
        <div style={{ borderRadius: 14, padding: "18px 20px", background: "linear-gradient(90deg, rgba(124,58,237,0.06), rgba(124,58,237,0.02))", border: "1px solid rgba(124,58,237,0.14)" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#0A0A0A", marginBottom: 4 }}>Bom dia 👋</div>
          <div style={{ fontSize: 13.5, color: "#374151" }}>{segment.greeting}</div>
        </div>

        <AuroraBar messages={segment.aurora} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="demo-kpi-grid">
          <KPICard label={segment.crmLabel} Icon={Users} to={segment.kpis.leads} fmt={(v) => `${v}`} benefit={segment.kpis.leadsSub} color="#3B82F6" delay={0} />
          <KPICard label="Conversas" Icon={MessageSquare} to={segment.kpis.conversas} fmt={(v) => `${v}`} benefit={segment.kpis.conversasSub} color="#7C3AED" delay={0.05} />
          <KPICard label="Receita do mês" Icon={DollarSign} to={segment.kpis.revenue} fmt={(v) => `R$${v.toLocaleString("pt-BR")}`} benefit="gerada com atendimento automático" color="#16A34A" delay={0.1} />
          <KPICard label="Tempo economizado" Icon={Clock} to={segment.horasEconomizadas} fmt={(v) => `${v}h`} benefit="que sua equipe não precisou gastar" color="#F59E0B" delay={0.15} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }} className="demo-main-grid">
          <RevChart data={segment.revenue} />
          <ActionsNeeded actions={segment.actions} />
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) { .demo-kpi-grid { grid-template-columns: repeat(2,1fr) !important; } .demo-main-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
