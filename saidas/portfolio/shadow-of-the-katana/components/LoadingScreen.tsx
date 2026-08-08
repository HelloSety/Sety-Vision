"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 2000;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-9998 flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg width="220" height="60" viewBox="0 0 220 60" fill="none">
            <motion.line
              x1="10" y1="30" x2="190" y2="30"
              stroke="url(#bladeGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.line
              x1="188" y1="18" x2="188" y2="42"
              stroke="#b0913f"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            />
            <defs>
              <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7a0c14" />
                <stop offset="60%" stopColor="#c7cdd6" />
                <stop offset="100%" stopColor="#f3ede2" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 font-serif text-lg italic tracking-[0.2em] text-white/90"
          >
            Shadow of the Katana
          </motion.div>

          <div className="mt-8 relative h-px w-56 overflow-hidden bg-white/10 sm:w-72">
            <motion.div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-fire to-fire-yellow"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 font-mono text-[10px] tracking-[0.35em] text-mist">
            {String(progress).padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
