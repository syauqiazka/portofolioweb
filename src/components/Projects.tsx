"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, CAT_COLORS, STATUS_STYLE } from "@/data/projectsData";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  isDarkTheme?: boolean;
}

export default function Projects({ isDarkTheme = false }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      // Staggered card reveals
      const cards = cardsRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = PROJECTS[0]; // Real-time ETL Pipeline as featured

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 px-6 max-w-6xl mx-auto relative z-10"
    >
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
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
            Projects & Systems Built
          </h2>
        </div>
        <p
          className={`max-w-sm text-sm leading-relaxed ${
            isDarkTheme ? "text-zinc-400" : "text-zinc-700"
          }`}
        >
          Data pipelines, ML models, warehouses, and analytics dashboards across production environments.
        </p>
      </div>

      <div ref={cardsRef} className="space-y-6 md:space-y-8">
        {/* Featured Project */}
        <Link
          href={featured.link}
          className={`project-card group relative block overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-[16/9] md:aspect-[21/9] ${
            isDarkTheme ? "border-zinc-800/80" : "border-amber-200/80"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${CAT_COLORS[featured.catColor].bar}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="absolute top-5 left-5 flex flex-wrap items-center gap-3">
            <span
              className={`text-xs font-mono px-2.5 py-1 rounded-full border ${STATUS_STYLE[featured.status]}`}
            >
              {featured.status}
            </span>
            <span className="text-xs font-mono text-white/70">{featured.year}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span
              className={`text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                CAT_COLORS[featured.catColor].badge
              }`}
            >
              {featured.cat}
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mt-3 max-w-xl">
              {featured.title}
            </h3>
            <p className="text-sm md:text-base text-white/80 mt-2 max-w-2xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {featured.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {featured.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/90 border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </Link>

        {/* Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.slice(1).map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className={`project-card group relative block overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-[4/5] ${
                isDarkTheme ? "border-zinc-800/80" : "border-amber-200/80"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${CAT_COLORS[project.catColor].bar}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    STATUS_STYLE[project.status]
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-[10px] font-mono text-white/60">{project.year}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    CAT_COLORS[project.catColor].badge
                  }`}
                >
                  {project.cat}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{project.title}</h3>
                <p className="text-xs text-white/70 mt-1">{project.subtitle}</p>
                <p className="text-xs text-white/75 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.desc}
                </p>
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.github !== "#" && (
                    <span className="p-1.5 rounded bg-white/10 border border-white/20">
                      <ExternalLink className="w-3 h-3 text-white" />
                    </span>
                  )}
                  {project.link !== "#" && (
                    <span className="p-1.5 rounded bg-white/10 border border-white/20">
                      <ExternalLink className="w-3 h-3 text-white" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
