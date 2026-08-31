"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface HeroProps {
  isDarkTheme: boolean;
}

export default function Hero({ isDarkTheme }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-start pt-32 pb-16 px-6 max-w-5xl mx-auto relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="inline-block">
          <span className={`px-4 py-2 text-xs font-mono rounded-full border backdrop-blur-md transition-all duration-500 flex items-center gap-2 ${
            isDarkTheme 
              ? "bg-zinc-900/60 text-sky-300 border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
              : "bg-amber-100/80 text-amber-950 border-amber-300 shadow-sm"
          }`}>
            <Sparkles className="w-3.5 h-3.5" /> Product Designer & Creative Developer
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-5xl md:text-8xl font-bold tracking-tight leading-[1.05] transition-colors duration-700 ${
            isDarkTheme ? "text-white" : "text-zinc-900"
          }`}
        >
          Building digital products with <span className={isDarkTheme ? "text-sky-400 italic" : "text-amber-800 italic"}>structure</span> & care.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-lg md:text-2xl max-w-2xl font-normal leading-relaxed transition-colors duration-700 ${
            isDarkTheme ? "text-slate-300" : "text-zinc-800"
          }`}
        >
          Menghubungkan estetika desain interaktif, animasi *frame-by-frame*, dan arsitektur kode modern.
        </motion.p>

        <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4">
          <a
            href="#work"
            className={`px-8 py-4 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl ${
              isDarkTheme 
                ? "bg-white text-zinc-950 hover:bg-sky-100" 
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            Explore Selected Work <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}