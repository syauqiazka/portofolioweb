"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface BackgroundProps {
  isReversed: boolean;
  smoothProgress: MotionValue<number>;
}

export default function DayToNightBackground({ isReversed, smoothProgress }: BackgroundProps) {
  // 1. Layer Siang (Normal: Atas | Reversed: Bawah)
  const dayNormalOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const dayReversedOpacity = useTransform(smoothProgress, [0.7, 1], [0, 1]);

  // 2. Layer Sore / Senja (Dibuat RENTANG LEBAR 15% - 85% agar scrolling cepat TETAP KENA SORENYA)
  const soreOpacity = useTransform(smoothProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);

  // 3. Layer Malam (Normal: Bawah | Reversed: Atas)
  const nightNormalOpacity = useTransform(smoothProgress, [0.7, 1], [0, 1]);
  const nightReversedOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Tentukan opacity Siang & Malam berdasarkan tombol Reverse
  const dayOpacity = isReversed ? dayReversedOpacity : dayNormalOpacity;
  const nightOpacity = isReversed ? nightReversedOpacity : nightNormalOpacity;

  return (
    <>
      {/* LAYER 1: SIANG CERAH */}
      <motion.div 
        style={{ opacity: dayOpacity }}
        className="fixed inset-0 -z-30 bg-gradient-to-b from-[#fef3c7] via-[#fde68a] to-[#f59e0b]/30"
      >
        <div className="absolute top-12 right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 blur-2xl opacity-70" />
        <div className="absolute top-24 right-[15%] w-44 h-44 rounded-full border border-amber-500/20 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-amber-100 shadow-inner" />
        </div>
      </motion.div>

      {/* LAYER 2: SORE / SENJA (Sangat luas di area tengah, scroll cepat pasti terasa) */}
      <motion.div 
        style={{ opacity: soreOpacity }}
        className="fixed inset-0 -z-20 bg-gradient-to-b from-[#fb923c] via-[#f43f5e] to-[#581c87]"
      >
        <div className="absolute top-1/3 right-[12%] w-80 h-80 rounded-full bg-gradient-to-t from-orange-500 to-rose-400 blur-3xl opacity-80 animate-pulse" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
      </motion.div>

      {/* LAYER 3: MALAM GELAP */}
      <motion.div 
        style={{ opacity: nightOpacity }}
        className="fixed inset-0 -z-10 bg-[#070b19] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.5),rgba(255,255,255,0))]"
      >
        {/* Striped Moon */}
        <div className="absolute top-20 right-[10%] w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 shadow-[0_0_50px_rgba(255,255,255,0.3)] overflow-hidden flex flex-col justify-between p-2 opacity-90">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-[#070b19]/30 rounded-full" />
          ))}
        </div>

        {/* Bintang-bintang */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#04060d] to-transparent" />
      </motion.div>
    </>
  );
}