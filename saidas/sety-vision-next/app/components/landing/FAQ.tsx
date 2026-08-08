"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { FAQS as faqs } from "@/lib/faq-data";

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-pad" style={{ background: "#FAFAFB", borderTop: "1px solid #ECECEC" }} ref={ref}>
      <div className="max-w-[1280px] mx-auto px-8">

        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)", color: "#7C3AED" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            Perguntas Frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[clamp(28px,4vw,52px)] font-black tracking-[-1.5px] leading-[1.1]"
            style={{ color: "#111111" }}
          >
            Respondemos antes
            <br />
            <span style={{ color: "#6B7280" }}>de você perguntar</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="rounded-3xl overflow-hidden"
          style={{ border: "1px solid #ECECEC", background: "#FFFFFF" }}
        >
          {faqs.map((faq, i) => (
            <div key={i} className="last:border-0" style={{ borderBottom: i < faqs.length - 1 ? "1px solid #ECECEC" : "none" }}>
              <button
                className="w-full flex items-center justify-between px-9 py-7 text-left transition-colors duration-200 cursor-pointer group"
                style={{ background: open === i ? "#FAFAFB" : "#FFFFFF" }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[16px] font-semibold tracking-[-0.3px] pr-8" style={{ color: "#111111" }}>
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === i ? "rotate-45" : ""}`}
                  style={
                    open === i
                      ? { background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.3)", color: "#7C3AED" }
                      : { background: "#F5F5F5", border: "1px solid #E5E7EB", color: "#6B7280" }
                  }
                >
                  <Plus size={12} />
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-9 pb-7" style={{ background: "#FAFAFB" }}>
                      <p className="text-[15px] leading-[1.75] max-w-[680px]" style={{ color: "#6B7280" }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
