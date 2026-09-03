"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import PlaygroundHeader from "@/components/playground/PlaygroundHeader";
import PlaygroundFilter from "@/components/playground/PlaygroundFilter";
import PlaygroundCard from "@/components/playground/PlaygroundCard";
import PlaygroundCta from "@/components/playground/PlaygroundCta";
import { PROJECTS, FILTERS } from "@/data/projectsData";

export default function ProjectsPage() {
  const { isReversed } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === activeFilter);

  return (
    <div
      className={`min-h-screen pt-28 pb-24 transition-colors duration-1000 font-sans relative ${
        isReversed ? "bg-[#060b18] text-[#f4f0e8]" : "bg-[#f7f4ef] text-[#141210]"
      }`}
    >
      {/* ── BG GRAIN + AMBIENT ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className={`absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 ${
            isReversed ? "bg-cyan-500/30" : "bg-cyan-300/40"
          }`}
        />
        <div
          className={`absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 ${
            isReversed ? "bg-indigo-500/20" : "bg-indigo-200/40"
          }`}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* ── BACK LINK ── */}
        <div className="mb-12">
          <Link
            href="/"
            className={`group inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-all duration-200 hover:-translate-x-1 ${
              isReversed
                ? "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                : "border-zinc-300 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400"
            }`}
          >
            <ArrowLeft className="w-3 h-3" />
            back to work
          </Link>
        </div>

        {/* ── PAGE HEADER ── */}
        <PlaygroundHeader isReversed={isReversed} />

        {/* ── FILTER TABS ── */}
        <PlaygroundFilter
          filters={FILTERS}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          totalCount={PROJECTS.length}
          isReversed={isReversed}
        />

        {/* ── PROJECT GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
          >
            {filtered.map((project, idx) => (
              <PlaygroundCard
                key={project.id}
                project={project}
                idx={idx}
                isReversed={isReversed}
                isHovered={hovered === project.id}
                onHover={setHovered}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM CTA ── */}
        <PlaygroundCta isReversed={isReversed} />
      </main>

      <div id="contact" className="mt-20">
        <Footer isDarkTheme={isReversed} />
      </div>
    </div>
  );
}
