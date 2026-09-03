"use client";

import { motion } from "framer-motion";
import { STATS } from "@/data/aboutData";

interface AboutStatsProps {
  isReversed: boolean;
}

export default function AboutStats({ isReversed }: AboutStatsProps) {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
              isReversed
                ? "bg-zinc-900/60 border-zinc-800 hover:border-cyan-400/40"
                : "bg-white/80 border-cyan-200/80 hover:border-cyan-400 shadow-md"
            }`}
          >
            <div className="text-3xl sm:text-5xl font-serif font-bold text-cyan-400 mb-2">
              {s.value}
            </div>
            <div className="text-sm font-bold font-serif">{s.label}</div>
            <div className={`text-xs mt-1 ${isReversed ? "text-zinc-400" : "text-zinc-600"}`}>
              {s.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
