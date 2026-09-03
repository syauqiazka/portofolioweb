"use client";

import Link from "next/link";

interface AboutCtaProps {
  isReversed: boolean;
}

export default function AboutCta({ isReversed }: AboutCtaProps) {
  return (
    <section className="mb-12">
      <div
        className={`p-10 sm:p-14 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left ${
          isReversed
            ? "bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-indigo-950/40 border-cyan-400/30 text-white"
            : "bg-gradient-to-r from-cyan-100/90 via-white to-blue-100/80 border-cyan-300/80 text-zinc-900 shadow-xl"
        }`}
      >
        <div className="space-y-3 max-w-xl">
          <h3 className="text-2xl sm:text-4xl font-serif font-bold">
            Butuh Data Engineer untuk tim Anda?
          </h3>
          <p className={`text-sm ${isReversed ? "text-zinc-300" : "text-zinc-700"}`}>
            Saya siap membantu membangun pipeline yang andal, data warehouse yang terstruktur,
            dan dashboard yang mudah dipahami oleh seluruh tim.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full text-sm font-semibold bg-cyan-400 text-zinc-950 shadow-lg hover:bg-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Hubungi Saya
          </a>
          <Link
            href="/playground"
            className={`px-6 py-3.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              isReversed ? "border-zinc-700 hover:bg-zinc-800" : "border-cyan-300 hover:bg-cyan-50"
            }`}
          >
            Lihat Playground
          </Link>
        </div>
      </div>
    </section>
  );
}
