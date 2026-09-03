"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  isDarkTheme?: boolean;
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const testimonials = [
  {
    quote:
      "Kolaborasi yang sangat terstruktur. Setiap iterasi desain selalu disertai alasan yang jelas dan prototipe yang bisa langsung diuji tim engineering kami.",
    author: "Rina K.",
    role: "Head of Product",
    initials: "RK",
  },
  {
    quote:
      "Kemampuan menerjemahkan brief yang abstrak menjadi sistem visual yang konsisten benar-benar menghemat waktu sprint kami. Hasil akhirnya terasa matang sejak awal.",
    author: "Dimas P.",
    role: "Engineering Lead",
    initials: "DP",
  },
  {
    quote:
      "Detail interaksi mikro yang dibuat sangat memperhalus pengalaman pengguna. Bukan sekadar tampilan cantik — setiap elemen punya fungsi yang terasa.",
    author: "Sari W.",
    role: "Design Director",
    initials: "SW",
  },
];

export default function Testimonials({ isDarkTheme = true }: TestimonialsProps) {
  return (
    <section
      className={`py-28 px-6 relative z-10 border-y ${
        isDarkTheme
          ? "border-zinc-800/60 bg-zinc-950/50"
          : "border-amber-200/60 bg-amber-50/40"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.3em] ${
              isDarkTheme ? "text-amber-400" : "text-amber-900"
            }`}
          >
            Testimonials
          </span>
          <h2
            className={`text-3xl md:text-5xl font-bold ${
              isDarkTheme ? "text-white" : "text-zinc-900"
            }`}
          >
            In their words
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative p-8 lg:p-10 rounded-2xl border transition-colors ${
                index === 1 ? "md:-translate-y-6" : ""
              } ${
                isDarkTheme
                  ? "bg-zinc-900/70 border-zinc-800"
                  : "bg-white/90 border-amber-200/80 shadow-lg shadow-amber-900/5"
              }`}
            >
              <Quote
                className={`w-8 h-8 mb-5 ${
                  isDarkTheme ? "text-amber-400/30" : "text-amber-800/25"
                }`}
              />
              <p
                className={`text-base leading-relaxed mb-8 ${
                  isDarkTheme ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-current/10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDarkTheme
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {item.initials}
                </div>
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      isDarkTheme ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    {item.author}
                  </p>
                  <p
                    className={`text-xs font-mono mt-0.5 ${
                      isDarkTheme ? "text-zinc-500" : "text-zinc-600"
                    }`}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
