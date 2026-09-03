"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import LandscapeDivider from "@/components/LandscapeDivider";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutTabs from "@/components/about/AboutTabs";
import AboutCta from "@/components/about/AboutCta";

export default function AboutPage() {
  const { isReversed } = useTheme();

  return (
    <div
      className={`min-h-screen pt-28 pb-20 transition-colors duration-1000 font-sans relative ${
        isReversed ? "bg-[#060b18] text-[#fff9e9]" : "bg-[#fffdf9] text-zinc-900"
      }`}
    >
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-colors duration-1000 ${
            isReversed ? "bg-cyan-600/30" : "bg-cyan-200/50"
          }`}
        />
        <div
          className={`absolute bottom-1/3 left-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 transition-colors duration-1000 ${
            isReversed ? "bg-indigo-500/20" : "bg-indigo-200/40"
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:48px_48px] opacity-15" />
      </div>

      <main className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 hover:-translate-x-1 ${
              isReversed
                ? "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40"
                : "bg-cyan-50 border-cyan-200 text-zinc-600 hover:text-cyan-900 hover:border-cyan-300"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* ── EDITORIAL HERO & IDENTITY CARD ── */}
        <AboutHero isReversed={isReversed} />

        {/* ── BOTANICAL LANDSCAPE DIVIDER ── */}
        <section className="my-10 -mx-6 sm:-mx-12 md:-mx-16">
          <LandscapeDivider isDarkTheme={isReversed} />
        </section>

        {/* ── IMPACT STATS ── */}
        <AboutStats isReversed={isReversed} />

        {/* ── TABS: STACK / LEARNING / MILESTONES / PRINCIPLES ── */}
        <AboutTabs isReversed={isReversed} />

        {/* ── CTA BANNER ── */}
        <AboutCta isReversed={isReversed} />
      </main>

      <div id="contact">
        <Footer isDarkTheme={isReversed} />
      </div>
    </div>
  );
}
