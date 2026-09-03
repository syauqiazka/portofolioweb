"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isReversed: boolean;
  isTopDark: boolean;
  isBottomDark: boolean;
  toggleTheme: () => void;
  setTheme: (reversed: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio_theme_reversed");
    if (saved !== null) {
      setIsReversed(saved === "true");
    }
  }, []);

  const toggleTheme = () => {
    setIsReversed((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio_theme_reversed", String(next));
      return next;
    });
  };

  const setTheme = (reversed: boolean) => {
    setIsReversed(reversed);
    localStorage.setItem("portfolio_theme_reversed", String(reversed));
  };

  // Logika posisi tema:
  // Bagian ATAS: Gelap jika isReversed = true
  const isTopDark = isReversed;
  // Bagian BAWAH: Gelap jika isReversed = false
  const isBottomDark = !isReversed;

  return (
    <ThemeContext.Provider
      value={{
        isReversed,
        isTopDark,
        isBottomDark,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
