"use client";

import { motion } from "framer-motion";

interface AboutProps {
  isDarkTheme: boolean;
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const experiences = [
  {
    year: "2023 — Sekarang",
    role: "Product Designer & Frontend Developer",
    description: "Merancang alur produk end-to-end dan membangun prototipe interaktif untuk startup teknologi.",
  },
  {
    year: "2021 — 2023",
    role: "UI/UX Designer",
    description: "Memimpin audit usability dan iterasi desain untuk aplikasi web skala menengah.",
  },
  {
    year: "2019 — 2021",
    role: "Visual & Spatial Designer",
    description: "Menerjemahkan prinsip komposisi ruang ke dalam sistem visual digital dan brand identity.",
  },
  {
    year: "2017 — 2019",
    role: "Junior Design Associate",
    description: "Belajar fondasi tipografi, grid, dan storytelling visual di studio kreatif lokal.",
  },
];

export default function About({ isDarkTheme }: AboutProps) {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Kolom Kiri — Teks */}
        <div className="space-y-6">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-3xl md:text-5xl font-bold leading-tight transition-colors duration-700 ${
              isDarkTheme ? "text-white" : "text-zinc-900"
            }`}
          >
            Terbiasa berpikir dalam sistem.{" "}
            <span className={isDarkTheme ? "text-sky-400" : "text-amber-800"}>
              Kini saya merancang produk yang benar-benar dipakai.
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base leading-relaxed transition-colors duration-700 ${
              isDarkTheme ? "text-zinc-300" : "text-zinc-800"
            }`}
          >
            Latar belakang saya berawal dari dunia arsitektur dan desain spasial — di sana saya
            belajar membaca kebutuhan manusia lewat tata letak, cahaya, dan alur pergerakan.
            Ketika beralih ke produk digital, pola berpikir yang sama tetap saya bawa: setiap
            layar adalah ruang yang harus terasa intuitif sebelum terasa cantik.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base leading-relaxed transition-colors duration-700 ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-700"
            }`}
          >
            Saya percaya desain terbaik lahir dari kolaborasi erat dengan engineer dan stakeholder.
            Pendekatan saya: validasi cepat lewat prototipe, dokumentasi yang jelas, dan iterasi
            berdasarkan data — bukan asumsi. Tujuannya sederhana: mengurangi friksi, bukan
            menambah dekorasi.
          </motion.p>
        </div>

        {/* Kolom Kanan — Foto Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-80 md:h-[28rem] w-full"
        >
          {/* Kartu Kiri */}
          <motion.div
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute top-8 left-0 w-36 md:w-44 aspect-[3/4] rounded-xl border shadow-2xl rotate-[-8deg] z-0 -translate-x-2 md:-translate-x-4 bg-gradient-to-br from-sky-400 to-emerald-400 ${
              isDarkTheme ? "border-zinc-700" : "border-amber-200/80"
            }`}
          />

          {/* Kartu Tengah */}
          <motion.div
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute top-4 left-1/2 -translate-x-1/2 w-40 md:w-48 aspect-[3/4] rounded-xl border shadow-2xl rotate-0 z-10 bg-gradient-to-br from-violet-400 to-rose-400 ${
              isDarkTheme ? "border-zinc-700" : "border-amber-200/80"
            }`}
          />

          {/* Kartu Kanan */}
          <motion.div
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute top-10 right-0 w-36 md:w-44 aspect-[3/4] rounded-xl border shadow-2xl rotate-[6deg] z-0 translate-x-2 md:translate-x-4 bg-gradient-to-br from-amber-300 to-orange-400 ${
              isDarkTheme ? "border-zinc-700" : "border-amber-200/80"
            }`}
          />
        </motion.div>
      </div>

      {/* Timeline Pengalaman */}
      <motion.div
        className="mt-20 space-y-0"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={cardVariants}
          className={`pb-2 mb-6 border-b transition-colors duration-700 ${
            isDarkTheme ? "border-zinc-800" : "border-amber-200/80"
          }`}
        >
          <span className={`text-xs font-mono uppercase tracking-widest font-semibold transition-colors duration-300 ${
            isDarkTheme ? "text-amber-400" : "text-amber-900"
          }`}>
            03 / Experience
          </span>
        </motion.div>

        {experiences.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={`py-5 border-t transition-colors duration-500 ${
              isDarkTheme ? "border-zinc-800/80" : "border-current/10"
            }`}
          >
            <span className={`text-xs font-mono transition-colors duration-300 ${
              isDarkTheme ? "text-zinc-500" : "text-zinc-600 opacity-60"
            }`}>
              {item.year}
            </span>
            <h3 className={`font-semibold mt-1 transition-colors duration-300 ${
              isDarkTheme ? "text-zinc-100" : "text-zinc-900"
            }`}>
              {item.role}
            </h3>
            <p className={`text-sm mt-1 transition-colors duration-300 ${
              isDarkTheme ? "text-zinc-400 opacity-80" : "text-zinc-700 opacity-80"
            }`}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
