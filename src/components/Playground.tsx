"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Volume2, ChevronLeft, ChevronRight } from "lucide-react";

interface PlaygroundProps {
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

const carouselItems = [
  {
    title: "Glassmorphism Panel",
    description: "Eksperimen blur, border, dan depth pada kartu transparan.",
    gradient: "from-sky-500/80 via-indigo-500/80 to-violet-600/80",
  },
  {
    title: "Kinetic Typography",
    description: "Animasi teks responsif terhadap scroll dan hover.",
    gradient: "from-rose-500/80 via-orange-500/80 to-amber-500/80",
  },
  {
    title: "Micro-interaction Kit",
    description: "Koleksi toggle, slider, dan feedback haptic visual.",
    gradient: "from-emerald-500/80 via-teal-500/80 to-cyan-500/80",
  },
  {
    title: "Spatial Navigation",
    description: "Menu 3D dengan depth cue dan transisi halus.",
    gradient: "from-purple-500/80 via-fuchsia-500/80 to-pink-500/80",
  },
  {
    title: "Data Visualization",
    description: "Chart interaktif dengan animasi entry bertahap.",
    gradient: "from-blue-500/80 via-cyan-500/80 to-teal-500/80",
  },
  {
    title: "Dark Mode Tokens",
    description: "Sistem token warna adaptif untuk tema siang-malam.",
    gradient: "from-zinc-600/80 via-zinc-700/80 to-zinc-900/80",
  },
];

export default function Playground({ isDarkTheme = true }: PlaygroundProps) {
  const [blur, setBlur] = useState(12);
  const [glow, setGlow] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const total = carouselItems.length;
  const prevIndex = (carouselIndex - 1 + total) % total;
  const nextIndex = (carouselIndex + 1) % total;

  const goPrev = () => setCarouselIndex((i) => (i - 1 + total) % total);
  const goNext = () => setCarouselIndex((i) => (i + 1) % total);

  return (
    <section id="playground" className="py-20 px-6 max-w-5xl mx-auto relative z-10">
      <motion.div
        className="space-y-3 mb-10"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span
          className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors duration-300 ${
            isDarkTheme ? "text-amber-400" : "text-amber-900"
          }`}
        >
          02 / INTERACTIVE VIGNETTES
        </span>
        <h2
          className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
            isDarkTheme ? "text-white drop-shadow-sm" : "text-zinc-950"
          }`}
        >
          Playground Eksperimen UI
        </h2>
        <p
          className={`max-w-2xl text-base transition-colors duration-300 ${
            isDarkTheme ? "text-zinc-300" : "text-zinc-800 font-medium"
          }`}
        >
          Eksperimen mikro dalam material, pergerakan, dan responsivitas komponen interface secara real-time.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`p-6 rounded-2xl border transition-all duration-500 shadow-2xl backdrop-blur-xl ${
            isDarkTheme
              ? "bg-zinc-900/90 border-zinc-800 text-zinc-100"
              : "bg-white/90 border-amber-200/80 text-zinc-950 shadow-amber-900/10"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold">
              <Sliders className="w-4 h-4 text-emerald-500" />
              Dynamic Material Controller
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono font-medium">
              Interactive
            </span>
          </div>

          <div
            className={`h-40 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden transition-colors ${
              isDarkTheme ? "bg-zinc-950" : "bg-zinc-900 text-white"
            }`}
          >
            <div
              style={{
                filter: `blur(${blur / 2}px)`,
                opacity: glow / 100,
              }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 animate-pulse"
            />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-emerald-400 font-medium bg-black/40 backdrop-blur-xs">
              Blur: {blur}px | Glow: {glow}%
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-1 opacity-90">
                <span>Blur Thickness</span>
                <span>{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 opacity-90">
                <span>Glow Radial</span>
                <span>{glow}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={glow}
                onChange={(e) => setGlow(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`p-6 rounded-2xl border transition-all duration-500 shadow-2xl backdrop-blur-xl flex flex-col justify-between ${
            isDarkTheme
              ? "bg-zinc-900/90 border-zinc-800 text-zinc-100"
              : "bg-white/90 border-amber-200/80 text-zinc-950 shadow-amber-900/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                <Volume2 className="w-4 h-4 text-purple-500" />
                Sound & Haptic Concept
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 font-mono font-medium">
                Audio
              </span>
            </div>

            <div className="h-40 rounded-xl mb-6 flex items-center justify-center gap-1.5 px-4 bg-zinc-950">
              {[40, 70, 25, 90, 50, 80, 30, 60, 100, 45, 75, 35].map((height, i) => (
                <div
                  key={i}
                  style={{ height: isPlaying ? `${height}%` : "20%" }}
                  className={`w-2 rounded-full bg-gradient-to-t from-purple-500 to-indigo-400 transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono opacity-80">Audio Visualizer Waveform</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors bg-zinc-900 hover:bg-zinc-800 text-white"
            >
              {isPlaying ? "Pause Spectrum" : "Play Spectrum"}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        className="mt-20"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative max-w-2xl mx-auto">
          <div className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden">
            {/* Left shadow card */}
            <div
              className={`absolute left-0 w-[45%] aspect-[4/3] rounded-2xl bg-gradient-to-br ${carouselItems[prevIndex].gradient} scale-95 opacity-40 -translate-x-[30%] z-0 shadow-xl`}
            />

            {/* Right shadow card */}
            <div
              className={`absolute right-0 w-[45%] aspect-[4/3] rounded-2xl bg-gradient-to-br ${carouselItems[nextIndex].gradient} scale-95 opacity-40 translate-x-[30%] z-0 shadow-xl`}
            />

            {/* Main card */}
            <div className="relative w-full max-w-md z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`aspect-[4/3] rounded-2xl shadow-2xl bg-gradient-to-br ${carouselItems[carouselIndex].gradient} border ${
                    isDarkTheme ? "border-zinc-700" : "border-amber-200/80"
                  }`}
                />
              </AnimatePresence>
            </div>

            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className={`absolute left-2 md:left-0 z-20 p-2.5 rounded-full backdrop-blur-xl border transition-colors ${
                isDarkTheme
                  ? "bg-zinc-900/80 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
                  : "bg-white/80 border-amber-200/80 text-zinc-900 hover:bg-white"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              aria-label="Next slide"
              className={`absolute right-2 md:right-0 z-20 p-2.5 rounded-full backdrop-blur-xl border transition-colors ${
                isDarkTheme
                  ? "bg-zinc-900/80 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
                  : "bg-white/80 border-amber-200/80 text-zinc-900 hover:bg-white"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-8 space-y-2"
            >
              <p
                className={`text-xs font-mono uppercase tracking-widest transition-colors ${
                  isDarkTheme ? "text-amber-400" : "text-amber-900"
                }`}
              >
                {String(carouselIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <h3
                className={`text-2xl md:text-3xl font-bold transition-colors ${
                  isDarkTheme ? "text-white" : "text-zinc-900"
                }`}
              >
                {carouselItems[carouselIndex].title}
              </h3>
              <p
                className={`text-sm transition-colors ${
                  isDarkTheme ? "text-zinc-400" : "text-zinc-700"
                }`}
              >
                {carouselItems[carouselIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
