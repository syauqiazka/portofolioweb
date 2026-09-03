"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, User } from "lucide-react";

interface ExploreBannersProps {
  isBottomDark: boolean;
}

export default function ExploreBanners({ isBottomDark }: ExploreBannersProps) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ke Halaman About */}
        <Link
          href="/about"
          className={`group relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between backdrop-blur-xl ${
            isBottomDark
              ? "bg-zinc-900/60 border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-900/80 text-white"
              : "bg-white/70 border-amber-200/80 hover:border-amber-400 hover:bg-white/90 text-zinc-900 shadow-xl shadow-amber-900/5"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
              <User className="w-4 h-4" />
              <span>Mengenal Lebih Dekat</span>
            </div>
            <h3 className="text-2xl font-bold font-serif mb-2 group-hover:text-amber-300 transition-colors">
              Tentang Saya (About)
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isBottomDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Data Engineer dengan latar belakang desain — Python, SQL, dbt, Airflow, BigQuery,
              dan prinsip engineering data yang andal.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 mt-6 group-hover:translate-x-2 transition-transform duration-300">
            <span>Buka Halaman About</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Ke Halaman Playground */}
        <Link
          href="/playground"
          className={`group relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between backdrop-blur-xl ${
            isBottomDark
              ? "bg-zinc-900/60 border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-900/80 text-white"
              : "bg-white/70 border-amber-200/80 hover:border-amber-400 hover:bg-white/90 text-zinc-900 shadow-xl shadow-amber-900/5"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Lab Eksperimen & Interaksi</span>
            </div>
            <h3 className="text-2xl font-bold font-serif mb-2 group-hover:text-rose-300 transition-colors">
              Playground & Creative Lab
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isBottomDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Lab interaktif: Web Audio synth, glassmorphism tweaker, 3D holographic card,
              kinetic typography, dan physics sandbox drag &amp; throw.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-400 mt-6 group-hover:translate-x-2 transition-transform duration-300">
            <span>Eksplorasi Playground</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </section>
  );
}
