"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, MapPin, ChevronDown, Sparkles, Sun, Moon } from "lucide-react";

interface HeroProps {
  isDarkTheme: boolean;
}

const ROLLING_WORDS = ["Builds", "Creates", "Innovates", "Pipelines", "Automates", "Analyzes", "Optimizes", "Delivers"];

export default function Hero({ isDarkTheme }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSec, setPlaybackSec] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);

  // Cycle the rolling word
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROLLING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Track playback time when cassette plays
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSec((prev) => (prev >= 120 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Audio synthesis feedback when user presses play
  const togglePlayMusic = () => {
    try {
      if (!isPlaying) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
        setIsPlaying(true);
      } else {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
          } catch {}
        }
        if (audioCtxRef.current) {
          try {
            audioCtxRef.current.close();
          } catch {}
        }
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Helper to split text into letters
  const renderInteractiveWord = (word: string, highlightI: boolean = false) => {
    return word.split("").map((letter, i) => {
      if (letter === " ") {
        return (
          <span key={i} className="inline-block w-3 sm:w-5">
            &nbsp;
          </span>
        );
      }
      if (highlightI && (letter === "i" || letter === "I")) {
        return (
          <span
            key={i}
            className="h-letter-static relative inline-block text-amber-300 font-serif"
          >
            {letter}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </span>
        );
      }
      return (
        <span
          key={i}
          className={`h-letter inline-block font-serif ${
            isDarkTheme ? "text-[#fff9e9]" : "text-white"
          }`}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <section
      className={`relative min-h-[105vh] flex flex-col justify-center items-center overflow-hidden transition-colors duration-1000 pt-24 pb-32 ${
        isDarkTheme
          ? "bg-gradient-to-b from-[#050c1e] via-[#091b3e] to-[#040813] text-[#fff9e9]"
          : "bg-gradient-to-b from-[#5aa8ee] via-[#7ec2f8] to-[#fdf4db] text-zinc-900"
      }`}
    >
      {/* ── AMBIENT SKY & CELESTIAL BACKGROUND (SIANG / MALAM DYNAMIC) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
        <AnimatePresence mode="wait">
          {!isDarkTheme ? (
            /* ══ DAY MODE: CERAH BIRU LANGIT + MATAHARI BERSINAR + AWAN ══ */
            <motion.div
              key="day-sky"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Radial Daylight Mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_1000px_at_70%_20%,rgba(255,255,255,0.45)_0%,transparent_75%)]" />

              {/* Radiant Golden Sun (Top Right) */}
              <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-14 sm:top-16 right-8 sm:right-20 md:right-32 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56"
              >
                {/* Sun Glow Outer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-orange-400 blur-3xl opacity-75 animate-pulse" />
                {/* Sun Body */}
                <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-br from-[#fff3b0] via-[#ffd152] to-[#f59e0b] shadow-[0_0_80px_rgba(245,158,11,0.6)] border-2 border-white/60 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200/50 blur-sm" />
                </div>
              </motion.div>

              {/* Floating Cirrus Clouds (Ala Zainab Kabira Cloud SVG) */}
              <motion.div
                animate={{ x: [0, 25, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-28 left-[10%] w-72 h-20 bg-white/35 rounded-full blur-xl pointer-events-none"
              />
              <motion.div
                animate={{ x: [0, -35, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-44 right-[25%] w-96 h-28 bg-white/30 rounded-full blur-2xl pointer-events-none"
              />

              {/* Bottom Soft Cream Cloud Horizon */}
              <div className="absolute bottom-0 inset-x-0 h-40 sm:h-48 z-0 pointer-events-none">
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 1440 220"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 140 C 240 100 420 180 680 130 C 940 80 1140 160 1440 120 V 220 H 0 Z"
                    fill="#fef6e2"
                    opacity="0.9"
                  />
                  <path
                    d="M0 165 C 220 135 460 195 720 155 C 980 115 1200 175 1440 145 V 220 H 0 Z"
                    fill="#fffdf9"
                  />
                </svg>
              </div>
            </motion.div>
          ) : (
            /* ══ NIGHT MODE: LANGIT KOSMIK + BULAN BERSTRIP + BINTANG BERKILAU ══ */
            <motion.div
              key="night-sky"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Deep starry radial mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_1000px_1200px_at_68%_25%,rgba(56,189,248,0.22)_0%,transparent_80%)]" />
              <div className="absolute top-1/4 left-1/5 w-[600px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
              <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-[140px]" />

              {/* Scattered Starlight & Constellation Dots */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:42px_42px] opacity-40" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,235,170,0.9)_1.5px,transparent_1.5px)] [background-size:96px_96px] opacity-60" />

              {/* Diagonal Striped Celestial Moon (Top Right) */}
              <motion.div
                initial={{ scale: 0.8, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-16 sm:top-20 right-8 sm:right-16 md:right-28 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden striped-moon shadow-[0_0_60px_rgba(255,255,255,0.25)] border border-white/20 opacity-90 transition-transform duration-700 hover:scale-105"
              />

              {/* Bottom Whimsical Rolling Hills Silhouette */}
              <div className="absolute bottom-0 inset-x-0 h-44 sm:h-52 z-0 pointer-events-none">
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 1440 220"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 160 C 220 180 340 100 560 120 C 780 140 920 60 1140 100 C 1280 125 1380 90 1440 110 V 220 H 0 Z"
                    fill="#060c1c"
                    opacity="0.9"
                  />
                  <path
                    d="M0 180 C 180 140 380 200 600 160 C 820 120 1020 180 1240 140 C 1360 120 1410 150 1440 160 V 220 H 0 Z"
                    fill="#02050e"
                  />
                  {/* Whimsical curved flourish */}
                  <path
                    d="M1020 170 C 1070 140 1120 140 1160 165 C 1175 175 1190 190 1170 195 C 1150 200 1140 180 1155 170"
                    stroke="rgba(94, 234, 212, 0.45)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── TOP-LEFT LOCATION BADGE & SIDE BADGE ── */}
      <div
        className={`absolute top-7 left-6 sm:left-12 flex items-center gap-2 text-xs font-mono tracking-widest z-20 transition-colors duration-700 ${
          isDarkTheme ? "text-[#fff9e9]/70" : "text-white drop-shadow-sm"
        }`}
      >
        <MapPin
          className={`w-3.5 h-3.5 ${
            isDarkTheme ? "text-amber-400" : "text-amber-200"
          }`}
        />
        <span>JAKARTA, ID</span>
      </div>

      {/* Left Vertical Label: DESIGN / DETAILS / CODE */}
      <div
        className={`hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs font-mono tracking-[0.3em] uppercase whitespace-nowrap z-20 pointer-events-none transition-colors duration-700 ${
          isDarkTheme ? "text-[#fff9e9]/40" : "text-white/60"
        }`}
      >
        DATA / SYSTEMS / INSIGHT
      </div>

      {/* ── CENTER EDITORIAL CONTENT (DENGAN SMOOTH PARALLAX SCROLL TRANSITION) ── */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center"
      >
        {/* Eyebrow with Yellow Dot (From Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase mb-4 sm:mb-6 transition-colors duration-700 ${
            isDarkTheme ? "text-[#fff9e9]/90" : "text-white drop-shadow-sm font-semibold"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
          <span>HELLO, I'M M. SYAUQI AZKA. A –</span>
        </motion.div>

        {/* ── MAIN EDITORIAL TITLE WITH PER-LETTER HOVER TILT ── */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {/* LINE 1: Designer who */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-serif leading-[1.1]"
          >
            {renderInteractiveWord("Data Enginner who", true)}
          </motion.div>

          {/* LINE 2: [Cassette Recorder] + [Rolling Word] */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {/* ── VINTAGE TAPE RECORDER COMPONENT ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`relative rounded-full p-2.5 sm:p-3 shadow-[0_12px_28px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] border flex items-center gap-3 sm:gap-4 shrink-0 max-w-xs sm:max-w-md cursor-pointer transition-all duration-700 ${
                isDarkTheme
                  ? "bg-gradient-to-b from-[#dfdcd5] to-[#c7c4bb] border-[#a5a39a]"
                  : "bg-gradient-to-b from-[#ffffff] to-[#ede9dc] border-[#e2dccf]"
              }`}
            >
              {/* Left Vinyl Reel */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950 border-2 border-[#3d3b37] shadow-inner overflow-hidden flex items-center justify-center shrink-0 transition-transform hover:scale-110 cursor-pointer ${
                  isPlaying ? "reel-spinning" : ""
                }`}
              >
                <div className="absolute inset-1 rounded-full border border-zinc-700/40" />
                <div className="absolute inset-2 rounded-full border border-zinc-700/30" />
                <div className="absolute inset-3 rounded-full border border-zinc-700/40" />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-zinc-900 shadow-md" />
              </div>

              {/* Center Control & Slider */}
              <div className="flex flex-col items-center justify-center flex-1 min-w-[120px] sm:min-w-[150px]">
                <div className="w-full text-center text-[9px] sm:text-[10px] font-mono text-zinc-800 font-semibold tracking-tight truncate mb-1">
                  My Project journey, rapped
                </div>

                {/* Scrubber Bar */}
                <div 
                  className="relative w-full h-2.5 bg-[#66625d] rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer hover:bg-[#555150] transition-colors"
                  onClick={() => {
                    // Allow users to click on the progress bar
                    const newPercent = Math.random() * 100;
                    setPlaybackSec(Math.floor((newPercent / 100) * 120));
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-amber-400 transition-all duration-300 rounded-full"
                    style={{ width: `${(playbackSec / 120) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-zinc-300 shadow-md transition-all duration-300"
                    style={{ left: `calc(${(playbackSec / 120) * 100}% - 7px)` }}
                  />
                </div>

                {/* Timestamps */}
                <div className="w-full flex justify-between text-[9px] font-mono text-zinc-700 font-medium mt-1">
                  <span>{formatTime(playbackSec)}</span>
                  <span>2:00</span>
                </div>
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                onClick={togglePlayMusic}
                title={isPlaying ? "Jeda Musik" : "Putar Musik (Audio Synthesizer)"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 text-amber-300 flex items-center justify-center border border-zinc-700 hover:scale-105 active:scale-95 transition-transform shadow-md shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              {/* Right Vinyl Reel */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950 border-2 border-[#3d3b37] shadow-inner overflow-hidden flex items-center justify-center shrink-0 transition-transform hover:scale-110 cursor-pointer ${
                  isPlaying ? "reel-spinning" : ""
                }`}
              >
                <div className="absolute inset-1 rounded-full border border-zinc-700/40" />
                <div className="absolute inset-2 rounded-full border border-zinc-700/30" />
                <div className="absolute inset-3 rounded-full border border-zinc-700/40" />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-zinc-900 shadow-md" />
              </div>
            </motion.div>

            {/* Rolling Word (Solves / Builds / Crafts / Codes) */}
            <div className="relative text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-serif leading-[1.1] overflow-hidden py-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ROLLING_WORDS[wordIndex]}
                  initial={{ y: "80%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-80%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {renderInteractiveWord(ROLLING_WORDS[wordIndex], true)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className={`text-base sm:text-lg md:text-xl max-w-2xl font-sans leading-relaxed text-balance mb-8 transition-colors duration-700 ${
            isDarkTheme ? "text-[#fff9e9]/80" : "text-white font-medium drop-shadow-sm"
          }`}
        >
          Six years across architecture and product Data Enginner, Cihuy what's next – from data
          engineering to shipping AI experiences.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="px-7 py-3.5 rounded-full text-sm font-semibold bg-[#fff9e9] text-zinc-950 shadow-xl hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Explore Selected Work
          </a>
          <a
            href="#contact"
            className={`px-6 py-3.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              isDarkTheme
                ? "border-white/20 hover:border-amber-400/60 hover:bg-white/5 text-[#fff9e9]"
                : "border-white/40 hover:border-white hover:bg-white/15 text-white shadow-sm"
            }`}
          >
            Work with me
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-[0.2em] uppercase transition-colors z-20 ${
          isDarkTheme ? "text-[#fff9e9]/50 hover:text-[#fff9e9]" : "text-white/70 hover:text-white"
        }`}
      >
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
