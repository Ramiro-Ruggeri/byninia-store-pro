"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
};

export default function Marquee({ items }: MarqueeProps) {
  // Lo duplicamos para que el loop sea continuo
  const loopItems = [...items, ...items];

  return (
    // FULL WIDTH aunque esté dentro de un container (max-w / mx-auto)
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="overflow-hidden border-y border-white/10 bg-black/80 backdrop-blur">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex gap-10 md:gap-16 whitespace-nowrap
                     text-xs sm:text-sm md:text-base
                     tracking-[0.25em] uppercase text-zinc-400"
          aria-hidden="true"
        >
          {loopItems.map((t, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>{t}</span>
              {/* separador discreto para UX */}
              <span className="text-zinc-600">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
