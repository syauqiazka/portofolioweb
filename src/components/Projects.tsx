"use client";

import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  isDarkTheme?: boolean;
}

export default function Projects({ isDarkTheme = false }: ProjectsProps) {
  const projects = [
    {
      title: "Sistem Desain Enterprise",
      category: "Design System & Architecture",
      description: "Membangun sistem desain skala besar yang digunakan oleh 50+ desainer dan developer secara paralel.",
      tags: ["Next.js", "Tailwind CSS", "Figma", "Storybook"],
      link: "#",
    },
    {
      title: "Aplikasi Finansial Modern",
      category: "Product Design & Web App",
      description: "Platform manajemen keuangan dengan visualisasi data real-time dan pengalaman transaksional yang intuitif.",
      tags: ["React", "TypeScript", "Framer Motion", "Recharts"],
      link: "#",
    },
  ];

  return (
    <section id="work" className="py-20 px-6 max-w-5xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="space-y-3 mb-10">
        <span className={`text-xs font-mono uppercase tracking-widest font-semibold transition-colors duration-300 ${
          isDarkTheme ? "text-amber-300" : "text-amber-900"
        }`}>
          01 / Selected Work
        </span>
        <h2 className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
          isDarkTheme ? "text-white" : "text-zinc-900"
        }`}>
          Karya Pilihan
        </h2>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border transition-all duration-500 shadow-xl backdrop-blur-xl flex flex-col justify-between group ${
              isDarkTheme
                ? "bg-zinc-900/80 border-zinc-800 text-zinc-100 hover:border-zinc-700"
                : "bg-white/80 border-amber-200/80 text-zinc-900 shadow-amber-900/5 hover:border-amber-300"
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono opacity-60">
                  {project.category}
                </span>
                <a
                  href={project.link}
                  className="p-2 rounded-full border border-current/20 hover:scale-110 transition-transform"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:underline">
                {project.title}
              </h3>
              <p className={`text-sm mb-6 transition-colors ${
                isDarkTheme ? "text-zinc-400" : "text-zinc-700"
              }`}>
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
                    isDarkTheme
                      ? "bg-zinc-800/60 border-zinc-700/60 text-zinc-300"
                      : "bg-amber-100/60 border-amber-300/60 text-amber-950"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}