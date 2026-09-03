"use client";

import Link from "next/link";

interface PlaygroundCtaProps {
  isReversed: boolean;
}

export default function PlaygroundCta({ isReversed }: PlaygroundCtaProps) {
  return (
    <div className={`mt-20 pt-10 border-t ${isReversed ? "border-zinc-800" : "border-zinc-200"}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div>
          <p
            className={`font-mono text-[11px] tracking-[0.18em] uppercase mb-3 ${
              isReversed ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            Have a project in mind?
          </p>
          <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            Let's build something
            <br />
            <span className={`italic ${isReversed ? "text-zinc-500" : "text-zinc-300"}`}>
              worth shipping.
            </span>
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
  );
}
