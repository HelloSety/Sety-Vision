"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, MessageCircle } from "lucide-react";
import { useDevice, type DeviceMode } from "@/lib/demo/device-context";

const OPTIONS: { id: DeviceMode; label: string; icon: typeof Monitor }[] = [
  { id: "desktop",  label: "Desktop",  icon: Monitor },
  { id: "celular",  label: "Celular",  icon: Smartphone },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
];

export function DeviceSwitcher() {
  const { device, setDevice } = useDevice();

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.06]">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = device === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setDevice(opt.id)}
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors duration-200"
            style={{ color: active ? "#fff" : "#6B7280" }}
          >
            {active && (
              <motion.div
                layoutId="device-switcher-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#7C3AED" }}
              />
            )}
            <Icon size={13} style={{ position: "relative" }} />
            <span style={{ position: "relative" }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
