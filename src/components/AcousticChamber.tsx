"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundEngine } from "./SoundEngine";
import { Volume2, Zap, Flame, Gauge, Sparkles } from "lucide-react";

export function AcousticChamber() {
  const [rpm, setRpm] = useState<number>(850);
  const [isRevving, setIsRevving] = useState<boolean>(false);
  const [exhaustMode, setExhaustMode] = useState<"COMFORT" | "SPORT_PLUS" | "TRACK">("SPORT_PLUS");
  const [boostBar, setBoostBar] = useState<number>(0);
  const [isStartingCold, setIsStartingCold] = useState<boolean>(false);
  const [engineState, setEngineState] = useState<"RUNNING" | "COLD_START">("RUNNING");
  const revIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard spacebar rev listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        startRevving();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        stopRevving();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [exhaustMode]);

  const startRevving = () => {
    soundEngine.unmuteIfSilent();
    setIsRevving(true);

    if (revIntervalRef.current) clearInterval(revIntervalRef.current);

    revIntervalRef.current = setInterval(() => {
      setRpm((prev) => {
        const next = Math.min(7200, prev + 180 + Math.random() * 60);
        soundEngine.updateRPM(next);
        const norm = (next - 850) / (7200 - 850);
        setBoostBar(Number((norm * 2.2).toFixed(2)));
        return Math.round(next);
      });
    }, 30);
  };

  const stopRevving = () => {
    setIsRevving(false);
    if (revIntervalRef.current) clearInterval(revIntervalRef.current);

    // Overrun crackle & turbo spool
    soundEngine.playTurboSpool(0.6);
    if (exhaustMode !== "COMFORT") {
      soundEngine.playExhaustCrackle();
    }

    // Decel decay back to idle
    revIntervalRef.current = setInterval(() => {
      setRpm((prev) => {
        if (prev <= 900) {
          if (revIntervalRef.current) clearInterval(revIntervalRef.current);
          soundEngine.updateRPM(850);
          setBoostBar(0);
          return 850;
        }
        const next = Math.max(850, prev - 240);
        soundEngine.updateRPM(next);
        const norm = (next - 850) / (7200 - 850);
        setBoostBar(Number((norm * 1.5).toFixed(2)));
        return Math.round(next);
      });
    }, 30);
  };

  const handleColdStart = () => {
    setIsStartingCold(true);
    setEngineState("COLD_START");
    soundEngine.playColdStart(() => {
      setIsStartingCold(false);
      setEngineState("RUNNING");
    });
  };

  // Shift light color calculation
  const getShiftColor = () => {
    if (rpm < 4500) return "bg-emerald-500";
    if (rpm < 6200) return "bg-amber-400";
    return "bg-[#e7222e] animate-pulse";
  };

  return (
    <section id="acoustic" className="py-24 px-6 md:px-12 bg-[#040507] border-t border-white/10 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0066b1]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1360px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e7222e] animate-ping" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#e7222e] font-semibold">
                S58 Acoustic Chamber
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Hear The Beast.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Experience the raw acoustic profile of the BMW M TwinPower Turbo inline-6. Use the interactive tachometer or hold <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 text-xs font-mono">SPACE</kbd> to rev up to the 7,200 RPM redline.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {(["COMFORT", "SPORT_PLUS", "TRACK"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  soundEngine.playClick();
                  setExhaustMode(m);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-telemetry transition-all cursor-pointer ${
                  exhaustMode === m
                    ? "bg-[#e7222e] text-white shadow-[0_0_15px_rgba(231,34,46,0.3)]"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {m.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Tachometer Gauge Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Dial */}
          <div className="lg:col-span-7 glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-white/15 flex flex-col items-center justify-center relative">
            {/* Shift Lights Bar */}
            <div className="w-full max-w-md flex items-center justify-between gap-1.5 mb-8 px-4">
              {Array.from({ length: 12 }).map((_, i) => {
                const threshold = 1500 + i * 475;
                const isLit = rpm >= threshold;
                return (
                  <div
                    key={i}
                    className={`h-2.5 flex-1 rounded-xs transition-all duration-75 ${
                      isLit
                        ? i < 6
                          ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                          : i < 9
                          ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                          : "bg-[#e7222e] shadow-[0_0_12px_#e7222e]"
                        : "bg-white/10"
                    }`}
                  />
                );
              })}
            </div>

            {/* Circular Gauge Digital Display */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex flex-col items-center justify-center rounded-full border-2 border-white/10 bg-radial from-white/[0.03] to-transparent shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
              {/* Dial Track Arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="4"
                  strokeDasharray="210"
                  strokeDashoffset="35"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke={rpm > 6200 ? "#e7222e" : "#0066b1"}
                  strokeWidth="4"
                  strokeDasharray="210"
                  strokeDashoffset={210 - ((rpm - 850) / (7200 - 850)) * 175}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>

              <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-white/40 mb-1">
                Engine Speed
              </span>
              <span className="text-5xl sm:text-6xl font-black font-telemetry tracking-tight text-white">
                {rpm}
              </span>
              <span className="text-xs uppercase font-bold text-[#e7222e] font-telemetry mt-1">
                RPM × 1000
              </span>

              {/* Boost indicator */}
              <div className="mt-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#0066b1]" />
                <span className="font-telemetry text-[11px] text-white/80">
                  BOOST: <strong className="text-white">{boostBar} BAR</strong>
                </span>
              </div>
            </div>

            {/* Redline Alert */}
            {rpm >= 7000 && (
              <div className="absolute top-6 right-6 px-3 py-1 rounded bg-[#e7222e] text-white text-[10px] font-bold font-telemetry uppercase tracking-widest animate-bounce">
                REV LIMITER 7,200 RPM
              </div>
            )}
          </div>

          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Hold to Rev Throttle Pedal */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
              <span className="block text-xs font-telemetry uppercase text-white/50 mb-4 tracking-wider">
                Virtual Throttle Control
              </span>

              <button
                onMouseDown={startRevving}
                onMouseUp={stopRevving}
                onMouseLeave={stopRevving}
                onTouchStart={startRevving}
                onTouchEnd={stopRevving}
                className={`w-full py-8 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all cursor-pointer select-none flex flex-col items-center justify-center gap-2 ${
                  isRevving
                    ? "bg-gradient-to-b from-[#e7222e] to-[#991b1b] text-white shadow-[0_0_35px_rgba(231,34,46,0.6)] scale-98"
                    : "bg-white text-black hover:bg-white/90 shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                }`}
              >
                <Gauge className={`w-6 h-6 ${isRevving ? "animate-spin" : ""}`} />
                <span>{isRevving ? "REV AT FULL THROTTLE" : "PRESS & HOLD TO REV"}</span>
                <span className="text-[10px] font-normal tracking-normal opacity-70">
                  (Or press & hold SPACEBAR)
                </span>
              </button>
            </div>

            {/* 2. Cold Start Simulator */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-white mb-0.5">
                  Simulate Cold Start Sequence
                </span>
                <span className="text-[11px] text-white/50 block">
                  Starter motor crank ➔ high-idle ignition flare ➔ flap open burble
                </span>
              </div>
              <button
                disabled={isStartingCold}
                onClick={handleColdStart}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/15 text-xs font-bold font-telemetry uppercase tracking-wider text-white transition-all cursor-pointer shrink-0"
              >
                {isStartingCold ? "STARTING..." : "COLD START"}
              </button>
            </div>

            {/* 3. Exhaust Architecture Details */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066b1] font-telemetry block">
                M Exhaust Architecture
              </span>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Dual-branch exhaust with four 100mm tailpipes in Black Chrome. Electronically controlled acoustic flaps vary backpressure to deliver deep bass at low speeds and untamed motorsport scream at 7,200 RPM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
