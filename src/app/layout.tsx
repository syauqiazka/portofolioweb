import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "M. Syauqi Azka — Product Designer & Developer",
  description:
    "Portfolio interaktif terinspirasi dari Zainab Kabira — creative development, editorial typography, dan curated digital crafts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased selection:bg-amber-400 selection:text-zinc-900 overflow-x-hidden grain min-h-screen"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Global Scroll Progress bar at the top */}
            <ScrollProgress />

            {/* Persistent Global Floating Navbar */}
            <Navbar />

            {/* Page content with route transition template */}
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}