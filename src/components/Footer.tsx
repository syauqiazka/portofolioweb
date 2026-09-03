"use client";

import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  isDarkTheme?: boolean;
}

export default function Footer({ isDarkTheme = false }: FooterProps) {
  return (
    <footer
      className={`relative z-10 transition-colors duration-500 ${
        isDarkTheme ? "text-zinc-300 bg-zinc-950/70" : "text-zinc-900 bg-amber-100/30"
      }`}
    >
      <div className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto space-y-8">
        <h2
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance ${
            isDarkTheme ? "text-white" : "text-zinc-900"
          }`}
        >
          Punya proyek menarik?{" "}
          <span className={isDarkTheme ? "text-amber-400" : "text-amber-800"}>
            Mari ngobrol.
          </span>
        </h2>
        <a
          href="mailto:hello@portfolio.dev"
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-[1.03] ${
            isDarkTheme
              ? "bg-white text-zinc-950 hover:bg-amber-100"
              : "bg-zinc-900 text-white hover:bg-zinc-800"
          }`}
        >
          hello@portfolio.dev
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <blockquote
          className={`pt-8 text-sm md:text-base italic ${
            isDarkTheme ? "text-zinc-500" : "text-zinc-600"
          }`}
        >
          &ldquo;Tuhan ada di dalam detail.&rdquo;
          <footer className="mt-2 text-xs font-mono not-italic uppercase tracking-widest">
            — Mies van der Rohe
          </footer>
        </blockquote>
      </div>

      <div className="w-full leading-[0]">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16"
          aria-hidden="true"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            className={isDarkTheme ? "fill-zinc-900" : "fill-amber-200/60"}
          />
        </svg>
      </div>

      <div
        className={`px-6 py-6 border-t ${
          isDarkTheme ? "border-zinc-800/80" : "border-amber-900/15"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} — Designed & Built with care.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/syauqiazka/"
              className="hover:underline transition-opacity hover:opacity-70"
            >
              Github
            </a>
            <a href="#" className="hover:underline transition-opacity hover:opacity-70">
              LinkedIn
            </a>
            <a href="#" className="hover:underline transition-opacity hover:opacity-70">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
