"use client";

import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef } from "react";
import {
  Bot, Users, CalendarClock, LayoutDashboard, Plug, BarChart3,
  History, UsersRound, Mic, MessageSquareText, Repeat2,
  CalendarDays, AtSign, Mail, Code2,
} from "lucide-react";

const FEATURES = [
  { icon: Bot,               title: "IA Humanizada",         desc: "Responde no tom da sua empresa, não parece robô." },
  { icon: Users,              title: "CRM",                   desc: "Histórico completo de cada cliente, sempre atualizado." },
  { icon: CalendarClock,      title: "Agendamento",           desc: "Marca reunião ou avaliação direto na conversa." },
  { icon: LayoutDashboard,    title: "Dashboard",             desc: "Métricas da operação em tempo real, num só painel." },
  { icon: Plug,               title: "Integrações",           desc: "Conecta com as ferramentas que sua empresa já usa." },
  { icon: BarChart3,          title: "Relatórios",            desc: "Resultados da semana, sem precisar montar planilha." },
  { icon: History,            title: "Histórico",             desc: "Toda a conversa e negociação salva por cliente." },
  { icon: UsersRound,         title: "Múltiplos atendentes",  desc: "Time inteiro no mesmo número, sem perder contexto." },
  { icon: Mic,                title: "Áudios",                desc: "IA entende e responde também por mensagem de voz." },
  { icon: MessageSquareText,  title: "Mensagens inteligentes",desc: "Respostas contextuais, não fluxo engessado de bot." },
  { icon: Repeat2,            title: "Follow-up automático",  desc: "Reativa quem não respondeu, no tempo certo." },
  { icon: CalendarDays,       title: "Google Agenda",         desc: "Sincronizado com a agenda que você já usa." },
  { icon: AtSign,             title: "Instagram",             desc: "Inbox e comentários gerenciados pela mesma IA." },
  { icon: Mail,               title: "Email",                 desc: "Follow-up e notificações também por e-mail." },
  { icon: Code2,               title: "API",                  desc: "Conecta o sistema a qualquer ferramenta própria." },
];

export function Funcionalidades() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="funcionalidades" ref={ref} className="section-pad" style={{ background: "#FAFAFB", borderTop: "1px solid #ECECEC" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: "#7C3AED" }}>
            Funcionalidades
          </div>
          <h2 className="text-[clamp(32px,4.5vw,58px)] font-black tracking-[-3px] leading-[1] mb-4" style={{ color: "#111111" }}>
            Tudo que sua operação precisa,<br />
            <span style={{ color: "#6B7280" }}>num único sistema.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: (i % 6) * 0.06, ease: EASE }}
              >
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                  className="rounded-2xl p-5 h-full flex items-start gap-4"
                  style={{ background: "#FFFFFF", border: "1px solid #ECECEC" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)" }}>
                    <Icon size={17} style={{ color: "#7C3AED" }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold tracking-[-0.2px] mb-1" style={{ color: "#111111" }}>{f.title}</h3>
                    <p className="text-[13px] leading-[1.55]" style={{ color: "#6B7280" }}>{f.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
