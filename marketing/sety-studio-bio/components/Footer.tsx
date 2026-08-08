"use client";

import { FiInstagram, FiMessageCircle, FiLinkedin } from "react-icons/fi";
import { SiBehance } from "react-icons/si";

const LINKS = [
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/sety.studio/" },
  { icon: SiBehance, label: "Behance", href: "https://www.behance.net/setystudio" },
  { icon: FiMessageCircle, label: "WhatsApp", href: "https://wa.me/5500000000000" },
  { icon: FiLinkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 px-6 py-14 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
        <span className="font-display text-[13px] font-medium tracking-[0.35em] text-white">
          SETY
        </span>

        <div className="flex items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={link.label}
              className="text-text-faint transition-colors hover:text-white"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <span className="text-[12px] text-text-faint">
          © {new Date().getFullYear()} Sety Studio
        </span>
      </div>
    </footer>
  );
}
