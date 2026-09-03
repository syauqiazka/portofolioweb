"use client";

import { motion } from "framer-motion";

interface AboutHeroProps {
  isReversed: boolean;
}

export default function AboutHero({ isReversed }: AboutHeroProps) {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs font-mono text-cyan-500 uppercase tracking-widest"
          >
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25">
              02 · PROFILE & TECH STACK
            </span>
            <span className="h-px w-10 bg-cyan-400/40" />
            <span>DATA ENGINEERING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.06]"
          >
            Membangun{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              infrastruktur data
            </span>{" "}
            yang andal, terukur, dan bermakna.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg sm:text-xl leading-relaxed font-sans ${
              isReversed ? "text-zinc-300" : "text-zinc-700"
            }`}
          >
            Saya M. Syauqi Azka — Data Engineer dengan latar belakang desain visual. Saya percaya
            bahwa pipeline yang bersih, data yang dapat dipercaya, dan dashboard yang didesain
            dengan baik adalah fondasi bisnis yang sesungguhnya berbasis data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Open to new opportunities
            </span>
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono border ${
                isReversed
                  ? "border-zinc-800 bg-zinc-900/60 text-zinc-400"
                  : "border-cyan-200 bg-cyan-50 text-zinc-700"
              }`}
            >
              Python · SQL · dbt · Airflow · BigQuery
            </span>
          </motion.div>
        </div>

        {/* Right Column: Identity Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div
            className={`relative rounded-3xl p-8 border backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
              isReversed
                ? "bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-950/90 border-zinc-800"
                : "bg-gradient-to-br from-white via-[#f0faff] to-cyan-50/80 border-cyan-200/90"
            }`}
          >
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-0.5 shadow-xl flex items-center justify-center font-mono font-bold text-xl text-zinc-950 shrink-0">
                SA
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif leading-tight">M. Syauqi Azka</h3>
                <p className="text-xs font-mono text-cyan-500 tracking-wider uppercase mt-0.5">
                  Data Engineer & Analytics Engineer
                </p>
              </div>
            </div>

            <div
              className={`text-sm leading-relaxed mb-6 ${
                isReversed ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              "Data yang tidak dapat dipercaya lebih berbahaya dari tidak ada data sama sekali.
              Pipeline saya dibangun untuk bisa dipercaya, diuji, dan dimonitor sejak hari pertama."
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-current/10 text-xs font-mono">
              <div>
                <span className="opacity-50 block">LOKASI</span>
                <span className="font-semibold">Jakarta, ID</span>
              </div>
              <div>
                <span className="opacity-50 block">FOKUS UTAMA</span>
                <span className="font-semibold text-cyan-500">Data Pipelines</span>
              </div>
              <div>
                <span className="opacity-50 block">PRIMARY STACK</span>
                <span className="font-semibold">Python + dbt + GCP</span>
              </div>
              <div>
                <span className="opacity-50 block">PARADIGMA</span>
                <span className="font-semibold">Analytics Engineering</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
