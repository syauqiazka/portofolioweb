"use client";

import { motion } from "framer-motion";

interface LandscapeDividerProps {
  isDarkTheme: boolean;
  className?: string;
}

export default function LandscapeDivider({ isDarkTheme, className = "" }: LandscapeDividerProps) {
  // Warna-warna dinamis: Siang (warm terracotta/cream/sun) vs Malam (deep navy/lavender/moon)
  const groundColor1 = isDarkTheme ? "#081226" : "#f5ede0";
  const groundColor2 = isDarkTheme ? "#040915" : "#ebe1cf";
  const cloudColor = isDarkTheme ? "#132140" : "#ded3be";
  const pebbleColor = isDarkTheme ? "#334155" : "#a8a29e";
  const stemColor = isDarkTheme ? "#7c3aed" : "#b06a4d";
  const leafColor = isDarkTheme ? "#a78bfa" : "#d99b82";

  return (
    <div className={`relative w-full overflow-hidden transition-colors duration-1000 ${className}`}>
      <svg
        className="w-full h-36 sm:h-48 md:h-56 object-cover select-none"
        viewBox="0 0 1440 220"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── LAYER 1: BACK HILL & SUN / MOON ── */}
        {/* Striped Sun (Day) / Striped Moon (Night) peeking behind clouds */}
        <g transform="translate(940, 50)">
          {/* Celestial disc with diagonal stripes (from user image) */}
          <mask id="celestial-mask">
            <circle cx="50" cy="50" r="42" fill="white" />
          </mask>
          <g mask="url(#celestial-mask)">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill={isDarkTheme ? "#ffffff" : "#ffc107"}
              opacity="0.95"
            />
            {/* Diagonal transparent cutout stripes */}
            {[-40, -20, 0, 20, 40, 60, 80, 100, 120].map((offset, i) => (
              <line
                key={i}
                x1={offset}
                y1="0"
                x2={offset + 70}
                y2="100"
                stroke={isDarkTheme ? "#060b18" : "#fbf7ee"}
                strokeWidth="7"
              />
            ))}
          </g>
        </g>

        {/* Low rounded clouds covering sun/moon base (from user image) */}
        <path
          d="M720 120 C 730 80 790 70 820 95 C 845 75 905 75 930 95 C 960 70 1020 70 1050 100 C 1080 80 1140 85 1160 120 Z"
          fill={cloudColor}
          className="transition-colors duration-1000"
        />

        {/* ── LAYER 2: MIDDLE ROLLING HILL ── */}
        <path
          d="M0 160 C 240 100 480 170 780 115 C 1080 60 1280 140 1440 90 V 220 H 0 Z"
          fill={groundColor1}
          className="transition-colors duration-1000"
        />

        {/* ── LAYER 3: FOREGROUND GENTLE DUNE WAVE ── */}
        <path
          d="M0 180 C 280 120 580 200 900 145 C 1180 100 1340 160 1440 140 V 220 H 0 Z"
          fill={groundColor2}
          className="transition-colors duration-1000"
        />

        {/* ── PEBBLE CLUSTERS AT PLANT BASES (From user image) ── */}
        {/* Cluster 1 (Far Left) */}
        <ellipse cx="220" cy="175" rx="35" ry="6" fill={pebbleColor} opacity="0.6" />
        <ellipse cx="205" cy="173" rx="10" ry="4" fill={pebbleColor} opacity="0.8" />
        <ellipse cx="230" cy="174" rx="12" ry="4.5" fill={pebbleColor} opacity="0.8" />

        {/* Cluster 2 (Mid Left Ridge) */}
        <ellipse cx="540" cy="150" rx="38" ry="6" fill={pebbleColor} opacity="0.6" />
        <ellipse cx="525" cy="148" rx="11" ry="4" fill={pebbleColor} opacity="0.8" />
        <ellipse cx="555" cy="149" rx="13" ry="4.5" fill={pebbleColor} opacity="0.8" />

        {/* Cluster 3 (Center Ridge Under Clouds) */}
        <ellipse cx="890" cy="182" rx="42" ry="7" fill={pebbleColor} opacity="0.6" />
        <ellipse cx="875" cy="180" rx="12" ry="4.5" fill={pebbleColor} opacity="0.8" />
        <ellipse cx="905" cy="181" rx="14" ry="5" fill={pebbleColor} opacity="0.8" />

        {/* Cluster 4 (Far Right) */}
        <ellipse cx="1330" cy="185" rx="36" ry="6" fill={pebbleColor} opacity="0.6" />
        <ellipse cx="1315" cy="183" rx="11" ry="4" fill={pebbleColor} opacity="0.8" />
        <ellipse cx="1345" cy="184" rx="12" ry="4.5" fill={pebbleColor} opacity="0.8" />
      </svg>

      {/* ── LAYER 4: BOTANICAL LEAF SPRIGS (TERRACOTTA / LAVENDER SWAYING) ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        
        {/* Left Plant Pair (x: ~220px) */}
        <div className="absolute bottom-6 left-[12%] sm:left-[14%] flex gap-2 items-end">
          <div className="plant-sway" style={{ transformOrigin: "bottom center" }}>
            <svg width="40" height="95" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 23 80 18 45 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 18, h: 7 },
                { y: 70, w: 20, h: 8 },
                { y: 50, w: 19, h: 7 },
                { y: 32, w: 16, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y - 3})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
          <div className="plant-sway-slow" style={{ transformOrigin: "bottom center" }}>
            <svg width="42" height="105" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 27 80 32 45 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 18, h: 7 },
                { y: 70, w: 20, h: 8 },
                { y: 50, w: 19, h: 7 },
                { y: 32, w: 16, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y - 3})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
        </div>

        {/* Mid-Left Plant Pair (x: ~540px) */}
        <div className="absolute bottom-12 left-[35%] sm:left-[36%] flex gap-3 items-end">
          <div className="plant-sway-delayed" style={{ transformOrigin: "bottom center" }}>
            <svg width="45" height="115" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 22 75 19 40 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 20, h: 7.5 },
                { y: 70, w: 22, h: 8 },
                { y: 50, w: 20, h: 7.5 },
                { y: 32, w: 17, h: 6 },
                { y: 16, w: 14, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y - 3})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
          <div className="plant-sway" style={{ transformOrigin: "bottom center" }}>
            <svg width="40" height="100" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 27 75 30 40 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 19, h: 7 },
                { y: 70, w: 21, h: 8 },
                { y: 50, w: 19, h: 7 },
                { y: 32, w: 16, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y - 3})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
        </div>

        {/* Center Plant Pair next to Sun/Moon (x: ~890px) */}
        <div className="absolute bottom-5 left-[58%] sm:left-[60%] flex gap-2 items-end">
          <div className="plant-sway-slow" style={{ transformOrigin: "bottom center" }}>
            <svg width="42" height="108" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 24 75 20 40 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 18, h: 7 },
                { y: 70, w: 20, h: 8 },
                { y: 50, w: 19, h: 7 },
                { y: 32, w: 16, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y - 3})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
          <div className="plant-sway" style={{ transformOrigin: "bottom center" }}>
            <svg width="40" height="98" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 27 75 29 40 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 18, h: 7 },
                { y: 70, w: 20, h: 8 },
                { y: 50, w: 18, h: 7 },
                { y: 32, w: 15, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y - 3})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
        </div>

        {/* Right Plant Pair (x: ~1330px) */}
        <div className="absolute bottom-5 right-[6%] sm:right-[7%] flex gap-2 items-end">
          <div className="plant-sway-delayed" style={{ transformOrigin: "bottom center" }}>
            <svg width="42" height="105" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 24 75 21 40 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 18, h: 7 },
                { y: 70, w: 20, h: 8 },
                { y: 50, w: 19, h: 7 },
                { y: 32, w: 16, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y - 3})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
          <div className="plant-sway-slow" style={{ transformOrigin: "bottom center" }}>
            <svg width="40" height="96" viewBox="0 0 50 110" fill="none">
              <path d="M25 110 C 26 75 28 40 25 5" stroke={stemColor} strokeWidth="2.5" strokeLinecap="round" />
              {[
                { y: 90, w: 18, h: 7 },
                { y: 70, w: 20, h: 8 },
                { y: 50, w: 18, h: 7 },
                { y: 32, w: 15, h: 6 },
                { y: 16, w: 13, h: 5 },
              ].map((leaf, idx) => (
                <g key={idx}>
                  <ellipse cx={25 - leaf.w * 0.7} cy={leaf.y - 3} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(-18 25 ${leaf.y - 3})`} fill={leafColor} />
                  <ellipse cx={25 + leaf.w * 0.7} cy={leaf.y} rx={leaf.w * 0.65} ry={leaf.h * 0.55} transform={`rotate(18 25 ${leaf.y})`} fill={leafColor} />
                </g>
              ))}
              <ellipse cx="25" cy="6" rx="5" ry="8" fill={leafColor} />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtle bottom separator line (as in user screenshot) */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-current/15" />
    </div>
  );
}
