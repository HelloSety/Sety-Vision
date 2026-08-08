"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent, type CSSProperties } from "react";
import { MessageCircle, Send } from "lucide-react";
import { openWhatsApp, WA_MSG } from "@/lib/whatsapp";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/Footer";
import { FloatingWhatsApp } from "../components/landing/FloatingWhatsApp";
import { FAQ } from "../components/landing/FAQ";

function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = `Olá! Meu nome é ${name}${company ? `, da empresa ${company}` : ""}.\n\n${message || "Gostaria de saber mais sobre a Sety Vision."}`;
    window.open(openWhatsApp(text), "_blank", "noopener,noreferrer");
  }

  const inputStyle: CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #E5E7EB",
    fontSize: 14.5, color: "#0F172A", background: "#fff", outline: "none",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <input required placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      <input placeholder="Empresa (opcional)" value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
      <textarea placeholder="Como podemos ajudar?" value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
        style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
      <button type="submit" className="btn-primary" style={{ padding: "15px 24px", fontSize: 14.5, border: "none" }}>
        Enviar pelo WhatsApp <Send size={15} />
      </button>
    </form>
  );
}

export default function ContatoClient() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "168px 32px 32px", background: "#FAFAFA", textAlign: "center" }}>
          <div className="container-1280">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge-pill" style={{ marginBottom: 22 }}>Contato</span>
              <h1 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0F172A", margin: "0 0 18px" }}>
                Vamos conversar.
              </h1>
              <p style={{ fontSize: 17, color: "#64748B", maxWidth: 480, margin: "0 auto" }}>
                Resposta rápida, sem formulário burocrático.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-pad" style={{ paddingTop: 32, background: "#FAFAFA" }}>
          <div className="container-1280">
            <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 24 }} className="contato-grid">
              {/* WhatsApp + form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="card-base" style={{ padding: "36px 32px" }}
              >
                <a href={openWhatsApp(WA_MSG.footer)} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderRadius: 16,
                    background: "#25D366", color: "#fff", textDecoration: "none", marginBottom: 28,
                  }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageCircle size={19} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700 }}>Falar agora no WhatsApp</div>
                    <div style={{ fontSize: 12.5, opacity: 0.9 }}>(19) 98809-0110</div>
                  </div>
                </a>

                <div style={{ height: 1, background: "#ECECEC", margin: "0 0 24px" }} />

                <ContactForm />
              </motion.div>

              {/* Mapa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(15,23,42,0.08)", minHeight: 380 }}
              >
                <iframe
                  title="Área de atendimento Sety Vision"
                  src="https://maps.google.com/maps?q=Campinas,SP&z=11&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, minHeight: 380, filter: "grayscale(0.15)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        @media (max-width: 860px) { .contato-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
