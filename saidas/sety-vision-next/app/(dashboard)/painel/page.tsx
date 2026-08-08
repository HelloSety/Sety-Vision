"use client";

import { Topbar } from "@/app/components/dashboard/Topbar";
import { KPICard, type KPICardProps } from "@/app/components/dashboard/shared/KPICard";
import { AuroraBar } from "@/app/components/dashboard/shared/AuroraBar";
import { ProgressRing } from "@/app/components/dashboard/shared/ProgressRing";
import { SkeletonRows } from "@/app/components/dashboard/shared/Skeleton";
import { Avatar } from "@/app/components/dashboard/shared/Avatar";
import { StatusBadge } from "@/app/components/dashboard/shared/StatusBadge";
import { dashPremium } from "@/lib/tokens";
import { useToast } from "@/app/components/ui/Toast";
import { monoPath } from "@/lib/dashboard/bezier";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import {
  DollarSign, ShoppingBag, MessageSquare, Flame, ArrowUpRight, ChevronRight,
  ShoppingCart, FileText, RefreshCw,
} from "lucide-react";

/* ── Aurora — mensagens da barra de IA narrando em tempo real ─── */
const AURORA_MESSAGES = [
  "Encontrei 3 oportunidades de venda hoje.",
  "Aroldo está online há 2 minutos.",
  "Recomendo oferecer o Plano Growth pra ele.",
  "Pedro acabou de abandonar o carrinho.",
  "Maria abriu o orçamento novamente.",
  "Há um cliente esperando resposta há 48 segundos.",
];

/* ── Status das integrações — strip única, estilo status page ── */
const STATUSES = [
  { label: "IA",        ok: true },
  { label: "WhatsApp",  ok: true },
  { label: "Shopify",   ok: true },
  { label: "Nuvemshop", ok: true },
  { label: "Meta Ads",  ok: true },
  { label: "Google Ads",ok: true },
];

function StatusRow() {
  const allOk = STATUSES.every(s => s.ok);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "8px 16px", flexWrap: "wrap",
      background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 12,
      boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: allOk ? "#22C55E" : "#F59E0B", boxShadow: "0 0 8px rgba(34,197,94,0.55)", animation: "dash-pulse 2.4s ease-in-out infinite" }} />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
          {allOk ? "Todos os sistemas operacionais" : "Atenção em uma integração"}
        </span>
      </div>
      <div style={{ width: 1, height: 13, background: "rgba(15,23,42,0.08)", flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 15, flexWrap: "wrap" }}>
        {STATUSES.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: s.ok ? "#22C55E" : "#D1D5DB" }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: "#64748B" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Ações necessárias ────────────────────────────────────── */
const ACTIONS = [
  { icon: MessageSquare, text: "1 lead aguardando resposta",     color: "#EF4444", href: "/leads" },
  { icon: ShoppingCart,  text: "1 carrinho abandonado",           color: "#F59E0B", href: "/crm" },
  { icon: RefreshCw,     text: "2 follow-ups para hoje",          color: "#3B82F6", href: "/agenda" },
  { icon: FileText,      text: "1 cliente aguardando orçamento",  color: "#7C3AED", href: "/propostas" },
];

