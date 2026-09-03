"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Sparkles, Mail, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  isReversed?: boolean;
  onToggleTheme?: () => void;
}

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Projects" },
];

export default function Navbar({
  isReversed: propIsReversed,
  onToggleTheme: propOnToggleTheme,
}: NavbarProps) {
  const themeContext = useTheme();
  const isReversed = propIsReversed !== undefined ? propIsReversed : themeContext.isReversed;
  const onToggleTheme = propOnToggleTheme || themeContext.toggleTheme;

  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [clicking, setClicking] = useState<string | null>(null);
  const lastScrollYRef = useRef(0);

  // On compact-to-expanded state reset when route changes
  useEffect(() => {
    setIsCompact(false);
    setClicking(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      // Scroll Down (turun) > 60px -> Navbar mengecil (compact)
      if (currentScrollY > 60 && currentScrollY > lastScrollY) {
        setIsCompact(true);
      }
      // Scroll Up (naik) atau mendekati puncak -> Navbar membesar kembali
      else if (currentScrollY < lastScrollY || currentScrollY <= 40) {
        setIsCompact(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 inset-x-0 z-50 flex justify-center items-center px-4 pointer-events-none"
    >
      <motion.nav
        layout
        onMouseLeave={() => setHovered(null)}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 32,
          mass: 0.8,
        }}
        className={`pointer-events-auto flex items-center rounded-full backdrop-blur-2xl border shadow-2xl transition-colors duration-500 ${
          isReversed
            ? "bg-zinc-950/85 border-zinc-800/90 text-zinc-100 shadow-black/40"
            : "bg-white/85 border-amber-200/80 text-zinc-900 shadow-amber-900/10"
        } ${isCompact ? "px-3.5 py-2 gap-3" : "px-4 sm:px-6 py-2.5 sm:py-3 gap-3 sm:gap-4"}`}
      >
        {/* Avatar / Brand Logo */}
        <Link
          href="/"
          className={`shrink-0 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500 flex items-center justify-center font-bold font-mono transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md ${
            isCompact
              ? "w-8 h-8 text-[10px] border-2 border-white/40"
              : "w-8 sm:w-9 h-8 sm:h-9 text-[11px] border-2 border-white/50"
          } ${isReversed ? "text-zinc-950" : "text-amber-950"}`}
          title="Kembali ke Beranda (Work)"
        >
          SA
        </Link>

        {/* Compact Mode: Available For Work Capsule (Ala Zainab Kabira) */}
        <AnimatePresence mode="wait">
          {isCompact ? (
            <motion.div
              key="compact-content"
              initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
              exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap"
            >
              {/* Status Indicator */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>

              <span className="text-xs font-medium tracking-tight pr-1">
                Available for work
              </span>

              {/* Active Route Pill Badge */}
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                  isReversed
                    ? "bg-zinc-800/80 border-zinc-700 text-amber-300"
                    : "bg-amber-100 border-amber-200 text-amber-900"
                }`}
              >
                {pathname === "/about"
                  ? "About"
                  : pathname === "/playground"
                  ? "Projects"
                  : "Work"}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-1.5 sm:gap-3"
            >
              {/* Navigation Links */}
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => setHovered(link.href)}
                      onClick={() => setClicking(link.href)}
                      className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 select-none ${
                        isActive
                          ? isReversed
                            ? "text-amber-300 font-semibold"
                            : "text-amber-950 font-semibold"
                          : isReversed
                          ? "text-zinc-300 hover:text-white"
                          : "text-zinc-600 hover:text-zinc-950"
                      }`}
                    >
                      {/* Active Background Pill — shared layoutId for smooth cross-link slide */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className={`absolute inset-0 rounded-full border ${
                            isReversed
                              ? "bg-zinc-800/90 border-zinc-700/80 shadow-sm"
                              : "bg-amber-100/90 border-amber-200/80 shadow-sm"
                          }`}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 36,
                            mass: 0.6,
                          }}
                        />
                      )}

                      {/* Hover Pill (non-active links) */}
                      {!isActive && hovered === link.href && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className={`absolute inset-0 rounded-full ${
                            isReversed ? "bg-zinc-800/50" : "bg-amber-100/50"
                          }`}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 38,
                            mass: 0.5,
                          }}
                        />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );

                })}
              </div>

              {/* Separator */}
              <div className="h-4 w-px bg-current/20 shrink-0 mx-0.5" />

              {/* Status Dot / Available */}
              <div
                className="hidden lg:flex items-center gap-2 text-xs opacity-85 px-1 font-mono"
                title="Tersedia untuk proyek baru"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] tracking-tight">Available</span>
              </div>

              {/* Contact CTA Button */}
              <a
                href="#contact"
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isReversed
                    ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Separator when compact or always on right */}
        <div className="h-4 w-px bg-current/20 shrink-0" />

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={
            isReversed
              ? "Ubah ke Mode Terang (Siang)"
              : "Ubah ke Mode Gelap (Malam)"
          }
          className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 active:scale-90 shrink-0 ${
            isReversed
              ? "bg-zinc-800 text-amber-400 hover:bg-zinc-700 shadow-inner"
              : "bg-amber-100 text-amber-700 hover:bg-amber-200 shadow-sm"
          }`}
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode="wait">
            {isReversed ? (
              <motion.span
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Moon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Sun className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>
    </motion.header>
  );
}
