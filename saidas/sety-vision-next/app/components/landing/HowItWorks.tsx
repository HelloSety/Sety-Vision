"use client";

import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef } from "react";
import { Search, ClipboardList, Code2, Rocket } from "lucide-react";

const steps = [
  { icon: Search,         title: "Diagnóstico",     desc: "Entendemos sua operação e onde você perde venda.", color: "#7C3AED" },
  { icon: ClipboardList,  title: "Planejamento",    desc: "Definimos a estrutura ideal pro seu negócio.",      color: "#3B82F6" },
  { icon: Code2,          title: "Desenvolvimento", desc: "Construímos site, automação e campanhas.",          color: "#F59E0B" },
  { icon: Rocket,         title: "Entrega",          desc: "Tudo no ar, funcionando e gerando resultado.",      color: "#22C55E" },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" ref={ref} className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)", color: "#7C3AED" }}>
            Como funciona
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-3px] leading-[1]" style={{ color: "#111111" }}>
            Do diagnóstico à entrega.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[27px] left-0 right-0 h-px" style={{ background: "#ECECEC" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    style={{ background: "#FFFFFF", border: `1.5px solid ${s.color}35`, boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <div className="text-[10px] font-bold mb-1 tracking-widest" style={{ color: s.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-[15px] font-black tracking-[-0.3px] mb-1" style={{ color: "#111111" }}>{s.title}</h3>
                  <p className="text-[13px] leading-[1.55]" style={{ color: "#6B7280" }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
