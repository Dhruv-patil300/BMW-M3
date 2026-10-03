"use client";

import React, { useState } from "react";
import { soundEngine } from "./SoundEngine";
import { ArrowLeft, ArrowRight, Gauge, Calendar, Zap, Award } from "lucide-react";

interface Generation {
  id: string;
  code: string;
  year: string;
  title: string;
  tagline: string;
  engine: string;
  power: string;
  torque: string;
  sprint: string;
  topSpeed: string;
  weight: string;
  highlights: string[];
}

const GENERATIONS: Generation[] = [
  {
    id: "e30",
    code: "E30 M3",
    year: "1986 — 1991",
    title: "The Homologation Icon",
    tagline: "Born strictly to win the World Touring Car Championship.",
    engine: "2.3L 4-Cylinder DOHC (S14)",
    power: "200 HP @ 6,750 RPM",
    torque: "240 Nm @ 4,750 RPM",
    sprint: "6.7s (0–100 km/h)",
    topSpeed: "235 km/h",
    weight: "1,200 kg",
    highlights: [
      "Group A homologation race special",
      "Wide box-flared wheel arches",
      "High-angle aerodynamic rear spoiler",
    ],
  },
  {
    id: "e36",
    code: "E36 M3",
    year: "1992 — 1999",
    title: "The First Straight-6",
    tagline: "Establishing the silky-smooth inline-6 identity.",
    engine: "3.0L / 3.2L Inline-6 (S50/S52)",
    power: "321 HP @ 7,400 RPM",
    torque: "350 Nm @ 3,250 RPM",
    sprint: "5.5s (0–100 km/h)",
    topSpeed: "250 km/h (Limited)",
    weight: "1,460 kg",
    highlights: [
      "Introduction of Double-VANOS camshaft timing",
      "First M3 available as a 4-door Saloon",
      "Motorsport aerodynamic twin-stalk mirrors",
    ],
  },
  {
    id: "e46",
    code: "E46 M3",
    year: "2000 — 2006",
    title: "The High-Rev Masterpiece",
    tagline: "The golden era of naturally aspirated M performance.",
    engine: "3.2L High-Rev Inline-6 (S54)",
    power: "343 HP @ 7,900 RPM",
    torque: "365 Nm @ 4,900 RPM",
    sprint: "5.2s (0–100 km/h)",
    topSpeed: "250 km/h (280 km/h CSL)",
    weight: "1,570 kg",
    highlights: [
      "Signature quad exhaust outlets",
      "Contoured powerdome aluminium bonnet",
      "Pioneered lightweight CFRP carbon roof on the CSL",
    ],
  },
  {
    id: "e90",
    code: "E90/E92 M3",
    year: "2007 — 2013",
    title: "The V8 Symphony",
    tagline: "Motorsport engineering unleashed to 8,300 RPM.",
    engine: "4.0L High-Rev 90° V8 (S65)",
    power: "420 HP @ 8,300 RPM",
    torque: "400 Nm @ 3,900 RPM",
    sprint: "4.6s (0–100 km/h)",
    topSpeed: "250 km/h / 280 km/h",
    weight: "1,655 kg",
    highlights: [
      "The only production V8 engine in M3 history",
      "8 individual throttle butterflies",
      "Introduction of 7-speed M Double Clutch Transmission",
    ],
  },
  {
    id: "f80",
    code: "F80 M3",
    year: "2014 — 2018",
    title: "The Twin-Turbo Era",
    tagline: "Instantaneous boost response and carbon lightweighting.",
    engine: "3.0L TwinPower Turbo Inline-6 (S55)",
    power: "450 HP (Competition)",
    torque: "550 Nm @ 1,850 – 5,500 RPM",
    sprint: "4.0s (0–100 km/h)",
    topSpeed: "280 km/h (M Driver's Pkg)",
    weight: "1,560 kg",
    highlights: [
      "First turbocharged M3 generation",
      "One-piece CFRP carbon propeller shaft",
      "Precision boomerang carbon strut brace in engine bay",
    ],
  },
  {
    id: "g80",
    code: "G80 M3 Competition",
    year: "Present",
    title: "The Benchmark of Dominance",
    tagline: "510 HP with revolutionary M xDrive 2WD-switchable all-wheel drive.",
    engine: "3.0L TwinPower Turbo Inline-6 (S58)",
    power: "510 HP @ 6,250 RPM",
    torque: "650 Nm @ 2,750 – 5,500 RPM",
    sprint: "3.5s (0–100 km/h)",
    topSpeed: "290 km/h (M Driver's Pkg)",
    weight: "1,780 kg",
    highlights: [
      "Switchable M xDrive with pure rear-wheel drive drift mode",
      "3D-printed cylinder head core & forged crankshaft",
      "Frameless vertical kidney grille cooling architecture",
    ],
  },
];

export function HeritageTimeline() {
  const [selectedIdx, setSelectedIdx] = useState<number>(5); // default to G80
  const activeGen = GENERATIONS[selectedIdx];

  const handleSelect = (idx: number) => {
    soundEngine.playClick();
    setSelectedIdx(idx);
  };

  return (
    <section id="heritage" className="py-24 px-6 md:px-12 bg-[#060709] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066b1]" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold">
                Motorsport Lineage
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              6 Generations of M.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              From the raw DTM homologation special in 1986 to the all-wheel-drive 510 HP G80 of today. Explore 38 years of pure Bavarian motorsport evolution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelect(Math.max(0, selectedIdx - 1))}
              disabled={selectedIdx === 0}
              className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSelect(Math.min(GENERATIONS.length - 1, selectedIdx + 1))}
              disabled={selectedIdx === GENERATIONS.length - 1}
              className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timeline Indicator Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {GENERATIONS.map((gen, idx) => (
            <button
              key={gen.id}
              onClick={() => handleSelect(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedIdx === idx
                  ? "bg-[#0066b1]/15 border-[#0066b1] shadow-[0_0_20px_rgba(0,102,177,0.25)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <span className="block text-[10px] font-telemetry uppercase text-white/40">
                {gen.year}
              </span>
              <span className={`block text-xs font-bold uppercase tracking-wider mt-0.5 ${
                selectedIdx === idx ? "text-white" : "text-white/70"
              }`}>
                {gen.code}
              </span>
            </button>
          ))}
        </div>

        {/* Active Generation Detail Card */}
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-telemetry text-xs font-bold">
                    {activeGen.year}
                  </span>
                  <span className="font-telemetry text-xs text-[#0066b1] font-bold uppercase tracking-wider">
                    {activeGen.code}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {activeGen.title}
                </h3>
                <p className="text-sm text-white/70 font-light mt-1 italic">
                  "{activeGen.tagline}"
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-telemetry text-white/40 block">
                  Key Engineering Milestones
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeGen.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <Award className="w-3.5 h-3.5 text-[#0066b1] shrink-0" />
                      <span className="text-xs text-white/80">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Stats Panel */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-1">
                  Engine Unit
                </span>
                <span className="text-xs font-bold text-white block leading-tight">
                  {activeGen.engine}
                </span>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-1">
                  Power Output
                </span>
                <span className="text-base font-black font-telemetry text-white">
                  {activeGen.power}
                </span>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-1">
                  Acceleration
                </span>
                <span className="text-base font-black font-telemetry text-[#0066b1]">
                  {activeGen.sprint}
                </span>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry text-white/40 mb-1">
                  Kerb Weight
                </span>
                <span className="text-base font-black font-telemetry text-white">
                  {activeGen.weight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
