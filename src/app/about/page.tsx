"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Database,
  BarChart2,
  Code2,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Layers,
  Cpu,
  Cloud,
  Zap,
  BookOpen,
  TrendingUp,
  Server,
  FlaskConical,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import LandscapeDivider from "@/components/LandscapeDivider";
import Footer from "@/components/Footer";

// ── DATA TOOLS / TECH STACK (grouped by category) ──
const TECH_STACK = [
  {
    category: "Data Processing & Pipelines",
    color: "from-cyan-500 to-blue-600",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    icon: Server,
    tools: [
      { name: "Apache Spark", level: 82, status: "proficient" },
      { name: "Apache Kafka", level: 74, status: "proficient" },
      { name: "Apache Airflow", level: 78, status: "proficient" },
      { name: "dbt (Data Build Tool)", level: 85, status: "expert" },
      { name: "Pandas / Polars", level: 92, status: "expert" },
      { name: "PySpark", level: 80, status: "proficient" },
    ],
  },
  {
    category: "Databases & Data Warehouses",
    color: "from-violet-500 to-purple-600",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    icon: Database,
    tools: [
      { name: "PostgreSQL", level: 90, status: "expert" },
      { name: "BigQuery", level: 84, status: "proficient" },
      { name: "Snowflake", level: 76, status: "proficient" },
      { name: "ClickHouse", level: 70, status: "learning" },
      { name: "Redis", level: 78, status: "proficient" },
      { name: "MongoDB", level: 72, status: "proficient" },
    ],
  },
  {
    category: "Analytics & Visualization",
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    icon: BarChart2,
    tools: [
      { name: "Metabase", level: 88, status: "expert" },
      { name: "Apache Superset", level: 82, status: "proficient" },
      { name: "Looker Studio", level: 86, status: "proficient" },
      { name: "Matplotlib / Seaborn", level: 88, status: "expert" },
      { name: "Plotly / Dash", level: 80, status: "proficient" },
      { name: "Power BI", level: 68, status: "learning" },
    ],
  },
  {
    category: "ML & Statistical Analysis",
    color: "from-rose-500 to-pink-600",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    icon: FlaskConical,
    tools: [
      { name: "Scikit-learn", level: 82, status: "proficient" },
      { name: "NumPy / SciPy", level: 88, status: "expert" },
      { name: "Jupyter Notebook", level: 94, status: "expert" },
      { name: "MLflow", level: 68, status: "learning" },
      { name: "TensorFlow (Basics)", level: 60, status: "learning" },
      { name: "Feature Engineering", level: 80, status: "proficient" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    icon: Cloud,
    tools: [
      { name: "Google Cloud Platform", level: 80, status: "proficient" },
      { name: "Docker", level: 85, status: "proficient" },
      { name: "Kubernetes (basics)", level: 60, status: "learning" },
      { name: "Terraform", level: 65, status: "learning" },
      { name: "AWS S3 / Glue", level: 72, status: "proficient" },
      { name: "Linux / Shell Scripting", level: 88, status: "expert" },
    ],
  },
  {
    category: "Programming Languages",
    color: "from-indigo-500 to-blue-500",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    icon: Code2,
    tools: [
      { name: "Python", level: 94, status: "expert" },
      { name: "SQL (Advanced)", level: 92, status: "expert" },
      { name: "Bash / Shell", level: 85, status: "proficient" },
      { name: "TypeScript / Next.js", level: 80, status: "proficient" },
      { name: "R (Statistical)", level: 62, status: "learning" },
      { name: "Scala (Spark)", level: 58, status: "learning" },
    ],
  },
];

const STATUS_COLORS = {
  expert: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  proficient: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
  learning: "text-amber-400 border-amber-500/40 bg-amber-500/10",
};

const CURRENTLY_LEARNING = [
  { name: "ClickHouse OLAP", icon: "🔴", desc: "Columnar DB untuk analitik real-time skala besar" },
  { name: "Apache Flink", icon: "⚡", desc: "Stream processing stateful untuk event-driven pipeline" },
  { name: "dbt + Snowflake", icon: "❄️", desc: "Advanced data modeling dan data contract patterns" },
  { name: "Kubernetes + Helm", icon: "☸️", desc: "Orkestrasi Spark jobs dan Airflow di k8s cluster" },
  { name: "Rust (pra-eksplorasi)", icon: "🦀", desc: "Untuk sistem data-intensive berkecepatan tinggi" },
  { name: "LLM Data Pipelines", icon: "🤖", desc: "RAG pipeline dan vector database integration" },
];

const MILESTONES = [
  {
    year: "2024 — Sekarang",
    role: "Data Engineer / Analytics Engineer",
    company: "Freelance & Konsultan Data",
    location: "Remote / Jakarta",
    desc: "Merancang dan membangun data pipelines end-to-end: dari ingestion raw data, transformasi dengan dbt, hingga dashboard analytics untuk klien startup dan perusahaan mid-size.",
    highlights: [
      "Membangun 3 pipeline ETL dengan Apache Airflow + BigQuery",
      "Memotong waktu query dashboard 60% dengan materialized views",
      "Implementasi data quality testing dengan dbt + Great Expectations",
    ],
    tags: ["dbt", "BigQuery", "Airflow", "Python", "Metabase"],
  },
  {
    year: "2022 — 2024",
    role: "Data Analyst → Junior Data Engineer",
    company: "Platform Enterprise Cloud",
    location: "Jakarta, ID",
    desc: "Transisi dari peran analyst ke engineering: membangun pipeline otomatisasi laporan, data mart untuk tim bisnis, dan memelihara data warehouse berbasis BigQuery.",
    highlights: [
      "Mengotomatisasi 25+ laporan Excel manual menjadi pipeline Airflow",
      "Mendesain skema data warehouse dimensional untuk modul keuangan",
      "Mengurangi biaya query BigQuery 40% via partitioning dan clustering",
    ],
    tags: ["BigQuery", "Looker Studio", "Python", "SQL", "dbt"],
  },
  {
    year: "2020 — 2022",
    role: "Business Intelligence Analyst",
    company: "Startup E-Commerce",
    location: "Bandung, ID",
    desc: "Menganalisis data transaksi jutaan baris, membuat dashboard eksekutif, dan menjalankan model prediksi churn pelanggan dengan Scikit-learn.",
    highlights: [
      "Membuat model prediksi churn dengan akurasi 82%",
      "Dashboard retention & funnel di Metabase untuk tim product",
    ],
    tags: ["Python", "SQL", "Metabase", "Scikit-learn", "Pandas"],
  },
  {
    year: "2018 — 2020",
    role: "Sarjana Informatika / Sistem Informasi",
    company: "Universitas Teknologi Yogyakarta",
    location: "Yogyakarta, ID",
    desc: "Skripsi: Analisis sentimen ulasan produk marketplace menggunakan Naïve Bayes + TF-IDF. Aktif di komunitas open-source data science kampus.",
    highlights: [
      "Akurasi klasifikasi sentimen 78% pada dataset 50K ulasan",
      "Juara 2 Kompetisi Data Mining Regional 2019",
    ],
    tags: ["Python", "NLP", "Machine Learning", "Research"],
  },
];

const STATS = [
  { value: "50M+", label: "Baris Data Diproses", sub: "Setiap bulan via pipeline produksi" },
  { value: "25+", label: "Pipeline ETL Dibangun", sub: "Airflow, Spark, dbt, & custom scripts" },
  { value: "60%", label: "Percepatan Query", sub: "Partitioning + materialized views" },
  { value: "82%", label: "Model Churn Accuracy", sub: "Scikit-learn + feature engineering" },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Data sebagai Produk, Bukan Artefak",
    desc: "Setiap pipeline, tabel, dan dashboard harus memiliki 'owner', dokumentasi, dan kontrak kualitas yang jelas — layaknya sebuah produk yang melayani pengguna internal.",
    tag: "Data Ownership",
  },
  {
    num: "02",
    title: "Observabilitas Lebih Penting dari Kode",
    desc: "Pipeline yang tidak dapat dimonitor, tidak dapat dipercaya. Setiap langkah harus memiliki logging, alerting, dan data quality checks yang ketat.",
    tag: "Data Quality",
  },
  {
    num: "03",
    title: "Transformasi Deklaratif, Bukan Prosedural",
    desc: "dbt mengajarkan saya bahwa transformasi data terbaik adalah yang mudah dibaca, diuji, dan diaudit — bukan sekedar script Python yang bekerja sekali.",
    tag: "Engineering Craft",
  },
  {
    num: "04",
    title: "Desain Visual Memperkuat Data",
    desc: "Latar belakang desain saya menjadi senjata di bidang data: dashboard yang dirancang dengan prinsip UX yang baik akan dibaca dan dipercaya oleh decision maker.",
    tag: "Data Storytelling",
  },
];

export default function AboutPage() {
  const { isReversed } = useTheme();
  const [activeTab, setActiveTab] = useState<"stack" | "learning" | "milestones" | "principles">("stack");
  const [expandedCat, setExpandedCat] = useState<string | null>("Data Processing & Pipelines");

  return (
    <div
      className={`min-h-screen pt-28 pb-20 transition-colors duration-1000 font-sans relative ${
        isReversed ? "bg-[#060b18] text-[#fff9e9]" : "bg-[#fffdf9] text-zinc-900"
      }`}
    >
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-colors duration-1000 ${isReversed ? "bg-cyan-600/30" : "bg-cyan-200/50"}`} />
        <div className={`absolute bottom-1/3 left-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 transition-colors duration-1000 ${isReversed ? "bg-indigo-500/20" : "bg-indigo-200/40"}`} />
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

        {/* ── EDITORIAL HERO ── */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
                className={`text-lg sm:text-xl leading-relaxed font-sans ${isReversed ? "text-zinc-300" : "text-zinc-700"}`}
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
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono border ${isReversed ? "border-zinc-800 bg-zinc-900/60 text-zinc-400" : "border-cyan-200 bg-cyan-50 text-zinc-700"}`}>
                  Python · SQL · dbt · Airflow · BigQuery
                </span>
              </motion.div>
            </div>

            {/* Identity Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className={`relative rounded-3xl p-8 border backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500 ${isReversed ? "bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-950/90 border-zinc-800" : "bg-gradient-to-br from-white via-[#f0faff] to-cyan-50/80 border-cyan-200/90"}`}>
                <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-0.5 shadow-xl flex items-center justify-center font-mono font-bold text-xl text-zinc-950 shrink-0">
                    SA
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading leading-tight">M. Syauqi Azka</h3>
                    <p className="text-xs font-mono text-cyan-500 tracking-wider uppercase mt-0.5">
                      Data Engineer & Analytics Engineer
                    </p>
                  </div>
                </div>

                <div className={`text-sm leading-relaxed mb-6 ${isReversed ? "text-zinc-300" : "text-zinc-700"}`}>
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

        {/* ── BOTANICAL LANDSCAPE DIVIDER ── */}
        <section className="my-10 -mx-6 sm:-mx-12 md:-mx-16">
          <LandscapeDivider isDarkTheme={isReversed} />
        </section>

        {/* ── IMPACT STATS ── */}
        <section className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
                  isReversed
                    ? "bg-zinc-900/60 border-zinc-800 hover:border-cyan-400/40"
                    : "bg-white/80 border-cyan-200/80 hover:border-cyan-400 shadow-md"
                }`}
              >
                <div className="text-3xl sm:text-5xl font-serif font-bold text-cyan-400 mb-2">{s.value}</div>
                <div className="text-sm font-bold font-heading">{s.label}</div>
                <div className={`text-xs mt-1 ${isReversed ? "text-zinc-400" : "text-zinc-600"}`}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TABS: STACK / LEARNING / MILESTONES / PRINCIPLES ── */}
        <section className="mb-28">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {[
              { id: "stack", label: "🛠️ Tech Stack", icon: Database },
              { id: "learning", label: "📚 Sedang Dipelajari", icon: BookOpen },
              { id: "milestones", label: "🗂️ Pengalaman Karir", icon: GitBranch },
              { id: "principles", label: "🧠 Prinsip Kerja", icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

            {/* ── TAB: TECH STACK ── */}
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
                      {/* Category Header (clickable accordion) */}
                      <button
                        className="w-full p-6 flex items-center justify-between text-left group"
                        onClick={() => setExpandedCat(isOpen ? null : cat.category)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-2xl ${cat.bg} ${cat.text} border ${cat.border}`}>
                            <cat.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold font-heading group-hover:${cat.text} transition-colors`}>
                              {cat.category}
                            </h3>
                            <p className="text-xs font-mono opacity-60">{cat.tools.length} tools · klik untuk detail</p>
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
                          <span className={`text-xs font-mono transition-transform duration-300 ${isOpen ? "rotate-90" : ""} opacity-60`}>
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
                            <div className={`px-6 pb-6 pt-2 border-t ${isReversed ? "border-zinc-800" : "border-cyan-100"}`}>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cat.tools.map((tool, toolIdx) => (
                                  <div key={toolIdx} className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-mono">
                                      <div className="flex items-center gap-2">
                                        <span className={isReversed ? "text-zinc-200" : "text-zinc-800"}>
                                          {tool.name}
                                        </span>
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${STATUS_COLORS[tool.status as keyof typeof STATUS_COLORS]}`}>
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
                    <span key={status} className={`text-xs font-mono px-3 py-1 rounded-full border ${cls} uppercase tracking-wider`}>
                      {status === "expert" ? "⭐ Expert" : status === "proficient" ? "✅ Proficient" : "📖 Learning"}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── TAB: CURRENTLY LEARNING ── */}
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
                      <h3 className="font-bold font-heading text-lg mb-2">{item.name}</h3>
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
                <div className={`p-8 rounded-3xl border text-center ${isReversed ? "bg-cyan-900/20 border-cyan-400/30" : "bg-cyan-50 border-cyan-300"}`}>
                  <div className="text-2xl mb-3">🧑‍💻</div>
                  <h3 className="font-bold font-heading text-xl mb-2">Filosofi Belajar</h3>
                  <p className={`text-sm max-w-xl mx-auto leading-relaxed ${isReversed ? "text-zinc-300" : "text-zinc-700"}`}>
                    Saya mengikuti prinsip <strong className="text-cyan-500">"build to learn"</strong> — setiap teknologi baru dipelajari
                    dengan langsung menggunakannya pada proyek nyata, bukan sekadar tutorial.
                    Saat ini saya aktif mengerjakan side project pipeline streaming dengan Kafka + Flink.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── TAB: MILESTONES (Career Timeline) ── */}
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
                    <div className={`p-7 rounded-3xl border transition-all duration-300 ${isReversed ? "bg-zinc-900/70 border-zinc-800 hover:border-cyan-400/40" : "bg-white/85 border-cyan-200/80 hover:border-cyan-400 shadow-md"}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold font-heading">{m.role}</h3>
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
                          <span key={hIdx} className={`text-xs px-3 py-1 rounded-full flex items-center gap-1.5 ${isReversed ? "bg-zinc-800/80 text-zinc-300" : "bg-cyan-100/70 text-cyan-950"}`}>
                            <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {m.tags.map((tag, tIdx) => (
                          <span key={tIdx} className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${isReversed ? "border-zinc-700 bg-zinc-800 text-cyan-400" : "border-cyan-200 bg-cyan-50 text-cyan-800"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ── TAB: PRINCIPLES ── */}
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
                    <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-cyan-400 transition-colors">
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

        {/* ── CTA BANNER ── */}
        <section className="mb-12">
          <div className={`p-10 sm:p-14 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left ${
            isReversed
              ? "bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-indigo-950/40 border-cyan-400/30 text-white"
              : "bg-gradient-to-r from-cyan-100/90 via-white to-blue-100/80 border-cyan-300/80 text-zinc-900 shadow-xl"
          }`}>
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
      </main>

      <div id="contact">
        <Footer isDarkTheme={isReversed} />
      </div>
    </div>
  );
}
