"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/painel";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      setError("Senha incorreta.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA", padding: 24 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 380, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 24, padding: "40px 36px", boxShadow: "0 40px 100px rgba(0,0,0,0.06)" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#0A0A0A", marginBottom: 6, textAlign: "center" }}>
            Bem-vindo à nova forma
            <br />de administrar sua empresa.
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            style={{ padding: "12px 14px", borderRadius: 12, border: error ? "1px solid #EF4444" : "1px solid rgba(0,0,0,0.1)", fontSize: 14, outline: "none" }}
          />
          {error && <span style={{ fontSize: 12.5, color: "#EF4444", marginTop: -4 }}>{error}</span>}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px 16px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "#7C3AED", color: "#fff", fontSize: 14, fontWeight: 700, marginTop: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
            {!loading && <ArrowRight size={15} />}
          </motion.button>
        </form>

        <p style={{ textAlign: "center", fontSize: 11.5, color: "#9CA3AF", marginTop: 20 }}>
          Área restrita — Sety Studio
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
