"use client";

import { motion } from "framer-motion";

interface IntroStripProps {
  isDarkTheme?: boolean;
}

const logos = [
  "Nexus Studio",
  "Orbit Labs",
  "Pixel & Co",
  "Framehaus",
  "Lumen Agency",
  "Gridline",
];

/** Ulangi logo cukup banyak supaya satu grup selalu lebih lebar dari viewport */
const REPEAT_COUNT = 5;

function MarqueeGroup({
  logos: items,
  isDarkTheme,
  ariaHidden = false,
}: {
  logos: string[];
  isDarkTheme: boolean;
  ariaHidden?: boolean;
}) {
  const repeated = Array.from({ length: REPEAT_COUNT }, () => items).flat();

  const pillClass = `px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 ${
    isDarkTheme
      ? "border-zinc-800 bg-zinc-900/50 text-zinc-400"
      : "border-amber-200/80 bg-white/60 text-zinc-700"
  }`;

  return (
    <div
      className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4"
      aria-hidden={ariaHidden}
    >
      {repeated.map((name, i) => (
        <span key={`${name}-${i}`} className={pillClass}>
          {name}
        </span>
      ))}
    </div>
  );
}

export default function IntroStrip({ isDarkTheme = false }: IntroStripProps) {
  return (
    <section id="intro" className="py-20 relative z-10 w-full">
      <div className="px-6">
        <div
          className={`max-w-3xl mx-auto h-px mb-16 ${
            isDarkTheme ? "bg-zinc-800" : "bg-amber-200/80"
          }`}
        />

        <motion.p
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl mx-auto text-center text-lg md:text-xl leading-relaxed text-balance ${
            isDarkTheme ? "text-zinc-300" : "text-zinc-800"
          }`}
        >
          Enam tahun lintas arsitektur dan produk digital — merancang pengalaman yang jelas,
          terukur, dan siap diskalakan.{" "}
          <span className={`font-semibold ${isDarkTheme ? "text-white" : "text-zinc-900"}`}>
            Setiap desain hebat adalah awal dari cerita yang lebih besar.
          </span>
        </motion.p>

        <p
          className={`mt-16 text-center text-[10px] font-mono uppercase tracking-[0.3em] ${
            isDarkTheme ? "text-zinc-500" : "text-zinc-600"
          }`}
        >
          Work featured on
        </p>
      </div>

      {/* Full-bleed marquee — edge to edge di semua ukuran layar */}
      <div className="mt-8 w-full overflow-hidden mask-fade-x">
        <div className="marquee-inner flex w-max">
          <MarqueeGroup logos={logos} isDarkTheme={isDarkTheme} />
          <MarqueeGroup logos={logos} isDarkTheme={isDarkTheme} ariaHidden />
        </div>
      </div>
    </section>
  );
}
