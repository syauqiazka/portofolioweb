"use client";

interface FooterProps {
  isDarkTheme?: boolean;
}

export default function Footer({ isDarkTheme = false }: FooterProps) {
  return (
    <footer className={`py-10 px-6 border-t transition-colors duration-500 relative z-10 ${
      isDarkTheme 
        ? "border-zinc-800/80 text-zinc-300 bg-zinc-950/60" 
        : "border-amber-900/15 text-zinc-900 bg-amber-100/30 font-medium"
    }`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono">
        <p>© {new Date().getFullYear()} — Designed & Built with care.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:underline transition-opacity hover:opacity-70">Github</a>
          <a href="#" className="hover:underline transition-opacity hover:opacity-70">LinkedIn</a>
          <a href="#" className="hover:underline transition-opacity hover:opacity-70">Twitter</a>
        </div>
      </div>
    </footer>
  );
}