"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { ProjectItem, CAT_COLORS, STATUS_STYLE } from "@/data/projectsData";

interface PlaygroundCardProps {
  project: ProjectItem;
  idx: number;
  isReversed: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export default function PlaygroundCard({
  project,
  idx,
  isReversed,
  isHovered,
  onHover,
}: PlaygroundCardProps) {
  const colors = CAT_COLORS[project.catColor];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: idx * 0.07 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className={`group relative p-8 sm:p-10 border-b transition-colors duration-300 cursor-default ${
        isReversed
          ? "border-zinc-800/70 hover:bg-zinc-900/40"
          : "border-zinc-200 hover:bg-white/60"
      } ${
        idx % 2 === 0
          ? isReversed
            ? "md:border-r md:border-zinc-800/70"
            : "md:border-r md:border-zinc-200"
          : ""
      }`}
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <span
            className={`text-[10px] font-mono tracking-[0.18em] uppercase ${
              isReversed ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            {project.cat}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border ${
              STATUS_STYLE[project.status]
            }`}
          >
            {project.status}
          </span>
          <span className={`text-[10px] font-mono ${isReversed ? "text-zinc-600" : "text-zinc-400"}`}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Title block */}
      <div className="mb-5">
        <h2
          className={`font-serif text-2xl sm:text-3xl font-normal leading-tight mb-1.5 transition-colors duration-200 ${
            isHovered
              ? isReversed
                ? "text-white"
                : "text-zinc-950"
              : isReversed
              ? "text-zinc-100"
              : "text-zinc-800"
          }`}
        >
          {project.title}
        </h2>
        <p
          className={`text-[11px] font-mono tracking-[0.1em] ${
            isReversed ? "text-zinc-500" : "text-zinc-400"
          }`}
        >
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
          <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full border font-mono ${colors.badge}`}>
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

      {/* Hover accent bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${colors.bar}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </motion.article>
  );
}
