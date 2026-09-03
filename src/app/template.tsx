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
// Simple Loading Spinner - Lightweight page transition
// --------------------------------------------------------------------------
function PageLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 600); // 600ms loading time
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Loading Spinner */}
        <motion.div
          className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-zinc-400"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Template Component (Next.js App Router Page Transition)
// --------------------------------------------------------------------------
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const [loaderDone, setLoaderDone] = useState(true);
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
      setLoaderDone(false);
      setShowLoader(true);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // Set dark background immediately when loading starts
  useEffect(() => {
    if (showLoader) {
      document.documentElement.style.backgroundColor = '#02050e';
      return () => {
        document.documentElement.style.backgroundColor = '';
      };
    }
  }, [showLoader]);

  const handleLoaderDone = () => {
    setShowLoader(false);
    setLoaderDone(true);
  };

  return (
    <div className="relative w-full">
      {/* Simple Loading Overlay */}
      <AnimatePresence mode="wait">
        {showLoader && <PageLoader key="page-loader" onDone={handleLoaderDone} />}
      </AnimatePresence>

      {/* Page Content with Smooth Fade */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={
          loaderDone
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
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
