"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface BackgroundProps {
  isReversed: boolean;
  smoothProgress: MotionValue<number>;
}

// Shooting Stars Component
function ShootingStars() {
  const stars = [
    { delay: 2, duration: 1.5, x: 80, y: 20 },
    { delay: 4, duration: 1.2, x: 60, y: 40 },
    { delay: 6, duration: 1.8, x: 90, y: 30 },
    { delay: 8, duration: 1.3, x: 70, y: 50 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{ x: star.x + '%', y: star.y + '%', opacity: 0 }}
          animate={{
            x: [star.x + '%', star.x - 20 + '%'],
            y: [star.y + '%', star.y + 30 + '%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)',
          }}
        />
      ))}
    </div>
  );
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
      {/* LAYER 1: SIANG CERAH - BEACH & OCEAN */}
      <motion.div 
        style={{ opacity: dayOpacity }}
        className="fixed inset-0 -z-30 bg-gradient-to-b from-[#87CEEB] via-[#98D8E8] to-[#B4E1FF]"
      >
        {/* Sun */}
        <div className="absolute top-12 right-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 blur-xl opacity-90 shadow-[0_0_80px_rgba(255,200,50,0.6)] z-10" />
        
        {/* Ocean waves */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#006994] via-[#0077B6] to-[#0096C7] opacity-60" />
        
        {/* Beach sand */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F4D03F] via-[#F7DC6F] to-transparent opacity-40" />
        
        {/* Clouds */}
        <motion.div
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[15%] w-32 h-12 bg-white/60 rounded-full blur-lg z-10"
        />
        <motion.div
          animate={{ x: [0, -25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[20%] w-40 h-16 bg-white/50 rounded-full blur-xl z-10"
        />
      </motion.div>

      {/* LAYER 2: SORE / SENJA - MOUNTAIN & SUNSET */}
      <motion.div 
        style={{ opacity: soreOpacity }}
        className="fixed inset-0 -z-20 bg-gradient-to-b from-[#fb923c] via-[#f43f5e] to-[#581c87]"
      >
        {/* Enhanced Setting Sun with multiple layers */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-20">
          {/* Sun glow layer */}
          <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-orange-400 to-rose-300 blur-3xl opacity-70 animate-pulse shadow-[0_0_100px_rgba(255,150,50,0.6)]" />
          
          {/* Main sun body */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-t from-orange-500 via-rose-400 to-orange-300 blur-xl opacity-95 shadow-[0_0_80px_rgba(255,100,50,0.7)]" />
          
          {/* Sun core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-t from-yellow-300 to-orange-400 blur-lg opacity-90" />
        </div>
        
        {/* Enhanced Mountain silhouettes */}
        <div className="absolute bottom-0 inset-x-0 h-3/5 z-10">
          <svg className="w-full h-full" viewBox="0 0 1440 480" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mountain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2d2d44" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a1a2e" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="mountain-front-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0f0f1a" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Back mountains - larger and more visible */}
            <path d="M0 480 L180 100 L360 480 L540 140 L720 480 L900 120 L1080 480 L1260 160 L1440 480 Z" 
                  fill="url(#mountain-grad)" opacity="0.85" />
            {/* Middle mountains */}
            <path d="M0 480 L120 180 L240 480 L360 200 L480 480 L600 170 L720 480 L840 190 L960 480 L1080 180 L1200 480 L1320 200 L1440 480 Z" 
                  fill="#252538" opacity="0.9" />
            {/* Front mountains - more detailed */}
            <path d="M0 480 L80 220 L160 480 L240 240 L320 480 L400 210 L480 480 L560 230 L640 480 L720 200 L800 480 L880 220 L960 480 L1040 210 L1120 480 L1200 240 L1280 480 L1360 220 L1440 480 Z" 
                  fill="url(#mountain-front-grad)" opacity="0.95" />
          </svg>
        </div>
        
        {/* Enhanced sunset glow */}
        <div className="absolute top-1/4 left-0 right-0 h-32 bg-gradient-to-b from-orange-300/40 via-rose-400/30 to-transparent z-10" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200/80 to-transparent z-10" />
      </motion.div>

      {/* LAYER 3: MALAM GELAP - STARRY NIGHT */}
      <motion.div 
        style={{ opacity: nightOpacity }}
        className="fixed inset-0 -z-10 bg-[#070b19] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.5),rgba(255,255,255,0))]"
      >
        {/* Striped Moon */}
        <div className="absolute top-20 right-[10%] w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 shadow-[0_0_50px_rgba(255,255,255,0.3)] overflow-hidden flex flex-col justify-between p-2 opacity-90 z-20">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-[#070b19]/30 rounded-full" />
          ))}
        </div>

        {/* Static Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:28px_28px] opacity-40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,235,170,0.7)_1.5px,transparent_1.5px)] [background-size:52px_52px] opacity-50 z-10" />
        
        {/* Shooting Stars */}
        <ShootingStars />
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#04060d] to-transparent z-10" />
      </motion.div>
    </>
  );
}