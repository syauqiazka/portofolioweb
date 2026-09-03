"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  BarChart2,
  Server,
  Code2,
  FlaskConical,
  Cloud,
  Filter,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";

// ── PROJECT DATA ──
const PROJECTS = [
  {
    id: "pipeline-etl",
    title: "Real-time ETL Pipeline",
    subtitle: "Airflow + BigQuery + dbt",
    tags: ["Pipeline", "BigQuery", "Airflow", "dbt"],
    cat: "Data Engineering",
    catColor: "cyan",
    year: "2024",
    status: "Production",
    desc: "Pipeline ingestion & transformasi data transaksi dari 3 sumber berbeda (REST API, PostgreSQL, flat files) ke BigQuery menggunakan Airflow DAG + dbt models. Memproses 2M+ baris per hari.",
    stack: ["Apache Airflow", "dbt", "BigQuery", "Python", "Docker"],
    impact: ["2M+ baris/hari diproses", "Latency turun 60%", "15+ dbt models tertest"],
    link: "#",
    github: "#",
  },
  {
    id: "churn-model",
    title: "Customer Churn Predictor",
    subtitle: "Scikit-learn + Metabase",
    tags: ["ML", "Analytics", "Python"],
    cat: "Analytics & ML",
    catColor: "violet",
    year: "2023",
    status: "Production",
    desc: "Model prediksi churn pelanggan e-commerce dengan fitur RFM, behavioral segmentation, dan Gradient Boosting. Dashboard monitoring akurasi model terintegrasi di Metabase.",
    stack: ["Python", "Scikit-learn", "Pandas", "Metabase", "PostgreSQL"],
    impact: ["Akurasi 82% di test set", "Churn rate turun 18%", "Dashboard real-time eksekutif"],
    link: "#",
    github: "#",
  },
  {
    id: "data-warehouse",
    title: "Enterprise Data Warehouse",
    subtitle: "Dimensional Modeling + Snowflake",
    tags: ["Warehouse", "SQL", "Snowflake"],
    cat: "Data Engineering",
    catColor: "cyan",
    year: "2023",
    status: "Production",
    desc: "Desain skema dimensional (star schema) untuk modul keuangan & operasional perusahaan mid-size. Biaya query BigQuery turun 40% setelah implementasi partitioning dan clustering.",
    stack: ["Snowflake", "dbt", "SQL", "Python", "Looker Studio"],
    impact: ["Query cost -40%", "6 fact tables, 18 dim tables", "3 departemen terlayani"],
    link: "#",
    github: "#",
  },
  {
    id: "sentiment-nlp",
    title: "Sentimen Ulasan Marketplace",
    subtitle: "NLP · Naïve Bayes · TF-IDF",
    tags: ["ML", "NLP", "Python"],
    cat: "Analytics & ML",
    catColor: "violet",
    year: "2020",
    status: "Research",
    desc: "Skripsi: Klasifikasi sentimen 50.000 ulasan produk menggunakan Naïve Bayes dengan TF-IDF feature extraction. Implementasi preprocessing Bahasa Indonesia (stemming, stopwords).",
    stack: ["Python", "NLTK", "Scikit-learn", "Pandas", "Matplotlib"],
    impact: ["78% akurasi klasifikasi", "50K dataset ulasan", "Juara 2 Kompetisi DM Regional"],
    link: "#",
    github: "#",
  },
  {
    id: "dashboard-bi",
    title: "Executive BI Dashboard",
    subtitle: "Metabase + SQL + Looker Studio",
    tags: ["Analytics", "Dashboard", "SQL"],
    cat: "Analytics & Viz",
    catColor: "amber",
    year: "2023",
    status: "Production",
    desc: "Dashboard eksekutif untuk monitoring KPI bisnis real-time: revenue, retention, funnel konversi, dan anomali harian. Mengotomatiskan 25+ laporan Excel manual menjadi pipeline terstruktur.",
    stack: ["Metabase", "Looker Studio", "PostgreSQL", "SQL", "Python"],
    impact: ["25+ laporan manual dihapus", "Dashboard refresh < 5 menit", "4 tim bisnis terlayani"],
    link: "#",
    github: "#",
  },
  {
    id: "portfolio-web",
    title: "Portfolio ini sendiri",
    subtitle: "Next.js · Framer Motion · TypeScript",
    tags: ["Frontend", "Design"],
    cat: "Side Projects",
    catColor: "rose",
    year: "2024",
    status: "Live",
    desc: "Portofolio interaktif dengan transisi halaman Aizen slash, ilustrasi botani dinamis, kinetic typography, dan Web Audio synthesizer — dibangun dari nol tanpa template.",
    stack: ["Next.js 16", "TypeScript", "Framer Motion", "Tailwind CSS"],
    impact: ["Aizen dimensional rift transition", "Day/Night landscape SVG", "Web Audio API synth"],
    link: "/",
    github: "#",
  },
];

const FILTERS = ["All", "Data Engineering", "Analytics & ML", "Analytics & Viz", "Side Projects"];

