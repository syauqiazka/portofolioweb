"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.1 for lighter feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optimized easing
      smoothWheel: true,
      touchMultiplier: 1.2, // Reduced from 1.5 for better responsiveness
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
