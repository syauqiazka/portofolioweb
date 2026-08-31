"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

interface NavbarProps {
  isReversed: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isReversed, onToggleTheme }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 inset-x-0 z-50 flex justify-center items-center px-4"
    >
      <nav className={`flex items-center gap-4 sm:gap-6 px-6 py-3 rounded-full backdrop-blur-xl border shadow-2xl text-sm transition-all duration-500 ${
        isReversed 
          ? "bg-zinc-950/80 border-zinc-800/80 text-zinc-100" 
          : "bg-white/85 border-amber-200/80 text-zinc-900 shadow-amber-900/10"
      }`}>
        <Link href="#work" className="hover:opacity-70 transition-opacity font-medium">
          Work
        </Link>
        <Link href="#playground" className="hover:opacity-70 transition-opacity font-medium">
          Playground
        </Link>
        <Link href="#about" className="hover:opacity-70 transition-opacity font-medium">
          About
        </Link>

        {/* Status Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-current/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Dynamic Day/Night Toggle Button */}
        <button
          onClick={onToggleTheme}
          title="Tukar Mode Siang/Malam"
          className={`p-2 rounded-full transition-all duration-300 active:scale-90 ${
            isReversed 
              ? "bg-zinc-800 text-amber-400 hover:bg-zinc-700 shadow-inner" 
              : "bg-amber-100 text-amber-700 hover:bg-amber-200 shadow-sm"
          }`}
        >
          {isReversed ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </nav>
    </motion.header>
  );
}