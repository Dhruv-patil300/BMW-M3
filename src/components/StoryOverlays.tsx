"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MBadge } from "./BMWLogo";
import { soundEngine } from "./SoundEngine";
import {
  ChevronDown,
  Gauge,
  Zap,
  Disc3,
  SlidersHorizontal,
  Compass,
  Layers,
  ArrowRight,
  Sun,
  Moon,
  Info,
  X,
  Target,
} from "lucide-react";

interface StoryOverlaysProps {
  progress: number; // 0.0 to 1.0
  onExploreSpecs: () => void;
}

interface HotspotDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  spec: string;
  statLabel: string;
}

const HOTSPOTS: Record<string, HotspotDetail> = {
  grille: {
    id: "grille",
    title: "Frameless Vertical M Kidney Grille",
    category: "Aerodynamics & Induction",
    description:
      "Vertical double-bar radiator grille designed without a frame for maximum cooling air induction. Feeds the primary radiator, charge-air cooler, and lower engine oil cooling circuits under high-velocity track conditions.",
    spec: "Twin Horizontal Double Bars in High-Gloss Black",
    statLabel: "+18% Airflow Efficiency",
  },
  roof: {
    id: "roof",
    title: "Contoured Carbon-Fibre Roof (CFRP)",
    category: "Lightweight Architecture",
    description:
      "Engineered from carbon-fibre-reinforced plastic (CFRP) with a prominent aerodynamic central channel. Significantly lowers the vehicle's center of gravity, enhancing rotational agility and lateral turn-in response.",
    spec: "5.0 kg Weight Reduction from Highest Point",
    statLabel: "CG Shift: -4.2 mm Lower",
  },
  mirrors: {
    id: "mirrors",
    title: "M Twin-Stalk Aerodynamic Wing Mirrors",
    category: "Wind-Tunnel Fluid Dynamics",
    description:
      "Signature BMW M double-bridge mirror architecture optimized in the BMW Group wind tunnel. Channels turbulent air away from the side glass toward the sculpted rear spoiler.",
    spec: "M Carbon Mirror Caps with Integrated LED Turn Indicators",
    statLabel: "Drag Coefficient Cd: 0.34",
  },
  exhaust: {
    id: "exhaust",
    title: "Dual-Branch Quad 100mm Exhaust System",
    category: "Motorsport Acoustics",
    description:
      "Four massive 100mm tailpipes finished in Black Chrome embedded inside the aggressive rear diffuser. Electronically controlled acoustic flaps open automatically in SPORT and TRACK modes.",
    spec: "Quad 100 mm Slash-Cut Black Chrome Outlets",
    statLabel: "Backpressure: -24% in Track Mode",
  },
  brakes: {
    id: "brakes",
    title: "400mm M Carbon Ceramic Brake System",
    category: "Chassis & Deceleration",
    description:
      "Perforated and ventilated ceramic brake rotors paired with gold metallic 6-piston fixed front calipers. Provides inexhaustible fade-free stopping power even under extreme 800°C circuit temperature spikes.",
    spec: "400 × 38 mm Front Ceramic Rotors · 380 × 28 mm Rear",
    statLabel: "Weight Reduction: -14.0 kg Unsprung Mass",
  },
};