function ActionsNeeded() {
  return (
    <div style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 20, boxShadow: dashPremium.cardShadow, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0A0A0A", display: "flex", alignItems: "center", gap: 6 }}>
          <Flame size={13} color="#EF4444" /> Ações necessárias
        </div>
      </div>
      <div>
        {ACTIONS.map((a, i) => (
          <a key={a.text} href={a.href} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", textDecoration: "none",
            borderBottom: i < ACTIONS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: `${a.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <a.icon size={12.5} color={a.color} />
            </div>
            <span style={{ flex: 1, fontSize: 12.5, color: "#374151", fontWeight: 500 }}>{a.text}</span>
            <ChevronRight size={13} color="#D1D5DB" />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Revenue area chart ──────────────────────────────────── */
const REV   = [18400, 22100, 19800, 28700, 31200, 38900];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const PERIODS_REV = ["7D", "30D", "3M"];

function RevChart() {
  const [period, setPeriod] = useState(2);
  const [hover, setHover] = useState<number | null>(null);
  const W = 400; const H = 140;
  const min = Math.min(...REV) * 0.88; const max = Math.max(...REV) * 1.06;
  const sx = (i: number) => (i / (REV.length - 1)) * W;
  const sy = (v: number) => H - ((v - min) / (max - min)) * H;
  const pts: [number, number][] = REV.map((v, i) => [sx(i), sy(v)]);
  const line = monoPath(pts);
  const area = `${line} L${W},${H} L0,${H}Z`;
  const lp = pts[pts.length - 1];
  const activeIdx = hover ?? REV.length - 1;
  const ap = pts[activeIdx];
  const fmtK = (v: number) => `R$ ${(v / 1000).toFixed(1).replace(".", ",")}k`;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setHover(Math.max(0, Math.min(REV.length - 1, Math.round(x * (REV.length - 1)))));
  };

  return (
    <div style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 20, boxShadow: dashPremium.cardShadow, padding: "20px", display: "flex", flexDirection: "column", height: "100%", minHeight: 300 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", marginBottom: 3 }}>Receita Mensal</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>Evolução dos últimos 6 meses</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-1px", color: "#0A0A0A", lineHeight: 1 }}>R$ 38,9k</div>
            <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 600, marginTop: 2 }}>▲ +34% vs mai</div>
          </div>
          <div style={{ display: "flex", gap: 1, background: "rgba(0,0,0,0.045)", borderRadius: 8, padding: 2, flexShrink: 0 }}>
            {PERIODS_REV.map((p, i) => (
              <button key={p} onClick={() => setPeriod(i)} style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                border: "none", cursor: "pointer", transition: "all 0.15s",
                background: period === i ? "rgba(34,197,94,0.14)" : "transparent",
                color: period === i ? "#16A34A" : "rgba(0,0,0,0.35)",
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", gap: 8, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 16, flexShrink: 0, alignItems: "flex-end" }}>
          {["39k", "29k", "18k"].map(l => (
            <span key={l} style={{ fontSize: 9.5, color: "rgba(0,0,0,0.28)", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>R${l}</span>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          <div style={{ position: "relative", flex: 1, minHeight: 0, cursor: "crosshair" }}
            onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#22C55E" stopOpacity="0.18" />
                <stop offset="55%"  stopColor="#22C55E" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
              </linearGradient>
              <filter id="revGlow">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <clipPath id="revClip">
                <motion.rect x={0} y={-4} height={H + 8}
                  initial={{ width: 0 }} animate={{ width: W }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }} />
              </clipPath>
            </defs>
            {[0.12, 0.40, 0.68, 0.94].map((f, i) => (
              <line key={i} x1={0} y1={H * f} x2={W} y2={H * f}
                stroke="rgba(15,23,42,0.045)" strokeWidth="0.75" />
            ))}
            {hover !== null && (
              <line x1={ap[0]} y1={-2} x2={ap[0]} y2={H} stroke="rgba(15,23,42,0.16)" strokeWidth="0.75" strokeDasharray="2,3" />
            )}
            <g clipPath="url(#revClip)">
              <path d={area} fill="url(#revGrad)" />
              <path d={line} fill="none" stroke="#16A34A" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" filter="url(#revGlow)" />
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === activeIdx ? 0 : 1.6}
                  fill="#16A34A" fillOpacity={0.45} />
              ))}
              <circle cx={ap[0]} cy={ap[1]} r={3.4} fill="#FFFFFF" stroke="#16A34A" strokeWidth="1.8" />
              {hover === null && (
                <motion.circle cx={lp[0]} cy={lp[1]}
                  animate={{ r: [3.5, 6, 3.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  fill="none" stroke="#16A34A" strokeWidth="0.8" strokeOpacity="0.3" />
              )}
            </g>
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: hover === null ? 1.5 : 0 }}
            style={{
              position: "absolute", left: `${(ap[0] / W) * 100}%`, top: `${(ap[1] / H) * 100}%`,
              transform: activeIdx >= REV.length - 2
                ? "translate(calc(-100% - 6px), -145%)"
                : activeIdx === 0 ? "translate(6px, -145%)" : "translate(-50%, -155%)",
              background: "#0A0A0A", color: "#FFFFFF",
              fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 9,
              whiteSpace: "nowrap", boxShadow: "0 10px 24px rgba(0,0,0,0.28)", pointerEvents: "none",
              transition: "left 0.12s ease-out, top 0.12s ease-out",
            }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600, marginRight: 5 }}>{MONTHS[activeIdx]}</span>
            {fmtK(REV[activeIdx])}
          </motion.div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 2 }}>
            {MONTHS.map((m, i) => (
              <span key={m} style={{ fontSize: 9.5, color: i === activeIdx && hover !== null ? "#0A0A0A" : "rgba(0,0,0,0.28)", fontWeight: i === activeIdx && hover !== null ? 700 : 500, transition: "color 0.12s" }}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Live Activity Feed (dados reais do WhatsApp/CRM) ────── */
type FeedItem = { id: string; emoji: string; text: string; tag: string; tc: string };

function LiveFeed({ items, loading }: { items: FeedItem[]; loading?: boolean }) {
  if (loading && items.length === 0) {
    return <SkeletonRows rows={4} />;
  }
  if (items.length === 0) {
    return (
      <div style={{ padding: "24px 8px", textAlign: "center", fontSize: 12, color: "#B0B4BB" }}>
        Nenhuma atividade ainda — assim que chegar uma mensagem no WhatsApp, aparece aqui.
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <AnimatePresence initial={false}>
        {items.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: Math.max(0.2, 1 - i * 0.1), y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{
              display: "flex", alignItems: "center", gap: 9, padding: "9px 11px",
              borderRadius: 10, overflow: "hidden",
              background: "#FAFAFA",
              border: "1px solid rgba(0,0,0,0.05)",
            }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.tc}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>
              {item.emoji}
            </div>
            <span style={{ flex: 1, fontSize: 12.5, color: "#4B5563", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.text}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, flexShrink: 0, background: `${item.tc}14`, color: item.tc, border: `1px solid ${item.tc}28` }}>
              {item.tag}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Esquemas de badge dos leads em destaque ─────────────── */
const HOT_STAGE: Record<string, { dot: string; text: string; bg: string }> = {
  Proposta:    { dot: "#F59E0B", text: "#B45309", bg: "rgba(245,158,11,0.09)" },
  Fechamento:  { dot: "#22C55E", text: "#15803D", bg: "rgba(34,197,94,0.08)" },
  Qualificado: { dot: "#3B82F6", text: "#1D4ED8", bg: "rgba(59,130,246,0.07)" },
};

/* ── Pipeline mini ───────────────────────────────────────── */
const STAGES = [
  { name: "Novo",        color: "#6B7280", count: 12, total: "R$43k", deals: [{ n: "Bruno Mendes",   v: "R$9,5k" }, { n: "Aline Ferreira",  v: "R$4,2k" }] },
  { name: "Qualificado", color: "#3B82F6", count: 8,  total: "R$74k", deals: [{ n: "Ana Paula R.",   v: "R$8,4k" }, { n: "Patrícia Fontes", v: "R$6,8k" }] },
  { name: "Proposta",    color: "#F59E0B", count: 5,  total: "R$78k", deals: [{ n: "Gustavo Lima",   v: "R$12,8k" }, { n: "Marcos Oliveira", v: "R$15,2k" }] },
  { name: "Fechado",     color: "#22C55E", count: 3,  total: "R$67k", deals: [{ n: "Ricardo Pires",  v: "R$22k" }] },
];

/* ── Goal widget ─────────────────────────────────────────── */
function GoalWidget() {
  const pct = 78;
  return (
    <div style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 20, boxShadow: dashPremium.cardShadow, padding: "20px", display: "flex", flexDirection: "column", gap: 16, width: 232, flexShrink: 0 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", marginBottom: 2 }}>Meta Mensal</div>
        <div style={{ fontSize: 11, color: "#9CA3AF" }}>Junho · 8 dias restantes</div>
      </div>

      <ProgressRing pct={pct} id="goal" />

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        {[
          { label: "Realizado", val: "R$38,9k", dot: "#16A34A" },
          { label: "Faltam",    val: "R$11,1k", dot: "rgba(0,0,0,0.15)" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 9.5, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.03em" }}>{s.label}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.4px" }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Target */}
      <div style={{ padding: "10px 12px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.14)", borderRadius: 10 }}>
        <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 2 }}>Meta total</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.5px" }}>R$ 50.000</div>
      </div>
    </div>
  );
}

/* ── KPI config ──────────────────────────────────────────── */
const KPIS: KPICardProps[] = [
  { label: "Vendas hoje",      Icon: DollarSign,    to: 3280, fmt: v => `R$${v.toLocaleString("pt-BR")}`, change: "+34%", up: true,  color: "#16A34A", spark: [1800,2100,1950,2600,2900,3280], sub: "vs ontem" },
  { label: "Pedidos",          Icon: ShoppingBag,   to: 12,   fmt: v => `${v}`,                            change: "+18%", up: true,  color: "#3B82F6", spark: [5,7,6,9,10,12],                 sub: "hoje" },
  { label: "Conversas ativas", Icon: MessageSquare, to: 8,    fmt: v => `${v}`,                            change: "+2",   up: true,  color: "#0EA5E9", spark: [3,4,4,6,7,8],                   sub: "agora" },
  { label: "Leads quentes",    Icon: Flame,         to: 3,    fmt: v => `${v}`,                            change: "",     up: true,  color: "#EF4444", spark: [1,2,1,2,3,3],                   sub: "aguardando ação", urgent: true },
];

type DashboardFeedResponse = {
  stats: { activeConversations: number; hotLeads: number };
  feed: { id: string; text: string }[];
};

/* ── Page ────────────────────────────────────────────────── */
export default function PainelPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const { info } = useToast();

  const [live, setLive] = useState<DashboardFeedResponse>({ stats: { activeConversations: 0, hotLeads: 0 }, feed: [] });
  const [loading, setLoading] = useState(true);
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/dashboard-feed");
        if (!res.ok) return;
        const data: DashboardFeedResponse = await res.json();

        // Notificação em tempo real só pra atividade genuinamente nova — nunca
        // no primeiro carregamento (senão dispara um toast pra cada item já
        // existente assim que a página abre).
        if (seenIds.current) {
          const novos = data.feed.filter(f => !seenIds.current!.has(f.id));
          if (novos.length > 0) info(novos[0].text, "Nova atividade");
        }
        seenIds.current = new Set(data.feed.map(f => f.id));

        setLive(data);
      } catch {
        // rede instável — mantém os últimos dados carregados
      } finally {
        setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kpis = KPIS.map(k => {
    if (k.label === "Conversas ativas") return { ...k, to: live.stats.activeConversations, spark: [live.stats.activeConversations, live.stats.activeConversations], change: "", sub: "últimas 24h" };
    if (k.label === "Leads quentes") return { ...k, to: live.stats.hotLeads, spark: [live.stats.hotLeads, live.stats.hotLeads], sub: "aguardando ação" };
    return k;
  });

  const feedItems: FeedItem[] = live.feed.map(f => ({
    id: f.id, emoji: "💬", text: f.text, tag: "WhatsApp", tc: "#22C55E",
  }));

  return (
    <>
      <Topbar title="Dashboard" subtitle={`${greeting}, Seven`} />

      <main style={{ flex: 1, overflowY: "auto", padding: "20px 24px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Aurora + status */}
        <AuroraBar messages={AURORA_MESSAGES} accent="#16A34A" />
        <StatusRow />

        {/* Row 1: KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {kpis.map((k, i) => <KPICard key={k.label} {...k} hero={i === 0} delay={i * 0.07} />)}
        </div>

        {/* Row 2: Revenue chart + Live feed */}
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 12 }}>
          <RevChart />

          {/* Feed panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: EASE }}
            style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 20, boxShadow: dashPremium.cardShadow, padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4, flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", marginBottom: 3 }}>Atividade em tempo real</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>O sistema trabalhando por você</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: 20, padding: "3.5px 10px", flexShrink: 0 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", animation: "dash-pulse 2s ease-in-out infinite" }} />
                <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 600 }}>Ao vivo</span>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", marginTop: 10 }}>
              <LiveFeed items={feedItems} loading={loading} />
            </div>
          </motion.div>
        </div>

        {/* Row 3: Pipeline + Goal */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {/* Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, ease: EASE }}
            style={{ flex: 1, background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 20, boxShadow: dashPremium.cardShadow, padding: "20px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", marginBottom: 2 }}>Pipeline</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>28 negócios em aberto · R$262k</div>
              </div>
              <a href="/pipeline" style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9CA3AF", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}>
                Ver tudo <ArrowUpRight size={11} />
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {STAGES.map(st => (
                <div key={st.name}>
                  {/* Column header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.color }} />
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280" }}>{st.name}</span>
                    </div>
                    <span style={{ fontSize: 9.5, color: "#D1D5DB" }}>{st.count}</span>
                  </div>
                  {/* Total */}
                  <div style={{ fontSize: 13, fontWeight: 800, color: st.color, marginBottom: 8, letterSpacing: "-0.5px" }}>{st.total}</div>
                  {/* Deal cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {st.deals.map(d => (
                      <div key={d.n} style={{ background: "#FAFAFB", border: `1px solid ${dashPremium.rowBorder}`, borderRadius: 8, padding: "7px 10px", boxShadow: `inset 2.5px 0 0 ${st.color}33` }}>
                        <div style={{ fontSize: 11, color: "#0F172A", fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginBottom: 1, letterSpacing: "-0.01em" }}>{d.n}</div>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: st.color, fontVariantNumeric: "tabular-nums" }}>{d.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ease: EASE }}>
            <GoalWidget />
          </motion.div>
        </div>

        {/* Row 4: Ações necessárias + Hot leads */}
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 2.1fr", gap: 12, alignItems: "start" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, ease: EASE }}>
            <ActionsNeeded />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, ease: EASE }}
            style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, borderRadius: 20, boxShadow: dashPremium.cardShadow, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", marginBottom: 2 }}>Leads que precisam de atenção</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>Priorize estes agora</div>
              </div>
              <a href="/leads" style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9CA3AF", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}>
                Ver todos <ArrowUpRight size={11} />
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
              {[
                { name: "Ana Paula Ribeiro", company: "Chuteira Prime",         stage: "Proposta",   val: "R$8,4k",  score: 92 },
                { name: "Ricardo Pires",     company: "FutStore Oficial",       stage: "Fechamento", val: "R$22k",   score: 96 },
                { name: "Marcos Oliveira",   company: "Camisas do Brasil",      stage: "Qualificado",val: "R$15,2k", score: 78 },
                { name: "Gustavo Lima",      company: "Artigos Esportivos SP",  stage: "Proposta",   val: "R$12,8k", score: 84 },
              ].map((lead, i) => (
                <a key={lead.name} href="/crm"
                  style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 18px", textDecoration: "none", borderRight: i < 3 ? `1px solid ${dashPremium.rowBorder}` : "none", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = dashPremium.rowHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <Avatar name={lead.name} size={32} hot={lead.score >= 90} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0F172A", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginBottom: 2, letterSpacing: "-0.01em" }}>{lead.name}</div>
                    <StatusBadge label={lead.stage} size="sm" scheme={HOT_STAGE[lead.stage] ?? HOT_STAGE["Proposta"]} />
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0F172A", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.3px" }}>{lead.val}</div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: lead.score >= 90 ? "#15803D" : lead.score >= 70 ? "#B45309" : "#94A3B8", fontVariantNumeric: "tabular-nums" }}>score {lead.score}</div>
                  </div>
                  <ChevronRight size={12} color="#D1D5DB" style={{ flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

      </main>
      <style>{`@keyframes dash-pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </>
  );
}
