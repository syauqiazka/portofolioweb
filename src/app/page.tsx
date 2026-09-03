"use client";

import { useScroll, useSpring } from "framer-motion";
import DayToNightBackground from "@/components/DayToNightBackground";
import Hero from "@/components/Hero";
import IntroStrip from "@/components/IntroStrip";
import LandscapeDivider from "@/components/LandscapeDivider";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import ExploreBanners from "@/components/home/ExploreBanners";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

export default function WorkPage() {
  const { isReversed, isTopDark, isBottomDark } = useTheme();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div
      className="relative min-h-screen selection:bg-amber-400 selection:text-zinc-900 overflow-x-hidden font-sans"
      suppressHydrationWarning
    >
      {/* Background Komponen Siang-Malam interaktif */}
      <DayToNightBackground
        isReversed={isReversed}
        smoothProgress={smoothProgress}
      />

      {/* Main Content: Work & Projects */}
      <main>
        {/* Atas: Hero & Intro */}
        <Hero isDarkTheme={isTopDark} />
        <IntroStrip isDarkTheme={isTopDark} />

        {/* Botanical Landscape Transition Band (Day / Night Dynamic) */}
        <div className="relative -mt-8 z-10">
          <LandscapeDivider isDarkTheme={isTopDark} />
        </div>

        {/* Featured Projects Showcase */}
        <div id="work">
          <Projects isDarkTheme={true} />
        </div>

        {/* Testimonials & Social Proof */}
        <Testimonials isDarkTheme={true} />

        {/* Explore More Pages: About & Playground Navigation Banner */}
        <ExploreBanners isBottomDark={isBottomDark} />

        {/* Footer */}
        <div id="contact">
          <Footer isDarkTheme={isBottomDark} />
        </div>
      </main>
    </div>
  );
}