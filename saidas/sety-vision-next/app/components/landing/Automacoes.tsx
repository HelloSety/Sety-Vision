"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { MessageCircle, AtSign, Mail, Repeat2, Receipt, CalendarClock, RotateCcw } from "lucide-react";

const CARDS = [
  { icon: MessageCircle, title: "WhatsApp",     desc: "Atendimento automático com IA no canal que seu cliente já usa.", color: "#22C55E" },
  { icon: AtSign,        title: "Instagram",    desc: "DMs e comentários respondidos pela mesma IA.",                    color: "#EC4899" },
  { icon: Mail,          title: "E-mail",       desc: "Notificações e follow-up também por e-mail.",                     color: "#3B82F6" },
  { icon: Repeat2,       title: "Follow-up",    desc: "Reativa quem não respondeu, no tempo certo.",                     color: "#7C3AED" },
  { icon: Receipt,       title: "Cobrança",     desc: "Lembretes e confirmação de pagamento automáticos.",               color: "#F59E0B" },
  { icon: CalendarClock, title: "Agendamento",  desc: "Marca reunião ou avaliação direto na conversa.",                  color: "#06B6D4" },
  { icon: RotateCcw,     title: "Recuperação",  desc: "Reengaja lead frio com uma nova abordagem automática.",           color: "#EF4444" },
];

export function Automacoes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-pad" style={{ background: "#FAFAFA" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: "#7C3AED" }}>
            Automações
          </div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,56px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#0F172A", marginBottom: 12 }}>
            Todo canal, o mesmo cérebro.
          </h2>
          <p style={{ fontSize: 16, color: "#6E6E73", maxWidth: 460, margin: "0 auto" }}>
            A IA não fica só no WhatsApp — cobre cada ponto de contato com o cliente.
          </p>
        </motion.div>

        <div className="automacoes-scroll" style={{ display: "flex", gap: 16, overflowX: "auto" }}>
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                whileHover={{ y: -4 }}
                style={{
                  flex: "0 0 auto", width: 220, borderRadius: 20, padding: 24,
                  background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)",
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${c.color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon size={20} color={c.color} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>{c.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "#64748B" }}>{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .automacoes-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .automacoes-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
