"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { soundEngine } from "./SoundEngine";

interface CinematicCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  totalFrames?: number;
  onFramesLoaded?: (loadedPercent: number) => void;
}

export function CinematicCanvas({
  scrollProgress,
  totalFrames = 360,
  onFramesLoaded,
}: CinematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const lastProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Directly load original ezgif frames: ezgif-frame-001.jpg to ezgif-frame-360.jpg
  const getFramePath = useCallback((index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.jpg`;
  }, []);

  // Preloading sequence: load priority frames immediately, then stream the rest
  useEffect(() => {
    let loadedCount = 0;
    let isCancelled = false;

    // Reset cache if totalFrames changes
    if (imagesRef.current.length !== totalFrames) {
      imagesRef.current = new Array(totalFrames).fill(null);
    }

    const loadSingleImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index - 1]) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index - 1] = img;
            loadedCount++;
            const pct = Math.floor((loadedCount / totalFrames) * 100);
            setLoadPercent(pct);
            if (onFramesLoaded) onFramesLoaded(pct);
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    const preloadAll = async () => {
      // Step 1: Preload first 30 frames concurrently
      const tier1: Promise<void>[] = [];
      for (let i = 1; i <= Math.min(30, totalFrames); i++) {
        tier1.push(loadSingleImage(i));
      }
      await Promise.all(tier1);

      if (isCancelled) return;

      // Step 2: Concurrently stream remaining frames in chunks of 20
      const remaining: number[] = [];
      for (let i = 31; i <= totalFrames; i++) {
        remaining.push(i);
      }

      const chunkSize = 20;
      for (let i = 0; i < remaining.length; i += chunkSize) {
        if (isCancelled) break;
        const chunk = remaining.slice(i, i + chunkSize);
        await Promise.all(chunk.map((idx) => loadSingleImage(idx)));
        // Yield briefly to main thread for smooth scrolling
        await new Promise((r) => setTimeout(r, 8));
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFramePath, onFramesLoaded]);

  // Update target frame and throttle audio based on scroll progress
  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    // Calculate exact target frame (1 to totalFrames)
    const target = Math.max(1, Math.min(totalFrames, Math.round(clampedProgress * (totalFrames - 1)) + 1));
    targetFrameRef.current = target;

    // Calculate scroll velocity for engine tone modulation
    const now = Date.now();
    const dt = Math.max(now - lastScrollTimeRef.current, 16);
    const dProgress = Math.abs(clampedProgress - lastProgressRef.current);
    const velocity = (dProgress / dt) * 1000;

    soundEngine.updateThrottle(Math.min(velocity * 1.5, 1.0));

    lastScrollTimeRef.current = now;
    lastProgressRef.current = clampedProgress;
  }, [scrollProgress, totalFrames]);

  // Render loop with requestAnimationFrame and native resolution Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let lastDrawnFrame = -1;

    // Sizing helper: matches physical device pixels without scale distortions
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const targetW = Math.round(window.innerWidth * dpr);
      const targetH = Math.round(window.innerHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastDrawnFrame = -1; // force redraw on resize
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });

    const render = () => {
      // Smooth frame interpolation (lerp factor 0.18)
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.04) {
        currentFrameRef.current = target;
      } else {
        currentFrameRef.current += diff * 0.18;
      }

      const frameIndex = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));

      // Retrieve loaded image (or fallback to nearest loaded frame to avoid flickers)
      let img = imagesRef.current[frameIndex - 1];
      if (!img) {
        for (let i = frameIndex - 1; i >= 0; i--) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
        if (!img) {
          for (let i = frameIndex; i < totalFrames; i++) {
            if (imagesRef.current[i]) {
              img = imagesRef.current[i];
              break;
            }
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        if (frameIndex !== lastDrawnFrame) {
          const canvasW = canvas.width;
          const canvasH = canvas.height;

          // Preserve exact source aspect ratio with zero distortion
          const imgW = img.naturalWidth;
          const imgH = img.naturalHeight;
          const imgAspect = imgW / imgH;
          const canvasAspect = canvasW / canvasH;

          let drawW = canvasW;
          let drawH = canvasH;
          let drawX = 0;
          let drawY = 0;

          if (canvasAspect > imgAspect) {
            // Viewport is wider than image: fit width, center vertically
            drawW = canvasW;
            drawH = Math.round(canvasW / imgAspect);
            drawY = Math.round((canvasH - drawH) / 2);
          } else {
            // Viewport is taller than image: fit height, center horizontally
            drawH = canvasH;
            drawW = Math.round(canvasH * imgAspect);
            drawX = Math.round((canvasW - drawW) / 2);
          }

          // Native high-quality browser interpolation
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Clear background to clean obsidian black
          ctx.fillStyle = "#050608";
          ctx.fillRect(0, 0, canvasW, canvasH);

          // Draw directly to backing buffer with 1:1 hardware rasterization
          ctx.drawImage(img, drawX, drawY, drawW, drawH);

          lastDrawnFrame = frameIndex;
        }
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050608]">
      {/* HTML5 Canvas with native hardware rendering - NO artificial filters or contrast degradation */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />

      {/* Cinematic 2.39:1 Letterbox Bars (Clean top & bottom framing without covering car) */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-12 bg-gradient-to-b from-[#050608] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent pointer-events-none z-10" />

      {/* Discreet Preload Telemetry HUD (fades when buffer complete) */}
      {loadPercent < 100 && (
        <div className="absolute bottom-6 right-8 z-20 pointer-events-none flex items-center gap-3 transition-opacity duration-700 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066b1] animate-ping" />
          <span className="font-telemetry text-[10px] tracking-wider uppercase text-white/70">
            BUFFERING M SEQUENCE [{loadPercent}%]
          </span>
        </div>
      )}
    </div>
  );
}
