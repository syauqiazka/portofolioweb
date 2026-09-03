"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Route labels
const ROUTE_LABELS: Record<string, string> = {
  "/": "Work",
  "/about": "About",
  "/playground": "My Projects",
};

// --------------------------------------------------------------------------
// Shinji Hirako Dimensional Pull (Bleach)
// Terinspirasi dari adegan ikonik Shinji Hirako mencengkeram ruang hampa di langit
// dan menarik tirai dimensi ke samping secara fisik seperti kaca/kain dimensi.
// --------------------------------------------------------------------------
function ShinjiDimensionalPull({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"grip" | "pull" | "snap" | "done">("grip");

  useEffect(() => {
    // Fase 1: Grip - jari mencengkeram udara, riak distorsi ruang muncul
    const t1 = setTimeout(() => setPhase("pull"), 220);
    // Fase 2: Pull - dimensi ditarik melengkung ke samping
    const t2 = setTimeout(() => setPhase("snap"), 750);
    // Fase 3: Selesai - tirai dimensi terlepas dan membuka penuh
    const t3 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 1050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
      {/* ── 1. THE DIMENSIONAL FABRIC (Yang ditarik Shinji dari kanan ke kiri) ── */}
      <motion.div
        className="absolute inset-0 origin-right"
        initial={{ x: 0 }}
        animate={
          phase === "grip"
            ? { x: 0 }
            : phase === "pull"
            ? {
                x: "-65vw",
                transition: { duration: 0.52, ease: [0.32, 0, 0.24, 1] },
              }
            : phase === "snap"
            ? {
                x: "-125vw",
                transition: { duration: 0.3, ease: [0.7, 0, 1, 1] },
              }
            : { x: "-125vw" }
        }
      >
        {/* Lapisan Tirai Dimensi — Tekstur Ruang Kosmik Dalam */}
        <div className="w-full h-full relative bg-gradient-to-r from-[#030611] via-[#081126] to-[#040817] shadow-[-20px_0_60px_rgba(0,0,0,0.9)]">
          {/* Garis-garis lipatan ruang (spatial creases) saat ditarik */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(34,211,238,0.03)_61px,transparent_62px)] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_50%,rgba(56,189,248,0.15),transparent_70%)]" />
        </div>

        {/* ── 2. SEAM / PINGGIRAN DIMENSI YANG DICENGKERAM (LEADING EDGE) ── */}
        <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none">
          {/* Lengkungan fisik tarikan tangan (Grip Bow) */}
          <svg
            className="absolute top-0 right-0 h-full w-24 overflow-visible"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="edge-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
              </linearGradient>
              <filter id="seam-blur">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>

            {/* Garis tepian melengkung seperti ditarik tangan di titik tengah (Y: 500) */}
            <path
              d="M 100 0 Q 30 500 100 1000"
              stroke="url(#edge-glow)"
              strokeWidth="4"
              fill="none"
              filter="url(#seam-blur)"
            />
            <path
              d="M 100 0 Q 35 500 100 1000"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Kilau Garis Vertikal */}
          <div className="absolute right-0 inset-y-0 w-1 bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_25px_#38bdf8]" />
        </div>

        {/* ── 3. TITIK CENGKERAMAN TANGAN SHINJI (GRIP FOCAL POINT) ── */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Gelombang Tekanan Ruang (Spatial Grip Ripple) */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={
              phase === "grip"
                ? { scale: [0.5, 1.4, 1.1], opacity: [0.8, 1, 0.9] }
                : phase === "pull"
                ? { scale: 1.6, opacity: 0.7 }
                : { scale: 2.2, opacity: 0 }
            }
            transition={{ duration: 0.35 }}
            className="w-28 h-28 rounded-full border-2 border-cyan-300/80 bg-cyan-400/20 blur-sm shadow-[0_0_40px_#22d3ee]"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={
              phase === "grip"
                ? { scale: [0, 1.8, 1.3] }
                : { scale: 2.4, opacity: 0 }
            }
            transition={{ duration: 0.45 }}
            className="absolute w-44 h-44 rounded-full border border-white/60"
          />

          {/* Label Indikator Dimensi — ala Shinji Visored */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-12 px-3 py-1 rounded-full bg-black/70 border border-cyan-400/40 text-[10px] font-mono tracking-widest text-cyan-300 uppercase whitespace-nowrap backdrop-blur-md shadow-lg"
          >
            Dimensional Shift · Hirako
          </motion.div>
        </div>
      </motion.div>

      {/* ── 4. KILATAN CAHAYA DIMENSI BARU (Flash saat terbuka) ── */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={
          phase === "pull"
            ? { opacity: [0, 0.15, 0], transition: { duration: 0.4 } }
            : { opacity: 0 }
        }
      />
    </div>
  );
}

// --------------------------------------------------------------------------
// Template Component (Next.js App Router Page Transition)
// --------------------------------------------------------------------------
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showRift, setShowRift] = useState(false);
  const [riftDone, setRiftDone] = useState(true);
  const prevPathRef = useRef<string | null>(null);
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      prevPathRef.current = pathname;
      return;
    }

    if (prevPathRef.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setRiftDone(false);
      setShowRift(true);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  const handleRiftDone = () => {
    setShowRift(false);
    setRiftDone(true);
  };

  return (
    <div className="relative w-full">
      {/* Shinji Dimensional Pull Overlay */}
      <AnimatePresence>
        {showRift && <ShinjiDimensionalPull key="shinji-pull" onDone={handleRiftDone} />}
      </AnimatePresence>

      {/* Konten Halaman Baru yang Tersingkap di Belakang Tarikan */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
        animate={
          riftDone
            ? {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.55,
                  delay: 0.05,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
            : {}
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
