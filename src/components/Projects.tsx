"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  isDarkTheme?: boolean;
}

const headerVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 48, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function DeviceMockup({ type }: { type: "laptop" | "phone" }) {
  if (type === "laptop") {
    return (
      <div className="absolute right-6 md:right-10 bottom-6 md:bottom-8 w-[55%] max-w-xs">
        <div className="rounded-t-lg border border-white/20 bg-zinc-900/80 p-1.5 shadow-2xl backdrop-blur-sm">
          <div className="aspect-[16/10] rounded-sm bg-gradient-to-br from-white/20 to-white/5" />
        </div>
        <div className="h-2 mx-auto w-[90%] rounded-b-md bg-zinc-800/90 border border-t-0 border-white/10" />
      </div>
    );
  }
  return (
    <div className="absolute right-8 bottom-8 w-24 md:w-28">
      <div className="rounded-[1.25rem] border-2 border-white/25 bg-zinc-900/70 p-1 shadow-2xl">
        <div className="aspect-[9/16] rounded-[1rem] bg-gradient-to-b from-white/25 to-white/5" />
      </div>
    </div>
  );
}

export default function Projects({ isDarkTheme = false }: ProjectsProps) {
  const featured = {
    index: "01",
    title: "Sistem Desain Enterprise",
    category: "Design System",
    year: "2025",
    description:
      "Membangun fondasi komponen, token, dan dokumentasi untuk 50+ kontributor lintas tim produk.",
    gradient: "from-violet-700 via-indigo-600 to-blue-700",
    mockup: "laptop" as const,
    link: "#",
  };

  const projects = [
    {
      index: "02",
      title: "Web Kesehatan Mental",
      category: "Web App",
      year: "2024",
      description: "Onboarding empat langkah dan alur konseling yang tenang.",
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
      mockup: "phone" as const,
      link: "#",
    },
    {
      index: "03",
      title: "Dashboard Analytics",
      category: "SaaS",
      year: "2024",
      description: "Visualisasi data real-time untuk tim operasional.",
      gradient: "from-orange-600 via-rose-600 to-pink-700",
      mockup: "laptop" as const,
      link: "#",
    },
    {
      index: "04",
      title: "Mobile Banking UI",
      category: "Fintech",
      year: "2023",
      description: "Redesign alur transfer dan manajemen rekening.",
      gradient: "from-amber-600 via-yellow-600 to-orange-600",
      mockup: "phone" as const,
      link: "#",
    },
  ];

  const cardBase = `group relative block overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
    isDarkTheme ? "border-zinc-800/80" : "border-amber-200/80"
  }`;

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <motion.div
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="space-y-3">
          <span
            className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isDarkTheme ? "text-amber-300" : "text-amber-900"
            }`}
          >
            Selected Work
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
              isDarkTheme ? "text-white" : "text-zinc-900"
            }`}
          >
            Produk yang pernah saya bantu bentuk
          </h2>
        </div>
        <p
          className={`max-w-sm text-sm leading-relaxed ${
            isDarkTheme ? "text-zinc-400" : "text-zinc-700"
          }`}
        >
          Cuplikan proyek lintas disiplin — dari design system hingga aplikasi nol-ke-satu.
        </p>
      </motion.div>

      <motion.div
        className="space-y-6 md:space-y-8"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Featured */}
        <motion.div variants={cardVariants}>
          <Link href={featured.link} className={`${cardBase} aspect-[16/10] md:aspect-[21/9]`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <DeviceMockup type={featured.mockup} />
            <div className="absolute top-5 left-5 flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/30 text-white/90 border border-white/15">
                {featured.index}
              </span>
              <span className="text-xs font-mono text-white/70">{featured.year}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                {featured.category}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mt-2 max-w-xl">
                {featured.title}
              </h3>
              <p className="text-sm md:text-base text-white/75 mt-2 max-w-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {featured.description}
              </p>
            </div>
            <div className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.div key={project.index} variants={cardVariants}>
              <Link href={project.link} className={`${cardBase} aspect-[4/5]`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <DeviceMockup type={project.mockup} />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/30 text-white/80 border border-white/10">
                    {project.index}
                  </span>
                  <span className="text-[10px] font-mono text-white/60">{project.year}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{project.title}</h3>
                  <p className="text-xs text-white/75 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
