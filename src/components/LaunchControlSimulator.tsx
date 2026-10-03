"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundEngine } from "./SoundEngine";
import { Zap, Gauge, Timer, RotateCcw, ShieldCheck, Flag } from "lucide-react";
import confetti from "canvas-confetti";

export function LaunchControlSimulator() {
  const [brakePressed, setBrakePressed] = useState<boolean>(false);
  const [throttlePressed, setThrottlePressed] = useState<boolean>(false);
  const [launchReady, setLaunchReady] = useState<boolean>(false);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [launched, setLaunched] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const [gForce, setGForce] = useState<number>(0);
  const [boostPressure, setBoostPressure] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Ready state trigger when both brake and throttle are held
  useEffect(() => {
    if (brakePressed && throttlePressed && !isLaunching && !launched) {
      soundEngine.unmuteIfSilent();
      soundEngine.updateRPM(3500); // launch stall RPM
      soundEngine.playTurboSpool(1.8);

      let b = 0;
      const boostTimer = setInterval(() => {
        b = Math.min(2.2, b + 0.3);
        setBoostPressure(Number(b.toFixed(2)));
        if (b >= 2.0) {
          setLaunchReady(true);
          clearInterval(boostTimer);
        }
      }, 100);

      return () => clearInterval(boostTimer);
    } else if (!brakePressed && !throttlePressed && !isLaunching) {
      setLaunchReady(false);
      setBoostPressure(0);
      soundEngine.updateRPM(850);
    }
  }, [brakePressed, throttlePressed, isLaunching, launched]);

  // Launch trigger when brake is released while throttle is held and boost is ready
  useEffect(() => {
    if (!brakePressed && throttlePressed && launchReady && !isLaunching && !launched) {
      triggerLaunch();
    }
  }, [brakePressed, throttlePressed, launchReady, isLaunching, launched]);

  const triggerLaunch = () => {
    setIsLaunching(true);
    setLaunchReady(false);
    soundEngine.playTurboSpool(1.2);
    soundEngine.updateRPM(6800);

    const startTime = performance.now();

    const updateRun = (time: number) => {
      const dt = (time - startTime) / 1000;
      setElapsed(Number(dt.toFixed(2)));

      if (dt <= 3.5) {
        // Linear-to-exponential speed curve reaching 100 km/h in exactly 3.5s
        const progress = dt / 3.5;
        const currentSpeed = Math.round(progress * 100);
        setSpeed(currentSpeed);

        // Peak G-force at launch (~1.42G) tapering to 0.85G
        const g = Number((1.45 - progress * 0.55).toFixed(2));
        setGForce(g);

        animFrameRef.current = requestAnimationFrame(updateRun);
      } else {
        setSpeed(100);
        setElapsed(3.5);
        setGForce(0.75);
        setIsLaunching(false);
        setLaunched(true);
        soundEngine.playExhaustCrackle();
        soundEngine.updateRPM(2500);

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#0066b1", "#0c2340", "#e7222e"],
        });
      }
    };

    animFrameRef.current = requestAnimationFrame(updateRun);
  };

  const handleAutoLaunch = () => {
    if (isLaunching) return;
    handleReset();
    soundEngine.unmuteIfSilent();
    setBrakePressed(true);
    setThrottlePressed(true);
    soundEngine.playTurboSpool(1.8);
    soundEngine.updateRPM(3500);

    let b = 0;
    const spoolInterval = setInterval(() => {
      b += 0.45;
      const val = Number(Math.min(2.2, b).toFixed(2));
      setBoostPressure(val);
      if (val >= 2.0) {
        clearInterval(spoolInterval);
        setLaunchReady(true);
        setTimeout(() => {
          setBrakePressed(false);
        }, 400);
      }
    }, 120);
  };

  const handleReset = () => {
    soundEngine.playClick();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setBrakePressed(false);
    setThrottlePressed(false);
    setLaunchReady(false);
    setIsLaunching(false);
    setLaunched(false);
    setSpeed(0);
    setElapsed(0);
    setGForce(0);
    setBoostPressure(0);
    soundEngine.updateRPM(850);
  };

  return (
    <section id="launch-control" className="py-24 px-6 md:px-12 bg-[#050608] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066b1] animate-ping" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold">
                M xDrive Telemetry Test Bench
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Launch Control.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Experience the brutal 0–100 km/h sprint of the BMW M3 Competition. Hold both Brake and Throttle to spool the twin mono-scroll turbos, then release the Brake to engage launch mode.
            </p>
          </div>

          <div className="glass-panel px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-telemetry text-xs text-white/80">
              M xDrive 4WD · DSC OFF · Trans S3
            </span>
          </div>
        </div>

        {/* Simulator Box */}
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden">
          {/* Ambient Launch Glow */}
          {launchReady && (
            <div className="absolute inset-0 bg-red-600/10 animate-pulse pointer-events-none" />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Speedometer & G-Meter Display */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Ready Banner */}
              <div className="h-8 mb-6 flex items-center justify-center">
                {launchReady ? (
                  <div className="px-4 py-1.5 rounded-full bg-[#e7222e] text-white font-telemetry font-bold text-xs uppercase tracking-widest animate-bounce flex items-center gap-2 shadow-[0_0_20px_#e7222e]">
                    <Flag className="w-3.5 h-3.5" />
                    <span>RELEASE BRAKE TO LAUNCH!</span>
                  </div>
                ) : isLaunching ? (
                  <div className="text-xs uppercase font-telemetry text-[#0066b1] font-bold tracking-widest animate-pulse">
                    MAXIMUM ACCELERATION IN PROGRESS...
                  </div>
                ) : launched ? (
                  <div className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-telemetry text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                    BENCHMARK ACHIEVED: 0–100 IN 3.50s
                  </div>
                ) : (
                  <span className="text-xs font-telemetry text-white/40 uppercase tracking-widest">
                    STEP 1: HOLD BRAKE ➔ STEP 2: HOLD THROTTLE
                  </span>
                )}
              </div>

              {/* Digital Speed Number */}
              <div className="flex flex-col items-center">
                <span className="text-7xl sm:text-9xl font-black font-telemetry tracking-tighter text-white">
                  {speed}
                </span>
                <span className="text-sm uppercase tracking-[0.3em] font-semibold text-white/40 mt-1">
                  KM / H
                </span>
              </div>

              {/* Telemetry row */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-8 text-center">
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-0.5">
                    Sprint Time
                  </span>
                  <span className="text-xl font-bold font-telemetry text-[#0066b1]">
                    {elapsed.toFixed(2)}s
                  </span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-0.5">
                    Peak G-Force
                  </span>
                  <span className="text-xl font-bold font-telemetry text-white">
                    {gForce > 0 ? `${gForce} G` : "0.00 G"}
                  </span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-0.5">
                    Turbo Boost
                  </span>
                  <span className="text-xl font-bold font-telemetry text-[#e7222e]">
                    {boostPressure > 0 ? `${boostPressure} BAR` : "0.0 BAR"}
                  </span>
                </div>
              </div>
            </div>

            {/* Launch Controls Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 font-telemetry block">
                Driver Pedals & Actuation
              </span>

              {/* Pedals Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Brake Pedal */}
                <button
                  onMouseDown={() => setBrakePressed(true)}
                  onMouseUp={() => setBrakePressed(false)}
                  onTouchStart={() => setBrakePressed(true)}
                  onTouchEnd={() => setBrakePressed(false)}
                  className={`py-10 px-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer select-none ${
                    brakePressed
                      ? "bg-[#e7222e] text-white border-[#e7222e] shadow-[0_0_30px_rgba(231,34,46,0.6)] scale-98"
                      : "bg-white/[0.04] text-white/80 border-white/15 hover:border-white/30"
                  }`}
                >
                  <span className="text-xl font-black font-telemetry">BRAKE</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">
                    {brakePressed ? "DEPRESSED" : "HOLD TO ENGAGE"}
                  </span>
                </button>

                {/* Throttle Pedal */}
                <button
                  onMouseDown={() => setThrottlePressed(true)}
                  onMouseUp={() => setThrottlePressed(false)}
                  onTouchStart={() => setThrottlePressed(true)}
                  onTouchEnd={() => setThrottlePressed(false)}
                  className={`py-10 px-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer select-none ${
                    throttlePressed
                      ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-98"
                      : "bg-white/[0.04] text-white/80 border-white/15 hover:border-white/30"
                  }`}
                >
                  <span className="text-xl font-black font-telemetry">THROTTLE</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">
                    {throttlePressed ? "FLOORED" : "HOLD TO SPOOL"}
                  </span>
                </button>
              </div>

              {/* Instant Full Launch Button */}
              <button
                onClick={handleAutoLaunch}
                disabled={isLaunching}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0066b1] via-[#0c2340] to-[#e7222e] text-white font-bold text-xs uppercase tracking-widest font-telemetry flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,102,177,0.3)] disabled:opacity-40"
              >
                <Zap className="w-4 h-4 text-cyan-300" />
                <span>{isLaunching ? "Launch Sprint in Progress..." : "Simulate Full 0–100 km/h Launch"}</span>
              </button>

              {/* Reset Button */}
              {launched && (
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest font-telemetry flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET LAUNCH BENCH</span>
                </button>
              )}

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-white/50 leading-relaxed space-y-1">
                <span className="font-semibold text-white/80 block">Verified Motorsport Calibration:</span>
                <p>
                  The G80 M3 Competition with M xDrive combines the high-torque S58 engine with intelligent electro-mechanical all-wheel drive, propelling from 0 to 100 km/h in an official 3.5 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