export function StoryOverlays({ progress, onExploreSpecs }: StoryOverlaysProps) {
  const [interiorView, setInteriorView] = useState<"cockpit" | "seats">("cockpit");
  const [activeHotspot, setActiveHotspot] = useState<HotspotDetail | null>(null);
  const [laserlightActive, setLaserlightActive] = useState<boolean>(false);

  // Helper for computing smooth opacity and translate within normalized window [start, end]
  const getBeatState = (start: number, end: number, fadeIn = 0.03, fadeOut = 0.03) => {
    if (progress < start || progress > end) {
      return { active: false, opacity: 0, translate: 30 };
    }

    let opacity = 1;
    if (progress < start + fadeIn) {
      opacity = (progress - start) / fadeIn;
    } else if (progress > end - fadeOut) {
      opacity = (end - progress) / fadeOut;
    }

    const norm = (progress - start) / (end - start);
    const translate = (norm - 0.5) * -20;

    return {
      active: true,
      opacity: Math.max(0, Math.min(1, opacity)),
      translate,
    };
  };

  const beat1 = getBeatState(0.0, 0.12, 0.02, 0.03);
  const beat2 = getBeatState(0.12, 0.27, 0.03, 0.03);
  const beat3 = getBeatState(0.27, 0.40, 0.03, 0.03);
  const beat4 = getBeatState(0.40, 0.50, 0.03, 0.03);
  const beat5 = getBeatState(0.50, 0.65, 0.03, 0.03);
  const beat6 = getBeatState(0.65, 0.75, 0.03, 0.03);
  const beat7 = getBeatState(0.75, 0.86, 0.03, 0.03);
  const beat8 = getBeatState(0.86, 0.94, 0.02, 0.03);
  const beat9 = getBeatState(0.94, 1.00, 0.02, 0.01);

  const openHotspot = (key: keyof typeof HOTSPOTS) => {
    soundEngine.playClick();
    setActiveHotspot(HOTSPOTS[key]);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Progress Indicator Strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 z-30">
        <div
          className="h-full m-stripe-gradient transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Feature 5: Laserlight Beam Simulation (High Intensity Matrix Beams) */}
      {laserlightActive && (
        <div className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-700">
          {/* Midnight environment dim */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#020306]/50 to-[#020205]/90" />

          {/* Dual laser projection cones */}
          <div
            className="absolute top-[42%] left-[34%] w-[32vw] h-[65vh] opacity-85 origin-top-left -rotate-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 160, 255, 0.75) 0%, rgba(255, 255, 255, 0.6) 12%, rgba(0, 102, 177, 0.3) 40%, transparent 80%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="absolute top-[42%] right-[34%] w-[32vw] h-[65vh] opacity-85 origin-top-right rotate-6"
            style={{
              background:
                "linear-gradient(225deg, rgba(0, 160, 255, 0.75) 0%, rgba(255, 255, 255, 0.6) 12%, rgba(0, 102, 177, 0.3) 40%, transparent 80%)",
              filter: "blur(18px)",
            }}
          />
          {/* Laserlight status badge */}
          <div className="absolute top-20 right-8 px-4 py-2 rounded-full bg-[#0066b1]/30 border border-[#0066b1]/60 backdrop-blur-md flex items-center gap-2 shadow-[0_0_25px_rgba(0,102,177,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-telemetry text-[10px] text-white font-bold uppercase tracking-widest">
              BMW LASERLIGHT · 650M MATRIX BEAM
            </span>
          </div>
        </div>
      )}

      {/* Laserlight Toggle Button (Top Right HUD) */}
      <div className="absolute top-20 left-8 z-30 pointer-events-auto">
        <button
          onClick={() => {
            soundEngine.playLaserlightHum();
            setLaserlightActive(!laserlightActive);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-telemetry uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            laserlightActive
              ? "bg-[#0066b1] text-white border-[#0066b1] shadow-[0_0_20px_#0066b1]"
              : "bg-black/60 text-white/70 border-white/15 hover:text-white hover:border-white/30"
          }`}
        >
          <Zap className="w-3 h-3 text-cyan-300" />
          <span>{laserlightActive ? "Laserlight: High Beam" : "Laserlight: Standby"}</span>
        </button>
      </div>

      {/* BEAT 01: THE ARRIVAL (0 - 12%) */}
      {beat1.active && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-300"
          style={{
            opacity: beat1.opacity,
            transform: `translateY(${beat1.translate}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] animate-ping" />
            <span className="font-telemetry text-[11px] tracking-[0.25em] text-white/70 uppercase">
              G80 M Division
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[-0.04em] text-white uppercase mb-3">
            BMW M3 <span className="font-light italic text-white/80">Competition</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl font-light tracking-[0.12em] text-white/60 max-w-xl mx-auto">
            Born on the track. Built for the road.
          </p>

          <div className="absolute bottom-12 flex flex-col items-center gap-2 text-white/40 animate-bounce">
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">
              Scroll to Ignite
            </span>
            <ChevronDown className="w-4 h-4 text-white/40" />
          </div>
        </div>
      )}

      {/* BEAT 02: THE FORM (12 - 27%) with Feature 2 Interactive Hotspots */}
      {beat2.active && (
        <div
          className="absolute inset-0 flex items-center justify-between px-8 md:px-20 transition-all duration-300 pointer-events-none"
          style={{
            opacity: beat2.opacity,
            transform: `translateY(${beat2.translate}px)`,
          }}
        >
          {/* Visual Hotspot Pins Directly on the Vehicle */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Pin 1: Kidney Grille */}
            <div
              className="absolute left-[50%] top-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
              onClick={() => openHotspot("grille")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#0066b1]/40 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-[#0066b1] border-2 border-white flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                  <Target className="w-3 h-3" />
                </span>
                <span className="absolute left-8 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-telemetry uppercase tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Kidney Grille
                </span>
              </div>
            </div>

            {/* Pin 2: Carbon Roof */}
            <div
              className="absolute left-[54%] top-[34%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
              onClick={() => openHotspot("roof")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#0066b1]/40 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-[#0066b1] border-2 border-white flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                  <Target className="w-3 h-3" />
                </span>
                <span className="absolute left-8 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-telemetry uppercase tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  CFRP Carbon Roof
                </span>
              </div>
            </div>

            {/* Pin 3: Aero Mirror */}
            <div
              className="absolute left-[64%] top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
              onClick={() => openHotspot("mirrors")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#0066b1]/40 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-[#0066b1] border-2 border-white flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                  <Target className="w-3 h-3" />
                </span>
                <span className="absolute left-8 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-telemetry uppercase tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Twin-Stalk Mirror
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-md pointer-events-auto relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                02 / Aerodynamics
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-4 leading-[1.05]">
              Every line has <br />
              <span className="text-white/60 font-light italic">purpose.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-6">
              An unmistakable silhouette shaped by performance. Frameless vertical kidney grilles and sculpted bonnet air channels feed the high-performance cooling circuit under extreme circuit loads.
            </p>

            {/* Clickable Feature Hotspot Badges */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-telemetry text-white/40 block">
                Tap Hotspot or Pin to Inspect
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openHotspot("grille")}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#0066b1]/20 border border-white/10 hover:border-[#0066b1] text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-[#0066b1]" />
                  <span>Frameless Kidney Grille</span>
                </button>
                <button
                  onClick={() => openHotspot("roof")}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#0066b1]/20 border border-white/10 hover:border-[#0066b1] text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-[#0066b1]" />
                  <span>Contoured Carbon Roof</span>
                </button>
                <button
                  onClick={() => openHotspot("mirrors")}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#0066b1]/20 border border-white/10 hover:border-[#0066b1] text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-[#0066b1]" />
                  <span>Aero Wing Mirrors</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 03: THE DETAILS (27 - 40%) with Feature 2 Rear Hotspots */}
      {beat3.active && (
        <div
          className="absolute inset-0 flex items-center justify-end px-8 md:px-20 transition-all duration-300 pointer-events-none"
          style={{
            opacity: beat3.opacity,
            transform: `translateY(${beat3.translate}px)`,
          }}
        >
          {/* Visual Hotspot Pins Directly on the Vehicle Rear */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Pin 4: Quad Exhaust */}
            <div
              className="absolute left-[48%] top-[72%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
              onClick={() => openHotspot("exhaust")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#e7222e]/40 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-[#e7222e] border-2 border-white flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                  <Target className="w-3 h-3" />
                </span>
                <span className="absolute right-8 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-telemetry uppercase tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  100mm Quad Exhausts
                </span>
              </div>
            </div>

            {/* Pin 5: Ceramic Brakes */}
            <div
              className="absolute left-[67%] top-[63%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
              onClick={() => openHotspot("brakes")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                  <Target className="w-3 h-3" />
                </span>
                <span className="absolute right-8 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-telemetry uppercase tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  400mm Ceramic Rotors
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-md text-right pointer-events-auto relative z-10">
            <div className="flex items-center justify-end gap-2 mb-3">
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                03 / Presence
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-4 leading-[1.05]">
              Designed to be <br />
              <span className="text-white/60 font-light italic">noticed.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-6">
              Darkened M Shadowline lights blend into aggressive flared rear wheel arches. The high-gloss black rear diffuser houses the iconic 100mm dual-branch quad exhaust tips.
            </p>

            <div className="inline-flex flex-col items-end gap-2">
              <button
                onClick={() => openHotspot("exhaust")}
                className="glass-panel px-4 py-2 rounded-full border border-white/10 hover:border-[#e7222e] flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="text-xs font-medium text-white/80">
                  Quad 100mm Exhausts with Electric Flaps
                </span>
                <span className="w-2 h-2 rounded-full bg-[#e7222e] animate-ping" />
              </button>
              <button
                onClick={() => openHotspot("brakes")}
                className="glass-panel px-4 py-2 rounded-full border border-white/10 hover:border-[#0066b1] flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="text-xs font-medium text-white/80">
                  400mm M Carbon Ceramic Rotors
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0066b1] animate-ping" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 04: THE WHEELS & BRAKES (40 - 50%) */}
      {beat4.active && (
        <div
          className="absolute inset-0 flex items-end justify-start p-8 md:p-20 transition-all duration-300 pointer-events-none"
          style={{
            opacity: beat4.opacity,
            transform: `translateY(${beat4.translate}px)`,
          }}
        >
          <div className="max-w-lg pointer-events-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                04 / Deceleration & Grip
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-3">
              Control meets <br />
              <span className="text-white/60 font-light italic">confidence.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-5">
              Staggered forged light-alloy wheels engineered to withstand punishing lateral G-forces. Supported by 400mm M Carbon Ceramic brake discs with 6-piston fixed front calipers for fade-free stopping power.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="glass-panel p-3 rounded-lg border border-white/10">
                <Disc3 className="w-4 h-4 mx-auto mb-1 text-[#0066b1]" />
                <span className="block text-[9px] uppercase tracking-wider text-white/40">
                  Front Setup
                </span>
                <span className="text-xs font-bold text-white">19" 275/35 ZR19</span>
              </div>
              <div className="glass-panel p-3 rounded-lg border border-white/10">
                <Disc3 className="w-4 h-4 mx-auto mb-1 text-[#0066b1]" />
                <span className="block text-[9px] uppercase tracking-wider text-white/40">
                  Rear Setup
                </span>
                <span className="text-xs font-bold text-white">20" 285/30 ZR20</span>
              </div>
              <div className="glass-panel p-3 rounded-lg border border-white/10">
                <Zap className="w-4 h-4 mx-auto mb-1 text-[#e7222e]" />
                <span className="block text-[9px] uppercase tracking-wider text-white/40">
                  Front Rotors
                </span>
                <span className="text-xs font-bold text-white">400mm Ceramic</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 05: THE INTERIOR (50 - 65%) */}
      {beat5.active && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-12 transition-all duration-500 pointer-events-auto bg-black/85 backdrop-blur-md"
          style={{
            opacity: beat5.opacity,
            transform: `scale(${1 - (1 - beat5.opacity) * 0.05})`,
          }}
        >
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 shadow-2xl group">
              <Image
                src={
                  interiorView === "cockpit"
                    ? "/images/m3_interior_cockpit.jpg"
                    : "/images/m3_carbon_seats.jpg"
                }
                alt="BMW M3 Interior Experience"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setInteriorView("cockpit");
                  }}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all ${
                    interiorView === "cockpit"
                      ? "bg-white text-black shadow-lg"
                      : "bg-black/60 text-white/70 hover:text-white border border-white/20"
                  }`}
                >
                  Cockpit & Telemetry
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setInteriorView("seats");
                  }}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all ${
                    interiorView === "seats"
                      ? "bg-white text-black shadow-lg"
                      : "bg-black/60 text-white/70 hover:text-white border border-white/20"
                  }`}
                >
                  M Carbon Bucket Seats
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                  05 / Driver Sanctuary
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-3">
                Everything within <br />
                <span className="text-white/60 font-light italic">reach.</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                A cockpit designed strictly around the driver. Optional M Carbon Bucket seats shed 9.6 kg compared to standard M Sport seats, with visible carbon-fibre-reinforced plastic (CFRP) structural elements and integral headrests featuring an illuminated M3 emblem.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#e7222e]/10 border border-[#e7222e]/30 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#e7222e]">M1</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">
                      Red M1 & M2 Config Buttons
                    </span>
                    <span className="text-[11px] text-white/50">
                      Store bespoke settings for Engine, Suspension, Steering, Braking & xDrive.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#0066b1]/10 border border-[#0066b1]/30 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-[#0066b1]" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">
                      Merino Leather & Carbon Trim
                    </span>
                    <span className="text-[11px] text-white/50">
                      High-grade leather upholstery with exposed carbon fibre composite elements.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 06: THE TECHNOLOGY (65 - 75%) */}
      {beat6.active && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-12 transition-all duration-500 pointer-events-auto bg-black/85 backdrop-blur-md"
          style={{
            opacity: beat6.opacity,
            transform: `scale(${1 - (1 - beat6.opacity) * 0.05})`,
          }}
        >
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                  06 / Digital Cockpit
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-3">
                Intelligence, <br />
                <span className="text-white/60 font-light italic">in motion.</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                The frameless BMW Curved Display fuses a 12.3-inch information display with a 14.9-inch control display. BMW Operating System 8.5 delivers high-contrast M telemetry, G-meters, track maps, and real-time tire temperatures.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3 rounded-lg border border-white/10">
                  <span className="text-xs font-bold text-white block mb-0.5">
                    M Drift Analyser
                  </span>
                  <span className="text-[10px] text-white/50 block">
                    10-stage traction calibration measuring drift angle and distance.
                  </span>
                </div>
                <div className="glass-panel p-3 rounded-lg border border-white/10">
                  <span className="text-xs font-bold text-white block mb-0.5">
                    M Laptimer
                  </span>
                  <span className="text-[10px] text-white/50 block">
                    Telemetry data logger with sector timing and delta analysis.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/images/m3_interior_cockpit.jpg"
                alt="BMW Curved Display & Cockpit Technology"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full border border-white/15">
                <span className="font-telemetry text-[10px] text-white/90 uppercase tracking-widest">
                  BMW OS 8.5 · M MODE: TRACK
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 07: THE HEART OF THE M3 (75 - 86%) */}
      {beat7.active && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-12 transition-all duration-500 pointer-events-auto bg-black/85 backdrop-blur-md"
          style={{
            opacity: beat7.opacity,
            transform: `scale(${1 - (1 - beat7.opacity) * 0.05})`,
          }}
        >
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 shadow-2xl group">
              <Image
                src="/images/m3_s58_engine.jpg"
                alt="BMW M S58 3.0-litre TwinPower Turbo Engine"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 glass-panel px-3.5 py-1.5 rounded-full border border-white/15">
                <span className="font-telemetry text-[11px] text-white font-bold tracking-wider">
                  ENGINE CODE: S58B30T0
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                  07 / Powertrain
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-2 leading-[1.05]">
                Built for <br />
                <span className="text-white/60 font-light italic">performance.</span>
              </h2>
              <p className="text-xs text-white/60 font-light mb-6">
                Direct motorsport bloodline. S58 high-revving 3.0-litre 6-cylinder with forged lightweight crankshaft and 3D-printed cylinder head core.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-telemetry mb-0.5">
                    Maximum Output
                  </span>
                  <span className="text-2xl font-black text-white font-telemetry">
                    510 <span className="text-xs font-normal text-white/60">HP / 375 kW</span>
                  </span>
                  <span className="block text-[10px] text-white/50">@ 6,250 RPM</span>
                </div>

                <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-telemetry mb-0.5">
                    Peak Torque
                  </span>
                  <span className="text-2xl font-black text-white font-telemetry">
                    650 <span className="text-xs font-normal text-white/60">Nm</span>
                  </span>
                  <span className="block text-[10px] text-white/50">@ 2,750 – 5,500 RPM</span>
                </div>

                <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-telemetry mb-0.5">
                    0 – 100 km/h
                  </span>
                  <span className="text-2xl font-black text-[#0066b1] font-telemetry">
                    3.5 <span className="text-xs font-normal text-white/60">SEC</span>
                  </span>
                  <span className="block text-[10px] text-white/50">with M xDrive AWD</span>
                </div>

                <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-telemetry mb-0.5">
                    Top Speed
                  </span>
                  <span className="text-2xl font-black text-white font-telemetry">
                    290 <span className="text-xs font-normal text-white/60">km/h</span>
                  </span>
                  <span className="block text-[10px] text-white/50">M Driver's Package</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 08: THE DRIVE (86 - 94%) */}
      {beat8.active && (
        <div
          className="absolute inset-0 flex items-center justify-between px-8 md:px-20 transition-all duration-300 pointer-events-none"
          style={{
            opacity: beat8.opacity,
            transform: `translateY(${beat8.translate}px)`,
          }}
        >
          <div className="max-w-md pointer-events-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-telemetry text-[11px] tracking-[0.2em] text-[#0066b1] uppercase font-semibold">
                08 / Dynamics
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-3">
              Pure M.
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
              Track-honed chassis architecture. Active M Differential, Adaptive M suspension with electronically controlled dampers, and near 50:50 axle load distribution provide razor-sharp steering feedback.
            </p>

            <div className="glass-panel p-4 rounded-xl border border-white/10 inline-flex items-center gap-6">
              <div>
                <span className="text-[10px] font-telemetry text-white/40 uppercase block">
                  Axle Distribution
                </span>
                <span className="text-lg font-bold text-white font-telemetry">50.6% / 49.4%</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <span className="text-[10px] font-telemetry text-white/40 uppercase block">
                  Transmission
                </span>
                <span className="text-lg font-bold text-white">8-Spd Drivelogic</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 09: FINAL REVEAL (94 - 100%) */}
      {beat9.active && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-300 pointer-events-none"
          style={{
            opacity: beat9.opacity,
            transform: `translateY(${beat9.translate}px)`,
          }}
        >
          <div className="mb-4">
            <MBadge className="h-4 justify-center" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-3">
            Performance without compromise.
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-light max-w-xl mx-auto mb-8">
            The benchmark of high-performance four-door sports sedans. Explore comprehensive technical specifications, configure your vehicle, and reserve a test drive.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            <button
              onClick={() => {
                soundEngine.playClick();
                onExploreSpecs();
              }}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 shadow-2xl cursor-pointer"
            >
              <span>Explore Technical Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Feature 2: Interactive Hotspot Inspection Drawer / Modal */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 pointer-events-auto">
          <div className="relative w-full max-w-lg glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveHotspot(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold block mb-1">
              {activeHotspot.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-4">
              {activeHotspot.title}
            </h3>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
              {activeHotspot.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-1">
                  Component Metric
                </span>
                <span className="text-xs font-bold text-white font-telemetry">
                  {activeHotspot.statLabel}
                </span>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-1">
                  M Specification
                </span>
                <span className="text-xs font-bold text-[#0066b1] font-telemetry">
                  {activeHotspot.spec}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveHotspot(null);
              }}
              className="w-full py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90"
            >
              Close Technical Blueprint
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
