"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundEngine } from "./SoundEngine";
import {
  Rotate3d,
  Smartphone,
  Eye,
  Sun,
  Moon,
  Compass,
  QrCode,
  Sparkles,
  Layers,
} from "lucide-react";

export function Virtual3DExperience() {
  const [angleIndex, setAngleIndex] = useState<number>(0);
  const [studioLight, setStudioLight] = useState<"OBSIDIAN" | "STUDIO" | "RUNWAY">("OBSIDIAN");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const angles = [
    { label: "Front 3/4 Stance", frame: "/frames/ezgif-frame-050.jpg", desc: "Aggressive frameless kidney grille with contoured powerdome bonnet." },
    { label: "Rear Aero Diffuser", frame: "/frames/ezgif-frame-110.jpg", desc: "100mm quad exhaust outlets flanked by high-gloss CFRP aerodynamic diffuser." },
    { label: "Dynamic Track Profile", frame: "/frames/ezgif-frame-280.jpg", desc: "Underground structural runway highlighting the low center-of-gravity stance." },
    { label: "Cockpit Telemetry", frame: "/images/m3_interior_cockpit.jpg", desc: "Driver-focused sanctuary with BMW Curved Display and M leather steering wheel." },
    { label: "M Carbon Bucket Seats", frame: "/images/m3_carbon_seats.jpg", desc: "Exposed CFRP shell with Yas Marina Blue and Black Silverstone Merino leather." },
    { label: "S58 TwinPower Powertrain", frame: "/images/m3_s58_engine.jpg", desc: "3.0L High-revving straight-6 engine bay braced by forged carbon-fibre composite arch." },
  ];

  const currentAngle = angles[angleIndex];

  return (
    <section id="virtual-3d" className="py-24 px-6 md:px-12 bg-[#040507] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066b1]" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold">
                Virtual Showroom & AR
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Inspect in 3D.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Experience the BMW M3 Competition from every angle. Switch perspectives, calibrate studio lighting environments, or project the vehicle directly into your physical space with WebXR Augmented Reality.
            </p>
          </div>

          {/* AR Trigger Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setShowQrModal(true);
            }}
            className="px-5 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all flex items-center gap-2 shadow-[0_10px_25px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>View in Augmented Reality (AR)</span>
          </button>
        </div>

        {/* 3D Showcase Deck */}
        <div className="glass-panel-elevated p-6 sm:p-10 rounded-3xl border border-white/15 relative overflow-hidden">
          {/* Main Visual Frame */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
            <Image
              src={currentAngle.frame}
              alt={currentAngle.label}
              fill
              priority
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Angle details overlay */}
            <div className="absolute bottom-6 left-6 max-w-md z-10">
              <span className="font-telemetry text-xs uppercase tracking-widest text-[#0066b1] font-bold block mb-1">
                PERSPECTIVE 0{angleIndex + 1} / 06
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-1">
                {currentAngle.label}
              </h3>
              <p className="text-xs text-white/70 font-light">
                {currentAngle.desc}
              </p>
            </div>

            {/* Lighting Mode Selector */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 glass-panel p-1.5 rounded-full border border-white/15 z-10">
              {(["OBSIDIAN", "STUDIO", "RUNWAY"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    soundEngine.playClick();
                    setStudioLight(l);
                  }}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold font-telemetry uppercase tracking-wider transition-all cursor-pointer ${
                    studioLight === l
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Perspective Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6">
            {angles.map((a, i) => (
              <button
                key={a.label}
                onClick={() => {
                  soundEngine.playClick();
                  setAngleIndex(i);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  angleIndex === i
                    ? "bg-[#0066b1]/20 border-[#0066b1] shadow-[0_0_15px_rgba(0,102,177,0.3)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <span className="block text-[9px] font-telemetry uppercase text-white/40 mb-0.5">
                  0{i + 1}
                </span>
                <span className={`block text-xs font-bold truncate ${
                  angleIndex === i ? "text-white" : "text-white/70"
                }`}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AR Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="relative w-full max-w-md glass-panel-elevated p-8 rounded-3xl border border-white/20 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-[#0066b1]/20 border border-[#0066b1]/40 flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-[#0066b1]" />
              </div>
              <h4 className="text-xl font-black uppercase text-white mb-2">
                Project in Your Space
              </h4>
              <p className="text-xs text-white/60 font-light max-w-xs mx-auto mb-6">
                Scan this QR code with your iPhone or Android smartphone camera to launch the interactive BMW WebXR 3D Augmented Reality experience.
              </p>

              {/* High-tech QR Code Box */}
              <div className="w-48 h-48 mx-auto bg-white p-4 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="currentColor">
                  {/* Decorative QR Pattern */}
                  <rect x="10" y="10" width="25" height="25" rx="3" fill="black" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="black" />
                  <rect x="65" y="10" width="25" height="25" rx="3" fill="black" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="black" />
                  <rect x="10" y="65" width="25" height="25" rx="3" fill="black" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="black" />
                  {/* Dots */}
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="52" y="20" width="6" height="6" fill="black" />
                  <rect x="42" y="32" width="6" height="6" fill="black" />
                  <rect x="25" y="44" width="6" height="6" fill="black" />
                  <rect x="45" y="45" width="10" height="10" fill="#0066b1" />
                  <rect x="65" y="45" width="6" height="6" fill="black" />
                  <rect x="78" y="55" width="6" height="6" fill="black" />
                  <rect x="42" y="65" width="6" height="6" fill="black" />
                  <rect x="55" y="75" width="6" height="6" fill="black" />
                  <rect x="70" y="72" width="12" height="12" fill="black" />
                </svg>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowQrModal(false);
                }}
                className="w-full py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
