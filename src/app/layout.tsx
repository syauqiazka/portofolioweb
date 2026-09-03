import type { Metadata } from "next";
import { Inter, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "M. Syauqi Azka — Data Engginer Anthusiast | Portfolio",
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
      className={`${inter.variable} ${dmSerif.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased selection:bg-amber-400 selection:text-zinc-900 overflow-x-hidden grain min-h-screen bg-zinc-950"
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