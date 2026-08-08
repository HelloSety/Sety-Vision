"use client";

import { motion, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight, ArrowUpRight, Lock, LayoutGrid, Users,
  MessageSquare, Sparkles, Search, Bell,
} from "lucide-react";
import { motion as M } from "@/lib/tokens";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";

/* ══════════════════════════════════════════════════════════════
   HERO — tipografia dominante + UM produto vivo (não cards soltos)
   Direção: Linear/Stripe/Attio — branco, respiro, contraste,
   mockup de dashboard real animando de verdade.
   Números do mockup = modo demonstração do produto (mesmos valores
   do print real /dashboard/demo-showcase.webp). Nada é tração real.
══════════════════════════════════════════════════════════════ */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ── contador animado ── */
function useCounter(target: number, start: boolean, duration = 1.4) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const c = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [start, target, duration]);
  return val;
}

/* ── KPI do mockup ── */
function Kpi({ label, value, suffix, prefix, note, noteColor, start, delay }: {
  label: string; value: number; suffix?: string; prefix?: string;
  note: string; noteColor?: string; start: boolean; delay?: number;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setGo(true), (delay ?? 0) * 1000);
    return () => clearTimeout(t);
  }, [start, delay]);
  const n = useCounter(value, go);
  return (
    <div style={{
      background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)",
      borderRadius: 14, padding: "16px 18px", minWidth: 0,
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#0B0B10", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {prefix}{prefix === "R$ " ? n.toLocaleString("pt-BR") : n}{suffix}
      </div>
      <div style={{ fontSize: 11, color: noteColor ?? "#9CA3AF", marginTop: 7, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {note}
      </div>
    </div>
  );
}

/* ── gráfico que se desenha ── */
function RevenueChart({ start }: { start: boolean }) {
  const line = "M8 96 C 40 92, 62 88, 92 82 S 150 68, 178 58 S 250 30, 306 14";
  const area = `${line} L 306 118 L 8 118 Z`;
  const total = useCounter(42300, start, 2);
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)", borderRadius: 14, padding: "18px 20px 10px", display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0B0B10" }}>Receita mensal</div>
          <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 2 }}>últimos 6 meses</div>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em", color: "#0B0B10", fontVariantNumeric: "tabular-nums" }}>
          R$ {total.toLocaleString("pt-BR")}
        </div>
      </div>
      <svg viewBox="0 0 320 122" width="100%" style={{ display: "block", marginTop: "auto" }} preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={area} fill="url(#hero-area)"
          initial={{ opacity: 0 }} animate={start ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 1.2 }} />
        <motion.path d={line} fill="none" stroke="#7C3AED" strokeWidth="2.4" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={start ? { pathLength: 1 } : {}}
          transition={{ delay: 0.5, duration: 1.9, ease: [0.22, 1, 0.36, 1] }} />
        <motion.circle cx="306" cy="14" r="3.4" fill="#7C3AED"
          initial={{ scale: 0, opacity: 0 }} animate={start ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 2.3, duration: 0.4, ease: "backOut" }} />
      </svg>
    </div>
  );
}

/* ── feed de conversa ao vivo ── */
const FEED: { from: "lead" | "ia" | "sys"; text: string }[] = [
  { from: "lead", text: "Oi! Vocês ainda atendem hoje?" },
  { from: "ia",   text: "Atendemos sim! Posso agendar — quinta 14h ou sexta 10h?" },
  { from: "lead", text: "Quinta às 14h, fechado" },
  { from: "sys",  text: "Reunião agendada · lead salvo no CRM" },
];

