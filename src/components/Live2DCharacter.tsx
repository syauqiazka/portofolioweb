"use client";

import { useEffect, useRef, useState } from "react";

interface Live2DCharacterProps {
  modelUrl: string;
  className?: string;
  scale?: number;
  position?: { x: number; y: number };
}

export default function Live2DCharacter({
  modelUrl,
  className = "",
  scale = 0.3,
  position = { x: 0, y: 0 },
}: Live2DCharacterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<unknown>(null);
  const modelRef = useRef<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Prevent double init in React StrictMode
    if (initRef.current) return;
    initRef.current = true;

    let mounted = true;

    async function initLive2D() {
      try {
        if (!canvasRef.current) return;

        // Dynamic import to avoid SSR
        const PIXI = await import("pixi.js");
        const { Live2DModel } = await import("pixi-live2d-display");

        // Expose PIXI globally for plugin
        if (typeof window !== "undefined") {
          (window as any).PIXI = PIXI;
        }

        const app = new PIXI.Application({
          view: canvasRef.current,
          transparent: true,
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        appRef.current = app;

        // Load model
        const model = await Live2DModel.from(modelUrl);
        
        if (!mounted) {
          app.destroy(true);
          return;
        }

        modelRef.current = model;

        // Set half-body framing
        model.scale.set(scale);
        model.x = position.x;
        model.y = position.y;

        app.stage.addChild(model);

        // Auto-resize
        const resize = () => {
          if (!canvasRef.current || !app) return;
          const parent = canvasRef.current.parentElement;
          if (!parent) return;
          
          app.renderer.resize(parent.clientWidth, parent.clientHeight);
          
          // Re-center model
          model.x = parent.clientWidth / 2;
          model.y = parent.clientHeight * 0.4; // Half-body positioning
        };

        resize();
        window.addEventListener("resize", resize);

        setLoading(false);

        return () => {
          window.removeEventListener("resize", resize);
        };
      } catch (err) {
        console.error("Live2D init failed:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load model");
          setLoading(false);
        }
      }
    }

    initLive2D();

    return () => {
      mounted = false;
      if (appRef.current && typeof (appRef.current as any).destroy === 'function') {
        (appRef.current as any).destroy(true);
        appRef.current = null;
      }
    };
  }, [modelUrl, scale, position.x, position.y]);

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-xs text-zinc-500">Live2D unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      />
    </div>
  );
}
