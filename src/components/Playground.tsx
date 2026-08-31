"use client";

import { useState } from "react";
import { Sliders, Volume2 } from "lucide-react";

interface PlaygroundProps {
  isDarkTheme?: boolean;
}

export default function Playground({ isDarkTheme = true }: PlaygroundProps) {
  const [blur, setBlur] = useState(12);
  const [glow, setGlow] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="playground" className="py-20 px-6 max-w-5xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="space-y-3 mb-10">
        <span className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors duration-300 ${
          isDarkTheme ? "text-amber-400" : "text-amber-900"
        }`}>
          02 / INTERACTIVE VIGNETTES
        </span>
        <h2 className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
          isDarkTheme ? "text-white drop-shadow-sm" : "text-zinc-950"
        }`}>
          Playground Eksperimen UI
        </h2>
        <p className={`max-w-2xl text-base transition-colors duration-300 ${
          isDarkTheme ? "text-zinc-300" : "text-zinc-800 font-medium"
        }`}>
          Eksperimen mikro dalam material, pergerakan, dan responsivitas komponen interface secara real-time.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Dynamic Material Controller */}
        <div className={`p-6 rounded-2xl border transition-all duration-500 shadow-2xl backdrop-blur-xl ${
          isDarkTheme 
            ? "bg-zinc-900/90 border-zinc-800 text-zinc-100" 
            : "bg-white/90 border-amber-200/80 text-zinc-950 shadow-amber-900/10"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold">
              <Sliders className="w-4 h-4 text-emerald-500" />
              Dynamic Material Controller
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono font-medium">
              Interactive
            </span>
          </div>

          {/* Canvas Box */}
          <div className={`h-40 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden transition-colors ${
            isDarkTheme ? "bg-zinc-950" : "bg-zinc-900 text-white"
          }`}>
            <div 
              style={{ 
                filter: `blur(${blur / 2}px)`,
                opacity: glow / 100 
              }} 
              className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 animate-pulse" 
            />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-emerald-400 font-medium bg-black/40 backdrop-blur-xs">
              Blur: {blur}px | Glow: {glow}%
            </div>
          </div>

          {/* Controls */}
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
        </div>

        {/* Card 2: Sound & Haptic Concept */}
        <div className={`p-6 rounded-2xl border transition-all duration-500 shadow-2xl backdrop-blur-xl flex flex-col justify-between ${
          isDarkTheme 
            ? "bg-zinc-900/90 border-zinc-800 text-zinc-100" 
            : "bg-white/90 border-amber-200/80 text-zinc-950 shadow-amber-900/10"
        }`}>
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

            {/* Waveform Box */}
            <div className="h-40 rounded-xl mb-6 flex items-center justify-center gap-1.5 px-4 bg-zinc-950">
              {[40, 70, 25, 90, 50, 80, 30, 60, 100, 45, 75, 35].map((height, i) => (
                <div
                  key={i}
                  style={{ height: isPlaying ? `${height}%` : '20%' }}
                  className={`w-2 rounded-full bg-gradient-to-t from-purple-500 to-indigo-400 transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : ''
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
        </div>
      </div>
    </section>
  );
}