function LiveFeed({ start }: { start: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setStep((s) => (s >= FEED.length + 1 ? 0 : s + 1)), 2100);
    return () => clearInterval(id);
  }, [start]);
  const visible = Math.min(step, FEED.length);
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)", borderRadius: 14, padding: "16px 16px 14px", display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0B0B10" }}>Conversas ao vivo</div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: "#16A34A" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E" }} />
          IA ativa
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1, justifyContent: "flex-end", minHeight: 150 }}>
        <AnimatePresence initial={false}>
          {FEED.slice(0, visible).map((m, i) => (
            <motion.div key={`${m.text}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", justifyContent: m.from === "lead" ? "flex-start" : m.from === "ia" ? "flex-end" : "center" }}>
              {m.from === "sys" ? (
                <span style={{ fontSize: 10, fontWeight: 600, color: "#6D28D9", background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.14)", padding: "4px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <Sparkles size={9} /> {m.text}
                </span>
              ) : (
                <span style={{
                  maxWidth: "88%", fontSize: 11.5, lineHeight: 1.45, padding: "7px 11px",
                  background: m.from === "lead" ? "#F4F4F5" : "#0B0B10",
                  color: m.from === "lead" ? "#18181B" : "#FFFFFF",
                  borderRadius: m.from === "lead" ? "12px 12px 12px 3px" : "12px 12px 3px 12px",
                }}>
                  {m.text}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── toast de lead qualificado ── */
function LeadToast({ start }: { start: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!start) return;
    let hide: ReturnType<typeof setTimeout>;
    const fire = () => { setShow(true); hide = setTimeout(() => setShow(false), 3800); };
    const t0 = setTimeout(fire, 3000);
    const id = setInterval(fire, 10500);
    return () => { clearTimeout(t0); clearTimeout(hide); clearInterval(id); };
  }, [start]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={{
            position: "absolute", top: 58, right: 18, zIndex: 6,
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(15,23,42,0.08)", borderRadius: 13,
            padding: "10px 14px", boxShadow: "0 18px 44px rgba(15,23,42,0.14)",
          }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>M</span>
          <span>
            <span style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#0B0B10" }}>Lead qualificado — Mariana C.</span>
            <span style={{ display: "block", fontSize: 10.5, color: "#6B7280", marginTop: 1 }}>Orçamento estimado · <b style={{ color: "#16A34A" }}>R$ 3.400</b></span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── mockup completo: browser + app vivo ── */
function ProductWindow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStart(true), 900);
    return () => clearTimeout(t);
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -1.6, y: px * 2.2 });
  };

  const NAV = [
    { icon: LayoutGrid,     label: "Dashboard", active: true },
    { icon: Users,          label: "CRM",       active: false },
    { icon: MessageSquare,  label: "Conversas", active: false },
  ];

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ position: "relative", perspective: 2200, maxWidth: 1150, margin: "0 auto" }}>

      {/* glow por trás do produto */}
      <div aria-hidden style={{
        position: "absolute", inset: "-6% -10% -14%", zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(52% 46% at 50% 42%, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.06) 48%, transparent 72%)",
        filter: "blur(48px)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 90, rotateX: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.15, delay: 0.45, ease: M.ease }}
        style={{ position: "relative", zIndex: 1, transformStyle: "preserve-3d" }}>

        <div style={{
          transform: `rotateX(${tilt.x + 2.4}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.45s cubic-bezier(.22,1,.36,1)",
          transformStyle: "preserve-3d",
          borderRadius: 22, padding: 1,
          background: "linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.05) 35%, rgba(124,58,237,0.22) 100%)",
          boxShadow: "0 80px 160px -40px rgba(76,29,149,0.28), 0 40px 80px -40px rgba(15,23,42,0.22), 0 2px 6px rgba(15,23,42,0.06)",
        }}>
          <div style={{ position: "relative", borderRadius: 21, overflow: "hidden", background: "#F7F7F9" }}>

            {/* barra do browser */}
            <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 18px", background: "#FFFFFF", borderBottom: "1px solid rgba(15,23,42,0.06)", position: "relative" }}>
              <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
              </div>
              <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 6, background: "#F4F4F5", borderRadius: 8, padding: "5px 14px" }}>
                <Lock size={9} style={{ color: "#9CA3AF" }} />
                <span style={{ fontSize: 11.5, color: "#6B7280", fontWeight: 500, whiteSpace: "nowrap" }}>setystudio.com.br/painel</span>
              </div>
            </div>

            {/* app */}
            <div className="hm-app" style={{ display: "grid", gridTemplateColumns: "188px 1fr", minHeight: 430 }}>

              {/* sidebar */}
              <aside className="hm-sidebar" style={{ background: "#FFFFFF", borderRight: "1px solid rgba(15,23,42,0.06)", padding: "18px 12px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 22 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 7, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.02em", color: "#0B0B10" }}>SETY VISION</span>
                </div>
                <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {NAV.map((n) => {
                    const Icon = n.icon;
                    return (
                      <span key={n.label} style={{
                        display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 9,
                        fontSize: 12, fontWeight: n.active ? 700 : 500,
                        color: n.active ? "#0B0B10" : "#9CA3AF",
                        background: n.active ? "#F4F4F5" : "transparent",
                        borderLeft: n.active ? "2.5px solid #7C3AED" : "2.5px solid transparent",
                      }}>
                        <Icon size={13} /> {n.label}
                      </span>
                    );
                  })}
                </nav>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 7, padding: "8px 10px", borderRadius: 9, background: "rgba(34,197,94,0.06)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: "#16A34A" }}>IA online agora</span>
                </div>
              </aside>

              {/* main */}
              <div style={{ padding: "18px 20px 20px", minWidth: 0, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.01em", color: "#0B0B10" }}>Dashboard</div>
                    <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 1 }}>modo demonstração</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="hm-hide-sm" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.07)", borderRadius: 8, padding: "5px 11px", fontSize: 10.5, color: "#9CA3AF" }}>
                      <Search size={10} /> Buscar
                    </span>
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
                      <Bell size={11} />
                    </span>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#0EA5E9,#22C55E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff" }}>S</span>
                  </div>
                </div>

                {/* faixa Aurora */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={start ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{ display: "flex", alignItems: "center", gap: 9, background: "linear-gradient(90deg, rgba(124,58,237,0.06), rgba(124,58,237,0.02))", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 11, padding: "9px 13px", marginBottom: 14 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 7, background: "rgba(124,58,237,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sparkles size={11} style={{ color: "#7C3AED" }} />
                  </span>
                  <span style={{ fontSize: 11.5, color: "#3F3F46", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <b style={{ color: "#6D28D9" }}>Aurora</b> — 3 leads confirmaram reunião pra amanhã.
                  </span>
                </motion.div>

                {/* KPIs */}
                <div className="hm-kpis" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
                  <Kpi label="Leads novos"       value={38}    note="+24% esta semana" noteColor="#16A34A" start={start} delay={0} />
                  <Kpi label="Conversas"         value={214}   note="atendidas pela IA" start={start} delay={0.12} />
                  <Kpi label="Receita do mês"    value={42300} prefix="R$ " note="com atendimento automático" start={start} delay={0.24} />
                  <Kpi label="Tempo economizado" value={18}    suffix="h" note="da sua equipe" start={start} delay={0.36} />
                </div>

                {/* gráfico + feed */}
                <div className="hm-body" style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 10 }}>
                  <RevenueChart start={start} />
                  <LiveFeed start={start} />
                </div>

                <LeadToast start={start} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── headline com reveal palavra a palavra ── */
function Headline() {
  const line1 = "Transforme seu WhatsApp".split(" ");
  const line2 = "num vendedor 24 horas.".split(" ");
  const Word = ({ w, i, grad }: { w: string; i: number; grad?: boolean }) => (
    <motion.span
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, delay: 0.12 + i * 0.055, ease: M.ease }}
      style={{
        display: "inline-block", marginRight: "0.22em",
        ...(grad ? {
          background: "linear-gradient(100deg, #7C3AED 10%, #A855F7 50%, #6D28D9 90%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        } : {}),
      }}>
      {w}
    </motion.span>
  );
  return (
    <h1 style={{
      fontSize: "clamp(44px, 6.9vw, 96px)", fontWeight: 800, letterSpacing: "-0.045em",
      lineHeight: 1.01, color: "#0B0B10", margin: "0 0 28px", textAlign: "center",
    }}>
      <span style={{ display: "block" }}>
        {line1.map((w, i) => <Word key={w + i} w={w} i={i} />)}
      </span>
      <span style={{ display: "block", marginTop: "0.06em" }}>
        {line2.map((w, i) => <Word key={w + i} w={w} i={line1.length + i} grad={i === 1 || i === 2 || i === 3} />)}
      </span>
    </h1>
  );
}

/* ── Hero ── */
export function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "158px 24px 96px", background: "#FFFFFF" }}>
      {/* fundo: aurora clara + grid fino + grão */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-22%", left: "50%", transform: "translateX(-50%)",
          width: "110%", height: "68%",
          background: "radial-gradient(48% 58% at 50% 30%, rgba(124,58,237,0.09) 0%, rgba(168,85,247,0.04) 45%, transparent 72%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.5,
          backgroundImage: "linear-gradient(rgba(15,23,42,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.028) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
          maskImage: "radial-gradient(ellipse 72% 52% at 50% 0%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 72% 52% at 50% 0%, black 25%, transparent 100%)",
        }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE, opacity: 0.025, mixBlendMode: "multiply" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>

        {/* kicker editorial (a dor, sem pílula) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: M.ease }}
          style={{
            textAlign: "center", margin: "0 0 26px",
            fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "#7C3AED",
          }}>
          Lead sem resposta é venda do concorrente
        </motion.p>

        <Headline />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: M.ease }}
          style={{ fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.6, color: "#52525B", maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>
          IA que responde em segundos, qualifica o lead, agenda a reunião
          e registra tudo no CRM — 24 horas por dia, sem depender de ninguém online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.62, ease: M.ease }}
          style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
          <motion.a href={openWhatsApp(WA_MSG.especialista)} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "#0B0B10", color: "#FFFFFF", padding: "17px 34px", borderRadius: 999,
              fontSize: 15.5, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 1px 0 0 rgba(255,255,255,0.12) inset, 0 14px 36px rgba(11,11,16,0.22)",
            }}
            whileHover={{ scale: 1.025, y: -1 } as never}
            whileTap={{ scale: 0.975 }}>
            Falar com especialista
            <ArrowRight size={15} />
          </motion.a>
          <motion.a href="/demo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FFFFFF", color: "#0B0B10", padding: "17px 28px", borderRadius: 999,
              fontSize: 15.5, fontWeight: 500, textDecoration: "none",
              border: "1px solid rgba(11,11,16,0.14)", boxShadow: "0 2px 10px rgba(15,23,42,0.05)",
            }}
            whileHover={{ scale: 1.025, y: -1, borderColor: "rgba(11,11,16,0.34)" } as never}
            whileTap={{ scale: 0.975 }}>
            Ver demonstração
            <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        {/* linha editorial de capacidade — sem checks verdes */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.78 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 74, fontSize: 13, fontWeight: 500, color: "#A1A1AA" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#52525B" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
            IA no ar agora
          </span>
          <span aria-hidden>·</span>
          <span>Automação WhatsApp</span>
          <span aria-hidden>·</span>
          <span>Sites profissionais</span>
          <span aria-hidden>·</span>
          <span>Tráfego pago</span>
        </motion.div>

        <ProductWindow />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hm-sidebar { display: none !important; }
          .hm-app { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .hm-kpis { grid-template-columns: repeat(2, 1fr) !important; }
          .hm-body { grid-template-columns: 1fr !important; }
          .hm-hide-sm { display: none !important; }
        }
      `}</style>
    </section>
  );
}