const CAT_COLORS: Record<string, { dot: string; badge: string; bar: string }> = {
  cyan: {
    dot: "bg-cyan-400",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    bar: "from-cyan-400 to-blue-500",
  },
  violet: {
    dot: "bg-violet-400",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    bar: "from-violet-400 to-purple-500",
  },
  amber: {
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    bar: "from-amber-400 to-orange-500",
  },
  rose: {
    dot: "bg-rose-400",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    bar: "from-rose-400 to-pink-500",
  },
};

const STATUS_STYLE: Record<string, string> = {
  Production: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Research: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Live: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
};

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

        {/* ── PAGE HEADER — deliberately irregular, human editorial ── */}
        <header className="mb-20">
          {/* Eyebrow — small mono, loose tracking */}
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

          {/* Main title — massive serif, tight leading */}
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

          {/* Sub — humanistic, not marketing-speak */}
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

          {/* Horizontal rule — editorial divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-10 h-px origin-left ${
              isReversed ? "bg-zinc-800" : "bg-zinc-200"
            }`}
          />
        </header>

        {/* ── FILTER TABS — mono pill row ── */}
        <div className="flex flex-wrap gap-2 mb-14">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.12em] uppercase border transition-all duration-200 ${
                activeFilter === f
                  ? isReversed
                    ? "bg-white text-zinc-950 border-white font-semibold"
                    : "bg-zinc-900 text-white border-zinc-900 font-semibold"
                  : isReversed
                  ? "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                  : "border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
              }`}
            >
              {f === "All" ? `all (${PROJECTS.length})` : f}
            </button>
          ))}
        </div>

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
            {filtered.map((project, idx) => {
              const colors = CAT_COLORS[project.catColor];
              const isHovered = hovered === project.id;

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative p-8 sm:p-10 border-b transition-colors duration-300 cursor-default ${
                    isReversed
                      ? "border-zinc-800/70 hover:bg-zinc-900/40"
                      : "border-zinc-200 hover:bg-white/60"
                  } ${idx % 2 === 0 ? (isReversed ? "md:border-r md:border-zinc-800/70" : "md:border-r md:border-zinc-200") : ""}`}
                >
                  {/* Top meta row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <span className={`text-[10px] font-mono tracking-[0.18em] uppercase ${isReversed ? "text-zinc-500" : "text-zinc-400"}`}>
                        {project.cat}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border ${STATUS_STYLE[project.status]}`}>
                        {project.status}
                      </span>
                      <span className={`text-[10px] font-mono ${isReversed ? "text-zinc-600" : "text-zinc-400"}`}>
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Title block — mixed typography */}
                  <div className="mb-5">
                    <h2 className={`font-serif text-2xl sm:text-3xl font-normal leading-tight mb-1.5 transition-colors duration-200 ${
                      isHovered
                        ? isReversed ? "text-white" : "text-zinc-950"
                        : isReversed ? "text-zinc-100" : "text-zinc-800"
                    }`}>
                      {project.title}
                    </h2>
                    <p className={`text-[11px] font-mono tracking-[0.1em] ${isReversed ? "text-zinc-500" : "text-zinc-400"}`}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-[1.75] mb-7 ${isReversed ? "text-zinc-400" : "text-zinc-600"}`}>
                    {project.desc}
                  </p>

                  {/* Impact chips */}
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {project.impact.map((imp, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-mono ${
                          isReversed
                            ? "border-zinc-800 bg-zinc-900 text-zinc-400"
                            : "border-zinc-200 bg-zinc-100/80 text-zinc-600"
                        }`}
                      >
                        {imp}
                      </span>
                    ))}
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.stack.map((s, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-mono ${colors.badge}`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Action row */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase group-hover:gap-2.5 transition-all duration-200 ${
                        isReversed ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-800"
                      }`}
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.github}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase transition-colors duration-200 ${
                        isReversed ? "text-zinc-600 hover:text-zinc-400" : "text-zinc-400 hover:text-zinc-700"
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  </div>

                  {/* Hover accent bar — bottom edge */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${colors.bar}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM CTA — editorial, sparse ── */}
        <div className={`mt-20 pt-10 border-t ${isReversed ? "border-zinc-800" : "border-zinc-200"}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <p className={`font-mono text-[11px] tracking-[0.18em] uppercase mb-3 ${isReversed ? "text-zinc-600" : "text-zinc-400"}`}>
                Have a project in mind?
              </p>
              <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Let's build something
                <br />
                <span className={`italic ${isReversed ? "text-zinc-500" : "text-zinc-300"}`}>worth shipping.</span>
              </h3>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="#contact"
                className={`px-6 py-3 rounded-full text-sm font-mono tracking-wider uppercase border transition-all duration-200 hover:-translate-y-0.5 ${
                  isReversed
                    ? "bg-white text-zinc-950 border-white hover:bg-zinc-100"
                    : "bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800"
                }`}
              >
                get in touch
              </a>
              <Link
                href="/about"
                className={`px-6 py-3 rounded-full text-sm font-mono tracking-wider uppercase border transition-all duration-200 hover:-translate-y-0.5 ${
                  isReversed
                    ? "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-400"
                }`}
              >
                about me
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div id="contact" className="mt-20">
        <Footer isDarkTheme={isReversed} />
      </div>
    </div>
  );
}
