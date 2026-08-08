"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1500;
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
        }, 300);
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
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 font-black text-3xl tracking-tight"
          >
            VOLT<span className="text-gradient">°</span>
          </motion.div>

          <div className="relative h-px w-64 overflow-hidden bg-white/10 sm:w-80">
            <motion.div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-pink to-violet"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-5 font-mono text-xs tracking-[0.3em] text-mist">
            LOADING {String(progress).padStart(3, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
