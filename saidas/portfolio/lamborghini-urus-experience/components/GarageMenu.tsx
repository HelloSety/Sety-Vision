"use client";

import { motion } from "framer-motion";
import type { CarSpec } from "./scene/CarStage";

export default function GarageMenu({
  cars,
  activeIndex,
  onSelect,
}: {
  cars: CarSpec[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const slots = [...cars, { name: "Em breve", url: "" }, { name: "Em breve", url: "" }];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-10">
      <div className="pointer-events-auto flex gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl">
        {slots.map((car, i) => {
          const disabled = i >= cars.length;
          const active = i === activeIndex;
          return (
            <button
              key={car.name + i}
              data-cursor
              disabled={disabled}
              onClick={() => !disabled && onSelect(i)}
              className={`relative rounded-full px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                disabled
                  ? "cursor-default text-white/25"
                  : active
                    ? "text-black"
                    : "text-white/60 hover:text-white"
              }`}
            >
              {active && !disabled && (
                <motion.span
                  layoutId="garage-menu-active"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{car.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
