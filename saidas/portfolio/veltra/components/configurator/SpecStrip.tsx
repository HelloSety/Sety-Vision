"use client";

import { FiClock, FiZap, FiActivity, FiTrendingUp, FiDroplet } from "react-icons/fi";
import type { CarConfig } from "../scene/CarModel";

export default function SpecStrip({ specs }: { specs: CarConfig["specs"] }) {
  const items = [
    { icon: FiClock, value: specs.zeroTo100, label: "0 – 100 km/h" },
    { icon: FiZap, value: specs.power, label: "Potência máxima" },
    { icon: FiActivity, value: specs.torque, label: "Torque máximo" },
    { icon: FiTrendingUp, value: specs.topSpeed, label: "Velocidade máxima" },
    { icon: FiDroplet, value: specs.consumption, label: "Consumo combinado" },
  ];

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-y-8 border-y border-ink/8 px-6 py-8 sm:grid-cols-5 sm:gap-y-0 sm:px-10">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <item.icon className="h-4 w-4 flex-shrink-0 text-mist" />
          <div>
            <div className="text-[15px] leading-none text-ink">{item.value}</div>
            <div className="mt-1 text-[11px] leading-none text-mist">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
