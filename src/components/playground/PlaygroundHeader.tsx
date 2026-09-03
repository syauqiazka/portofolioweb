"use client";

import { motion } from "framer-motion";

interface PlaygroundHeaderProps {
  isReversed: boolean;
}

export default function PlaygroundHeader({ isReversed }: PlaygroundHeaderProps) {
  return (
    <header className="mb-20">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`font-mono text-[11px] tracking-[0.22em] uppercase mb-5 ${
          isReversed ? "text-zinc-500" : "text-zinc-400"
        }`}
      >
        03 · selected projects — {new Date().getFullYear()}
      </motion.p>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif leading-[0.95] tracking-tight mb-8"
      >
        <span className="block text-[clamp(3.5rem,9vw,8rem)] font-normal">
          My
        </span>
        <span
          className={`block text-[clamp(3.5rem,9vw,8rem)] font-normal italic ${
            isReversed ? "text-zinc-500" : "text-zinc-300"
          }`}
        >
          Projects.
        </span>
      </motion.h1>

      {/* Sub-description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`text-base sm:text-lg max-w-xl leading-[1.65] font-sans font-normal ${
          isReversed ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        Kumpulan pipeline, model, dan eksperimen yang pernah saya bangun —
        bukan sekadar portofolio, tapi bukti bahwa data yang andal bisa
        mengubah cara bisnis mengambil keputusan.
      </motion.p>

      {/* Horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-10 h-px origin-left ${
          isReversed ? "bg-zinc-800" : "bg-zinc-200"
        }`}
      />
    </header>
  );
}
