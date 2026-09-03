"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  BookOpen,
  GitBranch,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import {
  TECH_STACK,
  STATUS_COLORS,
  CURRENTLY_LEARNING,
  MILESTONES,
  PRINCIPLES,
} from "@/data/aboutData";

interface AboutTabsProps {
  isReversed: boolean;
}

export default function AboutTabs({ isReversed }: AboutTabsProps) {
  const [activeTab, setActiveTab] = useState<"stack" | "learning" | "milestones" | "principles">("stack");
  const [expandedCat, setExpandedCat] = useState<string | null>("Data Processing & Pipelines");

  const tabButtons = [
    { id: "stack", label: "🛠️ Tech Stack", icon: Database },
    { id: "learning", label: "📚 Sedang Dipelajari", icon: BookOpen },
    { id: "milestones", label: "🗂️ Pengalaman Karir", icon: GitBranch },
    { id: "principles", label: "🧠 Prinsip Kerja", icon: Sparkles },
  ] as const;

  return (
    <section className="mb-28">
      {/* ── TAB BUTTONS ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
        {tabButtons.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab.id
                ? isReversed
                  ? "bg-cyan-400 text-zinc-950 font-bold shadow-lg shadow-cyan-400/20 scale-105"
                  : "bg-zinc-900 text-white font-bold shadow-lg scale-105"
                : isReversed
                ? "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                : "bg-cyan-100/60 text-zinc-600 hover:text-zinc-950 border border-cyan-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── TAB 1: TECH STACK ── */}
        {activeTab === "stack" && (
          <motion.div
            key="tab-stack"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {TECH_STACK.map((cat, catIdx) => {
              const isOpen = expandedCat === cat.category;
              return (
                <div
                  key={catIdx}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isReversed ? "bg-zinc-900/60 border-zinc-800" : "bg-white/80 border-cyan-200/80 shadow-sm"
                  }`}
                >
                  {/* Category Header */}
                  <button
                    className="w-full p-6 flex items-center justify-between text-left group"
                    onClick={() => setExpandedCat(isOpen ? null : cat.category)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-2xl ${cat.bg} ${cat.text} border ${cat.border}`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold font-serif group-hover:${cat.text} transition-colors`}>
                          {cat.category}
                        </h3>
                        <p className="text-xs font-mono opacity-60">
                          {cat.tools.length} tools · klik untuk detail
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Mini level bars preview */}
                      <div className="hidden sm:flex gap-1 items-end h-6">
                        {cat.tools.slice(0, 6).map((t, i) => (
                          <div
                            key={i}
                            className={`w-1.5 rounded-sm bg-gradient-to-t ${cat.color}`}
                            style={{ height: `${(t.level / 100) * 24}px`, opacity: 0.7 + i * 0.04 }}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-xs font-mono transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        } opacity-60`}
                      >
                        ▶
                      </span>
                    </div>
                  </button>

                  {/* Expanded Tool List */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`px-6 pb-6 pt-2 border-t ${
                            isReversed ? "border-zinc-800" : "border-cyan-100"
                          }`}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cat.tools.map((tool, toolIdx) => (
                              <div key={toolIdx} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <div className="flex items-center gap-2">
                                    <span className={isReversed ? "text-zinc-200" : "text-zinc-800"}>
                                      {tool.name}
                                    </span>
                                    <span
                                      className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                                        STATUS_COLORS[tool.status as keyof typeof STATUS_COLORS]
                                      }`}
                                    >
                                      {tool.status}
                                    </span>
                                  </div>
                                  <span className={cat.text}>{tool.level}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${tool.level}%` }}
                                    transition={{ duration: 0.6, delay: toolIdx * 0.05, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Legend */}
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              {Object.entries(STATUS_COLORS).map(([status, cls]) => (
                <span
                  key={status}
                  className={`text-xs font-mono px-3 py-1 rounded-full border ${cls} uppercase tracking-wider`}
                >
                  {status === "expert" ? "⭐ Expert" : status === "proficient" ? "✅ Proficient" : "📖 Learning"}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: CURRENTLY LEARNING ── */}
        {activeTab === "learning" && (
          <motion.div
            key="tab-learning"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {CURRENTLY_LEARNING.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isReversed
                      ? "bg-zinc-900/60 border-zinc-800 hover:border-cyan-400/40"
                      : "bg-white/80 border-cyan-200/80 hover:border-cyan-400 shadow-md"
                  }`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold font-serif text-lg mb-2">{item.name}</h3>
                  <p className={`text-sm leading-relaxed ${isReversed ? "text-zinc-400" : "text-zinc-600"}`}>
                    {item.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    <TrendingUp className="w-3 h-3" />
                    <span>Aktif Dipelajari</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Learning Philosophy Banner */}
            <div
              className={`p-8 rounded-3xl border text-center ${
                isReversed ? "bg-cyan-900/20 border-cyan-400/30" : "bg-cyan-50 border-cyan-300"
              }`}
            >
              <div className="text-2xl mb-3">🧑‍💻</div>
              <h3 className="font-bold font-serif text-xl mb-2">Filosofi Belajar</h3>
              <p
                className={`text-sm max-w-xl mx-auto leading-relaxed ${
                  isReversed ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                Saya mengikuti prinsip <strong className="text-cyan-500">"build to learn"</strong> — setiap teknologi baru dipelajari
                dengan langsung menggunakannya pada proyek nyata, bukan sekadar tutorial.
                Saat ini saya aktif mengerjakan side project pipeline streaming dengan Kafka + Flink.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: MILESTONES (Career Timeline) ── */}
        {activeTab === "milestones" && (
          <motion.div
            key="tab-milestones"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-400/40 before:to-transparent"
          >
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="relative pl-12 group">
                <div className="absolute left-2.5 top-3 w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-black/80 shadow-md group-hover:scale-125 transition-transform" />
                <div
                  className={`p-7 rounded-3xl border transition-all duration-300 ${
                    isReversed
                      ? "bg-zinc-900/70 border-zinc-800 hover:border-cyan-400/40"
                      : "bg-white/85 border-cyan-200/80 hover:border-cyan-400 shadow-md"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold font-serif">{m.role}</h3>
                    <span className="text-xs font-mono text-cyan-500 font-semibold px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                      {m.year}
                    </span>
                  </div>
                  <div className={`text-xs font-mono mb-4 ${isReversed ? "text-zinc-400" : "text-zinc-600"}`}>
                    {m.company} · {m.location}
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isReversed ? "text-zinc-300" : "text-zinc-700"}`}>
                    {m.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {m.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className={`text-xs px-3 py-1 rounded-full flex items-center gap-1.5 ${
                          isReversed ? "bg-zinc-800/80 text-zinc-300" : "bg-cyan-100/70 text-cyan-950"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                          isReversed
                            ? "border-zinc-700 bg-zinc-800 text-cyan-400"
                            : "border-cyan-200 bg-cyan-50 text-cyan-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── TAB 4: PRINCIPLES ── */}
        {activeTab === "principles" && (
          <motion.div
            key="tab-principles"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PRINCIPLES.map((p, idx) => (
              <div
                key={idx}
                className={`group p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
                  isReversed
                    ? "bg-zinc-900/50 border-zinc-800 hover:border-cyan-400/50 hover:bg-zinc-900/80"
                    : "bg-white/80 border-cyan-200/80 hover:border-cyan-400/80 hover:bg-white shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-serif text-cyan-400 font-bold">{p.num}</span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border border-cyan-400/30 text-cyan-500">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isReversed ? "text-zinc-300" : "text-zinc-700"}`}>
                  {p.desc}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
