"use client";

import { useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import DayToNightBackground from "@/components/DayToNightBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Playground from "@/components/Playground";
import Footer from "@/components/Footer";

export default function Home() {
  const [isReversed, setIsReversed] = useState(false);

  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  // Logika posisi yang benar:
  // Bagian ATAS (Hero): Gelap kalau tombol diklik (isReversed = true)
  const isTopDark = isReversed;

  // Bagian BAWAH (Playground & Footer): Gelap secara standar (isReversed = false -> Malam)
  const isBottomDark = !isReversed;

  return (
    <div className="relative min-h-screen selection:bg-amber-400 selection:text-zinc-900 overflow-x-hidden font-sans">
      {/* Background Komponen */}
      <DayToNightBackground 
        isReversed={isReversed} 
        smoothProgress={smoothProgress} 
      />

      {/* Floating Navbar */}
      <Navbar 
        isReversed={isReversed} 
        onToggleTheme={() => setIsReversed(!isReversed)} 
      />

      {/* Main Content */}
      <main>
        {/* Atas: Mengikuti tema Atas */}
        <Hero isDarkTheme={isTopDark} />

        {/* Tengah (Sore/Senja): Menggunakan kontras terang agar terbaca di atas warna senja */}
        <Projects isDarkTheme={true} />

        {/* Bawah (Malam): Mengikuti tema Bawah */}
        <Playground isDarkTheme={isBottomDark} />
        <Footer isDarkTheme={isBottomDark} />
      </main>
    </div>
  );
}