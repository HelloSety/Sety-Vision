"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "specs", label: "Specs" },
  { id: "gallery", label: "Gallery" },
  { id: "drop", label: "Drop" },
  { id: "contact", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-500 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 transition-all duration-500 sm:px-8 ${
            scrolled ? "glass py-3" : "py-2"
          }`}
          style={{ marginInline: scrolled ? "1rem" : "1.5rem" }}
        >
          <button
            data-cursor
            onClick={() => go("hero")}
            className="font-black text-lg tracking-tight"
          >
            VOLT<span className="text-gradient">°</span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.slice(0, -1).map((link) => (
              <button
                key={link.id}
                data-cursor
                onClick={() => go(link.id)}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-mist transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            data-cursor
            onClick={() => go("drop")}
            className="hidden rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-105 lg:inline-flex"
          >
            Entrar na waitlist
          </button>

          <button
            data-cursor
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="h-px w-6 bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-white"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-450 flex flex-col items-center justify-center gap-8 bg-ink/98 backdrop-blur-2xl lg:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => go(link.id)}
                className="text-3xl font-black uppercase tracking-tight text-white"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
