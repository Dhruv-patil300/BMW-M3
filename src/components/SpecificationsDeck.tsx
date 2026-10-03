"use client";

import React, { useState } from "react";
import { soundEngine } from "./SoundEngine";
import {
  Gauge,
  Cpu,
  ShieldCheck,
  Sliders,
  Sparkles,
  Maximize2,
  CheckCircle2,
  PlusCircle,
  FileText,
} from "lucide-react";

type SpecCategory = "powertrain" | "chassis" | "interior" | "technology" | "dimensions" | "equipment";

export function SpecificationsDeck() {
  const [activeTab, setActiveTab] = useState<SpecCategory>("powertrain");

  const categories = [
    { id: "powertrain", label: "Engine & Performance", icon: Gauge },
    { id: "chassis", label: "Chassis & Drivetrain", icon: Sliders },
    { id: "dimensions", label: "Dimensions & Weight", icon: Maximize2 },
    { id: "interior", label: "Interior & Comfort", icon: Sparkles },
    { id: "technology", label: "Digital & Driver Assist", icon: Cpu },
    { id: "equipment", label: "Standard vs Optional", icon: ShieldCheck },
  ];

  return (
    <section id="specifications" className="py-24 px-6 md:px-12 bg-[#06070a] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066b1]" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold">
                Technical Data Sheet
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Specifications.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Verified engineering metrics and equipment breakdown for the BMW M3 Competition Sedan (G80) sourced from official BMW technical publications.
            </p>
          </div>

          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-telemetry text-white/80">
              Market Spec: Official India CBU / Global Homologation
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab(cat.id as SpecCategory);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase font-telemetry transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg shadow-white/10"
                    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="glass-panel-elevated p-8 rounded-2xl border border-white/10 min-h-[420px]">
          {/* 1. Powertrain */}
          {activeTab === "powertrain" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  BMW M TwinPower Turbo High-Revving S58 Inline-6
                </h3>
                <span className="font-telemetry text-xs text-[#0066b1] font-bold">
                  2,993 CM³ DISPLACEMENT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Engine Code
                  </span>
                  <span className="text-base font-bold text-white">S58B30T0</span>
                  <p className="text-xs text-white/50 mt-1">
                    3.0-litre inline 6-cylinder petrol with two mono-scroll turbochargers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Max Power Output
                  </span>
                  <span className="text-base font-bold text-white">
                    375 kW / 510 HP @ 6,250 RPM
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Specific output of 170.4 HP per litre; rev limiter set at 7,200 RPM.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Peak Torque
                  </span>
                  <span className="text-base font-bold text-white">
                    650 Nm @ 2,750 – 5,500 RPM
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Extremely broad plateau delivering continuous mid-range thrust.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    0 – 100 km/h Acceleration
                  </span>
                  <span className="text-base font-bold text-[#0066b1]">
                    3.5 seconds (M xDrive) / 3.9s (RWD)
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Official DIN timing under standard launch control conditions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Top Speed
                  </span>
                  <span className="text-base font-bold text-white">
                    250 km/h / 290 km/h (M Driver's Pkg)
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Electronically governed. 0–200 km/h attained in 12.5 seconds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Transmission
                  </span>
                  <span className="text-base font-bold text-white">
                    8-Speed M Steptronic with Drivelogic
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Torque-converter automatic with 3 shift programs (Comfort, Sport, Track).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Chassis */}
          {activeTab === "chassis" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  M-Specific Track-Tuned Running Gear
                </h3>
                <span className="font-telemetry text-xs text-[#0066b1] font-bold">
                  INTELLIGENT ALL-WHEEL DRIVE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Drivetrain System
                  </span>
                  <span className="text-base font-bold text-white">M xDrive with Active M Diff</span>
                  <p className="text-xs text-white/50 mt-1">
                    Electronically controlled multi-plate clutch with 4WD, 4WD Sport & 2WD modes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Front Suspension
                  </span>
                  <span className="text-base font-bold text-white">
                    Adaptive M Double-Joint Spring Strut
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Aluminium wishbones, bespoke M camber geometry, and rigid ball joints.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Rear Suspension
                  </span>
                  <span className="text-base font-bold text-white">Five-Link Axle with M Subframe</span>
                  <p className="text-xs text-white/50 mt-1">
                    Rigidly bolted subframe directly to the chassis for zero elastokinematic deflection.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Standard Brakes
                  </span>
                  <span className="text-base font-bold text-white">M Compound Brakes</span>
                  <p className="text-xs text-white/50 mt-1">
                    380mm front ventilated discs with 6-piston fixed calipers, 370mm rear.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Optional Track Brakes
                  </span>
                  <span className="text-base font-bold text-[#e7222e]">M Carbon Ceramic Brakes</span>
                  <p className="text-xs text-white/50 mt-1">
                    400mm front rotors with gold calipers; fade-resistant past 800°C.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs uppercase font-telemetry text-white/40 mb-1">
                    Steering Ratio
                  </span>
                  <span className="text-base font-bold text-white">
                    Variable M Servotronic (15.0:1)
                  </span>
                  <p className="text-xs text-white/50 mt-1">
                    Speed-sensitive electric power assistance with selectable weight modes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Dimensions */}
          {activeTab === "dimensions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Chassis Dimensions & Capacities
                </h3>
                <span className="font-telemetry text-xs text-[#0066b1] font-bold">
                  G80 PLATFORM
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Overall Length
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">4,794 mm</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Width (w/o mirrors)
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">1,903 mm</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Height
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">1,433 mm</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Wheelbase
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">2,857 mm</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Kerb Weight (DIN)
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">1,780 kg</span>
                  <span className="text-[10px] text-white/40 block mt-0.5">1,805 kg with M xDrive</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Boot Capacity
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">480 Litres</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Fuel Tank Capacity
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">59 Litres</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-telemetry uppercase text-white/40 block mb-1">
                    Drag Coefficient (Cd)
                  </span>
                  <span className="text-xl font-black text-white font-telemetry">0.34</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Interior */}
          {activeTab === "interior" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Driver-Focused Ergonomics & Materials
                </h3>
                <span className="text-xs font-telemetry text-white/50">LUXURY & MOTORSPORT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-telemetry text-[#0066b1] font-bold">
                    Seating Architecture
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1 shrink-0" />
                      <span>Standard M Sport Seats with memory, lumbar adjustment, and heating.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1 shrink-0" />
                      <span>Optional M Carbon Bucket Seats: Exposed carbon shells saving 9.6 kg, multipoint harness pass-throughs, and illuminated M3 badges.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1 shrink-0" />
                      <span>Full Merino leather upholstery standard across all official India allocations.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-telemetry text-[#0066b1] font-bold">
                    Acoustics & Climate
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1 shrink-0" />
                      <span>Harman Kardon Surround Sound System: 16 speakers, 464W digital amplifier.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1 shrink-0" />
                      <span>3-Zone Automatic Climate Control with microfilter and active carbon filter.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1 shrink-0" />
                      <span>M Leather Steering Wheel with carbon fiber shift paddles and red M1/M2 buttons.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 5. Technology */}
          {activeTab === "technology" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Digital Interface & Active Driver Assistance
                </h3>
                <span className="text-xs font-telemetry text-white/50">BMW OS 8.5</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs font-bold text-white mb-1">
                    BMW Curved Display
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed">
                    12.3-inch digital instrument cluster seamlessly joined with a 14.9-inch central information display. High-resolution anti-reflective glass with M graphics.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs font-bold text-white mb-1">
                    M Drive Professional
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Includes M Drift Analyser (recording drift duration, distance, line, and slip angle), M Laptimer, and 10-stage M Traction Control calibration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block text-xs font-bold text-white mb-1">
                    BMW Driving Assistant
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Lane Departure Warning with steering intervention, Front Collision Warning with brake intervention, Attentiveness Assistant, and Parking Assistant Plus with 3D surround camera.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. Standard vs Optional */}
          {activeTab === "equipment" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Equipment Standard vs Optional Breakdown
                </h3>
                <span className="text-xs font-telemetry text-white/50">OFFICIAL INDIA MARKET SPEC</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Standard */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      Standard Equipment (Included)
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ M Carbon Roof (CFRP structure lowering center of gravity)
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ Adaptive M Suspension with electronically controlled dampers
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ Active M Differential with 100% electro-mechanical locking
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ BMW Curved Display with Operating System 8.5 & Navigation
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ Harman Kardon 16-speaker Surround Sound System
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ Staggered 19\"/20\" M Forged Double-spoke 826M wheels
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ Full Merino Leather Upholstery & M Sport Seats
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5">
                      ✓ Comfort Access Keyless Entry & Hands-free Boot lid
                    </li>
                  </ul>
                </div>

                {/* Optional */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-[#0066b1]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      Optional Equipment (Bespoke Order)
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span>+ M Carbon Ceramic Brake System (Gold calipers, 400mm rotors)</span>
                      <span className="font-telemetry text-white/50 text-[10px]">₹14,50,000</span>
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span>+ M Carbon Bucket Seats (CFRP construction, -9.6 kg)</span>
                      <span className="font-telemetry text-white/50 text-[10px]">₹5,80,000</span>
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span>+ M Carbon Exterior Package (Air curtains, mirror caps, spoiler)</span>
                      <span className="font-telemetry text-white/50 text-[10px]">₹7,20,000</span>
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span>+ M Driver's Package (Top speed raised to 290 km/h + Track Voucher)</span>
                      <span className="font-telemetry text-white/50 text-[10px]">₹3,20,000</span>
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span>+ BMW Individual Frozen Matte / Special Metallic Paint</span>
                      <span className="font-telemetry text-white/50 text-[10px]">Up to ₹3,90,000</span>
                    </li>
                    <li className="p-2 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span>+ M Drive Professional with 10-stage Drift Analyser (if standalone)</span>
                      <span className="font-telemetry text-white/50 text-[10px]">Config Dependent</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
