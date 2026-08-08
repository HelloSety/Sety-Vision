"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { CheckCheck, BadgeCheck } from "lucide-react";

/* Alertas reais enviados pelo Sety Vision no WhatsApp do dono do negócio
   quando um lead esquenta — mesmo texto e dados de leads reais captados
   pelo site da Sety Studio, com telefone parcialmente oculto (dado pessoal
   de terceiro). Nada aqui é inventado. */
const ALERTS = [
  {
    nome: "Vitor Kaique",
    telefone: "5562••••0555",
    score: 80,
    status: "novo",
    msg: "Olá! Vim pelo site da Sety Studio e gostaria de um orçamento.",
    hora: "14:57",
  },
  {
    nome: "Lucas",
    telefone: "5544••••8304",
    score: 80,
    status: "qualificado",
    msg: "Quais são os planos e preços?",
    hora: "14:06",
  },
  {
    nome: "Geovane",
    telefone: "5534••••5046",
    score: 80,
    status: "novo",
    msg: "Olá! Vim pelo site da Sety Studio e gostaria de um orçamento.",
    hora: "12:35",
  },
];

function AlertBubble({ a, i, inView }: { a: typeof ALERTS[number]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: EASE }}
      style={{
        borderRadius: 20, background: "#111B21", padding: "14px 14px 16px",
        boxShadow: "0 24px 60px rgba(15,23,42,0.14)", border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Barra de app, estilo topo do WhatsApp */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 2px" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
          🔥
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#E9EDEF" }}>Alertas · Sety Vision</div>
          <div style={{ fontSize: 10.5, color: "#8696A0" }}>notificação automática</div>
        </div>
      </div>

      {/* Bolha de mensagem, verde WhatsApp */}
      <div style={{
        background: "#DCF8C6", borderRadius: "4px 14px 14px 14px", padding: "12px 13px",
        fontSize: 12.5, lineHeight: 1.55, color: "#111B21",
      }}>
        <div style={{ fontWeight: 800, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          🔥 Lead Quente — Ação Necessária
        </div>

        <div style={{ display: "grid", rowGap: 2, marginBottom: 8 }}>
          <div><strong>Contato:</strong> {a.nome}</div>
          <div>
            <strong>Telefone:</strong>{" "}
            <span style={{ color: "#0B7A3D", fontWeight: 700 }}>{a.telefone}</span>
          </div>
          <div><strong>Score:</strong> {a.score}/100</div>
          <div><strong>Status:</strong> {a.status}</div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Última mensagem:</strong>
          <div style={{ fontStyle: "italic" }}>&ldquo;{a.msg}&rdquo;</div>
        </div>

        <div>Acesse o CRM para continuar o atendimento.</div>

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, marginTop: 6 }}>
          <span style={{ fontSize: 10, color: "#667781" }}>{a.hora}</span>
          <CheckCheck size={13} color="#53BDEB" />
        </div>
      </div>
    </motion.div>
  );
}

export function WhatsAppAlerts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="alertas" ref={ref} className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.22)", color: "#16A34A" }}
          >
            <BadgeCheck size={13} /> Alertas reais, enviados pelo próprio sistema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: EASE }}
            style={{ fontSize: "clamp(30px,4.4vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08, color: "#0A0A0A" }}
          >
            Você não fica checando painel.<br />O CRM avisa você.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, ease: EASE }}
            style={{ fontSize: 16, color: "#6E6E73", maxWidth: 520 }}
          >
            Assim que um lead esquenta, o Sety Vision manda um alerta direto no seu WhatsApp — com nome, telefone, score de interesse e a última mensagem. Você clica e já continua o atendimento no CRM.
          </motion.p>
        </div>

        <div className="alerts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 920, margin: "0 auto" }}>
          {ALERTS.map((a, i) => <AlertBubble key={a.nome} a={a} i={i} inView={inView} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) { .alerts-grid { grid-template-columns: 1fr !important; max-width: 380px !important; } }
      `}</style>
    </section>
  );
}
